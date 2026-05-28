// src/components/chat/AIAssistant.jsx
// Premium floating AI consultant widget.
// Architecture:
// - Completely self-contained — no external state management
// - Uses React useReducer for chat state (messages, lead capture stage, lead data)
// - Calls /api/chat/init on open to get page-aware greeting
// - Calls /api/chat/message for each user message
// - Calls /api/chat/lead when lead is captured
// - Renders with Framer Motion spring physics throughout
// - Mobile: full-screen overlay. Desktop: 380px panel bottom-right
// - Lead capture is conversational — not a form, but a guided sequence

import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation }             from 'react-router-dom';
import axios                       from 'axios';

// ── Session ID (persistent per browser session) ───────────────────
const SESSION_ID = `wa_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// ── Lead capture question sequence ───────────────────────────────
const CAPTURE_STEPS = [
  { field: 'name',              question: "May I get your name?"                                        },
  { field: 'email',             question: "And your email address? I'll have our team follow up."       },
  { field: 'phone',             question: "Your phone number? (Completely optional — feel free to skip)"},
  { field: 'companyName',       question: "What's the name of your company or clinic?"                  },
  { field: 'serviceInterested', question: "Which service are you most interested in?"                   },
  { field: 'timeline',          question: "What's your target timeline — when are you hoping to start?" },
  { field: 'budget',            question: "Do you have a rough budget range in mind? (Optional)"        },
];

// ── State management with useReducer ─────────────────────────────
const initialState = {
  messages:          [],
  quickActions:      [],
  isOpen:            false,
  isTyping:          false,
  showBubble:        false,
  showQuickActions:  true,
  captureStep:       null,   // null | 0–6
  leadData:          {},
  leadCaptured:      false,
  analyticsData:     null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_BUBBLE':
      return { ...state, showBubble: true };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_QUICK_ACTIONS':
      return { ...state, quickActions: action.payload };
    case 'HIDE_QUICK_ACTIONS':
      return { ...state, showQuickActions: false };
    case 'SET_GREETING':
      return {
        ...state,
        messages: [{ role: 'assistant', content: action.payload, timestamp: new Date() }],
        quickActions: action.quickActions || [],
      };
    case 'START_CAPTURE':
      return { ...state, captureStep: 0 };
    case 'ADVANCE_CAPTURE':
      return {
        ...state,
        captureStep: state.captureStep + 1,
        leadData: { ...state.leadData, [action.field]: action.value },
      };
    case 'FINISH_CAPTURE':
      return {
        ...state,
        captureStep: null,
        leadCaptured: true,
        leadData: { ...state.leadData, [action.field]: action.value },
      };
    case 'SET_ANALYTICS':
      return { ...state, analyticsData: action.payload };
    default:
      return state;
  }
}

// ── Typing indicator ──────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
        style={{ background: 'rgba(0,200,168,0.15)', border: '1px solid rgba(0,200,168,0.3)', color: '#00C8A8' }}
      >
        A
      </div>
      <div
        className="flex gap-1 items-center px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(15,23,42,0.08)' }}
      >
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00C8A8' }}
            animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, delay, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const time   = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mb-4"
          style={{ background: 'rgba(0,200,168,0.15)', border: '1px solid rgba(0,200,168,0.3)', color: '#00C8A8' }}
          aria-hidden
        >
          A
        </div>
      )}

      <div className={`flex flex-col gap-0.5 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className="px-4 py-2.5 font-inter leading-relaxed"
          style={{
            fontSize: '13px',
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            background: isUser
              ? '#00C8A8'
              : 'rgba(255,255,255,0.055)',
            border: isUser
              ? 'none'
              : '1px solid rgba(255,255,255,0.09)',
            color: isUser ? '#080B0F' : '#F8FAFC',
            fontWeight: isUser ? 500 : 400,
          }}
        >
          {message.content}
        </div>
        {/* Timestamp */}
        <span
          className="font-inter text-text-muted px-1"
          style={{ fontSize: '10px' }}
        >
          {time}
        </span>
      </div>
    </motion.div>
  );
}

// ── Quick action button ───────────────────────────────────────────
function QuickActionBtn({ action, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(action)}
      className="font-inter font-medium px-3 py-1.5 rounded-full text-left transition-all duration-200"
      style={{
        fontSize: '11px',
        background: 'rgba(0,200,168,0.08)',
        border: '1px solid rgba(0,200,168,0.2)',
        color: '#00C8A8',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,168,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,168,0.08)'; }}
    >
      {action.label}
    </motion.button>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function AIAssistant() {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const hasInitialized = useRef(false);
  const isMobile       = typeof window !== 'undefined' && window.innerWidth < 640;

  // Show the floating bubble after 2.5 seconds
  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'SHOW_BUBBLE' }), 2500);
    return () => clearTimeout(t);
  }, []);

  // Fetch greeting from backend when chat opens
  useEffect(() => {
    if (!state.isOpen || hasInitialized.current) return;
    hasInitialized.current = true;

    axios.get(`/api/chat/init?page=${encodeURIComponent(location.pathname)}`)
      .then(res => {
        dispatch({
          type:         'SET_GREETING',
          payload:      res.data.greeting,
          quickActions: res.data.quickActions || [],
        });
      })
      .catch(() => {
        dispatch({
          type:    'SET_GREETING',
          payload: "Hi 👋 Welcome to WebieApp Solutions. I'm Aria, your digital consultant. How can I help you today?",
        });
      });
  }, [state.isOpen, location.pathname]);

  // Re-fetch greeting if page changes and chat is fresh (only first message = greeting)
  useEffect(() => {
    if (!state.isOpen || state.messages.length > 1) return;
    axios.get(`/api/chat/init?page=${encodeURIComponent(location.pathname)}`)
      .then(res => {
        dispatch({ type: 'SET_GREETING', payload: res.data.greeting, quickActions: res.data.quickActions });
      })
      .catch(() => {});
  }, [location.pathname]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [state.isOpen]);

  // ── Add a message to the thread ─────────────────────────────────
  const addMessage = useCallback((role, content) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { role, content, timestamp: new Date() } });
  }, []);

  // ── Send a message to the AI ─────────────────────────────────────
  const sendToAI = useCallback(async (userContent) => {
    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      const res = await axios.post('/api/chat/message', {
        sessionId:  SESSION_ID,
        content:    userContent,
        sourcePage: location.pathname,
      });

      const { response, analytics } = res.data;
      addMessage('assistant', response);
      dispatch({ type: 'SET_ANALYTICS', payload: analytics });

      // If backend says we should capture a lead and haven't started yet
      if (analytics?.shouldCaptureLead && state.captureStep === null && !state.leadCaptured) {
        await new Promise(r => setTimeout(r, 600));
        dispatch({ type: 'SET_TYPING', payload: true });
        await new Promise(r => setTimeout(r, 900));
        addMessage('assistant', "I'd love to connect you with the right person on our team. Could I grab a few quick details?");
        await new Promise(r => setTimeout(r, 500));
        dispatch({ type: 'SET_TYPING', payload: true });
        await new Promise(r => setTimeout(r, 700));
        addMessage('assistant', CAPTURE_STEPS[0].question);
        dispatch({ type: 'START_CAPTURE' });
      }
    } catch (err) {
      addMessage('assistant', "I'm having a brief issue — please try again or email us at hello@webieapp.com");
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  }, [location.pathname, state.captureStep, state.leadCaptured, addMessage]);

  // ── Handle lead capture step ──────────────────────────────────────
  const handleCaptureStep = useCallback(async (value) => {
    const step      = CAPTURE_STEPS[state.captureStep];
    const nextIndex = state.captureStep + 1;

    if (nextIndex < CAPTURE_STEPS.length) {
      dispatch({ type: 'ADVANCE_CAPTURE', field: step.field, value });
      dispatch({ type: 'SET_TYPING', payload: true });
      await new Promise(r => setTimeout(r, 800));
      dispatch({ type: 'SET_TYPING', payload: false });
      addMessage('assistant', CAPTURE_STEPS[nextIndex].question);
    } else {
      // Capture complete — save the lead
      const finalData = { ...state.leadData, [step.field]: value };
      dispatch({ type: 'FINISH_CAPTURE', field: step.field, value });

      dispatch({ type: 'SET_TYPING', payload: true });
      await new Promise(r => setTimeout(r, 1000));
      dispatch({ type: 'SET_TYPING', payload: false });

      addMessage('assistant',
        `Thank you${finalData.name ? `, ${finalData.name.split(' ')[0]}` : ''}! 🎉 I've passed your details to our team — you'll hear from us within 24 hours. Is there anything else I can help with in the meantime?`
      );

      // Save to backend
      const analytics = state.analyticsData || {};
      axios.post('/api/chat/lead', {
        sessionId:         SESSION_ID,
        name:              finalData.name              || '',
        email:             finalData.email             || '',
        phone:             finalData.phone             || '',
        companyName:       finalData.companyName       || '',
        serviceInterested: finalData.serviceInterested || '',
        timeline:          finalData.timeline          || '',
        budget:            finalData.budget            || '',
        sourcePage:        location.pathname,
        chatSummary:       state.messages.slice(-8).map(m => `${m.role === 'user' ? 'Visitor' : 'Aria'}: ${m.content}`).join('\n'),
        leadScore:         analytics.leadScore         || 50,
        priority:          analytics.priority          || 'MEDIUM',
        isAutism:          analytics.isAutism          || false,
      }).catch(err => console.error('[CHAT] Lead save failed:', err.message));
    }
  }, [state.captureStep, state.leadData, state.analyticsData, state.messages, location.pathname, addMessage]);

  // ── Send handler ───────────────────────────────────────────────
  const handleSend = useCallback(async (textOverride) => {
    const text = (textOverride || inputValue).trim();
    if (!text) return;

    setInputValue('');
    dispatch({ type: 'HIDE_QUICK_ACTIONS' });
    addMessage('user', text);

    if (state.captureStep !== null) {
      await handleCaptureStep(text);
    } else {
      await sendToAI(text);
    }
  }, [inputValue, state.captureStep, addMessage, handleCaptureStep, sendToAI]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {state.showBubble && !state.isOpen && (
          <motion.div
            key="trigger"
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          >
            {/* Tooltip bubble */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-2.5 rounded-2xl rounded-br-sm shadow-card max-w-[200px]"
              style={{
                background: '#F8F9FB',
                border: '1px solid rgba(15,23,42,0.08)',
              }}
            >
              <p className="font-inter text-text-primary" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                👋 Hi! Chat with our digital consultant.
              </p>
            </motion.div>

            {/* Button */}
            <button
              onClick={() => dispatch({ type: 'OPEN' })}
              aria-label="Open AI consultant chat"
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                background: '#00C8A8',
                boxShadow: '0 0 0 0 rgba(0,200,168,0.4)',
                animation: 'pulse-brand 2.5s ease-in-out infinite',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080B0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {/* Online indicator */}
              <span
                className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full border-2"
                style={{ background: '#4ADE80', borderColor: '#080B0F' }}
                aria-hidden
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {state.isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 sm:hidden"
              style={{ background: 'rgba(4,6,8,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => dispatch({ type: 'CLOSE' })}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed z-50 flex flex-col overflow-hidden"
              style={{
                // Mobile: full screen  |  Desktop: 380px panel
                bottom:       isMobile ? 0 : '1.5rem',
                right:        isMobile ? 0 : '1.5rem',
                left:         isMobile ? 0 : 'auto',
                top:          isMobile ? 0 : 'auto',
                width:        isMobile ? '100%' : '380px',
                height:       isMobile ? '100%' : '580px',
                maxHeight:    isMobile ? '100dvh' : '580px',
                background:   'linear-gradient(180deg, #0F1419 0%, #080B0F 100%)',
                border:       '1px solid rgba(255,255,255,0.09)',
                borderRadius: isMobile ? 0 : '20px',
                boxShadow:    '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,168,0.08)',
              }}
              role="dialog"
              aria-label="WebieApp AI Consultant — Aria"
              aria-modal="true"
            >
              {/* ── Header ───────────────────────────────────────── */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.97)' }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-sora font-bold text-sm"
                      style={{ background: 'rgba(0,200,168,0.15)', border: '1px solid rgba(0,200,168,0.3)', color: '#00C8A8' }}
                      aria-hidden
                    >
                      A
                    </div>
                    <span
                      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                      style={{ background: '#4ADE80', borderColor: '#F0F4F8' }}
                      aria-hidden
                    />
                  </div>

                  <div>
                    <p className="font-sora font-semibold text-text-primary" style={{ fontSize: '13px' }}>
                      Aria
                    </p>
                    <p className="font-inter text-text-muted" style={{ fontSize: '10px' }}>
                      WebieApp Digital Consultant · Online
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'CLOSE' })}
                  aria-label="Close chat"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* ── Messages ──────────────────────────────────────── */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
              >
                {state.messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}

                {/* Quick actions — shown only after first message */}
                {state.showQuickActions && state.messages.length === 1 && state.quickActions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 pt-1"
                    role="group"
                    aria-label="Quick actions"
                  >
                    {state.quickActions.map((action, i) => (
                      <QuickActionBtn
                        key={i}
                        action={action}
                        onClick={(a) => handleSend(a.prompt)}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Typing indicator */}
                {state.isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Input ────────────────────────────────────────── */}
              <div
                className="flex-shrink-0 p-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(15,23,42,0.04)',
                    border: '1px solid rgba(15,23,42,0.08)',
                  }}
                  onFocus={() => {}}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      state.captureStep !== null
                        ? CAPTURE_STEPS[state.captureStep]?.question.slice(0, 40) + '…'
                        : 'Ask anything about our services…'
                    }
                    aria-label="Chat message input"
                    className="flex-1 bg-transparent font-inter text-text-primary placeholder-text-muted outline-none"
                    style={{ fontSize: '13px' }}
                    disabled={state.isTyping}
                  />

                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || state.isTyping}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: inputValue.trim() ? '#00C8A8' : 'rgba(255,255,255,0.06)',
                      border: '1px solid',
                      borderColor: inputValue.trim() ? '#00C8A8' : 'rgba(255,255,255,0.1)',
                      cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    }}
                    aria-label="Send message"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        stroke={inputValue.trim() ? '#080B0F' : '#64748B'}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>

                <p className="font-inter text-text-muted text-center mt-2" style={{ fontSize: '10px' }}>
                  Powered by WebieApp Solutions LLC
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

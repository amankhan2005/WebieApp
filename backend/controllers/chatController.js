// server/controllers/chatController.js
// Handles all chat interactions:
// 1. GET greeting config for a page
// 2. POST message → call AI → return response → update history
// 3. POST lead → save captured lead → send emails

const { ChatLead, ChatHistory } = require('../models/ChatModels');
const { callClaude, scoreLeadIntent, getPriority, detectIsAutism, getPageGreeting, QUICK_ACTIONS } = require('../services/aiService');
const { sendChatLeadAdminEmail, sendChatLeadConfirmationEmail } = require('../services/emailService');
const { validate, chatMessageSchema, chatLeadSchema } = require('../validators/schemas');

// ── GET /api/chat/init?page=/ ─────────────────────────────────────
// Returns initial greeting and quick actions for the given page
async function initChat(req, res, next) {
  try {
    const sourcePage = req.query.page || '/';
    res.json({
      success:      true,
      greeting:     getPageGreeting(sourcePage),
      quickActions: QUICK_ACTIONS,
    });
  } catch (err) {
    next(err);
  }
}

// ── POST /api/chat/message ────────────────────────────────────────
// Receives user message + history, calls AI, returns response + lead analysis
async function sendMessage(req, res, next) {
  try {
    const data = validate(chatMessageSchema, req.body);
    const { sessionId, content, sourcePage } = data;

    // 1. Load or create session history
    let history = await ChatHistory.findOne({ sessionId });
    if (!history) {
      history = await ChatHistory.create({ sessionId, sourcePage, messages: [] });
    }

    // 2. Append user message
    const userMessage = { role: 'user', content, timestamp: new Date() };
    history.messages.push(userMessage);

    // 3. Build context for AI (last 12 messages = 6 turns)
    const contextMessages = history.messages.slice(-12).map(m => ({
      role:    m.role,
      content: m.content,
    }));

    // 4. Call Claude
    const aiResponse = await callClaude(contextMessages, sourcePage);

    // 5. Append assistant response
    const assistantMessage = { role: 'assistant', content: aiResponse, timestamp: new Date() };
    history.messages.push(assistantMessage);

    // 6. Score lead intent on latest conversation
    const allMessages = history.messages.map(m => ({ content: m.content }));
    const leadScore   = scoreLeadIntent(allMessages);
    const isAutism    = detectIsAutism(allMessages);
    const priority    = getPriority(leadScore, isAutism);

    // 7. Save updated history
    await ChatHistory.findOneAndUpdate(
      { sessionId },
      { messages: history.messages },
      { new: true }
    );

    // 8. Respond
    res.json({
      success:     true,
      response:    aiResponse,
      sessionId,
      analytics: {
        leadScore,
        priority,
        isAutism,
        shouldCaptureLead: leadScore >= 35 && !history.leadCaptured,
        messageCount:      history.messages.length,
      },
    });

  } catch (err) {
    next(err);
  }
}

// ── POST /api/chat/lead ───────────────────────────────────────────
// Saves captured lead data + sends emails
async function saveChatLead(req, res, next) {
  try {
    const data = validate(chatLeadSchema, req.body);
    const { sessionId } = data;

    // 1. Check for existing lead in this session
    const existing = await ChatLead.findOne({ sessionId });
    if (existing) {
      // Update with any new fields
      const updated = await ChatLead.findOneAndUpdate(
        { sessionId },
        { $set: { ...data, updatedAt: new Date() } },
        { new: true }
      );
      return res.json({ success: true, id: updated._id, action: 'updated' });
    }

    // 2. Save new lead
    const lead = await ChatLead.create({
      ...data,
      userAgent: req.headers['user-agent'] || '',
    });

    // 3. Mark session as lead-captured
    await ChatHistory.findOneAndUpdate(
      { sessionId },
      { leadCaptured: true, leadId: lead._id }
    );

    // 4. Send emails for medium/high priority leads
    if (data.priority === 'HIGH' || data.priority === 'MEDIUM') {
      // Build chat summary from history
      const history = await ChatHistory.findOne({ sessionId });
      const summary = history
        ? history.messages
            .slice(-8)
            .map(m => `${m.role === 'user' ? 'Visitor' : 'Aria'}: ${m.content}`)
            .join('\n')
        : data.chatSummary || '';

      Promise.allSettled([
        sendChatLeadAdminEmail({
          name:              data.name,
          email:             data.email,
          phone:             data.phone,
          companyName:       data.companyName,
          serviceInterested: data.serviceInterested,
          timeline:          data.timeline,
          budget:            data.budget,
          chatSummary:       summary,
          sourcePage:        data.sourcePage,
          priority:          data.priority,
          isAutism:          data.isAutism,
          leadScore:         data.leadScore,
        }),
        data.email && sendChatLeadConfirmationEmail({
          name:              data.name,
          email:             data.email,
          serviceInterested: data.serviceInterested,
        }),
      ]).then(results => {
        results.forEach((r, i) => {
          if (r.status === 'rejected') console.error(`[EMAIL] Chat lead email #${i + 1} failed:`, r.reason?.message);
        });
        // Mark email as sent
        ChatLead.findByIdAndUpdate(lead._id, { emailSent: true }).exec();
      });
    }

    res.status(201).json({ success: true, id: lead._id, action: 'created' });

  } catch (err) {
    next(err);
  }
}

module.exports = { initChat, sendMessage, saveChatLead };

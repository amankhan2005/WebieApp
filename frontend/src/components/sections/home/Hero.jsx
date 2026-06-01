import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../../ui/Button.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

/* ─── Gradient Fill Button ─────────────────────────────────────────── */
function FillButton({ to, children, fullWidth, isDesktop }) {
  return (
    <motion.a
      href={to}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: isDesktop ? '17px 38px' : '14px 28px',
        borderRadius: '14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: isDesktop ? '1.05rem' : '0.95rem',
        fontWeight: 600,
        color: '#fff',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        border: 'none',
        width: fullWidth ? '100%' : 'auto',
        boxSizing: 'border-box',
        letterSpacing: isDesktop ? '0.01em' : 0,
      }}
    >
      <span style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #00C8A8 0%, #1c69bb 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradShift 4s ease infinite',
      }} />
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
  );
}

const ROTATING_WORDS = ['Win','Succeed', 'Scale', 'Perform', 'Matter'];

/* ─── Per-letter animation variants ────────────────────────────────── */
const LETTER_VARIANTS = {
  hidden:  { y: '110%', opacity: 0, rotateX: -40 },
  visible: (i) => ({
    y: '0%', opacity: 1, rotateX: 0,
    transition: { duration: 0.48, delay: i * 0.042, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: (i) => ({
    y: '-110%', opacity: 0, rotateX: 40,
    transition: { duration: 0.26, delay: i * 0.018, ease: [0.55, 0, 1, 0.45] },
  }),
};

const gradientTextStyle = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 50%, #7B61FF 100%)',
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'gradShift 5s ease infinite',
};

/* ─── AnimatedWord ───────────────────────────────────────────────────── */
function AnimatedWord({ word, isMobile }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        overflow: 'visible',
        verticalAlign: 'baseline',
        lineHeight: 'inherit',
        paddingBottom: isMobile ? '0.12em' : '0.08em',
        marginBottom: isMobile ? '-0.12em' : '-0.08em',
        paddingTop: '0.1em',
        marginTop: '-0.1em',
        perspective: '600px',
      }}
    >
      {word.split('').map((char, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={LETTER_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            display: 'inline-block',
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity',
            ...gradientTextStyle,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const { isDark } = useTheme();
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const w = window.innerWidth;
      setIsMobile(w < 600);
      setIsTablet(w >= 600 && w < 900);
    };
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const headlineFontSize = isMobile
    ? 'clamp(1.85rem, 8.5vw, 2.5rem)'
    : isTablet
      ? 'clamp(2.8rem, 7vw, 4.6rem)'
      : 'clamp(4.6rem, 7vw, 8.5rem)';

  return (
    <section
      data-scroll-section="hero"
      aria-label="Hero section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        background: isDark
          ? '#111823'
          : 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFB 45%, #F0F9F7 100%)',
        transition: 'background 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Orbs + noise */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 'min(700px, 85vw)', height: 'min(700px, 85vw)',
          background: isDark
            ? 'radial-gradient(ellipse at 75% 25%, rgba(0,200,168,0.22) 0%, rgba(0,200,168,0.06) 45%, transparent 70%)'
            : 'radial-gradient(ellipse at 80% 20%, rgba(0,200,168,0.08) 0%, transparent 65%)',
          transform: 'translate(10%, -10%)',
          transition: 'background 0.7s ease',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 'min(600px, 75vw)', height: 'min(600px, 75vw)',
          background: isDark
            ? 'radial-gradient(ellipse at 25% 75%, rgba(123,97,255,0.18) 0%, rgba(123,97,255,0.05) 50%, transparent 70%)'
            : 'radial-gradient(ellipse at 20% 80%, rgba(123,97,255,0.05) 0%, transparent 65%)',
          transform: 'translate(-10%, 10%)',
          transition: 'background 0.7s ease',
        }} />
        {isDark && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }} />
        )}
      </div>

      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '860px' : '1320px',
        margin: '0 auto',
        padding: isMobile
          ? '5rem 1.5rem 3rem'
          : isTablet
            ? 'clamp(4rem, 8vw, 5.5rem) 2rem clamp(3rem, 6vw, 4.5rem)'
            : 'clamp(6rem, 8vw, 7rem) 2.5rem clamp(3.5rem, 6vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`We Engineer Digital Products That ${ROTATING_WORDS[wordIndex]}.`}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: headlineFontSize,
            lineHeight: isMobile ? 1.18 : 1.05,
            letterSpacing: '-0.03em',
            color: isDark ? '#F8FAFC' : '#111318',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            transition: 'color 0.5s ease',
            marginBottom: isMobile ? '1.1rem' : isTablet ? '1.25rem' : '1.5rem',
            width: '100%',
            overflow: 'visible',
          }}
        >
          {isMobile ? (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.02em' }}>
              <span style={{ display: 'block' }}>We Engineer</span>
              <span style={{ display: 'block' }}>Digital Products</span>
              <span style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                overflow: 'visible',
                paddingTop: '0.1em',
                paddingBottom: '0.15em',
              }}>
                <span style={{ whiteSpace: 'nowrap' }}>That&nbsp;</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  minWidth: 0,
                  width: 'auto',
                  overflow: 'visible',
                  position: 'relative',
                }}>
                  <AnimatePresence mode="wait">
                    <AnimatedWord key={wordIndex} word={ROTATING_WORDS[wordIndex]} isMobile />
                  </AnimatePresence>
                </span>
                <span style={{ ...gradientTextStyle, display: 'inline-block' }}>.</span>
              </span>
            </span>
          ) : (
            <>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                We Engineer Digital
              </span>
              <span style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline',
                whiteSpace: 'nowrap',
                flexWrap: 'nowrap',
                overflow: 'visible',
                gap: 0,
              }}>
                <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                  Products That&nbsp;
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  position: 'relative',
                  width: 'auto',
                  overflow: 'visible',
                  flexShrink: 0,
                }}>
                  <AnimatePresence mode="wait">
                    <AnimatedWord key={wordIndex} word={ROTATING_WORDS[wordIndex]} />
                  </AnimatePresence>
                </span>
                <span style={{ ...gradientTextStyle, display: 'inline-block', flexShrink: 0 }}>.</span>
              </span>
            </>
          )}
        </motion.h1>

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? '0.95rem' : isTablet ? 'clamp(1rem, 2vw, 1.15rem)' : 'clamp(1.1rem, 1.6vw, 1.35rem)',
            lineHeight: 1.78,
            color: isDark ? '#64748B' : '#6B7A8D',
            maxWidth: isMobile ? '100%' : isTablet ? '560px' : '720px',
            marginBottom: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2rem',
            transition: 'color 0.5s ease',
            padding: isMobile ? '0 0.5rem' : 0,
            textWrap: 'pretty',
          }}
        >
          WebieApp Solutions LLC delivers bespoke web products, SaaS platforms, and{' '}
          <span style={{
            color: isDark ? '#CBD5E0' : '#2E3540',
            fontWeight: 500,
            transition: 'color 0.5s ease',
          }}>
            Autism & ABA business consulting
          </span>{' '}
          to enterprises across the globe.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: isMobile ? '12px' : isTablet ? '14px' : '18px',
            width: isMobile ? '100%' : 'auto',
            boxSizing: 'border-box',
          }}
        >
          <FillButton to="/contact" fullWidth={isMobile} isDesktop={!isMobile && !isTablet}>
            Book Free Consultation
          </FillButton>
          <div style={{
            width: isMobile ? '100%' : 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button
              to="/portfolio"
              variant="ghost"
              size="lg"
              style={isMobile ? { width: '100%' } : {}}
            >
              View Our Work
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
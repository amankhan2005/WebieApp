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
        padding: isDesktop ? '17px 38px' : '16px 28px',
        borderRadius: '14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: isDesktop ? '1.05rem' : '1rem',
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        border: 'none',
        width: fullWidth ? '100%' : 'auto',
        boxSizing: 'border-box',
        letterSpacing: isDesktop ? '0.01em' : '0.02em',
        boxShadow: !isDesktop
          ? '0 8px 32px rgba(0, 200, 168, 0.28), 0 2px 8px rgba(0,0,0,0.12)'
          : 'none',
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

const ROTATING_WORDS = ['Win', 'Succeed', 'Scale', 'Perform', 'Matter'];

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
    ? 'clamp(2.55rem, 11vw, 3.25rem)'           // ← bigger & bolder on mobile
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
        {/* ── Mobile-specific soft glow bloom behind headline ── */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '340px',
            height: '340px',
            background: isDark
              ? 'radial-gradient(ellipse at 50% 40%, rgba(0,200,168,0.13) 0%, rgba(123,97,255,0.09) 50%, transparent 75%)'
              : 'radial-gradient(ellipse at 50% 40%, rgba(0,200,168,0.10) 0%, rgba(123,97,255,0.06) 50%, transparent 75%)',
            animation: 'mobileGlow 6s ease-in-out infinite',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
        )}

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
        @keyframes mobileGlow {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.12); }
        }
        @keyframes accentPulse {
          0%, 100% { opacity: 0.55; width: 36px; }
          50%       { opacity: 1;   width: 56px; }
        }
      `}</style>

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '860px' : '1320px',
        margin: '0 auto',
        /* ── Mobile padding: more generous top, refined sides ── */
        padding: isMobile
          ? '4.5rem 1.75rem 4rem'
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

        {/* ── Mobile accent rule ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '44px',
              height: '3px',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #00C8A8, #7B61FF)',
              marginBottom: '1.5rem',
              transformOrigin: 'left center',
              animation: 'accentPulse 3s ease-in-out infinite',
            }}
          />
        )}

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
            /* ── Mobile: tighter leading for editorial impact ── */
            lineHeight: isMobile ? 1.1 : 1.05,
            letterSpacing: isMobile ? '-0.035em' : '-0.03em',
            color: isDark ? '#F8FAFC' : '#111318',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            transition: 'color 0.5s ease',
            /* ── Mobile: tighter bottom margin, headline breathes more ── */
            marginBottom: isMobile ? '1.4rem' : isTablet ? '1.25rem' : '1.5rem',
            width: '100%',
            overflow: 'visible',
          }}
        >
          {isMobile ? (
            /* ── MOBILE HEADLINE LAYOUT ── */
            <span style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.04em',
            }}>
              {/* Line 1: "We Engineer" */}
              <span style={{
                display: 'block',
                color: isDark ? '#F8FAFC' : '#111318',
              }}>
                We Engineer
              </span>

              {/* Line 2: "Digital Products" — slightly de-emphasized */}
              <span style={{
                display: 'block',
                color: isDark ? '#CBD5E1' : '#2E3540',
              }}>
                Digital Products
              </span>

              {/* Line 3: "That {Word}." — hero moment */}
              <span style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                overflow: 'visible',
                paddingTop: '0.06em',
                paddingBottom: '0.18em',
                marginTop: '0.06em',
              }}>
                <span style={{
                  whiteSpace: 'nowrap',
                  color: isDark ? '#F8FAFC' : '#111318',
                }}>
                  That&nbsp;
                </span>
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
            /* ── DESKTOP / TABLET — unchanged ── */
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
            fontSize: isMobile
              ? '1.0rem'                             // ← slightly larger for readability
              : isTablet
                ? 'clamp(1rem, 2vw, 1.15rem)'
                : 'clamp(1.1rem, 1.6vw, 1.35rem)',
            lineHeight: isMobile ? 1.82 : 1.78,
            color: isDark ? '#64748B' : '#6B7A8D',
            /* ── Mobile: slightly narrower max-width keeps line length comfortable ── */
            maxWidth: isMobile ? '88%' : isTablet ? '560px' : '720px',
            marginBottom: isMobile ? '2.25rem' : isTablet ? '1.75rem' : '2rem',
            transition: 'color 0.5s ease',
            padding: 0,
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
            /* ── Mobile: tighter gap, full-bleed feel ── */
            gap: isMobile ? '14px' : isTablet ? '14px' : '18px',
            width: isMobile ? '100%' : 'auto',
            boxSizing: 'border-box',
            /* ── Mobile: subtle max-width keeps buttons from stretching too wide on large phones ── */
            maxWidth: isMobile ? '360px' : 'none',
            alignSelf: isMobile ? 'center' : 'auto',
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
              style={isMobile
                ? {
                    width: '100%',
                    /* ── Mobile ghost button: subtle border elevation ── */
                    border: isDark
                      ? '1.5px solid rgba(255,255,255,0.12)'
                      : '1.5px solid rgba(17,19,24,0.10)',
                    borderRadius: '14px',
                    padding: '15px 28px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    letterSpacing: '0.01em',
                  }
                : {}
              }
            >
              View Our Work
            </Button>
          </div>
        </motion.div>

        {/* ── Mobile: social proof micro-line ── */}
        {isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{
              marginTop: '2rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              color: isDark ? 'rgba(100,116,139,0.7)' : 'rgba(107,122,141,0.65)',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Trusted by enterprises worldwide
          </motion.p>
        )}

      </div>
    </section>
  );
}
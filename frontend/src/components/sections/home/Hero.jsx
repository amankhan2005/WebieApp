import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Button from '../../ui/Button.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

function FillButton({ to, children }) {
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
        gap: '8px',
        padding: '14px 32px',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        fontWeight: 600,
        color: '#fff',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        border: 'none',
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

function useCountUp(target, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, [target, duration, started]);
  return value;
}

function StatItem({ value, suffix, label, started, isDark }) {
  const num = useCountUp(value, 1800, started);
  return (
    <div style={{ flex: '1 1 110px', maxWidth: '200px', textAlign: 'center', padding: '0 1.5rem', position: 'relative' }}>
      <span style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 4.5vw, 3rem)',
        lineHeight: 1,
        color: isDark ? '#F1F5F9' : '#111318',
        display: 'block',
        transition: 'color 0.5s ease',
      }}>
        {num}{suffix}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: isDark ? '#475569' : '#8C9BAD',
        marginTop: '6px',
        display: 'block',
        transition: 'color 0.5s ease',
      }}>
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { v: 120, s: '+', l: 'Projects'  },
  { v: 85,  s: '+', l: 'Clients'   },
  { v: 12,  s: '+', l: 'Countries' },
  { v: 7,   s: '+', l: 'Years'     },
];

export default function Hero() {
  const { isDark } = useTheme();
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section
      data-scroll-section="hero"
      aria-label="Hero section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        // Dark: true deep black. Light: clean white.
        background: isDark
          ? '#09090B'
          : 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFB 45%, #F0F9F7 100%)',
        transition: 'background 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @media (max-width: 600px) {
          .hero-headline { white-space: normal !important; }
          .hero-ctas { flex-direction: column !important; width: 100% !important; max-width: 320px !important; }
          .hero-ctas a { width: 100% !important; justify-content: center !important; }
          .stat-divider { display: none !important; }
        }
      `}</style>

      {/* Teal orb — stronger in dark mode */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0,
        width: 'min(700px, 85vw)',
        height: 'min(700px, 85vw)',
        background: isDark
          ? 'radial-gradient(ellipse at 75% 25%, rgba(0,200,168,0.22) 0%, rgba(0,200,168,0.06) 45%, transparent 70%)'
          : 'radial-gradient(ellipse at 80% 20%, rgba(0,200,168,0.08) 0%, transparent 65%)',
        transform: 'translate(10%, -10%)',
        pointerEvents: 'none',
        transition: 'background 0.7s ease',
      }} />

      {/* Purple orb — stronger in dark mode */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 'min(600px, 75vw)',
        height: 'min(600px, 75vw)',
        background: isDark
          ? 'radial-gradient(ellipse at 25% 75%, rgba(123,97,255,0.18) 0%, rgba(123,97,255,0.05) 50%, transparent 70%)'
          : 'radial-gradient(ellipse at 20% 80%, rgba(123,97,255,0.05) 0%, transparent 65%)',
        transform: 'translate(-10%, 10%)',
        pointerEvents: 'none',
        transition: 'background 0.7s ease',
      }} />

      {/* Subtle noise texture in dark mode only */}
      {isDark && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.4,
        }} />
      )}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '960px',
        margin: '0 auto',
        padding: 'clamp(6rem, 12vw, 9rem) 1.5rem clamp(4rem, 8vw, 6rem)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>

       

        {/* Headline */}
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label="We Engineer Digital Products That Win."
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            lineHeight: 1.03,
            letterSpacing: '-0.03em',
            color: isDark ? '#F8FAFC' : '#111318',
            whiteSpace: 'nowrap',
            transition: 'color 0.5s ease',
            marginBottom: '1.75rem',
          }}
        >
          <span style={{ display: 'block' }}>We Engineer Digital</span>
          <span style={{ display: 'block' }}>
            Products That{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradShift 4s ease infinite',
            }}>
              Win.
            </span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            lineHeight: 1.7,
            color: isDark ? '#64748B' : '#6B7A8D',
            maxWidth: '580px',
            marginBottom: '2.5rem',
            transition: 'color 0.5s ease',
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

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: '14px',
            marginBottom: '3.5rem',
          }}
        >
          <FillButton to="/contact">Book Free Consultation</FillButton>
          <Button to="/portfolio" variant="ghost" size="lg">
            View Our Work
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            width: '100%',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)'}`,
            paddingTop: '2.5rem',
            transition: 'border-color 0.5s ease',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ position: 'relative', flex: '1 1 110px', maxWidth: '200px' }}>
                {i > 0 && (
                  <span className="stat-divider" style={{
                    position: 'absolute', left: 0, top: '50%',
                    transform: 'translateY(-50%)',
                    height: '36px', width: '1px',
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  }} />
                )}
                <StatItem
                  value={s.v} suffix={s.s} label={s.l}
                  started={inView} isDark={isDark}
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
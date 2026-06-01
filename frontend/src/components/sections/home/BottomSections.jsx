import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { STATS, PROCESS_STEPS, INDUSTRIES, TESTIMONIALS } from '../../../data/siteData.js';
import { AnimatedCounter, StarRating } from '../../ui/index.jsx';
import Button, { ArrowRight } from '../../ui/Button.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

const fadeUp = (i = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
});

const GradientSpan = () => ({
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

// ── Industry SVG icons ─────────────────────────────────────
const IND_ICONS = {
  'Healthcare & ABA': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  'SaaS & Technology': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  'E-Commerce': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  'Finance & Fintech': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  'Education': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  'Government': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <line x1="6" y1="18" x2="6" y2="11"/>
      <line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/>
      <line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  ),
  'Real Estate': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  'Startups': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
};

const IND_ICON_BG = {
  'Healthcare & ABA':  { bg: 'rgba(14,165,233,0.08)',  border: 'rgba(14,165,233,0.20)'  },
  'SaaS & Technology': { bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.20)'  },
  'E-Commerce':        { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.20)'  },
  'Finance & Fintech': { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.20)'  },
  'Education':         { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.20)'  },
  'Government':        { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.20)'  },
  'Real Estate':       { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.20)'  },
  'Startups':          { bg: 'rgba(0,200,168,0.08)',   border: 'rgba(0,200,168,0.20)'   },
};

// ── STATS ─────────────────────────────────────────────────
export function StatsSection() {
  // Stats band is always dark — keep #18202E to blend with surrounding navy sections
  return (
    <section
      data-scroll-section="stats"
      aria-label="Statistics"
      style={{
        background: '#18202E',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,200,168,0.10) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div className="container-xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 text-center">
          {STATS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1, letterSpacing: '-0.03em',
                color: '#F1F5F9', marginBottom: '8px',
              }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} duration={2200} />
              </div>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 500,
                fontSize: '14px', color: 'rgba(255,255,255,0.65)',
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: 'rgba(255,255,255,0.35)', marginTop: '2px',
              }}>
                {s.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────
export function ProcessSection() {
  const { isDark } = useTheme();
  const [activeStep, setActiveStep] = useState(null);

  // ── aligned with About page dark palette ──
  const sectionBg    = isDark ? '#131C28' : '#FFFFFF';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#F8FAFB';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.07)';

  return (
    <section
      aria-labelledby="process-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">

        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8', marginBottom: '20px',
          }}>
            Our Process
          </p>
          <h2
            id="process-h"
            style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: headingColor, marginBottom: '20px',
              transition: 'color 0.5s ease',
            }}
          >
            From idea
            <br />
            <span style={GradientSpan()}>to exceptional product.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.7,
            transition: 'color 0.5s ease',
          }}>
            A refined 6-phase delivery framework built over 7+ years of shipping
            premium digital products globally.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0', position: 'relative',
          }}>
            {/* Connector line */}
            <div aria-hidden style={{
              position: 'absolute', top: '36px',
              left: '8.33%', right: '8.33%', height: '1px',
              background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(0,200,168,0.2)' : 'rgba(0,200,168,0.3)'} 15%, ${isDark ? 'rgba(0,200,168,0.2)' : 'rgba(0,200,168,0.3)'} 85%, transparent)`,
              zIndex: 0,
            }} />

            {PROCESS_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.09)}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                    padding: '0 6px', cursor: 'default',
                    position: 'relative', zIndex: 1,
                  }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Circle */}
                  <motion.div
                    animate={{
                      background: isActive
                        ? (isDark ? 'rgba(0,200,168,0.12)' : 'rgba(0,200,168,0.08)')
                        : cardBg,
                      borderColor: isActive ? 'rgba(0,200,168,0.35)' : cardBorder,
                      boxShadow: isActive
                        ? `0 0 0 4px ${isDark ? 'rgba(0,200,168,0.08)' : 'rgba(0,200,168,0.10)'}, 0 8px 20px rgba(0,200,168,0.15)`
                        : 'none',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: '72px', height: '72px', borderRadius: '20px',
                      border: `1px solid ${cardBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '16px', position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <motion.span
                      animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.7 : 1 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '28px',
                        color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
                        lineHeight: 1, userSelect: 'none',
                      }}
                    >
                      {step.number}
                    </motion.span>

                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'flex-start', justifyContent: 'center',
                        gap: '4px', padding: '12px',
                      }}
                    >
                      {[70, 50, 85, 40].map((w, li) => (
                        <motion.div
                          key={li}
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? `${w}%` : 0 }}
                          transition={{ duration: 0.3, delay: li * 0.06, ease: 'easeOut' }}
                          style={{
                            height: '3px', borderRadius: '9999px',
                            background: li === 0
                              ? '#00C8A8'
                              : li === 2
                                ? '#0891b2'
                                : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.10)'),
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: isActive ? '#00C8A8' : (isDark ? '#475569' : '#CBD5E1'),
                    marginBottom: '5px', transition: 'color 0.25s ease',
                  }}>
                    {step.number}
                  </span>

                  <h3 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px',
                    color: isActive ? (isDark ? '#F1F5F9' : '#111318') : headingColor,
                    marginBottom: '6px', lineHeight: 1.3,
                    transition: 'color 0.25s ease',
                  }}>
                    {step.title}
                  </h3>

                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 3 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '10px',
                      color: bodyColor, lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{
            height: '2px',
            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)',
            borderRadius: '9999px', overflow: 'hidden',
            maxWidth: '480px', margin: '40px auto 0',
          }}>
            <motion.div
              animate={{
                width: activeStep !== null
                  ? `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`
                  : '0%',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00C8A8, #0891b2)',
                borderRadius: '9999px',
              }}
            />
          </div>
          {activeStep !== null && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center', marginTop: '10px',
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                color: '#00C8A8', letterSpacing: '0.06em',
              }}
            >
              Phase {activeStep + 1} of {PROCESS_STEPS.length} — {PROCESS_STEPS[activeStep].title}
            </motion.p>
          )}
        </div>

        {/* Mobile — accordion */}
        <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PROCESS_STEPS.map((step, i) => {
            const isOpen = activeStep === i;
            return (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                onClick={() => setActiveStep(isOpen ? null : i)}
                style={{
                  background: isOpen ? cardBg : (isDark ? '#18202E' : '#FAFAFA'),
                  borderRadius: '14px',
                  border: `1px solid ${isOpen ? 'rgba(0,200,168,0.25)' : cardBorder}`,
                  overflow: 'hidden', cursor: 'pointer',
                  boxShadow: isOpen
                    ? `0 0 0 3px ${isDark ? 'rgba(0,200,168,0.06)' : 'rgba(0,200,168,0.08)'}`
                    : 'none',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
                    background: isOpen ? 'rgba(0,200,168,0.10)' : cardBg,
                    border: `1px solid ${isOpen ? 'rgba(0,200,168,0.25)' : cardBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}>
                    {isOpen ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                      </svg>
                    ) : (
                      <span style={{
                        fontFamily: 'Sora, sans-serif', fontWeight: 700,
                        fontSize: '13px', color: isDark ? '#475569' : '#9CA3AF',
                      }}>
                        {step.number}
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '14px', flex: 1,
                    color: isOpen ? (isDark ? '#F1F5F9' : '#111318') : headingColor,
                    transition: 'color 0.25s ease',
                  }}>
                    {step.title}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: '20px', height: '20px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isOpen ? '#00C8A8' : (isDark ? '#475569' : '#CBD5E1'),
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        color: bodyColor, lineHeight: 1.7,
                        padding: '0 18px 18px 72px',
                        transition: 'color 0.5s ease',
                      }}>
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ── INDUSTRIES ─────────────────────────────────────────────
export function IndustriesSection() {
  const { isDark } = useTheme();

  // ── aligned with About page dark palette ──
  const sectionBg    = isDark ? '#18202E' : '#F8FAFB';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';

  return (
    <section
      aria-labelledby="ind-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div style={{ maxWidth: '672px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8', marginBottom: '20px',
          }}>
            Industries
          </p>
          <h2 id="ind-h" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            letterSpacing: '-0.035em', lineHeight: 1.04,
            color: headingColor, marginBottom: '20px',
            transition: 'color 0.5s ease',
          }}>
            Trusted across
            <br />
            <span style={GradientSpan()}>every sector.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '560px', margin: '0 auto',
            transition: 'color 0.5s ease',
          }}>
            From ABA clinics to government digital transformation — we serve
            the industries that matter most.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {INDUSTRIES.map((ind, i) => {
            const iconStyle = IND_ICON_BG[ind.name] || IND_ICON_BG['Startups'];
            return (
              <motion.div key={i} {...fadeUp(i * 0.06)}
                style={{
                  background: cardBg,
                  borderRadius: '16px', padding: '20px',
                  textAlign: 'center',
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                  cursor: 'default',
                  transition: 'background 0.5s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = iconStyle.border;
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 0 0 1px ${iconStyle.border}, 0 8px 24px rgba(0,0,0,0.2)`
                    : '0 8px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = cardBorder;
                  e.currentTarget.style.boxShadow = isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: iconStyle.bg,
                  border: `1px solid ${iconStyle.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                  transition: 'background 0.5s ease',
                }}>
                  {IND_ICONS[ind.name]}
                </div>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: '13px', color: headingColor,
                  marginBottom: '4px', transition: 'color 0.5s ease',
                }}>
                  {ind.name}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: bodyColor, transition: 'color 0.5s ease',
                }}>
                  {ind.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── AUTISM CTA BAND ────────────────────────────────────────
// Always-dark band — uses the deepest navy so it reads as a deliberate break
export function AutismCTABand() {
  return (
    <section
      data-scroll-section="autism-cta"
      aria-label="Autism ABA consulting"
      style={{
        background: '#131C28', position: 'relative',
        overflow: 'hidden', padding: '80px 0',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(0,200,168,0.10) 0%, transparent 60%)',
      }} />
      <div className="container-xl" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,200,168,0.12)',
              border: '1px solid rgba(0,200,168,0.25)',
              borderRadius: '9999px', padding: '4px 14px',
              color: '#00C8A8', fontFamily: 'Inter, sans-serif',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: '24px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C8A8', flexShrink: 0 }} />
              Autism & ABA Consulting
            </span>

            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F1F5F9', marginBottom: '20px',
            }}>
              Planning to launch
              <br />
              <span style={GradientSpan()}>an autism or ABA clinic?</span>
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
              maxWidth: '560px', margin: '0 auto', marginBottom: '40px',
            }}>
              We've helped ABA entrepreneurs across all 50 US states launch, brand,
              and grow their clinics — handling the entire business and digital side
              so you can focus on the families you serve.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
              <Button to="/autism-consulting" variant="primary" size="xl" iconRight={<ArrowRight />}>
                Start Your Clinic Journey
              </Button>
              <Button to="/contact" variant="white" size="xl">
                Book Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────
export function TestimonialsSection() {
  const { isDark } = useTheme();

  // ── aligned with About page dark palette ──
  const sectionBg    = isDark ? '#131C28' : '#FFFFFF';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const quoteColor   = isDark ? '#CBD5E1' : '#4B5563';
  const metaColor    = isDark ? '#64748B' : '#9CA3AF';
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.07)';
  const avatarBg     = isDark ? 'rgba(0,200,168,0.08)' : 'rgba(0,200,168,0.08)';
  const avatarBorder = isDark ? 'rgba(0,200,168,0.15)' : 'rgba(0,200,168,0.15)';

  return (
    <section
      aria-labelledby="test-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div style={{ maxWidth: '672px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8', marginBottom: '20px',
          }}>
            Client Stories
          </p>
          <h2 id="test-h" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            letterSpacing: '-0.035em', lineHeight: 1.04,
            color: headingColor, marginBottom: '20px',
            transition: 'color 0.5s ease',
          }}>
            What our clients
            <br />
            <span style={GradientSpan()}>say about us.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '560px', margin: '0 auto',
            transition: 'color 0.5s ease',
          }}>
            Real outcomes, real relationships — hear from the businesses
            who trust WebieApp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.article key={t.id} {...fadeUp(i * 0.1)}
              style={{
                background: cardBg,
                borderRadius: '16px', padding: '28px',
                border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column',
                transition: 'background 0.5s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
                e.currentTarget.style.boxShadow = isDark
                  ? '0 0 0 1px rgba(0,200,168,0.1), 0 8px 24px rgba(0,0,0,0.2)'
                  : '0 8px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = cardBorder;
                e.currentTarget.style.boxShadow = isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)';
              }}
            >
              <StarRating rating={t.rating} />

              <blockquote style={{
                marginTop: '16px', flex: 1,
                fontFamily: 'Inter, sans-serif', fontSize: '14px',
                color: quoteColor, lineHeight: 1.7, fontStyle: 'italic',
                transition: 'color 0.5s ease',
              }}>
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div style={{ marginTop: '20px', marginBottom: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                  color: '#00C8A8', background: 'rgba(0,200,168,0.10)',
                  border: '1px solid rgba(0,200,168,0.2)',
                  borderRadius: '6px', padding: '2px 10px',
                }}>
                  {t.service}
                </span>
              </div>

              <footer style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                paddingTop: '20px', borderTop: `1px solid ${dividerColor}`,
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: avatarBg, border: `1px solid ${avatarBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.5s ease',
                }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px', color: '#00C8A8' }}>
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '14px', color: headingColor, transition: 'color 0.5s ease' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: metaColor, transition: 'color 0.5s ease' }}>
                    {t.role} · {t.company}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: metaColor, opacity: 0.7 }}>
                    📍 {t.location}
                  </div>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA ──────────────────────────────────────────────
export function FinalCTA() {
  const { isDark } = useTheme();
  const wrapperBg = isDark ? '#18202E' : '#FFFFFF';

  return (
    <section
      aria-label="Call to action"
      className="section"
      style={{ background: wrapperBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: '24px', background: '#131C28',
          padding: 'clamp(48px, 8vw, 80px) clamp(32px, 6vw, 64px)',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(0,200,168,0.09) 0%, transparent 60%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '400px', height: '400px', pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 20% 80%, rgba(123,97,255,0.08) 0%, transparent 65%)',
            transform: 'translate(-20%, 20%)',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,200,168,0.10)',
              border: '1px solid rgba(0,200,168,0.2)',
              borderRadius: '9999px', padding: '4px 14px',
              color: '#00C8A8', fontFamily: 'Inter, sans-serif',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: '24px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C8A8', flexShrink: 0 }} />
              Ready to Start?
            </span>

            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F1F5F9', marginBottom: '20px', display: 'block',
            }}>
              Let's build something
              <br />
              <span style={GradientSpan()}>extraordinary together.</span>
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
              maxWidth: '520px', margin: '0 auto', marginBottom: '40px',
            }}>
              Book a free consultation and discover how WebieApp can accelerate
              your business to its full digital potential.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <Button to="/contact" variant="primary" size="xl" iconRight={<ArrowRight />}>
                Book Free Consultation
              </Button>
              <Button to="/services" variant="white" size="xl">
                Explore Services
              </Button>
            </div>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              color: 'rgba(255,255,255,0.30)', marginTop: '32px',
            }}>
              No obligations · No spam · Response within 24 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
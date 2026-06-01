import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES, WHY_CHOOSE_US } from '../../../data/siteData.js';
import Button, { ArrowRight } from '../../ui/Button.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
});

// ── CLIENT LOGOS ───────────────────────────────────────────
const CLIENT_LOGOS = [
  { name: 'KnowLiberia',         file: 'knowlliberia',                       w: 180, h: 78 },
  { name: 'Bloomvera Autism',    file: 'bloomvera',                          w: 120, h: 92 },
  { name: 'Autism Violet',       file: 'autism-violet',                      w: 120, h: 88 },
  { name: 'SafeRide Delivery',   file: 'saferide',                           w: 180, h: 80 },
  { name: 'Autism Solved',       file: 'autismsolved',                       w: 120, h: 68 },
  { name: 'Alliance Behavioral', file: 'alliancebehavioraltherapysolutions', w: 120, h: 88 },
  { name: 'Vital Trust',         file: 'vital-trust',                        w: 120, h: 88 },
  { name: 'Zenithcare Service',  file: 'zenithcare',                         w: 180, h: 82 },
  { name: 'Dove Autism',         file: 'doveautism',                         w: 180, h: 80 },
];

function ClientLogo({ name, file, w, h, isDark }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: w, height: 64 }}
    >
      <img
        src={`/client/${file}.png`}
        alt={name}
        width={w}
        height={h}
        className="max-w-full max-h-full object-contain"
        style={{ opacity: 1, filter: 'none' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fb = e.currentTarget.nextElementSibling;
          if (fb) fb.style.display = 'flex';
        }}
      />
      <span
        style={{
          display: 'none',
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '-0.02em',
          color: isDark ? '#3F3F46' : '#D1D5DB',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
        aria-hidden
      >
        {name}
      </span>
    </div>
  );
}

export function ClientMarquee() {
  const { isDark } = useTheme();

  const row1        = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const row2        = [...CLIENT_LOGOS].reverse();
  const row2doubled = [...row2, ...row2];

  // ── aligned with About page dark palette ──
  const sectionBg   = isDark ? '#18202E' : '#F8FAFC';
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const fadeColorL  = isDark ? '#18202E' : '#F8FAFC';

  return (
    <section
      data-scroll-section="marquee"
      aria-label="Trusted clients"
      style={{
        background: sectionBg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '88px',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}
    >
      {/* Heading */}
      <div className="container-xl text-center mb-14 px-6">
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
          fontSize: '11px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#00C8A8',
          marginBottom: '1.25rem',
        }}>
          Trusted by Businesses Across Industries
        </p>
        <h2 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 800,
          fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
          letterSpacing: '-0.035em', lineHeight: 1.04,
          color: isDark ? '#F1F5F9' : '#111318',
          transition: 'color 0.5s ease',
        }}>
          Built for the brands
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            that mean business.
          </span>
        </h2>
      </div>

      {/* Row 1 — left scroll */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '128px', zIndex: 10,
          background: `linear-gradient(90deg, ${fadeColorL}, transparent)`,
          pointerEvents: 'none', transition: 'background 0.5s ease',
        }} />
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '128px', zIndex: 10,
          background: `linear-gradient(270deg, ${fadeColorL}, transparent)`,
          pointerEvents: 'none', transition: 'background 0.5s ease',
        }} />
        <div style={{ display: 'flex', overflow: 'hidden' }} aria-hidden>
          <div style={{
            display: 'flex', alignItems: 'center',
            width: 'max-content',
            animation: 'marquee-left 42s linear infinite',
          }}>
            {row1.map((logo, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, padding: '0 40px', height: '72px',
                borderRight: `1px solid ${borderColor}`,
                transition: 'border-color 0.5s ease',
              }}>
                <ClientLogo name={logo.name} file={logo.file} w={logo.w} h={logo.h} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div style={{ position: 'relative' }}>
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '128px', zIndex: 10,
          background: `linear-gradient(90deg, ${fadeColorL}, transparent)`,
          pointerEvents: 'none', transition: 'background 0.5s ease',
        }} />
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '128px', zIndex: 10,
          background: `linear-gradient(270deg, ${fadeColorL}, transparent)`,
          pointerEvents: 'none', transition: 'background 0.5s ease',
        }} />
        <div style={{ display: 'flex', overflow: 'hidden' }} aria-hidden>
          <div style={{
            display: 'flex', alignItems: 'center',
            width: 'max-content',
            animation: 'marquee-right 48s linear infinite',
          }}>
            {row2doubled.map((logo, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, padding: '0 40px', height: '72px',
                borderRight: `1px solid ${borderColor}`,
                transition: 'border-color 0.5s ease',
              }}>
                <ClientLogo name={logo.name} file={logo.file} w={logo.w} h={logo.h} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="sr-only">
        {CLIENT_LOGOS.map((l) => <li key={l.file}>{l.name}</li>)}
      </ul>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ── SERVICES GRID ──────────────────────────────────────────
const SVC_ICONS = {
  Globe: (
    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  ),
  Zap: (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  TrendingUp: (
    <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 6 23 6 23 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  Target: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  Share2: (
    <>
      <circle cx="18" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  Layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polyline points="2 17 12 22 22 17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="2 12 12 17 22 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  Heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

function ServiceCard({ svc, index, isDark }) {
  // ── aligned with About page dark palette ──
  const cardBg     = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const iconBg     = isDark ? 'rgba(0,200,168,0.08)' : '#F8FAFB';
  const iconBorder = isDark ? 'rgba(0,200,168,0.15)' : 'rgba(15,23,42,0.08)';
  const titleColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor  = isDark ? '#94A3B8' : '#6B7A8D';
  const badgeBg    = isDark ? 'rgba(0,200,168,0.10)' : '#F0FDF9';
  const badgeColor = isDark ? '#2DD4BF' : '#0F766E';

  return (
    <motion.article {...fadeUp(index)} className="group">
      <Link
        to={`/services#${svc.id}`}
        className="flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
          e.currentTarget.style.boxShadow = isDark
            ? '0 0 0 1px rgba(0,200,168,0.1), 0 8px 24px rgba(0,0,0,0.2)'
            : '0 8px 24px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = cardBorder;
          e.currentTarget.style.boxShadow = isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)';
        }}
        aria-label={`${svc.title} — ${svc.short}`}
      >
        {svc.isSpecialty && (
          <span style={{
            alignSelf: 'flex-start',
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: '11px', color: badgeColor, background: badgeBg,
            border: `1px solid ${isDark ? 'rgba(0,200,168,0.2)' : 'transparent'}`,
            borderRadius: '4px', padding: '2px 8px', marginBottom: '12px',
            transition: 'background 0.5s ease, color 0.5s ease',
          }}>
            Specialty
          </span>
        )}

        <div
          className="group-hover:scale-105 transition-transform duration-300"
          style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: iconBg, border: `1px solid ${iconBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px',
            color: '#00C8A8', flexShrink: 0,
            transition: 'background 0.5s ease, border-color 0.5s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            {SVC_ICONS[svc.icon]}
          </svg>
        </div>

        <h3 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '15px', color: titleColor,
          marginBottom: '8px', lineHeight: 1.3,
          transition: 'color 0.5s ease',
        }}>
          {svc.title}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: bodyColor, lineHeight: 1.65, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          transition: 'color 0.5s ease',
        }}>
          {svc.short}
        </p>

        <div
          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          style={{
            marginTop: '20px', display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: '12px', color: '#00C8A8',
          }}
        >
          Learn more
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.article>
  );
}

export function ServicesGrid() {
  const { isDark } = useTheme();

  // ── alternating section bg matching About page rhythm ──
  const sectionBg    = isDark ? '#131C28' : '#FFFFFF';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';

  return (
    <section
      data-scroll-section="services"
      id="services"
      aria-labelledby="services-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div style={{ maxWidth: '672px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8',
            marginBottom: '1.25rem',
          }}>
            Our Services
          </p>
          <h2
            id="services-h"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.04,
              color: headingColor,
              marginBottom: '1.25rem',
              transition: 'color 0.5s ease',
            }}
          >
            Everything you need{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              to scale.
            </span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto',
            transition: 'color 0.5s ease',
          }}>
            Premium digital services engineered to produce measurable business
            outcomes — from custom websites to specialized ABA consulting.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} isDark={isDark} />
          ))}
        </div>

        <motion.div {...fadeUp(0.5)} style={{ marginTop: '40px', textAlign: 'center' }}>
          <Button to="/services" variant="primary" size="md" iconRight={<ArrowRight />}>
            Explore All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ── WHY CHOOSE US ──────────────────────────────────────────
const WHY_ICONS = {
  Shield: (
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  ),
  Fingerprint: (
    <>
      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M5 12a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M8 12a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M11 12a1 1 0 0 1 2 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </>
  ),
  Heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Globe: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </>
  ),
  BarChart2: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  Users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </>
  ),
};

export function WhyChooseUs() {
  const { isDark } = useTheme();

  // ── aligned with About page dark palette ──
  const sectionBg    = isDark ? '#18202E' : '#F8FAFB';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const iconBg       = isDark ? 'rgba(0,200,168,0.08)' : '#F8FAFB';
  const iconBorder   = isDark ? 'rgba(0,200,168,0.15)' : 'rgba(15,23,42,0.08)';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';

  return (
    <section
      aria-labelledby="why-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-24">
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#00C8A8',
              marginBottom: '1.25rem',
            }}>
              Why WebieApp
            </p>

            <h2
              id="why-h"
              style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                letterSpacing: '-0.035em', lineHeight: 1.04,
                color: headingColor, marginBottom: '1.25rem',
                transition: 'color 0.5s ease',
              }}
            >
              Why smart
              <br />
              businesses{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                choose us.
              </span>
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: bodyColor, lineHeight: 1.7,
              maxWidth: '400px', transition: 'color 0.5s ease',
            }}>
              We're not a vendor. We're a strategic technology partner — with the
              expertise, integrity, and senior-level attention your business deserves.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button to="/about" variant="primary" size="md" iconRight={<ArrowRight />}>
                About Our Agency
              </Button>
              <Button to="/contact" variant="ghost" size="md">
                Start a Project
              </Button>
            </div>

            {/* Stat card */}
            <div style={{
              marginTop: '40px', borderRadius: '16px', padding: '24px',
              background: cardBg, border: `1px solid ${cardBorder}`,
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'background 0.5s ease, border-color 0.5s ease',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px',
                background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                94%
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '14px',
                color: bodyColor, lineHeight: 1.6,
                transition: 'color 0.5s ease',
              }}>
                of clients return for additional projects or refer WebieApp
                to their network within 12 months.
              </p>
            </div>
          </div>

          {/* Right — cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.icon}
                {...fadeUp(i * 0.07)}
                style={{
                  borderRadius: '16px', padding: '20px',
                  background: cardBg, border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                  transition: 'background 0.5s ease, border-color 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
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
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: iconBg, border: `1px solid ${iconBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#00C8A8',
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
                    {WHY_ICONS[item.icon]}
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '14px', color: headingColor,
                  marginBottom: '6px', lineHeight: 1.3,
                  transition: 'color 0.5s ease',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: bodyColor, lineHeight: 1.65,
                  transition: 'color 0.5s ease',
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import Button, { ArrowRight } from '../../ui/Button.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

const CAT_COLORS = {
  'Autism & ABA':      { bg: 'rgba(0,200,168,0.15)',  text: '#00A88F', border: 'rgba(0,200,168,0.30)'  },
  'Healthcare':        { bg: 'rgba(14,165,233,0.15)', text: '#0284C7', border: 'rgba(14,165,233,0.30)' },
  'SaaS':              { bg: 'rgba(124,58,237,0.15)', text: '#7C3AED', border: 'rgba(124,58,237,0.30)' },
  'Web Development':   { bg: 'rgba(0,200,168,0.12)',  text: '#00A88F', border: 'rgba(0,200,168,0.25)'  },
  'Mobile App':        { bg: 'rgba(234,88,12,0.15)',  text: '#C2410C', border: 'rgba(234,88,12,0.30)'  },
  'Marketing':         { bg: 'rgba(219,39,119,0.15)', text: '#BE185D', border: 'rgba(219,39,119,0.30)' },
  'Logistics':         { bg: 'rgba(245,158,11,0.15)', text: '#B45309', border: 'rgba(245,158,11,0.30)' },
  'Real Estate':       { bg: 'rgba(99,102,241,0.15)', text: '#4338CA', border: 'rgba(99,102,241,0.30)' },
  'Property Platform': { bg: 'rgba(99,102,241,0.12)', text: '#4338CA', border: 'rgba(99,102,241,0.25)' },
};

const ACCENT_PALETTES = [
  { from: 'rgba(245,158,11,0.18)',  to: 'rgba(234,88,12,0.10)',   dot1: '#F59E0B', dot2: '#EA580C' },
  { from: 'rgba(99,102,241,0.16)',  to: 'rgba(14,165,233,0.08)',  dot1: '#6366F1', dot2: '#0EA5E9' },
  { from: 'rgba(0,200,168,0.18)',   to: 'rgba(8,145,178,0.10)',   dot1: '#00C8A8', dot2: '#0891b2' },
];

const FEATURED_PROJECTS = [
  {
    id:          1,
    title:       'Safe Ride Delivery',
    categories:  ['Logistics', 'Mobile App'],
    description: 'A complete logistics and delivery platform built for Liberia, enabling customers to request deliveries, riders to manage orders, and administrators to oversee operations through a centralized system.',
    results:     'Serving Liberia · Launched 2026',
    year:        '2026',
    featured:    true,
    image:       '/projects/safe-ride-delivery.png',
  },
  {
    id:          2,
    title:       'KnowLiberia',
    categories:  ['Real Estate', 'Property Platform'],
    description: 'A modern property discovery platform for Liberia, helping users explore homes, rental properties, commercial spaces, and land listings through an intuitive digital experience.',
    results:     'Serving Liberia · Launched 2026',
    year:        '2026',
    featured:    true,
    image:       '/projects/knowliberia.png',
  },
  {
    id:          3,
    title:       'Autism Violet',
    categories:  ['Autism & ABA', 'Healthcare'],
    description: 'A professional autism-focused website supporting families seeking ABA-related services, therapy information, and autism resources. Designed for clarity, accessibility, and trust for parents and caregivers.',
    results:     'Serving across Massachusetts',
    year:        '2026',
    featured:    true,
    image:       '/projects/autism-violet.png',
  },
];

function ProjectCard({ p, i, isDark }) {
  const palette      = ACCENT_PALETTES[i % ACCENT_PALETTES.length];

  // ── aligned with About page dark palette ──
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.07)';
  const cardShadow   = isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.05)';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)';
  const yearColor    = isDark ? '#475569' : '#CBD5E1';

  const imgAreaBg    = isDark ? '#131C28' : '#F4F5F7';

  const fadeOverlay  = isDark
    ? 'linear-gradient(to top, #1E293B 0%, transparent 80%)'
    : 'linear-gradient(to top, #FFFFFF 0%, transparent 80%)';

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: cardBg,
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1px solid ${cardBorder}`,
        boxShadow: cardShadow,
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
        e.currentTarget.style.boxShadow = isDark
          ? `0 0 0 1px rgba(0,200,168,0.1), 0 20px 40px rgba(0,0,0,0.3)`
          : '0 12px 40px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = cardBorder;
        e.currentTarget.style.boxShadow = cardShadow;
      }}
    >
      {/* ── Image area ── */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        background: imgAreaBg,
        overflow: 'hidden',
        aspectRatio: '16 / 10',
        transition: 'background 0.5s ease',
      }}>
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center center',
              padding: '12px',
              transition: 'transform 0.5s ease',
              display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onError={e => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Fallback — dot grid + abstract mark */}
        <div style={{
          display: p.image ? 'none' : 'flex',
          position: 'absolute', inset: 0,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              opacity: isDark ? 0.18 : 0.12,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`dots-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill={palette.dot1} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${i})`} />
          </svg>

          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.45)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)'}`,
            backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${palette.dot1}15`,
            position: 'relative', zIndex: 1,
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <rect x="3"  y="3"  width="9" height="9" rx="2.5" fill={palette.dot1} opacity="0.9" />
              <rect x="16" y="3"  width="9" height="9" rx="2.5" fill={palette.dot2} opacity="0.6" />
              <rect x="3"  y="16" width="9" height="9" rx="2.5" fill={palette.dot2} opacity="0.6" />
              <rect x="16" y="16" width="9" height="9" rx="2.5" fill={palette.dot1} opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Category badges */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          display: 'flex', flexWrap: 'wrap', gap: '5px',
          zIndex: 10,
        }}>
          {p.categories.map(c2 => {
            const s = CAT_COLORS[c2] || CAT_COLORS['Web Development'];
            return (
              <span key={c2} style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '9px', letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: '9999px',
                background: isDark
                  ? 'rgba(13,19,28,0.80)'
                  : 'rgba(255,255,255,0.88)',
                color: s.text,
                border: `1px solid ${s.border}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}>
                {c2}
              </span>
            );
          })}
        </div>

        {/* Featured badge */}
        {p.featured && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '9px', letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: '9999px',
              background: isDark ? 'rgba(13,19,28,0.80)' : 'rgba(255,255,255,0.88)',
              color: '#00C8A8',
              border: '1px solid rgba(0,200,168,0.35)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}>
              Featured
            </span>
          </div>
        )}

        {/* Bottom fade into card */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '32px', background: fadeOverlay,
          zIndex: 2, pointerEvents: 'none',
        }} />
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        <h3 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '15px', color: headingColor,
          marginBottom: '8px', lineHeight: 1.3,
          transition: 'color 0.5s ease',
        }}>
          {p.title}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: bodyColor, lineHeight: 1.7,
          marginBottom: '16px', flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          transition: 'color 0.5s ease',
        }}>
          {p.description}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: `1px solid ${dividerColor}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${palette.dot1}, ${palette.dot2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M5 8V2M2 5l3-3 3 3" stroke="#fff" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '11px', color: palette.dot1,
            }}>
              {p.results}
            </span>
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: yearColor, transition: 'color 0.5s ease',
          }}>
            {p.year}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects() {
  const { isDark } = useTheme();

  // ── alternates with surrounding sections ──
  const sectionBg    = isDark ? '#18202E' : '#F8FAFB';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';

  return (
    <section
      data-scroll-section="featured-projects"
      aria-labelledby="proj-h"
      className="section"
      style={{
        background: sectionBg,
        transition: 'background 0.5s ease',
      }}
    >
      <div className="container-xl">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8',
            marginBottom: '20px',
          }}>
            Featured Work
          </p>
          <h2
            id="proj-h"
            style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: headingColor, marginBottom: '16px',
              transition: 'color 0.5s ease',
            }}
          >
            Projects that
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              define excellence.
            </span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '480px', margin: '0 auto 28px',
            transition: 'color 0.5s ease',
          }}>
            A curated selection of our most impactful digital work — built for
            performance, crafted for longevity.
          </p>
          <Button to="/portfolio" variant="ghost" size="lg" iconRight={<ArrowRight />}>
            View All Projects
          </Button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} isDark={isDark} />
          ))}
        </div>

      </div>
    </section>
  );
}
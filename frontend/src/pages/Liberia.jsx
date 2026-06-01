import { motion }     from 'framer-motion';
import { Helmet }     from 'react-helmet-async';
import PageLayout      from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight } from '../components/ui/Button.jsx';
import { FinalCTA }   from '../components/sections/home/BottomSections.jsx';
import { useTheme }   from '../context/ThemeContext.jsx';

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const fadeUp = (i = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-50px' },
  transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
});

// ── SVG Icons ─────────────────────────────────────────────────────
const Icon = {
  // Pillar icons (20px)
  Government: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <line x1="6" y1="18" x2="6" y2="11"/>
      <line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/>
      <line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  ),
  Briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Smartphone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  GraduationCap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  BarChart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  ),
  // Case study visual icons (48px rendered at 48×48)
  Truck: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 5v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Building2: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <line x1="10" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="14" y2="6"/>
      <line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/>
      <line x1="10" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="14" y2="14"/>
      <line x1="10" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="14" y2="18"/>
    </svg>
  ),
  // Small trust / check
  Check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  // Flag for Liberia hero eyebrow
  Flag: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────────
const LIBERIA_PROJECTS = [
  {
    id:        'saferide',
    image:     '/projects/safe-ride-delivery.png',
    category:  'Logistics Platform',
    title:     'SafeRide Delivery',
    tagline:   'Modernizing Last-Mile Logistics in West Africa',
    challenge: 'Liberian logistics providers relied on fragmented, manual dispatch systems — resulting in delivery delays, lack of driver accountability, and zero real-time visibility for customers and business owners.',
    solution:  'We designed and developed a full-stack logistics and delivery management platform for SafeRide — enabling digital order dispatch, real-time driver tracking, automated invoicing, and a customer-facing status portal.',
    results: [
      'Operational efficiency improved by 60%',
      'Delivery tracking launched for the first time',
      'Driver management fully digitized',
      'Customer satisfaction scores increased significantly',
    ],
    tech:     ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'SMS Integration'],
    visualIcon: 'Truck',
    gradientDark:  'linear-gradient(135deg, #0A1A18 0%, #061412 100%)',
    gradientLight: 'linear-gradient(135deg, #F0FDF9 0%, #ECFEF7 100%)',
    year: '2026',
  },
  {
    id:        'property',
    image:     '/projects/knowliberia.png',
    category:  'Real Estate · Property Investment',
    title:     'Liberia Property Investment Platform',
    tagline:   'Connecting Investors to Liberian Real Estate Opportunities',
    challenge: 'Liberian real estate lacked a credible digital presence — making it nearly impossible for diaspora investors and international buyers to discover, evaluate, and invest in property opportunities with confidence.',
    solution:  'We developed a professional property investment platform for Liberia — featuring verified property listings, investor information portals, document management, and a secure inquiry system designed to build trust with international investors.',
    results: [
      'First professional real estate platform for the Liberian market',
      'Enabled remote property discovery for diaspora investors',
      'Investor inquiry pipeline fully digitized',
      'Professional brand identity established for the market',
    ],
    tech:     ['React', 'Node.js', 'MongoDB', 'Cloudinary', ],
    visualIcon: 'Building2',
    gradientDark:  'linear-gradient(135deg, #0A0E1A 0%, #060814 100%)',
    gradientLight: 'linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 100%)',
    year: '2026',
  },
];

const PILLARS = [
  { icon: 'Government',     title: 'Government Digital Transformation', desc: 'Partnering with Liberian institutions to build citizen-facing digital portals and e-governance platforms.' },
  { icon: 'Briefcase',      title: 'Business Digitization',             desc: 'Helping Liberian SMEs establish professional digital presence — websites, platforms, and growth tools.' },
  { icon: 'Smartphone',     title: 'Mobile-First Development',          desc: 'Building lightweight, offline-capable apps optimized for Liberia\'s connectivity landscape.' },
  { icon: 'GraduationCap',  title: 'Capacity Building',                 desc: 'Training local professionals in digital skills to create sustainable technology capability within communities.' },
  { icon: 'Globe',          title: 'Digital Infrastructure',            desc: 'Web applications and cloud deployments designed for reliability in emerging connectivity markets.' },
  { icon: 'BarChart',       title: 'Digital Marketing',                 desc: 'Helping Liberian businesses reach customers locally, regionally, and internationally.' },
];

const METRICS = [
  { v: '50K+', l: 'Citizens Served',     s: 'Through gov-tech portal'    },
  { v: '2022', l: 'Operations Launched', s: 'In West Africa'              },
  { v: '100%', l: 'Remote Delivery',     s: 'World-class quality anywhere'},
  { v: '2+',   l: 'Major Projects',      s: 'Liberia-specific platforms'  },
];

// ── Case study card ───────────────────────────────────────────────
function CaseStudyCard({ project, index }) {
  const { isDark } = useTheme();
  const isEven = index % 2 === 0;

  const cardBg       = isDark ? '#1E2A3A' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const subHeading   = isDark ? '#A1A1AA' : '#64748B';
  const techBg       = isDark ? 'rgba(255,255,255,0.05)' : '#F3F5F8';
  const techBorder   = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const techColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const resultBg     = isDark ? 'rgba(0,200,168,0.06)' : 'rgba(0,200,168,0.05)';
  const resultBorder = isDark ? 'rgba(0,200,168,0.15)' : 'rgba(0,200,168,0.18)';
  const resultText   = isDark ? '#A1A1AA' : '#374151';
  const dividerColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.07)';
  const visualBg     = isDark ? project.gradientDark : project.gradientLight;
  const yearBg       = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.80)';
  const yearBorder   = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)';
  const yearColor    = isDark ? '#A1A1AA' : '#6B7A8D';
  const catColor     = isDark ? '#00C8A8' : '#4A5568';
  const catBg        = isDark ? 'rgba(0,200,168,0.10)' : 'rgba(15,23,42,0.07)';
  const catBorder    = isDark ? 'rgba(0,200,168,0.20)' : 'transparent';

  return (
    <motion.article
      {...fadeUp(0)}
      id={project.id}
      style={{
        background: cardBg,
        borderRadius: '24px',
        border: `1px solid ${cardBorder}`,
        boxShadow: isDark ? 'none' : '0 4px 24px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }} className="cs-card-grid">

        {/* Visual side */}
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '320px', overflow: 'hidden',
          background: visualBg,
          order: isEven ? 0 : 1,
        }} className="cs-visual">
          {/* Project screenshot */}
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain', objectPosition: 'center',
                display: 'block', position: 'absolute', inset: 0,
                padding: '20px',
              }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
          {/* Fallback icon (shown if no image or image fails) */}
          <div style={{
            position: 'relative', zIndex: 2, textAlign: 'center',
            opacity: project.image ? 0 : 1,
            pointerEvents: 'none',
          }}>
            <div style={{
              width: '88px', height: '88px', borderRadius: '24px',
              background: isDark ? 'rgba(0,200,168,0.08)' : 'rgba(0,200,168,0.10)',
              border: '1px solid rgba(0,200,168,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              {Icon[project.visualIcon]}
            </div>
          </div>
          {/* Category badge — always visible over image */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 3 }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: '9999px',
              background: isDark ? 'rgba(18,28,40,0.88)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${catBorder || 'rgba(0,200,168,0.20)'}`,
              color: catColor,
            }}>
              {project.category}
            </span>
          </div>
          {/* Year badge */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 3 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              color: yearColor,
              background: isDark ? 'rgba(18,28,40,0.88)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px', borderRadius: '9999px',
              border: `1px solid ${yearBorder}`,
            }}>
              {project.year}
            </span>
          </div>

        </div>

        {/* Content side */}
        <div style={{
          padding: '48px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderLeft: isEven ? `1px solid ${dividerColor}` : 'none',
          borderRight: isEven ? 'none' : `1px solid ${dividerColor}`,
          order: isEven ? 1 : 0,
          transition: 'border-color 0.5s ease',
        }} className="cs-content">

          {/* Eyebrow */}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#00C8A8', marginBottom: '10px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: '16px', height: '1px', background: '#00C8A8' }} aria-hidden />
            {project.category}
          </p>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            letterSpacing: '-0.02em', lineHeight: 1.2,
            color: headingColor, marginBottom: '6px',
            transition: 'color 0.5s ease',
          }}>
            {project.title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: '#00C8A8', fontStyle: 'italic', marginBottom: '24px',
          }}>
            {project.tagline}
          </p>

          {/* Challenge */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: subHeading, marginBottom: '8px',
              transition: 'color 0.5s ease',
            }}>
              The Challenge
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: bodyColor, lineHeight: 1.7,
              transition: 'color 0.5s ease',
            }}>
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: subHeading, marginBottom: '8px',
              transition: 'color 0.5s ease',
            }}>
              Our Solution
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: bodyColor, lineHeight: 1.7,
              transition: 'color 0.5s ease',
            }}>
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div style={{
            padding: '16px 18px', borderRadius: '12px',
            background: resultBg, border: `1px solid ${resultBorder}`,
            marginBottom: '20px',
          }}>
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#00C8A8', marginBottom: '12px',
            }}>
              Results
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.results.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(0,200,168,0.10)', border: '1px solid rgba(0,200,168,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px',
                  }}>
                    {Icon.Check}
                  </div>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '12px',
                    color: resultText, lineHeight: 1.55,
                    transition: 'color 0.5s ease',
                  }}>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: subHeading, marginBottom: '8px',
              transition: 'color 0.5s ease',
            }}>
              Technology
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  padding: '2px 8px', borderRadius: '5px',
                  background: techBg, border: `1px solid ${techBorder}`,
                  color: techColor,
                  transition: 'background 0.5s ease, color 0.5s ease',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cs-card-grid {
            grid-template-columns: 1fr !important;
          }
          .cs-visual, .cs-content {
            order: unset !important;
            border-left: none !important;
            border-right: none !important;
          }
          .cs-content {
            padding: 32px 24px !important;
          }
          .cs-visual {
            min-height: 200px !important;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </motion.article>
  );
}

// ── Page export ───────────────────────────────────────────────────
export default function Liberia() {
  const { isDark } = useTheme();

  const sectionBg    = isDark ? '#111823' : '#F8FAFB';
  const sectionBgAlt = isDark ? '#111823' : '#FFFFFF';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E2A3A' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const iconBg       = isDark ? '#1F2E3F' : '#F0FDF9';
  const iconBorder   = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,200,168,0.15)';
  const metricBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.07)';

  return (
    <PageLayout>
            <Helmet>
        <title>Liberia Digital Services | WebieApp Solutions LLC</title>
        <meta name="description" content="WebieApp Solutions LLC provides specialized digital services for Liberia — government portals, business websites, civic platforms, and digital transformation solutions for West African institutions." />
        <meta name="keywords" content="Liberia digital services, Liberia web development, West Africa digital agency, Liberian government portal, Liberia technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webieapp.com/liberia" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebieApp Solutions LLC" />
        <meta property="og:title" content="Liberia Digital Services — WebieApp Solutions LLC" />
        <meta property="og:description" content="Specialized digital services for Liberia and West Africa — government portals, business websites, and civic platforms." />
        <meta property="og:url" content="https://webieapp.com/liberia" />
        <meta property="og:image" content="https://webieapp.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liberia Digital Services — WebieApp" />
        <meta name="twitter:description" content="Specialized digital services for Liberia and West Africa — government portals, business websites, and civic platforms." />
        <meta name="twitter:image" content="https://webieapp.com/og-image.png" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        aria-label="Liberia hero"
        style={{
          position: 'relative',
          paddingTop: '144px', paddingBottom: '120px',
          overflow: 'hidden',
          background: isDark ? '#1A2535' : '#2B3D52',
        }}
      >
        {/* Background image */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/about/liberia.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? 0.18 : 0.22,
        }} />

        {/* Teal glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '40%', left: '35%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(0,200,168,0.12) 0%, transparent 65%)',
        }} />

        <div className="container-xl" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <span style={{ color: '#00C8A8', display: 'flex' }}>{Icon.Flag}</span>
              <span style={{ width: '1px', height: '20px', background: 'rgba(0,200,168,0.4)' }} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#00C8A8',
              }}>
                WebieApp in Liberia
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '24px',
            }}>
              Building West Africa's
              <br />
              <span style={GS}>Digital Future</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '580px', marginBottom: '40px',
            }}>
              WebieApp Solutions LLC is committed to Liberia's digital transformation — partnering with businesses, government institutions, and entrepreneurs to build world-class digital infrastructure for sustainable growth.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight />}>
                Connect With Our Team
              </Button>
              <Button
                variant="white"
                size="lg"
                onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                View Case Studies ↓
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact metrics ── */}
      <section
        aria-label="Impact metrics"
        style={{
          padding: '56px 0',
          borderTop: `1px solid ${metricBorder}`,
          borderBottom: `1px solid ${metricBorder}`,
          background: sectionBg,
          transition: 'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        <div className="container-xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px', textAlign: 'center',
          }}>
            {METRICS.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  letterSpacing: '-0.025em', color: headingColor,
                  marginBottom: '4px', transition: 'color 0.5s ease',
                }}>
                  {m.v}
                </div>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: '13px', color: headingColor,
                  marginBottom: '2px', transition: 'color 0.5s ease',
                }}>
                  {m.l}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  color: bodyColor, transition: 'color 0.5s ease',
                }}>
                  {m.s}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section
        id="case-studies"
        className="section"
        aria-labelledby="cs-h"
        style={{
          background: sectionBgAlt,
          scrollMarginTop: '80px',
          transition: 'background 0.5s ease',
        }}
      >
        <div className="container-xl">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#00C8A8', marginBottom: '16px',
            }}>
              Case Studies
            </p>
            <h2 id="cs-h" style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              color: headingColor, marginBottom: '16px',
              transition: 'color 0.5s ease',
            }}>
              Real Projects.{' '}
              <span style={GS}>Real Impact.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: bodyColor, lineHeight: 1.7,
              maxWidth: '520px', margin: '0 auto',
              transition: 'color 0.5s ease',
            }}>
              Bespoke digital platforms built for Liberia's unique market — solving real business problems with world-class engineering.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {LIBERIA_PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <CaseStudyCard project={p} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Focus Pillars ── */}
      <section
        className="section"
        aria-labelledby="pillars-h"
        style={{ background: sectionBg, transition: 'background 0.5s ease' }}
      >
        <div className="container-xl">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#00C8A8', marginBottom: '16px',
            }}>
              What We Do
            </p>
            <h2 id="pillars-h" style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              color: headingColor,
              transition: 'color 0.5s ease',
            }}>
              Our Focus Areas{' '}
              <span style={GS}>in West Africa</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.07)}
                style={{
                  background: cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                  transition: 'background 0.5s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(0,200,168,0.25)',
                  boxShadow: isDark ? '0 0 0 1px rgba(0,200,168,0.10)' : '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: iconBg, border: `1px solid ${iconBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px', transition: 'background 0.5s ease',
                }}>
                  {Icon[p.icon]}
                </div>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '14px', color: headingColor,
                  marginBottom: '8px', lineHeight: 1.3,
                  transition: 'color 0.5s ease',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: bodyColor, lineHeight: 1.65,
                  transition: 'color 0.5s ease',
                }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </PageLayout>
  );
}
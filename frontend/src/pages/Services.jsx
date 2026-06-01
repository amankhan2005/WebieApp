import { useState }             from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet }                  from 'react-helmet-async';
import PageLayout                  from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight }      from '../components/ui/Button.jsx';
import { FinalCTA }                from '../components/sections/home/BottomSections.jsx';
import { useTheme }                from '../context/ThemeContext.jsx';

// ─── Shared entrance animation (exact match to About.jsx) ─────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Gradient text style (exact match to About.jsx GS) ────────────────────────
const GS = {
  background:            'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip:  'text',
  WebkitTextFillColor:   'transparent',
  backgroundClip:        'text',
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'web', num: '01', tag: 'Web Development',
    title: 'Website Development',
    image: '/services/web-development.png',
    headline: 'Engineered for performance. Built to convert.',
    desc: 'High-performance websites built for enterprise reliability — every millisecond and pixel optimized to drive real, measurable business outcomes.',
    idealFor: 'Startups · SMBs · Enterprises · Healthcare',
    metrics: [{ v: '<2s', l: 'Load Time' }, { v: '100', l: 'Lighthouse' }, { v: 'A+', l: 'Core Vitals' }],
    benefits: [
      'Sub-2s Lighthouse load times',
      'SEO-first architecture from day one',
      'Mobile-first, pixel-perfect across devices',
      'Conversion-optimized UX, A/B-ready',
    ],
    process: ['Discovery & Wireframing', 'Design System Build', 'Development & QA', 'Launch & Optimization'],
    featured: false,
  },
  {
    id: 'saas', num: '02', tag: 'SaaS Product',
    title: 'SaaS Development',
    image: '/services/saas-development.webp',
    headline: 'From MVP to enterprise-scale platform.',
    desc: 'Full-stack SaaS platforms architected for scale, security, and growth. Multi-tenant systems designed to handle real-world complexity from day one.',
    idealFor: 'Tech startups · Enterprise teams · Funded companies',
    metrics: [{ v: '99.9%', l: 'Uptime SLA' }, { v: 'SOC2', l: 'Ready' }, { v: '∞', l: 'Scale' }],
    benefits: [
      'Scalable multi-tenant architecture',
      'Robust API design with documentation',
      'Auth, billing & subscriptions built-in',
      'CI/CD and cloud-ready deployment',
    ],
    process: ['Product Scoping', 'Architecture Design', 'Agile Build Sprints', 'Scale & Support'],
    featured: false,
  },
  {
    id: 'seo', num: '03', tag: 'Growth',
    title: 'Search Engine Optimization',
    image: '/services/seo.jpg',
    headline: 'Compound growth through search authority.',
    desc: 'Data-driven SEO that compounds over time. Technical excellence fused with content authority — your brand at the top and staying there.',
    idealFor: 'Long-term growth · E-commerce · Healthcare brands',
    metrics: [{ v: '3×', l: 'Avg. Traffic' }, { v: '60d', l: 'First Results' }, { v: 'ROI', l: 'Attributed' }],
    benefits: [
      'Technical SEO audits and full remediation',
      'Authority-building content & link acquisition',
      'Local SEO for multi-location businesses',
      'Monthly ROI-attributed reporting',
    ],
    process: ['Full SEO Audit', 'Strategy & Roadmap', 'On/Off-Page Execution', 'Track & Iterate'],
    featured: false,
  },
  {
    id: 'marketing', num: '04', tag: 'Performance',
    title: 'Digital Marketing',
    image: '/services/digital-marketing.jpg',
    headline: 'Revenue, not impressions.',
    desc: 'Performance marketing built around business objectives. Full-funnel campaigns that generate pipeline, not vanity metrics.',
    idealFor: 'Growth-stage · E-commerce · B2B enterprises',
    metrics: [{ v: '4.2×', l: 'Avg. ROAS' }, { v: 'Full', l: 'Funnel' }, { v: 'Live', l: 'Dashboards' }],
    benefits: [
      'Multi-channel paid media management',
      'Conversion funnel design & optimization',
      'Audience segmentation and retargeting',
      'Real-time transparent spend dashboards',
    ],
    process: ['Goal Setting & Audit', 'Campaign Architecture', 'Launch & Optimize', 'Scale & Report'],
    featured: false,
  },
  {
    id: 'social', num: '05', tag: 'Brand',
    title: 'Social Media Management',
    image: '/services/social-media.webp',
    headline: 'Brand equity built one post at a time.',
    desc: 'Strategic social presence that builds equity and community. Platform-native content that keeps your brand permanently front-of-mind.',
    idealFor: 'Consumer brands · Healthcare · Lifestyle businesses',
    metrics: [{ v: '5×', l: 'Engagement' }, { v: 'Daily', l: 'Publishing' }, { v: '6', l: 'Platforms' }],
    benefits: [
      'Platform-specific content strategy',
      'High-quality creative and copywriting',
      'Community management and engagement',
      'Monthly analytics and benchmarking',
    ],
    process: ['Brand & Audit Analysis', 'Strategy Development', 'Content Production', 'Publish & Engage'],
    featured: false,
  },
  {
    id: 'uiux', num: '06', tag: 'Design',
    title: 'UI/UX Design',
    image: '/services/ui-ux-design.avif',
    headline: 'Complex journeys made intuitive.',
    desc: 'Human-centered design that turns friction into flow. Research-backed design systems that scale across your entire product suite.',
    idealFor: 'Product companies · SaaS platforms · Healthcare apps',
    metrics: [{ v: '+40%', l: 'Conversion' }, { v: 'Figma', l: 'Handoff' }, { v: 'A11y', l: 'WCAG 2.1' }],
    benefits: [
      'User research and journey mapping',
      'Interactive prototypes before code',
      'Scalable design systems with handoff',
      'Usability testing and iteration',
    ],
    process: ['Research & Discovery', 'Wireframes & Prototype', 'Visual Design', 'Handoff & Review'],
    featured: false,
  },
  {
    id: 'autism', num: '07', tag: 'Specialty',
    title: 'Autism & ABA Consulting',
    image: '/services/autism-consulting.avif',
    headline: 'Clinical expertise meets digital strategy.',
    desc: 'Specialized consulting for Autism & ABA practices — deep behavioral health knowledge paired with modern digital infrastructure to help your organization scale with integrity.',
    idealFor: 'ABA practices · Behavioral health · BCBA entrepreneurs',
    metrics: [{ v: 'HIPAA', l: 'Compliant' }, { v: '100%', l: 'Specialized' }, { v: 'BCaBA', l: 'Expertise' }],
    benefits: [
      'Practice setup, credentialing & operations',
      'HIPAA-aware digital infrastructure',
      'Staff training frameworks and culture',
      'Business development and payor strategy',
    ],
    process: ['Practice Assessment', 'Strategic Roadmap', 'Implementation & Training', 'Ongoing Advisory'],
    featured: true,
  },
];

const STATS = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '12+',  label: 'Countries Served' },
  { value: '7+',   label: 'Years Operating' },
  { value: '100%', label: 'Custom-Built' },
];

const TRUST = ['US LLC — Kentucky', 'HIPAA-Aware', 'Zero Templates', 'Post-Launch Support', '12+ Countries', 'Since 2017'];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery',  desc: 'Deep business analysis, user research, and goal definition. Every decision traces back to this foundation.' },
  { num: '02', title: 'Strategy',   desc: 'Architecture, design systems, and project scope locked before a single line is written.' },
  { num: '03', title: 'Execution',  desc: 'Agile sprints, weekly deliverables, shared dashboards. Full transparency throughout.' },
  { num: '04', title: 'Growth',     desc: 'Post-launch analytics, optimization, and ongoing support. We stay invested in your outcomes.' },
];

// ─── Eyebrow (matches About.jsx SectionEyebrow exactly) ──────────────────────
function SectionEyebrow({ children }) {
  return (
    <p style={{
      fontFamily:    'Inter, sans-serif',
      fontWeight:    500,
      fontSize:      '11px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color:         '#00C8A8',
      marginBottom:  '20px',
    }}>
      {children}
    </p>
  );
}

// ─── HeroSection — exact match to About.jsx HeroSection ───────────────────────
//  Layer order (bottom → top):
//   1. base bg #666666
//   2. background-image at 0.18–0.22 opacity  (aria-hidden)
//   3. dark gradient scrim                     (aria-hidden)  ← ADDED vs original Services
//   4. teal radial glow                        (aria-hidden)
//   5. content  z-index:10
function HeroSection() {
  const { isDark } = useTheme();

  // chip styles — same computation as About.jsx
  const chipBg     = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)';
  const chipBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.25)';
  const chipColor  = '#FFFFFF';

  return (
    <section
      aria-label="Services hero"
      style={{
        position:      'relative',
        paddingTop:    '144px',
        paddingBottom: '120px',
        overflow:      'hidden',
        background:    '#666666',   // ← same fallback as About.jsx
      }}
    >
      {/* Layer 2 — background image (same pattern & opacity as About.jsx) */}
      <div aria-hidden style={{
        position:           'absolute',
        inset:              0,
        backgroundImage:    'url(/about/services.jpeg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        opacity:            isDark ? 0.18 : 0.22,   // ← exact About.jsx values
      }} />

      {/* Layer 3 — dark gradient scrim (ensures text contrast regardless of image) */}
      {/* About.jsx was MISSING this — added here AND as a fix recommendation above */}
      <div aria-hidden style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to bottom, rgba(4,4,5,0.55) 0%, rgba(4,4,5,0.40) 50%, rgba(4,4,5,0.70) 100%)',
      }} />

      {/* Layer 4 — teal glow orb (exact position/size/color as About.jsx) */}
      <div aria-hidden style={{
        position:    'absolute',
        top:         '40%',
        left:        '35%',
        transform:   'translate(-50%, -50%)',
        width:       '700px',
        height:      '500px',
        pointerEvents: 'none',
        background:  'radial-gradient(ellipse, rgba(0,200,168,0.12) 0%, transparent 65%)',
      }} />

      {/* Layer 5 — content */}
      <div className="container-xl" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Eyebrow line — centered */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} />
            <span style={{
              fontFamily:    'Inter, sans-serif',
              fontWeight:    600,
              fontSize:      '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         '#00C8A8',
            }}>
               Services
            </span>
            <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} />
          </div>

          {/* H1 — centered */}
          <h1 style={{
            fontFamily:    'Sora, sans-serif',
            fontWeight:    800,
            fontSize:      'clamp(2.8rem, 6vw, 5.2rem)',
            letterSpacing: '-0.035em',
            lineHeight:    1.04,
            color:         '#F8FAFC',
            marginBottom:  '24px',
            textAlign:     'center',
          }}>
            Enterprise solutions
            <br />
            <span style={GS}>built to perform.</span>
          </h1>

          {/* Sub-copy — centered */}
          <p style={{
            fontFamily:   'Inter, sans-serif',
            fontSize:     '1.1rem',
            color:        'rgba(255,255,255,0.60)',
            lineHeight:   1.75,
            maxWidth:     '560px',
            marginBottom: '40px',
            textAlign:    'center',
          }}>
            Custom-built, rigorously tested, and engineered for measurable growth — for startups, healthcare organizations, and enterprises worldwide.
          </p>

          {/* CTAs — centered */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '56px', justifyContent: 'center' }}>
            <Button to="/portfolio" variant="primary" size="lg" iconRight={<ArrowRight />}>
              Explore Work

            </Button>
            <Button to="/contact" variant="white" size="lg">
              Book Consultation
            </Button>
          </div>
        </motion.div>

        {/* Stat chips — centered */}
        <motion.div {...fadeUp(0.25)} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {[
            {
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              ),
              label: '120+ Projects Delivered',
            },
            {
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
              label: '12+ Countries Served',
            },
            {
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8"  y1="2" x2="8"  y2="6"/>
                  <line x1="3"  y1="10" x2="21" y2="10"/>
                </svg>
              ),
              label: 'Founded 2017',
            },
            {
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
                </svg>
              ),
              label: '100% Custom-Built',
            },
          ].map((chip, i) => (
            <div key={i} style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '7px',
              fontFamily:     'Inter, sans-serif',
              fontSize:       '12px',
              fontWeight:     500,
              color:          chipColor,
              background:     chipBg,
              border:         `1px solid ${chipBorder}`,
              padding:        '7px 16px',
              borderRadius:   '9999px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ color: '#00C8A8', display: 'flex' }}>{chip.icon}</span>
              {chip.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TrustBar ─────────────────────────────────────────────────────────────────
function TrustBar() {
  const { isDark } = useTheme();
  const bg     = isDark ? '#0E1520' : '#F0F4F3';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,200,168,0.15)';
  const color  = isDark ? 'rgba(255,255,255,0.35)' : '#6B7A8D';
  const dot    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,200,168,0.4)';

  return (
    <div style={{
      background:    bg,
      borderTop:    `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
      overflow:      'hidden',
      transition:    'background 0.5s ease',
    }}>
      <div className="container-xl">
        <div style={{
          display:    'flex',
          flexWrap:   'wrap',
          alignItems: 'center',
          padding:    '16px 0',
          gap:        0,
        }}>
          {TRUST.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      '11px',
                letterSpacing: '0.1em',
                color,
                whiteSpace:    'nowrap',
                padding:       '4px 0',
              }}>
                {item}
              </span>
              {i < TRUST.length - 1 && (
                <div style={{
                  width:        '3px',
                  height:       '3px',
                  borderRadius: '50%',
                  background:   dot,
                  margin:       '0 4px',
                  flexShrink:   0,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ServiceCard — redesigned card layout (replaces full-bleed ServiceRow) ────
//  Each service is now a contained card with image top + content below,
//  displayed in a 2-column grid. Featured service spans full width.
function ServiceCard({ service, index }) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);

  const cardBg       = isDark ? '#1E2A3A' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.09)';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const metricBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const benefitBorder= isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.06)';
  const stepBg       = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,200,168,0.04)';
  const iconBg       = isDark ? '#1F2E3F' : '#F0FDF9';
  const iconBorder   = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,200,168,0.15)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background:   cardBg,
        border:       `1px solid ${service.featured ? 'rgba(0,200,168,0.30)' : cardBorder}`,
        borderRadius: '20px',
        overflow:     'hidden',
        display:      'flex',
        flexDirection: service.featured ? 'row' : 'column',
        boxShadow:    service.featured
          ? (isDark ? '0 0 0 1px rgba(0,200,168,0.12), 0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,200,168,0.08)')
          : (isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'),
        transition:   'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        cursor:       'default',
        gridColumn:   service.featured ? '1 / -1' : 'auto',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.borderColor = service.featured ? 'rgba(0,200,168,0.50)' : 'rgba(0,200,168,0.25)';
        e.currentTarget.style.boxShadow   = isDark
          ? '0 12px 40px rgba(0,0,0,0.5)'
          : '0 12px 40px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.borderColor = service.featured ? 'rgba(0,200,168,0.30)' : cardBorder;
        e.currentTarget.style.boxShadow   = service.featured
          ? (isDark ? '0 0 0 1px rgba(0,200,168,0.12), 0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,200,168,0.08)')
          : (isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)');
      }}
    >
      {/* ── Image panel ── */}
      <div style={{
        position:   'relative',
        overflow:   'hidden',
        aspectRatio: service.featured ? 'unset' : '16/9',
        width:       service.featured ? '420px' : '100%',
        minWidth:    service.featured ? '380px' : 'auto',
        flexShrink:  service.featured ? 0 : 'unset',
        background:  isDark ? '#0a0a0f' : '#E8F4F1',
      }}>
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          onError={e => { e.currentTarget.style.display = 'none'; }}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center',
            display:        'block',
            transition:     'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        {/* Bottom gradient over image */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 50%)',
        }} />
        {/* Number pill */}
        <div style={{
          position:       'absolute',
          top:            '16px',
          left:           '16px',
          fontFamily:     'Sora, sans-serif',
          fontWeight:     800,
          fontSize:       '10px',
          letterSpacing:  '0.14em',
          color:          'rgba(255,255,255,0.70)',
          background:     'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(10px)',
          padding:        '4px 12px',
          borderRadius:   '9999px',
          border:         '1px solid rgba(255,255,255,0.12)',
        }}>
          {service.num}
        </div>
        {/* Tag pill */}
        <div style={{
          position:       'absolute',
          bottom:         '16px',
          left:           '16px',
          fontFamily:     'Inter, sans-serif',
          fontWeight:     600,
          fontSize:       '9px',
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          color:          service.featured ? '#00C8A8' : 'rgba(255,255,255,0.75)',
          background:     service.featured ? 'rgba(0,200,168,0.12)' : 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(10px)',
          padding:        '4px 12px',
          borderRadius:   '9999px',
          border:         `1px solid ${service.featured ? 'rgba(0,200,168,0.35)' : 'rgba(255,255,255,0.15)'}`,
        }}>
          {service.tag}
        </div>
        {/* Featured inset ring */}
        {service.featured && (
          <div style={{
            position:   'absolute',
            inset:      0,
            pointerEvents: 'none',
            boxShadow:  'inset 0 0 0 1px rgba(0,200,168,0.25)',
          }} />
        )}
      </div>

      {/* ── Content panel ── */}
      <div style={{
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        padding:       service.featured ? '36px 40px' : '28px 28px 24px',
        justifyContent: 'space-between',
      }}>
        <div>
          {/* Title */}
          <h2 style={{
            fontFamily:    'Sora, sans-serif',
            fontWeight:    800,
            fontSize:      service.featured ? 'clamp(1.6rem, 2.5vw, 2.2rem)' : '1.25rem',
            letterSpacing: '-0.03em',
            lineHeight:    1.1,
            marginBottom:  '8px',
            ...(service.featured
              ? { ...GS }
              : { color: headingColor, transition: 'color 0.5s ease' }
            ),
          }}>
            {service.title}
          </h2>

          {/* Headline */}
          <p style={{
            fontFamily:   'Inter, sans-serif',
            fontWeight:   500,
            fontSize:     '13.5px',
            color:        isDark ? '#C4C4C8' : '#374151',
            lineHeight:   1.55,
            marginBottom: '10px',
          }}>
            {service.headline}
          </p>

          {/* Description */}
          <p style={{
            fontFamily:   'Inter, sans-serif',
            fontSize:     '13px',
            color:        bodyColor,
            lineHeight:   1.8,
            marginBottom: '20px',
            transition:   'color 0.5s ease',
          }}>
            {service.desc}
          </p>

          {/* Metrics strip */}
          <div style={{
            display:      'flex',
            marginBottom: '20px',
            border:       `1px solid ${metricBorder}`,
            borderRadius: '10px',
            overflow:     'hidden',
          }}>
            {service.metrics.map((m, mi) => (
              <div key={m.l} style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                flex:           1,
                padding:        '14px 0',
                borderRight:    mi < service.metrics.length - 1 ? `1px solid ${metricBorder}` : 'none',
              }}>
                <div style={{
                  fontFamily:    'Sora, sans-serif',
                  fontWeight:    800,
                  fontSize:      '1.1rem',
                  letterSpacing: '-0.03em',
                  marginBottom:  '2px',
                  ...GS,
                }}>
                  {m.v}
                </div>
                <div style={{
                  fontFamily:    'Inter, sans-serif',
                  fontSize:      '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         bodyColor,
                }}>
                  {m.l}
                </div>
              </div>
            ))}
          </div>

          {/* Ideal for */}
          <p style={{
            fontFamily:   'Inter, sans-serif',
            fontSize:     '12px',
            color:        bodyColor,
            marginBottom: '16px',
          }}>
            <span style={{
              color:         '#00C8A8',
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginRight:   '8px',
              fontSize:      '10px',
            }}>
              Ideal for
            </span>
            {service.idealFor}
          </p>

          {/* Benefits */}
          <div style={{ marginBottom: '20px' }}>
            {service.benefits.map((b, bi) => (
              <div key={bi} style={{
                display:      'flex',
                alignItems:   'flex-start',
                gap:          '10px',
                padding:      '8px 0',
                borderBottom: bi < service.benefits.length - 1 ? `1px solid ${benefitBorder}` : 'none',
              }}>
                <div style={{
                  width:          '20px',
                  height:         '20px',
                  borderRadius:   '6px',
                  background:     iconBg,
                  border:         `1px solid ${iconBorder}`,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                  marginTop:      '1px',
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke="#00C8A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '12.5px',
                  color:      isDark ? 'rgba(255,255,255,0.55)' : '#4B5563',
                  lineHeight: 1.5,
                }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Process accordion + CTA */}
        <div>
          <div style={{
            borderTop:    `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.07)'}`,
            paddingTop:   '18px',
            marginBottom: '18px',
          }}>
            <button
              onClick={() => setOpen(v => !v)}
              style={{
                all:            'unset',
                cursor:         'pointer',
                width:          '100%',
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
                marginBottom:   open ? '12px' : '0',
              }}
              aria-expanded={open}
            >
              <span style={{
                fontFamily:    'Inter, sans-serif',
                fontWeight:    600,
                fontSize:      '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         bodyColor,
              }}>
                Our Process
              </span>
              <motion.svg
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#00C8A8" strokeWidth="2" strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5"  y1="12" x2="19" y2="12"/>
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="process"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  {service.process.map((step, si) => (
                    <div key={si} style={{
                      display:       'flex',
                      gap:           '10px',
                      alignItems:    'center',
                      padding:       '8px 10px',
                      borderRadius:  '8px',
                      background:    stepBg,
                      marginBottom:  '4px',
                    }}>
                      <span style={{
                        fontFamily: 'Sora, sans-serif',
                        fontWeight: 700,
                        fontSize:   '10px',
                        color:      '#00C8A8',
                        width:      '20px',
                        flexShrink: 0,
                      }}>
                        {String(si + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize:   '12.5px',
                        color:      isDark ? 'rgba(255,255,255,0.45)' : '#6B7A8D',
                        lineHeight: 1.4,
                      }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            to="/contact"
            variant={service.featured ? 'primary' : 'outline'}
            size="sm"
            iconRight={<ArrowRight />}
          >
            Discuss This Service
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── ServicesSection ──────────────────────────────────────────────────────────
function ServicesSection() {
  const { isDark } = useTheme();
  const sectionBg    = isDark ? '#111823' : '#F8FAFB';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';

  return (
    <section
      id="services"
      aria-labelledby="services-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        {/* Section header */}
        <div style={{ marginBottom: '56px' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '20px' }}>
            <SectionEyebrow>What We Do</SectionEyebrow>
          </motion.div>

          <div style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '32px',
          }}>
            <motion.h2
              {...fadeUp(0.08)}
              id="services-h"
              style={{
                fontFamily:    'Sora, sans-serif',
                fontWeight:    800,
                fontSize:      'clamp(2.4rem, 5.5vw, 4.8rem)',
                letterSpacing: '-0.035em',
                lineHeight:    1.04,
                color:         headingColor,
                maxWidth:      '520px',
                margin:        0,
                transition:    'color 0.5s ease',
              }}
            >
              Every discipline.
              <br />
              <span style={GS}>One partner.</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.14)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   '15px',
                color:      bodyColor,
                lineHeight: 1.85,
                maxWidth:   '320px',
                margin:     0,
                transition: 'color 0.5s ease',
              }}
            >
              From first pixel to post-launch growth — we cover the full digital stack so you never need to stitch together multiple agencies.
            </motion.p>
          </div>
        </div>

        {/* 2-column card grid — featured card (autism) spans full width */}
        <div style={{
          display:               'grid',
          gridTemplateColumns:   'repeat(2, minmax(0,1fr))',
          gap:                   '20px',
        }}
        className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── ProcessSection ───────────────────────────────────────────────────────────
function ProcessSection() {
  const { isDark } = useTheme();
  const sectionBg    = isDark ? '#0E1520' : '#FFFFFF';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#131D29' : '#F8FAFB';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';

  return (
    <section
      aria-labelledby="process-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        {/* Two-column header — matches About.jsx ValuesSection layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ marginBottom: '64px' }}>
          <motion.div {...fadeUp(0)}>
            <SectionEyebrow>How We Work</SectionEyebrow>
            <h2 id="process-h" style={{
              fontFamily:    'Sora, sans-serif',
              fontWeight:    800,
              fontSize:      'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em',
              lineHeight:    1.04,
              color:         headingColor,
              marginBottom:  '20px',
              transition:    'color 0.5s ease',
            }}>
              How we deliver
              <br />
              <span style={GS}>results.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   '1.05rem',
              color:      bodyColor,
              lineHeight: 1.7,
              maxWidth:   '440px',
              transition: 'color 0.5s ease',
            }}>
              A four-phase framework refined across 120+ engagements — structured for consistency, flexible for your context.
            </p>
          </motion.div>

          {/* 2×2 grid of process cards — matches About.jsx values card style */}
          <motion.div {...fadeUp(0.15)}>
            <div style={{
              borderRadius: '20px',
              overflow:     'hidden',
              border:       `1px solid ${cardBorder}`,
              background:   cardBg,
              padding:      '24px',
              display:      'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:          '12px',
            }}>
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding:      '20px',
                    borderRadius: '12px',
                    border:       `1px solid ${cardBorder}`,
                    background:   isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                    position:     'relative',
                    overflow:     'hidden',
                    transition:   'border-color 0.3s ease, transform 0.3s ease',
                    cursor:       'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,200,168,0.25)';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cardBorder;
                    e.currentTarget.style.transform   = 'translateY(0)';
                  }}
                >
                  {/* Ghost number */}
                  <div style={{
                    fontFamily:    'Sora, sans-serif',
                    fontWeight:    800,
                    fontSize:      '48px',
                    letterSpacing: '-0.06em',
                    lineHeight:    1,
                    color:         isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,200,168,0.07)',
                    position:      'absolute',
                    top:           '4px',
                    right:         '8px',
                    userSelect:    'none',
                    pointerEvents: 'none',
                  }}>
                    {step.num}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '20px', height: '2px', background: '#00C8A8' }} />
                    <span style={{
                      fontFamily:    'Inter, sans-serif',
                      fontWeight:    600,
                      fontSize:      '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color:         '#00C8A8',
                    }}>
                      Phase {step.num}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily:   'Sora, sans-serif',
                    fontWeight:   700,
                    fontSize:     '14px',
                    color:        headingColor,
                    marginBottom: '6px',
                    transition:   'color 0.5s ease',
                  }}>
                    {step.title}
                  </h3>

                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize:   '12px',
                    color:      bodyColor,
                    lineHeight: 1.65,
                    transition: 'color 0.5s ease',
                  }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page export ───────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <PageLayout>
            <Helmet>
        <title>Services — Web Development, SaaS, SEO, ABA Consulting | WebieApp Solutions</title>
        <meta name="description" content="Explore WebieApp Solutions LLC's full range of services: custom website development, SaaS platform development, SEO, digital marketing, UI/UX design, social media management, and Autism & ABA business consulting." />
        <meta name="keywords" content="web development services, SaaS development, SEO services, digital marketing, UI UX design, ABA consulting services, autism clinic website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webieapp.com/services" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebieApp Solutions LLC" />
        <meta property="og:title" content="WebieApp Services — Web, SaaS, SEO, ABA Consulting" />
        <meta property="og:description" content="Full-service digital agency: custom websites, SaaS platforms, SEO, digital marketing, and specialized Autism & ABA clinic consulting." />
        <meta property="og:url" content="https://webieapp.com/services" />
        <meta property="og:image" content="https://webieapp.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WebieApp Services — Digital & ABA Consulting" />
        <meta name="twitter:description" content="Full-service digital agency: custom websites, SaaS platforms, SEO, digital marketing, and specialized Autism & ABA clinic consulting." />
        <meta name="twitter:image" content="https://webieapp.com/og-image.png" />
      </Helmet>

      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <FinalCTA />
    </PageLayout>
  );
}
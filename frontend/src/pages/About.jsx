import { motion }   from 'framer-motion';
import { Helmet }   from 'react-helmet-async';
import { Link }     from 'react-router-dom';
import PageLayout    from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight } from '../components/ui/Button.jsx';
import { FinalCTA } from '../components/sections/home/BottomSections.jsx';
import { COMPANY }  from '../data/siteData.js';
import { useTheme } from '../context/ThemeContext.jsx';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const VALUES = [
  { title: 'Precision',   desc: 'We obsess over every detail — from system architecture to the last pixel. Mediocrity is not in our vocabulary.' },
  { title: 'Integrity',   desc: 'Honest timelines, transparent pricing, zero surprises. We say what we do and do what we say — always.' },
  { title: 'Innovation',  desc: 'We stay at the leading edge — not for novelty, but because better tools build better products for our clients.' },
  { title: 'Partnership', desc: 'Your business goals are our goals. We invest in long-term relationships because shared success is the only success that matters.' },
  { title: 'Clarity',     desc: 'Complex problems deserve clear communication. We translate technical decisions into business language every client can understand.' },
  { title: 'Care',        desc: 'In healthcare and autism work — we bring genuine empathy, cultural awareness, and sensitivity to every engagement.' },
];

const VALUE_ICONS = {
  Precision: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  Integrity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    </svg>
  ),
  Innovation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Partnership: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Clarity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
};

const WHY_TRUST = [
  { label: 'US LLC',       value: 'Legally registered in Kentucky — full contractual accountability under US law.' },
  { label: 'No Templates', value: 'Every deliverable is custom-built. We\'ve never shipped a template or a theme-based site.' },
  { label: 'HIPAA-Aware',  value: 'Healthcare development follows HIPAA-aware practices, protecting your patients and your business.' },
  { label: 'Transparency', value: 'Weekly project updates, shared dashboards, and direct engineer access — always.' },
  { label: 'Post-Launch',  value: 'We don\'t disappear after launch. Ongoing support, analytics, and partnerships are standard.' },
];

function SectionEyebrow({ children }) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif', fontWeight: 500,
      fontSize: '11px', letterSpacing: '0.18em',
      textTransform: 'uppercase', color: '#00C8A8',
      marginBottom: '20px',
    }}>
      {children}
    </p>
  );
}

// ── HeroSection ───────────────────────────────────────────
function HeroSection() {
  const { isDark } = useTheme();
  const chipBg     = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)';
  const chipBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.25)';

  return (
    <section
      aria-label="About hero"
      style={{
        position: 'relative',
        paddingTop: '144px', paddingBottom: '120px',
        overflow: 'hidden',
        background: isDark ? '#1A2535' : '#2C3E55',
      }}
    >
      {/* Background image — lighter opacity so text is always readable */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/about/about.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isDark ? 0.12 : 0.16,
      }} />

      {/* Teal glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '40%', left: '35%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(0,200,168,0.10) 0%, transparent 65%)',
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div {...fadeUp(0)} style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#00C8A8',
            }}>
              About WebieApp
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
            letterSpacing: '-0.035em', lineHeight: 1.04,
            color: '#F8FAFC', marginBottom: '24px',
          }}>
            Built on trust.
            <br />
            <span style={GS}>Driven by results.</span>
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.65)', lineHeight: 1.75,
            maxWidth: '580px', marginBottom: '40px',
          }}>
            WebieApp Solutions LLC is a US-registered technology and digital consultancy delivering enterprise-grade digital products, SaaS platforms, and specialized Autism & ABA business consulting to clients across the globe.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '56px' }}>
            <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight />}>
              Work With Us
            </Button>
            <Button to="/portfolio" variant="white" size="lg">
              See Our Work
            </Button>
          </div>
        </motion.div>

        {/* Stat chips */}
        <motion.div {...fadeUp(0.25)} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'US-Registered LLC' },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label: '12+ Countries Served' },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, label: '120+ Projects Delivered' },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: 'Founded 2017' },
          ].map((chip, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              fontWeight: 500, color: '#FFFFFF',
              background: chipBg, border: `1px solid ${chipBorder}`,
              padding: '7px 16px', borderRadius: '9999px',
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

// ── ValuesSection ──────────────────────────────────────────
function ValuesSection() {
  const { isDark } = useTheme();
  // Lighter dark backgrounds
  const sectionBg  = isDark ? '#18202E' : '#F8FAFB';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const iconBg       = isDark ? 'rgba(0,200,168,0.08)' : '#F0FDF9';
  const iconBorder   = isDark ? 'rgba(0,200,168,0.15)' : 'rgba(0,200,168,0.15)';

  return (
    <section
      aria-labelledby="values-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ marginBottom: '64px' }}>
          <motion.div {...fadeUp(0)}>
            <SectionEyebrow>Our Values</SectionEyebrow>
            <h2 id="values-h" style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: headingColor, marginBottom: '20px',
              transition: 'color 0.5s ease',
            }}>
              What drives
              <br />
              <span style={GS}>everything we do.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: bodyColor, lineHeight: 1.7,
              maxWidth: '440px', transition: 'color 0.5s ease',
            }}>
              Six principles that govern how we think, work, and show up for every client — every single time.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              aspectRatio: '4/3',
              background: isDark ? '#1E293B' : '#E8F4F1',
              border: `1px solid ${cardBorder}`,
            }}>
              <img
                src="/about/team.jpeg"
                alt="WebieApp team at work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
                background: isDark ? 'rgba(18,32,46,0.88)' : 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
                borderRadius: '12px', padding: '12px 16px',
              }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '22px', color: '#00C8A8', lineHeight: 1 }}>7+</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: bodyColor, marginTop: '2px' }}>Years of excellence</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'background 0.5s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
                e.currentTarget.style.boxShadow = isDark ? '0 0 0 1px rgba(0,200,168,0.1), 0 8px 24px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.08)';
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
              }}>
                {VALUE_ICONS[v.title]}
              </div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '15px', color: headingColor,
                marginBottom: '8px', lineHeight: 1.3,
                transition: 'color 0.5s ease',
              }}>
                {v.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: bodyColor, lineHeight: 1.65,
                transition: 'color 0.5s ease',
              }}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── OfficesSection ─────────────────────────────────────────
function OfficesSection() {
  const { isDark } = useTheme();
  const sectionBg    = isDark ? '#131C28' : '#F8FAFB';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const addrColor    = isDark ? '#CBD5E1' : '#6B7A8D';

  const offices = [
    {
      ...COMPANY.offices.usa,
      role:   'Legal Headquarters',
      detail: 'Incorporated under Kentucky State Law. All contracts, SLAs, and client agreements governed by US law.',
    },
    {
      ...COMPANY.offices.india,
      role:   'Engineering & Operations',
      detail: 'Senior engineering team, design studio, and client delivery hub — operating across UTC+5:30.',
    },
  ];

  return (
    <section
      aria-labelledby="offices-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ marginBottom: '64px' }}>
          <motion.div {...fadeUp(0)}>
            <SectionEyebrow>Global Presence</SectionEyebrow>
            <h2 id="offices-h" style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: headingColor, marginBottom: '20px',
              transition: 'color 0.5s ease',
            }}>
              US-registered.
              <br />
              <span style={GS}>Globally delivered.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: bodyColor, lineHeight: 1.7,
              maxWidth: '440px', transition: 'color 0.5s ease',
            }}>
              Headquartered in Kentucky with operations in India — combining US-standard quality with global delivery capability.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              aspectRatio: '4/3',
              background: isDark ? '#1E293B' : '#E8F4F1',
              border: `1px solid ${cardBorder}`,
            }}>
              <img
                src="/about/office.png"
                alt="WebieApp global offices"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', bottom: '20px', right: '20px',
                background: isDark ? 'rgba(18,28,40,0.88)' : 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
                borderRadius: '12px', padding: '12px 16px',
              }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '22px', color: '#00C8A8', lineHeight: 1 }}>12+</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: bodyColor, marginTop: '2px' }}>Countries served</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: '720px', margin: '0 auto' }}>
          {offices.map((office, i) => (
            <motion.div
              key={office.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '32px', borderRadius: '20px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'background 0.5s ease, border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = cardBorder;
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', marginBottom: '16px',
                background: 'rgba(0,200,168,0.08)',
                border: '1px solid rgba(0,200,168,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#00C8A8',
                background: 'rgba(0,200,168,0.10)',
                border: '1px solid rgba(0,200,168,0.2)',
                padding: '3px 10px', borderRadius: '9999px',
                marginBottom: '14px',
              }}>
                {office.role}
              </span>
              <h3 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '16px', color: headingColor,
                marginBottom: '8px', transition: 'color 0.5s ease',
              }}>
                {office.label}
              </h3>
              <address style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: addrColor, fontStyle: 'normal',
                lineHeight: 1.6, marginBottom: '14px',
                transition: 'color 0.5s ease',
              }}>
                {office.line1}<br />{office.line2}
              </address>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: bodyColor, lineHeight: 1.65,
                transition: 'color 0.5s ease',
              }}>
                {office.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WhyTrustSection ────────────────────────────────────────
function WhyTrustSection() {
  const { isDark } = useTheme();
  const sectionBg    = isDark ? '#18202E' : '#FFFFFF';
  const headingColor = isDark ? '#F1F5F9' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';

  return (
    <section
      aria-labelledby="trust-h"
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <SectionEyebrow>Why Trust Us</SectionEyebrow>
            <h2 id="trust-h" style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: headingColor, marginBottom: '20px',
              transition: 'color 0.5s ease',
            }}>
              What makes us
              <br />
              <span style={GS}>different.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: bodyColor, lineHeight: 1.7,
              maxWidth: '400px', marginBottom: '32px',
              transition: 'color 0.5s ease',
            }}>
              Beyond skills and services — the structural and ethical commitments that make WebieApp a safe, reliable, long-term partner.
            </p>
            <Button to="/contact" variant="primary" size="md" iconRight={<ArrowRight />}>
              Start a Project
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {WHY_TRUST.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex', gap: '16px',
                  padding: '18px 20px', borderRadius: '14px',
                  background: cardBg, border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'background 0.5s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; }}
              >
                <div style={{
                  width: '3px', borderRadius: '9999px',
                  background: '#00C8A8', flexShrink: 0, minHeight: '20px',
                }} />
                <div>
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '14px', color: headingColor,
                    marginBottom: '4px', transition: 'color 0.5s ease',
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                    color: bodyColor, lineHeight: 1.65,
                    transition: 'color 0.5s ease',
                  }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Page export ────────────────────────────────────────────
export default function About() {
  return (
    <PageLayout>
      <Helmet>
        {/* ── Primary SEO ── */}
        <title>About WebieApp Solutions LLC — US-Registered Digital Agency & ABA Consulting</title>
        <meta name="description" content="WebieApp Solutions LLC is a US-registered technology agency founded in 2017. Based in Richmond, Kentucky with operations in Lucknow, India. 120+ projects, 85+ clients, 12+ countries. Specialists in web development, SaaS, and Autism & ABA consulting." />
        <meta name="keywords" content="WebieApp Solutions, about WebieApp, US digital agency, Kentucky tech company, ABA consulting firm, web development company USA, SaaS development agency" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webieapp.com/about" />

        {/* ── Open Graph ── */}
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="WebieApp Solutions LLC" />
        <meta property="og:title"       content="About WebieApp Solutions LLC — US-Registered Digital Agency" />
        <meta property="og:description" content="7+ years, 120+ projects, 12+ countries. US-registered agency delivering custom web development, SaaS platforms, and Autism & ABA business consulting." />
        <meta property="og:url"         content="https://webieapp.com/about" />
        <meta property="og:image"       content="https://webieapp.com/og-image.png" />

        {/* ── Twitter / X ── */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="About WebieApp Solutions LLC" />
        <meta name="twitter:description" content="US-registered digital agency. 120+ projects, 85+ clients, 12+ countries. Web, SaaS & ABA consulting." />
        <meta name="twitter:image"       content="https://webieapp.com/og-image.png" />

      </Helmet>

      <HeroSection />
      <ValuesSection />
      <OfficesSection />
      <WhyTrustSection />
      <FinalCTA />
    </PageLayout>
  );
}
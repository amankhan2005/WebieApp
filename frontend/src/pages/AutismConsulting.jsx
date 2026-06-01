import { useState }     from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet }        from 'react-helmet-async';
import PageLayout         from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight } from '../components/ui/Button.jsx';
import { AUTISM_FAQS }   from '../data/siteData.js';
import { useTheme }      from '../context/ThemeContext.jsx';

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-50px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});


// ── SVG Icons ─────────────────────────────────────────────────────
const Icon = {
  Building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <path d="M9 21V9h6v12M9 3v6M15 3v6M2 9h20"/>
    </svg>
  ),
  Globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/>
      <circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Megaphone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  TrendingUp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  FileText: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  Users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Shield: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    </svg>
  ),
  Flag: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  Star: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  MapPin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Phone: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Check: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

// ── Trust proof data ──────────────────────────────────────────────
const TRUST_PROOFS = [
  { icon: 'MapPin', label: 'Serving all 50 states'     },
  { icon: 'Shield', label: 'HIPAA-aware development'    },
  { icon: 'Clock',  label: '60–120 day launch timeline' },
  { icon: 'Phone',  label: 'Free discovery call'        },
  { icon: 'Check',  label: 'No clinical advice given'   },
];

const CLOSING_TRUST = [
  { icon: 'Shield', label: 'HIPAA-aware systems'   },
  { icon: 'Flag',   label: 'US-registered agency'  },
  { icon: 'Star',   label: '5-star client results' },
  { icon: 'MapPin', label: 'All 50 states'         },
];

// ── Data ─────────────────────────────────────────────────────────
const WHAT_WE_HELP = [
  { icon: 'Building', title: 'Business Formation',   desc: 'Guidance on structuring your ABA clinic as a business entity — LLCs, S-corps, partnership structures, and operational foundations.' },
  { icon: 'Globe', title: 'Clinic Website',        desc: 'A professional, HIPAA-aware clinic website with patient booking, intake forms, therapist bios, and insurance information.' },
  { icon: 'Palette', title: 'Brand Identity',        desc: 'Complete brand design — logo, color system, typography, and visual identity that builds instant trust with families.' },
  { icon: 'Megaphone', title: 'Digital Marketing',     desc: 'SEO-optimized content, Google Ads, social media, and referral partnership strategies for consistent patient acquisition.' },
  { icon: 'Settings', title: 'Digital Systems',       desc: 'Practice management platform guidance, EMR setup, scheduling systems, and staff communication tools.' },
  { icon: 'TrendingUp', title: 'Growth Strategy',       desc: 'Referral network building, insurance credentialing guidance, waitlist management, and multi-location expansion planning.' },
  { icon: 'FileText', title: 'Operational Playbooks', desc: 'Staffing templates, HR onboarding docs, session note systems, and clinical operations documentation.' },
  { icon: 'Users', title: 'Ongoing Advisory',      desc: 'Monthly strategy calls, KPI review, analytics reporting, and continuous support as your clinic scales.' },
];

const PROCESS = [
  {
    number: '01',
    title:  'Free Discovery Call',
    dur:    'Week 1',
    desc:   'A relaxed, 45-minute conversation about your vision, background, clinical experience, and goals. No pressure — we listen first. You get honest guidance on the right next steps.',
  },
  {
    number: '02',
    title:  'Business Model Planning',
    dur:    'Weeks 1–2',
    desc:   'We help structure your clinic business model — service offerings, session rates, insurance vs private-pay mix, staffing model, and financial projections.',
  },
  {
    number: '03',
    title:  'Brand & Identity',
    dur:    'Weeks 2–4',
    desc:   'Your clinic\'s complete brand identity — name refinement, logo design, color palette, typography, and brand standards that communicate professionalism and warmth.',
  },
  {
    number: '04',
    title:  'Website & Digital Systems',
    dur:    'Weeks 3–6',
    desc:   'We build your HIPAA-aware clinic website, set up patient intake forms, scheduling integration, and the digital infrastructure your clinic needs to operate.',
  },
  {
    number: '05',
    title:  'Marketing Launch',
    dur:    'Weeks 5–8',
    desc:   'Google My Business setup, local SEO, social media launch, and your first paid acquisition campaigns designed to bring in qualified families from day one.',
  },
  {
    number: '06',
    title:  'Growth & Advisory',
    dur:    'Ongoing',
    desc:   'Monthly advisory calls, performance analytics, referral network building, and strategic planning support as you scale toward a waitlist and beyond.',
  },
];

// ── Hero ──────────────────────────────────────────────────────────
function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section
      aria-label="Autism consulting hero"
      style={{
        position: 'relative',
        paddingTop: '144px', paddingBottom: '120px',
        overflow: 'hidden',
        background: isDark ? '#1A2535' : '#2B3D52',
      }}
    >
      {/* Background image — matches About/Services/Portfolio */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/about/autism.jpeg)',
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
        <div style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#00C8A8',
              }}>
                Autism & ABA Consulting
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '24px',
            }}>
              Launch Your ABA Clinic
              <br />
              <span style={GS}>With Confidence</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '580px', marginBottom: '16px',
            }}>
              We provide end-to-end business consulting for Autism and ABA therapy entrepreneurs across the United States — handling the entire business and digital side so you can focus entirely on the families you serve.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1rem',
              color: 'rgba(255,255,255,0.50)', lineHeight: 1.75,
              maxWidth: '580px', marginBottom: '40px',
            }}>
              From business formation to your first patient — we've helped ABA entrepreneurs across all 50 states turn their clinical expertise into thriving, sustainable clinics.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight />}>
                Book Free Clinic Consultation
              </Button>
              <Button
                variant="white"
                size="lg"
                onClick={() => document.getElementById('what-we-help')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                See What We Cover ↓
              </Button>
            </div>
          </motion.div>

          {/* Trust proof strips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
          >
            {TRUST_PROOFS.map((proof, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '7px 16px', borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
                color: 'rgba(255,255,255,0.65)',
                background: 'rgba(0,200,168,0.08)',
                border: '1px solid rgba(0,200,168,0.20)',
              }}>
                <span style={{ color: '#00C8A8', display: 'flex', flexShrink: 0 }}>
                  {Icon[proof.icon]}
                </span>
                {proof.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── What We Help ──────────────────────────────────────────────────
function WhatWeHelpSection() {
  const { isDark } = useTheme();
  const sectionBg  = isDark ? '#111823' : '#F8FAFB';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E2A3A' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const iconBg       = isDark ? '#1F2E3F' : '#F0FDF9';
  const iconBorder   = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,200,168,0.15)';

  return (
    <section
      id="what-we-help"
      className="section"
      style={{ background: sectionBg, scrollMarginTop: '80px', transition: 'background 0.5s ease' }}
      aria-labelledby="help-heading"
    >
      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8',
            marginBottom: '16px',
          }}>
            What We Cover
          </p>
          <h2 id="help-heading" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: headingColor, marginBottom: '16px',
            transition: 'color 0.5s ease',
          }}>
            Complete Support for Your{' '}
            <span style={GS}>Clinic Launch</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto',
            transition: 'color 0.5s ease',
          }}>
            We handle every aspect of the business and digital side — so you can dedicate yourself fully to the families you serve.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {WHAT_WE_HELP.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.06)}
              style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'background 0.5s ease, border-color 0.3s ease, transform 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{
                y: -4,
                borderColor: 'rgba(0,200,168,0.25)',
                boxShadow: isDark ? '0 0 0 1px rgba(0,200,168,0.1)' : '0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: iconBg, border: `1px solid ${iconBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', transition: 'background 0.5s ease',
              }}>
                {Icon[item.icon]}
              </div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '14px', color: headingColor,
                marginBottom: '8px', lineHeight: 1.3,
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
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────
function ProcessSection() {
  const { isDark } = useTheme();
  const sectionBg    = isDark ? '#111823' : '#FFFFFF';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const dividerColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.07)';
  const stepBg       = isDark ? 'rgba(0,200,168,0.10)' : 'rgba(0,200,168,0.08)';
  const stepBorder   = isDark ? 'rgba(0,200,168,0.25)' : 'rgba(0,200,168,0.20)';
  const lineColor    = isDark
    ? 'linear-gradient(to bottom, rgba(0,200,168,0.4), rgba(0,200,168,0.08))'
    : 'linear-gradient(to bottom, rgba(0,200,168,0.35), rgba(0,200,168,0.05))';

  return (
    <section
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
      aria-labelledby="process-heading"
    >
      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8',
            marginBottom: '16px',
          }}>
            Our Process
          </p>
          <h2 id="process-heading" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: headingColor, marginBottom: '16px',
            transition: 'color 0.5s ease',
          }}>
            From Vision to{' '}
            <span style={GS}>Open Clinic</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto',
            transition: 'color 0.5s ease',
          }}>
            A structured, proven 6-phase program that takes you from your first call to your first patient — with expert support at every step.
          </p>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            {/* Vertical connecting line */}
            <div aria-hidden style={{
              position: 'absolute', left: '27px', top: '32px', bottom: '32px',
              width: '1px', background: lineColor,
            }} />

            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {PROCESS.map((step, i) => (
                <motion.li
                  key={step.number}
                  {...fadeUp(i * 0.1)}
                  style={{ position: 'relative', display: 'flex', gap: '24px' }}
                >
                  {/* Step circle */}
                  <div style={{
                    flexShrink: 0, position: 'relative', zIndex: 10,
                    width: '56px', height: '56px', borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: stepBg, border: `1px solid ${stepBorder}`,
                  }}>
                    <span style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 800,
                      fontSize: '18px', color: '#00C8A8', lineHeight: 1,
                    }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{
                    flex: 1, paddingTop: '8px', paddingBottom: '24px',
                    borderBottom: i < PROCESS.length - 1 ? `1px solid ${dividerColor}` : 'none',
                    transition: 'border-color 0.5s ease',
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{
                        fontFamily: 'Sora, sans-serif', fontWeight: 700,
                        fontSize: '16px', color: headingColor,
                        transition: 'color 0.5s ease',
                      }}>
                        {step.title}
                      </h3>
                      <span style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '11px',
                        fontWeight: 500, color: '#00C8A8',
                        padding: '2px 10px', borderRadius: '9999px',
                        background: 'rgba(0,200,168,0.08)',
                        border: '1px solid rgba(0,200,168,0.18)',
                      }}>
                        {step.dur}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '13px',
                      color: bodyColor, lineHeight: 1.7,
                      transition: 'color 0.5s ease',
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────
function FAQSection() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const sectionBg    = isDark ? '#111823' : '#F8FAFB';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const cardBg       = isDark ? '#1E2A3A' : '#FFFFFF';

  return (
    <section
      className="section"
      style={{ background: sectionBg, transition: 'background 0.5s ease' }}
      aria-labelledby="faq-heading"
    >
      <div className="container-xl" style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#00C8A8',
            marginBottom: '16px',
          }}>
            FAQ
          </p>
          <h2 id="faq-heading" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: headingColor, marginBottom: '16px',
            transition: 'color 0.5s ease',
          }}>
            Common <span style={GS}>Questions</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.7,
            transition: 'color 0.5s ease',
          }}>
            Answers to the questions we hear most from ABA entrepreneurs considering working with us.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {AUTISM_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: '12px', overflow: 'hidden',
                  background: cardBg,
                  border: `1px solid ${isOpen ? 'rgba(0,200,168,0.25)' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)')}`,
                  transition: 'border-color 0.2s ease, background 0.5s ease',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '20px',
                    textAlign: 'left', background: 'none', border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    fontSize: '14px', paddingRight: '16px',
                    color: isOpen ? '#00C8A8' : headingColor,
                    transition: 'color 0.2s ease',
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.3s ease, border-color 0.3s ease',
                    background: isOpen ? 'rgba(0,200,168,0.15)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)'),
                    border: `1px solid ${isOpen ? 'rgba(0,200,168,0.3)' : (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)')}`,
                  }}>
                    <motion.svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: isOpen ? '#00C8A8' : bodyColor }}
                      aria-hidden
                    >
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </motion.svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        color: bodyColor, lineHeight: 1.7,
                        padding: '0 20px 20px',
                        transition: 'color 0.5s ease',
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <motion.div
          {...fadeUp(0.3)}
          style={{ marginTop: '40px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: bodyColor, marginBottom: '16px',
            transition: 'color 0.5s ease',
          }}>
            Have a question we didn't answer?
          </p>
          <Button to="/contact" variant="ghost" size="md">
            Ask Us Directly →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Closing CTA ───────────────────────────────────────────────────
function ClosingCTA() {
  const { isDark } = useTheme();
  const sectionBg  = isDark
    ? 'linear-gradient(135deg, #001A15 0%, #002E25 40%, #001F1B 70%, #001A15 100%)'
    : 'linear-gradient(135deg, #E6FAF6 0%, #D0F5EE 40%, #E0F8F3 70%, #E6FAF6 100%)';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const bodyColorSub = isDark ? '#94A3B8' : '#94A3B8';
  const glowOpacity  = isDark ? 0.10 : 0.20;
  const trustColor   = isDark ? '#94A3B8' : '#94A3B8';

  return (
    <section
      aria-label="Final call to action"
      style={{
        position: 'relative', padding: '96px 0',
        overflow: 'hidden', background: sectionBg,
        transition: 'background 0.5s ease',
      }}
    >
      {/* Glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '33%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px', pointerEvents: 'none',
        background: `radial-gradient(ellipse, rgba(0,200,168,${glowOpacity}) 0%, transparent 65%)`,
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: '640px', margin: '0 auto' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#00C8A8', padding: '6px 16px', borderRadius: '9999px',
              background: 'rgba(0,200,168,0.12)', border: '1px solid rgba(0,200,168,0.25)',
            }}>
              Ready to Start?
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: headingColor, marginBottom: '20px',
            transition: 'color 0.5s ease',
          }}>
            Your Clinic Journey
            <br />
            <span style={GS}>Starts With One Call</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: bodyColor, lineHeight: 1.75, marginBottom: '12px',
            transition: 'color 0.5s ease',
          }}>
            Book a free, no-obligation 45-minute discovery call. We'll listen to your vision, answer your questions, and give you an honest picture of what's possible.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: bodyColorSub, marginBottom: '40px',
            transition: 'color 0.5s ease',
          }}>
            No sales pressure. No commitment required. Just honest guidance.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Button to="/contact" variant="primary" size="xl" iconRight={<ArrowRight />}>
              Book Free Consultation
            </Button>
            <Button to="/contact" variant={isDark ? 'ghost' : 'outline'} size="xl">
              Start Your ABA Clinic
            </Button>
          </div>

          {/* Trust strip */}
          <div style={{
            marginTop: '40px', display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: '24px',
          }}>
            {CLOSING_TRUST.map((t, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: trustColor, transition: 'color 0.5s ease',
              }}>
                <span style={{ color: '#00C8A8', display: 'flex', flexShrink: 0 }}>
                  {Icon[t.icon]}
                </span>
                {t.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Schema.org ────────────────────────────────────────────────────
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'WebieApp ABA Clinic Business Consulting',
  description: 'End-to-end business consulting for Autism and ABA clinic entrepreneurs across the USA — covering clinic setup, branding, website, digital marketing, and ongoing advisory.',
  provider: { '@type': 'Organization', name: 'WebieApp Solutions LLC', url: 'https://webieapp.com' },
  serviceType: 'ABA Clinic Business Consulting',
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'Audience', audienceType: 'ABA entrepreneurs, BCBAs, healthcare business owners' },
};

// ── Page export ───────────────────────────────────────────────────
export default function AutismConsulting() {
  return (
    <PageLayout>
            <Helmet>
        <title>Autism & ABA Business Consulting | WebieApp Solutions LLC</title>
        <meta name="description" content="Launch or scale your Autism & ABA therapy clinic with WebieApp Solutions LLC. We provide complete business consulting — from business formation and HIPAA-aware websites to digital marketing and patient acquisition. Serving BCBAs across all 50 US states." />
        <meta name="keywords" content="ABA clinic consulting, autism clinic startup, BCBA business consulting, ABA therapy website, autism clinic digital marketing, healthcare consulting USA" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webieapp.com/autism-consulting" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebieApp Solutions LLC" />
        <meta property="og:title" content="Autism & ABA Clinic Consulting — WebieApp Solutions LLC" />
        <meta property="og:description" content="Complete consulting for ABA clinic launches: business formation, HIPAA websites, branding, marketing. All 50 US states. Free discovery call." />
        <meta property="og:url" content="https://webieapp.com/autism-consulting" />
        <meta property="og:image" content="https://webieapp.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Autism & ABA Consulting — WebieApp" />
        <meta name="twitter:description" content="Complete consulting for ABA clinic launches: business formation, HIPAA websites, branding, marketing. All 50 US states. Free discovery call." />
        <meta name="twitter:image" content="https://webieapp.com/og-image.png" />
      </Helmet>

      <HeroSection />
      <WhatWeHelpSection />
      <ProcessSection />
      <FAQSection />
      <ClosingCTA />
    </PageLayout>
  );
}
// src/pages/TermsOfService.jsx

import { useState, useEffect, useRef } from 'react';
import { motion }     from 'framer-motion';
import { Helmet }     from 'react-helmet-async';
import PageLayout      from '../components/layout/PageLayout.jsx';
import { useTheme }   from '../context/ThemeContext.jsx';

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const EFFECTIVE_DATE = 'June 1, 2025';

// ── Table of contents ─────────────────────────────────────────────
const TOC = [
  { id: 'acceptance',       label: 'Acceptance of Terms'       },
  { id: 'services',         label: 'Our Services'              },
  { id: 'engagement',       label: 'Project Engagement'        },
  { id: 'payments',         label: 'Payments & Fees'           },
  { id: 'ip',               label: 'Intellectual Property'     },
  { id: 'responsibilities', label: 'User Responsibilities'     },
  { id: 'ai-disclaimer',    label: 'AI Assistant Disclaimer'   },
  { id: 'third-party',      label: 'Third-Party Services'      },
  { id: 'liability',        label: 'Limitation of Liability'   },
  { id: 'availability',     label: 'Service Availability'      },
  { id: 'termination',      label: 'Termination'               },
  { id: 'privacy',          label: 'Privacy'                   },
  { id: 'governing-law',    label: 'Governing Law'             },
  { id: 'contact',          label: 'Contact Us'                },
  { id: 'changes',          label: 'Changes to Terms'          },
];

// ── Shared prose components ───────────────────────────────────────
function SectionHeading({ children, id, isDark }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 800,
        fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
        letterSpacing: '-0.025em', lineHeight: 1.2,
        color: isDark ? '#F8FAFC' : '#111318',
        marginBottom: '20px', scrollMarginTop: '100px',
        transition: 'color 0.5s ease',
      }}
    >
      {children}
    </h2>
  );
}

function Para({ children, isDark, style = {} }) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif', fontSize: '15px',
      color: isDark ? '#A1A1AA' : '#4B5563',
      lineHeight: 1.8, marginBottom: '16px',
      transition: 'color 0.5s ease',
      ...style,
    }}>
      {children}
    </p>
  );
}

function BulletList({ items, isDark }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(0,200,168,0.10)', border: '1px solid rgba(0,200,168,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
          }}>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 5l2.5 2.5L8 3" stroke="#00C8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px',
            color: isDark ? '#A1A1AA' : '#4B5563',
            lineHeight: 1.7, transition: 'color 0.5s ease',
          }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProhibitedList({ items, isDark }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
          }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 2l6 6M8 2l-6 6" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px',
            color: isDark ? '#A1A1AA' : '#4B5563',
            lineHeight: 1.7, transition: 'color 0.5s ease',
          }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }) {
  return (
    <h3 style={{
      fontFamily: 'Sora, sans-serif', fontWeight: 700,
      fontSize: '13px', letterSpacing: '0.10em', textTransform: 'uppercase',
      color: '#00C8A8', marginBottom: '12px', marginTop: '28px',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      <span style={{ width: '16px', height: '1px', background: '#00C8A8', flexShrink: 0 }} aria-hidden />
      {children}
    </h3>
  );
}

function CalloutBox({ children, isDark, variant = 'teal' }) {
  const styles = {
    teal: {
      bg: 'rgba(0,200,168,0.06)',
      border: 'rgba(0,200,168,0.20)',
      barColor: '#00C8A8',
    },
    amber: {
      bg: isDark ? 'rgba(251,191,36,0.06)' : 'rgba(251,191,36,0.07)',
      border: 'rgba(251,191,36,0.25)',
      barColor: '#FBBF24',
    },
    blue: {
      bg: isDark ? 'rgba(96,165,250,0.06)' : 'rgba(37,99,235,0.05)',
      border: isDark ? 'rgba(96,165,250,0.20)' : 'rgba(37,99,235,0.15)',
      barColor: isDark ? '#60A5FA' : '#2563EB',
    },
  };
  const s = styles[variant] || styles.teal;
  return (
    <div style={{
      display: 'flex', gap: '16px',
      padding: '18px 20px', borderRadius: '14px',
      background: s.bg, border: `1px solid ${s.border}`,
      margin: '20px 0',
    }}>
      <div style={{
        width: '3px', borderRadius: '9999px',
        background: s.barColor, flexShrink: 0, minHeight: '20px',
      }} />
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '14px',
        color: isDark ? '#A1A1AA' : '#4B5563',
        lineHeight: 1.7, transition: 'color 0.5s ease',
      }}>
        {children}
      </div>
    </div>
  );
}

function ServiceCard({ name, desc, isDark }) {
  const cardBg     = isDark ? '#1E2A3A' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const nameColor  = isDark ? '#F8FAFC' : '#111318';
  const bodyColor  = isDark ? '#94A3B8' : '#6B7A8D';

  return (
    <div style={{
      padding: '14px 16px', borderRadius: '12px',
      background: cardBg, border: `1px solid ${cardBorder}`,
      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      transition: 'background 0.5s ease, border-color 0.5s ease',
    }}>
      <div style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: '#00C8A8', flexShrink: 0, marginTop: '6px',
      }} />
      <div>
        <div style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '13px', color: nameColor,
          marginBottom: '2px', transition: 'color 0.5s ease',
        }}>
          {name}
        </div>
        {desc && (
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: bodyColor, lineHeight: 1.5,
            transition: 'color 0.5s ease',
          }}>
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sticky ToC ────────────────────────────────────────────────────
function TableOfContents({ activeId, isDark }) {
  const tocBg     = isDark ? '#141E2B' : '#FFFFFF';
  const tocBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const itemColor = isDark ? '#94A3B8' : '#6B7A8D';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Table of contents"
      style={{
        position: 'sticky', top: '96px',
        background: tocBg, border: `1px solid ${tocBorder}`,
        borderRadius: '16px', padding: '20px',
        boxShadow: isDark ? 'none' : '0 1px 8px rgba(0,0,0,0.06)',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}
    >
      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
        color: '#00C8A8', marginBottom: '14px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ width: '12px', height: '1px', background: '#00C8A8' }} aria-hidden />
        On This Page
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {TOC.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  width: '100%', textAlign: 'left', background: isActive ? 'rgba(0,200,168,0.08)' : 'transparent',
                  border: 'none', cursor: 'pointer', padding: '6px 8px', borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#00C8A8' : itemColor,
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = isDark ? '#D4D4D8' : '#374151'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = itemColor; }}
              >
                <span style={{
                  width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                  background: isActive ? '#00C8A8' : 'currentColor',
                  opacity: isActive ? 1 : 0.4,
                }} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ── Policy section wrapper ────────────────────────────────────────
function PolicySection({ id, title, children, isDark, index }) {
  const dividerColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.07)';

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: '48px', paddingBottom: '48px',
        borderBottom: `1px solid ${dividerColor}`,
        scrollMarginTop: '96px',
        transition: 'border-color 0.5s ease',
      }}
      aria-labelledby={`${id}-heading`}
    >
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
          background: 'rgba(0,200,168,0.08)', border: '1px solid rgba(0,200,168,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: '11px', color: '#00C8A8',
          }}>
            {String(index).padStart(2, '0')}
          </span>
        </div>
        <SectionHeading id={`${id}-heading`} isDark={isDark}>{title}</SectionHeading>
      </div>
      {children}
    </motion.section>
  );
}

// ── Page export ───────────────────────────────────────────────────
export default function TermsOfService() {
  const { isDark } = useTheme();
  const [activeId, setActiveId] = useState('acceptance');
  const observerRef = useRef(null);

  const sectionBg = isDark ? '#111823' : '#F8FAFB';

  useEffect(() => {
    const ids = TOC.map(t => t.id);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    els.forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <PageLayout>
      <Helmet>
        <title>Terms of Service — WebieApp Solutions LLC</title>
        <meta name="description" content="Terms of Service for WebieApp Solutions LLC. Understand the terms governing use of our website, services, and digital solutions." />
        <link rel="canonical" href="https://webieapp.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service — WebieApp Solutions LLC" />
        <meta property="og:description" content="The terms governing use of WebieApp Solutions LLC website and services. US-registered technology agency." />
        <meta property="og:url" content="https://webieapp.com/terms-of-service" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        aria-label="Terms of service hero"
        style={{
          position: 'relative',
          paddingTop: '144px', paddingBottom: '100px',
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(150deg, #0D1825 0%, #0F2232 40%, #111823 100%)'
            : 'linear-gradient(150deg, #0D1B2A 0%, #0F2033 50%, #0A1628 100%)',
        }}
      >
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
            style={{ maxWidth: '720px' }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#00C8A8',
              }}>
                Legal &amp; Terms
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '20px',
            }}>
              Terms of <span style={GS}>Service</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '560px', marginBottom: '32px',
            }}>
              These terms outline the relationship between you and WebieApp Solutions LLC when you use our website or engage us for services. We&apos;ve written them to be clear and fair — not intimidating.
            </p>

            {/* Meta chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                {
                  icon: (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  ),
                  label: `Effective: ${EFFECTIVE_DATE}`,
                },
                {
                  icon: (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Registered in Kentucky, USA',
                },
                {
                  icon: (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
                    </svg>
                  ),
                  label: 'Fair & transparent',
                },
              ].map((chip, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '7px 16px', borderRadius: '9999px',
                  fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                  background: 'rgba(0,200,168,0.08)', border: '1px solid rgba(0,200,168,0.20)',
                }}>
                  <span style={{ color: '#00C8A8', display: 'flex', flexShrink: 0 }}>{chip.icon}</span>
                  {chip.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <section
        className="section"
        style={{ background: sectionBg, transition: 'background 0.5s ease' }}
        aria-label="Terms of service content"
      >
        <div className="container-xl">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '64px', alignItems: 'start' }}
            className="terms-layout"
          >
            {/* ── Main content ── */}
            <main>

              {/* 01 Acceptance */}
              <PolicySection id="acceptance" title="Acceptance of Terms" isDark={isDark} index={1}>
                <Para isDark={isDark}>
                  Welcome to WebieApp Solutions LLC. By accessing our website at <strong style={{ color: isDark ? '#D4D4D8' : '#374151' }}>webieapp.com</strong> or engaging us for any of our services, you confirm that you have read, understood, and agree to be bound by these Terms of Service and our <a href="/privacy-policy" style={{ color: '#00C8A8', textDecoration: 'none' }}>Privacy Policy</a>.
                </Para>
                <Para isDark={isDark}>
                  These Terms apply to all visitors, clients, and anyone who accesses or uses our website, submits an inquiry, or enters into a service engagement with us. If you do not agree with any part of these Terms, please do not use our website or services.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  These Terms represent a mutual agreement built on transparency and good faith. We aim to be a reliable long-term partner — not a company that hides behind dense legal language.
                </CalloutBox>
                <Para isDark={isDark}>
                  If you are accessing our services on behalf of a company or organization, you represent that you have the authority to bind that entity to these Terms.
                </Para>
              </PolicySection>

              {/* 02 Services */}
              <PolicySection id="services" title="Our Services" isDark={isDark} index={2}>
                <Para isDark={isDark}>
                  WebieApp Solutions LLC is a US-registered technology and digital consultancy that delivers premium digital products and professional consulting services to clients globally. Our current service offerings include:
                </Para>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }} className="services-grid">
                  {[
                    { name: 'Website Development', desc: 'Custom-built, enterprise-grade websites and web applications' },
                    { name: 'SaaS Development', desc: 'Full-stack SaaS platform engineering and product development' },
                    { name: 'SEO', desc: 'Technical and content SEO for organic growth and visibility' },
                    { name: 'Digital Marketing', desc: 'Paid acquisition, campaign strategy, and performance marketing' },
                    { name: 'Social Media Management', desc: 'Content strategy, scheduling, and community management' },
                    { name: 'UI/UX Design', desc: 'Product design, prototyping, and user experience strategy' },
                    { name: 'Autism & ABA Consulting', desc: 'End-to-end business consulting for ABA clinic entrepreneurs' },
                    { name: 'Liberia Business Solutions', desc: 'Digital infrastructure and platform development for West African markets' },
                  ].map((svc) => (
                    <ServiceCard key={svc.name} name={svc.name} desc={svc.desc} isDark={isDark} />
                  ))}
                </div>

                <CalloutBox isDark={isDark} variant="blue">
                  <strong>Note:</strong> Our service offerings may evolve, expand, or change over time as we grow and respond to client needs. The most current description of services is always available on our website or by contacting us directly.
                </CalloutBox>
                <Para isDark={isDark}>
                  The specific scope, deliverables, timelines, and pricing for any engagement are defined in separate project agreements or statements of work, which take precedence over these general Terms where they conflict.
                </Para>
              </PolicySection>

              {/* 03 Engagement */}
              <PolicySection id="engagement" title="Consultation & Project Engagement" isDark={isDark} index={3}>
                <Para isDark={isDark}>
                  Every client relationship at WebieApp begins with an honest discovery conversation. We take time to understand your goals before recommending a path forward.
                </Para>

                <SubHeading>Project Timelines</SubHeading>
                <Para isDark={isDark}>
                  All project timelines provided — whether in proposals, emails, or conversations — are good-faith estimates based on the information available at the time. Actual delivery may vary based on the complexity of the work, client responsiveness, third-party dependencies, or scope changes.
                </Para>

                <SubHeading>Scope Changes</SubHeading>
                <Para isDark={isDark}>
                  Changes to a project&apos;s scope after work has begun may affect the timeline, pricing, or both. We will always communicate clearly when a requested change falls outside the original agreement and will seek written confirmation before proceeding with additional work.
                </Para>

                <SubHeading>Written Agreements</SubHeading>
                <Para isDark={isDark}>
                  For formal client engagements, we issue project proposals, contracts, or statements of work that outline the specific terms of that engagement. Where a written agreement exists, its terms take precedence over these general Terms of Service.
                </Para>

                <CalloutBox isDark={isDark} variant="teal">
                  We believe clarity prevents problems. If anything in a project engagement is unclear, we encourage clients to ask questions before work begins rather than after.
                </CalloutBox>
              </PolicySection>

              {/* 04 Payments */}
              <PolicySection id="payments" title="Payments & Fees" isDark={isDark} index={4}>
                <Para isDark={isDark}>
                  Our pricing is discussed and agreed upon before any project begins. We believe in full transparency about costs — there are no hidden fees.
                </Para>

                <BulletList isDark={isDark} items={[
                  'Payment schedules, milestones, and amounts are outlined in project-specific agreements',
                  'Invoices are issued according to agreed billing schedules and are due within the timeframe specified',
                  'Delays in payment may impact project timelines, delivery schedules, or the continuation of work',
                  'For ongoing retainer services, fees are due at the start of each billing period unless otherwise agreed',
                  'Currency and payment method details are confirmed at the start of each engagement',
                ]} />

                <CalloutBox isDark={isDark} variant="amber">
                  <strong>Late payments:</strong> We understand business realities. If you anticipate difficulty meeting a payment deadline, please communicate with us proactively — we would rather work with you on a solution than let it disrupt a productive relationship.
                </CalloutBox>

                <Para isDark={isDark}>
                  All fees are non-refundable unless otherwise stated in a specific project agreement or required by applicable law. For any billing disputes, please contact us within 14 days of receiving an invoice.
                </Para>
              </PolicySection>

              {/* 05 IP */}
              <PolicySection id="ip" title="Intellectual Property" isDark={isDark} index={5}>
                <Para isDark={isDark}>
                  Intellectual property matters are taken seriously at WebieApp. Here is how ownership works:
                </Para>

                <SubHeading>WebieApp Website &amp; Brand</SubHeading>
                <Para isDark={isDark}>
                  All content on webieapp.com — including but not limited to written content, design, code, graphics, brand identity, logos, and visual materials — is the exclusive intellectual property of WebieApp Solutions LLC. You may not reproduce, distribute, or use this content without our prior written permission.
                </Para>

                <SubHeading>Client Project Deliverables</SubHeading>
                <Para isDark={isDark}>
                  For work we create specifically for a client, ownership of the deliverables is governed by the project agreement. In general:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Upon receipt of full and final payment, ownership of agreed deliverables transfers to the client',
                  'WebieApp retains the right to display completed work in our portfolio and marketing materials, unless the client requests confidentiality in writing',
                  'Third-party components, libraries, or tools used in a project remain subject to their own licenses',
                  'Any pre-existing WebieApp frameworks, tools, or proprietary systems used in a project remain the property of WebieApp',
                ]} />

                <CalloutBox isDark={isDark} variant="teal">
                  If you have specific IP requirements — particularly around confidentiality or exclusivity — please raise them during the proposal stage so we can address them in the project agreement.
                </CalloutBox>
              </PolicySection>

              {/* 06 User Responsibilities */}
              <PolicySection id="responsibilities" title="User Responsibilities" isDark={isDark} index={6}>
                <Para isDark={isDark}>
                  By using our website and services, you agree to engage with us in good faith and in compliance with applicable law. Specifically, you agree <strong style={{ color: isDark ? '#D4D4D8' : '#374151' }}>not</strong> to:
                </Para>

                <ProhibitedList isDark={isDark} items={[
                  'Use our website for any unlawful, fraudulent, or harmful purpose',
                  'Attempt to gain unauthorized access to any part of our website, systems, or infrastructure',
                  'Submit false, misleading, or deceptive information through our contact or inquiry forms',
                  'Send malicious code, viruses, spam, or any content designed to harm our systems or users',
                  'Abuse or misuse our AI assistant or chatbot for automated scraping, testing, or spam',
                  'Harass, impersonate, or harm other users or our team members',
                  'Reproduce or repurpose WebieApp content, branding, or intellectual property without permission',
                  'Engage in any activity that disrupts the normal operation of our website or services',
                ]} />

                <Para isDark={isDark}>
                  Violation of these responsibilities may result in immediate suspension of access to our website and services, and we reserve the right to take further action where appropriate.
                </Para>
              </PolicySection>

              {/* 07 AI Disclaimer */}
              <PolicySection id="ai-disclaimer" title="AI Assistant Disclaimer" isDark={isDark} index={7}>
                <Para isDark={isDark}>
                  Our website may feature an AI-powered assistant to help visitors explore our services, get answers to common questions, and initiate project conversations. We believe in being fully transparent about what it is and what it is not.
                </Para>

                <SubHeading>What the AI Assistant Provides</SubHeading>
                <Para isDark={isDark}>
                  The AI assistant is designed to provide <strong style={{ color: isDark ? '#D4D4D8' : '#374151' }}>general informational guidance only</strong>. It can help you understand our services, explain concepts, and connect you with the right resources — but it does not constitute professional advice, a formal quotation, or a binding commitment from WebieApp Solutions LLC.
                </Para>

                <SubHeading>Accuracy &amp; Limitations</SubHeading>
                <Para isDark={isDark}>
                  AI-generated responses are produced by automated systems and may occasionally be incomplete, outdated, or imprecise. While we work to keep the assistant well-informed about our services, responses should not be the sole basis for important business decisions.
                </Para>

                <CalloutBox isDark={isDark} variant="amber">
                  <strong>Important:</strong> For specific project requirements, pricing, timelines, or professional recommendations, please verify with our team directly. AI responses do not replace human consultation. Contact us at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a> for definitive answers.
                </CalloutBox>

                <SubHeading>Sensitive Information</SubHeading>
                <Para isDark={isDark}>
                  Please avoid sharing sensitive personal or business information — such as financial data, passwords, patient records, or private contracts — through the AI assistant. It is intended for general service-related conversations only.
                </Para>
              </PolicySection>

              {/* 08 Third-Party */}
              <PolicySection id="third-party" title="Third-Party Services" isDark={isDark} index={8}>
                <Para isDark={isDark}>
                  We rely on carefully selected third-party technology providers to power our website and deliver our services reliably. These include:
                </Para>

                <BulletList isDark={isDark} items={[
                  'MongoDB Atlas — cloud database infrastructure for storing application and inquiry data',
                  'Resend — transactional email delivery for confirmations and client communications',
                  'Cloudinary — media storage and delivery for project assets and website images',
                  'Google Analytics — anonymized website usage analytics',
                  'Anthropic / OpenAI — AI model providers powering our website assistant',
                ]} />

                <CalloutBox isDark={isDark} variant="amber">
                  <strong>Service interruptions:</strong> While we select reliable providers, we cannot guarantee the continuous, uninterrupted availability of third-party services. WebieApp is not responsible for any interruptions, data loss, or issues caused by third-party service failures outside our control.
                </CalloutBox>

                <Para isDark={isDark}>
                  Our website may also contain links to external websites. We are not responsible for the content, privacy practices, or reliability of any third-party websites we link to.
                </Para>
              </PolicySection>

              {/* 09 Liability */}
              <PolicySection id="liability" title="Limitation of Liability" isDark={isDark} index={9}>
                <Para isDark={isDark}>
                  WebieApp Solutions LLC provides its website and services with care and professionalism. However, like any technology business, we need to be clear about the boundaries of our responsibility.
                </Para>
                <Para isDark={isDark}>
                  To the fullest extent permitted by applicable law, WebieApp Solutions LLC and its team shall not be liable for any indirect, incidental, special, consequential, or unforeseen damages arising from:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Use of, or inability to use, our website or services',
                  'Errors, omissions, or inaccuracies in website content',
                  'Unauthorized access to or alteration of your data',
                  'Business losses arising from reliance on information provided through our website or AI assistant',
                  'Third-party service interruptions or failures',
                ]} />

                <CalloutBox isDark={isDark} variant="blue">
                  Our goal is always to deliver excellent work. If something goes wrong on our end, we will work with you to make it right — these limitations are intended to reflect business reality, not to avoid accountability for our own work.
                </CalloutBox>

                <Para isDark={isDark}>
                  In any case, our maximum aggregate liability for claims related to our services shall not exceed the total fees paid by the client in the three months preceding the claim.
                </Para>
              </PolicySection>

              {/* 10 Availability */}
              <PolicySection id="availability" title="Service Availability" isDark={isDark} index={10}>
                <Para isDark={isDark}>
                  We aim to keep webieapp.com available and performant at all times. However, like any website, we may occasionally need to take it offline or apply updates that result in temporary downtime.
                </Para>
                <BulletList isDark={isDark} items={[
                  'Scheduled maintenance may temporarily limit access to certain features',
                  'We will make reasonable efforts to communicate planned downtime in advance',
                  'Unplanned outages due to hosting providers, infrastructure, or unforeseen events may occur',
                  'We are not liable for losses resulting from website unavailability',
                ]} />
                <Para isDark={isDark}>
                  For time-sensitive inquiries during any period of website unavailability, please reach us directly at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a>.
                </Para>
              </PolicySection>

              {/* 11 Termination */}
              <PolicySection id="termination" title="Termination" isDark={isDark} index={11}>
                <Para isDark={isDark}>
                  We reserve the right to restrict or suspend access to our website for any individual or entity that violates these Terms, engages in abusive or harmful behavior, or uses our systems in a way that disrupts other users or our operations.
                </Para>
                <Para isDark={isDark}>
                  For active client engagements, termination terms are governed by the specific project agreement in place. In the absence of a specific agreement, either party may terminate an engagement with reasonable written notice, with fees owed for work completed to that point.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  We value long-term client relationships. Our preference is always to resolve issues through open communication before considering any termination of services.
                </CalloutBox>
              </PolicySection>

              {/* 12 Privacy */}
              <PolicySection id="privacy" title="Privacy" isDark={isDark} index={12}>
                <Para isDark={isDark}>
                  Your privacy matters to us. Our collection, use, and protection of personal information is governed by our <a href="/privacy-policy" style={{ color: '#00C8A8', textDecoration: 'none' }}>Privacy Policy</a>, which is incorporated into these Terms by reference.
                </Para>
                <Para isDark={isDark}>
                  By using our website and services, you consent to the data practices described in our Privacy Policy. We encourage you to read it — it&apos;s written to be clear and straightforward, just like these Terms.
                </Para>
              </PolicySection>

              {/* 13 Governing Law */}
              <PolicySection id="governing-law" title="Governing Law" isDark={isDark} index={13}>
                <Para isDark={isDark}>
                  WebieApp Solutions LLC is incorporated and registered in the Commonwealth of Kentucky, United States of America. These Terms of Service are governed by and construed in accordance with the laws of the Commonwealth of Kentucky, to the extent applicable.
                </Para>
                <Para isDark={isDark}>
                  For international clients, we acknowledge that local laws in your jurisdiction may also apply. Where there is a conflict, we will work in good faith to reach a fair resolution.
                </Para>
                <CalloutBox isDark={isDark} variant="blue">
                  <strong>Registered address:</strong> 212 N. 2nd St. STE 100, Richmond, KY 40475, United States of America.
                </CalloutBox>
              </PolicySection>

              {/* 14 Contact */}
              <PolicySection id="contact" title="Contact Us" isDark={isDark} index={14}>
                <Para isDark={isDark}>
                  If you have questions about these Terms, want to discuss a specific engagement, or need clarification on anything outlined here, please don&apos;t hesitate to reach out. We&apos;re a real team and we respond to real people.
                </Para>

                <div style={{
                  padding: '28px 32px', borderRadius: '16px', margin: '24px 0',
                  background: isDark ? '#1E2A3A' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.08)',
                  boxShadow: isDark ? 'none' : '0 1px 8px rgba(0,0,0,0.05)',
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}>
                  <p style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 800,
                    fontSize: '17px', color: isDark ? '#F8FAFC' : '#111318',
                    marginBottom: '16px', transition: 'color 0.5s ease',
                  }}>
                    WebieApp Solutions LLC
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Email',            value: 'webieapp@gmail.com',                        href: 'mailto:webieapp@gmail.com' },
                      { label: 'USA (Registered)', value: '212 N. 2nd St. STE 100, Richmond, KY 40475' },
                      { label: 'India (Operations)', value: 'Vibhuti Khand, Lucknow, India'            },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{
                          fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                          letterSpacing: '0.10em', textTransform: 'uppercase',
                          color: '#00C8A8', minWidth: '130px', paddingTop: '2px',
                        }}>
                          {row.label}
                        </span>
                        {row.href ? (
                          <a href={row.href} style={{
                            fontFamily: 'Inter, sans-serif', fontSize: '14px',
                            color: '#00C8A8', textDecoration: 'none',
                          }}>
                            {row.value}
                          </a>
                        ) : (
                          <span style={{
                            fontFamily: 'Inter, sans-serif', fontSize: '14px',
                            color: isDark ? '#A1A1AA' : '#4B5563',
                            transition: 'color 0.5s ease',
                          }}>
                            {row.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </PolicySection>

              {/* 15 Changes */}
              <PolicySection id="changes" title="Changes to Terms" isDark={isDark} index={15}>
                <Para isDark={isDark}>
                  We may update these Terms of Service from time to time to reflect changes in our services, applicable law, or business practices. When we make updates, we will revise the effective date at the top of this page.
                </Para>
                <Para isDark={isDark}>
                  For changes that materially affect your rights or obligations, we will make reasonable efforts to provide advance notice — such as a notice on our website. Your continued use of our website or services following any update constitutes acceptance of the revised Terms.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  The current version of these Terms is effective as of <strong>{EFFECTIVE_DATE}</strong>. If you have questions about any recent changes, email us and we&apos;ll explain clearly.
                </CalloutBox>

                 
              </PolicySection>

            </main>

            {/* ── Sticky ToC sidebar ── */}
            <div className="terms-toc">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <TableOfContents activeId={activeId} isDark={isDark} />

                {/* Last updated */}
                <div style={{
                  marginTop: '16px', padding: '16px 18px', borderRadius: '12px',
                  background: isDark ? '#1E2A3A' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.08)',
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    color: isDark ? '#64748B' : '#94A3B8', marginBottom: '4px',
                  }}>
                    Last updated
                  </p>
                  <p style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '13px', color: isDark ? '#F8FAFC' : '#111318',
                    transition: 'color 0.5s ease',
                  }}>
                    {EFFECTIVE_DATE}
                  </p>
                </div>

                {/* Questions CTA */}
                <div style={{
                  marginTop: '16px', padding: '16px 18px', borderRadius: '12px',
                  background: 'rgba(0,200,168,0.06)',
                  border: '1px solid rgba(0,200,168,0.18)',
                }}>
                  <p style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '13px', color: isDark ? '#F8FAFC' : '#111318',
                    marginBottom: '6px', transition: 'color 0.5s ease',
                  }}>
                    Questions about these terms?
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '12px',
                    color: isDark ? '#94A3B8' : '#6B7A8D',
                    marginBottom: '12px', lineHeight: 1.6,
                    transition: 'color 0.5s ease',
                  }}>
                    We&apos;re happy to explain anything in plain language.
                  </p>
                  <a
                    href="mailto:webieapp@gmail.com"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'Inter, sans-serif', fontSize: '12px',
                      fontWeight: 600, color: '#00C8A8', textDecoration: 'none',
                    }}
                  >
                    webieapp@gmail.com
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

              

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .terms-layout {
            grid-template-columns: 1fr !important;
          }
          .terms-toc {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
// src/pages/PrivacyPolicy.jsx

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

// ── Table of contents sections ────────────────────────────────────
const TOC = [
  { id: 'introduction',         label: 'Introduction'              },
  { id: 'information-collect',  label: 'Information We Collect'    },
  { id: 'how-we-use',           label: 'How We Use Information'    },
  { id: 'ai-assistant',         label: 'AI Assistant Disclosure'   },
  { id: 'cookies',              label: 'Cookies & Analytics'       },
  { id: 'third-party',          label: 'Third-Party Services'      },
  { id: 'data-security',        label: 'Data Security'             },
  { id: 'data-retention',       label: 'Data Retention'            },
  { id: 'your-rights',          label: 'Your Rights'               },
  { id: 'childrens-privacy',    label: "Children's Privacy"        },
  { id: 'contact',              label: 'Contact Us'                },
  { id: 'policy-updates',       label: 'Policy Updates'            },
];

// ── Small reusable prose components ──────────────────────────────
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

function SubHeading({ children, isDark }) {
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
  };
  const s = styles[variant];
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

function ThirdPartyCard({ name, purpose, link, isDark }) {
  const cardBg     = isDark ? '#18181B' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const nameColor  = isDark ? '#F8FAFC' : '#111318';
  const bodyColor  = isDark ? '#71717A' : '#6B7A8D';

  return (
    <div style={{
      padding: '16px 18px', borderRadius: '12px',
      background: cardBg, border: `1px solid ${cardBorder}`,
      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'background 0.5s ease, border-color 0.5s ease',
    }}>
      <div style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 700,
        fontSize: '13px', color: nameColor,
        marginBottom: '4px', transition: 'color 0.5s ease',
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '13px',
        color: bodyColor, lineHeight: 1.6, transition: 'color 0.5s ease',
      }}>
        {purpose}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', marginTop: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '11px',
            color: '#00C8A8', textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          Privacy Policy →
        </a>
      )}
    </div>
  );
}

// ── Sticky Table of Contents ──────────────────────────────────────
function TableOfContents({ activeId, isDark }) {
  const tocBg     = isDark ? '#111113' : '#FFFFFF';
  const tocBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const itemColor = isDark ? '#71717A' : '#6B7A8D';

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
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  cursor: 'pointer', padding: '6px 8px', borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#00C8A8' : itemColor,
                  background: isActive ? 'rgba(0,200,168,0.08)' : 'transparent',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = isDark ? '#D4D4D8' : '#374151'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = itemColor; }}
              >
                <span style={{
                  width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                  background: isActive ? '#00C8A8' : 'currentColor', opacity: isActive ? 1 : 0.4,
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
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
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
export default function PrivacyPolicy() {
  const { isDark } = useTheme();
  const [activeId, setActiveId] = useState('introduction');
  const observerRef = useRef(null);

  const sectionBg    = isDark ? '#09090B' : '#F8FAFB';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#71717A' : '#6B7A8D';

  // Intersection observer for active ToC item
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
        <title>Privacy Policy — WebieApp Solutions LLC</title>
        <meta name="description" content="Privacy Policy for WebieApp Solutions LLC. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://webieapp.com/privacy-policy" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        aria-label="Privacy policy hero"
        style={{
          position: 'relative',
          paddingTop: '144px', paddingBottom: '100px',
          overflow: 'hidden',
          background: isDark ? 'linear-gradient(150deg, #040608 0%, #091210 40%, #080B0F 100%)' : 'linear-gradient(150deg, #0D1B2A 0%, #0F2033 50%, #0A1628 100%)',
        }}
      >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#00C8A8',
              }}>
                Legal &amp; Privacy
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '20px',
            }}>
              Privacy <span style={GS}>Policy</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '560px', marginBottom: '32px',
            }}>
              We believe privacy is a right, not a footnote. This policy explains clearly and honestly how WebieApp Solutions LLC handles the information you share with us.
            </p>

            {/* Meta chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: `Effective: ${EFFECTIVE_DATE}` },
                { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Registered in Kentucky, USA' },
                { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg>, label: 'Your data, protected' },
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
        aria-label="Privacy policy content"
      >
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '64px', alignItems: 'start' }}
            className="privacy-layout">

            {/* ── Main content ── */}
            <main>

              {/* 01 Introduction */}
              <PolicySection id="introduction" title="Introduction" isDark={isDark} index={1}>
                <Para isDark={isDark}>
                  WebieApp Solutions LLC ("WebieApp," "we," "us," or "our") is a US-registered technology and digital consultancy headquartered in Richmond, Kentucky. We build digital products, SaaS platforms, and provide specialized Autism &amp; ABA business consulting to clients worldwide.
                </Para>
                <Para isDark={isDark}>
                  This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website at <strong style={{ color: isDark ? '#D4D4D8' : '#374151' }}>webieapp.com</strong>, interact with our contact form, use our AI assistant, or engage with any of our services. Please read it carefully — we've written it to be clear and human, not a wall of legal text.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  <strong>Our commitment:</strong> We collect only what we need, use it only for the purposes stated here, and never sell your personal information to third parties. Period.
                </CalloutBox>
                <Para isDark={isDark}>
                  By using our website or services, you agree to the practices described in this policy. If you have any questions at any point, you're always welcome to reach out directly at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a>.
                </Para>
              </PolicySection>

              {/* 02 Information We Collect */}
              <PolicySection id="information-collect" title="Information We Collect" isDark={isDark} index={2}>
                <Para isDark={isDark}>
                  We collect information in three primary ways: directly from you, through automated technologies when you use our website, and through our AI assistant interactions.
                </Para>

                <SubHeading isDark={isDark}>Contact Form Data</SubHeading>
                <Para isDark={isDark}>
                  When you fill out our contact form or request a consultation, we collect:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Full name — to address you correctly and personalize communication',
                  'Email address — to respond to your inquiry and send project-related updates',
                  'Phone number — if provided, for faster follow-up on time-sensitive consultations',
                  'Company or clinic name — to understand your business context',
                  'Service interest — to route your inquiry to the right specialist',
                  'Your project message — the details you share about your needs and goals',
                ]} />

                <SubHeading isDark={isDark}>AI Assistant &amp; Chatbot Interactions</SubHeading>
                <Para isDark={isDark}>
                  Our website may feature an AI-powered assistant to help answer questions about our services. When you interact with it, we may collect:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Conversation content — questions asked and responses provided',
                  'Service interests expressed — topics discussed during the session',
                  'Inquiry information — details you share to get more relevant assistance',
                ]} />

                <SubHeading isDark={isDark}>Website Analytics &amp; Technical Data</SubHeading>
                <Para isDark={isDark}>
                  When you visit webieapp.com, our systems and third-party analytics tools automatically collect certain technical information:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Browser type and version',
                  'Device type (desktop, tablet, mobile) and operating system',
                  'Pages visited, time spent, and navigation patterns',
                  'Referring website or search query that brought you to us',
                  'General geographic location (country/city — not precise location)',
                  'IP address (anonymized where technically feasible)',
                  'Cookie identifiers and session data',
                ]} />
              </PolicySection>

              {/* 03 How We Use Information */}
              <PolicySection id="how-we-use" title="How We Use Your Information" isDark={isDark} index={3}>
                <Para isDark={isDark}>
                  Every piece of information we collect has a specific, legitimate purpose. We do not use your data for anything beyond what's described here.
                </Para>
                <BulletList isDark={isDark} items={[
                  'Responding to your inquiries — to get back to you promptly and helpfully',
                  'Providing services — to deliver the digital solutions, consulting, and support you engage us for',
                  'Scheduling consultations — to set up discovery calls and project kickoffs',
                  'Client communication — project updates, deliverable sharing, and ongoing support',
                  'Improving our website — understanding how visitors use our site to make it better',
                  'Business operations — invoicing, contracts, and service records as required',
                  'Marketing communications — only if you\'ve opted in; you can unsubscribe at any time',
                  'Legal compliance — meeting our obligations under applicable US law',
                ]} />
                <CalloutBox isDark={isDark} variant="teal">
                  We will never sell, rent, or trade your personal information to any third party for their marketing purposes. Your information is used solely to serve you and operate our business.
                </CalloutBox>
              </PolicySection>

              {/* 04 AI Assistant */}
              <PolicySection id="ai-assistant" title="AI Assistant Disclosure" isDark={isDark} index={4}>
                <Para isDark={isDark}>
                  Our website may feature an AI-powered assistant built on large language model technology (such as Anthropic Claude or similar). We believe in full transparency about how this works.
                </Para>

                <SubHeading isDark={isDark}>What the AI Assistant Does</SubHeading>
                <Para isDark={isDark}>
                  The AI assistant is designed to answer questions about our services, provide preliminary guidance on project scoping, and help visitors understand how WebieApp can support their business. It is not a human agent, and it does not have access to your account information or sensitive business data.
                </Para>

                <SubHeading isDark={isDark}>Data Storage &amp; Training</SubHeading>
                <Para isDark={isDark}>
                  Conversations with our AI assistant may be logged and reviewed by our team to:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Improve the quality of responses and service guidance',
                  'Follow up on business inquiries you initiate through the assistant',
                  'Identify common questions and update our content accordingly',
                ]} />
                <Para isDark={isDark}>
                  These conversations may also be processed by our AI service providers (such as Anthropic) in accordance with their data handling policies.
                </Para>

                <CalloutBox isDark={isDark} variant="amber">
                  <strong>Important:</strong> Please avoid sharing sensitive personal information through the AI assistant — such as financial details, passwords, medical records, or government identification numbers. The AI assistant is intended for general business inquiries only.
                </CalloutBox>

                <Para isDark={isDark}>
                  If you'd prefer to communicate without AI assistance, you can always reach us directly at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a>.
                </Para>
              </PolicySection>

              {/* 05 Cookies */}
              <PolicySection id="cookies" title="Cookies &amp; Analytics" isDark={isDark} index={5}>
                <Para isDark={isDark}>
                  Our website uses cookies and similar tracking technologies to function properly and understand how visitors interact with our content.
                </Para>

                <SubHeading isDark={isDark}>Types of Cookies We Use</SubHeading>
                <BulletList isDark={isDark} items={[
                  'Essential cookies — necessary for the website to function; these cannot be disabled',
                  'Analytics cookies — help us understand traffic patterns and improve the site experience',
                  'Preference cookies — remember your settings (like dark/light mode) between visits',
                  'Performance cookies — help us measure page load times and optimize delivery',
                ]} />

                <SubHeading isDark={isDark}>Google Analytics</SubHeading>
                <Para isDark={isDark}>
                  We use Google Analytics to understand aggregate website usage — which pages are most visited, how long people stay, and where traffic comes from. Google Analytics uses cookies to collect this information. The data is anonymized and aggregated; we do not use it to identify individual visitors.
                </Para>
                <Para isDark={isDark}>
                  You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#00C8A8', textDecoration: 'none' }}>Google Analytics Opt-out Browser Add-on</a>.
                </Para>

                <SubHeading isDark={isDark}>Managing Cookies</SubHeading>
                <Para isDark={isDark}>
                  Most browsers allow you to control cookies through their settings. Disabling cookies may affect some functionality of our website. For more information on managing cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: '#00C8A8', textDecoration: 'none' }}>allaboutcookies.org</a>.
                </Para>
              </PolicySection>

              {/* 06 Third-Party Services */}
              <PolicySection id="third-party" title="Third-Party Services" isDark={isDark} index={6}>
                <Para isDark={isDark}>
                  To deliver our website and services effectively, we work with a set of carefully selected technology partners. Each partner is subject to their own privacy policy and data handling standards.
                </Para>
                <Para isDark={isDark}>
                  We share only the minimum information necessary for each service to function:
                </Para>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
                  <ThirdPartyCard isDark={isDark}
                    name="MongoDB Atlas"
                    purpose="Cloud database service used to store contact form submissions, project data, and application records securely."
                    link="https://www.mongodb.com/legal/privacy-policy"
                  />
                  <ThirdPartyCard isDark={isDark}
                    name="Resend"
                    purpose="Transactional email service used to deliver contact form confirmations, consultation scheduling emails, and client communications."
                    link="https://resend.com/privacy"
                  />
                  <ThirdPartyCard isDark={isDark}
                    name="Cloudinary"
                    purpose="Media management platform used for storing and delivering images and files associated with our web projects and client assets."
                    link="https://cloudinary.com/privacy"
                  />
                  <ThirdPartyCard isDark={isDark}
                    name="Anthropic / OpenAI"
                    purpose="AI model providers powering our website assistant. Conversation content may be processed by these providers in accordance with their usage policies."
                    link="https://www.anthropic.com/privacy"
                  />
                  <ThirdPartyCard isDark={isDark}
                    name="Google Analytics"
                    purpose="Website analytics platform providing aggregated, anonymized data on visitor behavior, traffic sources, and site performance."
                    link="https://policies.google.com/privacy"
                  />
                </div>

                <Para isDark={isDark}>
                  We do not permit any of these third parties to use your information for their own marketing or advertising purposes.
                </Para>
              </PolicySection>

              {/* 07 Data Security */}
              <PolicySection id="data-security" title="Data Security" isDark={isDark} index={7}>
                <Para isDark={isDark}>
                  Protecting your information is a responsibility we take seriously. We implement a range of technical and organizational security measures designed to safeguard data against unauthorized access, alteration, disclosure, or destruction.
                </Para>
                <BulletList isDark={isDark} items={[
                  'HTTPS encryption across all website pages and data transmissions',
                  'Access controls limiting data access to authorized team members only',
                  'Secure cloud infrastructure through vetted, enterprise-grade providers',
                  'Regular review of our data handling practices and security configurations',
                  'Minimal data collection — we don\'t store what we don\'t need',
                ]} />
                <CalloutBox isDark={isDark} variant="amber">
                  <strong>Honest disclosure:</strong> No method of electronic transmission or storage is completely secure. While we apply industry-standard protections, we cannot guarantee absolute security. If you believe your information has been compromised, please contact us immediately at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a>.
                </CalloutBox>
              </PolicySection>

              {/* 08 Data Retention */}
              <PolicySection id="data-retention" title="Data Retention" isDark={isDark} index={8}>
                <Para isDark={isDark}>
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.
                </Para>
                <BulletList isDark={isDark} items={[
                  'Contact form submissions — retained for up to 24 months after last interaction, then deleted unless an active client relationship exists',
                  'Active client project data — retained for the duration of the engagement plus a reasonable period thereafter for legal and business record-keeping',
                  'Analytics data — typically retained for 14 months in Google Analytics before automatic deletion',
                  'AI assistant conversations — retained for quality improvement purposes and deleted on a rolling basis',
                  'Financial and contractual records — retained for the period required under applicable US law',
                ]} />
                <Para isDark={isDark}>
                  When data is no longer needed, we securely delete or anonymize it. You may also request deletion at any time — see your rights below.
                </Para>
              </PolicySection>

              {/* 09 Your Rights */}
              <PolicySection id="your-rights" title="Your Rights" isDark={isDark} index={9}>
                <Para isDark={isDark}>
                  We respect your control over your personal information. You have the right to:
                </Para>
                <BulletList isDark={isDark} items={[
                  'Request access — ask us what personal information we hold about you',
                  'Request correction — ask us to update or correct inaccurate information',
                  'Request deletion — ask us to delete your personal data, subject to legal retention obligations',
                  'Withdraw consent — if you\'ve opted into marketing communications, you can unsubscribe at any time',
                  'Object to processing — raise concerns about how we use your data',
                ]} />
                <Para isDark={isDark}>
                  To exercise any of these rights, please contact us at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a>. We will respond to all requests within a reasonable timeframe — typically within 30 days. We may need to verify your identity before processing certain requests.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  We will never penalize you for exercising your privacy rights. Requesting data deletion will not affect your ability to contact us or engage our services in the future.
                </CalloutBox>
              </PolicySection>

              {/* 10 Children's Privacy */}
              <PolicySection id="childrens-privacy" title="Children's Privacy" isDark={isDark} index={10}>
                <Para isDark={isDark}>
                  WebieApp Solutions LLC does not knowingly collect, solicit, or store personal information from children under the age of 13. Our website and services are directed toward business owners, entrepreneurs, healthcare professionals, and adult decision-makers.
                </Para>
                <Para isDark={isDark}>
                  We acknowledge that some of our consulting services — specifically our Autism &amp; ABA clinic consulting — relate to services that ultimately serve children. However, our direct engagement is always with adult business owners, clinic directors, and licensed healthcare professionals. We do not collect any information from, or about, minor patients or their families.
                </Para>
                <CalloutBox isDark={isDark} variant="amber">
                  If you believe a child under 13 has submitted personal information through our website without appropriate parental consent, please contact us immediately at <a href="mailto:webieapp@gmail.com" style={{ color: '#00C8A8', textDecoration: 'none' }}>webieapp@gmail.com</a> and we will promptly delete it.
                </CalloutBox>
              </PolicySection>

              {/* 11 Contact */}
              <PolicySection id="contact" title="Contact Us" isDark={isDark} index={11}>
                <Para isDark={isDark}>
                  If you have questions about this Privacy Policy, want to exercise your rights, or have any concerns about how we handle your information, please reach out. We're a real team and we take these matters seriously.
                </Para>

                {/* Contact card */}
                <div style={{
                  padding: '28px 32px', borderRadius: '16px', margin: '24px 0',
                  background: isDark ? '#18181B' : '#FFFFFF',
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
                      { label: 'Email', value: 'webieapp@gmail.com', href: 'mailto:webieapp@gmail.com' },
                      { label: 'USA (Registered)', value: '212 N. 2nd St. STE 100, Richmond, KY 40475' },
                      { label: 'India (Operations)', value: 'Vibhuti Khand, Lucknow, India' },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{
                          fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                          letterSpacing: '0.10em', textTransform: 'uppercase',
                          color: '#00C8A8', minWidth: '120px', paddingTop: '2px',
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

              {/* 12 Policy Updates */}
              <PolicySection id="policy-updates" title="Policy Updates" isDark={isDark} index={12}>
                <Para isDark={isDark}>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the effective date at the top of this page.
                </Para>
                <Para isDark={isDark}>
                  For material changes — those that meaningfully affect how we handle your personal information — we will make reasonable efforts to notify you, such as by posting a notice on our website or reaching out directly if we hold your contact information.
                </Para>
                <Para isDark={isDark}>
                  We encourage you to review this policy periodically. Your continued use of our website and services following any updates constitutes your acceptance of the revised policy.
                </Para>
                <CalloutBox isDark={isDark} variant="teal">
                  The current version of this policy is effective as of <strong>{EFFECTIVE_DATE}</strong>. If you have questions about changes, we're happy to explain — just email us.
                </CalloutBox>
              </PolicySection>

            </main>

            {/* ── Sticky ToC ── */}
            <div className="privacy-toc">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <TableOfContents activeId={activeId} isDark={isDark} />

                {/* Last updated card */}
                <div style={{
                  marginTop: '16px', padding: '16px 18px', borderRadius: '12px',
                  background: isDark ? '#18181B' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.08)',
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    color: isDark ? '#52525B' : '#94A3B8',
                    marginBottom: '4px',
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
                    Have questions?
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '12px',
                    color: isDark ? '#71717A' : '#6B7A8D',
                    marginBottom: '12px', lineHeight: 1.6,
                    transition: 'color 0.5s ease',
                  }}>
                    We're happy to explain anything in plain language.
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
          .privacy-layout {
            grid-template-columns: 1fr !important;
          }
          .privacy-toc {
            display: none;
          }
        }
      `}</style>
    </PageLayout>
  );
}
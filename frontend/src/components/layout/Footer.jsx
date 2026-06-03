import { useTheme } from '../../context/ThemeContext.jsx';
import { Link } from 'react-router-dom';
import { COMPANY, SERVICES } from '../../data/siteData.js';
import Button, { ArrowRight } from '../ui/Button.jsx';

const FOOTER_LINKS = {
  Services: SERVICES.map(s => ({ label: s.title, path: `/our-services` })),
  Company: [
    { label: 'About Us',          path: '/about-us' },
    { label: 'Portfolio',         path: '/portfolio' },
    { label: 'Autism Consulting', path: '/autism-consulting' },
    { label: 'Liberia Projects',  path: '/liberia' },
    { label: 'Contact',           path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',   path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
};

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: COMPANY.social.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  // {
  //   label: 'Twitter / X',
  //   href: COMPANY.social.twitter,
  //   icon: (
  //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  //     </svg>
  //   ),
  // },
  {
    label: 'Instagram',
    href: COMPANY.social.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: COMPANY.social.facebook,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

// ── matches container-xl / max-w-7xl (1280px) ─────────────
const W = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-scroll-section="footer"
      role="contentinfo"
      style={{ background: '#09090B', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* ── Top CTA strip ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '56px 0' }}>
        <div style={W}>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between',
            gap: '32px',
          }}>
            <div style={{ maxWidth: '520px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#00C8A8',
                marginBottom: '12px',
              }}>
                Ready to start?
              </p>
              <h2 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                color: '#F8FAFC', margin: 0,
              }}>
                Let's build something{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  exceptional.
                </span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight />}>
                Book Free Consultation
              </Button>
              <Button to="/our-services" variant="ghost" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{ ...W, padding: '64px 1.5rem 48px' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center',
                gap: '10px', marginBottom: '24px', textDecoration: 'none',
              }}
            >
              <img
                src="/logo/logo.png"
                alt="WebieApp Solutions LLC"
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: 'rgba(255,255,255,0.40)', lineHeight: 1.75,
              maxWidth: '280px', marginBottom: '32px',
            }}>
              Premium digital solutions and specialized Autism & ABA business consulting.
              US-registered. Globally trusted.
            </p>

            {/* Offices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {Object.values(COMPANY.offices).map(o => (
                <div key={o.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', marginTop: '1px',
                  }}>
                    {o.flag}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '10px',
                      color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase',
                      letterSpacing: '0.1em', marginBottom: '3px',
                    }}>
                      {o.label}
                    </p>
                    <address style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '12px',
                      color: 'rgba(255,255,255,0.50)', fontStyle: 'normal',
                      lineHeight: 1.6,
                    }}>
                      {o.line1}<br />{o.line2}
                    </address>
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:info@webieapp.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: '#00C8A8', textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              info@webieapp.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)',
                marginBottom: '20px',
              }}>
                {heading}
              </h3>
              <ul style={{
                listStyle: 'none', margin: 0, padding: 0,
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                {links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        color: 'rgba(255,255,255,0.40)', textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#00C8A8'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.40)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          ...W,
          padding: '20px 1.5rem',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px',
            color: 'rgba(255,255,255,0.25)', margin: 0,
          }}>
            © {year} {COMPANY.name}. All rights reserved. · {COMPANY.registration}.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              color: 'rgba(255,255,255,0.25)',
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: '#00C8A8', flexShrink: 0,
              }} />
              Serving 12+ Countries
            </span>

            <div style={{ display: 'flex', gap: '4px' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.30)',
                    background: 'transparent',
                    border: '1px solid transparent',
                    transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00C8A8';
                    e.currentTarget.style.background = 'rgba(0,200,168,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0,200,168,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.30)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
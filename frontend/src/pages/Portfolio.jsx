// src/pages/Portfolio.jsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Helmet }    from 'react-helmet-async';
import PageLayout     from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight } from '../components/ui/Button.jsx';
import { FinalCTA }  from '../components/sections/home/BottomSections.jsx';
import { useTheme }  from '../context/ThemeContext.jsx';

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ── Categories ────────────────────────────────────────────────────
const CATEGORIES = [
  'All',
  'Autism & ABA',
  'Healthcare',
  'Logistics & Delivery',
  'Property / Real Estate',
  'Mental Health',
  'NGO / Community',
  'Web Platforms',
  'Mobile Apps',
];

// ── Category styles ───────────────────────────────────────────────
const CAT_STYLE = {
  'Autism & ABA':           { bg: 'rgba(0,200,168,0.12)',   text: '#00C8A8', border: 'rgba(0,200,168,0.30)'   },
  'Healthcare':             { bg: 'rgba(14,165,233,0.10)',  text: '#0EA5E9', border: 'rgba(14,165,233,0.28)'  },
  'Logistics & Delivery':   { bg: 'rgba(251,146,60,0.10)',  text: '#F97316', border: 'rgba(251,146,60,0.28)'  },
  'Property / Real Estate': { bg: 'rgba(139,92,246,0.10)',  text: '#8B5CF6', border: 'rgba(139,92,246,0.28)'  },
  'Mental Health':          { bg: 'rgba(236,72,153,0.10)',  text: '#EC4899', border: 'rgba(236,72,153,0.28)'  },
  'NGO / Community':        { bg: 'rgba(34,197,94,0.10)',   text: '#22C55E', border: 'rgba(34,197,94,0.28)'   },
  'Web Platforms':          { bg: 'rgba(6,182,212,0.10)',   text: '#06B6D4', border: 'rgba(6,182,212,0.28)'   },
  'Mobile Apps':            { bg: 'rgba(245,158,11,0.10)',  text: '#F59E0B', border: 'rgba(245,158,11,0.28)'  },
  'Business Consulting':    { bg: 'rgba(99,102,241,0.10)',  text: '#6366F1', border: 'rgba(99,102,241,0.28)'  },
};

// Per-project logo gradient accents
const LOGO_ACCENTS = [
  { from: '#00C8A8', to: '#0891b2' },
  { from: '#8B5CF6', to: '#6366F1' },
  { from: '#F97316', to: '#EF4444' },
  { from: '#0EA5E9', to: '#2563EB' },
  { from: '#EC4899', to: '#8B5CF6' },
  { from: '#22C55E', to: '#0EA5E9' },
  { from: '#F59E0B', to: '#F97316' },
  { from: '#06B6D4', to: '#0EA5E9' },
  { from: '#00C8A8', to: '#22C55E' },
  { from: '#6366F1', to: '#8B5CF6' },
  { from: '#EF4444', to: '#EC4899' },
  { from: '#0EA5E9', to: '#06B6D4' },
  { from: '#22C55E', to: '#6366F1' },
  { from: '#EC4899', to: '#F97316' },
  { from: '#8B5CF6', to: '#00C8A8' },
  { from: '#F97316', to: '#F59E0B' },
  { from: '#2563EB', to: '#6366F1' },
  { from: '#00C8A8', to: '#0EA5E9' },
  { from: '#6366F1', to: '#EC4899' },
];

// ── Projects ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, initials: 'SR', logo: '/portfolio/logos/saferide.png',
    name: 'Safe Ride Delivery',
    description: 'A logistics and delivery platform built to streamline transportation, deliveries, and operational management across West Africa.',
    categories: ['Logistics & Delivery', 'Mobile Apps'],
    url: 'https://www.saferidedelivery.com/',
    featured: true,
  },
  {
    id: 2, initials: 'KL', logo: '/portfolio/logos/knowliberia.png',
    name: 'Know Liberia',
    description: 'A premium Liberia-focused property investment platform helping users discover real estate opportunities and property listings.',
    categories: ['Property / Real Estate', 'Web Platforms'],
    url: 'https://www.knowliberia.com/',
    featured: true,
  },
  {
    id: 3, initials: 'AV', logo: '/portfolio/logos/autismviolet.png',
    name: 'Autism Violet',
    description: 'A professional autism-focused platform providing support, resources, and specialized therapeutic services for families.',
    categories: ['Autism & ABA'],
    url: 'https://www.autismviolet.com/',
  },
  {
    id: 4, initials: 'DH', logo: '/portfolio/logos/dovehealthservices.png',
    name: 'Dove Health Services',
    description: 'A healthcare-focused digital platform supporting autism and care-related services with a trusted clinical presence.',
    categories: ['Healthcare', 'Autism & ABA'],
    url: 'https://dovehealthservices.com/',
  },
  {
    id: 5, initials: 'DA', logo: '/portfolio/logos/doveautism.png',
    name: 'Dove Autism',
    description: 'Dedicated autism services platform offering behavioral therapy, resources, and family support programs.',
    categories: ['Autism & ABA'],
    url: 'https://www.doveautism.com/',
  },
  {
    id: 6, initials: 'CP', logo: '/portfolio/logos/careplusautism.png',
    name: 'Care Plus Autism',
    description: 'A compassionate autism care platform delivering evidence-based ABA therapy and family-centered services.',
    categories: ['Autism & ABA'],
    url: 'https://www.careplusautism.com/',
  },
  {
    id: 7, initials: 'AS', logo: '/portfolio/logos/autismsolved.png',
    name: 'Autism Solved',
    description: 'An innovative platform connecting families with autism specialists, providing guidance and clinical support resources.',
    categories: ['Autism & ABA'],
    url: 'https://www.autismsolved.com/',
  },
  {
    id: 8, initials: 'AU', logo: '/portfolio/logos/autismstartup.png',
    name: 'Autism Startup',
    description: 'A platform helping entrepreneurs launch and grow Autism & ABA businesses with expert consulting and digital infrastructure.',
    categories: ['Autism & ABA', 'Business Consulting'],
    url: 'https://www.autismstartup.com/',
    featured: true,
  },
  {
    id: 9, initials: 'AB', logo: '/portfolio/logos/alliancebehavioral.png',
    name: 'Alliance Behavioral Therapy',
    description: 'A professional behavioral therapy solutions platform delivering high-quality ABA services and clinical support.',
    categories: ['Autism & ABA'],
    url: 'https://www.alliancebehavioraltherapysolutions.com/',
  },
  {
    id: 10, initials: 'ZC', logo: '/portfolio/logos/zenithcare.png',
    name: 'Zenith Care Service',
    description: 'Provider of skilled nursing and staffing services, connecting healthcare professionals with care facilities.',
    categories: ['Healthcare'],
    url: 'https://www.zenithcareservice.org/',
  },
  {
    id: 11, initials: 'BP', logo: '/portfolio/logos/brightpathautism.png',
    name: 'BrightPath Autism',
    description: 'A dedicated ABA therapy platform delivering personalized treatment and family support across multiple service locations.',
    categories: ['Autism & ABA'],
    url: 'https://www.bpautism.com/',
  },
  {
    id: 12, initials: 'BV', logo: '/portfolio/logos/bloomveraautism.png',
    name: 'Bloomvera Autism',
    description: 'A modern autism services platform built to support families with compassionate, evidence-based therapeutic care.',
    categories: ['Autism & ABA'],
    url: 'https://www.bloomveraautism.com/',
  },
  {
    id: 13, initials: 'SH', logo: '/portfolio/logos/safehomemd.png',
    name: 'Safe Home of Maryland',
    description: 'Person-centered support services for individuals with intellectual and developmental disabilities in Maryland.',
    categories: ['Healthcare'],
    url: 'https://www.safehomeofmaryland.com/',
  },
  {
    id: 14, initials: 'VT', logo: '/portfolio/logos/vitaltrusth.png',
    name: 'Vital Trust Health LLC',
    description: 'A professional mental healthcare platform focused on compassionate, confidential, and accessible care services.',
    categories: ['Mental Health'],
    url: 'https://www.vitaltrusth.com/',
    featured: true,
  },
  {
    id: 15, initials: 'PH', logo: '/portfolio/logos/pr5hearts.webp',
    name: 'PR5 Hearts Network',
    description: 'A community-driven autism network platform connecting families, therapists, and advocates across the country.',
    categories: ['Autism & ABA'],
    url: 'https://pr5-heartsnetwork.com/',
  },
  {
    id: 16, initials: 'DC', logo: '/portfolio/logos/decoderhealth.svg',
    name: 'Decoder Health',
    description: 'An innovative healthcare platform bridging clinical services with accessible digital tools for autism care.',
    categories: ['Healthcare', 'Autism & ABA'],
    url: 'https://decoderhealth.com/',
  },
  {
    id: 17, initials: 'GH', logo: '/portfolio/logos/gentlehearts.jpeg',
    name: 'Gentle Hearts Home Health',
    description: 'A premium home healthcare platform delivering personalized in-home care services with warmth and professionalism.',
    categories: ['Healthcare'],
    url: 'https://gentleheartshha.com/',
  },
  {
    id: 18, initials: 'AC', logo: '/portfolio/logos/autismcircle.png',
    name: 'Autism Circle',
    description: 'A holistic autism support platform offering therapeutic resources, community connection, and family guidance.',
    categories: ['Autism & ABA'],
    url: 'https://www.autismcircle.net/',
  },
  {
    id: 19, initials: 'CV', logo: '/portfolio/logos/cityofvision.png',
    name: 'The City of Vision',
    description: 'A nonprofit platform empowering communities through healthcare, education, and social support programs.',
    categories: ['NGO / Community', 'Healthcare'],
    url: 'https://thecityofvision.org/',
  },
  {
    id: 20, initials: 'JA', logo: '/portfolio/logos/jambooautism.png',
    name: 'Jamboo Autism',
    description: 'A compassionate autism services platform delivering evidence-based ABA therapy and family-centered support programs.',
    categories: ['Autism & ABA'],
    url: 'https://jambooautism.com/',
  },
  {
    id: 21, initials: 'AA', logo: '/portfolio/logos/autismabapartners.webp',
    name: 'Autism ABA Partners',
    description: 'A dedicated ABA therapy platform connecting families with qualified behavior analysts and therapists.',
    categories: ['Autism & ABA'],
    url: 'https://autismabapartners.com/',
  },
  {
    id: 22, initials: 'AB2', logo: '/portfolio/logos/autismbehavior.jpg',
    name: 'Autism Behavior PLLC',
    description: 'A professional behavioral health platform providing specialized autism treatment and clinical support services.',
    categories: ['Autism & ABA', 'Healthcare'],
    url: 'https://autismbehavior-pllc.com/',
  },
  {
    id: 23, initials: 'VG', logo: '/portfolio/logos/villagegreendental.png',
    name: 'Village Green Dental',
    description: 'A modern dental practice platform delivering exceptional patient experiences and comprehensive oral care services in Canada.',
    categories: ['Healthcare'],
    url: 'https://villagegreendental.ca/',
  },
  {
    id: 24, initials: 'TS', logo: '/portfolio/logos/theautismspark.jpg',
    name: 'The Autism Spark',
    description: 'An inspiring autism services platform igniting potential through innovative ABA therapy and community support.',
    categories: ['Autism & ABA'],
    url: 'https://theautismspark.com/',
  },
  {
    id: 25, initials: 'PA', logo: '/portfolio/logos/peacockautism.png',
    name: 'Peacock Autism',
    description: 'A vibrant autism care platform offering specialized therapy, behavioral support, and family resources.',
    categories: ['Autism & ABA'],
    url: 'https://peacockautism.com/',
  },
  {
    id: 26, initials: 'WH', logo: '/portfolio/logos/wahomefoundation.png',
    name: 'WA Home Foundation',
    description: 'A nonprofit foundation platform supporting underserved communities with housing, healthcare, and social services.',
    categories: ['NGO / Community'],
    url: 'https://wahomefoundation.com/',
  },
  {
    id: 27, initials: 'IH', logo: '/portfolio/logos/inharmony.png',
    name: 'InHarmony Behavioral',
    description: 'A holistic behavioral health platform offering ABA therapy and behavioral wellness services for children and families.',
    categories: ['Autism & ABA', 'Mental Health'],
    url: 'https://inharmonybehavioral.com/',
  },
  {
    id: 28, initials: 'CS', logo: '/portfolio/logos/codespringfinancials.webp',
    name: 'Codespring Financials',
    description: 'A professional financial services platform delivering smart, technology-driven financial solutions and consulting.',
    categories: ['Web Platforms'],
    url: 'https://codespringfinancials.com/',
  },
  {
    id: 29, initials: 'CN', logo: '/portfolio/logos/carestaffnursing.jpg',
    name: 'Carestaff Nursing Services',
    description: 'A healthcare staffing platform connecting skilled nursing professionals with healthcare facilities across the region.',
    categories: ['Healthcare'],
    url: 'https://carestaffnursingservices.com/',
  },
  {
    id: 30, initials: 'TC', logo: '/portfolio/logos/theautismcare.jpg',
    name: 'The Autism Care',
    description: 'A comprehensive autism care platform providing personalized therapy, resources, and advocacy for families.',
    categories: ['Autism & ABA'],
    url: 'https://theautismcare.com/',
  },
  {
    id: 31, initials: 'ST', logo: '/portfolio/logos/saferidetrack.png',
    name: 'Safe Ride Track',
    description: 'An intelligent ride tracking and safety platform designed for secure, monitored transportation solutions.',
    categories: ['Logistics & Delivery', 'Mobile Apps'],
    url: 'https://saferidetrack.com/',
  },
  {
    id: 32, initials: 'SS', logo: '/portfolio/logos/sproutsandshine.png',
    name: 'Sprouts and Shine ABA',
    description: 'A nurturing ABA therapy platform helping children with autism thrive through evidence-based, play-centered interventions.',
    categories: ['Autism & ABA'],
    url: 'https://sproutsandshineaba.com/',
  },
  {
    id: 33, initials: 'AN', logo: '/portfolio/logos/abcofnewengland.png',
    name: 'ABC of New England',
    description: 'A regional autism and behavioral consulting platform serving families across New England with expert ABA services.',
    categories: ['Autism & ABA'],
    url: 'https://abcofnewengland.com/',
  },
  {
    id: 34, initials: 'CM', logo: '/portfolio/logos/christvision.png',
    name: 'Christ Vision Ministries',
    description: 'A faith-based nonprofit platform connecting communities through ministry, outreach, and social impact programs.',
    categories: ['NGO / Community'],
    url: 'https://christvisionministries.org/',
  },
];

// ── Filter Tab ────────────────────────────────────────────────────
function FilterTab({ category, active, count, onClick, isDark }) {
  const inactiveColor  = isDark ? '#94A3B8' : '#6B7A8D';
  const inactiveBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.09)';

  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      style={{
        position: 'relative', padding: '8px 16px', borderRadius: '12px',
        fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
        cursor: 'pointer', whiteSpace: 'nowrap',
        color: active ? '#00C8A8' : inactiveColor,
        background: active ? 'rgba(0,200,168,0.08)' : 'transparent',
        border: active ? '1px solid rgba(0,200,168,0.22)' : `1px solid ${inactiveBorder}`,
        transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(0,200,168,0.22)'; e.currentTarget.style.color = '#00C8A8'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = inactiveBorder; e.currentTarget.style.color = inactiveColor; } }}
    >
      {category}
      {count > 0 && (
        <span style={{
          marginLeft: '5px', fontFamily: 'Inter, sans-serif', fontSize: '10px',
          fontWeight: 500, color: active ? '#00C8A8' : (isDark ? '#64748B' : '#94A3B8'), opacity: 0.85,
        }}>
          {count}
        </span>
      )}
      {active && (
        <motion.div
          layoutId="filter-active"
          style={{ position: 'absolute', inset: 0, borderRadius: '12px', pointerEvents: 'none', border: '1px solid rgba(0,200,168,0.22)' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        />
      )}
    </button>
  );
}

// ── Client logo with monogram fallback ───────────────────────────
function ClientLogo({ logo, initials, index, isDark }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const accent = LOGO_ACCENTS[index % LOGO_ACCENTS.length];
  const gradId = `lg-${index}`;

  // Logo container: fixed height, auto width
  const containerStyle = {
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '16px',
  };

  // If image loads successfully
  if (logo && !imgFailed) {
    return (
      <div style={containerStyle}>
        <img
          src={logo}
          alt={`${initials} logo`}
          onError={() => setImgFailed(true)}
          style={{
            maxHeight: '72px',
            maxWidth: '200px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'left center',
            display: 'block',

          }}
        />
      </div>
    );
  }

  // Fallback monogram
  return (
    <div style={{ ...containerStyle, alignItems: 'center' }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <svg width="72" height="72" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent.from} />
              <stop offset="100%" stopColor={accent.to} />
            </linearGradient>
          </defs>
          <rect width="72" height="72" rx="18" fill={`url(#${gradId})`} />
        </svg>
        <span style={{
          position: 'relative', zIndex: 1,
          fontFamily: 'Sora, sans-serif', fontWeight: 800,
          fontSize: '22px', color: '#FFFFFF',
          letterSpacing: '-0.02em', userSelect: 'none',
        }}>
          {initials}
        </span>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────
function ProjectCard({ project, isDark }) {
  const primaryCat   = project.categories[0];
  const catStyle     = CAT_STYLE[primaryCat] || CAT_STYLE['Web Platforms'];
  const cardBg       = isDark ? '#141E2B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  const dividerColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.07)';
  const hoverShadow  = isDark
    ? '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,200,168,0.14)'
    : '0 16px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,200,168,0.16)';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: hoverShadow, borderColor: 'rgba(0,200,168,0.22)' }}
      style={{
        display: 'flex', flexDirection: 'column',
        borderRadius: '20px', overflow: 'hidden',
        background: cardBg, border: `1px solid ${cardBorder}`,
        boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.25)' : '0 1px 6px rgba(0,0,0,0.06)',
        transition: 'background 0.5s ease',
        cursor: 'default',
      }}
      aria-label={`${project.name} — ${project.categories.join(', ')}`}
    >
      {/* Card top */}
      <div style={{
        position: 'relative', padding: '28px 28px 20px',
        borderBottom: `1px solid ${dividerColor}`,
      }}>
        {project.featured && (
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '3px 9px', borderRadius: '9999px',
              background: 'rgba(0,200,168,0.12)', color: '#00C8A8',
              border: '1px solid rgba(0,200,168,0.28)',
            }}>
              Featured
            </span>
          </div>
        )}

        {/* Logo */}
        <ClientLogo logo={project.logo} initials={project.initials} index={project.id - 1} isDark={isDark} />

        {/* Name + primary category */}
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px',
            lineHeight: 1.25, color: headingColor, marginBottom: '6px',
            transition: 'color 0.5s ease',
          }}>
            {project.name}
          </h3>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: '9999px',
            background: catStyle.bg, color: catStyle.text, border: `1px solid ${catStyle.border}`,
          }}>
            {primaryCat}
          </span>
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: bodyColor, lineHeight: 1.7, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          transition: 'color 0.5s ease',
        }}>
          {project.description}
        </p>
      </div>

      {/* Card footer */}
      <div style={{
        padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', flex: 1 }}>
          {project.categories.slice(1).map(cat => {
            const s = CAT_STYLE[cat] || CAT_STYLE['Web Platforms'];
            return (
              <span key={cat} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: '9999px',
                background: s.bg, color: s.text, border: `1px solid ${s.border}`,
              }}>
                {cat}
              </span>
            );
          })}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600,
            color: '#00C8A8', textDecoration: 'none', flexShrink: 0,
            padding: '7px 14px', borderRadius: '9999px',
            background: 'rgba(0,200,168,0.08)', border: '1px solid rgba(0,200,168,0.20)',
            transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,200,168,0.15)';
            e.currentTarget.style.borderColor = 'rgba(0,200,168,0.40)';
            e.currentTarget.style.transform = 'translateX(2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,200,168,0.08)';
            e.currentTarget.style.borderColor = 'rgba(0,200,168,0.20)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Visit Website
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

// ── Empty state ───────────────────────────────────────────────────
function EmptyState({ category, isDark }) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center' }}
    >
      <div style={{
        width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 20px',
        background: 'rgba(0,200,168,0.08)', border: '1px solid rgba(0,200,168,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <h3 style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.2rem',
        color: isDark ? '#F8FAFC' : '#111318', marginBottom: '8px',
      }}>
        No projects in {category}
      </h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: isDark ? '#94A3B8' : '#6B7A8D' }}>
        More projects coming soon.
      </p>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const sectionBg = isDark ? '#111823' : '#F8FAFB';
  const bodyColor = isDark ? '#94A3B8' : '#6B7A8D';

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => p.categories.includes(activeCategory)),
    [activeCategory]
  );

  const getCount = (cat) =>
    cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.categories.includes(cat)).length;

  return (
    <PageLayout>
            <Helmet>
        <title>Portfolio — 120+ Projects | WebieApp Solutions LLC</title>
        <meta name="description" content="Browse WebieApp Solutions LLC's portfolio of 120+ projects across ABA/Autism clinics, SaaS platforms, healthcare, logistics, NGO, and web development. Clients across 12+ countries." />
        <meta name="keywords" content="WebieApp portfolio, ABA clinic websites, SaaS projects, web development portfolio, autism website design, healthcare digital platforms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webieapp.com/portfolio" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebieApp Solutions LLC" />
        <meta property="og:title" content="WebieApp Portfolio — 120+ Delivered Projects" />
        <meta property="og:description" content="Browse our portfolio of 120+ projects: ABA clinics, SaaS platforms, healthcare portals, logistics apps, and more across 12+ countries." />
        <meta property="og:url" content="https://webieapp.com/portfolio" />
        <meta property="og:image" content="https://webieapp.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WebieApp Portfolio — 120+ Projects" />
        <meta name="twitter:description" content="Browse our portfolio of 120+ projects: ABA clinics, SaaS platforms, healthcare portals, logistics apps, and more across 12+ countries." />
        <meta name="twitter:image" content="https://webieapp.com/og-image.png" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        aria-label="Portfolio hero"
        style={{
          position: 'relative', paddingTop: '144px', paddingBottom: '120px',
          overflow: 'hidden', background: isDark ? '#1A2535' : '#2B3D52',
        }}
      >
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/about/portpolio.jpeg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: isDark ? 0.18 : 0.22,
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: '40%', left: '35%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(0,200,168,0.12) 0%, transparent 65%)',
        }} />

        <div className="container-xl" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00C8A8' }}>
                Our Work
              </span>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
            </div>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '24px',
            }}>
              Work That Speaks{' '}
              <span style={GS}>For Itself</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '560px', margin: '0 auto 40px',
            }}>
              {PROJECTS.length} client projects across healthcare, autism care, logistics, real estate, and more — each delivered at premium quality.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Button to="/our-services" variant="primary" size="lg" iconRight={<ArrowRight />}>
                Our Services
              </Button>
              <Button to="/contact" variant="white" size="lg">
                Talk to an Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section
        aria-label="Project portfolio"
        className="section"
        style={{ background: sectionBg, transition: 'background 0.5s ease' }}
      >
        <div className="container-xl">

          {/* Scrollable filter row */}
          <div style={{
            overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px',
            msOverflowStyle: 'none', scrollbarWidth: 'none',
          }}>
            <div
              style={{ display: 'flex', gap: '8px', justifyContent: 'center', minWidth: 'max-content', padding: '0 4px' }}
              role="tablist"
              aria-label="Filter projects by category"
            >
              <LayoutGroup>
                {CATEGORIES.map(cat => (
                  <FilterTab
                    key={cat}
                    category={cat}
                    active={activeCategory === cat}
                    count={getCount(cat)}
                    onClick={() => setActiveCategory(cat)}
                    isDark={isDark}
                  />
                ))}
              </LayoutGroup>
            </div>
          </div>

          {/* Result count */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: bodyColor, marginBottom: '40px', transition: 'color 0.5s ease',
            }}
          >
            Showing{' '}
            <span style={{ color: '#00C8A8', fontWeight: 600 }}>{filtered.length}</span>
            {' '}project{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ' across all categories'}
          </motion.p>

          {/* Grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}
            role="tabpanel"
            aria-label={`${activeCategory} projects`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.length > 0
                ? filtered.map(project => (
                    <ProjectCard key={project.id} project={project} isDark={isDark} />
                  ))
                : <EmptyState key="empty" category={activeCategory} isDark={isDark} />
              }
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: '72px', textAlign: 'center' }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: bodyColor, marginBottom: '20px', transition: 'color 0.5s ease',
            }}>
              Ready to become our next success story?
            </p>
            <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight />}>
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>

     </PageLayout>
  );
}
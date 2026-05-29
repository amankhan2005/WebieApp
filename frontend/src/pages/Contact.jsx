 
import { useState }    from 'react';
import { useForm }     from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z }           from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet }      from 'react-helmet-async';
import axios           from 'axios';
import PageLayout       from '../components/layout/PageLayout.jsx';
import Button, { ArrowRight } from '../components/ui/Button.jsx';
import { COMPANY, CONTACT_SERVICES } from '../data/siteData.js';
import { useTheme }    from '../context/ThemeContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const GS = {
  background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ── Zod schema ────────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2, 'Please enter your full name'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(15, 'Please write at least 15 characters'),
});

// ── SVG Icons ─────────────────────────────────────────────────────
const Icon = {
  Mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m2 7 10 7 10-7"/>
    </svg>
  ),
  MapPin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  ChevronDown: (
    `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`
  ),
};

// ── Field component ───────────────────────────────────────────────
function Field({ label, required, error, children, hint, isDark }) {
  const labelColor = isDark ? '#A1A1AA' : '#4B5563';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 500,
        fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
        color: labelColor, transition: 'color 0.5s ease',
      }}>
        {label}
        {required && <span style={{ color: '#00C8A8', marginLeft: '2px' }} aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: isDark ? '#52525B' : '#94A3B8' }}>
          {hint}
        </span>
      )}
      <AnimatePresence>
        {error && (
          <motion.span
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#F87171' }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Success state ─────────────────────────────────────────────────
function SuccessState({ onReset, isDark }) {
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#71717A' : '#6B7A8D';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        style={{
          width: '96px', height: '96px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '32px',
          background: 'rgba(0,200,168,0.12)',
          border: '2px solid rgba(0,200,168,0.4)',
          boxShadow: '0 0 40px rgba(0,200,168,0.2)',
        }}
      >
        <motion.svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
          <motion.path
            d="M8 18l7 7 13-13"
            stroke="#00C8A8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
      </motion.div>
      <h2 style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 700,
        fontSize: '1.75rem', color: headingColor,
        marginBottom: '12px', transition: 'color 0.5s ease',
      }}>
        Message Sent!
      </h2>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '15px',
        color: bodyColor, maxWidth: '360px', marginBottom: '8px',
        lineHeight: 1.7, transition: 'color 0.5s ease',
      }}>
        Thank you for reaching out. Our team will review your message and respond within 24 business hours.
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '13px',
        color: '#00C8A8', marginBottom: '40px',
      }}>
        Check your inbox for a confirmation email.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: bodyColor, background: 'none', border: 'none',
          cursor: 'pointer', textDecoration: 'underline',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#00C8A8'}
        onMouseLeave={e => e.currentTarget.style.color = bodyColor}
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ── Contact form ──────────────────────────────────────────────────
function ContactForm({ isDark }) {
  const [submitted, setSubmitted]     = useState(false);
  const [serverError, setServerError] = useState('');
  const [focused, setFocused]         = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await axios.post(`${API_URL}/api/contact`, data);
      setSubmitted(true);
    } catch {
      setServerError('Something went wrong. Please email us directly at webieapp@gmail.com or try again later.');
    }
  };

  const inputBg        = isDark ? '#18181B' : '#F8FAFB';
  const inputBorder    = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.10)';
  const inputColor     = isDark ? '#F8FAFC' : '#111318';
  const placeholderStyle = isDark ? '#52525B' : '#94A3B8';

  const inputBase = {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    borderRadius: '12px',
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputColor,
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.5s ease',
  };

  const getInputStyle = (fieldName) => ({
    ...inputBase,
    ...(errors[fieldName] ? {
      borderColor: 'rgba(248,113,113,0.5)',
      boxShadow: '0 0 0 3px rgba(248,113,113,0.08)',
    } : {}),
    ...(focused === fieldName && !errors[fieldName] ? {
      borderColor: 'rgba(0,200,168,0.45)',
      boxShadow: '0 0 0 3px rgba(0,200,168,0.08)',
    } : {}),
  });

  const fp = (name) => ({
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(''),
  });

  if (submitted) {
    return <SuccessState isDark={isDark} onReset={() => { setSubmitted(false); reset(); }} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-row">
        <Field label="Full Name" required error={errors.name?.message} isDark={isDark}>
          <input {...register('name')} type="text" placeholder="John Smith" autoComplete="name"
            style={getInputStyle('name')} {...fp('name')} />
        </Field>
        <Field label="Email Address" required error={errors.email?.message} isDark={isDark}>
          <input {...register('email')} type="email" placeholder="john@company.com" autoComplete="email"
            style={getInputStyle('email')} {...fp('email')} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-row">
        <Field label="Phone Number" error={errors.phone?.message} hint="Optional — for faster response" isDark={isDark}>
          <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel"
            style={getInputStyle('phone')} {...fp('phone')} />
        </Field>
        <Field label="Company / Clinic" error={errors.company?.message} hint="Optional" isDark={isDark}>
          <input {...register('company')} type="text" placeholder="Acme Inc. or BrightPath Clinic" autoComplete="organization"
            style={getInputStyle('company')} {...fp('company')} />
        </Field>
      </div>

      <Field label="Service Required" required error={errors.service?.message} isDark={isDark}>
        <select
          {...register('service')}
          style={{
            ...getInputStyle('service'),
            appearance: 'none',
            backgroundImage: Icon.ChevronDown,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: '40px',
            cursor: 'pointer',
          }}
          {...fp('service')}
        >
          <option value="" style={{ background: isDark ? '#18181B' : '#FFFFFF', color: isDark ? '#F8FAFC' : '#111318' }}>
            Select a service…
          </option>
          {CONTACT_SERVICES.map(s => (
            <option key={s} value={s} style={{ background: isDark ? '#18181B' : '#FFFFFF', color: isDark ? '#F8FAFC' : '#111318' }}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Tell Us About Your Project" required error={errors.message?.message} isDark={isDark}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Describe your project, goals, timeline, and any specific requirements…"
          style={{
            ...getInputStyle('message'),
            height: 'auto',
            padding: '14px 16px',
            resize: 'vertical',
            minHeight: '120px',
          }}
          {...fp('message')}
        />
      </Field>

      <AnimatePresence>
        {serverError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '16px', borderRadius: '12px',
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
              color: '#FCA5A5',
            }}
          >
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        style={{ width: '100%', justifyContent: 'center' }}
        loading={isSubmitting}
        iconRight={!isSubmitting ? <ArrowRight /> : undefined}
      >
        {isSubmitting ? 'Sending Message…' : 'Send Message'}
      </Button>

      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '11px',
        color: isDark ? '#52525B' : '#94A3B8',
        textAlign: 'center', transition: 'color 0.5s ease',
      }}>
        We respond within 24 hours. No spam, ever. Registered in Kentucky, USA.
      </p>

      <style>{`
        @media (max-width: 560px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder, select::placeholder {
          color: ${placeholderStyle};
        }
      `}</style>
    </form>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────
function InfoSidebar({ isDark }) {
  const cardBg       = isDark ? '#18181B' : '#FFFFFF';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#71717A' : '#6B7A8D';
  const addrColor    = isDark ? '#A1A1AA' : '#6B7A8D';
  const labelColor   = isDark ? '#52525B' : '#94A3B8';

  return (
    <aside aria-label="Contact information" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div style={{
        padding: '20px', borderRadius: '16px',
        background: 'rgba(0,200,168,0.06)',
        border: '1px solid rgba(0,200,168,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
            background: 'rgba(0,200,168,0.10)', border: '1px solid rgba(0,200,168,0.20)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Icon.Heart}
          </div>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '13px', color: headingColor, transition: 'color 0.5s ease',
          }}>
            Planning to Launch an ABA Clinic?
          </p>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: bodyColor, lineHeight: 1.65, marginBottom: '14px',
          transition: 'color 0.5s ease',
        }}>
          We have a dedicated consulting program for ABA clinic entrepreneurs. Visit our specialist page.
        </p>
        <Button to="/autism-consulting" variant="primary" size="sm" style={{ width: '100%', justifyContent: 'center' }}>
          Autism Consulting →
        </Button>
      </div>

      <div style={{
        padding: '20px', borderRadius: '16px',
        background: cardBg, border: `1px solid ${cardBorder}`,
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          {Icon.Clock}
          <span style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '13px', color: headingColor, transition: 'color 0.5s ease',
          }}>
            Fast Response
          </span>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.6)',
            marginLeft: 'auto', flexShrink: 0,
            animation: 'pulse 2s ease-in-out infinite',
          }} aria-hidden />
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: bodyColor, transition: 'color 0.5s ease',
        }}>
          Typical response time: <span style={{ color: '#00C8A8', fontWeight: 500 }}>under 24 hours</span>
        </p>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>

      {Object.values(COMPANY.offices).map((office) => (
        <div key={office.label} style={{
          padding: '20px', borderRadius: '16px',
          background: cardBg, border: `1px solid ${cardBorder}`,
          transition: 'background 0.5s ease, border-color 0.5s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              background: 'rgba(0,200,168,0.08)', border: '1px solid rgba(0,200,168,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {Icon.MapPin}
            </div>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: labelColor, marginBottom: '4px', transition: 'color 0.5s ease',
              }}>
                {office.label}
              </p>
              <address style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: addrColor, fontStyle: 'normal', lineHeight: 1.65,
                transition: 'color 0.5s ease',
              }}>
                {office.line1}<br />{office.line2}
              </address>
            </div>
          </div>
        </div>
      ))}

      <div style={{
        padding: '20px', borderRadius: '16px',
        background: cardBg, border: `1px solid ${cardBorder}`,
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: labelColor, marginBottom: '8px', transition: 'color 0.5s ease',
        }}>
          Email
        </p>
        
        <a
          href={`mailto:${COMPANY.email}`}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: '#00C8A8', display: 'inline-flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none', transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {Icon.Mail}
          {COMPANY.email}
        </a>
      </div>
    </aside>
  );
}

// ── Page export ───────────────────────────────────────────────────
export default function Contact() {
  const { isDark } = useTheme();

  const sectionBg      = isDark ? '#09090B' : '#F8FAFB';
  const headingColor   = isDark ? '#F8FAFC' : '#111318';
  const bodyColor      = isDark ? '#71717A' : '#6B7A8D';
  const formCardBg     = isDark ? '#111113' : '#FFFFFF';
  const formCardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';

  return (
    <PageLayout>
      <Helmet>
        <title>Contact WebieApp Solutions LLC — Book a Free Consultation</title>
        <meta name="description" content="Get in touch with WebieApp Solutions LLC. Book a free consultation for web development, SaaS, digital marketing, or Autism & ABA clinic business consulting. Respond within 24 hours." />
        <link rel="canonical" href="https://webieapp.com/contact" />
        <meta property="og:title" content="Contact WebieApp Solutions LLC" />
        <meta property="og:description" content="Book a free consultation. We respond within 24 hours. US-registered agency." />
        <meta property="og:url" content="https://webieapp.com/contact" />
      </Helmet>

      <section
        aria-label="Contact hero"
        style={{
          position: 'relative',
          paddingTop: '144px', paddingBottom: '120px',
          overflow: 'hidden',
          background: '#666666',
        }}
      >
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/about/about.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? 0.18 : 0.22,
        }} />
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
            style={{ maxWidth: '640px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '24px', height: '1px', background: '#00C8A8' }} aria-hidden />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#00C8A8',
              }}>
                Get in Touch
              </span>
            </div>
            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              letterSpacing: '-0.035em', lineHeight: 1.04,
              color: '#F8FAFC', marginBottom: '24px',
            }}>
              Have an Idea?
              <br />
              <span style={GS}>Let's Build It.</span>
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.75,
              maxWidth: '520px',
            }}>
              Tell us about your project and we'll connect you with the right people. No hard sells — just an honest conversation about what's possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="Contact form"
        className="section"
        style={{ background: sectionBg, transition: 'background 0.5s ease' }}
      >
        <div className="container-xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '48px', alignItems: 'start',
          }} className="contact-layout">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div style={{
                borderRadius: '20px', padding: '40px',
                background: formCardBg, border: `1px solid ${formCardBorder}`,
                boxShadow: isDark ? 'none' : '0 1px 8px rgba(0,0,0,0.06)',
                transition: 'background 0.5s ease, border-color 0.5s ease',
              }}>
                <h2 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '1.5rem', color: headingColor,
                  marginBottom: '8px', transition: 'color 0.5s ease',
                }}>
                  Send Us a Message
                </h2>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13px',
                  color: bodyColor, marginBottom: '32px', transition: 'color 0.5s ease',
                }}>
                  Fill in the details below and we'll get back to you within 24 hours.
                </p>
                <ContactForm isDark={isDark} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <InfoSidebar isDark={isDark} />
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
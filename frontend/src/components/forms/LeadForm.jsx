import { useState }    from 'react';
import { useForm }     from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z }           from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import axios           from 'axios';
import Button, { ArrowRight } from '../ui/Button.jsx';
import { US_STATES }   from '../../data/siteData.js';

const API_URL = import.meta.env.VITE_API_URL;

// ── Validation ────────────────────────────────────────────────────
const schema = z.object({
  name:  z.string().min(2, 'Please enter your full name'),
  phone: z.string()
           .min(7, 'Please enter a valid phone number')
           .regex(/^[+()\-.\s\d]{7,30}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  state:   z.string().optional(),
  website: z.string().optional(), // honeypot
});

const ChevronDown = `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`;

// ── Field wrapper ─────────────────────────────────────────────────
function Field({ label, required, error, children, isDark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 500,
        fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase',
        color: isDark ? '#A1A1AA' : '#4B5563',
      }}>
        {label}
        {required && <span style={{ color: '#00C8A8', marginLeft: '2px' }} aria-hidden>*</span>}
      </label>
      {children}
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
function LeadSuccess({ isDark, onReset }) {
  const headingColor = isDark ? '#F8FAFC' : '#111318';
  const bodyColor    = isDark ? '#94A3B8' : '#6B7A8D';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      style={{ textAlign: 'center', padding: '20px 8px' }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        style={{
          width: '72px', height: '72px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          background: 'rgba(0,200,168,0.12)',
          border: '2px solid rgba(0,200,168,0.4)',
          boxShadow: '0 0 32px rgba(0,200,168,0.2)',
        }}
      >
        <motion.svg width="30" height="30" viewBox="0 0 36 36" fill="none" aria-hidden>
          <motion.path d="M8 18l7 7 13-13" stroke="#00C8A8" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }} />
        </motion.svg>
      </motion.div>
      <h3 style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 700,
        fontSize: '1.4rem', color: headingColor, marginBottom: '10px',
      }}>
        You're all set!
      </h3>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '14px',
        color: bodyColor, lineHeight: 1.65, marginBottom: '6px', maxWidth: '320px', margin: '0 auto',
      }}>
        Thanks for reaching out. Our team will call you within one business day to schedule your free discovery call.
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#00C8A8', margin: '10px 0 18px' }}>
        Check your inbox for a confirmation email.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px', color: bodyColor,
          background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline',
        }}
      >
        Submit another request
      </button>
    </motion.div>
  );
}

// ── Lead form ─────────────────────────────────────────────────────
export default function LeadForm({
  isDark = true,
  compact = false,
  sourcePage = '/autism-consulting',
  ctaLabel = 'Book My Free Consultation',
}) {
  const [submitted, setSubmitted]     = useState(false);
  const [serverError, setServerError] = useState('');
  const [focused, setFocused]         = useState('');

  // Capture UTM params once at mount (for ad attribution) — computed
  // lazily so it reads the URL a single time without an effect.
  const [utm] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      return {
        utmSource:   p.get('utm_source')   || '',
        utmMedium:   p.get('utm_medium')   || '',
        utmCampaign: p.get('utm_campaign') || '',
      };
    } catch {
      return {};
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await axios.post(`${API_URL}/api/lead`, {
        name:    data.name,
        phone:   data.phone,
        email:   data.email,
        company: data.company || '',
        state:   data.state   || '',
        website: data.website || '',
        sourcePage,
        ...utm,
      });
      setSubmitted(true);
    } catch (err) {
      const msg = err?.response?.data?.message;
      setServerError(
        msg && err?.response?.status !== 500
          ? msg
          : 'Something went wrong. Please email us at info@webieapp.com or try again shortly.'
      );
    }
  };

  const inputBg     = isDark ? '#111A27' : '#F8FAFB';
  const inputBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)';
  const inputColor  = isDark ? '#F8FAFC' : '#111318';
  const placeholder = isDark ? '#64748B' : '#94A3B8';

  const base = {
    width: '100%', height: '46px', padding: '0 14px', borderRadius: '11px',
    background: inputBg, border: `1px solid ${inputBorder}`, color: inputColor,
    fontFamily: 'Inter, sans-serif', fontSize: '14px', outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };
  const style = (name) => ({
    ...base,
    ...(errors[name] ? { borderColor: 'rgba(248,113,113,0.5)', boxShadow: '0 0 0 3px rgba(248,113,113,0.08)' } : {}),
    ...(focused === name && !errors[name] ? { borderColor: 'rgba(0,200,168,0.45)', boxShadow: '0 0 0 3px rgba(0,200,168,0.08)' } : {}),
  });
  const fp = (name) => ({ onFocus: () => setFocused(name), onBlur: () => setFocused('') });

  if (submitted) {
    return <LeadSuccess isDark={isDark} onReset={() => { setSubmitted(false); reset(); }} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Free consultation request"
      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Honeypot — visually hidden, off-screen, not tabbable */}
      <input
        {...register('website')}
        type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <Field label="Full Name" required error={errors.name?.message} isDark={isDark}>
        <input {...register('name')} type="text" placeholder="Jane Smith" autoComplete="name"
          style={style('name')} {...fp('name')} />
      </Field>

      <Field label="Phone Number" required error={errors.phone?.message} isDark={isDark}>
        <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel"
          style={style('phone')} {...fp('phone')} />
      </Field>

      <Field label="Email Address" required error={errors.email?.message} isDark={isDark}>
        <input {...register('email')} type="email" placeholder="jane@clinic.com" autoComplete="email"
          style={style('email')} {...fp('email')} />
      </Field>

      {!compact && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <Field label="Company / Clinic" error={errors.company?.message} isDark={isDark}>
            <input {...register('company')} type="text" placeholder="Optional" autoComplete="organization"
              style={style('company')} {...fp('company')} />
          </Field>
          <Field label="State" error={errors.state?.message} isDark={isDark}>
            <select
              {...register('state')}
              defaultValue=""
              style={{
                ...style('state'), appearance: 'none',
                backgroundImage: ChevronDown, backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center', paddingRight: '34px', cursor: 'pointer',
              }}
              {...fp('state')}
            >
              <option value="" style={{ background: isDark ? '#1E2A3A' : '#FFF', color: inputColor }}>
                Optional
              </option>
              {US_STATES.map((s) => (
                <option key={s} value={s} style={{ background: isDark ? '#1E2A3A' : '#FFF', color: inputColor }}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      <AnimatePresence>
        {serverError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              padding: '12px 14px', borderRadius: '11px',
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
              color: '#FCA5A5',
            }}
          >
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit" variant="primary" size="lg"
        style={{ width: '100%', justifyContent: 'center', marginTop: '2px' }}
        disabled={isSubmitting} loading={isSubmitting}
        iconRight={!isSubmitting ? <ArrowRight /> : undefined}
      >
        {isSubmitting ? 'Sending…' : ctaLabel}
      </Button>

      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '11px',
        color: isDark ? '#64748B' : '#94A3B8', textAlign: 'center', lineHeight: 1.5,
      }}>
        🔒 We respect your privacy. No spam — we'll only use your details to contact you about your ABA practice.
      </p>

      <style>{`
        input::placeholder { color: ${placeholder}; }
      `}</style>
    </form>
  );
}

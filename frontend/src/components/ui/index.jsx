import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ── SectionLabel ──────────────────────────────────────────
export function SectionLabel({ children, className = '' }) {
  return (
    <div className={`accent-line mb-5 ${className}`}>
      {children}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────
export function SectionHeader({ label, title, subtitle, centered=true, light=false, className='' }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <div className={centered ? 'flex justify-center' : ''}>
          <SectionLabel>{label}</SectionLabel>
        </div>
      )}
      <h2 className={`font-sora font-bold leading-tight ${light ? 'text-white' : 'text-ink-900'}`}
        style={{ fontSize:'clamp(1.75rem,4vw,2.625rem)', letterSpacing:'-0.02em' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-inter text-md leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'} ${light ? 'text-white/70' : 'text-ink-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ── Badge ─────────────────────────────────────────────────
export function Badge({ children, variant='brand', className='' }) {
  const V = {
    brand:   'tag-brand',
    neutral: 'tag-neutral',
    dark:    'inline-flex items-center px-3 py-1 rounded-full text-cap font-semibold uppercase tracking-wider bg-ink-900 text-white',
    white:   'inline-flex items-center px-3 py-1 rounded-full text-cap font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/20',
  };
  return <span className={`${V[variant] || V.brand} ${className}`}>{children}</span>;
}

// ── Divider ───────────────────────────────────────────────
export function Divider({ className='' }) {
  return <div className={`section-divider ${className}`} />;
}

// ── AnimatedCounter ───────────────────────────────────────
export function AnimatedCounter({ value, suffix='', duration=2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setStarted(true); }, { threshold:0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1-p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── StarRating ────────────────────────────────────────────
export function StarRating({ rating=5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stars`}>
      {Array.from({ length:5 }, (_,i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.895l-3.09 1.605.59-3.43L2 4.635l3.455-.505z"
            fill={i < rating ? '#00C8A8' : '#CBD5E0'} />
        </svg>
      ))}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────
export function Card({ children, className='', hover=true, ...rest }) {
  return (
    <motion.div
      whileHover={hover ? { y:-3, boxShadow:'0 12px 40px rgba(15,23,42,0.11), 0 4px 12px rgba(15,23,42,0.07)', borderColor:'rgba(0,200,168,0.15)' } : {}}
      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
      className={`card-premium ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export function ArrowRight({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const V = {
  primary: `
    bg-brand text-white font-semibold
    hover:bg-brand-600 hover:shadow-brand
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-sm
  `,
  secondary: `
    bg-ink-900 text-white font-semibold
    hover:bg-ink-800 hover:shadow-lg
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-sm
  `,
  ghost: `
    bg-transparent border border-ink-200 text-ink-700 font-semibold
    hover:border-brand hover:text-brand hover:bg-teal-tint
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  outline: `
    bg-transparent border-2 border-brand text-brand font-semibold
    hover:bg-brand hover:text-white
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  white: `
    bg-white text-ink-900 font-semibold border border-ink-100
    hover:shadow-lg hover:border-brand/20
    active:scale-[0.98]
    shadow-sm
  `,
  link: `
    text-brand font-semibold underline-offset-4
    hover:underline
    p-0 h-auto
  `,
};

// ── SIZE MAP — updated for bigger, premium feel ───────────
const S = {
  sm:  'h-9  px-5   text-xs  gap-1.5 rounded-lg',
  md:  'h-11 px-6   text-sm  gap-2   rounded-xl',
  lg:  'h-14 px-8   text-sm  gap-2   rounded-xl',
  xl:  'h-16 px-10  text-base gap-2.5 rounded-xl',
  '2xl':'h-[72px] px-12 text-base gap-3 rounded-2xl',
};

const BASE = `
  inline-flex items-center justify-center
  font-inter font-semibold tracking-tight
  transition-all duration-200
  select-none focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
`;

const Button = forwardRef(function Button({
  children, variant = 'primary', size = 'md', to, href, type = 'button',
  disabled = false, loading = false, icon, iconRight, className = '', onClick, ...rest
}, ref) {
  const cls = [BASE, V[variant] || V.primary, variant !== 'link' ? (S[size] || S.md) : '', className]
    .join(' ').replace(/\s+/g, ' ').trim();

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-0.5 mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
        </svg>
      )}
      {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );

  if (to)   return <Link ref={ref} to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{content}</a>;
  return <button ref={ref} type={type} disabled={disabled || loading} onClick={onClick} className={cls} {...rest}>{content}</button>;
});

Button.displayName = 'Button';
export default Button;
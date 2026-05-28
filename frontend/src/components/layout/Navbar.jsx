import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../data/siteData.js';
import { ArrowRight } from '../ui/Button.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="WebieApp Solutions — Home">
      <img
        src="/logo/logo.png"
        alt="WebieApp Solutions"
        className="h-9 w-auto object-contain"
        style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08) rotate(-4deg)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
      />
    </Link>
  );
}

/* ── Big animated CTA button ─────────────────────────────────── */
function BookBtn({ to, className = '' }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
  };

  return (
    <Link
      to={to}
      onMouseDown={addRipple}
      className={`relative overflow-hidden inline-flex items-center gap-2.5 font-bold text-white select-none ${className}`}
      style={{
        padding: '11px 26px',
        borderRadius: '12px',
        fontSize: '15px',
        letterSpacing: '-0.01em',
        background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
        boxShadow: '0 5px 20px rgba(0,200,168,0.32), 0 1px 0 rgba(255,255,255,0.15) inset',
        transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,200,168,0.45), 0 1px 0 rgba(255,255,255,0.2) inset';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,200,168,0.32), 0 1px 0 rgba(255,255,255,0.15) inset';
      }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; }}
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.2) 50%,transparent 70%)', animation: 'navShimmer 3s infinite 1.5s' }}
      />
      {/* Click ripples */}
      {ripples.map(rp => (
        <span key={rp.id} className="absolute rounded-full pointer-events-none" aria-hidden="true"
          style={{ width: rp.size, height: rp.size, left: rp.x, top: rp.y, background: 'rgba(255,255,255,0.22)', animation: 'navRipple 0.55s linear forwards' }}
        />
      ))}
      Book Consultation
      {/* Arrow in a circle */}
      <motion.span
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full"
        style={{ background: 'rgba(255,255,255,0.18)', flexShrink: 0 }}
        aria-hidden="true"
      >
        <ArrowRight size={10} />
      </motion.span>
      <style>{`
        @keyframes navShimmer { 0%{transform:translateX(-150%)} 100%{transform:translateX(250%)} }
        @keyframes navRipple  { to{transform:scale(3.5);opacity:0} }
      `}</style>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  const onScroll = useCallback(() => setScrolled(window.scrollY > 16), []);
  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (p) => p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);

  const navBg = scrolled
    ? isDark ? 'rgba(11,15,20,0.95)' : 'rgba(255,255,255,0.96)'
    : isDark ? 'rgba(11,15,20,0.72)' : 'rgba(255,255,255,0.80)';

  const navBorder = scrolled
    ? isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)'
    : 'transparent';

  const navShadow = scrolled
    ? isDark
      ? '0 1px 0 rgba(255,255,255,0.04), 0 6px 32px rgba(0,0,0,0.45)'
      : '0 1px 0 rgba(15,23,42,0.06), 0 4px 24px rgba(15,23,42,0.07)'
    : 'none';

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        role="banner"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
          background: navBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${navBorder}`,
          boxShadow: navShadow,
          transition: 'background 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Top brand accent line */}
        <span className="absolute top-0 left-[5%] right-[5%] h-px pointer-events-none" aria-hidden="true"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(0,200,168,0.55),transparent)',
            opacity: scrolled ? 0.7 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        <div className="container-xl">
          <div className="flex items-center justify-between h-[72px]">
            <Logo />

            {/* Desktop nav — underline style, no dot, no bg box */}
            <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
              <ul className="flex items-center" role="list">
                {NAV_LINKS.map(link => {
                  const active = isActive(link.path);
                  return (
                    <li key={link.path} className="relative">
                      <Link
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        className="relative flex flex-col items-center px-4 py-2 font-inter text-sm font-medium"
                        style={{
                          color: active ? '#00C8A8' : isDark ? '#64748B' : '#6B7A8D',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.color = isDark ? '#CBD5E1' : '#111318'; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.color = isDark ? '#64748B' : '#6B7A8D'; }}
                      >
                        {link.label}
                        {/* Underline indicator — slides in from center */}
                        <motion.span
                          initial={false}
                          animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-sm origin-center"
                          style={{
                            background: '#00C8A8',
                            boxShadow: '0 0 8px rgba(0,200,168,0.7)',
                          }}
                          aria-hidden="true"
                        />
                        {/* Hover ghost underline */}
                        {!active && (
                          <span
                            className="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-sm nav-hover-line"
                            style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', transform: 'scaleX(0)', transformOrigin: 'center', transition: 'transform 0.2s ease' }}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <style>{`
                .nav-hover-line { }
                li:hover .nav-hover-line { transform: scaleX(1) !important; }
              `}</style>
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <BookBtn to="/contact" />
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl"
                style={{ background: mobileOpen ? (isDark ? 'rgba(255,255,255,0.06)' : '#F0F2F5') : 'transparent' }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {[
                  { t: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' },
                  { o: mobileOpen ? 0 : 1, t: mobileOpen ? 'scaleX(0)' : 'none' },
                  { t: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' },
                ].map((s, i) => (
                  <span key={i} className="w-5 h-[1.5px] rounded"
                    style={{
                      background: isDark ? '#F1F5F9' : '#111318',
                      transform: s.t,
                      opacity: s.o ?? 1,
                      transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s',
                    }}
                  />
                ))}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
              style={{ background: isDark ? 'rgba(0,0,0,0.65)' : 'rgba(15,23,42,0.32)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside key="drawer"
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,100vw)] z-50 flex flex-col"
              style={{
                background: isDark ? '#0B0F14' : '#FFFFFF',
                borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}`,
                boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
              }}
              role="dialog" aria-label="Navigation" aria-modal="true"
            >
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
                <Logo />
                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#F4F5F7', color: isDark ? '#94A3B8' : '#6B7A8D' }}
                  aria-label="Close"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map((link, i) => {
                    const active = isActive(link.path);
                    return (
                      <motion.li key={link.path}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link to={link.path}
                          className="flex items-center justify-between px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all"
                          style={{
                            background: active ? (isDark ? 'rgba(0,200,168,0.10)' : 'rgba(0,200,168,0.07)') : 'transparent',
                            color: active ? '#00C8A8' : isDark ? '#94A3B8' : '#4A5568',
                            borderLeft: active ? '2px solid #00C8A8' : '2px solid transparent',
                          }}
                        >
                          {link.label}
                          {active && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full"
                              style={{ background: '#00C8A8', boxShadow: '0 0 6px rgba(0,200,168,0.7)' }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-5" style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
                <BookBtn to="/contact" className="w-full justify-center" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
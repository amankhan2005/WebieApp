import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext.jsx';

// Sun SVG paths
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

// Moon SVG
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`theme-toggle-btn relative ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.93 }}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        /* Glassmorphism capsule */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '68px',
        height: '34px',
        borderRadius: '999px',
        padding: '3px',
        position: 'relative',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        background: isDark
          ? 'linear-gradient(135deg, rgba(0,200,168,0.15) 0%, rgba(22,31,46,0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,251,0.95) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 0 0 1px rgba(0,200,168,0.2), 0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 0 0 1px rgba(15,23,42,0.1), 0 4px 16px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        transition: 'background 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Track icons (sun & moon, both always visible behind the pill) */}
      <span style={{
        position: 'absolute',
        left: '9px',
        color: isDark ? 'rgba(0,200,168,0.4)' : 'rgba(251,191,36,0.8)',
        transition: 'color 0.4s ease, opacity 0.4s ease',
        opacity: isDark ? 0.5 : 1,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <SunIcon />
      </span>

      <span style={{
        position: 'absolute',
        right: '8px',
        color: isDark ? '#F1F5F9' : 'rgba(148,163,184,0.5)',
        transition: 'color 0.4s ease, opacity 0.4s ease',
        opacity: isDark ? 1 : 0.4,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <MoonIcon />
      </span>

      {/* Sliding pill */}
      <motion.span
        layout
        animate={{
          x: isDark ? 34 : 0,
          backgroundColor: isDark ? '#0B0F14' : '#FFFFFF',
          boxShadow: isDark
            ? '0 0 0 1px rgba(0,200,168,0.3), 0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(0,200,168,0.15)'
            : '0 0 0 1px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.12)',
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
          mass: 0.8,
        }}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Icon inside pill morphs */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: isDark ? '#00C8A8' : '#F59E0B',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}

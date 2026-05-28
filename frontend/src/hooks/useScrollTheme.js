import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * useScrollTheme — cinematic, Apple-level scroll-based dark mode.
 * Uses requestAnimationFrame + IntersectionObserver for smooth 60fps.
 * Each [data-scroll-section] element gets --scroll-progress (0→1).
 */
export function useScrollTheme() {
  const { isDark } = useTheme();
  const rafRef = useRef(null);
  const observerRef = useRef(null);
  const activeSections = useRef(new Set());

  const updateProgress = useCallback(() => {
    const vh = window.innerHeight;
    activeSections.current.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Progress: 0 when section's top is at viewport bottom, 1 when it's scrolled past
      const enterProgress = (vh - rect.top) / vh;
      // Smooth S-curve for natural feel
      const clamped = Math.min(1, Math.max(0, enterProgress));
      // Ease-in-out for cinematic smoothness
      const eased = clamped < 0.5
        ? 2 * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
      section.style.setProperty('--scroll-progress', eased.toFixed(4));
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateProgress();
    });
  }, [updateProgress]);

  useEffect(() => {
    if (!isDark) {
      // Instantly clear all progress when switching to light
      document.querySelectorAll('[data-scroll-section]').forEach(s => {
        s.style.setProperty('--scroll-progress', '0');
        s.style.willChange = '';
      });
      return;
    }

    const sections = document.querySelectorAll('[data-scroll-section]');

    // Enable GPU compositing hint on visible sections
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.willChange = 'background-color';
          activeSections.current.add(entry.target);
        } else {
          entry.target.style.willChange = '';
          activeSections.current.delete(entry.target);
        }
      });
      scheduleUpdate();
    }, {
      rootMargin: '100px 0px 100px 0px',
      threshold: Array.from({ length: 21 }, (_, i) => i / 20),
    });

    sections.forEach(s => observerRef.current.observe(s));

    // Initial compute
    sections.forEach(s => activeSections.current.add(s));
    updateProgress();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      activeSections.current.clear();
    };
  }, [isDark, updateProgress, scheduleUpdate]);
}

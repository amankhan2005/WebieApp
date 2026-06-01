// src/hooks/useGAPageTracking.js
//
// Drop this hook into your App.jsx (or root Router component) once.
// It fires a GA4 page_view event on every React Router navigation,
// ensuring all client-side route changes are tracked — not just the
// initial page load.
//
// USAGE in App.jsx:
//
//   import { useGAPageTracking } from './hooks/useGAPageTracking';
//
//   function App() {
//     useGAPageTracking();   // ← add this one line inside your App
//     return ( ... your routes ... );
//   }
//
// REQUIREMENTS:
//   - GA4 script must be loaded in index.html (with send_page_view: false)
//   - React Router v6 (uses useLocation)

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGAPageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Only fire if gtag is available (GA script loaded in index.html)
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_path:     location.pathname + location.search,
      page_location: window.location.href,
      page_title:    document.title,
    });
  }, [location.pathname, location.search]);
}
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGAPageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    const pagePath =
      location.pathname + location.search;

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });

    // Uncomment for debugging
    // console.log('GA pageview:', pagePath);
  }, [location]);
}
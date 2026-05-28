import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider }   from 'react-helmet-async';
import { AnimatePresence }  from 'framer-motion';
import { useEffect }        from 'react';
import { ThemeProvider }    from './context/ThemeContext.jsx';
import { useScrollTheme }   from './hooks/useScrollTheme.js';

// Pages
import Home              from './pages/Home';
import About             from './pages/About';
import Services          from './pages/Services';
import Portfolio         from './pages/Portfolio';
import AutismConsulting  from './pages/AutismConsulting';
import Liberia           from './pages/Liberia';
import Contact           from './pages/Contact';
import PrivacyPolicy      from './pages/PrivacyPolicy';
import TermsOfService     from './pages/TermsOfService';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Activates scroll-based progressive theme transitions
function ScrollThemeActivator() {
  useScrollTheme();
  return null;
}

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: '#0B0F14' }}
    >
      <div
        className="font-sora font-bold text-brand mb-4"
        style={{ fontSize: '6rem', lineHeight: 1, textShadow: '0 0 40px rgba(0,200,168,0.3)' }}
      >
        404
      </div>
      <h1 className="font-sora font-bold text-heading-xl mb-3" style={{ color: '#F1F5F9' }}>
        Page Not Found
      </h1>
      <p className="font-inter mb-8 max-w-sm" style={{ color: '#64748B' }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <a href="/" className="font-inter font-semibold text-brand hover:text-brand-light transition-colors duration-200 flex items-center gap-1.5">
        ← Return to Home
      </a>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <ScrollThemeActivator />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<Home />}             />
          <Route path="/about"              element={<About />}            />
          <Route path="/services"           element={<Services />}         />
          <Route path="/portfolio"          element={<Portfolio />}        />
          <Route path="/autism-consulting"  element={<AutismConsulting />} />
          <Route path="/liberia"            element={<Liberia />}          />
          <Route path="/contact"            element={<Contact />}          />
          <Route path="*"                   element={<NotFound />}         />
          <Route path="/privacy-policy"     element={<PrivacyPolicy />}    />
          <Route path="/terms"   element={<TermsOfService />}   />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

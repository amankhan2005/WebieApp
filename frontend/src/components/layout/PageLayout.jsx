import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AIAssistant from '../chat/AIAssistant.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const pageV = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

export default function PageLayout({ children, noFooter = false }) {
  const { isDark } = useTheme();

  return (
    <>
      <Navbar />
      <motion.main
        id="main-content"
        tabIndex="-1"
        variants={pageV}
        initial="initial"
        animate="enter"
        exit="exit"
        className="min-h-screen outline-none"
        style={{
          background: isDark ? '#0B0F14' : '#FFFFFF',
          transition: 'background-color 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {children}
      </motion.main>
      {!noFooter && <Footer />}
      {/* <AIAssistant /> */}
    </>
  );
}

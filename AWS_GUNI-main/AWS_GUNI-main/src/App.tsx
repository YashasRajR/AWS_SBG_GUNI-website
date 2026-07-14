import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layout and Common UI Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PixelLoader } from './components/ui/PixelLoader';
import { SonarClickEffect } from './components/ui/SonarClickEffect';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Scroll Restoration helper
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

// Page Transition Wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative text-slate-100 selection:bg-[#ff9900]/30 selection:text-[#ff9900] w-full max-w-[100vw]">
      {/* Interactive global click sonar sweeping waves */}
      <SonarClickEffect />

      {/* Sticky navigation header */}
      <Navbar />

      {/* Main viewport routes with fade animation container */}
      <main className="flex-1 flex flex-col relative z-10 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* Scroll restoration on path updates */}
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <PixelLoader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
            className="min-h-screen"
          >
            <AppContent />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;

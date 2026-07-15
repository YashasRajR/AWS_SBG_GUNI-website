/*
This page has sections in this order: Home, About Us, Our Team, Events, Gallery, Contact.
To edit text or images, find the matching SECTION comment below.
*/

import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout and Common UI Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative text-slate-100 selection:bg-[#ff9900]/30 selection:text-[#ff9900] w-full max-w-[100vw] overflow-x-hidden">
      {/* Interactive global click sonar sweeping waves */}
      <SonarClickEffect />

      {/* Sticky navigation header */}
      <Navbar />

      {/* Main viewport sections stacked in order */}
      <main className="flex-1 flex flex-col relative z-10 w-full">
        {/* ============================== */}
        {/* SECTION: Home                  */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="home">
          <Home />
        </section>

        {/* ============================== */}
        {/* SECTION: About Us              */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="about">
          <About />
        </section>

        {/* ============================== */}
        {/* SECTION: Team                  */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="team">
          <Team />
        </section>

        {/* ============================== */}
        {/* SECTION: Events                */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="events">
          <Events />
        </section>

        {/* ============================== */}
        {/* SECTION: Gallery               */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* ============================== */}
        {/* SECTION: Contact               */}
        {/* Edit the text/images below.    */}
        {/* Do not change the tags/classes.*/}
        {/* ============================== */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Scroll restoration on path updates */}
      <ScrollToTop />
      
      <motion.div
        key="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
        className="min-h-screen"
      >
        <AppContent />
      </motion.div>
    </BrowserRouter>
  );
};

export default App;

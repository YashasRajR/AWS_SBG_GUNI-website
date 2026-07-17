import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver Scroll Spy to auto-highlight navbar links
  useEffect(() => {
    const sections = ['home', 'about', 'events', 'gallery', 'team', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Highlights section currently in primary view
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Scroll lock for mobile drawer
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '#home', id: 'home' },
    { name: 'About Us', path: '#about', id: 'about' },
    { name: 'Events', path: '#events', id: 'events' },
    { name: 'Gallery', path: '#gallery', id: 'gallery' },
    { name: 'Team', path: '#team', id: 'team' },
    { name: 'Contact', path: '#contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'glass-nav py-4 shadow-lg shadow-black/10 backdrop-blur-xl bg-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Brand (Always visible) */}
            <a 
              href="#home" 
              className="flex items-center gap-3 group transition-all duration-500 transform opacity-100 translate-x-0 pointer-events-auto"
            >
              <Logo size={32} className="group-hover:scale-110 transition-transform duration-300 shrink-0" />

              <div className="flex flex-col border-r border-white/20 pr-3 sm:pr-4 shrink-0">
                <span className="text-white font-bold text-sm md:text-base font-heading tracking-wide group-hover:text-[#a855f7] transition-colors duration-300">
                  <span className="hidden sm:inline">AWS Student Builder Group</span>
                  <span className="sm:hidden text-lg">AWS SBG</span>
                </span>
                <span className="hidden sm:block text-[10px] text-purple-400 font-mono tracking-widest uppercase">
                  Ganpat University
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center transition-all duration-500 gap-10`}>
              <div className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      className={`relative text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#a855f7] rounded-full"
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Action Button */}
              <a
                href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
                
                
                className="inline-flex items-center px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#a855f7] hover:bg-purple-600 rounded-full shadow-lg shadow-[#a855f7]/25 hover:shadow-[#a855f7]/45 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Join Hub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer z-50"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            />
            
            {/* Sliding Drawer */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[400px] bg-[#02040a]/95 border-l border-white/5 shadow-2xl backdrop-blur-3xl lg:hidden flex flex-col px-8 py-10 overflow-y-auto"
            >
              {/* Close Button Header */}
              <div className="flex justify-between items-center mb-12">
                <span className="text-white font-heading font-bold text-lg tracking-wider">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 -mr-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <a
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center min-h-[48px] text-2xl font-bold tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 hover:text-[#a855f7] hover:translate-x-2'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="ml-4 block h-1.5 w-1.5 bg-[#a855f7] rounded-full" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-10"
              >
                <a
                  href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
                  
                  
                  className="flex items-center justify-center w-full min-h-[48px] px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#a855f7] hover:bg-purple-600 rounded-full shadow-lg shadow-[#a855f7]/25 transition-colors"
                >
                  Join Community Hub
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

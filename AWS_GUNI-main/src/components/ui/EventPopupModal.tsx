import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ExternalLink, Sparkles } from 'lucide-react';

export const EventPopupModal: React.FC = () => {
  // Always true initially on fresh entry or page refresh
  const [isOpen, setIsOpen] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-event-title"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-[450px] bg-[#090b16]/95 border border-[#a855f7]/40 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden z-10 my-auto text-left"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#a855f7]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#d946ef]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/60 hover:bg-[#a855f7]/25 border border-white/15 hover:border-[#a855f7]/50 text-white/80 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Poster Image Banner (Exact 2:1 aspect ratio of poster) */}
            <div className="relative w-full aspect-[2/1] overflow-hidden bg-[#0d0f22]">
              <img
                src="/gallery/scd_poster.png"
                alt="AWS Students Community Day 2026 Poster"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b16] via-transparent to-black/30 pointer-events-none" />

              {/* Pulsing Alert Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-[#1b0a2e]/90 border border-[#a855f7]/50 text-[#e9d5ff] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md shadow-purple-950/80 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d946ef] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a855f7]"></span>
                </span>
                <span>Seats Strictly Limited!</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-[#c084fc] text-[10px] font-mono uppercase tracking-wider mb-0.5">
                  <Sparkles className="w-3 h-3 text-[#a855f7]" />
                  <span>Flagship Event • AWS SBG GUNI</span>
                </div>
                <h2 id="modal-event-title" className="text-lg sm:text-xl font-bold text-white font-heading tracking-tight leading-snug">
                  AWS SBG Student Community Day 2026
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Join hundreds of cloud builders and AWS Community Heroes at Ganpat University. Register now to reserve your seat!
                </p>
              </div>

              {/* Event Quick Details Badges (Clean 3-column strip) */}
              <div className="grid grid-cols-3 divide-x divide-white/10 px-2 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] sm:text-[11px] text-slate-300 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1">
                  <Calendar className="w-3.5 h-3.5 text-[#a855f7] shrink-0" />
                  <span className="font-semibold text-white whitespace-nowrap">Oct 6, 2026</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1">
                  <Clock className="w-3.5 h-3.5 text-[#c084fc] shrink-0" />
                  <span className="text-slate-300 whitespace-nowrap">8:30 AM – 5 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1">
                  <MapPin className="w-3.5 h-3.5 text-[#a855f7] shrink-0" />
                  <span className="text-slate-300 truncate max-w-full">Ganpat Univ.</span>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-medium text-slate-300">
                <span className="px-2.5 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#d8b4fe]">Hero Keynotes</span>
                <span className="px-2.5 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#d8b4fe]">Exciting Swags</span>
                <span className="px-2.5 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#d8b4fe]">Cloud Learning</span>
                <span className="px-2.5 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#d8b4fe]">E-Certificates</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://scd-web-shmm.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#a855f7] hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#a855f7]/30 hover:shadow-[#a855f7]/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a855f7]/40 text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-all cursor-pointer"
                >
                  Explore Site
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

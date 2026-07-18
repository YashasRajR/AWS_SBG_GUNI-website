/*
=========================================================================
SECTION: Events (Timeline, Registration, Meetup RSVPs)
Edit the text/images below. Do not change the tags/classes.
=========================================================================
*/

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Tag, ChevronRight, Hourglass, PlayCircle
} from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { EventDetail } from './EventDetail';


export const Events: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedEventId = queryParams.get('id');

  const [activeStatus, setActiveStatus] = useState<'all' | 'ongoing' | 'upcoming' | 'past'>('all');

  // If a specific event is selected, render the EventDetail page instead
  if (selectedEventId) {
    const selectedEvent = EVENTS.find(e => e.id === selectedEventId);
    return <EventDetail event={selectedEvent} />;
  }

  const filteredEvents = EVENTS.filter((e) => {
    return activeStatus === 'all' || e.status === activeStatus;
  });

  return (
    <div className="relative pt-24 pb-16 font-sans">
      {/* Space grid background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-16 space-y-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins uppercase text-left w-full block whitespace-pre-wrap break-words">
          <span className="bg-gradient-to-b from-[#190a2b] to-[#d6aeff] bg-clip-text text-transparent inline-block pb-1">
            EVENT CALENDAR
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
        </p>
      </section>

      {/* Filter Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="bg-[#080d24]/50 border border-white/5 p-4 rounded-2xl glass">
          {/* Status Tabs */}
          <div className="flex flex-wrap justify-center sm:flex-nowrap bg-slate-900/60 p-1.5 rounded-2xl sm:rounded-full border border-white/5 gap-1">
            {['all', 'ongoing', 'upcoming', 'past'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeStatus === status
                    ? 'bg-[#a855f7] text-white shadow-md shadow-[#a855f7]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 glass border border-white/5 rounded-2xl max-w-xl mx-auto space-y-4 px-4 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-white font-heading">No Events Found</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Join meetup to stay connected
            </p>
            <a
              href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
              className="mt-4 px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 active:scale-95"
            >
              Join Meetup
            </a>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => {
                const isUpcoming = event.status === 'upcoming';
                const isOngoing = event.status === 'ongoing';
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      borderColor: "rgba(168, 85, 247, 0.4)",
                      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(168, 85, 247, 0.15)",
                    }}
                    transition={{ duration: 0.35 }}
                    key={event.id}
                    className="glass rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col group h-full cursor-pointer transition-colors duration-300"
                  >
                    {/* Image Poster */}
                    <div className="relative h-48 overflow-hidden bg-black shrink-0">
                      <img
                        src={event.poster}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Tag badges */}
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase text-white bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      
                      <span className={`absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                        isOngoing
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/25 animate-pulse'
                          : isUpcoming 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-slate-700/20 text-slate-400 border-slate-500/20'
                      }`}>
                        {isOngoing ? (
                          <span className="relative flex h-1.5 w-1.5 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                          </span>
                        ) : isUpcoming ? (
                          <Hourglass className="w-3 h-3 animate-pulse" />
                        ) : (
                          <PlayCircle className="w-3 h-3" />
                        )}
                        {event.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-medium uppercase">
                          <Tag className="w-3.5 h-3.5" />
                          {event.type}
                        </div>
                        
                        <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#d946ef] transition-colors leading-snug">
                          {event.name}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-slate-400 font-sans line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Footer Details Info */}
                      <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                        <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#a855f7] shrink-0" />
                          {event.venue}
                        </span>
                        
                        <Link
                          to={`/events?id=${event.id}`}
                          className="w-full flex justify-center items-center px-4 min-h-[48px] rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 shrink-0 cursor-pointer active:scale-95"
                        >
                          Details
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
};

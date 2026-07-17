import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ChevronRight } from 'lucide-react';

interface EventData {
  id: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  poster: string;
  status: string;
  attendeeCount?: number;
}

interface EventsSectionProps {
  events: EventData[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const hasOngoing = events.some(e => e.status === 'ongoing');
  const hasUpcoming = events.some(e => e.status === 'upcoming');
  
  let sectionTitle = "Upcoming & Past Events";
  if (hasOngoing) {
    sectionTitle = "Ongoing Event";
  } else if (hasUpcoming) {
    sectionTitle = "Upcoming Events";
  }

  // 1. Scroll progress indicator bound to the section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 2. Parallax offsets for background blobs and grid
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Particle background generators
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: number; duration: number; speedMultiplier: number }>>([]);
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 10 + Math.random() * 20,
      speedMultiplier: 0.5 + Math.random() * 1.5
    }));
    setParticles(list);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 relative overflow-hidden"
    >


      {/* Parallax Background Grid & Glow Blobs */}
      <motion.div 
        style={{ y: bgGridY }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]" />
      </motion.div>

      {/* Floating Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute -top-12 left-1/4 w-[380px] h-[380px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-4 right-1/4 w-[380px] h-[380px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
      />

      {/* Floating low opacity particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -100 * p.speedMultiplier, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      {/* Section Container Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
              {sectionTitle}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <a
              href="#events"
              className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-white/5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group text-slate-300 hover:text-white"
            >
              All Events
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Content Render: Events Grid or Empty State */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <EmptyStateCard />
        )}
      </motion.div>
    </section>
  );
};

// 3D Tilt Event Card Component
const EventCard: React.FC<{ event: EventData; index: number }> = ({ event, index }) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 25; // max ~3 deg
    const angleY = (x - xc) / 25; // max ~3 deg
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`,
      transition: 'transform 0.1s ease-out',
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.08) 0%, transparent 60%), rgba(10, 11, 20, 0.9)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease',
      background: 'rgba(10, 11, 20, 0.9)'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="rounded-2xl overflow-hidden flex flex-col group transition-shadow duration-500 cursor-pointer h-full"
    >
      <div className="relative h-56 overflow-hidden bg-black shrink-0">
        <img
          src={event.poster}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Calendar icon trigger on reveal */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 160,
            damping: 10,
            delay: 0.3 + index * 0.1 
          }}
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-black bg-[#ffaa00] shadow-[0_0_10px_#ffaa00]/40"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          {event.date}
        </motion.span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-purple-400 transition-colors leading-snug">
            {event.name}
          </h3>
          <p className="text-sm text-slate-400 font-sans leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
          <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            {event.venue}
          </span>
          <Link
            to={`/?id=${event.id}#events`}
            className="w-full flex justify-center items-center px-4.5 min-h-[48px] text-xs font-bold uppercase tracking-wider text-black bg-white group-hover:bg-[#a855f7] group-hover:text-white rounded-full transition-colors gap-2 shrink-0 active:scale-95"
          >
            Inspect
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Premium Empty State Card Component
const EmptyStateCard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 relative overflow-hidden"
    >
      {/* Icon with soft pulsing rotation & outer glow */}
      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#00f5ff]/20 rounded-full blur-md"
        />
        <motion.div 
          initial={{ scale: 0.8, rotate: -15 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 8, delay: 0.2 }}
          className="w-14 h-14 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/25 flex items-center justify-center relative z-10 text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.15)]"
        >
          <Calendar className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white font-heading">
          No Upcoming Events
        </h3>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Join our Meetup Hub to be notified instantly as soon as new schedules release!
        </p>
      </div>

      {/* Hub Button: Lifts, glows border, triggers arrow shift & pulse */}
      <div className="pt-2">
        <motion.a
          href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
          
          
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-black bg-[#ffaa00] hover:bg-amber-400 shadow-md shadow-[#ffaa00]/25 transition-all duration-300 cursor-pointer font-sans group relative overflow-hidden"
          whileHover={{ 
            y: -3, 
            boxShadow: "0 8px 20px rgba(255, 170, 0, 0.4)"
          }}
        >
          {/* Subtle breathing glow */}
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-0 bg-white/20"
          />
          <span className="relative z-10">Join Our Meetup Hub</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
        </motion.a>
      </div>
    </motion.div>
  );
};

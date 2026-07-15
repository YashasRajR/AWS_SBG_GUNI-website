/*
=========================================================================
SECTION: Home (Hero, About Summary, Marquee, Stats, Circuit Bento, CTA)
Edit the text/images below. Do not change the tags/classes.
=========================================================================
*/

import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { 
  ArrowRight, Users, Calendar, ChevronRight, MessageSquare, MapPin 
} from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { Logo } from '../components/ui/Logo';
import CircuitBentoGrid from '../components/ui/CircuitBentoGrid';
import TextType from '../components/ui/TextType';
import { useMeetupData } from '../utils/meetup';
import { useLinkedinData } from '../utils/linkedin';
import ShapeGrid from '../components/ui/ShapeGrid';
import { EventsSection } from '../components/ui/EventsSection';
import { ScrollText } from '../components/ui/ScrollReveal';
import { StatsCard } from '../components/ui/StatsCard';
import { LinkedinIcon, MeetupIcon } from '../components/ui/SocialIcons';





const MARQUEE_ITEMS = [
  { title: "Cloud Practitioner Essentials Bootcamp", category: "Workshop", image: "/gallery/workshop1.png" },
  { title: "Hands-on EC2 & S3 Sandbox Labs", category: "Lab Session", image: "/gallery/workshop2.png" },
  { title: "Serverless GenAI Keynote with AWS Bedrock", category: "Expert Talk", image: "/gallery/speaker1.png" },
  { title: "Interactive Q&A Session", category: "Q&A", image: "/gallery/speaker2.png" },
  { title: "AWS Student Builder Group Kickoff", category: "Community", image: "/gallery/community1.jpeg" },
  { title: "Community Icebreakers & Trivia Winners", category: "Trivia", image: "/gallery/community2.png" }
];

// Typewriter effect custom hook
export const Home: React.FC = () => {
  const { memberCount, pastEvents, upcomingEvents: liveUpcomingEvents, isLive } = useMeetupData();
  const { followerCount, isLive: isLinkedinLive } = useLinkedinData();


  // Merge live attendee/rsvp count into static EVENTS data
  const mergedEvents = EVENTS.map(e => {
    const meetupId = e.id === 'event-1' ? '314906294' : (e.id === 'event-2' ? '313855270' : (e.id === 'event-upcoming-1' ? '315424216' : null));
    const liveEvent = [...(pastEvents || []), ...(liveUpcomingEvents || [])].find((pe: any) => pe.id === meetupId);
    return {
      ...e,
      attendeeCount: liveEvent ? liveEvent.going : (e.id === 'event-1' ? 221 : e.id === 'event-2' ? 675 : (e.id === 'event-upcoming-1' ? 232 : 0))
    };
  });

  const upcomingEvents = mergedEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing').slice(0, 2);
  const pastEventsList = mergedEvents.filter(e => e.status === 'past').slice(0, 2);

  return (
    <div className="relative pt-16 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92svh] flex items-center justify-center px-4">

        {/* Cubes interactive background -- breaks out of max-w container to fill full viewport */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        >
          <ShapeGrid 
            speed={0.54}
            squareSize={40}
            direction='diagonal'
            borderColor="rgba(255, 255, 255, 0.08)"
            hoverFillColor='#7C3AED'
            shape='square'
            hoverTrailAmount={1}
          />
        </motion.div>

        {/* Radial Vignette — fades grid at all edges */}
        <div
          className="absolute pointer-events-none"
          style={{ 
            zIndex: 1,
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, #030303 100%)',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#a855f7]/5 blur-[120px] pointer-events-none animate-pulse" style={{ zIndex: 1 }} />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#d6aeff]/5 blur-[120px] pointer-events-none animate-pulse" style={{ zIndex: 1 }} />
        <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Logo size={76} className="mx-auto select-none" />
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[77px] font-bold font-poppins tracking-tight leading-[1.1] pb-2 whitespace-pre-wrap break-words"
          >
            <TextType 
              className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#190a2b_0%,#d6aeff_100%)] drop-shadow-xl"
              text={"AWS\nStudent Builder Group\nGanpat University"}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              cursorCharacter="|"
              deletingSpeed={60}
              variableSpeedEnabled={true}
              variableSpeedMin={50}
              loop={false}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-300 font-medium font-body leading-relaxed mb-10 tracking-wide text-center"
          >
            <ScrollText
              text="A platform to learn, build, and innovate with the power of AWS Cloud. Connecting students with hands-on learning, innovation, and real-world opportunities."
              delay={0.6}
              stagger={0.015}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full px-2 sm:px-0"
          >
            <a
              href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all text-center gap-2 active:scale-95"
            >
              Join Community
            </a>
            <a
              href="#events"
              className="w-full sm:w-auto px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all text-center gap-2 active:scale-95"
            >
              Explore Events
              <ArrowRight className="w-4 h-4 text-[#a855f7]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SUMMARY */}
      <section className="py-14 sm:py-24 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 via-transparent to-[#d6aeff]/20 rounded-[3rem] blur-3xl opacity-60 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-6 sm:p-16 overflow-hidden group transition-colors transition-shadow duration-700"
        >
          {/* Animated corner gradients */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#a855f7] rounded-full mix-blend-screen filter blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00f5ff] rounded-full mix-blend-screen filter blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
          
          <div className="text-center space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight drop-shadow-lg">
              <ScrollText text="What Are We?" />
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent to-[#d6aeff]/50 w-16" />
              <div className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]" />
              <div className="h-px bg-gradient-to-l from-transparent to-[#d6aeff]/50 w-16" />
            </div>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The AWS Student Builders Group at Ganpat University is a community of <strong className="text-white">passionate builders</strong>, 
              learning and experimenting with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d6aeff] font-semibold">cloud technologies</span>. 
              Our mission is to empower students with the skills, hands-on experience, and network needed to thrive in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d6aeff] to-[#a855f7] font-semibold">cloud-first world</span>.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SCROLLING MARQUEE (SIGNAL RAIL) */}
      <section className="py-6 bg-transparent overflow-hidden relative group/marquee select-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee gap-6 flex">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[280px] sm:w-[420px] p-4 flex flex-col gap-4 group/item transition-all duration-300"
            >
              <div className="h-56 w-full overflow-hidden rounded-xl bg-slate-900 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#a855f7] text-white rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="px-1">
                <h4 className="text-white font-heading text-base sm:text-lg font-semibold tracking-wide truncate group-hover/item:text-[#d946ef] transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>





      {/* 4. STATISTICS COUNTER SECTION */}
      <section className="py-14 sm:py-20 relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-12 sm:gap-16 max-w-5xl mx-auto">
          <div className="w-full lg:w-1/2 flex justify-center">
            <StatsCard
              memberCount={memberCount}
              isLive={isLive}
              label="Registered Members"
              link="https://www.meetup.com/aws-sbg-at-ganpat-university/"
              icon={<MeetupIcon className="w-6 h-6" />}
              themeColor="purple"
              subStats={[
                { label: "Growth", value: <span className="text-emerald-400">↑ +42 this month</span> },
                { label: "Engagement", value: "95% Active" },
                { label: "Events", value: "12 Community Events" }
              ]}
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <StatsCard
              memberCount={followerCount}
              isLive={isLinkedinLive}
              label="LinkedIn Followers"
              link="https://www.linkedin.com/company/aws-student-builder-group-guni/"
              icon={<LinkedinIcon className="w-6 h-6" />}
              themeColor="pink"
              subStats={[
                { label: "Growth", value: <span className="text-emerald-400">↑ +120 this month</span> },
                { label: "Engagement", value: "88% Active" },
                { label: "Posts", value: "24 Shared Updates" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS PREVIEW */}
      <EventsSection events={upcomingEvents} />

      {/* SCROLL-DRIVEN CIRCUIT BENTO GRID */}
      <CircuitBentoGrid />

      {/* 6. PAST EVENTS HIGHLIGHTS */}
      {pastEventsList.length > 0 && upcomingEvents.length === 0 && (
        <section className="py-14 sm:py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white font-heading">
                <ScrollText text="Recent Cloud Gatherings" />
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pastEventsList.map((event) => (
                      <div key={event.id} className="rounded-2xl overflow-hidden flex flex-col group h-full">
                        <div className="relative h-48 overflow-hidden bg-black shrink-0">
                          <img
                            src={event.poster}
                            alt={event.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase text-black bg-[#ffaa00] shadow-[0_0_8px_rgba(255,170,0,0.3)]">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </span>
                          <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border bg-slate-700/20 text-slate-400 border-slate-500/20">
                            PAST EVENT
                          </span>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                                {event.type === 'speaker' ? 'Online Seminar' : 'In-Person Workshop'}
                              </span>
                              {event.attendeeCount !== undefined && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-sans">
                                  <Users className="w-3.5 h-3.5" />
                                  {event.attendeeCount} Members Joined
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#00f5ff] transition-colors leading-snug">
                              {event.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 font-sans line-clamp-3 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                            <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px] flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#a855f7]" />
                              {event.venue}
                            </span>
                            <Link
                              to={`/?id=${event.id}#events`}
                              className="w-full flex justify-center items-center px-4 min-h-[48px] text-xs font-bold uppercase tracking-wider text-black bg-white group-hover:bg-[#a855f7] group-hover:text-white rounded-full transition-colors gap-2 shrink-0 cursor-pointer active:scale-95"
                            >
                              Inspect Details
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
        </section>
      )}




      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-14 sm:py-20 relative overflow-hidden bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#ffaa00]/5 blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-6">
          <MessageSquare className="w-12 h-12 text-[#00f5ff] mx-auto animate-bounce text-glow-blue" />
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-heading">
            <ScrollText text="Connect With Our Community" />
          </h2>
          <p className="max-w-xl mx-auto text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            <ScrollText
              text=""
              stagger={0.015}
            />
          </p>
          <div className="pt-4 w-full px-2 sm:px-0">
            <a
              href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:inline-flex sm:w-auto items-center justify-center gap-2 px-8 min-h-[48px] rounded-xl font-bold uppercase tracking-wider text-sm text-black bg-[#ffaa00] hover:bg-amber-400 shadow-xl shadow-[#ffaa00]/25 hover:shadow-[#ffaa00]/45 transition-all active:scale-95"
            >
              Join Meetup
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

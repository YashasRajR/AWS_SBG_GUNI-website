import React from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon, TwitterIcon, MeetupIcon } from '../ui/SocialIcons';
import { Logo } from '../ui/Logo';


export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020205] border-t border-[#a855f7]/15 text-slate-400 py-16 overflow-hidden z-10">
      {/* Background space glow grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Brand Info Column */}
          <div className="md:col-span-1 space-y-4">
            <a href="#home" className="flex items-center gap-2.5 group">
              <Logo size={24} className="group-hover:scale-105 transition-transform duration-300 shrink-0" />
              <div className="flex flex-col border-r border-white/20 pr-3 shrink-0">
                <span className="text-white font-bold text-sm font-heading tracking-wide group-hover:text-[#a855f7] transition-colors duration-300">
                  AWS Student Builder Group
                </span>
                <span className="text-[9px] text-purple-400 font-mono tracking-widest uppercase">
                  Ganpat University
                </span>
              </div>
              <img src="/guni-logo.png" alt="Ganpat University Centre of Excellence" className="h-7 sm:h-9 object-contain ml-1 shrink-0" />
            </a>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans pr-4 pt-1">
              A platform to learn, build, and innovate with the power of AWS Cloud. Connecting students with hands-on learning, innovation, and real-world opportunities.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <a
                href="https://www.linkedin.com/company/aws-student-builder-group-guni/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] flex items-center justify-center bg-white/5 transition-all hover:scale-105 active:scale-95"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#d946ef] hover:text-[#d946ef] flex items-center justify-center bg-white/5 transition-all hover:scale-105 active:scale-95"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] flex items-center justify-center bg-white/5 transition-all hover:scale-105 active:scale-95"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://ganpatuniversity.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#d946ef] hover:text-[#d946ef] flex items-center justify-center bg-white/5 transition-all hover:scale-105 active:scale-95"
                aria-label="University Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://www.meetup.com/aws-sbg-at-ganpat-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] flex items-center justify-center bg-white/5 transition-all hover:scale-105 active:scale-95"
                aria-label="Meetup Community Group"
              >
                <MeetupIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 md:justify-self-center">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a href="#home" className="hover:text-[#a855f7] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#a855f7] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#a855f7] transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[#a855f7] transition-colors">
                  Upcoming & Past Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#a855f7] transition-colors">
                  Activity Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#a855f7] transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase font-heading">
              Reach Out
            </h4>
            <ul className="space-y-3.5 text-sm font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#a855f7] shrink-0 mt-0.5" />
                <span>
                  Ganpat University (GNUI), Mehsana-Gandinagar Highway, Kherva, Gujarat, India - 384315.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#a855f7] shrink-0" />
                <a href="mailto:aws.sbg@ganpatuniversity.ac.in" className="hover:text-white transition-colors py-1">
                  aws.sbg@ganpatuniversity.ac.in
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#a855f7] shrink-0" />
                <a href="tel:+912762286080" className="hover:text-white transition-colors py-1">
                  +91 79849 61282
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-center sm:text-left">
          <p className="max-w-[280px] sm:max-w-none mx-auto sm:mx-0">
            &copy; {currentYear} AWS Student Builder Group - Ganpat University. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
              Terms of Use
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-500 w-full sm:w-auto text-center mt-1 sm:mt-0">
              Designed in Partnership with AWS Academy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/*
=========================================================================
SECTION: About Us (Mission, Vision, Objectives, Benefits)
Edit the text/images below. Do not change the tags/classes.
=========================================================================
*/

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Eye, Target, 
  CheckCircle 
} from 'lucide-react';
import { MagicBentoCard } from '../components/ui/MagicBentoCard';
import { ScrollText } from '../components/ui/ScrollReveal';
import CircuitBentoGrid from '../components/ui/CircuitBentoGrid';

// Motion Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 100
    }
  }
};




export const About: React.FC = () => {
  return (
    <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 font-sans overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffaa00]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins uppercase text-left w-full block whitespace-pre-wrap break-words"
        >
          <span className="bg-gradient-to-b from-[#190a2b] to-[#d6aeff] bg-clip-text text-transparent inline-block pb-1">
            About Us
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto text-slate-400 text-base sm:text-lg"
        >
          <ScrollText
            text=""
            stagger={0.012}
            delay={0.25}
          />
        </motion.p>
      </section>

      {/* Mission, Vision, and Objectives Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.0, ease: "easeOut" }}
          >
            <MagicBentoCard className="glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-xl h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffaa00]/10 flex items-center justify-center text-[#ffaa00]">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Our Mission</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  To bridge the gap between classroom theory and industry reality by providing students with hands-on AWS training, expert mentorship, and a collaborative environment to build real-world cloud applications.
                </p>
              </div>
            </MagicBentoCard>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <MagicBentoCard className="glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-xl h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Our Vision</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  To establish Ganpat University as a leading hub for cloud innovation, cultivating a highly skilled community of certified AWS student developers who are fully equipped to excel in the global tech industry.
                </p>
              </div>
            </MagicBentoCard>
          </motion.div>

          {/* Objectives */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <MagicBentoCard className="glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-xl h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#00f5ff]/10 flex items-center justify-center text-[#00f5ff]">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Key Objectives</h3>
                <ul className="text-sm text-slate-400 space-y-2 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00f5ff] shrink-0 mt-0.5" />
                    <span>Learn the fundamentals and advanced architectures of the AWS ecosystem.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00f5ff] shrink-0 mt-0.5" />
                    <span>Connect with cloud professionals to unlock career guidance and networks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00f5ff] shrink-0 mt-0.5" />
                    <span>Gain verifiable skills through cloud deployments and industry certifications.</span>
                  </li>
                </ul>
              </div>
            </MagicBentoCard>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN AWS SBG GUNI */}
      <CircuitBentoGrid />

    </div>
  );
};

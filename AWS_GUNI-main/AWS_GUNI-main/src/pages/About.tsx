import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Compass, Eye, Target, Network, ShieldCheck, 
  CheckCircle, GraduationCap, Code 
} from 'lucide-react';
import { MagicBentoCard } from '../components/ui/MagicBentoCard';
import { ScrollText } from '../components/ui/ScrollReveal';



const BENEFITS = [
  {
    title: 'Learn AWS Cloud Fundamentals',
    desc: 'Start from scratch and master core cloud concepts. Explore key AWS services, architecture design, and modern cloud deployment models through guided, easy-to-follow learning paths.',
    icon: GraduationCap
  },
  {
    title: 'Gain Hands-On Experience',
    desc: 'Move beyond theory by working on real-world projects and building live applications. Get access to secure sandboxes to experiment, code, and deploy cloud infrastructure safely.',
    icon: Code
  },
  {
    title: 'Connect with Expert Speakers',
    desc: 'Expand your professional network by attending exclusive tech talks, interactive workshops, and panel discussions led by industry professionals and AWS certified experts.',
    icon: Network
  },
  {
    title: 'Get Certified & Validated',
    desc: 'Accelerate your career preparation with structured study groups, voucher access resources, and expert tips to confidently clear official global AWS Certifications.',
    icon: ShieldCheck
  }
];

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

const BenefitTimelineItem: React.FC<{
  benefit: typeof BENEFITS[0];
  idx: number;
  isEven: boolean;
  isLast: boolean;
}> = ({ benefit, idx, isEven, isLast }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const IconComponent = benefit.icon;

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Card transform animations driven by scroll position
  const cardOpacity = useTransform(smoothProgress, [0.2, 0.55], [0, 1]);
  const cardX = useTransform(smoothProgress, [0.2, 0.55], [isEven ? 40 : -40, 0]);
  const cardY = useTransform(smoothProgress, [0.2, 0.55], [15, 0]);

  // Circle node animations driven by scroll position
  const nodeScale = useTransform(smoothProgress, [0.2, 0.55], [0.8, 1.15]);
  const nodeBg = useTransform(smoothProgress, [0.2, 0.55], ['#0f172a', '#020205']);
  const nodeBorder = useTransform(smoothProgress, [0.2, 0.55], ['rgba(255, 255, 255, 0.1)', '#a855f7']);
  const nodeGlowOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 0.6]);
  const iconColor = useTransform(smoothProgress, [0.3, 0.55], ['#94a3b8', '#a855f7']);

  return (
    <div 
      ref={itemRef} 
      className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full relative py-12 pl-16 md:pl-0 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Vertical trace background line segment */}
      <div className={`absolute left-6 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-white/5 pointer-events-none ${
        isLast ? 'h-1/2' : 'bottom-0'
      }`} />
      
      {/* Animated active progress line segment */}
      <div className={`absolute left-6 md:left-1/2 top-0 w-[2px] -translate-x-1/2 overflow-hidden pointer-events-none ${
        isLast ? 'h-1/2' : 'bottom-0'
      }`}>
        <motion.div 
          className="w-full h-full bg-gradient-to-b from-[#a855f7] via-[#c084fc] to-[#d946ef] origin-top"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Empty space for alignment on desktop */}
      <div className="hidden md:block w-[45%]" />

      {/* Circle Node */}
      <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
        <motion.div 
          style={{ 
            scale: nodeScale,
            backgroundColor: nodeBg,
            borderColor: nodeBorder
          }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-slate-400 relative"
        >
          {/* Node Glow Effect when active */}
          <motion.div 
            style={{ opacity: nodeGlowOpacity }}
            className="absolute inset-0 rounded-full bg-[#a855f7]/25 blur-[6px] pointer-events-none"
          />
          <motion.div style={{ color: iconColor }} className="relative z-10 flex items-center justify-center">
            <IconComponent className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div 
        style={{ opacity: cardOpacity, x: cardX, y: cardY }}
        className="w-full md:w-[45%] z-0"
      >
        <MagicBentoCard className="glass p-6 rounded-2xl border border-white/10 flex flex-col gap-3 hover:border-[#a855f7]/40 transition-all h-full relative group">
          <div className="absolute inset-0 bg-[#a855f7]/5 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity pointer-events-none" />
          
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#a855f7] uppercase">
            Benefit 0{idx + 1}
          </span>
          <h3 className="text-xl font-bold text-white font-heading">
            {benefit.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            {benefit.desc}
          </p>
        </MagicBentoCard>
      </motion.div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 font-sans overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffaa00]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-20 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
        >
          <ScrollText text="About Us" />
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Mission */}
          <motion.div variants={cardVariants}>
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
          <motion.div variants={cardVariants}>
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
          <motion.div variants={cardVariants}>
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
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20 relative bg-[#060814]/45 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <h2 className="text-3xl font-bold text-white font-heading">
              <ScrollText text="Why Join the GNU Builder Hub?" />
            </h2>
            <p className="text-slate-400 font-sans">
              <ScrollText
                text=""
                stagger={0.01}
              />
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto md:pl-0 mt-16">
            <div className="relative">
              {BENEFITS.map((benefit, idx) => {
                const isEven = idx % 2 === 0;
                const isLast = idx === BENEFITS.length - 1;
                return (
                  <BenefitTimelineItem 
                    key={idx}
                    benefit={benefit}
                    idx={idx}
                    isEven={isEven}
                    isLast={isLast}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>




    </div>
  );
};

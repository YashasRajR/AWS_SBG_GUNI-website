import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, BookOpen, Terminal, Users, Award, Cloud } from 'lucide-react';

export const CircuitBentoGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // State to hold particles
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; duration: number; speed: number }>>([]);
  const [activeHoverCard, setActiveHoverCard] = useState<number | null>(null);

  useEffect(() => {
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 15,
      speed: 0.3 + Math.random() * 0.7
    }));
    setParticles(list);
  }, []);

  // Timeline Transitions
  // Step 0: Hero Title (0% to 20%)
  const titleOpacity = useTransform(smoothProgress, [0, 0.12], [1, 1]);
  const titleBlur = useTransform(smoothProgress, [0, 0.12], ["blur(0px)", "blur(0px)"]);
  const titleScale = useTransform(smoothProgress, [0, 0.12, 0.25], [1.08, 1, 0.85]);
  const titleY = useTransform(smoothProgress, [0, 0.12, 0.25], [30, -20, -45]);

  const arrowOpacity = useTransform(smoothProgress, [0.02, 0.12, 0.2], [0, 1, 0]);

  // Step 1: Center Hub Activation (20% to 30%)
  const hubOpacity = useTransform(smoothProgress, [0.2, 0.26], [0, 1]);
  const hubScale = useTransform(smoothProgress, [0.2, 0.28], [0.7, 1]);

  // Step 2: Line & Card 1 (Top-Left) (30% to 45%)
  const path1Length = useTransform(smoothProgress, [0.3, 0.42], [0, 1]);
  const p1Opacity = useTransform(smoothProgress, [0.29, 0.3, 0.41, 0.42], [0, 1, 1, 0]);
  const p1Dist = useTransform(smoothProgress, [0.3, 0.42], ["0%", "100%"]);
  const card1Opacity = useTransform(smoothProgress, [0.42, 0.46], [0, 1]);
  const card1Scale = useTransform(smoothProgress, [0.42, 0.46], [0.92, 1]);
  const card1X = useTransform(smoothProgress, [0.42, 0.46], [-20, 0]);

  // Step 3: Line & Card 2 (Top-Right) (45% to 60%)
  const path2Length = useTransform(smoothProgress, [0.45, 0.57], [0, 1]);
  const p2Opacity = useTransform(smoothProgress, [0.44, 0.45, 0.56, 0.57], [0, 1, 1, 0]);
  const p2Dist = useTransform(smoothProgress, [0.45, 0.57], ["0%", "100%"]);
  const card2Opacity = useTransform(smoothProgress, [0.57, 0.61], [0, 1]);
  const card2Scale = useTransform(smoothProgress, [0.57, 0.61], [0.92, 1]);
  const card2X = useTransform(smoothProgress, [0.57, 0.61], [20, 0]);

  // Step 4: Line & Card 3 (Bottom-Left) (60% to 75%)
  const path3Length = useTransform(smoothProgress, [0.6, 0.72], [0, 1]);
  const p3Opacity = useTransform(smoothProgress, [0.59, 0.6, 0.71, 0.72], [0, 1, 1, 0]);
  const p3Dist = useTransform(smoothProgress, [0.6, 0.72], ["0%", "100%"]);
  const card3Opacity = useTransform(smoothProgress, [0.72, 0.76], [0, 1]);
  const card3Scale = useTransform(smoothProgress, [0.72, 0.76], [0.92, 1]);
  const card3X = useTransform(smoothProgress, [0.72, 0.76], [-20, 0]);

  // Step 5: Line & Card 4 (Bottom-Right) (75% to 90%)
  const path4Length = useTransform(smoothProgress, [0.75, 0.87], [0, 1]);
  const p4Opacity = useTransform(smoothProgress, [0.74, 0.75, 0.86, 0.87], [0, 1, 1, 0]);
  const p4Dist = useTransform(smoothProgress, [0.75, 0.87], ["0%", "100%"]);
  const card4Opacity = useTransform(smoothProgress, [0.87, 0.91], [0, 1]);
  const card4Scale = useTransform(smoothProgress, [0.87, 0.91], [0.92, 1]);
  const card4X = useTransform(smoothProgress, [0.87, 0.91], [20, 0]);

  // SVG Paths for layout (1000x600 viewBox)
  const circuitPaths = {
    p1: "M 500 300 L 500 170 L 340 170",
    p2: "M 500 300 L 500 170 L 660 170",
    p3: "M 500 300 L 500 430 L 340 430",
    p4: "M 500 300 L 500 430 L 660 430"
  };

  const cardData = [
    {
      id: 1,
      title: "Learn AWS Cloud Fundamentals",
      desc: "Master AWS cloud concepts through structured learning paths.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      position: "top-[70px] left-[20px]",
      opacity: card1Opacity,
      scale: card1Scale,
      x: card1X,
      cta: "Start Learning"
    },
    {
      id: 2,
      title: "Gain Hands-On Experience",
      desc: "Build real-world cloud projects in secure AWS environments.",
      icon: <Terminal className="w-6 h-6 text-white" />,
      position: "top-[70px] right-[20px]",
      opacity: card2Opacity,
      scale: card2Scale,
      x: card2X,
      cta: "Build Projects"
    },
    {
      id: 3,
      title: "Connect with Expert Speakers",
      desc: "Learn directly from AWS experts through talks and workshops.",
      icon: <Users className="w-6 h-6 text-white" />,
      position: "top-[330px] left-[20px]",
      opacity: card3Opacity,
      scale: card3Scale,
      x: card3X,
      cta: "Join Events"
    },
    {
      id: 4,
      title: "Get Certified & Validated",
      desc: "Prepare for AWS Certifications with guided study and support.",
      icon: <Award className="w-6 h-6 text-white" />,
      position: "top-[330px] right-[20px]",
      opacity: card4Opacity,
      scale: card4Scale,
      x: card4X,
      cta: "Earn Badges"
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-auto md:h-[300vh] bg-transparent">
      {/* Sticky Inner Viewport (Desktop) / Normal Section (Mobile) */}
      <div className="relative md:sticky top-0 w-full h-auto md:h-screen overflow-hidden flex flex-col items-center justify-center pt-10 pb-16 md:pt-20 md:pb-0">
        
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" 
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}
        />
        
        {/* Soft Glow Radial Gradient blobs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1.5 h-1.5 bg-purple-400/10 rounded-full"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -120 * p.speed, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Storytelling Content Wrapper (fixed 1000x600 coordinate context) */}
        <div className="relative w-[1000px] h-[600px] shrink-0 z-10 hidden md:block">

          {/* ---------------- STEP 0: TITLE REVEAL ---------------- */}
          <motion.div 
            style={{ 
              opacity: titleOpacity, 
              filter: titleBlur, 
              scale: titleScale, 
              y: titleY 
            }}
            className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-heading tracking-tighter mb-4 relative">
              Why Join <span className="text-[#A855F7] text-glow">AWS SBG</span> GUNI
              <div className="absolute -inset-8 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            </h2>
            <motion.div 
              style={{ opacity: arrowOpacity }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll to Explore</span>
              <ArrowDown className="w-4 h-4 text-[#A855F7]" />
            </motion.div>
          </motion.div>

          {/* ---------------- SVG CONNECTIVITY LAYER ---------------- */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <svg 
              viewBox="0 0 1000 600" 
              className="w-full h-full absolute"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="neon-purple" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Path 1 */}
              <motion.path
                d={circuitPaths.p1}
                fill="none"
                stroke={activeHoverCard === 1 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                strokeOpacity="0.2"
              />
              <motion.path
                d={circuitPaths.p1}
                fill="none"
                stroke={activeHoverCard === 1 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                filter="url(#neon-purple)"
                style={{ pathLength: path1Length }}
              />

              {/* Path 2 */}
              <motion.path
                d={circuitPaths.p2}
                fill="none"
                stroke={activeHoverCard === 2 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                strokeOpacity="0.2"
              />
              <motion.path
                d={circuitPaths.p2}
                fill="none"
                stroke={activeHoverCard === 2 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                filter="url(#neon-purple)"
                style={{ pathLength: path2Length }}
              />

              {/* Path 3 */}
              <motion.path
                d={circuitPaths.p3}
                fill="none"
                stroke={activeHoverCard === 3 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                strokeOpacity="0.2"
              />
              <motion.path
                d={circuitPaths.p3}
                fill="none"
                stroke={activeHoverCard === 3 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                filter="url(#neon-purple)"
                style={{ pathLength: path3Length }}
              />

              {/* Path 4 */}
              <motion.path
                d={circuitPaths.p4}
                fill="none"
                stroke={activeHoverCard === 4 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                strokeOpacity="0.2"
              />
              <motion.path
                d={circuitPaths.p4}
                fill="none"
                stroke={activeHoverCard === 4 ? "#d946ef" : "#a855f7"}
                strokeWidth="4"
                filter="url(#neon-purple)"
                style={{ pathLength: path4Length }}
              />
            </svg>
          </div>

          {/* ---------------- LIGHT PARTICLES TRAVERSING ---------------- */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Particle 1 */}
            <motion.div
              style={{
                offsetPath: `path("${circuitPaths.p1}")`,
                offsetDistance: p1Dist,
                opacity: p1Opacity,
                position: 'absolute',
                top: 0,
                left: 0
              }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#a855f7] transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Particle 2 */}
            <motion.div
              style={{
                offsetPath: `path("${circuitPaths.p2}")`,
                offsetDistance: p2Dist,
                opacity: p2Opacity,
                position: 'absolute',
                top: 0,
                left: 0
              }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#a855f7] transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Particle 3 */}
            <motion.div
              style={{
                offsetPath: `path("${circuitPaths.p3}")`,
                offsetDistance: p3Dist,
                opacity: p3Opacity,
                position: 'absolute',
                top: 0,
                left: 0
              }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#a855f7] transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Particle 4 */}
            <motion.div
              style={{
                offsetPath: `path("${circuitPaths.p4}")`,
                offsetDistance: p4Dist,
                opacity: p4Opacity,
                position: 'absolute',
                top: 0,
                left: 0
              }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#a855f7] transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {/* ---------------- STEP 1: CENTER ROTATING HUB ---------------- */}
          <motion.div 
            style={{ 
              opacity: hubOpacity, 
              scale: hubScale,
              left: '500px',
              top: '300px'
            }}
            className="absolute z-20 w-24 h-24 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
          >
            {/* Outer Pulsing Aura */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#A855F7]/20 rounded-full blur-xl"
            />

            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-[#C084FC]/50 rounded-full"
            />

            {/* Glowing Center AWS Community Symbol Box */}
            <div className="w-14 h-14 bg-black border-2 border-white/80 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.8)] z-10 relative">
              <Cloud className="w-7 h-7 text-[#C084FC] animate-pulse" />
            </div>
          </motion.div>

          {/* ---------------- STEPS 2-5: FEATURE CARDS GRID ---------------- */}
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              className={`absolute ${card.position} w-[320px] pointer-events-auto h-[200px]`}
              style={{
                opacity: card.opacity,
                scale: card.scale,
                x: card.x
              }}
              onMouseEnter={() => setActiveHoverCard(card.id)}
              onMouseLeave={() => setActiveHoverCard(null)}
              whileHover={{ 
                y: -6
              }}
            >
              <div 
                className={`glass rounded-2xl p-5 flex flex-col justify-start border transition-all duration-300 backdrop-blur-md h-full ${
                  activeHoverCard === card.id 
                    ? 'border-[#d946ef] shadow-[0_0_15px_rgba(217,70,239,0.2)] bg-black/80' 
                    : 'border-[#a855f7]/25 bg-black/40'
                }`}
              >
                {/* Neon Icon Frame */}
                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 flex items-center justify-center mb-4 border border-[#a855f7]/45 shrink-0">
                  {card.icon}
                </div>

                {/* Typography details */}
                <h3 className="text-xl font-bold text-white font-heading mb-2 tracking-tight group-hover:text-[#c084fc]">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}



        </div>

        {/* Mobile Fallback layout for screens smaller than md (768px) */}
        <div className="md:hidden block w-full px-4 text-center z-10 max-h-[85vh] overflow-y-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white font-heading tracking-tight">
              Why Join <span className="text-[#A855F7]">AWS SBG</span> GUNI
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {cardData.map((card) => (
              <div key={card.id} className="p-5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 flex items-center justify-center mb-3 border border-[#a855f7]/45 inline-flex">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-1.5">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CircuitBentoGrid;

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface SubStat {
  label: string;
  value: React.ReactNode;
}

interface StatsCardProps {
  memberCount: string | number;
  isLive?: boolean;
  label: string;
  link: string;
  icon: React.ReactNode;
  themeColor?: 'purple' | 'pink';
  subStats?: SubStat[];
}

const THEMES = {
  purple: {
    auroraStart: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    auroraEnd: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
    border: 'border-[#a855f7]/20 group-hover:border-[#a855f7]/50',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    textGradient: 'from-white via-purple-100 to-purple-300',
    textPlus: 'text-purple-400',
    sparklineStroke: '#a855f7',
    sparklineParticle: '#d8b4fe',
    iconBg: 'bg-[#a855f7]/10 text-[#a855f7] group-hover:bg-[#a855f7]/20',
    sparklineBg: 'rgba(168,85,247,0.1)'
  },
  pink: {
    auroraStart: 'bg-pink-500/10 group-hover:bg-pink-500/20',
    auroraEnd: 'bg-rose-500/10 group-hover:bg-rose-500/20',
    border: 'border-[#d946ef]/20 group-hover:border-[#d946ef]/50',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]',
    textGradient: 'from-white via-pink-100 to-pink-300',
    textPlus: 'text-pink-400',
    sparklineStroke: '#d946ef',
    sparklineParticle: '#f5d0fe',
    iconBg: 'bg-[#d946ef]/10 text-[#d946ef] group-hover:bg-[#d946ef]/20',
    sparklineBg: 'rgba(217,70,239,0.1)'
  }
};

export function StatsCard({ 
  memberCount, 
  isLive = true,
  label,
  link,
  icon,
  themeColor = 'purple',
  subStats = []
}: StatsCardProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const rawTargetCount = parseInt(memberCount.toString().replace(/[^0-9]/g, ''), 10) || 1174;
  const targetCount = rawTargetCount >= 100 ? Math.floor(rawTargetCount / 100) * 100 : rawTargetCount;
  
  useEffect(() => {
    if (isInView) {
      // Animate the main counter
      animate(0, targetCount, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => setCount(Math.floor(latest))
      });
    }
  }, [isInView, targetCount]);

  const theme = THEMES[themeColor];

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover="hover"
      className="relative w-full max-w-sm mx-auto group perspective-1000 block"
    >
      <motion.div
        variants={{
          hover: { y: -4, scale: 1.01 }
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden p-6 transition-all duration-500"
      >
        {/* Background Aurora Effect */}
        <div className={`absolute -top-24 -left-24 w-64 h-64 ${theme.auroraStart} rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-[pulse_4s_ease-in-out_infinite]`}></div>
        <div className={`absolute -bottom-24 -right-24 w-64 h-64 ${theme.auroraEnd} rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-[pulse_4s_ease-in-out_infinite]`} style={{ animationDelay: '2s' }}></div>
        
        {/* Faint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

        {/* Icon & Live Indicator Row */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className={`p-3 rounded-xl ${theme.iconBg} group-hover:scale-110 transition-all duration-300`}>
            {icon}
          </div>
          {isLive && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider transition-opacity duration-1000 group-hover:opacity-75">
                LIVE
              </span>
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-[3000ms]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col h-full justify-center mt-2">
          {/* Main Counter */}
          <div className="flex items-center gap-0.5">
            <motion.div 
              variants={{ hover: { scale: 1.03 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient} font-mono tracking-tighter`}
              style={{ textShadow: `0 0 40px ${themeColor === 'purple' ? 'rgba(168,85,247,0.3)' : 'rgba(217,70,239,0.3)'}` }}
            >
              {count}
            </motion.div>
            <span className={`text-4xl sm:text-5xl font-extrabold pb-1 ${theme.textPlus}`}>+</span>
          </div>
          
          <div className="text-xs uppercase tracking-widest text-slate-400 font-sans font-medium mt-1">
            {label}
          </div>

          {/* Secondary Metrics Container (Expand on Hover) */}
          {subStats.length > 0 && (
            <motion.div
              variants={{
                initial: { height: 0, opacity: 0, marginTop: 0 },
                hover: { height: 'auto', opacity: 1, marginTop: 24 }
              }}
              initial="initial"
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                {subStats.map((stat, i) => (
                  <div key={i} className={`flex flex-col ${i === 2 ? 'col-span-2' : ''}`}>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                    <span className="text-sm font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>


      </motion.div>
    </motion.a>
  );
}

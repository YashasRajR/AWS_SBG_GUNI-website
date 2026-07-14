import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface StarryLoadingProps {
  onComplete: () => void;
}

export const StarryLoading: React.FC<StarryLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Tick progress from 0 to 100 over 2.4 seconds
    const duration = 2400;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600); // Wait for fadeout animation
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020205]"
        >
          {/* Ambient space background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,20,0.85),rgba(2,2,5,1))] pointer-events-none" />

          {/* Random floating starry particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[#a855f7]' : i % 3 === 1 ? 'bg-[#d946ef]' : 'bg-white'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: i % 3 === 0 ? '2.5px' : '1.5px',
                  height: i % 3 === 0 ? '2.5px' : '1.5px',
                }}
                animate={{
                  opacity: [0.15, 0.9, 0.15],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: Math.random() * 2.5 + 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center select-none">
            {/* Logo Box */}
            <div className="w-[260px] h-[140px] relative mb-8 flex items-center justify-center">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ 
                  opacity: progress > 15 ? 1 : 0, 
                  scale: progress > 15 ? 1 : 0.5,
                  rotate: progress > 15 ? 0 : -30
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Logo size={96} className="mx-auto" />
              </motion.div>
            </div>

            {/* Glowing Brand Names */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: progress > 20 ? 1 : 0, y: progress > 20 ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold tracking-[0.25em] text-white uppercase text-center font-heading"
            >
              AWS Student Builder Group
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 40 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs text-[#d946ef] tracking-[0.18em] uppercase mt-1 font-mono font-medium"
            >
              Ganpat University
            </motion.p>

            {/* Loading Stats Panel */}
            <div className="mt-8 flex flex-col items-center">
              <span className="text-xs font-mono text-[#a855f7] tracking-wider mb-2">
                Loading... {Math.round(progress)}%
              </span>
              
              {/* Progress Bar Container */}
              <div className="w-[200px] h-[4px] bg-black/80 rounded-full overflow-hidden border border-[#a855f7]/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#a855f7] to-[#d946ef]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const SonarClickEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        return;
      }

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple].slice(-8)); // Cap active ripples to max 8
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Concentric Sonar Ring 1 (Teal) */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 120, height: 120, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onAnimationComplete={() => handleAnimationComplete(ripple.id)}
              className="absolute rounded-full border border-[#00f5ff]/40 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            {/* Concentric Sonar Ring 2 (Gold) */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.4 }}
              animate={{ width: 180, height: 180, opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
              className="absolute rounded-full border border-[#ffaa00]/30 shadow-[0_0_20px_rgba(255,170,0,0.15)]"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            {/* Center scanner dot */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full bg-[#00f5ff]"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FloatInTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export const FloatInText: React.FC<FloatInTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.15, // slower stagger for characters to reduce typing speed
  duration = 0.15,
  as: Component = 'span',
}) => {
  const ref = useRef<any>(null);
  // once: false makes it re-type every time it scrolls into view
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Split into characters, keeping spaces intact
  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      display: 'none',
    },
    visible: {
      opacity: 1,
      display: 'inline-block',
      transition: {
        duration,
      },
    },
  };

  const MotionComponent =
    Component === 'h1'
      ? motion.h1
      : Component === 'h2'
      ? motion.h2
      : Component === 'h3'
      ? motion.h3
      : motion.span;

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
    >
      {characters.map((char, idx) => {
        if (char === ' ') {
          return <span key={idx}>&nbsp;</span>;
        }
        return (
          <motion.span
            key={idx}
            variants={charVariants}
            className="inline-block"
          >
            {char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};

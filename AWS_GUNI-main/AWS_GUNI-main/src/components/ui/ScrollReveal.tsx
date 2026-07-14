import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ==========================================
// 1. ScrollText Component
// ==========================================
interface ScrollTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  stagger?: number;
  yOffset?: number;
  blur?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export const ScrollText: React.FC<ScrollTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  stagger = 0.02,
  yOffset = 15,
  blur = true,
  as: Component = 'span',
}) => {
  const ref = useRef<any>(null);
  // Trigger when 10% of the element is visible
  const isInView = useInView(ref, { once, amount: 0.1 });

  const words = text.split(/(\s+)/); // Preserve spaces for perfect formatting

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: blur ? 'blur(4px)' : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  const MotionComponent = Component === 'h1'
    ? motion.h1
    : Component === 'h2'
    ? motion.h2
    : Component === 'h3'
    ? motion.h3
    : Component === 'p'
    ? motion.p
    : motion.span;

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => {
        // If it is just whitespace, render it directly to preserve spacing
        if (/^\s+$/.test(word)) {
          return <span key={idx}>{word}</span>;
        }
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};

// ==========================================
// 2. ScrollList & ScrollItem Components
// ==========================================
interface ScrollListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const ScrollList: React.FC<ScrollListProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const ScrollItem: React.FC<ScrollItemProps> = ({
  children,
  className = '',
  yOffset = 25,
  duration = 0.6,
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1] as const, // ease-in-out
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  delay = 500,
  speed = 50,
  cursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (isInView && !isStarted) {
      timeout = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (isStarted && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isStarted, text, delay, speed, isInView]);

  return (
    <span ref={ref} className={`inline-flex items-center ${className}`}>
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
        />
      )}
    </span>
  );
};

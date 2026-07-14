import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for Star A
  const starAX = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });
  const starAY = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });

  // Spring physics for Star B
  const starBX = useSpring(useMotionValue(0), { stiffness: 110, damping: 18 });
  const starBY = useSpring(useMotionValue(0), { stiffness: 110, damping: 18 });

  // Spring physics for Star C
  const starCX = useSpring(useMotionValue(0), { stiffness: 170, damping: 26 });
  const starCY = useSpring(useMotionValue(0), { stiffness: 170, damping: 26 });

  // Trailing ring for global center lag
  const centerSpringConfig = { stiffness: 220, damping: 28 };
  const trailingCenterX = useSpring(mouseX, centerSpringConfig);
  const trailingCenterY = useSpring(mouseY, centerSpringConfig);

  // Rotation angle for hover spinning
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide standard cursor
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide-style';
    style.innerHTML = `
      body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      const styleElement = document.getElementById('custom-cursor-hide-style');
      if (styleElement) styleElement.remove();
    };
  }, [mouseX, mouseY]);

  // Orbit rotation animation when hovered
  useEffect(() => {
    let animFrameId: number;
    const tick = () => {
      setAngle((prev) => (prev + (hovered ? 2.2 : 0.4)) % 360);
      animFrameId = requestAnimationFrame(tick);
    };
    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [hovered]);

  // Update target offsets of the companion stars
  useEffect(() => {
    const rad = (angle * Math.PI) / 180;
    
    // Scale factor for offsets
    const scale = hovered ? 1.6 : clicked ? 0.75 : 1.0;
    
    // Star offsets under rotation
    const baseOffsets = [
      { x: 22, y: -12 },
      { x: -16, y: 20 },
      { x: -18, y: -18 },
    ];

    // Rotate and scale offsets
    const rotatedOffsets = baseOffsets.map((offset) => {
      const rx = (offset.x * Math.cos(rad) - offset.y * Math.sin(rad)) * scale;
      const ry = (offset.x * Math.sin(rad) + offset.y * Math.cos(rad)) * scale;
      return { x: rx, y: ry };
    });

    const mx = mouseX.get();
    const my = mouseY.get();

    starAX.set(mx + rotatedOffsets[0].x);
    starAY.set(my + rotatedOffsets[0].y);

    starBX.set(mx + rotatedOffsets[1].x);
    starBY.set(my + rotatedOffsets[1].y);

    starCX.set(mx + rotatedOffsets[2].x);
    starCY.set(my + rotatedOffsets[2].y);

  }, [angle, hovered, clicked, mouseX, mouseY, starAX, starAY, starBX, starBY, starCX, starCY]);

  if (!isVisible) return null;

  const lineColor = hovered ? 'rgba(0, 245, 255, 0.4)' : 'rgba(255, 170, 0, 0.25)';
  const starColor = hovered ? '#00f5ff' : '#ffaa00';
  const glowShadow = hovered 
    ? '0 0 10px rgba(0, 245, 255, 0.8), 0 0 18px rgba(0, 245, 255, 0.4)' 
    : '0 0 8px rgba(255, 170, 0, 0.7), 0 0 15px rgba(255, 170, 0, 0.3)';

  return (
    <>
      {/* Viewport SVG drawing the constellation lines */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9998]">
        {/* Lines from Center to Companion Stars */}
        <motion.line
          x1={trailingCenterX}
          y1={trailingCenterY}
          x2={starAX}
          y2={starAY}
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray={hovered ? "none" : "3,3"}
        />
        <motion.line
          x1={trailingCenterX}
          y1={trailingCenterY}
          x2={starBX}
          y2={starBY}
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray={hovered ? "none" : "3,3"}
        />
        <motion.line
          x1={trailingCenterX}
          y1={trailingCenterY}
          x2={starCX}
          y2={starCY}
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray={hovered ? "none" : "3,3"}
        />

        {/* Outer triangle lines connecting the stars to form the constellation bounds */}
        <motion.line
          x1={starAX}
          y1={starAY}
          x2={starBX}
          y2={starBY}
          stroke={lineColor}
          strokeWidth="0.75"
        />
        <motion.line
          x1={starBX}
          y1={starBY}
          x2={starCX}
          y2={starCY}
          stroke={lineColor}
          strokeWidth="0.75"
        />
        <motion.line
          x1={starCX}
          y1={starCY}
          x2={starAX}
          y2={starAY}
          stroke={lineColor}
          strokeWidth="0.75"
        />
      </svg>

      {/* Star Node Elements */}

      {/* Star A */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        style={{
          x: starAX,
          y: starAY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          backgroundColor: starColor,
          boxShadow: glowShadow,
        }}
      />

      {/* Star B */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        style={{
          x: starBX,
          y: starBY,
          translateX: '-50%',
          translateY: '-50%',
          width: 3.5,
          height: 3.5,
          backgroundColor: starColor,
          boxShadow: glowShadow,
        }}
      />

      {/* Star C */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        style={{
          x: starCX,
          y: starCY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4.5,
          height: 4.5,
          backgroundColor: starColor,
          boxShadow: glowShadow,
        }}
      />

      {/* Central Star Core (Alpha Star) */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[10000]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
          backgroundColor: '#ffffff',
          border: `1.5px solid ${hovered ? '#00f5ff' : '#ffaa00'}`,
          boxShadow: hovered 
            ? '0 0 14px #00f5ff, 0 0 25px #00f5ff' 
            : '0 0 10px #ffaa00, 0 0 18px #ffaa00',
        }}
        animate={{
          scale: clicked ? 1.6 : hovered ? 0.75 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 22,
        }}
      />
    </>
  );
};

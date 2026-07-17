import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LinkedinIcon } from './SocialIcons';
import './TeamCard.css';

export interface TeamMemberData {
  name: string;
  designation: string;
  role: string;
  tagline: string;
  description: string; // Unused since we only show tagline on back now
  profileImage: string;
  linkedin: string;
}

interface TeamCardProps {
  member: TeamMemberData;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipTimeoutRef = useRef<any>(null);

  // Mouse positions for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped || isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    // Clear any existing timer just in case
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    
    // Set 0.5 second (500ms) delay before flipping
    flipTimeoutRef.current = setTimeout(() => {
      setIsFlipped(true);
    }, 500);
  };

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="team-card-wrapper"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`${member.name}, ${member.designation}. Role: ${member.role}. Press Space or Enter to flip.`}
        className={`team-card-container h-full w-full relative rounded-[28px] ${
          isFlipped ? 'flipped transition-transform duration-[700ms] ease-in-out' : 'transition-transform duration-[0ms]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
        }}
      >
        {/* --- FRONT SIDE --- */}
        <div className="card-face card-front custom-kpi-front rounded-[28px] flex flex-col items-center justify-between relative overflow-hidden">
          {/* Text Metadata */}
          <div className="text-center w-full z-10 custom-kpi-text-container">
            <h3 className="custom-kpi-name">
              {member.name}
            </h3>
            <p className="custom-kpi-team">
              {member.role}
            </p>
          </div>

          {/* Profile Image - transparent cutout, cover position */}
          <div className="custom-kpi-avatar-container w-full absolute bottom-0 left-0 overflow-visible pointer-events-none">
            <img
              src={member.profileImage}
              alt={member.name}
              className="custom-kpi-avatar-img avatar-front-transition"
            />
          </div>

          {/* LinkedIn Icon Button */}
          <div className="custom-kpi-action-area z-10 pb-6 mt-auto">
            <a
              href={member.linkedin}
              
              
              onClick={(e) => e.stopPropagation()}
              className="custom-kpi-linkedin-btn"
              aria-label={`${member.name}'s LinkedIn Profile`}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="card-face card-back custom-kpi-back rounded-[28px] flex flex-col items-center justify-between relative overflow-hidden">
          {/* Top Info */}
          <div className="text-center w-full z-10 pt-7 px-4 shrink-0">
            <h3 className="custom-kpi-name">
              {member.name}
            </h3>
            <p className="custom-kpi-team">
              {member.role}
            </p>
          </div>

          {/* Tagline Centered Vertically */}
          <div className="flex-1 flex items-center justify-center z-10 px-6 w-full">
            <p className="custom-kpi-tagline">
              "{member.tagline}"
            </p>
          </div>

          {/* Colored Profile cutout mockup on Back side */}
          <div className="custom-kpi-avatar-container w-full absolute bottom-0 left-0 overflow-visible pointer-events-none">
            <img
              src={member.profileImage}
              alt={member.name}
              className="custom-kpi-avatar-img filter-none avatar-back-transition"
            />
          </div>

          {/* Bottom Action Area */}
          <div className="flex justify-center items-center z-10 pb-6 shrink-0">
            <a
              href={member.linkedin}
              
              
              onClick={(e) => e.stopPropagation()}
              className="custom-kpi-linkedin-btn"
              aria-label={`${member.name}'s LinkedIn Profile`}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

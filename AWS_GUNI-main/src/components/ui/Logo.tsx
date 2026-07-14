import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 24, 
  glow = false, // Ignored now for flat SVG compliance
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#a855f7] transition-all duration-300 ${className}`}
      style={{ filter: 'drop-shadow(0 0 0px #a855f7)' }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 5px rgba(168,85,247,0.8))')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 0px #a855f7)')}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 2 1 V 0 H 3 V 1 H 4 V 0 H 5 V 1 H 6 V 0 H 7 V 2 H 2 Z M 8 2 H 9 V 3 H 8 V 4 H 9 V 5 H 8 V 6 H 9 V 7 H 7 V 2 Z M 7 8 V 9 H 6 V 8 H 5 V 9 H 4 V 8 H 3 V 9 H 2 V 7 H 7 Z M 1 7 H 0 V 6 H 1 V 5 H 0 V 4 H 1 V 3 H 0 V 2 H 2 V 7 Z"
        fill="currentColor"
      />
    </svg>
  );
};

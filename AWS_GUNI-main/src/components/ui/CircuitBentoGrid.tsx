import React from 'react';
import { BookOpen, Terminal, Users, Award } from 'lucide-react';

export const CircuitBentoGrid: React.FC = () => {
  const cardData = [
    {
      id: 1,
      title: "Learn AWS Cloud Fundamentals",
      desc: "Master AWS cloud concepts through structured learning paths.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      title: "Gain Hands-On Experience",
      desc: "Build real-world cloud projects in secure AWS environments.",
      icon: <Terminal className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      title: "Connect with Expert Speakers",
      desc: "Learn directly from AWS experts through talks and workshops.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      id: 4,
      title: "Get Certified & Validated",
      desc: "Prepare for AWS Certifications with guided study and support.",
      icon: <Award className="w-6 h-6 text-white" />,
    }
  ];

  return (
    <div className="relative w-full bg-transparent py-24 select-none">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}
      />
      
      {/* Soft Glow Radial Gradient blobs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
        {/* Title */}
        <div className="flex flex-col items-center justify-center text-center px-4 mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tighter relative">
            Why Join <span className="text-[#A855F7] text-glow">AWS SBG</span> GUNI
            <div className="absolute -inset-8 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          </h2>
        </div>

        {/* 2x2 Grid on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardData.map((card) => (
            <div 
              key={card.id}
              className="glass rounded-2xl p-8 flex flex-col justify-start border border-[#a855f7]/25 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#d946ef] hover:shadow-[0_0_15px_rgba(217,70,239,0.2)] hover:bg-black/60"
            >
              {/* Neon Icon Frame */}
              <div className="w-12 h-12 rounded-xl bg-[#a855f7]/15 flex items-center justify-center mb-6 border border-[#a855f7]/45 shrink-0">
                {card.icon}
              </div>

              {/* Typography details */}
              <h3 className="text-2xl font-bold text-white font-heading mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-base text-gray-300 font-sans leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircuitBentoGrid;



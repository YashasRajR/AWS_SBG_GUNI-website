import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative font-sans text-center px-4">
      {/* Background stardust glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f5ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-10 sm:p-16 border border-white/10 shadow-2xl relative z-10 max-w-lg w-full"
      >
        <h1 className="text-8xl sm:text-9xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-b from-[#190a2b] to-[#a855f7] drop-shadow-sm mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 min-h-[48px] rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

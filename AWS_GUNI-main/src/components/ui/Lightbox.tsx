import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Download } from 'lucide-react';
import type { GalleryItem } from '../../data/mockData';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  
  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const extension = imageUrl.split('.').pop() || 'jpg';
      link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
        >
          {/* Close Area Backdrop */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Core Panel Container */}
          <motion.div
            initial={{ scale: 0.9, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative max-w-5xl w-full flex flex-col md:flex-row bg-[#080d24] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain"
              />

              {/* Navigation Arrows inside image area */}
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="absolute left-4 p-2 rounded-full bg-black/45 border border-white/10 text-white hover:bg-[#ff9900] hover:text-black transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="absolute right-4 p-2 rounded-full bg-black/45 border border-white/10 text-white hover:bg-[#ff9900] hover:text-black transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Metadata Sidebar (or bottom-bar on mobile) */}
            <div className="p-6 md:w-80 flex flex-col justify-between bg-[#080d24] border-t md:border-t-0 md:border-l border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold tracking-wider text-[#ff9900] bg-[#ff9900]/10 border border-[#ff9900]/20 rounded-full uppercase">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-400 bg-white/5 border border-white/10 rounded-full uppercase">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white font-heading leading-tight mb-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-400 font-sans leading-relaxed mt-4">
                  AWS Student Builder Group (Ganpat University) hosts key hands-on training sessions, technical events, and hackathons throughout the year.
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => item && handleDownload(item.image, item.title)}
                  className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs text-black bg-[#ff9900] hover:bg-[#ff9900]/80 shadow-lg shadow-[#ff9900]/20 hover:shadow-[#ff9900]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
              </div>

              <div className="mt-8 flex justify-between items-center text-xs text-slate-500">
                <span>Ganpat University Campus</span>
                <span className="font-mono">GUNI SBG 2026</span>
              </div>
            </div>

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/15 text-white hover:bg-red-500 transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

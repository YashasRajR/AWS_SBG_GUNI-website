/*
=========================================================================
SECTION: Gallery (Static Grid, Lightbox)
Edit the text/images below. Do not change the tags/classes.
=========================================================================
*/

import React, { useState } from 'react';
import { Maximize2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/mockData';
import type { GalleryItem } from '../data/mockData';
import { Lightbox } from '../components/ui/Lightbox';

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

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  onClick
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        cursor: 'zoom-in',
      }}
      className="rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl flex flex-col group"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {/* Download button in GalleryCard */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(item.image, item.title);
          }}
          className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-black/60 border border-white/15 text-white hover:bg-[#ff9900] hover:text-black transition-all z-20 cursor-pointer opacity-0 group-hover:opacity-100"
          title="Download image"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover select-none opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 pointer-events-none" />

        {/* Hover zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white mb-8">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Slide-up details overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent translate-y-[85%] group-hover:translate-y-0 transition-transform duration-300 z-10 flex flex-col justify-end min-h-[50%]">
          <span className="text-[9px] font-mono text-[#a855f7] uppercase tracking-wider mb-1 block">
            {item.category}
          </span>
          <h4 className="text-white font-bold text-xs sm:text-sm font-heading leading-snug line-clamp-2">
            {item.title}
          </h4>
          <span className="text-[8px] text-slate-400 mt-1 block">
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS;

  // Navigation helpers for Lightbox slider
  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    } else {
      setLightboxItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
    } else {
      setLightboxItem(filteredItems[0]);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black py-24 select-none">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Central heading */}
      <div className="flex flex-col items-center justify-center text-center px-4 mb-16 z-20 w-full relative">
        <span className="text-[10px] sm:text-xs font-mono text-[#a855f7] uppercase tracking-widest mb-2 opacity-80">
          AWS SBG Ganpat University
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight max-w-sm sm:max-w-md md:max-w-2xl leading-tight uppercase">
          CAPTURING THE JOURNEY
        </h2>
      </div>

      {/* Responsive Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-black border border-white/5 rounded-2xl max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">No Media Located</h3>
            <p className="text-xs text-slate-400 font-sans">
              {"We haven't uploaded images yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
              >
                <GalleryCard
                  item={item}
                  onClick={() => setLightboxItem(item)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal overlay */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};


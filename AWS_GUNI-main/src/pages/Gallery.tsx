/*
=========================================================================
SECTION: Gallery (Static Grid, Lightbox) -> Converted to Dual Marquee
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

  // Shuffle and split items
  const [shuffledItems] = React.useState(() => [...GALLERY_ITEMS].sort(() => 0.5 - Math.random()));

  const half = Math.ceil(shuffledItems.length / 2);
  const row1Items = shuffledItems.slice(0, half);
  const row2Items = shuffledItems.slice(half);

  // Navigation helpers for Lightbox slider
  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(GALLERY_ITEMS[currentIndex - 1]);
    } else {
      setLightboxItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1]);
    }
  };

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex < GALLERY_ITEMS.length - 1) {
      setLightboxItem(GALLERY_ITEMS[currentIndex + 1]);
    } else {
      setLightboxItem(GALLERY_ITEMS[0]);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black py-24 select-none">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Central heading */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 mt-32 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins uppercase text-left w-full block whitespace-pre-wrap break-words"
        >
          <span className="bg-gradient-to-b from-[#190a2b] to-[#d6aeff] bg-clip-text text-transparent inline-block pb-1">
            CAPTURING THE JOURNEY
          </span>
        </motion.h1>
      </section>

      {/* Dual Marquee Gallery */}
      <div className="relative z-10 w-full flex flex-col gap-6 sm:gap-8 group/marquee mt-10">
        {GALLERY_ITEMS.length === 0 ? (
          <div className="text-center py-20 bg-black border border-white/5 rounded-2xl max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">No Media Located</h3>
            <p className="text-xs text-slate-400 font-sans">
              {"We haven't uploaded images yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <>
            {/* ROW 1: Left to Right */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee gap-6 flex">
                {[...row1Items, ...row1Items, ...row1Items, ...row1Items, ...row1Items, ...row1Items].map((item, index) => (
                  <div key={`r1-${index}`} className="w-[280px] sm:w-[340px] md:w-[400px] flex-shrink-0">
                    <GalleryCard item={item} onClick={() => setLightboxItem(item)} />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Right to Left */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-reverse gap-6 flex">
                {[...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items].map((item, index) => (
                  <div key={`r2-${index}`} className="w-[280px] sm:w-[340px] md:w-[400px] flex-shrink-0">
                    <GalleryCard item={item} onClick={() => setLightboxItem(item)} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

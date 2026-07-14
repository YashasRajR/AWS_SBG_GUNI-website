import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValueEvent, useMotionValue, useSpring, animate } from 'framer-motion';
import { Compass, Maximize2, Download } from 'lucide-react';
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
  index: number;
  N: number;
  rotation: any;
  radiusX: number;
  radiusY: number;
  cardWidth: number;
  cardHeight: number;
  isActive: boolean;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  index,
  N,
  rotation,
  radiusX,
  radiusY,
  cardWidth,
  cardHeight,
  isActive,
  onClick
}) => {
  // Rotate based on index angle + rotation offset
  const angle = useTransform(
    rotation,
    (r: number) => index * (360 / N) + r
  );

  const rad = useTransform(angle, (a: number) => (a * Math.PI) / 180);
  const translateX = useTransform(rad, (r: number) => Math.sin(r) * radiusX);
  const translateY = useTransform(rad, (r: number) => Math.cos(r) * radiusY);

  // Cards in front are opaque, background cards fade out significantly to reduce clutter
  const opacity = useTransform(angle, (a: number) => {
    const cos = Math.cos((a * Math.PI) / 180);
    return 0.15 + (cos + 1) * 0.425; // ranges from 0.15 to 1.0
  });

  // Scale depth effect: smaller in the back, larger in the front
  const scale = useTransform(angle, (a: number) => {
    const cos = Math.cos((a * Math.PI) / 180);
    return 0.6 + (cos + 1) * 0.2; // ranges from 0.6 to 1.0
  });

  const activeScaleValue = useMotionValue(1);
  const isMobile = window.innerWidth < 768;
  const activeScaleMultiplier = isMobile ? 1.6 : 2.5;

  useEffect(() => {
    animate(activeScaleValue, isActive ? activeScaleMultiplier : 1.0, {
      type: "spring",
      stiffness: 120,
      damping: 15
    });
  }, [isActive, activeScaleValue, activeScaleMultiplier]);

  const combinedScale = useTransform(
    [scale, activeScaleValue],
    ([s, a]: any) => s * a
  );

  // Layering
  const zIndex = useTransform(angle, (a: number) => {
    const cos = Math.cos((a * Math.PI) / 180);
    return Math.round((cos + 1) * 10);
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: cardWidth,
        height: cardHeight,
        x: translateX,
        y: translateY,
        opacity: opacity,
        scale: combinedScale,
        zIndex: zIndex,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      className={`rounded-xl overflow-hidden border bg-slate-950/90 backdrop-blur-md transition-colors duration-500 shadow-2xl flex flex-col ${
        isActive 
          ? 'border-[#a855f7]/60 shadow-[0_0_40px_rgba(168,85,247,0.2)] group cursor-zoom-in' 
          : 'border-white/10'
      }`}
      onClick={isActive ? onClick : undefined}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Download button in GalleryCard */}
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(item.image, item.title);
            }}
            className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-black/60 border border-white/15 text-white hover:bg-[#ff9900] hover:text-black hover:scale-110 transition-all z-20 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Download image"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover select-none transition-all duration-700 ${
            isActive ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : 'opacity-40'
          }`}
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 pointer-events-none" />

        {/* Subtle details overlay removed per user request */}

        {/* Hover zoom icon */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Gallery: React.FC = () => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const rawRotation = useMotionValue(0);
  const rotation = useSpring(rawRotation, { damping: 25, stiffness: 120 });

  const filteredItems = GALLERY_ITEMS;
  const N = filteredItems.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update rotation based on scroll, touch swipe, or mouse drag gestures
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      rawRotation.set(rawRotation.get() + e.deltaY * -0.18);
    };

    let startY = 0;
    let startRotation = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startRotation = rawRotation.get();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      rawRotation.set(startRotation + deltaY * -0.6);
    };

    let isDragging = false;
    let dragStartY = 0;
    let dragStartRotation = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartY = e.clientY;
      dragStartRotation = rawRotation.get();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = dragStartY - e.clientY;
      rawRotation.set(dragStartRotation + deltaY * -0.6);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rawRotation]);

  useMotionValueEvent(rotation, "change", (latest) => {
    let minDistance = Infinity;
    let closestIndex = 0;
    for (let i = 0; i < N; i++) {
      const cardAngle = (((i * (360 / N) + latest) % 360) + 360) % 360;
      const dist = Math.min(cardAngle, 360 - cardAngle);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  });

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

  // Sleeker dimensions with more breathing room
  const radiusX = isMobile ? 140 : 430;
  const radiusY = isMobile ? 90 : 150;
  const cardWidth = isMobile ? 160 : 230;
  const cardHeight = isMobile ? 100 : 145;

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050713]">
      {/* Viewport content */}
      <div className="h-full w-full flex flex-col items-center justify-between pt-24 pb-8 select-none relative">
        
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Central heading - subtle and elegant */}
        <div className={`absolute flex flex-col items-center justify-center text-center pointer-events-none px-4 z-20 w-full left-1/2 -translate-x-1/2 ${isMobile ? 'top-20' : 'top-24 sm:top-32'}`}>
          <span className="text-[10px] sm:text-xs font-mono text-[#a855f7] uppercase tracking-widest mb-2 opacity-80">
            AWS SBG Ganpat University
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight max-w-sm sm:max-w-md md:max-w-2xl leading-tight uppercase">
            CAPTURING THE JOURNEY
          </h2>
        </div>

        {/* Ellipse Orbiting Gallery OR Bento Grid on Mobile */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 glass border border-white/5 rounded-2xl max-w-md mx-auto space-y-4 z-20 my-auto">
            <Compass className="w-12 h-12 text-[#a855f7] mx-auto animate-spin-slow" />
            <h3 className="text-lg font-bold text-white font-heading">No Media Located</h3>
            <p className="text-xs text-slate-400 font-sans">
              We haven't uploaded images yet. Check back soon!
            </p>
          </div>
        ) : isMobile ? (
          <div className="w-full h-full pt-32 pb-4 px-4 overflow-y-auto scrollbar-hide z-10 flex flex-col">
            <div className="grid grid-cols-2 gap-3 auto-rows-[140px] grid-flow-row-dense w-full pb-20">
              {filteredItems.map((item, index) => {
                const mod = index % 6;
                let spanClasses = "col-span-1 row-span-1";
                if (mod === 0) spanClasses = "col-span-2 row-span-2"; // Large hero
                else if (mod === 3) spanClasses = "col-span-1 row-span-2"; // Tall
                    
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 }}
                    onClick={() => setLightboxItem(item)}
                    className={`relative rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#a855f7]/60 shadow-lg ${spanClasses}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    {/* Text overlay removed per user request */}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div 
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="z-10 mt-8 mb-4 hidden md:flex"
          >
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                N={N}
                rotation={rotation}
                radiusX={radiusX}
                radiusY={radiusY}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                isActive={activeIndex === index}
                onClick={() => setLightboxItem(item)}
              />
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

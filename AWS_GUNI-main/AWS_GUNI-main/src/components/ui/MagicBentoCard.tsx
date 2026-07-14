/**
 * MagicBentoCard — applies MagicBento effects (spotlight, border glow,
 * particles, tilt, magnetism) to ANY children without touching the content.
 *
 * Usage:
 *   <MagicBentoCard className="your-existing-card-classes">
 *     {existing card content}
 *   </MagicBentoCard>
 *
 * Wrap the card grid with <MagicBentoGrid> to enable the shared spotlight.
 */
import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import './MagicBentoCard.css';

const PARTICLE_COUNT = 8;

// ─── Spotlight (one per grid) ────────────────────────────────────────────────

export const MagicBentoGrid = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'mbento-spotlight';
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll<HTMLElement>('.mbento-card');

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4 });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      // Move spotlight
      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
        opacity: 0.9,
      });

      // Update per-card glow position & intensity
      cards.forEach(card => {
        const cr = card.getBoundingClientRect();
        const relX = ((e.clientX - cr.left) / cr.width) * 100;
        const relY = ((e.clientY - cr.top) / cr.height) * 100;
        const centerX = cr.left + cr.width / 2;
        const centerY = cr.top + cr.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const maxD = Math.max(cr.width, cr.height);
        const intensity = Math.max(0, 1 - dist / (maxD * 1.2));

        card.style.setProperty('--glow-x', `${relX}%`);
        card.style.setProperty('--glow-y', `${relY}%`);
        card.style.setProperty('--glow-intensity', String(intensity));
      });
    };

    const onLeave = () => {
      if (spotlightRef.current)
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4 });
      gridRef.current
        ?.querySelectorAll<HTMLElement>('.mbento-card')
        .forEach(c => c.style.setProperty('--glow-intensity', '0'));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotlightRef.current?.remove();
    };
  }, []);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
};

// ─── Individual Card wrapper ─────────────────────────────────────────────────

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  enableParticles?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  enableBorderGlow?: boolean;
}

export const MagicBentoCard = ({
  children,
  className = '',
  style,
  enableParticles = true,
  enableTilt = false,
  enableMagnetism = true,
  enableBorderGlow = true,
}: MagicBentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hoveredRef = useRef(false);
  const magAnimRef = useRef<gsap.core.Tween | null>(null);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const { width, height } = el.getBoundingClientRect();

    Array.from({ length: PARTICLE_COUNT }).forEach((_, i) => {
      const t = setTimeout(() => {
        if (!hoveredRef.current || !cardRef.current) return;
        const p = document.createElement('div') as HTMLDivElement;
        p.className = 'mbento-particle';
        p.style.left = `${Math.random() * width}px`;
        p.style.top = `${Math.random() * height}px`;
        el.appendChild(p);
        particlesRef.current.push(p as unknown as HTMLElement);

        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(p, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(p, { opacity: 0.25, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 80);
      timersRef.current.push(t);
    });
  }, []);

  const clearParticles = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    magAnimRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, onComplete: () => (p as HTMLElement).remove() });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const el = cardRef.current;
    if (!el || isMobile) return;

    const onEnter = () => {
      hoveredRef.current = true;
      if (enableParticles) spawnParticles();
      if (enableTilt) gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };

    const onLeave = () => {
      hoveredRef.current = false;
      clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      if (enableTilt) {
        gsap.to(el, { rotateX: ((y - cy) / cy) * -8, rotateY: ((x - cx) / cx) * 8, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        magAnimRef.current = gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.3, ease: 'power2.out' });
      }
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      clearParticles();
    };
  }, [enableParticles, enableTilt, enableMagnetism, spawnParticles, clearParticles]);

  return (
    <div
      ref={cardRef}
      className={`mbento-card ${enableBorderGlow ? 'mbento-card--border-glow' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

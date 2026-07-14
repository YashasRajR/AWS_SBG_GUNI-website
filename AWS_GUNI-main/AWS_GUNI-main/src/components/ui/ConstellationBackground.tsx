import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalRadius: number;
}

export const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Configs
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 40; // mobile
      if (w < 1024) return 85; // tablet
      return 130; // desktop
    };

    const colors = [
      'rgba(255, 170, 0, 0.85)',  // Astrophage Gold
      'rgba(6, 182, 212, 0.85)',  // Eridian Teal
      'rgba(244, 244, 245, 0.65)',  // Star White-Zinc
      'rgba(14, 165, 233, 0.65)',   // Space Blue
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 0.8;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: radius,
          originalRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Radar scan variables
    let sweepAngle = 0;
    let sonarRadius1 = 0;
    let sonarRadius2 = 0;

    // Init
    resizeCanvas();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw space void backgrounds
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      grad.addColorStop(0, '#04050d'); // Void slate dark
      grad.addColorStop(1, '#010204'); // True space black void
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDist = Math.max(canvas.width, canvas.height);

      // 1. Draw Rotating Sonar Radar Line (Eridian sound navigation)
      sweepAngle += 0.0035;
      if (sweepAngle > Math.PI * 2) sweepAngle = 0;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(sweepAngle) * maxDist, centerY + Math.sin(sweepAngle) * maxDist);
      
      // Gradient stroke for sweeping arm fade
      const lineGrad = ctx.createLinearGradient(
        centerX, centerY, 
        centerX + Math.cos(sweepAngle) * maxDist * 0.8, centerY + Math.sin(sweepAngle) * maxDist * 0.8
      );
      lineGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      lineGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 2. Draw Expanding Sonar Wave Circles (Rocky's vocalization waves)
      sonarRadius1 += 1.2;
      if (sonarRadius1 > maxDist * 0.75) sonarRadius1 = 0;
      
      sonarRadius2 = sonarRadius1 - (maxDist * 0.35);
      
      [sonarRadius1, sonarRadius2].forEach((r) => {
        if (r > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          const alpha = Math.max(0, 0.08 * (1 - r / (maxDist * 0.75)));
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      });

      const mouse = mouseRef.current;
      const connectionDist = 115;
      const mouseDist = 170;

      // Update and draw particles (Astrophage cell models)
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundary
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interactive mouse gravity effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseDist) {
            const force = (mouseDist - dist) / mouseDist;
            p.x += (dx / dist) * force * 0.6;
            p.y += (dy / dist) * force * 0.6;
            
            // Expand slightly due to "Astrophage energy storage" on touch
            p.radius = p.originalRadius + force * 2.0;
          } else {
            // Restore size
            if (p.radius > p.originalRadius) p.radius -= 0.1;
          }
        } else {
          // Restore size
          if (p.radius > p.originalRadius) p.radius -= 0.1;
        }

        // Faint ambient light glow on particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.25;
            
            // Decide line color based on particles: Teal or Gold
            let strokeColor = `rgba(6, 182, 212, ${alpha})`; // Eridian Teal line
            if (p1.color.includes('255, 170') || p2.color.includes('255, 170')) {
              strokeColor = `rgba(255, 170, 0, ${alpha})`; // Astrophage Gold line
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDist) {
            const alpha = (1 - dist / mouseDist) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 170, 0, ${alpha})`; // Golden threads
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

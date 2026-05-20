'use client';

import { useEffect, useRef } from 'react';

export function triggerStarGlow(x: number, y: number, active: boolean) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('star-glow', { detail: { x, y, active } }));
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let targetX = width / 2;
    let targetY = height / 2;
    let isHovering = false;
    let animationFrameId: number;

    const handleGlowEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      targetX = customEvent.detail.x;
      targetY = customEvent.detail.y;
      isHovering = customEvent.detail.active;
    };
    
    window.addEventListener('star-glow', handleGlowEvent);

    const stars: { x: number, y: number, baseRadius: number, radius: number, speedX: number, speedY: number, alpha: number, originalX: number, originalY: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
        baseRadius: Math.random() * 1.2 + 0.2,
        radius: Math.random() * 1.2 + 0.2,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.8 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      bgGrad.addColorStop(0, 'rgba(5, 5, 5, 0.9)');
      bgGrad.addColorStop(1, 'rgba(2, 0, 10, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(s => {
        // Natural drift
        s.originalX += s.speedX;
        s.originalY += s.speedY;

        if (s.originalX < 0) s.originalX = width;
        if (s.originalX > width) s.originalX = 0;
        if (s.originalY < 0) s.originalY = height;
        if (s.originalY > height) s.originalY = 0;

        let currentAlpha = s.alpha;
        let currentRadius = s.baseRadius;

        if (isHovering) {
          const dx = s.originalX - targetX;
          const dy = s.originalY - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 400) {
            const pullForce = 1 - Math.pow(dist / 400, 2);
            // Gravitational pull towards mouse
            s.x = s.originalX - dx * pullForce * 0.3;
            s.y = s.originalY - dy * pullForce * 0.3;
            
            // Energy surge (scale and glow)
            currentAlpha = Math.min(1, s.alpha + pullForce * 0.9);
            currentRadius = s.baseRadius + pullForce * 2.5;
          } else {
             // Snap back to drift
            s.x += (s.originalX - s.x) * 0.1;
            s.y += (s.originalY - s.y) * 0.1;
          }
        } else {
          // Return to normal
          s.x += (s.originalX - s.x) * 0.05;
          s.y += (s.originalY - s.y) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, currentRadius, 0, Math.PI * 2);
        
        if (isHovering && currentRadius > s.baseRadius * 1.5) {
           ctx.shadowBlur = 20;
           ctx.shadowColor = 'rgba(183, 110, 121, 0.9)'; // Rose gold/Crimson glow
           ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        } else {
           ctx.shadowBlur = Math.random() > 0.95 ? 4 : 0;
           ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
           ctx.fillStyle = `rgba(220, 220, 240, ${currentAlpha})`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; 
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('star-glow', handleGlowEvent);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-2] pointer-events-none mix-blend-screen opacity-50" />;
}

'use client';

import { useEffect, useRef, useState } from 'react';

export function AtmosphereChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Deep luxury particles - slow, deliberate, minimal
    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Rose gold and Ivory mix
        ctx.fillStyle = `rgba(229, 228, 226, ${p.opacity})`; 
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(183, 110, 121, 0.2)';
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Background Gradient Base */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Deep Oxblood/Crimson Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(94,0,8,0.15)_0%,transparent_70%)] blur-3xl opacity-60 mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.05)_0%,transparent_70%)] blur-3xl opacity-40 mix-blend-screen" />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-50 mix-blend-screen" />
      
      {/* Global noise layer */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </div>
  );
}

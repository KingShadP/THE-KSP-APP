'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';

interface HolographicCardProps {
  artifactId: string;
  title: string;
  subtitle: string;
  src: string;
}

export function HolographicCard({ artifactId, title, subtitle, src }: HolographicCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const glareX = useTransform(mouseX, [0, 1], [-50, 150]);
  const glareY = useTransform(mouseY, [0, 1], [-50, 150]);
  
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }
  
  function handlePointerLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div 
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-[3/4] w-full max-w-sm rounded-[2px] bg-[var(--color-velvet-dark)] p-5 artifact-frame group shadow-[0_30px_60px_rgba(5,0,1,0.6)]"
    >
      {/* Volumetric Specular Glare */}
      <motion.div 
        className="absolute inset-0 z-50 rounded-[2px] pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(183, 110, 121, 0.4) 0%, rgba(229, 228, 226, 0.1) 20%, transparent 60%)`
          )
        }}
      />
      
      {/* Structural Border Shimmer */}
      <div className="absolute inset-0 z-40 rounded-[2px] pointer-events-none border border-[var(--color-platinum)]/5 group-hover:border-[var(--color-rosegold)]/40 transition-colors duration-1000" />
      
      {/* Recessed Artifact Image Container */}
      <div 
        className="relative w-full h-[65%] overflow-hidden border border-[var(--color-platinum)]/10 group-hover:border-[var(--color-rosegold)]/20 transition-colors duration-700 bg-[var(--color-void)]" 
        style={{ transform: "translateZ(20px)" }}
      >
        <Image 
          src={src} 
          fill 
          alt={title} 
          className="object-cover opacity-50 mix-blend-lighten grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
        />
        {/* Physical Shadow Box Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,0,1,0.95)] pointer-events-none" />
      </div>
      
      {/* Editorial Typography (Floating) */}
      <div className="mt-10 flex flex-col items-center text-center w-full" style={{ transform: "translateZ(35px)" }}>
         <div className="w-full flex items-center justify-center gap-3 mb-4 opacity-70">
           <span className="w-4 h-px bg-[var(--color-rosegold)]" />
           <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--color-rosegold)]">Relic {artifactId}</span>
           <span className="w-4 h-px bg-[var(--color-rosegold)]" />
         </div>
         <h3 className="font-playfair text-3xl font-black italic text-[var(--color-platinum)] tracking-widest leading-none drop-shadow-lg">{title}</h3>
         <p className="font-sans text-[10px] tracking-[0.4em] text-[var(--color-platinum)]/40 mt-4 uppercase font-light">{subtitle}</p>
      </div>

      {/* Mounting Hardware Accents */}
      <div className="absolute top-3 left-3 w-3 h-px bg-[var(--color-platinum)]/30" />
      <div className="absolute top-3 left-3 w-px h-3 bg-[var(--color-platinum)]/30" />
      <div className="absolute bottom-3 right-3 w-3 h-px bg-[var(--color-platinum)]/30" />
      <div className="absolute bottom-3 right-3 w-px h-3 bg-[var(--color-platinum)]/30" />
    </motion.div>
  )
}

'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { triggerStarGlow } from './Starfield';

const images = Array.from({ length: 38 }, (_, i) => `/gallery-${i}.png`);

// Helper to shuffle the array
const shuffle = (array: string[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Create a massive pool of images
const massivePool = shuffle([...images, ...images, ...images]);

const track1 = massivePool.slice(0, 25);
const track2 = massivePool.slice(25, 50);

export default function ShootingStarGalleria() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="relative w-full py-32 overflow-hidden bg-[var(--color-void)]/50 border-t border-[var(--color-platinum)]/5 backdrop-blur-sm z-20"
      onMouseLeave={() => triggerStarGlow(0, 0, false)}
    >
      <div className="scanlines"></div>
      <div className="scanlines-animated"></div>
      
      <div className="px-6 md:px-16 mb-20 flex flex-col items-center text-center relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-[var(--color-rosegold)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-[var(--color-rosegold)]">Archive Viewer</span>
          <span className="w-8 h-px bg-[var(--color-rosegold)]" />
        </div>
        
        <h2 className="font-playfair text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--color-platinum)]">
          Shooting Star Galleria.
        </h2>
        <p className="font-sans text-sm md:text-base text-[var(--color-platinum)]/50 leading-relaxed font-light mt-8 max-w-lg">
          The visual cosmos. Artifacts and moments captured in transit. Hover to interact with the gravitational structure.
        </p>
      </div>

      <div className="relative flex flex-col gap-10 w-full mask-edges">
        {/* Left and Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-[10%] md:w-[20%] bg-gradient-to-r from-[var(--color-void)] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[10%] md:w-[20%] bg-gradient-to-l from-[var(--color-void)] to-transparent z-20 pointer-events-none" />

        <GalleriaTrack items={track1} direction="left" speed={70} />
        <GalleriaTrack items={track2} direction="right" speed={85} />
      </div>
    </div>
  );
}

function GalleriaTrack({ items, direction, speed }: { items: string[], direction: 'left' | 'right', speed: number }) {
  // Duplicate items for infinite scroll
  const scrollItems = [...items, ...items];
  
  return (
    <div className="flex w-full overflow-hidden shrink-0 group">
      <motion.div
        className="flex gap-10 shrink-0"
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {scrollItems.map((src, i) => (
           <div 
            key={`${src}-${i}`} 
            className="group/img relative shrink-0 w-[200px] md:w-[320px] aspect-[4/5] overflow-hidden rounded-[2px] border border-[var(--color-platinum)]/10 hover:border-[var(--color-rosegold)]/40 transition-colors duration-700 bg-[var(--color-velvet-dark)] shadow-[0_10px_30px_rgba(5,0,1,0.5)]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              triggerStarGlow(e.clientX, e.clientY, true);
            }}
            onMouseLeave={() => triggerStarGlow(0, 0, false)}
          >
            <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-[var(--color-crimson)]/50 via-transparent to-transparent z-10 pointer-events-none mix-blend-color-dodge" />
            
            <Image
              src={`https://picsum.photos/seed/${src.replace(/[^0-9]/g, '')}/400/500`}
              fill
              alt={`Gallery Artifact ${i}`}
              className="object-cover opacity-40 group-hover/img:opacity-90 transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-105 group-hover/img:-translate-y-2 grayscale group-hover/img:grayscale-0 filter"
              referrerPolicy="no-referrer"
            />
            {/* Hardware Corner Marks */}
            <div className="absolute top-3 left-3 w-2 h-px bg-[var(--color-platinum)]/30 z-20" />
            <div className="absolute top-3 left-3 w-px h-2 bg-[var(--color-platinum)]/30 z-20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

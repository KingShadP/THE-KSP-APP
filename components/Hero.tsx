'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });
  
  // Create a deep, heavy parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Heavy textured background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1590518335345-31295e8fb7a3?q=80&w=2500&auto=format&fit=crop"
          alt="Monolith Texture"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover opacity-[0.25] mix-blend-luminosity grayscale contrast-150"
        />
        {/* Core lighting masking */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,0,8,0.15)_0%,rgba(5,5,5,1)_70%)] z-10" />
      </motion.div>

      {/* Main typographic composition */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-6"
      >
        <div className="flex items-center gap-6 mb-12 opacity-80">
           <span className="w-8 h-px bg-[#B76E79]/40" />
           <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-[#B76E79]">
             The Creator // The Create
           </span>
           <span className="w-8 h-px bg-[#B76E79]/40" />
        </div>
        
        <h1 className="font-serif text-[clamp(4rem,14vw,18rem)] font-bold italic leading-[0.75] tracking-tighter text-[#E5E4E2] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mix-blend-plus-lighter select-none text-center">
          KINGSHADP
        </h1>
        
        <p className="mt-20 max-w-sm text-center font-sans text-xs md:text-sm font-light leading-relaxed text-[#E5E4E2]/50">
          This is an archive. Establish your standard. Proceed with absolute certainty.
        </p>
      </motion.div>

      {/* Structured scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-32 bg-[#E5E4E2]/5 overflow-hidden z-20">
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#E5E4E2]/50 to-transparent"
        />
      </div>
    </section>
  );
}

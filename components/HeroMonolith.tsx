'use client';

import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'motion/react';

export function HeroMonolith({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // Use scale and y transformations linked to scroll for parallax weight
  const y = useTransform(scrollProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.1]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Deep Image */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 origin-center select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,0,8,0.15)_0%,transparent_60%)] z-10 mix-blend-screen" />
        <Image 
          src="https://images.unsplash.com/photo-1590518335345-31295e8fb7a3?q=80&w=2500&auto=format&fit=crop" 
          alt="Monolith Texture"
          fill
          referrerPolicy="no-referrer"
          className="object-cover opacity-30 mix-blend-luminosity grayscale"
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center justify-center w-full px-8"
      >
        <span className="font-mono text-[9px] tracking-[0.6em] text-[#B76E79] uppercase mb-12 flex items-center gap-6">
          <span className="w-12 h-px bg-[#B76E79]/50" />
          The Creator // The Create
          <span className="w-12 h-px bg-[#B76E79]/50" />
        </span>
        
        <h1 className="font-serif text-[clamp(3.5rem,12vw,14rem)] leading-[0.8] tracking-tighter text-[#E5E4E2] text-center w-full flex flex-col md:block items-center relative mix-blend-plus-lighter">
          <span className="relative z-10 uppercase block">KINGSHADP</span>
        </h1>

        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5E4E2]/50">
            Establish Presence. Archive Legacy.
          </div>
          
          {/* Scroll Indicator */}
          <div className="w-px h-24 bg-gradient-to-b from-[#E5E4E2]/20 to-transparent relative mt-8">
            <motion.div 
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-[#E5E4E2] to-transparent"
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

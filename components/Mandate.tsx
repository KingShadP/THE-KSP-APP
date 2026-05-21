'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Mandate() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);

  return (
    <section className="relative w-full bg-[#050505] pt-32 pb-48 z-20">
      {/* Subtle border to define the structural boundary */}
      <div className="absolute top-0 left-12 right-12 md:left-24 md:right-24 h-px bg-gradient-to-r from-transparent via-[#E5E4E2]/10 to-transparent" />

      <motion.div 
        ref={ref}
        style={{ opacity, y }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8"
      >
        {/* Left Column: Title & Designation */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-[#B76E79] rounded-full" />
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#B76E79]">Doctrine 01</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#E5E4E2] leading-[1.1] tracking-tight">
            The Architecture<br />of Identity.
          </h2>
        </div>

        {/* Middle Gutter */}
        <div className="hidden md:block md:col-span-1" />

        {/* Right Column: Statement & List */}
        <div className="md:col-span-6 flex flex-col gap-12 font-sans md:pt-16">
          <div className="text-sm md:text-base leading-relaxed text-[#E5E4E2]/70 font-light space-y-6">
            <p>
              We reject the transient nature of modern merchandise. What is forged here is meant to be archived, inherited, and deeply felt. Every piece constructed within this vault is a wearable artifact—evidence pulled from a private mythology, designed to enforce standard and demand presence.
            </p>
            <p>
              This is not a label. It is a ledger.
            </p>
          </div>

          {/* The Mandates structure */}
          <div className="flex flex-col gap-6 pt-12 border-t border-[#E5E4E2]/10">
            <div className="flex items-start gap-6 group">
              <span className="font-mono text-[10px] text-[#B76E79] pt-1 transition-colors">I.</span>
              <p className="text-sm tracking-wide text-[#E5E4E2]/60 group-hover:text-[#E5E4E2] transition-colors duration-500">
                Command complete attention without ever needing to raise your voice.
              </p>
            </div>
            <div className="flex items-start gap-6 group">
              <span className="font-mono text-[10px] text-[#B76E79] pt-1 transition-colors">II.</span>
              <p className="text-sm tracking-wide text-[#E5E4E2]/60 group-hover:text-[#E5E4E2] transition-colors duration-500">
                Treat the vessel as structural luxury. Every seam must have intent.
              </p>
            </div>
            <div className="flex items-start gap-6 group">
              <span className="font-mono text-[10px] text-[#B76E79] pt-1 transition-colors">III.</span>
              <p className="text-sm tracking-wide text-[#E5E4E2]/60 group-hover:text-[#E5E4E2] transition-colors duration-500">
                Maintain the distance. Curate the presence.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

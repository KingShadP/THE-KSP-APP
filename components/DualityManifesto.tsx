'use client';

import { motion, MotionValue, useTransform } from 'motion/react';

export function DualityManifesto({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const yOffset = useTransform(scrollProgress, [0.1, 0.4], [100, 0]);
  const opacity = useTransform(scrollProgress, [0.1, 0.3], [0, 1]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-32 px-8 z-20 bg-[#050505]">
      {/* Texture boundary */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050505] -translate-y-full pointer-events-none" />
      
      <motion.div 
        style={{ y: yOffset, opacity }}
        className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32"
      >
        {/* Left Column: The Concept */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#5E0008] uppercase">Origin</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#E5E4E2] tracking-tighter leading-tight">
              The architecture of identity.
            </h2>
          </div>
          
          <div className="space-y-8 font-sans text-sm md:text-base leading-relaxed text-[#E5E4E2]/60 font-light">
            <p>
              This is not a label. It is a ledger. Every piece constructed within this vault is a wearable artifact—evidence pulled from a private mythology, designed to enforce standard and demand presence.
            </p>
            <p>
              We reject the transient nature of modern merchandise. What is forged here is meant to be archived, inherited, and deeply felt. 
            </p>
          </div>
        </div>

        {/* Right Column: The Mandate */}
        <div className="flex flex-col justify-end pt-12 md:pt-32">
          <div className="border-l border-[#B76E79]/30 pl-8 pb-8 relative">
            {/* Corner accent */}
            <div className="absolute top-0 left-[-2px] w-[3px] h-4 bg-[#B76E79]" />
            <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#B76E79]/30" />

            <h3 className="font-mono text-[12px] tracking-[0.3em] uppercase text-[#E5E4E2] mb-6">
              The Mandate
            </h3>
            
            <ul className="space-y-6 font-serif text-lg text-[#E5E4E2]/80 italic">
              <li className="flex gap-4">
                <span className="text-[#5E0008] not-italic text-sm pt-1">I.</span>
                <span>Command completely without raising your voice.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#5E0008] not-italic text-sm pt-1">II.</span>
                <span>Treat the vessel as structural luxury.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#5E0008] not-italic text-sm pt-1">III.</span>
                <span>Maintain the distance. Curate the presence.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Editorial() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });
  
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);

  return (
      <section ref={ref} className="bg-[#050505] py-32 md:py-48 px-6 md:px-12 lg:px-24 text-[#E5E4E2] border-t border-[#E5E4E2]/5 relative z-20">
        <motion.div style={{ opacity, y }} className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-6 items-start">
            
            {/* The Header / Title */}
            <div className="md:col-span-5 flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#5E0008] border-b border-[#5E0008]/30 pb-4 mb-8 w-fit">
                Design Architecture
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight">
                Standards dictated,<br />never requested.
              </h2>
            </div>

            <div className="md:col-span-1 hidden md:block" />

            {/* The Prose / Body */}
            <div className="md:col-span-6 font-sans text-sm md:text-base font-light leading-relaxed text-[#E5E4E2]/60 flex flex-col gap-8 md:pt-16">
              <p>
                The central duality is <span className="text-[#E5E4E2] font-medium">The Creator // The Create</span>. This space is not designed to distribute merchandise. It is constructed entirely to archive modern relics.
              </p>
              <p>
                What exists here relies on high-end structural styling. We rely on the absolute authority of negative space. We strip away the loud, the desperate, and the generic. Everything that remains is deliberate, commanding, and absolute. 
              </p>
              
              <div className="pt-12 mt-4 border-t border-[#E5E4E2]/10 flex flex-col gap-6">
                <div className="flex items-start gap-6 group">
                  <span className="font-serif italic text-lg text-[#B76E79] group-hover:text-[#E5E4E2] transition-colors">I.</span>
                  <span className="tracking-wide text-[#E5E4E2]/80 group-hover:text-[#E5E4E2] transition-colors">Command undeniable presence completely without raising your voice.</span>
                </div>
                <div className="flex items-start gap-6 group">
                  <span className="font-serif italic text-lg text-[#B76E79] group-hover:text-[#E5E4E2] transition-colors">II.</span>
                  <span className="tracking-wide text-[#E5E4E2]/80 group-hover:text-[#E5E4E2] transition-colors">Treat every garment as an artifact; an heirloom built to outlast its era.</span>
                </div>
              </div>
            </div>
            
        </motion.div>
      </section>
  )
}

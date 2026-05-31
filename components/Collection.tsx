'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const ARCHIVE = [
  {
    id: "V-01",
    title: "OBSIDIAN MANTLE",
    material: "HEAVYWEIGHT COTTON // SILK LINING",
    img: "/spsh1.png"
  },
  {
    id: "V-02",
    title: "PLATINUM CREST RING",
    material: "SOLID PLATINUM // OXBLOOD ENAMEL",
    img: "1609174112101-799ff48e583d"
  },
  {
    id: "V-03",
    title: "THE VAULT TRENCH",
    material: "WAXED CANVAS // ROSE GOLD HARDWARE",
    img: "1550614000-4b95d4ebfaaa"
  }
];

export function Collection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#050505] py-32 md:py-48 text-[#E5E4E2] border-t border-[#E5E4E2]/5 relative z-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 bg-[#B76E79] rounded-full" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B76E79]">The Reliquary</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter uppercase leading-[0.9]">
              Wearable<br />
              <span className="italic text-[#E5E4E2]/30">Artifacts</span>
            </h2>
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#E5E4E2]/40 max-w-[240px] md:text-right leading-relaxed">
            Physical anchors of the core identity. Maintained strictly in the archive.
          </p>
        </div>

        {/* List Grid */}
        <div className="flex flex-col border-t border-[#E5E4E2]/10 relative">
          {ARCHIVE.map((item, idx) => (
            <div 
              key={item.id}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              data-cursor="view"
              className="group flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#E5E4E2]/10 py-16 transition-colors hover:bg-[#E5E4E2]/[0.02] cursor-none"
            >
              {/* Info Column */}
              <div className="flex w-full lg:w-7/12 items-start lg:items-center gap-8 lg:gap-16">
                <span className="font-mono text-xs text-[#5E0008] transition-colors group-hover:text-[#B76E79] pt-2 lg:pt-0">
                  0{idx + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-[#E5E4E2]/80 transition-colors group-hover:text-white">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#E5E4E2]/30 uppercase lg:hidden block">
                    {item.material}
                  </span>
                </div>
              </div>
              
              {/* Action Column */}
              <div className="mt-8 lg:mt-0 flex w-full lg:w-5/12 items-center justify-between lg:justify-end lg:gap-16">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#E5E4E2]/40 hidden lg:block max-w-[180px] text-right">
                  {item.material}
                </span>
                <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#050505] bg-[#E5E4E2] hover:bg-[#B76E79] hover:text-white px-8 py-4 transition-colors duration-500">
                  Acquire
                </button>
              </div>
            </div>
          ))}

          {/* Floating Image Reveal (Desktop Only) */}
          <div className="pointer-events-none absolute right-[5%] top-1/2 hidden h-[500px] w-[340px] -translate-y-1/2 overflow-hidden lg:block z-20 perspective-1000">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={ARCHIVE[hovered].id}
                  initial={{ opacity: 0, y: 30, rotateY: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                >
                    <Image
                      src={`https://picsum.photos/seed/${ARCHIVE[hovered].id}/800/800`}
                      alt={ARCHIVE[hovered].title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover grayscale brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 border border-[#E5E4E2]/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[#5E0008]/5 mix-blend-screen" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

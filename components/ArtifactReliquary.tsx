'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';

const ARTIFACTS = [
  {
    id: "VAULT-001",
    title: "OBSIDIAN MANTLE",
    material: "HEAVYWEIGHT COTTON / SILK LINING",
    edition: "1 OF 50",
    image: "1590453535970-17e9bb763ee9",
    description: "A structural silhouette designed to cast a shadow before you enter the room. Matte black with crimson interior bindings."
  },
  {
    id: "VAULT-002",
    title: "CREST INSIGNIA RING",
    material: "SOLID PLATINUM / OXBLOOD ENAMEL",
    edition: "1 OF 25",
    image: "1609174112101-799ff48e583d",
    description: "The primary seal. Heavy cast platinum featuring the SP crest embedded in deep oxblood enamel. Worn on the index."
  },
  {
    id: "VAULT-003",
    title: "THE PORTAL TRENCH",
    material: "WAXED CANVAS / ROSÉ COPPER HARDWARE",
    edition: "1 OF 15",
    image: "1550614000-4b95d4ebfaaa",
    description: "An armored layer. Deflects weather and attention equally. Custom rose gold hardware engineered to acquire a patina over decades."
  }
];

export function ArtifactReliquary() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505] z-30 flex flex-col items-center border-t border-[#E5E4E2]/5">
      
      <div className="w-full max-w-[1600px] mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-4 mb-6">
             <div className="w-1.5 h-1.5 bg-[#B76E79] rounded-full" />
             <span className="font-mono text-[9px] tracking-[0.5em] text-[#B76E79] uppercase">The Reliquary</span>
           </div>
           <h2 className="font-serif text-5xl md:text-7xl text-[#E5E4E2] tracking-tighter uppercase leading-[0.9]">
             Artifacts
             <br />
             <span className="text-[#E5E4E2]/30 italic">Acquisition</span>
           </h2>
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5E4E2]/40 uppercase text-right max-w-xs">
          Physical anchors of the core identity. Access is restricted to availability.
        </div>
      </div>

      {/* Artifact List View */}
      <div className="w-full max-w-[1600px] flex flex-col border-t border-[#E5E4E2]/10">
        {ARTIFACTS.map((artifact, i) => (
          <div 
            key={artifact.id}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 md:py-16 border-b border-[#E5E4E2]/10 cursor-pointer overflow-hidden"
          >
            {/* Hover Background Injection */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#110002] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Left Data */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-24 relative z-10 w-full lg:w-7/12">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#5E0008] transition-colors group-hover:text-[#B76E79]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-3xl md:text-5xl text-[#E5E4E2] uppercase tracking-tight group-hover:text-white transition-colors duration-500">
                  {artifact.title}
                </h3>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#E5E4E2]/40 uppercase">
                  {artifact.id} // {artifact.edition}
                </span>
              </div>
            </div>

            {/* Right Meta/Action */}
            <div className="flex flex-row items-center justify-between w-full lg:w-5/12 mt-8 lg:mt-0 relative z-10">
               <div className="font-sans text-xs text-[#E5E4E2]/50 uppercase tracking-widest max-w-[200px] hidden md:block">
                 {artifact.material}
               </div>

               <MagneticButton strength={20}>
                 <div className="w-12 h-12 rounded-full border border-[#E5E4E2]/20 flex items-center justify-center group-hover:border-[#B76E79] group-hover:bg-[#B76E79]/10 transition-all duration-500">
                   <div className="w-1 h-1 bg-[#E5E4E2]/50 rounded-full group-hover:bg-[#B76E79] transition-colors duration-500 group-hover:scale-150" />
                 </div>
               </MagneticButton>
            </div>

            {/* Image Reveal attached to cursor conceptually, but positioned fixed for stability */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vh] aspect-[3/4] pointer-events-none z-0 hidden lg:block perspective-1000">
              <AnimatePresence>
                {hoveredNode === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15, x: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 10 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full border border-[#E5E4E2]/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    <div className="absolute inset-0 bg-[#050505]/40 mix-blend-overlay z-10" />
                    <Image 
                      src={`https://images.unsplash.com/photo-${artifact.image}?q=80&w=800&auto=format&fit=crop`} 
                      alt={artifact.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover grayscale brightness-75 contrast-125 scale-105"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24">
        <MagneticButton strength={30}>
          <button className="px-12 py-5 font-mono text-[10px] tracking-[0.4em] uppercase text-[#050505] bg-[#E5E4E2] hover:bg-white transition-colors duration-500 relative overflow-hidden group cursor-pointer shadow-[0_0_30px_rgba(229,228,226,0.1)]">
            <span className="relative z-10">Request Vault Access</span>
            <div className="absolute inset-0 bg-[#B76E79] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
            <span className="relative z-10 block opacity-0 group-hover:opacity-100 text-white absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">Request Vault Access</span>
          </button>
        </MagneticButton>
      </div>

    </section>
  );
}

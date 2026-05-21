'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const ARTIFACTS = [
  {
    id: "VAULT-001",
    title: "OBSIDIAN MANTLE",
    material: "HEAVYWEIGHT COTTON // SILK LINING",
    edition: "1 OF 50",
    image: "1590453535970-17e9bb763ee9"
  },
  {
    id: "VAULT-002",
    title: "THE PRIME CREST",
    material: "SOLID PLATINUM // OXBLOOD ENAMEL",
    edition: "1 OF 25",
    image: "1609174112101-799ff48e583d"
  },
  {
    id: "VAULT-003",
    title: "THE PORTAL TRENCH",
    material: "WAXED CANVAS // ROSE COPPER HARDWARE",
    edition: "1 OF 15",
    image: "1550614000-4b95d4ebfaaa"
  }
];

export function Reliquary() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<typeof ARTIFACTS[number] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveArtifact(null);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-48 z-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 bg-[#B76E79] rounded-full" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B76E79]">The Reliquary</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter uppercase leading-[0.9] text-[#E5E4E2]">
              Physical<br />
              <span className="italic text-[#E5E4E2]/30">Artifacts</span>
            </h2>
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#E5E4E2]/40 max-w-[240px] md:text-right leading-relaxed">
            Physical anchors of the core identity. Access is restricted to availability.
          </p>
        </div>

        {/* List Layout with Image Reveal */}
        <div className="relative border-t border-[#E5E4E2]/10 group/list">
           {ARTIFACTS.map((artifact, i) => (
             <div 
               key={artifact.id}
               data-cursor="acquire"
               className="group flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#E5E4E2]/10 py-12 md:py-16 transition-colors duration-500 hover:bg-[#E5E4E2]/[0.02] cursor-none"
               onMouseEnter={() => setHoveredIdx(i)}
               onMouseLeave={() => setHoveredIdx(null)}
               onClick={() => setActiveArtifact(artifact)}
             >
                {/* Left Data Column */}
                <div className="flex w-full lg:w-7/12 items-start lg:items-center gap-8 lg:gap-16">
                   <div className="font-mono text-xs text-[#5E0008] transition-colors duration-500 group-hover:text-[#B76E79] pt-2 lg:pt-0">
                     (0{i + 1})
                   </div>
                   <div className="flex flex-col gap-3">
                     <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-[#E5E4E2]/80 transition-colors duration-500 group-hover:text-white relative z-10 mix-blend-difference">
                       {artifact.title}
                     </h3>
                     <span className="font-mono text-[9px] tracking-[0.3em] text-[#E5E4E2]/40 uppercase lg:hidden block">
                       {artifact.id} {`//`} {artifact.edition}
                     </span>
                   </div>
                </div>

                {/* Right Meta Column */}
                <div className="mt-8 lg:mt-0 flex w-full lg:w-5/12 items-center justify-between lg:justify-end lg:gap-16 relative z-10">
                   <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#E5E4E2]/40 hidden lg:block text-right">
                     MATERIAL :<br/>
                     <span className="text-[#E5E4E2]/80">{artifact.material}</span>
                   </div>
                   <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#050505] bg-[#E5E4E2] px-8 py-4 opacity-100 lg:opacity-0 scale-100 lg:scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 cursor-none">
                     Acquire
                   </button>
                </div>

                {/* Desktop Absolute Image Reveal */}
                <div className="absolute right-0 md:right-32 top-1/2 -translate-y-1/2 w-[30vh] aspect-[3/4] pointer-events-none hidden lg:block z-0 perspective-1000">
                  <AnimatePresence>
                    {hoveredIdx === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10, x: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 10 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full border border-[#E5E4E2]/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                      >
                         <Image 
                           src={`https://images.unsplash.com/photo-${artifact.image}?q=80&w=800&auto=format&fit=crop`}
                           alt={artifact.title}
                           fill
                           referrerPolicy="no-referrer"
                           className="object-cover grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-[2s]"
                         />
                         <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/40 mix-blend-overlay" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </div>
           ))}
        </div>
        
      </div>

      {/* Luxury Cinematic Acquisition Dialog Modal */}
      <AnimatePresence>
        {activeArtifact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-6 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[640px] bg-[#050505] border border-[#E5E4E2]/15 p-8 md:p-16 relative"
            >
              <button 
                onClick={() => setActiveArtifact(null)}
                className="absolute top-8 right-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E5E4E2]/50 hover:text-white transition-colors cursor-none"
              >
                [ Close ]
              </button>

              <div className="mb-12">
                <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-[#93000a] block mb-2">
                  PROTOCOL: ACQUISITION_REQUEST
                </span>
                <h3 className="font-serif text-3xl uppercase tracking-tight text-[#E5E4E2]">
                  {activeArtifact.title}
                </h3>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E4E2]/40 mt-1">
                  Edition: {activeArtifact.edition} {`//`} {activeArtifact.id}
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-6">
                  <div className="w-12 h-12 bg-none border border-[#93000a] flex items-center justify-center rotate-45">
                    <div className="w-2 h-2 bg-[#93000a] rounded-none" />
                  </div>
                  <p className="font-serif italic text-lg text-[#dcc57b]">
                     Transmission Complete.
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E5E4E2]/40 max-w-xs">
                     Our archival curators will verify credentials and contact you directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/50">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-[#0c0c0c] border border-[#E5E4E2]/10 p-4 font-sans text-xs tracking-wide text-[#E5E4E2] focus:outline-none focus:border-[#93000a] transition-colors rounded-none"
                      placeholder="ENTER FULL LEGAL NAME"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/50">Digital Coordinates</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-[#0c0c0c] border border-[#E5E4E2]/10 p-4 font-sans text-xs tracking-wide text-[#E5E4E2] focus:outline-none focus:border-[#93000a] transition-colors rounded-none"
                      placeholder="ENTER EMAIL ADDRESS"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/50">Intent / Message</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-[#0c0c0c] border border-[#E5E4E2]/10 p-4 font-sans text-xs tracking-wide text-[#E5E4E2] focus:outline-none focus:border-[#93000a] transition-colors rounded-none resize-none"
                      placeholder="STATE YOUR INTENT FOR THE ACQUISITION..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 bg-[#93000a] hover:bg-[#dcc57b] hover:text-[#050505] text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] py-5 transition-colors duration-500 rounded-none cursor-none"
                  >
                    Initiate Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

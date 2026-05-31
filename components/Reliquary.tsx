'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Radar } from './Radar';

const ARTIFACTS = [
  { id: 'VAULT-001', title: 'OBSIDIAN MANTLE', material: 'HEAVYWEIGHT COTTON // SILK LINING', edition: '1 of 50' },
  { id: 'VAULT-002', title: 'THE PRIME CREST', material: 'FORGED METALLIC // MATTE FINISH', edition: '1 of 25' },
  { id: 'VAULT-003', title: 'THE PORTAL TRENCH', material: 'OBSIDIAN THREAD', edition: '1 of 15' },
];

export function Reliquary() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<typeof ARTIFACTS[number] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined') {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    }
  };

  const generateSerialNumber = (id: string) => {
    const hex = Math.random().toString(16).slice(2, 8).toUpperCase();
    return `SP-${id}-${hex}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeArtifact) {
      setSerialNumber(generateSerialNumber(activeArtifact.id));
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveArtifact(null);
      setFormData({ name: '', email: '', message: '' });
      setSerialNumber("");
    }, 8000);
  };

  return (
    <section 
      className="relative w-full bg-[#050505] py-24 md:py-48 z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Radar />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#8A0F19] block mb-6">
            ARCHIVE // 002
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#E5E4E2] uppercase">
            Reliquary
          </h2>
        </div>

        {/* List */}
        <div className="flex flex-col relative z-20">
           {ARTIFACTS.map((artifact, i) => (
             <motion.div 
               key={artifact.id}
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
               data-cursor="acquire"
               className="group flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#E5E4E2]/10 py-12 md:py-16 transition-colors duration-500 hover:bg-[#E5E4E2]/[0.02]"
               onMouseEnter={() => setHoveredIdx(i)}
               onMouseLeave={() => setHoveredIdx(null)}
               onClick={() => setActiveArtifact(artifact)}
             >
                <div className="flex w-full lg:w-7/12 items-start lg:items-center gap-8 lg:gap-16">
                   <div className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 w-12 hidden md:block">
                     {String(i + 1).padStart(2, '0')}
                   </div>
                   <div className="flex flex-col">
                     <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-tight text-[#E5E4E2] group-hover:text-white transition-colors duration-500">
                       {artifact.title}
                     </h3>
                     <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E4E2]/40 mt-4 group-hover:text-[#E5E4E2]/60 transition-colors duration-500">
                       {artifact.id} // Edition: {artifact.edition}
                     </p>
                   </div>
                </div>

                <div className="mt-8 lg:mt-0 flex w-full lg:w-5/12 items-center justify-between lg:justify-end lg:gap-16 relative z-10">
                   <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#E5E4E2]/40 hidden lg:block text-right">
                     MATERIAL :<br/>
                     <span className="text-[#E5E4E2]/80">{artifact.material}</span>
                   </div>
                   <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#050505] bg-[#E5E4E2] px-8 py-4 opacity-100 lg:opacity-0 scale-100 lg:scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                     Acquire
                   </button>
                </div>

                {/* Animated Background Reveal Image */}
                <AnimatePresence>
                  {hoveredIdx === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] pointer-events-none z-0"
                    >
                      <motion.div 
                        animate={{ x: mousePos.x * -25, y: mousePos.y * -25 }}
                        transition={{ type: "spring", stiffness: 70, damping: 25 }}
                        className="absolute inset-[-10%] w-[120%] h-[120%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                      >
                         <Image 
                           src={`https://picsum.photos/seed/${artifact.id}/800/800`}
                           alt={artifact.title}
                           fill
                           referrerPolicy="no-referrer"
                           className="object-cover grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-[2s]"
                         />
                         <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/40 mix-blend-overlay" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </motion.div>
           ))}
        </div>
      </div>

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
              className="w-full max-w-[640px] bg-[#050505] border border-[#E5E4E2]/15 p-8 md:p-16 relative overflow-hidden"
            >
              <button 
                onClick={() => setActiveArtifact(null)}
                className="absolute top-8 right-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E5E4E2]/50 hover:text-[#8A0F19] transition-colors"
                data-cursor="pointer"
              >
                [ Close ]
              </button>

              <div className="mb-12">
                <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-[#8A0F19] block mb-2">
                  PROTOCOL: ACQUISITION_REQUEST
                </span>
                <h3 className="font-serif text-3xl uppercase tracking-tight text-[#E5E4E2]">
                  {activeArtifact.title}
                </h3>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center gap-8 relative z-10"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    <div className="absolute inset-0 bg-[#5E0008] rounded-full blur-[2px] shadow-[0_0_15px_rgba(138,15,25,0.6)]" />
                    <div className="absolute inset-1 bg-gradient-to-br from-[#8A0F19] to-[#5E0008] rounded-full border-[1.5px] border-[#dcc57b]/30" />
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="font-serif text-[#dcc57b] text-3xl leading-none">K</span>
                      <span className="font-mono text-[5px] text-[#dcc57b]/70 tracking-widest mt-1 uppercase">Seal</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <h4 className="font-serif italic text-2xl md:text-3xl text-[#E5E4E2]">
                       Certificate of Provenance
                    </h4>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#dcc57b]">
                       Archival Record Document
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 relative z-10 w-full text-left bg-[#0a0a0a]/50 border border-[#E5E4E2]/5 p-6">
                    <div>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-[#E5E4E2]/40 mb-1">Artifact</span>
                      <span className="font-sans text-sm tracking-widest text-[#E5E4E2] uppercase">{activeArtifact.title}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-[#E5E4E2]/40 mb-1">Serial Code</span>
                      <span className="font-mono text-sm tracking-widest text-[#8A0F19] bg-[#8A0F19]/10 px-2 py-1">{serialNumber}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/50">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-[#0c0c0c] border border-[#E5E4E2]/10 p-4 font-sans text-xs tracking-wide text-[#E5E4E2] focus:outline-none focus:border-[#8A0F19] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/50">Intent / Message</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-[#0c0c0c] border border-[#E5E4E2]/10 p-4 font-sans text-xs tracking-wide text-[#E5E4E2] focus:outline-none focus:border-[#8A0F19] transition-colors rounded-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    data-cursor="pointer"
                    className="mt-4 bg-[#8A0F19] hover:bg-[#dcc57b] hover:text-[#050505] text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] py-5 transition-colors duration-500 rounded-none"
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

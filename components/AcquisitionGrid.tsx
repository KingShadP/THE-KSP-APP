'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrambleText } from './ScrambleText';
import { Crosshair, Lock, ArrowUpRight, ShieldAlert, X } from 'lucide-react';
import { KineticText } from './KineticText';

const ASSETS = [
  {
    id: 'OBJ-01',
    name: '"STEALTH VESSEL"',
    specs: 'RADAR-ABSORBENT / 86M / HYBRID / CLASS 4',
    price: '€ 142.000.000',
    img: '1569085812234-fc03d368e592',
    fullSpecs: ['86M L.O.A.', 'Hybrid Propulsion', 'Radar-Absorbent Coating', 'Submersible Tender Bay', 'Class 4 EMP Shielding'],
    history: [{ year: '2022', val: '€ 130.5M' }, { year: '2024', val: '€ 138.0M' }, { year: 'CURRENT', val: '€ 142.0M' }]
  },
  {
    id: 'OBJ-02',
    name: '"TACTICAL AERO"',
    specs: 'G700 / COUNTERMEASURES / REFITTED',
    price: '€ 88.500.000',
    img: '1540962222-1f4cc06994fb',
    fullSpecs: ['Mach 0.925', 'Active Missile Countermeasures', 'Encrypted Comm Suite', 'Extended Range Tanks', 'Aural Signature Reduction'],
    history: [{ year: '2021', val: '€ 75.0M' }, { year: '2023', val: '€ 82.2M' }, { year: 'CURRENT', val: '€ 88.5M' }]
  },
  {
    id: 'OBJ-03',
    name: '"ISOLATION COMPOUND"',
    specs: 'AEGEAN / EMP-HARDENED / LEVEL 9',
    price: '€ 112.500.000',
    img: '1503387762-592deb58ef4e',
    fullSpecs: ['Geothermal Power', 'Seismic Isolation', '12m Concrete Shell', 'Automated Defense Perimeter', 'Self-Sustaining Biosphere'],
    history: [{ year: '2019', val: '€ 95.0M' }, { year: '2022', val: '€ 105.0M' }, { year: 'CURRENT', val: '€ 112.5M' }]
  },
  {
    id: 'OBJ-04',
    name: '"QUANTUM NODE"',
    specs: 'OFF-GRID / SUBMERGED / CRYPT-0',
    price: '€ 24.000.000',
    img: '1558494949-ef010cbdcc31',
    fullSpecs: ['1000 Qubit Processor', 'Liquid Helium Cooling', 'Deep-sea Fiber Tap', 'Kinetic Battery Backup', 'Crypt-0 Encrypted'],
    history: [{ year: '2024', val: '€ 18.0M' }, { year: '2025', val: '€ 21.0M' }, { year: 'CURRENT', val: '€ 24.0M' }]
  }
];

export function AcquisitionGrid({ onClose }: { onClose: () => void }) {
  const [selectedAsset, setSelectedAsset] = useState<typeof ASSETS[0] | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#020202]/90 backdrop-blur-2xl flex flex-col pt-32 px-12 md:px-24 overflow-y-auto custom-scrollbar mix-blend-screen"
    >
      {/* Decorative Matrix Background */}
      <div className="absolute inset-0 bg-[#050505] -z-10 mix-blend-multiply opacity-80" />

      <div className="max-w-[1800px] w-full mx-auto relative h-full">
        
        {/* Header anti-design */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[#c6b89e]/20 pb-8 relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-[#c6b89e]" />
          
          <div>
            <div className="flex items-center gap-6 mb-8">
              <button onClick={onClose} className="px-4 py-2 border border-[#c6b89e]/30 text-[#c6b89e]/60 hover:text-black hover:bg-[#c6b89e] transition-all duration-300 font-mono text-[10px] tracking-[4px] uppercase cursor-pointer relative z-50 pointer-events-auto">
                &lt; Return
              </button>
              <div className="inline-flex items-center gap-4 border border-[#c6b89e] px-4 py-1 opacity-80">
                <ShieldAlert className="w-4 h-4 text-[#c6b89e]" />
                <span className="font-mono text-[10px] tracking-[6px] uppercase text-[#c6b89e]"><ScrambleText text="BLACK MARKET" /></span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter uppercase leading-none">
              <KineticText text='"ACQUISITION"' />
              <br />
              <span className="italic opacity-50 text-[#c6b89e]">SYNDICATE</span>
            </h2>
          </div>

          <div className="text-right flex flex-col items-end gap-2">
            <span className="font-mono text-[10px] tracking-[5px] uppercase text-[#c6b89e]/50">
              [ AUTHORIZED CLEARANCE: TIER 0 ]
            </span>
            <span className="font-mono text-[14px] uppercase text-white/50 tracking-widest">
              VOL. 4 / LISBON / GENEVA
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-32">
          {ASSETS.map((asset, i) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="group cursor-pointer pointer-events-auto relative z-50"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 group-hover:border-[#c6b89e]/50 transition-colors duration-500 bg-black">
                {/* HUD Overlay on Image */}
                <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Crosshair className="w-6 h-6 text-[#c6b89e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 origin-center group-hover:rotate-90" />
                    <div className="border border-[#c6b89e] bg-black/50 backdrop-blur-md px-3 py-1 font-mono text-[9px] tracking-[4px] text-[#c6b89e] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      IDENT: {asset.id}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <div className="font-mono text-[8px] tracking-[4px] text-white/50 bg-black/60 px-2 py-1 backdrop-blur-sm">
                      {asset.specs}
                    </div>
                    <Lock className="w-4 h-4 text-[#c6b89e]" />
                  </div>
                </div>

                <img 
                  src={`https://images.unsplash.com/photo-${asset.img}?q=80&w=1200&auto=format&fit=crop`}
                  alt={asset.name}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[1.5s] ease-out mix-blend-screen"
                />
                
                {/* Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c6b89e]/10 to-transparent -translate-y-full group-hover:animate-scanline pointer-events-none mix-blend-overlay" />
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-2xl tracking-widest text-[#c6b89e] flex items-center gap-4">
                    {asset.name}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                  </h3>
                  <div className="font-mono text-[10px] tracking-[3px] text-white/40 group-hover:text-white/80 transition-colors">
                    {asset.specs}
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="font-mono text-[12px] tracking-[2px] text-white group-hover:text-[#c6b89e] transition-colors">{asset.price}</span>
                  <span className="font-mono text-[8px] tracking-[4px] text-white/20 uppercase line-through group-hover:text-[#c6b89e]/40">Wire Only</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 bg-black/80"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="bg-[#020202] border border-[#c6b89e]/20 w-full max-w-[1400px] h-full md:h-[85vh] overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(0,0,0,1)] ring-1 ring-white/5 pointer-events-auto"
            >
              {/* Modal CRT line */}
              <motion.div 
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 w-full h-[1px] bg-[#ff4a00]/30 shadow-[0_0_20px_#ff4a00] pointer-events-none z-50 mix-blend-screen"
              />

              <button 
                onClick={() => setSelectedAsset(null)} 
                className="absolute top-6 right-6 z-[160] py-3 px-5 bg-black/30 backdrop-blur-md border border-[#c6b89e]/20 text-[#c6b89e] hover:bg-[#c6b89e] hover:text-black transition-all duration-500 cursor-pointer flex items-center gap-4 font-mono text-[10px] tracking-[4px] uppercase group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-500">Close View</span>
                <X className="w-4 h-4" />
              </button>

              {/* Left side Image */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative border-b md:border-b-0 md:border-r border-[#c6b89e]/10 bg-black overflow-hidden flex-shrink-0 group/img">
                <motion.img 
                  initial={{ scale: 1.2, filter: "grayscale(100%) blur(10px)" }}
                  animate={{ scale: 1, filter: "grayscale(80%) blur(0px)" }}
                  exit={{ scale: 1.1, filter: "grayscale(100%) blur(10px)" }}
                  transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                  src={`https://images.unsplash.com/photo-${selectedAsset.img}?q=80&w=1600&auto=format&fit=crop`}
                  alt={selectedAsset.name}
                  className="w-full h-full object-cover mix-blend-screen opacity-70 group-hover/img:scale-110 group-hover/img:opacity-100 group-hover/img:filter-none transition-all duration-[4s] ease-out"
                />
                
                {/* Overlay details on image */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent">
                   <div className="font-mono text-[10px] tracking-[4px] text-[#ff4a00] mb-3 uppercase animate-pulse flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#ff4a00] rounded-sm" />
                      SECURE ASSET_
                   </div>
                   <div className="font-mono text-[12px] md:text-[14px] tracking-[2px] text-white/50 uppercase break-words w-4/5">
                      {selectedAsset.specs}
                   </div>
                </div>

                <div className="absolute inset-0 border-[0.5px] border-[#c6b89e]/[0.02] grid grid-cols-4 grid-rows-4 pointer-events-none mix-blend-screen">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-[#c6b89e]/[0.02]" />
                  ))}
                </div>
              </div>

              {/* Right side Details */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between overflow-y-auto custom-scrollbar relative z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff4a00]/[0.02] to-transparent pointer-events-none mix-blend-screen" />
                
                <div className="relative z-10">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-4xl md:text-6xl font-serif uppercase tracking-tighter text-white mb-2 leading-none"
                  >
                    {selectedAsset.name}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="font-mono text-[10px] tracking-[4px] text-[#c6b89e] mb-16 uppercase flex gap-4 items-center"
                  >
                    <span>IDENT: {selectedAsset.id}</span>
                    <span className="w-1 h-1 bg-[#c6b89e] rounded-full" />
                    <span className="text-[#ff4a00]">CLASSIFIED</span>
                  </motion.div>
                  
                  <div className="mb-14">
                    <h3 className="text-[#c6b89e]/50 font-mono text-[9px] tracking-[5px] mb-8 uppercase flex items-center gap-3">
                      <Lock className="w-3 h-3 text-[#ff4a00]" />
                      Technical Specifications
                    </h3>
                    <ul className="space-y-5">
                      {selectedAsset.fullSpecs.map((spec, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.6, ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
                          className="font-mono text-[11px] md:text-[13px] tracking-[2px] text-white/70 uppercase border-b border-white/5 pb-4 flex justify-between group"
                        >
                          <span className="group-hover:text-white transition-colors">{spec}</span>
                          <span className="text-[#c6b89e]/30 group-hover:text-[#c6b89e] transition-colors font-bold">{String(index + 1).padStart(2, '0')}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mb-10"
                  >
                    <h3 className="text-[#c6b89e]/50 font-mono text-[9px] tracking-[5px] mb-6 uppercase">Valuation History</h3>
                    <div className="flex gap-4">
                      {selectedAsset.history.map((h, index) => (
                        <div key={index} className="bg-black/40 border border-[#c6b89e]/10 p-5 flex-1 hover:border-[#c6b89e]/40 transition-colors group backdrop-blur-sm">
                          <div className="font-mono text-[8px] md:text-[10px] tracking-[4px] text-white/30 mb-3 group-hover:text-white/60">{h.year}</div>
                          <div className="font-mono text-[12px] md:text-[14px] tracking-[1px] text-[#c6b89e] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(198,184,158,0.2)] transition-all">{h.val}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="mt-12 pt-10 border-t border-[#c6b89e]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-50 pointer-events-auto"
                >
                  <div>
                    <div className="text-[9px] font-mono tracking-[4px] text-white/30 uppercase mb-2">Acquisition Cost</div>
                    <div className="text-3xl md:text-5xl font-mono tracking-widest text-[#c6b89e]">{selectedAsset.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => {
                        window.alert('CONFIDENTIAL INQUIRY INITIATED. STANDBY FOR AGENT HANDOFF.');
                        setSelectedAsset(null);
                    }}
                    className="w-full md:w-auto px-10 py-5 bg-[#ff4a00] text-black font-sans font-bold text-[12px] tracking-[4px] uppercase hover:bg-white hover:shadow-[0_0_30px_rgba(255,74,0,0.6)] transition-all duration-500 cursor-pointer text-center group"
                  >
                    <span className="relative z-10">Initiate Inquiry</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineEvent {
  id: string;
  date: string;
  category: string;
  title: string;
  italicTitle: string;
  description: string;
  coordinates: string;
  intelLevel: string;
  systemKey: string;
  manifestoExcerpt: string;
  specs: { label: string; value: string }[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "01",
    date: "OCTOBER 2024",
    category: "GENESIS DRAFT",
    title: "The Tracing of the",
    italicTitle: "SP Crest",
    description: "The initial charcoal drafting of the SP Crest was traced onto the back of an 1884 Paris opera house architectural blueprint. This aligned old-world structural symmetry with a modern statement of quiet power.",
    coordinates: "48.8719° N, 2.3316° E",
    intelLevel: "[ SECURE LEVEL I ]",
    systemKey: "INIT_CREST_1884",
    manifestoExcerpt: "Originality is not a pursuit of modern attention. It is a remembrance of ancient form.",
    specs: [
      { label: "Medium", value: "Heavy Ink / Bleached Blueprint" },
      { label: "Draftsman", value: "Anonymous Artisan // House" },
      { label: "Proportions", value: "1.618 Golden Ratio" }
    ]
  },
  {
    id: "02",
    date: "DECEMBER 2024",
    category: "SONIC ANCHOR",
    title: "Brutalist Cathedral",
    italicTitle: "Sessions",
    description: "The low-frequency hums and sub-bass resonance designed as the foundation for the sonic crown were recorded live inside a vacant medieval-brutalist brick sanctuary in Eastern Europe under zero light.",
    coordinates: "52.5200° N, 13.4050° E",
    intelLevel: "[ SECURE LEVEL II ]",
    systemKey: "SONIC_TEMPERING",
    manifestoExcerpt: "Some people chase fast rhythm. We construct static architectural weight.",
    specs: [
      { label: "Reverb Tail", value: "7.8 Seconds Natural Decay" },
      { label: "Vocal Layering", value: "Triple Heavy Guttural" },
      { label: "Frequency Anchor", value: "28 Hz Ambient Bass" }
    ]
  },
  {
    id: "03",
    date: "MAY 2025",
    category: "EXCLUSIVITY RITE",
    title: "The Paris Light-Deprived",
    italicTitle: "Salon",
    description: "A private presentation of the initial wearable fabric samples. Invited guests entered the black-wax chambers one at a time, viewing a single relic lit strictly by a focused ray of pure platinum light.",
    coordinates: "48.8566° N, 2.3522° E",
    intelLevel: "[ CLASSIFIED PROT ]",
    systemKey: "LUMEN_DEPRIV_03",
    manifestoExcerpt: "When you eliminate the visual noise of the masses, the true silhouette is forced to rise.",
    specs: [
      { label: "Atmosphere", value: "Dry Ice Haze / Scent 01" },
      { label: "Audience Cap", value: "15 Signatures Accepted" },
      { label: "Viewing Cycle", value: "180 Seconds Per Guest" }
    ]
  },
  {
    id: "04",
    date: "OCTOBER 2025",
    category: "THE ACTIVATION",
    title: "Archival Release of",
    italicTitle: "Relics",
    description: "The Reliquary goes live. A strict mandate is established: zero mass production. Collection limit capped permanently. Primary artifacts like the Obsidian Mantle are handcrafted with 京都 Indigo Base.",
    coordinates: "35.0116° N, 135.7681° E",
    intelLevel: "[ OPEN TO CITIZENS ]",
    systemKey: "PRIMARY_VAULT_OPEN",
    manifestoExcerpt: "Wearable evidence that greatness is constructed, not bought. Limited to 15 models.",
    specs: [
      { label: "Artifact Count", value: "3 Primary Wearable Objects" },
      { label: "Indigo Bathing", value: "40 Repeated Swatches" },
      { label: "Serial Protocol", value: "Procedurally Generated Hash" }
    ]
  },
  {
    id: "05",
    date: "MARCH 2026",
    category: "LOYALTY MANIFEST",
    title: "The Crimson Dog",
    italicTitle: "Apparat",
    description: "Expanding the visual armor to physical companions. The launch of the Pet Collection, featuring heavy gold identity plates custom-milled in Turin and paired with thick blood-red nylon harnesses.",
    coordinates: "45.0703° N, 7.6869° E",
    intelLevel: "[ VAULT LEVEL IV ]",
    systemKey: "LOYALTY_APPARAT",
    manifestoExcerpt: "True protection wears oxblood crimson. Loyalty deserves titanium-grade plates.",
    specs: [
      { label: "Gold Carat", value: "18K Matte Rose Plaquing" },
      { label: "Weft Pattern", value: "Quad-Stitched Parachute Cord" },
      { label: "Engraving", value: "SP Mirror Sigil" }
    ]
  },
  {
    id: "06",
    date: "MAY 2026",
    category: "THE OVERVIEW",
    title: "The Sanctum Portal",
    italicTitle: "Goes Online",
    description: "The cybernetic temple interface is initiated globally. Built as a living digital museum featuring interactive D3 Scarcity Matrixes, custom custom synthesizers, and cryptographic COA certificate modules.",
    coordinates: "37.7749° N, 122.4194° W",
    intelLevel: "[ GLOBAL BROADCAST ]",
    systemKey: "SANCTUM_NET_2026",
    manifestoExcerpt: "The creator became the creation. Welcome to the theater of gravity.",
    specs: [
      { label: "UI Radius", value: "0px Absolute Hard Edges" },
      { label: "Core Audio", value: "44.1 kHz Ambient Portal Loop" },
      { label: "Interaction", value: "500ms Slow Linear Reveals" }
    ]
  }
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeEvent = TIMELINE_EVENTS[activeIndex];

  return (
    <section className="relative w-full bg-[#050505] py-32 md:py-48 z-20 overflow-hidden border-t border-[#E5E4E2]/10">
      
      {/* Editorial Watermark background */}
      <div className="absolute right-12 bottom-12 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <span className="font-serif text-[18vw] leading-none tracking-tighter text-[#E5E4E2] uppercase font-bold">
          CODE
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Title Block */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 bg-[#93000a] rounded-none" />
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#93000a]">Chronology // Milestone Ledger</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#E5E4E2] uppercase leading-none">
              Historic <br />
              <span className="italic text-[#dcc57b] font-light">Epitaphs</span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E5E4E2]/40 mb-4">
              [ SECURE HISTORY OF THE ANCIENT COMMISSIONS ]
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#E5E4E2]/50 leading-relaxed font-light">
              Click with deliberation on each milestone axis below. Travel through the timelines of deliberate creation, recorded sonic mass, and global sanctum launches.
            </p>
          </div>
        </div>

        {/* Timeline Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Axis Selector Grid (Left Side / 5 columns) */}
          <div className="lg:col-span-5 flex flex-col relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-[#E5E4E2]/10">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={event.id}
                  className="relative group pb-12 last:pb-0"
                >
                  {/* Circle Node indicator on the hairline wire */}
                  <div 
                    className={`absolute -left-[30px] top-1.5 w-2 h-2 transition-all duration-500 rounded-none ${
                      isActive 
                        ? 'bg-[#93000a] scale-150 rotate-45 shadow-[0_0_8px_rgba(147,0,10,0.8)]' 
                        : 'bg-[#E5E4E2]/20 scale-100 group-hover:bg-[#dcc57b] group-hover:scale-125'
                    }`} 
                  />

                  {/* Date & Title interactive text */}
                  <button
                    onClick={() => setActiveIndex(idx)}
                    data-cursor="pointer"
                    className="w-full text-left focus:outline-none cursor-none"
                  >
                    <span className={`block font-mono text-[8.5px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                      isActive ? 'text-[#93000a]' : 'text-[#E5E4E2]/30 group-hover:text-[#E5E4E2]/60'
                    }`}>
                      {event.date} // {event.category}
                    </span>
                    <h3 className={`mt-3 font-serif text-xl md:text-2xl tracking-normal transition-colors duration-500 uppercase ${
                      isActive ? 'text-[#E5E4E2]' : 'text-[#E5E4E2]/40 group-hover:text-[#E5E4E2]/70'
                    }`}>
                      {event.title} <span className="italic">{event.italicTitle}</span>
                    </h3>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Detail Display Panel (Right Side / 7 columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0a0a0a]/40 border border-[#E5E4E2]/10 p-8 md:p-14 relative"
              >
                {/* Hairline corners with glow highlights */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#dcc57b]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#dcc57b]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#dcc57b]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#dcc57b]" />

                {/* Top header stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-[#E5E4E2]/5 pb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#93000a] bg-[#93000a]/10 px-2 py-0.5">
                      {activeEvent.intelLevel}
                    </span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#dcc57b]">
                      COORD // {activeEvent.coordinates}
                    </span>
                  </div>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#E5E4E2]/30">
                    KEY: {activeEvent.systemKey}
                  </span>
                </div>

                {/* Date overlay big header */}
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#dcc57b] block mb-2">
                  ARCHIVAL RECORD DATE : {activeEvent.date}
                </span>

                {/* Headings */}
                <h4 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-[#E5E4E2] mb-8 leading-tight">
                  {activeEvent.title} <span className="italic text-[#93000a]">{activeEvent.italicTitle}</span>
                </h4>

                {/* Master description */}
                <p className="font-sans text-sm md:text-base font-light leading-relaxed text-[#E5E4E2]/70 mb-10">
                  {activeEvent.description}
                </p>

                {/* Manifesto quote block */}
                <div className="bg-[#050505] border-l-[1.5px] border-[#93000a] p-6 mb-10">
                  <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-[#93000a]/70 block mb-2">INTELLIGENT PRESENCE EXCERPT</span>
                  <p className="font-serif italic text-sm md:text-base text-[#E5E4E2]/90 leading-relaxed">
                    &ldquo;{activeEvent.manifestoExcerpt}&rdquo;
                  </p>
                </div>

                {/* Deep tech specifications */}
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#dcc57b] block mb-4">SPECIFICATION DETAILS</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#050505]/40 border border-[#E5E4E2]/5 p-5">
                    {activeEvent.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#E5E4E2]/40">{spec.label}</span>
                        <span className="font-sans text-xs uppercase tracking-wide text-[#E5E4E2]/85">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Days Passed Counter Ticker line */}
        <div className="mt-28 p-6 bg-[#0a0a0a]/30 border border-[#E5E4E2]/5 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#dcc57b]">
            ✦ IMMUTABLE LOG: ERA TRACKING CONTINUOUSLY RECORDED IN THE CORE SOVEREIGN LEDGER ✦
          </span>
        </div>

      </div>
    </section>
  );
}

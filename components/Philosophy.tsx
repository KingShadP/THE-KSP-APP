'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface philosophySection {
  id: string;
  tag: string;
  title: string;
  italicTitle: string;
  summary: string;
  philosophy: string;
  example: string;
  metadata: { label: string; value: string }[];
}

const PHILOSOPHIES: philosophySection[] = [
  {
    id: "01",
    tag: "PSYCHOLOGICAL ENGINE",
    title: "The Divine",
    italicTitle: "Duality",
    summary: "The internal tension between raw, architectural sovereignty and the fractured human cost of the crown.",
    philosophy: "At the heart of KingShadP lies the balance between the 'Creator' (unyielding command, absolute architectural layout of the self) and the 'Create' (vulnerability, fracture, the heavy price paid in solitude for greatness). This tension creates gravity; it constructs an atmospheric, cinematic scene out of ordinary experience, forcing onlookers into a state of quiet reflection.",
    example: "Woven into the lining of each 'Obsidian Mantle' is a quiet, concealed thread of crimson silk—a physical metaphor representing the hidden human pulse beneath the rigid, defensive black outer coat.",
    metadata: [
      { label: "Sovereignty Vector", value: "Creator // Create" },
      { label: "Behavioral State", value: "Calm Dominance" },
      { label: "Atmosphere Index", value: "94.8% Absolutism" }
    ]
  },
  {
    id: "02",
    tag: "SYMBOLIC HIERARCHY",
    title: "The Totems of",
    italicTitle: "Sovereignty",
    summary: "Three core identifiers that bridge physical reality and eternal myth.",
    philosophy: "Symbols are not treated as promotional branding. They are sacred sigils representing structural authority: the 'Giragon' (the crowned guardian, embodying ancient, fire-tempered intelligence), the 'SP Crest' (the gothic house seal, pressed cleanly into wax and velvet to validate elite lineage), and the Serif 'Wordmark' (the clean declaration of identity itself, printed under generous negative space).",
    example: "The SP Crest is never embroidered in loud textures; it is hand-stamped on heavy card stock or pressed meticulously on metallic details, maintaining a disciplined distance.",
    metadata: [
      { label: "Eternal Totem", value: "The Giragon" },
      { label: "House Flagship", value: "The SP Monogram" },
      { label: "Typographic Rule", value: "Canela-Style Serif" }
    ]
  },
  {
    id: "03",
    tag: "SCARCITY PROTOCOL",
    title: "The Architecture of",
    italicTitle: "Permanence",
    summary: "Rejecting modern transient consumption to forge rare, heirloom relics.",
    philosophy: "We reject the desperate, high-volume production of fast sportswear and retail. What of ours exists in the world belongs strictly to an elite vault. scrupulous rules dictate that no primary relic collection exceed fifteen wearable artifacts. Every detail is strictly governed using Florentine oxidation and Kyoto indigo base-dyeing, designed to be inherited rather than consumed.",
    example: "Each piece is coupled with a unique generated serial number and registered in the immutable ledger, creating a physical anchor of scarcity.",
    metadata: [
      { label: "Collection Cap", value: "15 Artifacts Max" },
      { label: "Materials Base", value: "Kyoto Indigo / Pine Sap" },
      { label: "Persistence Rating", value: "Generational Heirloom" }
    ]
  },
  {
    id: "04",
    tag: "AESTHETIC SANCTUM",
    title: "Tactile Dark",
    italicTitle: "Luxury",
    summary: "A monochromatic landscape carved from shadow, platinum, and blood crimson.",
    philosophy: "The visual language does not request attention—it bends light to command it. We employ Void Black (#050505) as our structural canvas, Polished Platinum as the highlight, Oxblood Crimson (#5E0008) as the vital organic pulse, and Muted Gold as the ancient crowning metal. Glitch or glowing elements are restricted to thin sensory seasoning beneath flat, tactile physical marble.",
    example: "Our public gallery utilizes razor-sharp 0px borders and extreme negative space, creating an architecture that feels like walking through a private midnight cathedral.",
    metadata: [
      { label: "Primary Canvas", value: "The Black Void (#050505)" },
      { label: "Highlight Tone", value: "Platinum & Muted Gold" },
      { label: "Interaction Model", value: "Unhurried Reveal (500ms+)" }
    ]
  }
];

export function Philosophy() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [interactiveMode, setInteractiveMode] = useState<'creator' | 'create'>('creator');

  return (
    <section className="relative w-full bg-[#050505] py-32 md:py-48 z-20 overflow-hidden border-t border-[#E5E4E2]/10">
      
      {/* Decorative background grid line */}
      <div className="absolute top-0 right-1/4 bottom-0 w-px bg-gradient-to-b from-[#E5E4E2]/5 via-transparent to-[#E5E4E2]/5 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="mb-24 md:mb-32">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#93000a] block mb-6">
            EDUCATION // PERSPECTIVE
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#E5E4E2] uppercase leading-none">
            The Codex <br />
            <span className="italic font-light text-[#dcc57b]">Of The Verse</span>
          </h2>
          <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E5E4E2]/40 max-w-md">
            [ A pedagogical breakdown of the psychological parameters and visual guidelines that define current house operations. ]
          </p>
        </div>

        {/* Philosophy Main Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative z-10">
          
          {/* Left Column: Navigation Tabs & Stats (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-12 border-l border-[#E5E4E2]/10 pl-6 md:pl-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 block pb-4 border-b border-[#E5E4E2]/5">
              The Doctrines
            </span>
            <div className="flex flex-col gap-6">
              {PHILOSOPHIES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  data-cursor="pointer"
                  className="group text-left flex flex-col items-start gap-2 cursor-none focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[9px] transition-colors ${activeTab === idx ? 'text-[#93000a]' : 'text-[#E5E4E2]/20'}`}>
                      {item.id}
                    </span>
                    <span className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-colors ${activeTab === idx ? 'text-[#dcc57b]' : 'text-[#E5E4E2]/40 group-hover:text-[#E5E4E2]/70'}`}>
                      {item.tag}
                    </span>
                  </div>
                  <span className={`font-serif text-xl md:text-2xl tracking-normal transition-colors pb-1 ${activeTab === idx ? 'text-[#E5E4E2] border-b border-[#93000a]' : 'text-[#E5E4E2]/50 group-hover:text-[#E5E4E2]/80'}`}>
                    {item.title} <span className="italic">{item.italicTitle}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Micro details panel */}
            <div className="pt-8 border-t border-[#E5E4E2]/10 flex flex-col gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#E5E4E2]/30">SYSTEM LOGS</span>
              <div className="flex items-center justify-between text-[9px] font-mono uppercase text-[#E5E4E2]/50">
                <span>Core Status</span>
                <span className="text-[#93000a] animate-pulse">● online</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono uppercase text-[#E5E4E2]/50">
                <span>Codifed By</span>
                <span className="text-[#dcc57b]">Ksp Cult</span>
              </div>
            </div>
          </div>

          {/* Right Column: Exhibit Block (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-12 bg-[#0a0a0a]/30 border border-[#E5E4E2]/10 p-8 md:p-16 relative"
              >
                {/* Visual framing brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#93000a]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#93000a]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#93000a]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#93000a]" />

                {/* Tag & index */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#93000a]">
                    DOC // {PHILOSOPHIES[activeTab].id}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E5E4E2]/30">
                    {PHILOSOPHIES[activeTab].tag}
                  </span>
                </div>

                {/* Elaborate description */}
                <div className="flex flex-col gap-6">
                  <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-[#E5E4E2] leading-tight">
                    {PHILOSOPHIES[activeTab].title} <span className="italic text-[#dcc57b]">{PHILOSOPHIES[activeTab].italicTitle}</span>
                  </h3>
                  
                  <blockquote className="font-serif italic text-lg md:text-xl text-[#E5E4E2]/80 border-l border-[#93000a] pl-6 py-1 leading-relaxed">
                    &ldquo;{PHILOSOPHIES[activeTab].summary}&rdquo;
                  </blockquote>

                  <p className="font-sans text-sm md:text-base font-light leading-relaxed text-[#E5E4E2]/60 mt-4">
                    {PHILOSOPHIES[activeTab].philosophy}
                  </p>
                </div>

                {/* Operational Exhibit example */}
                <div className="bg-[#050505]/80 border border-[#E5E4E2]/5 p-6 md:p-8">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#dcc57b] block mb-3">CONCRETE EVIDENCE</span>
                  <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-[#E5E4E2]/80">
                    <strong className="text-[#E5E4E2] font-normal">Tactile Manifestation:</strong> {PHILOSOPHIES[activeTab].example}
                  </p>

                  {/* Exhibit interactive element for active tab 0 (Duality Engine) */}
                  {activeTab === 0 && (
                    <div className="mt-8 pt-6 border-t border-[#E5E4E2]/10">
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#93000a] block mb-4">INTERACTIVE ENGINE</span>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setInteractiveMode('creator')}
                          data-cursor="pointer"
                          className={`flex-1 font-mono text-[9px] uppercase tracking-[0.2em] py-3 text-center border transition-all cursor-none ${interactiveMode === 'creator' ? 'bg-[#93000a] border-[#93000a] text-white' : 'border-[#E5E4E2]/15 text-[#E5E4E2]/40 hover:text-[#E5E4E2]'}`}
                        >
                          The Creator
                        </button>
                        <button
                          onClick={() => setInteractiveMode('create')}
                          data-cursor="pointer"
                          className={`flex-1 font-mono text-[9px] uppercase tracking-[0.2em] py-3 text-center border transition-all cursor-none ${interactiveMode === 'create' ? 'bg-[#5E0008] border-[#5E0008] text-white' : 'border-[#E5E4E2]/15 text-[#E5E4E2]/40 hover:text-[#E5E4E2]'}`}
                        >
                          The Create
                        </button>
                      </div>
                      <div className="mt-4 p-4 min-h-[60px] bg-[#0c0c0c] border border-[#E5E4E2]/5 text-[11px] font-sans text-[#E5E4E2]/60 italic">
                        {interactiveMode === 'creator' 
                          ? '"I don’t cater, I’m the creator that makes your life greater." — Representing the unyielding structural will, casting towering silhouettes of monolithic intention.' 
                          : '"Look at what I constructed, and look at how it consumes me." — The delicate human cost underneath. Standing alone on the empty podium after the fire dies down.'
                        }
                      </div>
                    </div>
                  )}

                  {/* Exhibit interactive element for active tab 1 (Trinity of Symbols) */}
                  {activeTab === 1 && (
                    <div className="mt-8 pt-6 border-t border-[#E5E4E2]/10 grid grid-cols-3 gap-3">
                      <div className="border border-[#E5E4E2]/5 p-3 text-center">
                        <span className="block font-serif text-lg text-[#dcc57b]">The Giragon</span>
                        <span className="block font-mono text-[7px] text-[#E5E4E2]/30 mt-1">THE GUARDIAN</span>
                      </div>
                      <div className="border border-[#E5E4E2]/5 p-3 text-center">
                        <span className="block font-serif text-lg text-[#B76E79]">SP Crest</span>
                        <span className="block font-mono text-[7px] text-[#E5E4E2]/30 mt-1">THE SOVEREIGNTY</span>
                      </div>
                      <div className="border border-[#E5E4E2]/5 p-3 text-center">
                        <span className="block font-serif text-lg text-[#E5E4E2]">Wordmark</span>
                        <span className="block font-mono text-[7px] text-[#E5E4E2]/30 mt-1">THE LEDGER</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata Ledger */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#E5E4E2]/10">
                  {PHILOSOPHIES[activeTab].metadata.map((meta, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#E5E4E2]/30">{meta.label}</span>
                      <span className="font-sans text-xs tracking-wider text-[#dcc57b] uppercase">{meta.value}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

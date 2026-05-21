'use client';

import { motion } from 'motion/react';
import React from 'react';

interface ObscuraFact {
  index: string;
  category: string;
  title: string;
  description: string;
}

const FACTS: ObscuraFact[] = [
  {
    index: "01 // CHRONICLE",
    category: "ARTIFACT FORGING",
    title: "The Crimson Formula",
    description: "The exact shade of oxblood crimson pigment used in the Reliquary artifacts is formulated through a multi-stage light oxidation process, inspired by 17th-century Florentine tapestries."
  },
  {
    index: "02 // CHRONICLE",
    category: "SONIC STRUCTURE",
    title: "The Solitary Cathedral Sessions",
    description: "The sub-frequencies woven into 'Crown Ascension' were captured live during a solitary midnight session inside a vacant brutalist sanctuary in Eastern Europe."
  },
  {
    index: "03 // CHRONICLE",
    category: "EXCLUSIVITY PROTOCOL",
    title: "The Limit of Fifteen",
    description: "Strict directive dictates that no primary relic collection will ever exceed fifteen wearable artifacts, enforcing absolute presence through calculated scarcity."
  },
  {
    index: "04 // CHRONICLE",
    category: "ORGANIC TREATMENT",
    title: "Scandinavian Pine SAP Curing",
    description: "The waxed canvas of the 'Portal Trench' is cured with organic sap from ancestral subarctic forests, giving it a clean matte texture that deepens over years."
  },
  {
    index: "05 // CHRONICLE",
    category: "SYMBOLIC INSIGNIA",
    title: "Reverse Blueprint Drafting",
    description: "The initial charcoal drafting of the SP Crest was traced onto the back of a discarded 1884 architectural floor layout of an opera house in Paris."
  },
  {
    index: "06 // CHRONICLE",
    category: "TEXTILE ARCHETYPE",
    title: "Kyoto Forty-Bath Indigo Base",
    description: "Underlying the pure black of the Obsidian Mantle is a base of plant indigo, hand-dyed forty successive times by master artisans in Kyoto before the matte carbon finish is applied."
  },
  {
    index: "07 // CHRONICLE",
    category: "EXHIBITION STANDARD",
    title: "The Silent Presentation Protocols",
    description: "During the invitation-only salon in Paris, each wearable relic was shown to a single anonymous guest at a time, illuminated solely by a focused beam of platinum light."
  },
  {
    index: "08 // CHRONICLE",
    category: "DIGITAL DECEPTION",
    title: "Spectral Cartesian Coordinates",
    description: "If passed through a high-resolution audio spectrometer, the final frequencies of 'The Portal' construct a visual map pointing directly to a private vault in the Swiss Alps."
  },
  {
    index: "09 // CHRONICLE",
    category: "METALLURGIC TEMPERING",
    title: "Continuous Obsidian Clouding",
    description: "Each solid-platinum crest is tempered under a highly specific direct flame, leaving a microscopic charcoal ash clouding on the metal that makes every piece unrepeatable."
  },
  {
    index: "10 // CHRONICLE",
    category: "TACTILE TAILORING",
    title: "The Amber Light Deprivation",
    description: "To maximize pure physical form, the structure patterns of all garments are drafted in a high-contrast room bathed strictly in amber light, prioritizing physical anatomy over color."
  }
];

export function Chronicles() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-48 z-20 overflow-hidden border-t border-[#E5E4E2]/5">
      {/* Editorial Grid Backing lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-[#E5E4E2]/10 via-[#93000a]/5 to-[#E5E4E2]/10" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gradient-to-b from-[#E5E4E2]/10 via-transparent to-[#E5E4E2]/10" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-[#E5E4E2]/10 via-[#93000a]/5 to-[#E5E4E2]/10" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header - Styled with exquisite luxury and extreme negative space */}
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 bg-[#93000a] rounded-none" />
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#93000a]">Intel // Chronicles</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-[0.9] text-[#E5E4E2]">
              Did You <span className="italic text-[#dcc57b]">Know?</span>
            </h2>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E5E4E2]/40 mt-4">
              [ LEGACY LEDGER & ARCHIVAL TRIVIA ]
            </div>
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#E5E4E2]/40 max-w-[320px] md:text-right leading-relaxed font-light">
            Obscure fragments gathered from the private archives of KingShadP. Ten pillars detailing the dedication behind the creation.
          </p>
        </div>

        {/* Elegant Bento/Card Grid - No rounded corners, fine hairline borders, glow-on-hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {FACTS.map((fact, index) => (
            <motion.div
              key={fact.index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between p-8 md:p-12 min-h-[280px] bg-[#0a0a0a]/40 border-[0.5px] border-[#E5E4E2]/15 hover:border-[#93000a]/80 transition-colors duration-[600ms] rounded-none overflow-hidden"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Subtle inner accent glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#93000a]/0 to-[#93000a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 flex flex-col gap-8">
                {/* Top Row: Index and category */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#93000a]">
                    {fact.index}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#E5E4E2]/30 uppercase group-hover:text-[#dcc57b] transition-colors duration-500">
                    {fact.category}
                  </span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#E5E4E2] group-hover:text-white transition-colors duration-500">
                    {fact.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-[#E5E4E2]/50 group-hover:text-[#E5E4E2]/80 transition-colors duration-500">
                    {fact.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r-[0.5px] border-b-[0.5px] border-[#E5E4E2]/20 group-hover:border-[#93000a] transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-2 h-2 border-l-[0.5px] border-t-[0.5px] border-[#E5E4E2]/20 group-hover:border-[#93000a] transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Closing ledger quote */}
        <div className="mt-24 pt-16 border-t border-[#E5E4E2]/10 flex flex-col items-center justify-center text-center gap-4">
          <span className="font-serif italic text-lg md:text-xl text-[#dcc57b]/80 max-w-xl leading-relaxed">
            &ldquo;We do not create to pass time. We create to anchor identity in an unforgiving void.&rdquo;
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#93000a]">
            — KINGSHADP // CHRONICLES END
          </span>
        </div>

      </div>
    </section>
  );
}

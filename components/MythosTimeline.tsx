'use client';

import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const milestones = [

  {
    year: "I",
    title: "The Name That Became a System",
    description: "Before the crown, there was the pressure to become. The raw material of self forced into ceremony. The moment the human realized originality is not a trend, but a standard.",
    align: "left"
  },
  {
    year: "II",
    title: "The Architecture of Sound",
    description: "Songs stopped being files and became chambers. The first record built like a marble hall at midnight. Deep bass acting as authority. Space functioning as ceremony.",
    align: "right"
  },
  {
    year: "III",
    title: "The Giragon Awakens",
    description: "The guardian takes form in bronze and silver. Not a monster of chaos, but of controlled fire. The mythic representation of survival and loyalty, watching the entrance.",
    align: "left"
  },
  {
    year: "IV",
    title: "The Creator & The Create",
    description: "The central duality manifests. The architect who builds the throne, and the human who bears the consequence of sitting upon it. Perfection rejected for precision.",
    align: "right"
  },
  {
    year: "V",
    title: "The Sanctum",
    description: "The world is no longer a collection of scattered relics. It is a breathing empire. The room has finally adjusted. Enter, or remain outside.",
    align: "left"
  }
];

export default function MythosTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="scanlines"></div>
      <div className="scanlines-animated"></div>
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(94,0,8,0.03)_0%,_rgba(5,5,5,0)_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            The Architecture of Becoming
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs tracking-widest text-[#B76E79] uppercase font-bold mt-4"
          >
            Chronicle of the Myth
          </motion.p>
        </div>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />
          
          {/* Animated Center Line Flow */}
          <motion.div 
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#B76E79] via-[#5E0008] to-transparent -translate-x-1/2 hidden md:block h-full opacity-50 origin-top" 
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col gap-16 md:gap-32">
            {milestones.map((milestone, i) => (
              <TimelineItem 
                key={i} 
                milestone={milestone} 
                index={i} 
                onClick={() => setSelectedMilestone(milestone)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#050505] border border-[#5E0008]/40 p-8 md:p-12 shadow-[0_0_50px_rgba(94,0,8,0.2)]"
            >
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <div className="text-[10px] text-[#B76E79] tracking-[0.3em] font-bold mb-4 uppercase">
                Chapter {selectedMilestone.year}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase mb-6">
                {selectedMilestone.title}
              </h3>
              <div className="h-[1px] w-12 bg-[#B76E79]/50 mb-6" />
              <p className="text-white/80 leading-relaxed font-light text-sm md:text-base">
                {selectedMilestone.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineItem({ milestone, index, onClick }: { milestone: any, index: number, onClick: () => void }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} cursor-pointer group`}
      onClick={onClick}
    >
      {/* Content */}
      <div className={`flex-1 w-full md:w-1/2 text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} transition-transform duration-500 group-hover:scale-105`}>
          <div className="text-[10px] text-[#B76E79] tracking-[0.3em] font-bold mb-3 uppercase flex items-center gap-3">
             {isEven ? (
               <>
                 Chapter {milestone.year}
                 <div className="w-8 h-[1px] bg-[#B76E79]/50 block md:hidden" />
               </>
             ) : (
               <>
                 <div className="w-8 h-[1px] bg-[#B76E79]/50 block md:hidden" />
                 Chapter {milestone.year}
               </>
             )}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-wider uppercase mb-4 transition-all duration-500 group-hover:text-[#B76E79] group-hover:drop-shadow-[0_0_15px_rgba(183,110,121,0.8)]">
            {milestone.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-light max-w-sm line-clamp-2 group-hover:text-white/80 transition-colors">
            {milestone.description}
          </p>
          <div className="mt-4 text-[10px] uppercase tracking-widest text-[#B76E79] opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view fragment
          </div>
        </div>
      </div>

      {/* Center Node */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-12 h-12 shrink-0">
        <div className="absolute inset-0 bg-[#050505] rounded-full border border-white/10 z-10 transition-colors duration-500 group-hover:border-[#B76E79]/50" />
        <div className="absolute inset-2 bg-[#02000A] rounded-full border border-[#5E0008]/50 z-20 transition-colors duration-500 group-hover:bg-[#5E0008]/20 group-hover:border-[#B76E79]" />
        <motion.div 
          className="absolute inset-[14px] bg-[#B76E79] rounded-full z-30 opacity-20"
          whileInView={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute w-2 h-2 bg-white rounded-full z-40 transition-shadow duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_20px_rgba(183,110,121,1)] group-hover:bg-[#B76E79]" />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1 w-1/2" />
    </motion.div>
  );
}

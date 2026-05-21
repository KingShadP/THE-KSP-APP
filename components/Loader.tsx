'use client';

import { motion } from 'motion/react';

export function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      <div className="relative flex flex-col items-center gap-12 w-full px-6">
        {/* Core Insignia Simulation */}
        <div className="relative w-16 h-16 flex items-center justify-center">
           <motion.div 
             initial={{ scale: 0, rotate: -45, opacity: 0 }}
             animate={{ scale: 1, rotate: 45, opacity: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-0 border border-[#B76E79]/30"
           />
           <motion.div 
             initial={{ scale: 0, rotate: 45, opacity: 0 }}
             animate={{ scale: 1, rotate: -45, opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-2 border border-[#5E0008]/50"
           />
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="w-1.5 h-1.5 bg-[#E5E4E2] rounded-full"
           />
        </div>

        {/* Text Sequence */}
        <div className="h-6 flex items-center justify-center relative w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="absolute font-mono text-[9px] tracking-[0.4em] uppercase text-[#E5E4E2]/50 whitespace-nowrap"
          >
            Decyphering Axis // Establishing Presence
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 2.2 }}
            className="absolute inset-0 bg-[#050505] z-10" // Hard cut mask to mimic a system state change
          />
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-px bg-[#E5E4E2]/10 relative overflow-hidden mt-8">
            <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ duration: 2, ease: "easeInOut", times: [0, 1] }}
               className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#B76E79] to-transparent"
            />
        </div>
      </div>
    </motion.div>
  );
}

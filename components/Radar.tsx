'use client';

import { motion } from 'motion/react';

export function Radar() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-20 mix-blend-screen">
      <div className="relative w-[800px] h-[800px] rounded-full border border-[#5E0008]/20 flex items-center justify-center">
        {/* Inner rings */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[#5E0008]/30" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#5E0008]/40" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[#5E0008]/50" />
        <div className="absolute w-[2px] h-[2px] rounded-full bg-[#8A0F19] shadow-[0_0_10px_2px_#8A0F19]" />
        
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-[#5E0008]/20" />
        <div className="absolute h-full w-[1px] bg-[#5E0008]/20" />

        {/* Scanning beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] origin-bottom-right bottom-[-0px] right-[-0px]"
          style={{
            background: 'conic-gradient(from 180deg at 0% 100%, transparent 0deg, rgba(220, 20, 60, 0.4) 90deg, #8A0F19 90deg, transparent 90deg)'
          }}
        />

        {/* Occasional pings */}
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeOut' }}
          className="absolute top-[200px] left-[250px] w-4 h-4 rounded-full border border-[#8A0F19] bg-[#8A0F19]/50"
        />
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeOut' }}
          className="absolute bottom-[250px] right-[150px] w-3 h-3 rounded-full border border-[#dcc57b] bg-[#dcc57b]/30"
        />
      </div>
    </div>
  );
}

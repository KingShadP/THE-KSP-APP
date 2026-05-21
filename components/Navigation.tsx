'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [playing, setPlaying] = useState(false);
  
  // A pseudo hash stream variable to make the interface feel active
  const [hashData, setHashData] = useState('00.00.00');

  useEffect(() => {
    const interval = setInterval(() => {
      const code = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
      setHashData(`${code.slice(0,2)}.${code.slice(2,4)}.${code.slice(4)}`);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] mix-blend-difference selection:bg-transparent">
       {/* Top Left: Designation */}
       <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1">
          <span className="font-serif text-sm tracking-[0.2em] text-[#E5E4E2] uppercase font-bold">
            KINGSHADP
          </span>
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#B76E79] uppercase">
            Axis 01 // The Vault
          </span>
       </div>

       {/* Top Right: Status */}
       <div className="absolute top-8 right-8 md:top-12 md:right-12 flex items-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#E5E4E2]/50 uppercase">
            SECURE
          </span>
          <div className="w-1.5 h-1.5 bg-[#5E0008] rounded-full animate-pulse shadow-[0_0_10px_rgba(94,0,8,0.5)]" />
       </div>

       {/* Bottom Left: Location/Telemetry */}
       <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-1">
          <span suppressHydrationWarning className="font-mono text-[8px] tracking-[0.4em] text-[#E5E4E2]/40 uppercase">
            SEQ: {hashData}
          </span>
       </div>

       {/* Bottom Right: Audio Toggle */}
       <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 pointer-events-auto">
          <button 
             onClick={() => setPlaying(!playing)}
             data-cursor="sound"
             className="group flex flex-col items-end gap-2 cursor-none"
             aria-label="Toggle Audio"
          >
             <span className="font-mono text-[8px] tracking-[0.4em] text-[#E5E4E2]/60 uppercase group-hover:text-[#B76E79] transition-colors">
               Sound [{playing ? 'ON' : 'OFF'}]
             </span>
             {/* Visualizer Lines */}
             <div className="flex items-end gap-[1px] h-3 w-8 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                     key={i}
                     className="w-px bg-[#E5E4E2] group-hover:bg-[#B76E79] transition-colors"
                     initial={{ height: '2px' }}
                     animate={{ height: playing ? ['2px', `${Math.abs(Math.sin((i+1) * 3)) * 8 + 4}px`, '2px'] : '2px' }}
                     transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                  />
                ))}
             </div>
          </button>
       </div>
    </div>
  );
}

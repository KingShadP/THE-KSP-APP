'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Target, Navigation } from 'lucide-react';

export function CyberHUD() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dataStream, setDataStream] = useState({ lat: '00.000', lon: '00.000', crypt: '0x000', alt: '0' });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);

    const interval = setInterval(() => {
      setDataStream({
        lat: (Math.random() * 90).toFixed(4),
        lon: (Math.random() * 180).toFixed(4),
        crypt: '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0'),
        alt: Math.floor(Math.random() * 1000 + 30000).toString()
      });
    }, 150);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Corner crosshairs - Tactical Edition */}
      <div className="fixed top-8 left-8 w-16 h-16 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-[#c6b89e] opacity-40 shadow-[0_0_8px_#c6b89e]" />
         <div className="absolute top-0 left-0 w-[1px] h-full bg-[#c6b89e] opacity-40 shadow-[0_0_8px_#c6b89e]" />
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff4a00] opacity-80" />
      </div>
      <div className="fixed top-8 right-8 w-16 h-16 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-full h-[1px] bg-[#c6b89e] opacity-40" />
         <div className="absolute top-0 right-0 w-[1px] h-full bg-[#c6b89e] opacity-40" />
         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff4a00] opacity-80" />
         <Target className="absolute top-6 right-6 w-4 h-4 text-[#c6b89e]/30 animate-spin-slow mix-blend-screen" />
      </div>
      <div className="fixed bottom-8 left-8 w-16 h-16 pointer-events-none z-0">
         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c6b89e] opacity-40" />
         <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#c6b89e] opacity-40" />
         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff4a00] opacity-80" />
      </div>
      <div className="fixed bottom-8 right-8 w-16 h-16 pointer-events-none z-0">
         <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#c6b89e] opacity-40" />
         <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#c6b89e] opacity-40" />
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff4a00] opacity-80" />
         <div className="absolute bottom-6 right-6 font-mono text-[7px] text-[#ff4a00] tracking-[4px] uppercase animate-pulse">
           REC
         </div>
      </div>

      {/* Target Tracker lines */}
      <motion.div 
        className="fixed w-[1px] h-full bg-gradient-to-b from-transparent via-[#ff4a00]/20 to-transparent pointer-events-none z-0 top-0 mix-blend-screen"
        animate={{ x: mouse.x }}
        transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
      />
      <motion.div 
        className="fixed h-[1px] w-full bg-gradient-to-r from-transparent via-[#c6b89e]/10 to-transparent pointer-events-none z-0 left-0 mix-blend-screen"
        animate={{ y: mouse.y }}
        transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
      />
      
      {/* Reticle following mouse */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-screen"
        animate={{ x: mouse.x - 16, y: mouse.y - 16 }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.4 }}
      >
        <div className="absolute inset-0 border border-[#ff4a00]/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#ff4a00] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#ff4a00]" />
      </motion.div>

      {/* Left side telemetry */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] rotate-180 z-50 pointer-events-none hidden md:flex items-center gap-6 mix-blend-screen">
         <div className="text-[9px] font-mono text-[#c6b89e]/60 uppercase tracking-[6px]">
           AXIS_X: {String(mouse.x).padStart(4, '0')} // AXIS_Y: {String(mouse.y).padStart(4, '0')}
         </div>
         <div className="w-[1px] h-48 bg-[#c6b89e]/10 relative">
           <motion.div 
             className="absolute top-0 left-[-1px] w-[3px] h-8 bg-[#ff4a00] shadow-[0_0_10px_#ff4a00]"
             animate={{ y: [0, 192, 0] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
           />
         </div>
         <div className="flex gap-2 items-center rotate-90 opacity-50">
           <Compass className="w-3 h-3 text-[#c6b89e]" />
           <span className="text-[8px] font-mono tracking-[4px] text-[#c6b89e]">{dataStream.alt} FT</span>
         </div>
      </div>

      {/* Right side crypto stream */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] rotate-180 z-50 pointer-events-none hidden xl:flex items-center gap-8 text-[#c6b89e]/50 mix-blend-screen">
         <div className="text-[9px] font-mono uppercase tracking-[5px] drop-shadow-md text-[#ff4a00]">
           HASH: {dataStream.crypt}
         </div>
         
         <div className="flex gap-1.5 opacity-50 bg-[#000]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-[2px] h-3 bg-[#c6b89e]" style={{ opacity: Math.abs(Math.sin(i * 13.5)) * 0.8 + 0.2 }} />
            ))}
         </div>
         
         <div className="text-[9px] font-mono uppercase tracking-[5px] text-[#c6b89e]">
           SECURE_LINK // TIER_0
         </div>
      </div>

      {/* Bottom Center Radar / Sonar element */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none shrink-0 flex flex-col items-center gap-2 mix-blend-screen opacity-70">
        <div className="w-24 h-24 rounded-full border border-[#c6b89e]/20 relative flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-[#ff4a00]/10 scale-75" />
          <div className="w-1 h-1 bg-[#ff4a00] rounded-full shadow-[0_0_8px_#ff4a00]" />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-gradient-to-r from-[#ff4a00] to-transparent origin-left"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_50%,rgba(198,184,158,0.05)_100%)]" />
        </div>
        <div className="text-[7px] font-mono tracking-[4px] uppercase text-[#c6b89e]/40 flex items-center gap-2">
            <Navigation className="w-3 h-3 text-[#ff4a00]" /> 
            ORBITAL_SCAN
        </div>
      </div>
    </>
  );
}

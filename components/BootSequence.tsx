'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const HEX_CHARS = '0123456789ABCDEF';

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [hexDump, setHexDump] = useState<string[]>([]);
  
  useEffect(() => {
    // Background hex dumping
    const hexInterval = setInterval(() => {
      setHexDump(prev => {
        const newLine = Array.from({ length: 32 }, () => 
          Array.from({ length: 4 }, () => HEX_CHARS[Math.floor(Math.random() * 16)]).join('')
        ).join(' ');
        
        const next = [...prev, newLine];
        if (next.length > 50) next.shift(); // Keep last 50 lines
        return next;
      });
    }, 30);

    const sequence = [
      "ESTABLISHING SECURE UPLINK...",
      "BYPASSING PUBLIC ROUTING NODES...",
      "INJECTING QUANTUM ENTANGLEMENT KEY...",
      "AUTHENTICATING BIOMETRIC SIGNATURE...",
      "IDENTITY VERIFIED: KINGSHADP [PINNACLE TIER]",
      "DECRYPTING ASSET VAULT...",
      "SYNCING ENVIRONMENTAL TELEMETRY...",
      "OVERRIDING AUDIO VISUAL LIMITERS...",
      "PROTOCOL AUTHORIZED. WELCOME, PRINCIPAL."
    ];
    
    let delay = 100;
    sequence.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === sequence.length - 1) {
          setTimeout(() => onComplete(), 1200);
        }
      }, delay);
      delay += Math.random() * 150 + 150; 
    });

    return () => clearInterval(hexInterval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-[#020202] flex flex-col justify-center items-center text-[#c6b89e] font-mono text-[10px] tracking-[4px] uppercase pointer-events-none overflow-hidden"
      exit={{ opacity: 0, scale: 1.15, filter: "blur(40px) brightness(3)" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Hex Dump Background */}
      <div className="absolute inset-0 p-4 opacity-[0.04] text-[8px] leading-tight font-mono whitespace-pre text-[#ff4a00] overflow-hidden pointer-events-none mix-blend-screen text-justify">
         {hexDump.map((hex, i) => (
           <div key={i}>{hex}</div>
         ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-20 mix-blend-screen scale-150">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-[#c6b89e]/40 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] border-[2px] border-dashed border-[#ff4a00]/60 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] border-l-[4px] border-[#ff4a00] rounded-full animate-[spin_5s_linear_infinite] shadow-[0_0_20px_#ff4a00]" />
      </div>
      
      <div className="space-y-4 w-full max-w-4xl px-12 relative z-10 mix-blend-screen">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -40, filter: "blur(10px) drop-shadow(0 0 40px #c6b89e)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px) drop-shadow(0 0 0px #c6b89e)" }}
            transition={{ type: "spring", damping: 20 }}
            className="flex items-center gap-6 text-[11px]"
          >
            <span className="opacity-40">[{String(i + 1).padStart(2, '0')}]</span>
            <span className="bg-[#c6b89e]/10 px-3 py-1 border-l-2 border-[#c6b89e] shadow-[0_0_15px_rgba(198,184,158,0.1)]">{line}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
          className="w-8 h-8 bg-[#c6b89e] mt-10 shadow-[0_0_30px_#c6b89e]"
        />
      </div>
      
      {/* Scanline & Glitch */}
      <motion.div 
        animate={{ top: ['-20%', '120%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="fixed left-0 right-0 h-[4px] bg-[#c6b89e]/40 blur-[3px] shadow-[0_0_50px_rgba(198,184,158,1)] pointer-events-none"
      />
    </motion.div>
  );
}

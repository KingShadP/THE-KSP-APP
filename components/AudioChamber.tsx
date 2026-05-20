'use client';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function AudioChamber() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div 
      className="fixed bottom-8 left-8 z-[100] flex items-center gap-4 group cursor-pointer"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <div className="w-12 h-12 rounded-full border border-[var(--color-rosegold)]/30 bg-[var(--color-velvet-dark)]/90 backdrop-blur-xl flex items-center justify-center text-[var(--color-champagne)] group-hover:bg-[var(--color-crimson)] group-hover:border-[var(--color-rosegold)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] artifact-frame shadow-[0_0_20px_rgba(94,0,8,0.4)]">
        {isPlaying ? (
          <div className="w-3 h-3 bg-current rounded-sm" />
        ) : (
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent translate-x-0.5" />
        )}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: showLabel || isPlaying ? 1 : 0, width: showLabel || isPlaying ? 'auto' : 0 }}
        className="overflow-hidden whitespace-nowrap"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-platinum)]/50 flex flex-col pl-2">
          <span className="text-[var(--color-rosegold)] transition-colors">Sonic Chamber</span>
          <span className="text-[var(--color-platinum)]/80">Regal Echoes</span>
        </div>
      </motion.div>

      {isPlaying && (
        <div className="flex gap-[2px] items-end h-4 ml-2 opacity-70">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-[var(--color-rosegold)] rounded-full"
              animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
              transition={{ repeat: Infinity, duration: 1.5 + i * 0.2, ease: "linear" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

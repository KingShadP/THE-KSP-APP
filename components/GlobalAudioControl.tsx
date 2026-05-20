'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GlobalAudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [waveformOffsets, setWaveformOffsets] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate static offsets on client to prevent hydration mismatch
    setWaveformOffsets(Array.from({ length: 8 }).map((_, i) => Math.abs(Math.sin(i * 1.5)) * 12 + 4));
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-10 right-10 md:bottom-14 md:right-14 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        
        {/* Waveform Visualizer */}
        <div className="flex items-end gap-[2px] h-4 opacity-50 group-hover:opacity-100 transition-opacity">
          {waveformOffsets.map((baseHeight, i) => (
            <motion.div 
              key={i}
              className="w-0.5 bg-[#B76E79]"
              animate={{ 
                height: isPlaying ? [baseHeight, baseHeight * 2, baseHeight] : 2 
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.1 
              }}
            />
          ))}
        </div>

        {/* Track Info */}
        <div className="flex flex-col items-end">
          <span className="font-mono text-[8px] tracking-[0.3em] text-[#E5E4E2]/50 uppercase">
            {isPlaying ? "CHANNEL 01 / LIVE" : "AUDIO MUTED"}
          </span>
          <span className="font-sans text-[10px] tracking-widest text-[#E5E4E2] uppercase font-medium">
            Crown Ascension
          </span>
        </div>

        {/* Play/Pause Button */}
        <div className="w-10 h-10 border border-[#E5E4E2]/20 flex items-center justify-center transition-colors group-hover:border-[#B76E79] group-hover:bg-[#B76E79]/10">
          {isPlaying ? (
            <Pause className="w-3 h-3 text-[#B76E79]" />
          ) : (
            <Play className="w-3 h-3 text-[#B76E79] ml-0.5" />
          )}
        </div>
      </div>
      
    </div>
  );
}

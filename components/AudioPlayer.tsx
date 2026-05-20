'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, FastForward, Rewind, Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrambleText } from './ScrambleText';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="p-8 flex flex-col justify-between h-full relative overflow-hidden group">
      
      {/* Background Rotating element */}
      <motion.div 
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-20 -top-20 opacity-[0.03] text-[#c6b89e] pointer-events-none mix-blend-screen"
      >
        <Hexagon strokeWidth={0.5} className="w-[300px] h-[300px]" />
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-between pointer-events-none">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-[9px] uppercase tracking-[4px] text-[#ff4a00] font-mono mb-2 flex items-center gap-2">
              <span className={cn("w-1 h-1 bg-[#ff4a00] transition-all", isPlaying ? "opacity-100 shadow-[0_0_8px_#ff4a00]" : "opacity-30")} />
              <ScrambleText text='"CHANNEL 01"' />
            </div>
            <div className="text-[18px] font-serif tracking-widest text-[#c6b89e] drop-shadow-md cursor-default pointer-events-auto">
              <ScrambleText text="CROWN ASCENSION" duration={800} triggerOnHover />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="text-[8px] uppercase tracking-[3px] text-[#ff4a00]/70 font-mono">"CODEC"</div>
             <div className="flex gap-2 items-center border border-[#ff4a00]/20 bg-[#ff4a00]/5 px-2 py-1 backdrop-blur-sm">
               <div className={cn("w-1 h-1 rounded-full transition-colors duration-1000", isPlaying ? "bg-[#ff4a00] animate-pulse" : "bg-white/20")} />
               <div className="text-[9px] uppercase tracking-[2px] text-white/70 font-mono font-bold">.WAV</div>
             </div>
          </div>
        </div>
        
        {/* Minimalist Waveform / Abstract Art */}
        <div className="flex items-center gap-[2px] h-[30px] opacity-30 mt-auto pointer-events-none">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ height: "1px" }}
              animate={isPlaying ? { height: ['1px', `${Math.abs(Math.sin(i * 13.5)) * 25 + 5}px`, '1px'] } : { height: "1px" }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.02 
              }}
              className="flex-1 bg-[#c6b89e] min-w-[2px]"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 pt-6 border-t border-white/10 pointer-events-auto">
        <div className="flex justify-between items-center px-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-none border border-[#c6b89e]/30 text-[#c6b89e] flex items-center justify-center hover:bg-[#c6b89e] hover:text-black hover:shadow-[0_0_20px_rgba(198,184,158,0.4)] transition-all duration-300 cursor-pointer relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#c6b89e]/20 to-transparent translate-y-full group-hover/btn:translate-y-0 transition-transform" />
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current relative z-10" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5 relative z-10" />}
            </button>

            <div className="flex items-center gap-1">
              <button className="text-white/20 hover:text-[#c6b89e] transition-colors cursor-pointer p-2">
                <Rewind className="w-3 h-3" />
              </button>
              <button className="text-white/20 hover:text-[#c6b89e] transition-colors cursor-pointer p-2">
                <FastForward className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 ml-8">
            <div className="text-[9px] font-mono tracking-widest text-[#c6b89e] w-8">
               {Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')}
            </div>
            {/* Minimal Progress Line */}
            <div className="h-[1px] flex-1 bg-white/10 overflow-hidden cursor-pointer relative group-hover:h-[2px] transition-all">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#c6b89e] shadow-[0_0_10px_#c6b89e]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

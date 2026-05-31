'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [playing, setPlaying] = useState(false);
  
  // A pseudo hash stream variable to make the interface feel active
  const [hashData, setHashData] = useState('00.00.00');

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainsRef = useRef<GainNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const code = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
      setHashData(`${code.slice(0,2)}.${code.slice(2,4)}.${code.slice(4)}`);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playing) {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
          }
        }

        const ctx = audioContextRef.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        if (!masterGainRef.current) {
          const mGain = ctx.createGain();
          mGain.gain.setValueAtTime(0, ctx.currentTime);
          mGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2.0);
          mGain.connect(ctx.destination);
          masterGainRef.current = mGain;

          // 1. Deep sub bass drone (low oscillation at 55Hz matching low A tone)
          const subOsc = ctx.createOscillator();
          subOsc.type = 'triangle';
          subOsc.frequency.setValueAtTime(55, ctx.currentTime);

          const subFilter = ctx.createBiquadFilter();
          subFilter.type = 'lowpass';
          subFilter.frequency.setValueAtTime(110, ctx.currentTime);
          filterRef.current = subFilter;

          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.35, ctx.currentTime);

          subOsc.connect(subFilter);
          subFilter.connect(subGain);
          subGain.connect(mGain);
          subOsc.start();
          oscsRef.current.push(subOsc);

          // 2. Cinematic atmospheric minor drone chord components
          const frequencies = [82.4, 110, 130.8, 164.8];
          frequencies.forEach((freq) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            const chordGain = ctx.createGain();
            chordGain.gain.setValueAtTime(0.05, ctx.currentTime);

            osc.connect(chordGain);
            chordGain.connect(mGain);
            osc.start();
            oscsRef.current.push(osc);
            gainsRef.current.push(chordGain);
          });

          // 3. Natural evolution drift cycle
          const modulate = () => {
            if (!audioContextRef.current) return;
            const now = audioContextRef.current.currentTime;
            
            gainsRef.current.forEach((g) => {
              const targetVol = 0.02 + Math.random() * 0.06;
              const duration = 4.0 + Math.random() * 4.0;
              g.gain.setValueAtTime(g.gain.value, now);
              g.gain.linearRampToValueAtTime(targetVol, now + duration);
            });

            if (filterRef.current) {
              const targetFreq = 75 + Math.random() * 65;
              filterRef.current.frequency.setValueAtTime(filterRef.current.frequency.value, now);
              filterRef.current.frequency.linearRampToValueAtTime(targetFreq, now + 5.0);
            }
          };

          modulate();
          intervalRef.current = setInterval(modulate, 6000);
        } else {
          const now = ctx.currentTime;
          masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
          masterGainRef.current.gain.linearRampToValueAtTime(0.2, now + 1.5);
        }
      } catch (err) {
        console.error("Failed to start sound synthesis", err);
      }
    } else {
      if (audioContextRef.current && masterGainRef.current) {
        const now = audioContextRef.current.currentTime;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
        masterGainRef.current.gain.linearRampToValueAtTime(0.0, now + 1.5);
      }
    }
  }, [playing]);

  useEffect(() => {
    const localOscs = oscsRef;
    const localInterval = intervalRef;
    const localCtx = audioContextRef;
    return () => {
      if (localInterval.current) {
        clearInterval(localInterval.current);
      }
      localOscs.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      if (localCtx.current) {
        try {
          localCtx.current.close();
        } catch (e) {}
      }
    };
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

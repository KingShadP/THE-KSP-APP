'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Disc, Radio, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AstralMechanism() {
  const [activeSignal, setActiveSignal] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null);
  const [dustParticles, setDustParticles] = useState<Array<{ top: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate dust particles on the client to avoid SSR hydration mismatch
    const generatedDust = [...Array(24)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
    setDustParticles(generatedDust);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedSignal === null) {
        setActiveSignal((prev) => (prev + 1) % 3);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedSignal]);

  const nodes = [
    { label: "CELESTIAL AUDIO", subtitle: "Orbiting Soundscape", icon: Disc, orbitIndex: 1, angle: 45, details: "Primary audio archive accessed. Broadcasting across the void." },
    { label: "NEBULA VISIONS", subtitle: "Visual Narrative", icon: Radio, orbitIndex: 2, angle: 160, details: "Crystalline visual history. The starfield captures the latest cinematic motion." },
    { label: "QUASAR VAULT", subtitle: "Deep Space Archive", icon: Star, orbitIndex: 3, angle: 280, details: "Intense energy visual vault unlocked. A gravitational pull to the center." },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center pt-12 md:pt-0">
      {/* Container */}
      <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden [mask-image:radial-gradient(circle,black_40%,transparent_100%)]">
        {/* Deep Nebula Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(183,110,121,0.15)_0%,_rgba(5,5,5,0)_70%)] opacity-80" />
        
        {/* Orbital Rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
            className="absolute mx-auto aspect-square rounded-full border shadow-[0_0_15px_rgba(255,255,255,0.01)]"
            style={{ 
              width: `${(i + 1) * 25}%`, 
              height: `${(i + 1) * 25}%`, 
              borderColor: i === 3 ? 'rgba(255,255,255,0.03)' : 'rgba(183,110,121,0.15)',
              borderStyle: i % 2 === 0 ? 'solid' : 'dashed', 
              borderWidth: '1px' 
            }}
          />
        ))}

        {/* Floating Space Dust */}
        {dustParticles.map((particle, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-30 shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Nodes (Planetary Bodies) */}
      {nodes.map((node, idx) => {
        const isActive = activeSignal === idx;
        const Icon = node.icon;
        const radius = (node.orbitIndex * 12.5); // percentage distance from center
        const rad = (node.angle * Math.PI) / 180;
        const top = `calc(50% + ${Math.sin(rad) * radius}%)`;
        const left = `calc(50% + ${Math.cos(rad) * radius}%)`;

        return (
          <div
            key={idx}
            className="absolute z-20 flex flex-col items-center justify-center transition-all duration-700"
            style={{ left, top, transform: 'translate(-50%, -50%)' }}
          >
            <motion.button
              onClick={() => setSelectedSignal(idx)}
              animate={isActive ? { scale: [1, 1.15, 1], boxShadow: ["0 0 10px rgba(183,110,121,0.2)", "0 0 35px rgba(94,0,8,0.6)", "0 0 10px rgba(183,110,121,0.2)"] } : { scale: 1 }}
              transition={{ duration: 4, repeat: isActive ? Infinity : 0 }}
              whileHover={{ scale: 1.15 }}
              className={`relative flex items-center cursor-pointer justify-center w-12 h-12 rounded-full overflow-hidden ${isActive ? 'bg-[#0a0a0a]' : 'bg-black/90'} border ${isActive ? 'border-[#5E0008]' : 'border-white/20 hover:border-white/40'} transition-colors duration-500`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_50%)]" />
               <Icon className={isActive ? "text-[#f2f2f2]" : "text-white/40"} size={16} />
            </motion.button>
            <motion.div 
               animate={isActive ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.3 }}
               transition={{ duration: 4, repeat: isActive ? Infinity : 0 }}
               className="mt-4 text-center absolute top-12 whitespace-nowrap cursor-pointer group/label"
               onClick={() => setSelectedSignal(idx)}
            >
              <p className="font-sans text-[10px] text-white font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover/label:text-[#B76E79] transition-colors">
                {node.label}
              </p>
              <p className="font-mono text-[8px] text-[#B76E79]/80 uppercase tracking-widest mt-1 group-hover/label:text-white transition-colors">
                {node.subtitle}
              </p>
            </motion.div>
          </div>
        );
      })}

      {/* Center Actor - Black Hole / Quasar (Giragon Dormant) */}
      <div className="absolute z-30 flex items-center justify-center w-32 h-32 rounded-full bg-[#02000a] border border-[#5E0008]/30 shadow-[0_0_50px_rgba(94,0,8,0.2)_inset,0_0_80px_rgba(183,110,121,0.3)] group cursor-pointer" title="The Creator">
        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 animate-[spin_10s_linear_infinite] border-t-[#B76E79]/60 transition-colors duration-1000" />
        <div className="absolute inset-2 rounded-full border border-[#B76E79]/20 animate-[spin_15s_linear_infinite_reverse] border-b-[#5E0008]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,0,8,0.1),_transparent_60%)] animate-pulse" />
        
        {/* Giragon Symbol & Animation */}
        <motion.div 
          className="relative z-10 flex items-center justify-center w-full h-full"
          animate={{ scale: [1, 1.06, 1], filter: ["brightness(0.9)", "brightness(1.2)", "brightness(0.9)"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(205,127,50,0.3)] transition-transform duration-700 group-hover:scale-110">
            <defs>
              <linearGradient id="bronze" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DF9C68" />
                <stop offset="50%" stopColor="#B87333" />
                <stop offset="100%" stopColor="#663300" />
              </linearGradient>
              <linearGradient id="silver" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A8A8A" />
                <stop offset="50%" stopColor="#D4D4D4" />
                <stop offset="100%" stopColor="#FAFAFA" />
              </linearGradient>
              <linearGradient id="bronzeDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A05A2C" />
                <stop offset="100%" stopColor="#4A2511" />
              </linearGradient>
            </defs>

            {/* Left Wing (Silver) */}
            <motion.path 
              d="M 50 45 L 15 20 L 25 55 L 10 65 L 40 70 Z" 
              fill="url(#silver)" 
              animate={{ rotate: [0, -3, 0], transformOrigin: "50px 45px" }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Right Wing (Silver) */}
            <motion.path 
              d="M 50 45 L 85 20 L 75 55 L 90 65 L 60 70 Z" 
              fill="url(#silver)" 
              animate={{ rotate: [0, 3, 0], transformOrigin: "50px 45px" }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Body / Head (Bronze) */}
            <path d="M 50 25 L 65 40 L 55 85 L 50 95 L 45 85 L 35 40 Z" fill="url(#bronze)" />
            
            {/* Crown (Silver) */}
            <motion.path 
              d="M 38 22 L 43 7 L 50 17 L 57 7 L 62 22 Z" 
              fill="url(#silver)"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner Face Detail (Dark Bronze) */}
            <path d="M 50 35 L 58 45 L 50 75 L 42 45 Z" fill="url(#bronzeDark)" />

            {/* Eyes / Energy Core */}
            <motion.path 
              d="M 45 50 L 48 52 L 45 54 Z M 55 50 L 52 52 L 55 54 Z" 
              fill="#B76E79" 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSignal !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 10, backdropFilter: "blur(0px)" }}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-[#02000a]/90 border border-[#B76E79]/30 p-8 flex flex-col gap-5 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(94,0,8,0.1)] rounded-sm"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#B76E79]/10 to-transparent pointer-events-none" />
            <button 
              onClick={() => setSelectedSignal(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="flex flex-col gap-1.5 pr-6 border-b border-white/10 pb-4 relative">
              <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-[2px] h-3/4 bg-[#5E0008]" />
              <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-white leading-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                {nodes[selectedSignal].label}
              </h4>
              <p className="font-mono text-[9px] tracking-widest uppercase text-[#B76E79]">
                {nodes[selectedSignal].subtitle}
              </p>
            </div>
            
            <p className="font-sans text-xs text-white/70 leading-relaxed font-light tracking-wide">
              {nodes[selectedSignal].details}
            </p>
            
            <button 
              onClick={() => setSelectedSignal(null)}
              className="mt-2 bg-white/5 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 py-3 px-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm"
            >
              Acknowledge
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

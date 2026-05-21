'use client';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Unhurried, deliberate timing.
    const timer = setTimeout(() => onComplete(), 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ delay: 2.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-8 text-[#E5E4E2] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif italic text-4xl md:text-5xl tracking-widest text-[#B76E79]"
        >
          KINGSHADP
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#E5E4E2]/50"
        >
          The Creator // The Create
        </motion.div>
      </div>

      {/* Subtle bottom load indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px bg-[#B76E79]"
        initial={{ width: "0%" }}
        animate={{ width: "20%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

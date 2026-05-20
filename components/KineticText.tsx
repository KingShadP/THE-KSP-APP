'use client';
import { motion } from 'motion/react';

export function KineticText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="relative inline-block group cursor-pointer perspective-[1000px]">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block relative transition-colors duration-300 group-hover:text-transparent"
          style={{ WebkitTextStroke: "1px rgba(198,184,158,0)" }}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.05, type: "spring", damping: 12 }}
        >
          <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-100 mix-blend-plus-lighter transition-all duration-300 drop-shadow-[0_0_20px_#c6b89e] scale-150 rotate-[10deg] pointer-events-none">
            {char}
          </span>
          <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">{char}</span>
        </motion.span>
      ))}
    </span>
  );
}

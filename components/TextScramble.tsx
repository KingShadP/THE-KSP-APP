'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CHARS = '!<>-_\\/[]{}—=+*^?#_01010101KINGSHADP';

export function TextScramble({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [output, setOutput] = useState('');
  
  useEffect(() => {
    let frame: number;
    let iteration = 0;
    const maxIterations = text.length * 3;
    let timeout: NodeJS.Timeout;

    const startAnimation = () => {
      const loop = () => {
        setOutput(text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(''));

        if (iteration < maxIterations) {
          iteration++;
          frame = requestAnimationFrame(loop);
        }
      };
      frame = requestAnimationFrame(loop);
    };

    timeout = setTimeout(startAnimation, delay);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <motion.span className={className}>{output}</motion.span>;
}

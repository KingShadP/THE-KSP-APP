'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  "COMMUNICATIONS PROTOCOL SECURED",
  "DECRYPTING ARCHIVAL VAULT",
  "IDENTITY VERIFIED: KINGSHADP",
  "AUTHORIZING PRESENCE"
];

export function VaultAuthorization({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step < MESSAGES.length) {
      timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1200 + Math.random() * 800);
    } else {
      timeout = setTimeout(() => {
        onComplete();
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [step, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-center">
        {/* Crest mark placeholder - structural luxury */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-16 h-16 border-t border-l border-[#B76E79]/50 rotate-45 mb-16 relative"
        >
          <div className="absolute inset-0 border-b border-r border-[#5E0008]/50" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[20%] border border-[#E5E4E2]/10 mix-blend-screen"
          />
        </motion.div>

        <div className="h-24 relative w-80 text-center flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step < MESSAGES.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute font-mono text-[10px] tracking-[0.4em] uppercase text-[#E5E4E2]/70"
              >
                {MESSAGES[step]}
              </motion.div>
            ) : (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="absolute font-serif italic text-2xl tracking-widest text-[#B76E79]"
              >
                THE VAULT IS OPEN
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Line */}
        <div className="w-px h-32 bg-[#E5E4E2]/10 mt-12 relative overflow-hidden">
          <motion.div 
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-[#5E0008] to-transparent"
          />
        </div>
      </div>
      
      {/* Cinematic noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </motion.div>
  );
}

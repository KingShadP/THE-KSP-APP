'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader } from '@/components/Loader';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Mandate } from '@/components/Mandate';
import { Reliquary } from '@/components/Reliquary';
import { Chronicles } from '@/components/Chronicles';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/Cursor';

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial artificial vault unlock delay to set the tone
    const timer = setTimeout(() => {
      setIsUnlocked(true);
      // Wait for the unlock animation before showing main scrollable content
      setTimeout(() => setShowContent(true), 2000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#E5E4E2] selection:bg-[#5E0008] selection:text-[#E5E4E2] font-sans antialiased">
      <Cursor />
      
      {/* Noise layer injected at the app root level for performance */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.035] mix-blend-screen"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundRepeat: 'repeat' }} 
      />

      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <Loader key="loader" />
        )}
      </AnimatePresence>

      <div 
        className="transition-opacity duration-1000"
        style={{ opacity: showContent ? 1 : 0, pointerEvents: showContent ? 'auto' : 'none' }}
      >
         <Navigation />
         
         <div className="relative z-10">
            <Hero />
            <Mandate />
            <Reliquary />
            <Chronicles />
            <Footer />
         </div>
      </div>
    </main>
  );
}

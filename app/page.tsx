'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { VaultAuthorization } from '@/components/VaultAuthorization';
import { HeroMonolith } from '@/components/HeroMonolith';
import { DualityManifesto } from '@/components/DualityManifesto';
import { ArtifactReliquary } from '@/components/ArtifactReliquary';
import { TelemetryOverlay } from '@/components/TelemetryOverlay';
import { CustomCursor } from '@/components/CustomCursor';
import { AtmosphereChamber } from '@/components/AtmosphereChamber';
import { GlobalAudioControl } from '@/components/GlobalAudioControl';

export default function EntryPortal() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (!isAuthorized) {
      document.body.style.overflow = 'hidden';
      // Fallback scroll to top
      window.scrollTo(0,0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAuthorized]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#050505] text-[#E5E4E2] selection:bg-[#5E0008] selection:text-[#E5E4E2] font-sans relative">
      <CustomCursor />
      
      {/* Abstract background elements */}
      <AtmosphereChamber />

      <AnimatePresence mode="wait">
        {!isAuthorized ? (
          <VaultAuthorization key="authorization" onComplete={() => setIsAuthorized(true)} />
        ) : (
          <motion.div 
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TelemetryOverlay scrollProgress={scrollYProgress} isAuthorized={isAuthorized} />
            <GlobalAudioControl />

            <main className="relative z-10 w-full overflow-hidden">
              <HeroMonolith scrollProgress={scrollYProgress} />
              <DualityManifesto scrollProgress={scrollYProgress} />
              <ArtifactReliquary />
              
              <footer className="w-full py-40 flex flex-col items-center justify-center border-t border-[#E5E4E2]/5 bg-[#050505] relative z-30">
                 <div className="font-serif italic text-3xl md:text-5xl text-[#E5E4E2]/20 mb-8">
                   The Create
                 </div>
                 <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B76E79]">
                   Initiate Contact
                 </div>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

export function TelemetryOverlay({ 
  scrollProgress,
  isAuthorized 
}: { 
  scrollProgress: MotionValue<number>;
  isAuthorized: boolean;
}) {
  const [telemetry, setTelemetry] = useState({ lat: '00.000', crypt: '0x000' });
  const scrollY = useTransform(scrollProgress, [0, 1], [0, 100]);

  useEffect(() => {
    if (!isAuthorized) return;
    
    // Only generate on client to prevent hydration mismatch
    const interval = setInterval(() => {
      setTelemetry({
        lat: (Math.random() * 90).toFixed(4),
        crypt: '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthorized]);

  if (!isAuthorized) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-4 md:p-8 mix-blend-screen opacity-60">
      {/* Frame Border */}
      <div className="absolute inset-4 md:inset-8 border border-[#E5E4E2]/10 pointer-events-none" />
      <div className="absolute inset-[17px] md:inset-[33px] border border-[#5E0008]/20 pointer-events-none" />

      {/* Top Left: Designation */}
      <div className="absolute top-10 left-10 md:top-14 md:left-14 font-mono text-[8px] tracking-[0.4em] text-[#B76E79] uppercase">
        AXIS // KINGSHADP
      </div>

      {/* Top Right: Status */}
      <div className="absolute top-10 right-10 md:top-14 md:right-14 font-mono text-[8px] tracking-[0.4em] text-[#E5E4E2]/50 uppercase flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-[#B76E79] rounded-full animate-pulse" />
        SECURE
      </div>

      {/* Bottom Left: Scroll Data */}
      <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14 font-mono text-[8px] tracking-[0.4em] text-[#E5E4E2]/30 uppercase flex flex-col gap-1">
        <span>Y-TENSION: <motion.span>{scrollY}</motion.span>%</span>
        <span>LAT_COORD: {telemetry.lat}</span>
      </div>

      {/* Bottom Right: Crypt Hash */}
      <div className="absolute bottom-10 right-10 md:bottom-14 md:right-14 font-mono text-[8px] tracking-[0.4em] text-[#5E0008] uppercase">
        HASH: {telemetry.crypt}
      </div>

      {/* Center Reticles - Subtle */}
      <div className="absolute top-1/2 left-4 md:left-8 w-2 h-px bg-[#B76E79]/40" />
      <div className="absolute top-1/2 right-4 md:right-8 w-2 h-px bg-[#B76E79]/40" />
      <div className="absolute bottom-4 md:bottom-8 left-1/2 w-px h-2 bg-[#B76E79]/40" />
      <div className="absolute top-4 md:top-8 left-1/2 w-px h-2 bg-[#B76E79]/40" />
    </div>
  );
}

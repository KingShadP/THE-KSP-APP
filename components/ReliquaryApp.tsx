'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Preloader } from './Preloader';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { Mandate } from './Mandate';
import { Collection } from './Collection';
import { Philosophy } from './Philosophy';
import { Timeline } from './Timeline';
import { Reliquary } from './Reliquary';
import { Chronicles } from './Chronicles';
import { ArtifactsChart } from './ArtifactsChart';
import { Footer } from './Footer';

export function ReliquaryApp() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[#050505] min-h-screen text-[#E5E4E2] select-none selection:bg-[#93000a] selection:text-white">
      {/* 1. Preloader Entrance */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* 2. Main High-End Luxury Interface Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {/* Persistent sound, navigation, and brand-coordinate telemetry HUD */}
        <Navigation />

        {/* Monolithic Title Hero Cover */}
        <Hero />

        {/* Aesthetic Mandate & Core Doctrines */}
        <Mandate />

        {/* Wearable Artifacts Showcase Catalog */}
        <Collection />

        {/* The Core KINGSHADP Philosophy & Design Codex */}
        <Philosophy />

        {/* The Archival Timeline */}
        <Timeline />

        {/* D3 Scarcity & Allocation Matrix Chart */}
        <section className="bg-[#050505] py-12 relative z-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
            <ArtifactsChart />
          </div>
        </section>

        {/* Certificate Acquisition & Interactive COA Vault */}
        <Reliquary />

        {/* Historic Chronicles & Archival Trivia */}
        <Chronicles />

        {/* Anchor Ground Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleAudio: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // Initialize global audio
      const audio = new Audio('/audio/ambient.mp3');
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(e => console.warn("Audio play blocked", e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleAudio }}>
      {children}
      {/* Global Floating Audio Toggle */}
      <button
        onClick={toggleAudio}
        data-cursor="pointer"
        className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full border border-[#E5E4E2]/20 bg-[#050505]/50 backdrop-blur flex items-center justify-center transition-colors hover:border-[#8A0F19] hover:bg-[#8A0F19]/20"
        aria-label="Toggle ambient audio"
      >
        {isMuted ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E5E4E2]/50">Audio Off</span>
        ) : (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A0F19]">Audio On</span>
        )}
      </button>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}

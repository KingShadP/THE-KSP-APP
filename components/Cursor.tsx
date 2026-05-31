'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringSubtle, setIsHoveringSubtle] = useState(false);
  
  // Quick spring for the dot, slower for the ring to create the trailing/radar effect
  const dotX = useSpring(-100, { damping: 30, stiffness: 400, mass: 0.2 });
  const dotY = useSpring(-100, { damping: 30, stiffness: 400, mass: 0.2 });
  
  const ringX = useSpring(-100, { damping: 20, stiffness: 150, mass: 0.6 });
  const ringY = useSpring(-100, { damping: 20, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    // Only initialize on desktop where mouse is the primary pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const mouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const hoverElements = 'a, button, input, textarea, select, [role="button"], iframe, .cursor-pointer, [data-cursor]';
      const isClickable = target.closest(hoverElements);
      
      if (isClickable) {
        if (target.closest('.platform-link') || target.classList.contains('platform-link')) {
          setIsHoveringSubtle(true);
          setIsHovering(false);
        } else {
          setIsHovering(true);
          setIsHoveringSubtle(false);
        }
      } else {
        setIsHovering(false);
        setIsHoveringSubtle(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, [dotX, dotY, ringX, ringY]);

  // Determine adaptive styles based on hover state
  const dotSize = 8;
  
  let ringSize = 48;
  if (isHovering) ringSize = 72;
  if (isHoveringSubtle) ringSize = 62;

  let ringBg = 'transparent';
  if (isHovering) ringBg = 'rgba(220, 20, 60, 0.15)';
  if (isHoveringSubtle) ringBg = 'rgba(94, 0, 8, 0.25)';
  
  let ringBorderColor = 'rgba(220, 20, 60, 0.5)';
  if (isHovering || isHoveringSubtle) ringBorderColor = 'rgba(220, 20, 60, 1)';
  
  let ringBorderWidth = 1;
  if (isHovering || isHoveringSubtle) ringBorderWidth = 2;
  
  let ringBoxShadow = '0 0 15px rgba(220, 20, 60, 0.3)';
  if (isHovering) {
    ringBoxShadow = '0 0 40px 8px rgba(220, 20, 60, 0.8), inset 0 0 20px 4px rgba(220, 20, 60, 0.5)';
  } else if (isHoveringSubtle) {
    ringBoxShadow = '0 0 50px 12px rgba(220, 20, 60, 0.9), inset 0 0 25px 6px rgba(220, 20, 60, 0.7)';
  }

  return (
    <>
      {/* Hide default cursor on desktop where custom cursor is active */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, iframe, [role="button"], .cursor-pointer, input, select { 
            cursor: none !important; 
          }
        }
      `}} />
      
      {/* Central Neon Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-[#5E0008] rounded-full pointer-events-none z-[110] mix-blend-screen hidden md:block"
      />
      
      {/* Springing Radar Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          backgroundColor: ringBg,
          borderColor: ringBorderColor,
          borderWidth: ringBorderWidth,
          boxShadow: ringBoxShadow,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 border-solid rounded-full pointer-events-none z-[109] transition-all duration-300 hidden md:block"
      />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'acquire' | 'view' | 'sound' | 'pointer'>('default');

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Check if device supports hover (desktop vs mobile)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
       return; 
    }

    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const customCursorElement = target.closest('[data-cursor]');
      if (customCursorElement) {
        const type = customCursorElement.getAttribute('data-cursor');
        setCursorType(type as any);
        setIsHovering(true);
        return;
      }

      if (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorType('pointer');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, [cursorX, cursorY]);

  // Determine dynamic scale and aesthetic values per type
  const getScale = () => {
    switch (cursorType) {
      case 'acquire': return 8;
      case 'view': return 7;
      case 'sound': return 7;
      case 'pointer': return 4;
      default: return 1;
    }
  };

  const getColor = () => {
    switch (cursorType) {
      case 'acquire': return '#93000a'; // Oxblood Accent Red
      case 'view': return '#dcc57b';    // Muted Gold
      case 'sound': return '#B76E79';   // Rose Gold
      case 'pointer': return '#B76E79';
      default: return '#E5E4E2';        // Polished Platinum
    }
  };

  const getTextColor = () => {
    switch (cursorType) {
      case 'view': return '#050505';
      default: return '#E5E4E2';
    }
  };

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        scale: getScale(),
        backgroundColor: getColor()
      }}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:flex items-center justify-center transition-all duration-300"
    >
       <span 
         className="font-mono text-[2px] tracking-wider uppercase font-bold transition-opacity duration-300" 
         style={{ 
           opacity: isHovering && cursorType !== 'pointer' && cursorType !== 'default' ? 1 : 0,
           color: getTextColor()
         }}
       >
         {cursorType === 'acquire' && 'ACQUIRE'}
         {cursorType === 'view' && 'VIEW'}
         {cursorType === 'sound' && 'AUDIO'}
       </span>
    </motion.div>
  );
}

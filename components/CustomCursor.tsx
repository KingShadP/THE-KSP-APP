'use client';
import { useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth springs for tracking
  const springX = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.1 });
  const springY = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.1 });
  
  const outerSpringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const outerSpringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      outerSpringX.set(e.clientX);
      outerSpringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none z-[9999999] hidden md:block">
      {/* Inner Core */}
      <motion.div
        className="fixed top-0 left-0 w-[3px] h-[3px] bg-[#c6b89e] rounded-full pointer-events-none mix-blend-screen shadow-[0_0_15px_#c6b89e]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isClicking ? 0 : isHovering ? 0 : 1,
        }}
      />
      
      {/* Reality Distortion Lens */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none mix-blend-difference rounded-full flex items-center justify-center border transition-all duration-300 z-[9999]",
          isHovering ? "border-white/40 bg-white/5 backdrop-invert backdrop-hue-rotate-180 shadow-[0_0_40px_rgba(255,255,255,0.2)]" : "border-[#c6b89e]/20 bg-transparent"
        )}
        style={{ 
          x: outerSpringX, 
          y: outerSpringY, 
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 40 : isHovering ? 140 : 50,
          height: isClicking ? 40 : isHovering ? 140 : 50,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      >
         <div className="w-[1px] h-[6px] bg-[#c6b89e]/80 absolute top-[-3px]" />
         <div className="w-[1px] h-[6px] bg-[#c6b89e]/80 absolute bottom-[-3px]" />
         <div className="w-[6px] h-[1px] bg-[#c6b89e]/80 absolute left-[-3px]" />
         <div className="w-[6px] h-[1px] bg-[#c6b89e]/80 absolute right-[-3px]" />
         
         {isHovering && (
           <motion.div 
             className="absolute inset-[10%] rounded-full border border-dashed border-white/40"
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           />
         )}
      </motion.div>

      {/* Coordinate Data */}
      <motion.div
        className="fixed top-4 left-4 text-[#c6b89e]/50 font-mono text-[8px] uppercase tracking-[2px] pointer-events-none"
        style={{ x: outerSpringX, y: outerSpringY }}
      >
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 bg-[#c6b89e] opacity-50" />
          {mousePosition.x} x {mousePosition.y}
        </div>
      </motion.div>
    </div>
  );
}

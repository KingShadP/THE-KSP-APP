'use client';
import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function ScrambleText({ 
  text, 
  duration = 800, 
  delay = 0,
  triggerOnHover = false 
}: { 
  text: string; 
  duration?: number; 
  delay?: number;
  triggerOnHover?: boolean;
}) {
  const [displayText, setDisplayText] = useState(triggerOnHover ? text : '');
  const [isScrambling, setIsScrambling] = useState(!triggerOnHover);
  const hoverRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isScrambling) {
       if (!triggerOnHover) setDisplayText(text);
       return;
    }

    let start = Date.now();
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;

      if (elapsed < delay) {
        timeoutId = setTimeout(animate, 50);
        return;
      }

      const activeElapsed = elapsed - delay;
      const progress = Math.min(activeElapsed / duration, 1);
      
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          newText += ' ';
          continue;
        }
        if (progress > i / text.length) {
          newText += text[i];
        } else {
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(newText);

      if (progress < 1) {
        timeoutId = setTimeout(animate, 30);
      } else {
        setIsScrambling(false);
      }
    };

    animate();

    return () => clearTimeout(timeoutId);
  }, [text, duration, delay, isScrambling, triggerOnHover]);

  return (
    <span 
      ref={hoverRef}
      onMouseEnter={() => {
        if (triggerOnHover) setIsScrambling(true);
      }}
      className="inline-block"
    >
      {displayText}
    </span>
  );
}

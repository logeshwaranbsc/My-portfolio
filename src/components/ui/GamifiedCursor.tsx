import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GamifiedCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClickActive, setIsClickActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.35 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add('cursor-none');
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClickActive(true);
    const handleMouseUp = () => setIsClickActive(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button';
      
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <motion.div
      style={{
        left: cursorSpringX,
        top: cursorSpringY,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed pointer-events-none z-[9999] w-12 h-12 flex items-center justify-center"
    >
      {/* Gaming Reticle SVG */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: isHovered ? 45 : 0,
          scale: isClickActive ? 0.75 : isHovered ? 1.25 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className="absolute"
      >
        {/* Outer dotted ring */}
        <motion.circle
          cx="24"
          cy="24"
          r="15"
          stroke={isHovered ? '#A3E635' : '#8B5CF6'}
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        
        {/* Crosshair Ticks */}
        {/* Top */}
        <motion.line
          x1="24"
          y1="2"
          x2="24"
          y2="7"
          stroke={isHovered ? '#A3E635' : '#8B5CF6'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bottom */}
        <motion.line
          x1="24"
          y1="41"
          x2="24"
          y2="46"
          stroke={isHovered ? '#A3E635' : '#8B5CF6'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Left */}
        <motion.line
          x1="2"
          y1="24"
          x2="7"
          y2="24"
          stroke={isHovered ? '#A3E635' : '#8B5CF6'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Right */}
        <motion.line
          x1="41"
          y1="24"
          x2="46"
          y2="24"
          stroke={isHovered ? '#A3E635' : '#8B5CF6'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Core Center Dot */}
      <motion.div
        animate={{
          scale: isClickActive ? 0.5 : isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? '#A3E635' : '#8B5CF6',
        }}
        className="w-2.5 h-2.5 rounded-full absolute shadow-[0_0_8px_rgba(139,92,246,0.6)]"
      />
    </motion.div>
  );
}

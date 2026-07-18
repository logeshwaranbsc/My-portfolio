import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '', ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -15; // Max 15 degree rotation
    const rY = (mouseX / width - 0.5) * 15;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setGlareStyle({
      opacity: 0.4,
      background: `radial-gradient(circle 150px at ${glareX}% ${glareY}%, rgba(139, 92, 246, 0.15), rgba(255, 255, 255, 0.05), transparent)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md shadow-2xl transition-all duration-300 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={glareStyle}
      />
      {children}
    </div>
  );
}

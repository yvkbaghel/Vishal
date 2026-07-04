'useRef';
'use client';

import { useEffect, useRef, useState } from 'react';

export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate stars on client only to avoid hydration mismatch
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);

    // Mouse movement parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xOffset = (clientX / innerWidth - 0.5) * 20; // max 20px drift
      const yOffset = (clientY / innerHeight - 0.5) * 20;

      containerRef.current.style.setProperty('--mouse-x-offset', `${xOffset}px`);
      containerRef.current.style.setProperty('--mouse-y-offset', `${yOffset}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden bg-background-cosmic select-none pointer-events-none"
      style={{
        transform: 'translate3d(var(--mouse-x-offset, 0px), var(--mouse-y-offset, 0px), 0)',
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform',
      }}
    >
      {/* Deep Space Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,58,183,0.15)_0%,rgba(5,8,22,0.95)_70%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/15 blur-[150px] opacity-30" />

      {/* Sparkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-80"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: star.size > 2 ? '0 0 8px 1px rgba(255,255,255,0.8)' : 'none',
            animation: `pulse-slow 3s infinite ease-in-out`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Golden Dust Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute w-2 h-2 rounded-full bg-secondary/60 blur-[1px] top-1/4 left-1/3 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute w-3 h-3 rounded-full bg-secondary/40 blur-[2px] top-2/3 left-1/4 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-primary/50 blur-[1px] top-1/3 right-1/4 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute w-4 h-4 rounded-full bg-accent/30 blur-[3px] top-3/4 right-1/3 animate-float" style={{ animationDelay: '4.5s' }} />
      </div>

      {/* Zodiac Constellation Grid Map overlay (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] stroke-white stroke-[0.5]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="30%" strokeDasharray="5,5" />
        <circle cx="50%" cy="50%" r="45%" strokeDasharray="3,6" />
        <line x1="50%" y1="0" x2="50%" y2="100%" />
        <line x1="0" y1="50%" x2="100%" y2="50%" />
        <line x1="15%" y1="15%" x2="85%" y2="85%" />
        <line x1="85%" y1="15%" x2="15%" y2="85%" />
      </svg>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export default function RudrakshMala({ isPlaying = false }: { isPlaying?: boolean }) {
  // We'll create a circle of 27 beads (a quarter of a 108 mala for visual clarity)
  // or maybe 36 beads so it looks like a nice necklace.
  const beadCount = 36;
  const radius = 180; // pixel radius of the circle

  return (
    <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center p-8">
      
      {/* Center Ambient Glow */}
      <div className="absolute inset-0 m-auto w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Rotating Mala (Necklace of Rudraksh Beads) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        {Array.from({ length: beadCount }).map((_, i) => {
          const angle = (i / beadCount) * (2 * Math.PI);
          // Calculate X and Y on the circle circumference
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/rudraksh.png"
                  alt="Rudraksh bead"
                  width={40}
                  height={40}
                  className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </div>
          );
        })}

        {/* Decorative thread connecting the beads */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border-[1.5px] border-[#8b5a2b]/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px] rounded-full border border-secondary/10 border-dashed" />
      </motion.div>

      {/* Center Icon (Strictly Stationary) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-52 h-52 rounded-full flex items-center justify-center overflow-hidden border-2 border-secondary/40 bg-gradient-to-b from-[#1a1528] to-[#0a0d22] shadow-[0_0_50px_rgba(255,193,7,0.2)] text-secondary"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.15)_0%,transparent_70%)]" />
        {isPlaying ? (
          <Pause className="w-24 h-24 drop-shadow-[0_0_15px_rgba(255,193,7,0.8)]" />
        ) : (
          <Play className="w-24 h-24 drop-shadow-[0_0_15px_rgba(255,193,7,0.8)] ml-4" />
        )}
      </div>
      
    </div>
  );
}

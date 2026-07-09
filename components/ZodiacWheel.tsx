'use client';

import { useState } from 'react';

const ZODIAC_SIGNS = [
  { english: 'Aries', sanskrit: 'मेष', lord: 'Mars', symbol: '♈' },
  { english: 'Taurus', sanskrit: 'वृषभ', lord: 'Venus', symbol: '♉' },
  { english: 'Gemini', sanskrit: 'मिथुन', lord: 'Mercury', symbol: '♊' },
  { english: 'Cancer', sanskrit: 'कर्क', lord: 'Moon', symbol: '♋' },
  { english: 'Leo', sanskrit: 'सिंह', lord: 'Sun', symbol: '♌' },
  { english: 'Virgo', sanskrit: 'कन्या', lord: 'Mercury', symbol: '♍' },
  { english: 'Libra', sanskrit: 'तुला', lord: 'Venus', symbol: '♎' },
  { english: 'Scorpio', sanskrit: 'वृश्चिक', lord: 'Mars', symbol: '♏' },
  { english: 'Sagittarius', sanskrit: 'धनु', lord: 'Jupiter', symbol: '♐' },
  { english: 'Capricorn', sanskrit: 'मकर', lord: 'Saturn', symbol: '♑' },
  { english: 'Aquarius', sanskrit: 'कुंभ', lord: 'Saturn', symbol: '♒' },
  { english: 'Pisces', sanskrit: 'मीन', lord: 'Jupiter', symbol: '♓' }
];

export default function ZodiacWheel() {
  const [hoveredSign, setHoveredSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[500px] aspect-square mx-auto">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-secondary/5 blur-[40px] animate-pulse-slow" />

      {/* SVG Rotating Zodiac Wheel */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full animate-slow-rotate cursor-pointer filter drop-shadow-[0_0_15px_rgba(255,193,7,0.3)] transition-transform duration-700"
      >
        {/* Background dark circle */}
        <circle cx="200" cy="200" r="190" className="fill-[#090d22] stroke-secondary/30 stroke-[2]" />
        
        {/* Outer Ring markings */}
        <circle cx="200" cy="200" r="180" className="fill-none stroke-secondary/20 stroke-[1] stroke-dasharray-[2,4]" />
        <circle cx="200" cy="200" r="172" className="fill-none stroke-secondary/40 stroke-[1.5]" />
        
        {/* Inner center ring border to contain the inner Rudraksh mala */}
        <circle cx="200" cy="200" r="70" className="fill-[#050816] stroke-secondary/30 stroke-[1.5]" />

        {/* 12 Divisions and Zodiac Symbols */}
        {ZODIAC_SIGNS.map((sign, index) => {
          const angle = index * 30; // 360 / 12
          const rotationRad = (angle * Math.PI) / 180;
          const lineX = (200 + 172 * Math.cos(rotationRad)).toFixed(3);
          const lineY = (200 + 172 * Math.sin(rotationRad)).toFixed(3);
          
          // Symbol Placement
          const symbolAngle = angle + 15;
          const symbolRad = (symbolAngle * Math.PI) / 180;
          const symX = (200 + 135 * Math.cos(symbolRad)).toFixed(3);
          const symY = (200 + 135 * Math.sin(symbolRad)).toFixed(3);

          // Sanskrit Text Placement
          const txtX = (200 + 95 * Math.cos(symbolRad)).toFixed(3);
          const txtY = (200 + 95 * Math.sin(symbolRad)).toFixed(3);

          return (
            <g
              key={sign.english}
              onMouseEnter={() => setHoveredSign(sign)}
              className="group cursor-pointer"
            >
              {/* Sector line divider */}
              <line
                x1="200"
                y1="200"
                x2={lineX}
                y2={lineY}
                className="stroke-secondary/30 stroke-[1]"
              />

              {/* Sector highlight pie on hover */}
              <path
                d={`M 200 200 
                    L ${(200 + 172 * Math.cos(rotationRad)).toFixed(3)} ${(200 + 172 * Math.sin(rotationRad)).toFixed(3)} 
                    A 172 172 0 0 1 ${(200 + 172 * Math.cos(((angle + 30) * Math.PI) / 180)).toFixed(3)} ${(200 + 172 * Math.sin(((angle + 30) * Math.PI) / 180)).toFixed(3)} 
                    Z`}
                className="fill-transparent group-hover:fill-primary/10 transition-colors duration-300"
              />

              {/* Zodiac Glyph Symbol */}
              <text
                x={symX}
                y={symY}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${symbolAngle + 90}, ${symX}, ${symY})`}
                className="fill-secondary font-sans text-xl font-bold group-hover:fill-white group-hover:scale-125 transition-all duration-300 select-none"
              >
                {sign.symbol}
              </text>

              {/* Sanskrit Text */}
              <text
                x={txtX}
                y={txtY}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${symbolAngle + 90}, ${txtX}, ${txtY})`}
                className="fill-muted-cosmic/70 font-devanagari text-[9px] group-hover:fill-secondary transition-colors duration-300 select-none"
              >
                {sign.sanskrit}
              </text>
            </g>
          );
        })}
      </svg>


    </div>
  );
}

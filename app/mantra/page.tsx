import React from 'react';
import { Music, PlayCircle } from 'lucide-react';

const MANTRA_LIST = [
  { name: 'Gayatri Mantra', file: '/mantra.mp3', duration: 'Unknown' },
  { name: 'Mahamrityunjaya Mantra', file: '/mantra.mp3', duration: 'Unknown' },
  { name: 'Om Namah Shivaya', file: '/mantra.mp3', duration: 'Unknown' },
  { name: 'Ganesh Mantra', file: '/mantra.mp3', duration: 'Unknown' },
];

export default function MantraPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cinzel text-4xl md:text-5xl text-center text-white font-bold mb-4 tracking-wider">
          Sacred <span className="text-secondary">Mantras</span>
        </h1>
        <p className="text-center text-slate-300 font-inter mb-12 max-w-2xl mx-auto">
          Experience the divine resonance. Listen to powerful Vedic mantras to bring peace, prosperity, and spiritual growth to your life.
        </p>

        <div className="grid gap-6">
          {MANTRA_LIST.map((mantra, index) => (
            <div key={index} className="glass p-6 rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center border border-white/5 flex-shrink-0 group hover:scale-105 transition-transform">
                <Music className="w-7 h-7 text-secondary" />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-cinzel text-xl text-white font-semibold tracking-wide mb-1">
                  {mantra.name}
                </h3>
                <p className="font-inter text-sm text-slate-400">
                  Divine Chant • mp3
                </p>
              </div>

              <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
                <audio 
                  controls 
                  className="w-full md:w-64 max-w-full" 
                  controlsList="nodownload"
                >
                  <source src={mantra.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

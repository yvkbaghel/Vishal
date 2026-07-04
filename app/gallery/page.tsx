'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, X, ZoomIn } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, title: 'Varanasi Ashram Temple Puja', category: 'temple', desc: 'Performances of planetary pacification rituals at our Varanasi sanctum.' },
  { id: 2, title: 'Corporate Astrology Conference', category: 'events', desc: 'Acharya Vishal presenting scientific planetary coordinates to directors.' },
  { id: 3, title: 'Sanskrit Lineage Certificate', category: 'awards', desc: 'Acharya degree certification ceremony under traditional Gurus.' },
  { id: 4, title: 'Personalized Kundli Reading Room', category: 'consultation', desc: 'Our premium glassmorphic consulting chamber designed by Vastu Shastra.' },
  { id: 5, title: 'Vastu Site Review', category: 'consultation', desc: 'Analyzing directional flows and five elements balance on commercial sites.' },
  { id: 6, title: 'National Jyotish Award Ceremony', category: 'awards', desc: 'Receiving the Shiromani title for contribution to Vedic science.' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Visual Archives
            </span>
          </div>
          <h1 className="font-cinzel text-4xl font-bold tracking-wide text-white">
            Media Gallery
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Explore photos and visuals of our ashram temple, global consultation rooms, Vastu audits, and national award ceremonies.
          </p>
        </div>

        {/* Filter Tab list */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {['all', 'temple', 'consultation', 'awards', 'events'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-inter text-[10px] tracking-wider uppercase font-semibold border transition-all ${
                filter === cat
                  ? 'bg-secondary text-[#050816] border-secondary'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:border-secondary/20'
              }`}
            >
              {cat === 'all' ? 'All Images' : cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxImage(item)}
                className="rounded-xl overflow-hidden glass border border-white/5 group cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-4/3 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  {/* Simulated image backdrop using gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-[#050816] group-hover:scale-105 transition-transform duration-500" />
                  <ImageIcon className="w-12 h-12 text-secondary/40 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="font-inter text-[9px] uppercase tracking-widest text-secondary font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-xs font-bold text-white group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-inter text-[10px] text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white hover:text-secondary p-1"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full glass rounded-2xl overflow-hidden border border-secondary/20"
              >
                <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-[#050816]" />
                  <ImageIcon className="w-20 h-20 text-secondary/30" />
                </div>
                <div className="p-6 bg-[#0a0e22] flex flex-col gap-2">
                  <span className="font-inter text-[10px] uppercase tracking-widest text-secondary font-bold">
                    {lightboxImage.category}
                  </span>
                  <h2 className="font-cinzel text-base font-bold text-white">{lightboxImage.title}</h2>
                  <p className="font-inter text-xs text-slate-400 leading-relaxed mt-1">{lightboxImage.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

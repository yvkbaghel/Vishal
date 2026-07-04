'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, User, Quote, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Vikram Sethi',
    role: 'Tech Entrepreneur',
    rating: 5,
    remedy: 'Gemstone & Business Muhurtha',
    text: 'I was experiencing severe cash flow bottlenecks and partnership friction in my AI startup. Acharya Vishal analyzed my D10 chart, identified a weak Mercury, and recommended an untreated emerald wearing ritual along with launching our product on a specific Muhurtha date. Within 4 months, we signed a seed funding round and resolved core conflicts.',
  },
  {
    name: 'Ananya Sharma',
    role: 'Marketing Lead',
    rating: 5,
    remedy: 'Marriage Compatibility Match',
    text: 'Before getting married, my family was highly anxious about my Manglik placement. Acharya Vishal conducted a detailed matching session, showed how the Dosha was cancelled by my husband\'s strong Jupiter aspect, and suggested simple Saturday charities instead of scary rituals. We have been happily married for 3 years now with zero friction.',
  },
  {
    name: 'Dr. Ramesh Iyer',
    role: 'Senior Cardiologist',
    rating: 5,
    remedy: 'Health & Vitality Dasha Map',
    text: 'As a medical professional, I was skeptical of astrology. However, during a difficult Saturn-Rahu transit, I suffered from unexplained exhaustion and health alerts. Acharya Vishal correctly identified the timeline of vulnerability in my 6th house. The suggested Nadi pranayama and Mahamrityunjaya chanting complemented my medical recovery beautifully.',
  },
  {
    name: 'Rajesh K. Mehta',
    role: 'Real Estate Developer',
    rating: 5,
    remedy: 'Commercial Vastu Shastra',
    text: 'Our commercial township project was stalled due to legal disputes and low client bookings. Acharya Vishal mapped the property, identified elemental blockages in the North-East corner, and suggested placing elemental correctors without demolishing walls. The legal dispute resolved, and bookings spiked within a single quarter.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Trusted Globally
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Client Success Stories
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Read testimonials from global entrepreneurs, medical practitioners, and couples who aligned their lives using Vedic chart coordinates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass rounded-xl p-8 border border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all duration-300 relative group"
            >
              <Quote className="w-10 h-10 text-secondary/10 absolute right-8 top-8" />
              
              <div className="flex flex-col gap-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="font-cormorant text-base text-slate-300 leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Seeker Profile details */}
              <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-cinzel text-xs font-bold text-white leading-none">{item.name}</span>
                    <span className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1 leading-none">
                      {item.role}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/5 rounded border border-secondary/10 text-[9px] font-inter text-secondary uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{item.remedy}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trustpilot / Google Reviews Widget Highlight */}
        <div className="rounded-2xl glass-premium p-1 text-center max-w-3xl mx-auto">
          <div className="bg-[#0b1026] rounded-2xl py-12 px-6 flex flex-col items-center gap-6 border border-white/5">
            <h3 className="font-cinzel text-xl font-bold text-white">4.9/5 Rating Across 420+ Google Reviews</h3>
            <p className="font-inter text-xs text-slate-400 max-w-md leading-relaxed">
              We maintain a 100% confidential repository of client profiles. Standard ratings are updated monthly directly from our booking dashboard reviews.
            </p>
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

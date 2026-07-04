'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight,
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home as HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint
} from 'lucide-react';
import servicesData from '@/data/services.json';

// Map icon strings to Lucide components
const iconMap: { [key: string]: any } = {
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home: HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint
};

export default function ServicesPage() {
  return (
    <div className="w-full relative py-20 px-6">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Lineage Consultation Options
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Astrological Solutions & Services
          </h1>
          <p className="font-cormorant text-lg sm:text-xl text-slate-300 max-w-2xl italic leading-relaxed">
            Configure your destiny. Choose from our comprehensive list of Vedic chart audits, gemstone configurations, relationship matching, and architectural Vastu audits.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const ServiceIcon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-xl glass p-8 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(103,58,183,0.18)] hover:border-secondary/30 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform duration-300">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-cinzel text-xl font-bold text-white group-hover:text-secondary transition-colors">
                      {service.title}
                    </h2>
                    <span className="font-devanagari text-xs text-secondary/60 font-medium">
                      {service.sanskrit}
                    </span>
                  </div>
                  
                  <p className="font-inter text-xs text-slate-400 leading-relaxed mb-8">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-inter">
                    Vimshottari Dasha Guided
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-secondary font-inter text-xs font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-all"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-24 rounded-2xl glass-premium p-1 text-center max-w-4xl mx-auto">
          <div className="bg-[#0c1228] rounded-2xl py-12 px-6 flex flex-col items-center gap-6 border border-white/5">
            <h3 className="font-cinzel text-2xl font-bold text-white">Unsure Which Reading Fits Your Situation?</h3>
            <p className="font-inter text-xs text-slate-400 max-w-xl leading-relaxed">
              If you have multiple questions regarding career, relationship health, and gemstones simultaneously, we highly recommend booking a **General Kundli Reading**. It covers all aspects of your life.
            </p>
            <div className="flex gap-4">
              <Link
                href="/services/kundli"
                className="px-6 py-3.5 bg-secondary text-[#050816] rounded-full font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors"
              >
                Go To Kundli Reading
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 glass text-white rounded-full font-inter text-xs tracking-wider uppercase font-bold hover:border-secondary/35 transition-colors"
              >
                Consult Ashram Helpdesk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

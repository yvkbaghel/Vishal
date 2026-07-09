'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ChevronDown, Award, Users, 
  Map, Star, ArrowRight, Play, BookOpen, AlertCircle,
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home as HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint, Pause, Volume2, VolumeX
} from 'lucide-react';
import servicesData from '@/data/services.json';
import blogsData from '@/data/blogs.json';
import dynamic from 'next/dynamic';

const ZodiacWheel = dynamic(() => import('@/components/ZodiacWheel'), {
  ssr: false,
  loading: () => <div className="w-full max-w-[450px] aspect-square rounded-full bg-white/5 animate-pulse" />
});

const RudrakshMala = dynamic(() => import('@/components/RudrakshMala'), {
  ssr: false,
  loading: () => <div className="w-full max-w-[450px] aspect-square rounded-full bg-white/5 animate-pulse" />
});

// Map icon strings to Lucide components
const iconMap: { [key: string]: any } = {
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home: HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Statistics counters state
  const [stats, setStats] = useState({
    experience: 0,
    clients: 0,
    predictions: 0,
    countries: 0,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side to avoid SSR issues
    audioRef.current = new Audio('/mantra.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Simple mock counter animation on load
    const interval = setInterval(() => {
      setStats((prev) => {
        const next = { ...prev };
        if (next.experience < 18) next.experience += 1;
        if (next.clients < 15) next.clients += 1; // will multiply by 1000 in render
        if (next.predictions < 98) next.predictions += 2; // will represent 98% success
        if (next.countries < 42) next.countries += 2;
        
        if (next.experience === 18 && next.clients === 15 && next.predictions === 98 && next.countries === 42) {
          clearInterval(interval);
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-10 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20 self-center lg:self-start">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-secondary font-bold">
                Luxury Vedic Astrology Ashram
              </span>
            </div>
            
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white leading-tight">
              Transform Your <br />
              <span className="text-gold-gradient text-glow-gold">Destiny</span> Through <br />
              Ancient Wisdom
            </h1>
            
            <p className="font-cormorant text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed italic">
              &ldquo;The stars are not barriers; they are templates. Discover the cosmic alignments of your birth chart to navigate your career, relationships, and health.&rdquo;
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-inter text-xs tracking-widest uppercase font-bold text-background-cosmic bg-secondary hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]"
              >
                Book Consultation
              </Link>
              <Link
                href="/kundli"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-inter text-xs tracking-widest uppercase font-bold text-white glass hover:border-secondary/50 transition-all duration-300"
              >
                Generate Kundli
              </Link>
              <button
                onClick={toggleAudio}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-inter text-xs tracking-widest uppercase font-bold text-secondary border border-secondary/20 hover:bg-secondary/10 transition-all duration-300"
              >
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                <span>{isPlaying ? 'Playing Mantra' : 'Play Mantra'}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 mt-4 text-center lg:text-left">
              <div>
                <p className="font-cinzel text-2xl font-bold text-secondary">{stats.experience}+</p>
                <p className="font-inter text-[9px] uppercase tracking-widest text-slate-400 mt-1">Years of Practice</p>
              </div>
              <div>
                <p className="font-cinzel text-2xl font-bold text-white">{stats.clients}K+</p>
                <p className="font-inter text-[9px] uppercase tracking-widest text-slate-400 mt-1">Global Clients</p>
              </div>
              <div>
                <p className="font-cinzel text-2xl font-bold text-secondary">{stats.predictions}%</p>
                <p className="font-inter text-[9px] uppercase tracking-widest text-slate-400 mt-1">Accuracy Index</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Content - Combined Zodiac Wheel & Rudraksh Mala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center relative min-h-[500px] cursor-pointer"
            onClick={toggleAudio}
          >
            {/* Audio Visualizer Rings (Active when playing) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div 
                animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-[500px] h-[500px] rounded-full border-2 border-secondary/40"
              />
              <motion.div 
                animate={isPlaying ? { scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                className="absolute w-[500px] h-[500px] rounded-full border border-secondary/20"
              />
            </div>
            
            {/* Background Zodiac Wheel */}
            <div className="absolute inset-0 w-full max-w-[500px] z-10 m-auto flex items-center justify-center pointer-events-none">
              <div className="w-full pointer-events-auto">
                <ZodiacWheel />
              </div>
            </div>

            {/* Inner Rudraksh Mala (Scaled down to fit inside the Zodiac Wheel) */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-[450px] scale-[0.45] pointer-events-auto">
                <RudrakshMala />
              </div>
            </div>
            <div className="absolute -bottom-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="font-inter text-[10px] tracking-widest uppercase text-secondary font-bold">
                {isPlaying ? 'Pause Mantra' : 'Click to Play Mantra'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SANSKRIT BANNER MANTRA */}
      <section className="relative py-12 bg-surface-cosmic/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-devanagari text-2xl sm:text-3xl tracking-wide text-secondary/80 text-glow-gold">
            ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥
          </p>
          <p className="font-cormorant text-xs sm:text-sm tracking-widest uppercase text-slate-400 italic mt-3">
            Lead me from untruth to truth, from darkness to light, and from death to immortality
          </p>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Timeline / Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl glass-premium p-1 overflow-hidden"
          >
            {/* Visual representation card */}
            <div className="relative bg-[#0d132a] rounded-2xl p-8 sm:p-12 overflow-hidden flex flex-col gap-6 border border-white/5">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white">Acharya Vishal</h3>
                  <p className="font-cormorant text-xs uppercase tracking-widest text-slate-400">Chief Vedic Astrologer</p>
                </div>
              </div>
              <p className="font-inter text-sm text-slate-300 leading-relaxed">
                Acharya Vishal is a world-renowned Vedic counselor with over 18 years of rigorous lineage study. Combining pure Jyotish teachings with modern psychological clarity, he guides corporate leaders, politicians, and couples globally.
              </p>
              
              {/* Timeline Steps */}
              <div className="flex flex-col gap-4 border-l border-secondary/20 pl-4 ml-2 mt-4 text-xs">
                <div className="relative">
                  <div className="absolute left-[-21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-secondary font-bold">2008: Lineage Studies</span>
                  <p className="text-slate-400 mt-1">Rigorous training in Varanasi under Vedic scholars, completing Siddhanta studies.</p>
                </div>
                <div className="relative">
                  <div className="absolute left-[-21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-secondary font-bold">2015: Global Consulting</span>
                  <p className="text-slate-400 mt-1">Expanding services online to connect with spiritual seekers across 40+ countries.</p>
                </div>
                <div className="relative">
                  <div className="absolute left-[-21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-secondary font-bold">Present: VishalAstro Ashram</span>
                  <p className="text-slate-400 mt-1">Pioneering a luxury, premium sanctuary bridging spiritual alignment with practical wisdom.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-white">
              Bridging Cosmic Blueprints With <span className="text-secondary">Conscious Action</span>
            </h2>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              We do not treat astrology as passive fortune-telling. Vedic astrology (Jyotish) translates literally to &ldquo;the science of light.&rdquo; It is a cosmic weather forecast that details where your planetary coordinates have placed roadblocks and where they have created fertile ground.
            </p>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Whether you are at a career crossroad, searching for relationship validation, experiencing health setbacks, or planning international relocation, our scientific approach analyzes divisional charts, yogas, and dashas to define remedies that actually yield practical, testable results.
            </p>
            <div className="flex gap-8 mt-4">
              <div>
                <p className="font-cinzel text-3xl font-bold text-secondary">42+</p>
                <p className="font-inter text-[10px] uppercase tracking-widest text-slate-400 mt-1">Countries Served</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="font-cinzel text-3xl font-bold text-white">15K+</p>
                <p className="font-inter text-[10px] uppercase tracking-widest text-slate-400 mt-1">Satisfied Seekers</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-secondary font-inter text-xs font-bold uppercase tracking-wider mt-4 hover:translate-x-1 transition-transform"
            >
              <span>Explore My Full Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES CATALOGUE GRID */}
      <section className="relative py-24 bg-surface-cosmic/20 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-white">
              Vedic Astrology Services
            </h2>
            <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
              Select an area of focus to align your charts. Each consultation includes custom remedial blueprints and ongoing email support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const ServiceIcon = iconMap[service.icon] || Sparkles;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="rounded-xl glass p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(103,58,183,0.15)] hover:border-secondary/30 transition-all duration-300 group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <span className="font-devanagari text-xs text-secondary/60 font-medium">
                        {service.sanskrit}
                      </span>
                    </div>
                    <p className="font-inter text-xs text-slate-400 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-secondary font-inter text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-all"
                  >
                    <span>Consultation details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE CONSULTATION TIMELINE PROCESS */}
      <section className="relative py-24 max-w-7xl mx-auto px-6">
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-white">
            The Consultation Journey
          </h2>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            A scientific, structured workflow designed to deliver highly accurate predictions and comfortable guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
          {/* Process steps */}
          {[
            { step: '1', title: 'Schedule Session', desc: 'Book your slot online and select your focus parameters.' },
            { step: '2', title: 'Share Details', desc: 'Provide exact birth time, place, and date parameters.' },
            { step: '3', title: 'Chart Analysis', desc: 'Acharya Vishal reviews D1, D9, transits, and dashas for 4 hours.' },
            { step: '4', title: 'Video Consultation', desc: 'A personal 45-minute interactive video call to align remedies.' },
            { step: '5', title: 'Remedial Map', desc: 'Receive custom mantras, gemstone recommendations, and schedules.' },
            { step: '6', title: 'Continuous Support', desc: '2 weeks of clarifying email communication post-session.' },
          ].map((item, idx) => (
            <div key={item.step} className="flex flex-col items-center text-center relative group">
              <div className="w-12 h-12 rounded-full bg-surface-cosmic border border-white/10 flex items-center justify-center font-cinzel text-base font-bold text-secondary mb-4 group-hover:bg-primary/20 group-hover:border-secondary transition-all">
                {item.step}
              </div>
              <h3 className="font-cinzel text-xs font-bold text-white mb-2">{item.title}</h3>
              <p className="font-inter text-[10px] text-slate-400 leading-relaxed">{item.desc}</p>
              
              {/* Arrow spacer helper */}
              {idx < 5 && (
                <div className="hidden lg:block absolute right-[-24px] top-6 w-12 h-[1px] bg-gradient-to-r from-secondary/40 to-transparent z-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. EMBEDDED YOUTUBE FEATURED VIDEOS CAROUSEL */}
      <section className="relative py-24 bg-surface-cosmic/30 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <h2 className="font-cinzel text-3xl font-bold tracking-wide text-white">
                Featured Spiritual Media
              </h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                Watch Acharya Vishal elaborate on transit calculations, Kundli structures, and spiritual alignment. We publish weekly forecasts to prepare you for critical dates.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-inter text-[10px] tracking-widest uppercase font-bold text-white bg-red-600 hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Subscribe on YouTube</span>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Demystifying Rahu & Ketu Karmic Nodes', id: '1', duration: '14:20' },
                { title: 'Astrological Keys to Financial Abundance', id: '2', duration: '18:05' },
              ].map((video) => (
                <div key={video.id} className="rounded-xl overflow-hidden glass border border-white/10 group flex flex-col">
                  <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                    {/* Simulated video graphic */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,58,183,0.3)_0%,rgba(5,8,22,1)_100%)] opacity-80" />
                    <Play className="w-12 h-12 text-secondary group-hover:scale-110 transition-transform z-10" />
                    <span className="absolute bottom-3 right-3 text-[10px] bg-black/60 px-2 py-0.5 rounded text-white font-inter">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <span className="font-inter text-[9px] uppercase tracking-widest text-secondary font-bold">Vedic Lessons</span>
                    <h3 className="font-cinzel text-xs font-bold text-white group-hover:text-secondary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. KNOWLEDGE BASE HUB (BLOG PREVIEW) */}
      <section className="relative py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-cinzel text-3xl font-bold text-white">Astrology Knowledge Center</h2>
            <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
              Read editorial breakdowns on zodiac alignment maps and detailed remedial methodologies.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-inter text-[10px] tracking-widest uppercase font-bold text-white glass hover:border-secondary/50 transition-all self-start"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsData.slice(0, 3).map((blog) => (
            <article key={blog.slug} className="rounded-xl glass overflow-hidden flex flex-col justify-between border border-white/5 hover:border-secondary/20 transition-all group">
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] font-inter text-slate-400">
                  <span className="text-secondary font-bold uppercase tracking-wider">{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="font-cinzel text-base font-bold text-white group-hover:text-secondary transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="font-inter text-xs text-slate-400 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="font-inter text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-secondary inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="relative py-24 bg-surface-cosmic/10 border-t border-white/5 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="font-cinzel text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="font-cormorant text-lg text-slate-300 italic">
              Clarifications about Vedic consulting, accuracy boundaries, and scheduling procedures.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: 'How does Vedic astrology differ from Western astrology?',
                a: 'Vedic astrology uses the Sidereal zodiac, aligning calculations with the physical placements of stars. Western astrology uses the Tropical zodiac, locked to the seasons. Because of the earth\'s axis tilt, the two calendars differ by approximately 24 degrees, offering highly different coordinate readings.'
              },
              {
                q: 'What is required for the consultation?',
                a: 'You must provide your date of birth, place of birth, and exact birth time. If your time is estimated within a 15-minute range, we perform birth time rectification based on major life events before analyzing details.'
              },
              {
                q: 'Are the astrological remedies difficult or expensive to complete?',
                a: 'No. Acharya Vishal believes in practical, sustainable remedies. While gemstone recommendations are optionally included, we prioritize sound vibration mantras, timing adjustments (Muhurtha), and charity alignments.'
              },
              {
                q: 'How long after scheduling will I receive my call?',
                a: 'Because Acharya Vishal manually rectifies and analyzes each chart for several hours, we schedule calls 3 to 7 days post-booking to ensure absolute thoroughness.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg glass border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-cinzel text-sm text-white hover:text-secondary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 font-inter text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LARGE ANIMATED CTA BANNER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-2xl glass-premium p-1 relative overflow-hidden">
          <div className="relative bg-[#0d132a] rounded-2xl py-16 px-8 sm:px-12 flex flex-col items-center text-center gap-8 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-white leading-tight">
              Ready to Align Your Cosmic Blueprint?
            </h2>
            
            <p className="font-cormorant text-lg text-slate-300 max-w-xl italic leading-relaxed">
              Book a personal, comprehensive consultation with Acharya Vishal to map your career paths, compatibility structures, and karmic timelines.
            </p>
            
            <Link
              href="/booking"
              className="px-8 py-4 rounded-full font-inter text-xs tracking-widest uppercase font-bold text-background-cosmic bg-secondary hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]"
            >
              Book Consultation Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

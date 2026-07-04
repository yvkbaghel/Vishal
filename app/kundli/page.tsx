'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, MapPin, User, Compass, HelpCircle, AlertCircle } from 'lucide-react';

export default function KundliPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    gender: 'Male',
    pob: '',
  });

  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.tob || !formData.pob) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1500); // Simulated calculations
  };

  return (
    <div className="w-full relative py-20 px-6">
      {/* Background celestial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Compass className="w-3.5 h-3.5 text-secondary animate-spin-slow" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              North Indian Chart Generator
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Vedic Kundli Generator
          </h1>
          <p className="font-cormorant text-lg sm:text-xl text-slate-300 max-w-2xl italic leading-relaxed">
            Enter your exact birth parameters to compute your planetary coordinates and render your D1 Birth Chart (Lagna Kundli) with lineage Vedic interpretations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Panel */}
          <div className="lg:col-span-5">
            <div className="glass rounded-xl p-8 border border-white/5 flex flex-col gap-6">
              <h2 className="font-cinzel text-lg font-bold text-white mb-2 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[1px] after:bg-secondary">
                Birth Parameters
              </h2>
              
              <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter seeker's name"
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                      required
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Date and Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                        required
                      />
                      <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                      Time of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        name="tob"
                        value={formData.tob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                        required
                      />
                      <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {/* Gender and Place Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0d132a] border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                      Place of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="pob"
                        value={formData.pob}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full px-4 py-3 pl-10 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                        required
                      />
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-secondary text-[#050816] rounded-lg font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4.5 h-4.5 border-2 border-[#050816] border-t-transparent rounded-full animate-spin" />
                      <span>Recalculating Stars...</span>
                    </>
                  ) : (
                    <span>Generate Birth Chart</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Chart and Interpretation Output */}
          <div className="lg:col-span-7">
            {generated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-8"
              >
                {/* Birth details card */}
                <div className="glass rounded-xl p-6 border border-secondary/20 flex flex-wrap justify-between items-center gap-4 bg-[#0a0d22]">
                  <div className="flex flex-col gap-1">
                    <span className="font-inter text-[9px] uppercase tracking-widest text-secondary font-bold">Seeker Profile</span>
                    <h3 className="font-cinzel text-lg font-bold text-white">{formData.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-inter text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase text-slate-500">Birthdate</span>
                      <span className="text-white font-bold">{formData.dob}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                      <span className="text-[9px] uppercase text-slate-500">Birthtime</span>
                      <span className="text-white font-bold">{formData.tob}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                      <span className="text-[9px] uppercase text-slate-500">Coordinates</span>
                      <span className="text-white font-bold">{formData.pob}</span>
                    </div>
                  </div>
                </div>

                {/* Kundli Layout and details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Square Vedic Birth Chart SVG (North Indian Style) */}
                  <div className="relative w-full aspect-square max-w-[320px] mx-auto">
                    <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(255,193,7,0.15)]">
                      {/* Base Square */}
                      <rect x="10" y="10" width="280" height="280" className="fill-[#0e122a] stroke-secondary/60 stroke-[2.5]" />
                      
                      {/* Intersecting lines forming standard 12 North Indian houses */}
                      <line x1="10" y1="10" x2="290" y2="290" className="stroke-secondary/40 stroke-[1.5]" />
                      <line x1="290" y1="10" x2="10" y2="290" className="stroke-secondary/40 stroke-[1.5]" />
                      
                      <line x1="150" y1="10" x2="10" y2="150" className="stroke-secondary/40 stroke-[1.5]" />
                      <line x1="10" y1="150" x2="150" y2="290" className="stroke-secondary/40 stroke-[1.5]" />
                      <line x1="150" y1="290" x2="290" y2="150" className="stroke-secondary/40 stroke-[1.5]" />
                      <line x1="290" y1="150" x2="150" y2="10" className="stroke-secondary/40 stroke-[1.5]" />

                      {/* Center Diamond (Lagna) Label */}
                      <text x="150" y="100" textAnchor="middle" className="fill-secondary/80 font-cinzel text-[10px] font-bold">ASC (1)</text>
                      <text x="150" y="80" textAnchor="middle" className="fill-white font-inter text-[12px] font-bold">Su, Me</text>

                      {/* Other House Planetary Labels */}
                      <text x="90" y="45" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 12</text>
                      <text x="90" y="65" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Sa</text>

                      <text x="210" y="45" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 2</text>
                      <text x="210" y="65" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Ke</text>

                      <text x="245" y="90" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 3</text>
                      <text x="245" y="110" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Ve</text>

                      <text x="200" y="155" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 4</text>
                      <text x="200" y="175" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Ju</text>

                      <text x="245" y="210" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 5</text>
                      
                      <text x="210" y="255" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 6</text>

                      <text x="150" y="210" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 7</text>
                      <text x="150" y="230" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Mo</text>

                      <text x="90" y="255" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 8</text>
                      <text x="90" y="275" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Ra</text>

                      <text x="55" y="210" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 9</text>
                      <text x="55" y="230" textAnchor="middle" className="fill-white font-inter text-[11px] font-bold">Ma</text>

                      <text x="100" y="155" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 10</text>

                      <text x="55" y="90" textAnchor="middle" className="fill-slate-400 font-inter text-[9px]">House 11</text>
                    </svg>
                    <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-slate-500 font-inter">
                      Lagna Kundli (D1)
                    </span>
                  </div>

                  {/* Quick Parameters read-out */}
                  <div className="flex flex-col gap-4 font-inter text-xs text-slate-400">
                    <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Planetary Coordinates</h4>
                    <div className="flex flex-col gap-2 border-y border-white/5 py-4">
                      <div className="flex justify-between">
                        <span>Ascendant (Lagna)</span>
                        <span className="text-white font-bold">Leo (Simha) • 14°22&apos;</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nakshatra</span>
                        <span className="text-white font-bold">Magha • Pada 3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moon Sign (Rashi)</span>
                        <span className="text-white font-bold">Leo (Simha)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sun Sign</span>
                        <span className="text-white font-bold">Gemini (Mithuna)</span>
                      </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-lg text-[10px] leading-relaxed text-secondary">
                      Your chart indicates a strong **Sun-Mercury Budhaditya Yoga** in the Ascendant, promising high administrative capabilities and public influence.
                    </div>
                  </div>
                </div>

                {/* Interpretation / Explanations */}
                <div className="glass rounded-xl p-8 border border-white/5 flex flex-col gap-4 leading-relaxed text-slate-300 font-inter text-xs">
                  <h3 className="font-cinzel text-sm font-bold text-white mb-2 uppercase tracking-widest">Initial Vedic Interpretations</h3>
                  <div>
                    <span className="text-secondary font-bold font-cinzel text-xs block mb-1">1. Personality Profile (Ascendant in Leo)</span>
                    <p>
                      You carry a majestic presence. Since Leo is ruled by the Sun, you have high self-esteem, are natural leaders, and respect authority. However, watch out for ego clashes or unnecessary dominance patterns in partnerships.
                    </p>
                  </div>
                  <div>
                    <span className="text-secondary font-bold font-cinzel text-xs block mb-1">2. Career Direction (10th House alignment)</span>
                    <p>
                      With Jupiter governing your academic parameters and Saturn transiting supportive houses, business ownership or high-responsibility employment is highlighted. Mid-2026 onwards represents an auspicious window for major switches.
                    </p>
                  </div>
                  <div className="bg-secondary/5 border border-secondary/15 p-4 rounded-lg mt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-cinzel text-xs font-bold text-white">Unlock Full 20-Page Kundli Report</span>
                      <p className="text-[10px] text-slate-400">Receive manual transit predictions for the next 15 years in PDF format.</p>
                    </div>
                    <Link
                      href="/booking"
                      className="px-4 py-2.5 bg-secondary text-[#050816] rounded-md font-bold text-[10px] tracking-wider uppercase hover:bg-amber-400 transition-colors text-center font-inter shrink-0"
                    >
                      Book Full Audit
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[350px] rounded-xl glass border border-white/5 flex flex-col items-center justify-center text-center p-8 gap-4">
                <Compass className="w-12 h-12 text-slate-500 animate-pulse" />
                <span className="font-cinzel text-base text-slate-400">Await Star Configuration</span>
                <p className="font-inter text-xs text-slate-500 max-w-sm">
                  Provide your exact birth parameters in the form to generate your D1 Birth Chart and download initial readings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

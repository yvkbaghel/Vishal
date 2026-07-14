'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Compass } from 'lucide-react';
import { ChartData } from '@/lib/astrology';

const ASCENDANT_INTERPRETATIONS: Record<string, string> = {
  Aries: "Aries Ascendant makes you dynamic, energetic, and highly ambitious. You are a natural leader who meets challenges head-on with courage, though you should guard against impulsiveness.",
  Taurus: "Taurus Ascendant gives you a calm, reliable, and determined nature. You appreciate beauty, stability, and comfort, and work steadily toward your goals with great patience.",
  Gemini: "Gemini Ascendant makes you intellectual, communicative, and highly adaptable. You possess a curious mind, love learning new things, and excel at social connections.",
  Cancer: "Cancer Ascendant makes you deeply intuitive, nurturing, and emotionally sensitive. You value home, family, and security, and have strong protective instincts.",
  Leo: "Leo Ascendant makes you charismatic, creative, and warm-hearted. You possess natural dignity, self-confidence, and a desire to express yourself fully and lead others.",
  Virgo: "Virgo Ascendant gives you an analytical, detail-oriented, and practical mind. You seek order, efficiency, and wellness in life, and love being helpful to others.",
  Libra: "Libra Ascendant makes you artistic, diplomatic, and harmony-seeking. You value relationships, justice, and balance in all areas of life, and possess natural charm.",
  Scorpio: "Scorpio Ascendant makes you intense, magnetic, and deeply perceptive. You have strong willpower and go through powerful transformations throughout your life.",
  Sagittarius: "Sagittarius Ascendant makes you optimistic, adventurous, and philosophically inclined. You value freedom, search for truth, and love exploring new horizons.",
  Capricorn: "Capricorn Ascendant makes you disciplined, responsible, and highly ambitious. You work patiently and systematically toward success, valuing tradition and structure.",
  Aquarius: "Aquarius Ascendant makes you humanitarian, independent, and intellectually progressive. You think outside the box, value community, and enjoy innovative ideas.",
  Pisces: "Pisces Ascendant makes you highly imaginative, spiritual, and compassionate. You are deeply intuitive and feel a strong connection to the mystical and artistic realms."
};

const MOON_INTERPRETATIONS: Record<string, string> = {
  Aries: "Your mind is passionate, enthusiastic, and quick to react. You feel a strong emotional need for independence, action, and overcoming obstacles.",
  Taurus: "You have a deeply stable and serene emotional nature. You seek emotional security through material comfort, reliable relationships, and peaceful surroundings.",
  Gemini: "You process emotions intellectually and through verbal expression. You have a talkative, curious mind that needs constant mental stimulation and social interaction.",
  Cancer: "You are emotionally profound, empathetic, and highly attached to your past and family. Your moods flow like tides, and you seek emotional safety.",
  Leo: "You have a proud, generous, and expressive emotional nature. You feel secure when you are appreciated, loved, and given space to express your creativity.",
  Virgo: "You find emotional comfort in order, analysis, and being useful. You process feelings logically and show care through practical service to others.",
  Libra: "Your emotional peace depends heavily on harmony in your close relationships. You seek balance, avoid conflict, and appreciate artistic aesthetics.",
  Scorpio: "You experience emotions with extreme depth and intensity. You possess a private emotional world and value honesty, loyalty, and deep bonding.",
  Sagittarius: "You have a cheerful, optimistic, and freedom-loving mind. You process emotional challenges with a philosophical attitude and seek meaning in all experiences.",
  Capricorn: "You have a reserved and controlled emotional nature. You seek emotional security through duty, professional achievements, and self-reliance.",
  Aquarius: "You process emotions with intellectual detachment and value friendship. You feel a strong emotional connection to social causes and community interests.",
  Pisces: "Your emotional need is to connect with the divine, the mystical, and the creative. You process feelings with immense compassion and empathy."
};

const ZODIAC_RULERS: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter"
};

const LAGNA_LORD_INTERPRETATIONS: Record<number, string> = {
  1: "Lagna Lord in the 1st House indicates a strong-willed, self-reliant, and highly independent individual. You place a high emphasis on self-development, physical health, and personal success.",
  2: "Lagna Lord in the 2nd House focuses your life energy on finance, family, values, and speech. You are driven to accumulate assets and build security for your loved ones.",
  3: "Lagna Lord in the 3rd House drives you towards communication, courage, sibling relationships, and artistic skills. You possess high initiative, mental drive, and enjoy self-expression.",
  4: "Lagna Lord in the 4th House connects your core self to home, mother, emotional comfort, and properties. You find peace and vitality in secure, nurturing domestic environments.",
  5: "Lagna Lord in the 5th House brings focus to intelligence, creative projects, children, and speculative endeavors. You are expressive, enjoy learning, and possess strong purva-punya (past merit).",
  6: "Lagna Lord in the 6th House channels your life energy into daily work, health, service, and overcoming obstacles. You are resilient, analytical, and excel in problem-solving or helping professions.",
  7: "Lagna Lord in the 7th House emphasizes partnerships, public relations, and marriage. Much of your life focus and growth comes through your interactions and agreements with others.",
  8: "Lagna Lord in the 8th House turns your focus toward research, occult sciences, transformation, and shared resources. You have a deep, introspective mind and undergo significant life changes.",
  9: "Lagna Lord in the 9th House indicates a strong connection to wisdom, spirituality, higher education, and travel. You seek truth, values, and have a highly philosophical outlook.",
  10: "Lagna Lord in the 10th House places a strong focus on career, public status, and authority. You are highly ambitious, professional, and seek to make a visible impact on society.",
  11: "Lagna Lord in the 11th House connects you with networks, friendships, community goals, and financial gains. You are highly social and work toward large-scale collective progress.",
  12: "Lagna Lord in the 12th House leads you toward introspection, spirituality, meditation, and foreign travels. You possess deep subconscious insights and appreciate solitude."
};

const SUN_INTERPRETATIONS: Record<string, string> = {
  Aries: "With the Sun exalted in Aries, your soul drive is pioneering, courageous, and highly independent. You seek to initiate new paths and possess boundless vitality.",
  Taurus: "With the Sun in Taurus, your core identity is stable, determined, and practical. You seek to build tangible security and enjoy the sensory pleasures of life.",
  Gemini: "With the Sun in Gemini, your soul expresses itself through curiosity, intellect, and versatile communication. You are a natural gatherer and disseminator of knowledge.",
  Cancer: "With the Sun in Cancer, your identity is linked to emotional depth, care, and protection. You shine brightest when nurturing others and creating safe spaces.",
  Leo: "With the Sun in Leo, you possess a radiant, creative, and magnanimous core. You seek self-expression, respect, and to lead with generosity.",
  Virgo: "With the Sun in Virgo, your core drive is toward service, improvement, and intellectual analysis. You shine in organizing, problem-solving, and wellness.",
  Libra: "With the Sun in Libra, you seek balance, harmony, and relationship development. Your soul drive is diplomatic, artistic, and cooperative.",
  Scorpio: "With the Sun in Scorpio, your core self is intense, investigative, and transformative. You seek deep truth, hidden knowledge, and emotional power.",
  Sagittarius: "With the Sun in Sagittarius, your identity is optimistic, philosophical, and freedom-loving. You are a seeker of truth, higher wisdom, and adventure.",
  Capricorn: "With the Sun in Capricorn, your core drive is disciplined, ambitious, and duty-oriented. You seek to build long-lasting structures and achieve public respect.",
  Aquarius: "With the Sun in Aquarius, your soul identity is progressive, humanitarian, and original. You care deeply about collective progress and intellectual freedom.",
  Pisces: "With the Sun in Pisces, your core self is sensitive, artistic, and spiritually inclined. You shine in compassionate acts, imagination, and mystical seeking."
};

export default function KundliPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    gender: 'Male',
    pob: '',
  });

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.tob || !formData.pob) return;

    setLoading(true);
    setErrorMsg('');
    setChartData(null);

    try {
      // 1. Geocode Place of Birth using OpenStreetMap Nominatim
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.pob)}&format=json&limit=1`);
      const geoData = await geoRes.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error("Could not find coordinates for this location.");
      }
      
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      // 2. Fetch astrological data
      const chartRes = await fetch(`/api/kundli?date=${formData.dob}&time=${formData.tob}&lat=${lat}&lng=${lon}`);
      if (!chartRes.ok) {
        throw new Error("Failed to calculate birth chart");
      }
      const data: ChartData = await chartRes.json();
      setChartData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Hindi abbreviations for planets to match traditional charts
  const PLANET_HINDI_MAP: Record<string, string> = {
    Lagna: "ल",
    Sun: "सू",
    Moon: "च",
    Mars: "मं",
    Mercury: "बु",
    Jupiter: "गु",
    Venus: "शु",
    Saturn: "श",
    Rahu: "रा",
    Ketu: "के"
  };

  const getHouseSign = (houseNum: number) => {
    if (!chartData) return "";
    const house = chartData.houses.find(h => h.houseNumber === houseNum);
    return house ? (house.sign + 1).toString() : ""; // Zodiac sign number (1=Aries)
  };

  // Stack planets vertically within the house bounding box to avoid overlaps
  const renderHouseContent = (houseNum: number, centerX: number, centerY: number) => {
    if (!chartData) return null;
    
    // Collect planets in this house
    const housePlanets = chartData.planets
      .filter(p => p.house === houseNum)
      .map(p => ({
        name: p.name,
        label: PLANET_HINDI_MAP[p.name] || p.symbol,
        degree: Math.floor(p.degree)
      }));
    
    // Add Lagna to House 1
    if (houseNum === 1) {
      housePlanets.unshift({
        name: "Lagna",
        label: "ल",
        degree: Math.floor(chartData.ascendant.degree)
      });
    }

    if (housePlanets.length === 0) return null;

    return (
      <g>
        {housePlanets.map((p, idx) => {
          // Stack them vertically around centerY
          const offsetY = (idx - (housePlanets.length - 1) / 2) * 13;
          return (
            <text
              key={p.name}
              x={centerX}
              y={centerY + offsetY}
              textAnchor="middle"
              className="fill-white font-inter text-[9.5px] font-bold tracking-tight"
            >
              {p.label}{p.degree}
            </text>
          );
        })}
      </g>
    );
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
            Enter your exact birth parameters to compute your planetary coordinates and render your D1 Birth Chart (Lagna Kundli) with dynamic Vedic interpretations.
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

                {errorMsg && (
                  <div className="text-red-400 text-xs font-inter mt-2">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-secondary text-[#050816] rounded-lg font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4.5 h-4.5 border-2 border-[#050816] border-t-transparent rounded-full animate-spin" />
                      <span>Aligning Stars...</span>
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
            {chartData ? (
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

                      {/* House 1: Center Diamond */}
                      <text x="150" y="120" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(1)}</text>
                      {renderHouseContent(1, 150, 80)}

                      {/* House 2: Top-Left */}
                      <text x="115" y="30" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(2)}</text>
                      {renderHouseContent(2, 80, 45)}

                      {/* House 3: Left-Top */}
                      <text x="30" y="115" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(3)}</text>
                      {renderHouseContent(3, 45, 80)}

                      {/* House 4: Left Diamond */}
                      <text x="120" y="150" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(4)}</text>
                      {renderHouseContent(4, 80, 150)}

                      {/* House 5: Left-Bottom */}
                      <text x="30" y="185" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(5)}</text>
                      {renderHouseContent(5, 45, 220)}

                      {/* House 6: Bottom-Left */}
                      <text x="115" y="270" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(6)}</text>
                      {renderHouseContent(6, 80, 255)}

                      {/* House 7: Bottom Diamond */}
                      <text x="150" y="180" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(7)}</text>
                      {renderHouseContent(7, 150, 220)}

                      {/* House 8: Bottom-Right */}
                      <text x="185" y="270" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(8)}</text>
                      {renderHouseContent(8, 220, 255)}

                      {/* House 9: Right-Bottom */}
                      <text x="270" y="185" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(9)}</text>
                      {renderHouseContent(9, 255, 220)}

                      {/* House 10: Right Diamond */}
                      <text x="180" y="150" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(10)}</text>
                      {renderHouseContent(10, 220, 150)}

                      {/* House 11: Right-Top */}
                      <text x="270" y="115" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(11)}</text>
                      {renderHouseContent(11, 255, 80)}

                      {/* House 12: Top-Right */}
                      <text x="185" y="30" textAnchor="middle" className="fill-secondary font-inter text-[10px] font-bold">{getHouseSign(12)}</text>
                      {renderHouseContent(12, 220, 45)}

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
                        <span className="text-white font-bold">{chartData.ascendant.signName} • {Math.floor(chartData.ascendant.degree)}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moon Sign (Rashi)</span>
                        <span className="text-white font-bold">{chartData.planets.find(p => p.name === 'Moon')?.signName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sun Sign</span>
                        <span className="text-white font-bold">{chartData.planets.find(p => p.name === 'Sun')?.signName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lagna Lord</span>
                        <span className="text-white font-bold">{chartData.planets.find(p => p.house === 1)?.name || "Empty"}</span>
                      </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-lg text-[10px] leading-relaxed text-secondary">
                      Your dynamically calculated D1 chart is ready. The mathematical Ascendant and planetary geometries have been successfully computed based on precise sidereal ephemeris data.
                    </div>
                  </div>
                </div>

                {/* Interpretation / Explanations */}
                {(() => {
                  const lagnaLordName = ZODIAC_RULERS[chartData.ascendant.signName] || "";
                  const lagnaLordPlanet = chartData.planets.find(p => p.name === lagnaLordName);
                  const sunPlanet = chartData.planets.find(p => p.name === 'Sun');
                  return (
                    <div className="glass rounded-xl p-8 border border-white/5 flex flex-col gap-5 leading-relaxed text-slate-300 font-inter text-xs">
                      <h3 className="font-cinzel text-sm font-bold text-white mb-2 uppercase tracking-widest">Initial Vedic Interpretations</h3>
                      
                      <div>
                        <span className="text-secondary font-bold font-cinzel text-xs block mb-1">1. Personality Profile (Ascendant in {chartData.ascendant.signName})</span>
                        <p>
                          {ASCENDANT_INTERPRETATIONS[chartData.ascendant.signName] || `Your Ascendant (Lagna) is ${chartData.ascendant.signName}. This defines your primary outward personality, constitution, and general approach to life.`}
                        </p>
                      </div>

                      <div>
                        <span className="text-secondary font-bold font-cinzel text-xs block mb-1">2. Emotional Foundation (Moon in {chartData.planets.find(p => p.name === 'Moon')?.signName})</span>
                        <p>
                          {MOON_INTERPRETATIONS[chartData.planets.find(p => p.name === 'Moon')?.signName || ""] || `With the Moon placed in ${chartData.planets.find(p => p.name === 'Moon')?.signName}, your subconscious mind and emotional reactions are heavily influenced by this sign's traits.`}
                        </p>
                      </div>

                      {lagnaLordPlanet && (
                        <div>
                          <span className="text-secondary font-bold font-cinzel text-xs block mb-1">
                            3. Focus of Life Force (Lagna Lord {lagnaLordName} in House {lagnaLordPlanet.house})
                          </span>
                          <p>
                            {LAGNA_LORD_INTERPRETATIONS[lagnaLordPlanet.house] || `Your Ascendant lord ${lagnaLordName} is placed in the ${lagnaLordPlanet.house} house, highlighting this area as a major focus of your life journey.`}
                          </p>
                        </div>
                      )}

                      {sunPlanet && (
                        <div>
                          <span className="text-secondary font-bold font-cinzel text-xs block mb-1">
                            4. Core Identity & Vitality (Sun in {sunPlanet.signName})
                          </span>
                          <p>
                            {SUN_INTERPRETATIONS[sunPlanet.signName] || `With the Sun situated in ${sunPlanet.signName}, your core self-expression, ego structure, and overall life vitality align with these traits.`}
                          </p>
                        </div>
                      )}

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
                  );
                })()}
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

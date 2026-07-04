'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, Briefcase, TrendingUp, ShieldAlert, Award } from 'lucide-react';

const SIGNS = [
  { name: 'Aries', sanskrit: 'मेष', range: 'Mar 21 - Apr 19', symbol: '♈' },
  { name: 'Taurus', sanskrit: 'वृषभ', range: 'Apr 20 - May 20', symbol: '♉' },
  { name: 'Gemini', sanskrit: 'मिथुन', range: 'May 21 - Jun 20', symbol: '♊' },
  { name: 'Cancer', sanskrit: 'कर्क', range: 'Jun 21 - Jul 22', symbol: '♋' },
  { name: 'Leo', sanskrit: 'सिंह', range: 'Jul 23 - Aug 22', symbol: '♌' },
  { name: 'Virgo', sanskrit: 'कन्या', range: 'Aug 23 - Sep 22', symbol: '♍' },
  { name: 'Libra', sanskrit: 'तुला', range: 'Sep 23 - Oct 22', symbol: '♎' },
  { name: 'Scorpio', sanskrit: 'वृश्चिक', range: 'Oct 23 - Nov 21', symbol: '♏' },
  { name: 'Sagittarius', sanskrit: 'धनु', range: 'Nov 22 - Dec 21', symbol: '♐' },
  { name: 'Capricorn', sanskrit: 'मकर', range: 'Dec 22 - Jan 19', symbol: '♑' },
  { name: 'Aquarius', sanskrit: 'कुंभ', range: 'Jan 20 - Feb 18', symbol: '♒' },
  { name: 'Pisces', sanskrit: 'मीन', range: 'Feb 19 - Mar 20', symbol: '♓' },
];

const FORECAST_DETAILS: { [key: string]: any } = {
  Aries: {
    career: "Mars aligns favorably with your 10th house, offering high energy for leadership tasks. Start projects you've delayed.",
    love: "A minor communication gap might occur. Venus suggests being patient in listening to your partner.",
    wealth: "Excellent period for debt resolution. Avoid speculative trading for the next 48 hours.",
    health: "High physical energy, but protect your eyes from blue light strain."
  },
  Taurus: {
    career: "Venus governs your sector smoothly. Cooperation with female colleagues brings recognition.",
    love: "Harmonious energy. If single, an interesting contact via social circles is highlighted.",
    wealth: "Steady growth. A good day to review real estate portfolios.",
    health: "Slight throat sensitivity. Drink warm water and avoid cold beverages."
  },
  Gemini: {
    career: "Mercury retrograde warning. Read contracts twice before signing anything major.",
    love: "Intellectual connection is key today. Speak your mind honestly.",
    wealth: "A unexpected expense related to electronic gadgets or vehicles might arise.",
    health: "Anxiety levels could spike. Practice 10 minutes of deep pranayama."
  },
  Cancer: {
    career: "The Moon aspects your career house, causing minor emotional fluctuations at work. Remain objective.",
    love: "Deep intimacy and family support bring emotional security.",
    wealth: "Gains from mother or family heritage are highlighted.",
    health: "Digestive sensitivity. Eat fresh home-cooked meals."
  },
  Leo: {
    career: "Sun rules your ascendant, giving you central attention in meetings. Your proposals get approved.",
    love: "Avoid stubbornness. Give your partner room to express their viewpoint.",
    wealth: "Opportunities for high gains via international contacts or jobs.",
    health: "Protect yourself from high heat/dehydration. Increase fluid intake."
  },
  Virgo: {
    career: "Mercury stabilizes your parameters. Tasks involving data audit or coding get resolved smoothly.",
    love: "A nostalgic text from someone in the past might surface today.",
    wealth: "Safe period for long-term equity allocations.",
    health: "Focus on sleep hygiene. Sleep before 11 PM to rest the nervous system."
  },
  Libra: {
    career: "Balance is your superpower today. Mediation of conflict at work highlights your value.",
    love: "Romantic vibes are high. Plan a quiet dinner with your partner.",
    wealth: "Expenses on luxury items or self-care are highlighted. Keep a budget.",
    health: "Lower back sensitivity. Avoid heavy weight lifting."
  },
  Scorpio: {
    career: "Mars gives you determination to clear backlog tasks. Success in competitive reviews.",
    love: "Fiery arguments could occur. Take a step back and avoid direct reactions.",
    wealth: "Control impulse purchases. Keep emergency liquidity available.",
    health: "High recovery rate. Excellent day for physical exercise."
  },
  Sagittarius: {
    career: "Jupiter aspects your 9th house of fortune. Teachers or bosses provide major help.",
    love: "A travel plan with your partner will build connection.",
    wealth: "Luck is in your favor. Minor gains via long-term investments.",
    health: "Thigh or hip muscle strain. Warm up properly before workouts."
  },
  Capricorn: {
    career: "Saturn demands hard work, but success is guaranteed. Professional duties might feel heavy today.",
    love: "Loyalty and stability are emphasized. A quiet evening at home is preferred.",
    wealth: "Slow but steady accumulation. Perfect time to audit taxes or debts.",
    health: "Joint or bone sensitivity. Ensure adequate Calcium/Vitamin D."
  },
  Aquarius: {
    career: "Innovation is highlighted. Share your tech-focused ideas with teammates.",
    love: "A friendly dynamic in relationships. Excellent communication.",
    wealth: "Expenses on tech upgrades or charity are highlighted.",
    health: "Ankle or calf muscle fatigue. Rest is required."
  },
  Pisces: {
    career: "Jupiter expands your imagination. Excellent day for artists, writers, and consultants.",
    love: "Empathetic understanding. You are the emotional anchor for your partner.",
    wealth: "Gains via consultancy or tutoring tasks.",
    health: "Fluid retention or foot sensitivity. Keep feet elevated during rest."
  }
};

export default function HoroscopeDashboard() {
  const [selectedSign, setSelectedSign] = useState(SIGNS[0]);
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const activeForecast = FORECAST_DETAILS[selectedSign.name] || FORECAST_DETAILS.Aries;

  return (
    <div className="w-full relative py-20 px-6">
      {/* Glow backgrounds */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Sidereal Zodiac Dashboard
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Daily Vedic Horoscope
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Select your Moon Sign (Rashi) to read predictions based on real-time transit positions of planetary coordinate systems.
          </p>
        </div>

        {/* sign selector grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-12 gap-3 mb-12">
          {SIGNS.map((sign) => {
            const isSelected = selectedSign.name === sign.name;
            return (
              <button
                key={sign.name}
                onClick={() => setSelectedSign(sign)}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-secondary text-[#050816] border-secondary shadow-[0_0_15px_rgba(255,193,7,0.3)]'
                    : 'bg-white/5 text-slate-300 border-white/5 hover:border-secondary/20'
                }`}
              >
                <span className="text-2xl font-sans leading-none">{sign.symbol}</span>
                <span className="font-cinzel text-xs font-bold leading-none">{sign.name}</span>
                <span className="font-devanagari text-[9px] opacity-60 leading-none">{sign.sanskrit}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Active Sign Details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-premium rounded-xl p-8 border border-white/5 flex flex-col items-center text-center gap-4 bg-[#090e24]">
              <span className="text-6xl font-sans text-secondary">{selectedSign.symbol}</span>
              <div className="flex flex-col">
                <h2 className="font-cinzel text-2xl font-bold text-white leading-none">{selectedSign.name}</h2>
                <span className="font-devanagari text-xs text-secondary mt-1 font-medium">{selectedSign.sanskrit} Rashi</span>
                <span className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">{selectedSign.range}</span>
              </div>
              
              {/* Selector for Daily / Weekly / Monthly */}
              <div className="flex w-full bg-white/5 rounded-full p-1 border border-white/5 text-xs font-inter mt-4">
                {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`flex-1 py-2 text-center rounded-full uppercase tracking-wider font-semibold text-[9px] transition-all ${
                      timeframe === t
                        ? 'bg-secondary text-[#050816] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Predictions Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Career & Status', icon: Briefcase, text: activeForecast.career, color: 'text-secondary bg-primary/10 border-primary/20' },
              { title: 'Love & Relationship', icon: Heart, text: activeForecast.love, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
              { title: 'Wealth & Assets', icon: TrendingUp, text: activeForecast.wealth, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
              { title: 'Health & Vitality', icon: ShieldAlert, text: activeForecast.health, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
            ].map((section) => {
              const SectionIcon = section.icon;
              return (
                <div
                  key={section.title}
                  className="glass rounded-xl p-6 border border-white/5 flex flex-col gap-4 hover:border-secondary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${section.color}`}>
                      <SectionIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-cinzel text-xs font-bold text-white tracking-widest uppercase">
                      {section.title}
                    </h3>
                  </div>
                  <p className="font-inter text-xs text-slate-400 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Warning Banner */}
        <div className="mt-16 bg-primary/5 border border-primary/10 rounded-xl p-6 flex gap-4 items-start max-w-3xl mx-auto">
          <Award className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-xs font-inter text-slate-400 leading-relaxed">
            <span className="font-cinzel text-xs font-bold text-white">General Transit Disclaimer</span>
            <p>
              Daily horoscopes represent generic moon sign transits. For specific, highly accurate timing indexes relating to your active Dasha period, you are advised to book a private **General Kundli Consultation**.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

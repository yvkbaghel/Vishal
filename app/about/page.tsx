'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Star, ShieldCheck, BookOpen, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full relative py-20 px-6">
      {/* Background stars details */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Lineage Master
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Acharya Vishal Biography
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Dedicated to decoding Sidereal transit charts and aligning cosmic maps with practical human pathways.
          </p>
        </div>

        {/* Introduction / Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 text-slate-300 font-inter text-sm leading-relaxed">
            <h2 className="font-cinzel text-2xl font-bold text-white mb-2">My Philosophy</h2>
            <p>
              I believe that Vedic astrology (Jyotish) is the science of electromagnetic and gravity fluctuations occurring during birth coordinate locks. It does not replace human free will. Rather, it represents a spiritual map outlining parameters where lessons must be learned and where potential can be amplified.
            </p>
            <p>
              Born into a lineage of traditional Sanskrit scholars in northern India, I completed my Siddhanta (astronomy calculations) and Phalit (prediction analysis) certifications in Varanasi. My approach remains purely analytical, checking divisional charts (Vargas) and timing dashas to structure authentic, practical remediation plans.
            </p>
            <p>
              Over the last 18 years, I have counselled entrepreneurs, politicians, and spiritual seekers globally, translating complex Sanskrit calculations into actionable strategic advice.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-premium rounded-xl p-6 border border-white/5 flex flex-col gap-4">
              <h3 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Certifications</h3>
              <ul className="flex flex-col gap-3 font-inter text-xs text-slate-400">
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>Jyotish Acharya (Varanasi Sanskrit University)</span>
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>Sanskrit Vyakaran (Grammar Masters)</span>
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>Vastu Shastra Consultant Certification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline of Journey */}
        <div className="border-t border-white/5 pt-20 mb-24">
          <h2 className="font-cinzel text-2xl font-bold text-white mb-12 text-center">Spiritual Journey Timeline</h2>
          <div className="flex flex-col gap-12 relative border-l border-white/10 pl-6 ml-4">
            
            <div className="relative">
              <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_#FFC107]" />
              <span className="font-cinzel text-xs text-secondary font-bold uppercase tracking-wider">2005: Lineage Initiation</span>
              <p className="font-inter text-xs text-slate-400 mt-2 leading-relaxed">
                Began rigorous Gurukul training under respected lineage teachers, mastering mathematical astrology foundations (Ganita) and planetary coordinates calculations.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-primary" />
              <span className="font-cinzel text-xs text-secondary font-bold uppercase tracking-wider">2012: Varanasi Research</span>
              <p className="font-inter text-xs text-slate-400 mt-2 leading-relaxed">
                Conducted deep-dive research into ancient palm leaf manuscripts, focusing on predictive accuracy of Nakshatra-based divisional charts (Lagna and D9 Navamsha correlations).
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-secondary" />
              <span className="font-cinzel text-xs text-secondary font-bold uppercase tracking-wider">2019: Global Outreach</span>
              <p className="font-inter text-xs text-slate-400 mt-2 leading-relaxed">
                Launched online booking pipelines and digital counselling systems, offering lineage-compliant chart explanations to seekers in the Americas, Europe, and Asia.
              </p>
            </div>
          </div>
        </div>

        {/* Awards & Achievements */}
        <div className="border-t border-white/5 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Jyotish Shiromani', body: 'Conferred by the National Council of Vedic Astrology in 2016 for research excellence.', icon: Award },
            { title: 'Best Vastu Auditor', body: 'Awarded for successfully harmonizing commercial layouts without structural demolition.', icon: Star },
            { title: 'Lineage Author', body: 'Published 4 comprehensive treatises on using sound frequencies (mantras) for planetary alignment.', icon: BookOpen },
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} className="glass rounded-xl p-6 border border-white/5 text-center flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-secondary mx-auto">
                  <ItemIcon className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">{item.title}</h3>
                <p className="font-inter text-xs text-slate-400 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import servicesData from '@/data/services.json';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [birthDetails, setBirthDetails] = useState({
    name: '',
    pob: '',
    tob: '',
    dob: '',
  });

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!date || !timeSlot)) return;
    if (step === 3 && (!birthDetails.name || !birthDetails.pob || !birthDetails.tob || !birthDetails.dob)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleServiceSelect = (slug: string) => {
    setSelectedService(slug);
    setStep(2);
  };

  const handleSlotSelect = (slot: string) => {
    setTimeSlot(slot);
  };

  const activeServiceObj = servicesData.find((s) => s.slug === selectedService);

  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Secure Consult Booking Wizard
            </span>
          </div>
          <h1 className="font-cinzel text-4xl font-bold tracking-wide text-white">
            Schedule a Consultation
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Private, manual calculations of your natal charts. Secure your slot by choosing details below.
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[1.5px] bg-secondary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[
            { stepNum: 1, label: 'Service' },
            { stepNum: 2, label: 'Timing' },
            { stepNum: 3, label: 'Birth Details' },
            { stepNum: 4, label: 'Confirm' },
          ].map((item) => {
            const isCompleted = step > item.stepNum;
            const isActive = step === item.stepNum;
            return (
              <div key={item.stepNum} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-secondary text-[#050816]'
                      : isActive
                      ? 'bg-primary text-white border-2 border-secondary'
                      : 'bg-[#111827] text-slate-500 border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : item.stepNum}
                </div>
                <span
                  className={`font-inter text-[9px] uppercase tracking-wider mt-2 font-bold transition-colors duration-300 ${
                    isActive ? 'text-secondary' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Steps Content */}
        <div className="min-h-[350px]">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8"
            >
              <h2 className="font-cinzel text-lg font-bold text-center text-white">Select Consultation Parameter</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {servicesData.map((service) => (
                  <button
                    key={service.slug}
                    onClick={() => handleServiceSelect(service.slug)}
                    className={`p-5 rounded-lg border text-left flex flex-col gap-2 transition-all ${
                      selectedService === service.slug
                        ? 'bg-primary/20 border-secondary shadow-[0_0_15px_rgba(255,193,7,0.15)]'
                        : 'bg-white/5 border-white/5 hover:border-secondary/20'
                    }`}
                  >
                    <span className="font-cinzel text-xs font-bold text-white leading-none">{service.title}</span>
                    <span className="font-devanagari text-[9px] text-secondary leading-none">{service.sanskrit}</span>
                    <p className="font-inter text-[10px] text-slate-400 leading-snug line-clamp-2 mt-1">
                      {service.shortDescription}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Choose Date & Time */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8 max-w-lg mx-auto"
            >
              <h2 className="font-cinzel text-lg font-bold text-center text-white">Choose Date & Slot</h2>
              
              <div className="flex flex-col gap-6 glass rounded-xl p-8 border border-white/5">
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Select Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Available Slots</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-3 rounded-lg border text-center font-inter text-xs font-semibold transition-all ${
                          timeSlot === slot
                            ? 'bg-secondary text-[#050816] border-secondary'
                            : 'bg-white/5 text-slate-300 border-white/5 hover:border-secondary/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full font-inter text-xs font-bold uppercase tracking-wider text-slate-300 border border-white/10 hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!date || !timeSlot}
                  className="px-8 py-3.5 bg-secondary text-[#050816] rounded-full font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Input Birth details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8 max-w-lg mx-auto"
            >
              <h2 className="font-cinzel text-lg font-bold text-center text-white">Provide Birth Details</h2>
              
              <div className="flex flex-col gap-5 glass rounded-xl p-8 border border-white/5">
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={birthDetails.name}
                    onChange={(e) => setBirthDetails({ ...birthDetails, name: e.target.value })}
                    placeholder="Enter Seeker's Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Birthdate</label>
                    <input
                      type="date"
                      value={birthDetails.dob}
                      onChange={(e) => setBirthDetails({ ...birthDetails, dob: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Exact Birthtime</label>
                    <input
                      type="time"
                      value={birthDetails.tob}
                      onChange={(e) => setBirthDetails({ ...birthDetails, tob: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Place of Birth (City/Country)</label>
                  <input
                    type="text"
                    value={birthDetails.pob}
                    onChange={(e) => setBirthDetails({ ...birthDetails, pob: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full font-inter text-xs font-bold uppercase tracking-wider text-slate-300 border border-white/10 hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!birthDetails.name || !birthDetails.pob || !birthDetails.dob || !birthDetails.tob}
                  className="px-8 py-3.5 bg-secondary text-[#050816] rounded-full font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success / Confirmation */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center max-w-md mx-auto gap-8 relative py-8"
            >
              {/* Rotating golden success mandala */}
              <div className="relative w-24 h-24 flex items-center justify-center bg-secondary/10 rounded-full border border-secondary">
                <div className="absolute inset-0 rounded-full border border-secondary/20 border-dashed animate-slow-rotate" />
                <Check className="w-10 h-10 text-secondary" />
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-cinzel text-2xl font-bold text-white text-glow-gold">Consultation Pre-Booked!</h2>
                <p className="font-inter text-xs text-slate-400 leading-relaxed">
                  Thank you, **{birthDetails.name}**. Your request has been logged successfully at our Ashram helpdesk. We will contact you at your email to verify coordinates and send calendar invitations.
                </p>
              </div>

              {/* Readout Summary */}
              <div className="w-full glass rounded-xl p-6 border border-white/5 text-xs text-slate-400 font-inter text-left flex flex-col gap-3">
                <div className="flex justify-between">
                  <span>Selected Service</span>
                  <span className="text-white font-bold">{activeServiceObj?.title || 'General consultation'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Date</span>
                  <span className="text-white font-bold">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Slot</span>
                  <span className="text-white font-bold">{timeSlot}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3 mt-1">
                  <span>Birth Time Rectification</span>
                  <span className="text-secondary font-bold">Standard Lineage Process</span>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-4 px-8 py-3 rounded-full font-inter text-[10px] tracking-widest uppercase font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Schedule Another Slot
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

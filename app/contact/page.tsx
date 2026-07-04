'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Vedic Helpdesk
            </span>
          </div>
          <h1 className="font-cinzel text-4xl font-bold tracking-wide text-white">
            Connect With The Ashram
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Schedule offline meetings or send custom coordinate inquiries directly to Acharya Vishal&apos;s personal office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-xl p-8 border border-white/5 flex flex-col gap-6">
              <h2 className="font-cinzel text-lg font-bold text-white relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[1px] after:bg-secondary">
                Send Query
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Parameter e.g. Business Chart, Marriage Delay Query"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Outline your questions in detail, including birth details if applicable..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-secondary transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-secondary text-[#050816] rounded-lg font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4.5 h-4.5 border-2 border-[#050816] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>

              {submitted && (
                <p className="text-secondary font-inter text-[10px] text-center mt-2 animate-pulse uppercase tracking-wider font-bold">
                  Transmission Success! We will reply within 24 hours.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Info & Hours */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass rounded-xl p-8 border border-white/5 flex flex-col gap-6">
              <h2 className="font-cinzel text-lg font-bold text-white relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[1px] after:bg-secondary">
                Ashram Contacts
              </h2>

              <div className="flex flex-col gap-4 mt-4 text-xs font-inter text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500">Phone Support</span>
                    <span className="text-white font-bold font-sans">+91 99999 99999</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500">Email Address</span>
                    <span className="text-white font-bold">consult@vishalastro.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500">Physical Ashram Office</span>
                    <span className="text-white font-bold">Safdarjung Enclave, New Delhi, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500">Office Timings</span>
                    <span className="text-white font-bold">Mon - Sat: 09:00 AM - 07:00 PM (IST)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Map Placeholder */}
            <div className="glass rounded-xl p-1 border border-white/5 overflow-hidden">
              <div className="h-56 bg-[#0e132c] flex flex-col items-center justify-center text-center p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,58,183,0.15)_0%,rgba(5,8,22,1)_100%)] opacity-80" />
                <MapPin className="w-10 h-10 text-secondary z-10 animate-bounce" />
                <span className="font-cinzel text-xs font-bold text-white z-10 mt-2">Vedic Ashram Coordinates Map</span>
                <span className="font-inter text-[10px] text-slate-500 uppercase tracking-widest z-10 mt-1">Safdarjung Enclave, Delhi</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

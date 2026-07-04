'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative bg-[#060a1f] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative cosmic glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-cinzel text-lg font-bold tracking-widest text-white">
              VISHAL<span className="text-secondary">ASTRO</span>
            </span>
          </Link>
          <p className="font-cormorant text-base text-slate-400 italic leading-relaxed">
            &ldquo;Swarupa Upasana — Bridging the ancient secrets of planetary coordinates with modern pathways to empower, guide, and clarify your destiny.&rdquo;
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/10 transition-all duration-300 border border-white/5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/10 transition-all duration-300 border border-white/5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/10 transition-all duration-300 border border-white/5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/10 transition-all duration-300 border border-white/5"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-cinzel text-sm text-white tracking-widest uppercase font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[1.5px] after:bg-secondary">
            Quick Navigation
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Home Page', href: '/' },
              { label: 'About & Biography', href: '/about' },
              { label: 'Astrology Services', href: '/services' },
              { label: 'Interactive Kundli', href: '/kundli' },
              { label: 'Horoscope Dashboard', href: '/horoscope' },
              { label: 'Blog & Articles', href: '/blog' },
              { label: 'Media Gallery', href: '/gallery' },
              { label: 'Testimonials', href: '/testimonials' },
              { label: 'Contact Office', href: '/contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-inter text-xs text-slate-400 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Services */}
        <div>
          <h3 className="font-cinzel text-sm text-white tracking-widest uppercase font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[1.5px] after:bg-secondary">
            Premium Services
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Career & Profession', href: '/services/career' },
              { label: 'Marriage & Compatibility', href: '/services/marriage' },
              { label: 'Business & Wealth Alignment', href: '/services/business' },
              { label: 'Health & Vitality Review', href: '/services/health' },
              { label: 'Manglik Dosha Analysis', href: '/services/manglik' },
              { label: 'Gemstone Guidance', href: '/services/gemstone' },
              { label: 'Vastu Consultation', href: '/services/vastu' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-inter text-xs text-slate-400 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-cinzel text-sm text-white tracking-widest uppercase font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[1.5px] after:bg-secondary">
              Newsletter
            </h3>
            <p className="font-inter text-xs text-slate-400 leading-relaxed mb-4">
              Subscribe to receive cosmic forecasts, transit alignments, and monthly remedies.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-secondary transition-all"
                required
              />
              <button
                type="submit"
                className="px-4 bg-secondary text-[#050816] rounded-lg hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-secondary font-inter text-[10px] mt-2 animate-pulse">
                Subscribed successfully! Welcome to the cosmic circle.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-inter">
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>+91 99999 99999</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-xs font-inter">
              <Mail className="w-3.5 h-3.5 text-secondary" />
              <span>consult@vishalastro.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-xs font-inter">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
        <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} VishalAstro. All Rights Reserved.
        </p>
        <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest">
          Designed & Maintained by <a href="https://edoceo.in" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Edoceo</a>
        </p>
      </div>
    </footer>
  );
}

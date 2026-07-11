'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Kundli', href: '/kundli' },
  { label: 'Horoscope', href: '/horoscope' },
  { label: 'Mantra', href: '/mantra' },
  // { label: 'Blog', href: '/blog' },
  // { label: 'Gallery', href: '/gallery' },
  // { label: 'Testimonials', href: '/testimonials' },
  // { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg font-bold tracking-[0.15em] text-white leading-none">
              VISHAL<span className="text-secondary">ASTRO</span>
            </span>
            <span className="font-cormorant text-[10px] tracking-[0.3em] uppercase text-muted-cosmic/80 leading-none mt-1">
              Ancient Wisdom
            </span>
          </div>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-inter text-xs tracking-widest uppercase transition-all duration-300 relative py-1 hover:text-secondary ${
                  isActive ? 'text-secondary font-semibold' : 'text-slate-300'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary shadow-[0_0_8px_#FFC107] animate-pulse-slow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/booking"
            className="relative px-5 py-2.5 rounded-full font-inter text-xs tracking-wider uppercase font-semibold text-white bg-gradient-to-r from-primary to-accent border border-secondary/20 hover:border-secondary transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,193,7,0.3)] hover:scale-[1.02] overflow-hidden group"
          >
            <span className="relative z-10">Book Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white hover:text-secondary transition-colors p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Glassmorphic overlay navigation */}
      <div
        className={`fixed inset-0 top-[60px] z-40 bg-background-cosmic/95 backdrop-blur-xl lg:hidden flex flex-col p-8 transition-all duration-500 ease-in-out border-t border-white/5 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 my-auto text-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                onClick={() => setIsOpen(false)}
                href={item.href}
                className={`font-cinzel text-xl tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-secondary font-bold' : 'text-slate-300 hover:text-secondary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto w-full">
          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="block text-center py-4 rounded-full font-inter text-sm tracking-widest uppercase font-bold text-white bg-gradient-to-r from-primary to-accent border border-secondary/20 shadow-lg"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}

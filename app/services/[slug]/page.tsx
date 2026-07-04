import servicesData from '@/data/services.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, HelpCircle,
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home as HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint
} from 'lucide-react';
import { Metadata } from 'next';

const iconMap: { [key: string]: any } = {
  Briefcase, HeartHandshake, Heart, TrendingUp, ShieldAlert,
  GraduationCap, Globe, Flame, Compass, Gem, Binary, Home: HomeIcon,
  Hand, Eye, Layers, Disc, Fingerprint
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} Astrology Consultation`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const ServiceIcon = iconMap[service.icon] || Sparkles;

  // Filter related services
  const relatedServices = servicesData
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="w-full relative py-16 px-6">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary text-xs uppercase tracking-widest font-inter mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        {/* Hero Section of Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full self-start">
                <ServiceIcon className="w-4 h-4 text-secondary" />
                <span className="font-devanagari text-xs text-secondary font-medium">{service.sanskrit}</span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {service.title} Reading
              </h1>
              <p className="font-cormorant text-xl text-slate-300 italic leading-relaxed mt-2">
                &ldquo;{service.shortDescription}&rdquo;
              </p>
            </div>

            <div className="border-t border-white/5 pt-8">
              <h2 className="font-cinzel text-lg font-bold text-white mb-4">Core Principles</h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Benefits & Problems Solved Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
              <div>
                <h3 className="font-cinzel text-sm font-bold text-white mb-4 tracking-widest uppercase">
                  Expected Insights & Benefits
                </h3>
                <ul className="flex flex-col gap-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-bold text-white mb-4 tracking-widest uppercase">
                  Common Obstacles Resolved
                </h3>
                <ul className="flex flex-col gap-3">
                  {service.problemsSolved.map((problem, i) => (
                    <li key={i} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step by step Process */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="font-cinzel text-lg font-bold text-white mb-6">Our Analytical Workflow</h3>
              <div className="flex flex-col gap-6 pl-4 border-l border-secondary/20">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col gap-1">
                    <div className="absolute left-[-21px] top-1.5 w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-cinzel text-xs font-bold text-secondary">Phase {idx + 1}</span>
                    <p className="font-inter text-xs text-slate-400 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="border-t border-white/5 pt-8">
                <h3 className="font-cinzel text-lg font-bold text-white mb-6">Specific Service FAQs</h3>
                <div className="flex flex-col gap-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="rounded-lg glass p-5 border border-white/5">
                      <div className="flex gap-3 items-start mb-2">
                        <HelpCircle className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                        <h4 className="font-cinzel text-xs font-bold text-white">{faq.question}</h4>
                      </div>
                      <p className="font-inter text-xs text-slate-400 leading-relaxed pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking / Help Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-8">
            <div className="glass-premium rounded-xl p-8 border border-white/5 flex flex-col gap-6 text-center">
              <Sparkles className="w-8 h-8 text-secondary mx-auto animate-pulse" />
              <h3 className="font-cinzel text-lg font-bold text-white">Book This Consultation</h3>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                Schedule a 45-minute interactive video call with Acharya Vishal for this service.
              </p>
              <div className="flex flex-col gap-3 font-inter text-xs text-slate-400 text-left border-y border-white/5 py-4 my-2">
                <div className="flex justify-between">
                  <span>Session Mode</span>
                  <span className="text-white font-bold">Zoom/Google Meet</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-white font-bold">45 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Preparation Time</span>
                  <span className="text-white font-bold">4-5 Hours Manually</span>
                </div>
              </div>
              <Link
                href="/booking"
                className="w-full text-center py-3.5 bg-secondary text-[#050816] rounded-full font-inter text-xs tracking-wider uppercase font-bold hover:bg-amber-400 transition-colors"
              >
                Proceed to Booking
              </Link>
            </div>

            {/* Quick Contact Help */}
            <div className="glass rounded-xl p-6 border border-white/5 flex flex-col gap-4 text-xs font-inter text-slate-400">
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Need Custom Assistance?</h4>
              <p className="leading-relaxed">
                If you have custom chart configuration parameters or require offline assistance, contact our Vedic Helpdesk.
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2.5 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 font-bold border border-green-500/20 transition-all"
              >
                WhatsApp Ashram Support
              </a>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="border-t border-white/5 mt-20 pt-12">
          <h3 className="font-cinzel text-xl font-bold text-white mb-8">Other Vedic Consultations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rService) => {
              const RelIcon = iconMap[rService.icon] || Sparkles;
              return (
                <Link
                  key={rService.slug}
                  href={`/services/${rService.slug}`}
                  className="glass rounded-lg p-5 flex items-start gap-4 hover:border-secondary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary shrink-0">
                    <RelIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-cinzel text-xs font-bold text-white group-hover:text-secondary transition-colors">
                      {rService.title}
                    </h4>
                    <p className="font-inter text-[10px] text-slate-400 leading-snug line-clamp-2">
                      {rService.shortDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

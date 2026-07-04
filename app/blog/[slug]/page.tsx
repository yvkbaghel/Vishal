import blogsData from '@/data/blogs.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Share2, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: `${blog.title} | Vedic Astrological Blogs`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Related articles
  const relatedArticles = blogsData
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  return (
    <div className="w-full relative py-16 px-6">
      {/* Background gradients */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Reading Progress Indicator */}
      <div className="fixed top-[80px] left-0 right-0 h-[2px] bg-white/5 z-40">
        <div className="h-full bg-secondary shadow-[0_0_8px_#FFC107] w-[60%] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary text-xs uppercase tracking-widest font-inter mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="flex flex-col gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-secondary text-[10px] font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-inter">
              Vedic Archives
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-glow-purple">
            {blog.title}
          </h1>

          <p className="font-cormorant text-xl text-slate-300 italic leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-4 text-[10px] font-inter text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-secondary" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-secondary" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert max-w-none text-slate-300 font-inter text-sm leading-relaxed flex flex-col gap-6 whitespace-pre-line">
              {blog.content}
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-2 border-t border-white/5 mt-12 pt-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-inter text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar: Table of Contents & Share Controls */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-8">
            {/* TOC */}
            <div className="glass rounded-xl p-6 border border-white/5 flex flex-col gap-4">
              <h3 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Article Index</h3>
              <ul className="flex flex-col gap-3 font-inter text-xs text-slate-400">
                <li>
                  <span className="text-secondary font-bold">1.</span> Introduction
                </li>
                <li>
                  <span className="text-secondary font-bold">2.</span> Astrological Blueprint
                </li>
                <li>
                  <span className="text-secondary font-bold">3.</span> Scientific Pacifications
                </li>
                <li>
                  <span className="text-secondary font-bold">4.</span> Lineage Guidance
                </li>
              </ul>
            </div>

            {/* Share Panel */}
            <div className="glass rounded-xl p-6 border border-white/5 flex flex-col gap-4">
              <h3 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Share Article</h3>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 rounded bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center gap-2 font-inter text-[10px] uppercase font-bold transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                  <span>Tweet</span>
                </button>
                <button className="flex-1 py-2.5 rounded bg-blue-800/10 hover:bg-blue-800/20 text-blue-500 border border-blue-700/20 flex items-center justify-center gap-2 font-inter text-[10px] uppercase font-bold transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Footer */}
        <div className="border-t border-white/5 mt-20 pt-12">
          <h3 className="font-cinzel text-xl font-bold text-white mb-8">Related Cosmic Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="glass rounded-xl p-6 block border border-white/5 hover:border-secondary/20 hover:shadow-[0_8px_30px_rgba(103,58,183,0.1)] transition-all group"
              >
                <span className="font-inter text-[9px] uppercase tracking-widest text-secondary font-bold mb-2 block">
                  {rel.category}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-secondary transition-colors mb-3 leading-snug">
                  {rel.title}
                </h4>
                <p className="font-inter text-[11px] text-slate-400 line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import blogsData from '@/data/blogs.json';

export default function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(blogsData.map((b) => b.category)));

  // Filter posts
  const filteredBlogs = blogsData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-inter text-[9px] tracking-[0.25em] uppercase text-secondary font-bold">
              Vedic Wisdom Hub
            </span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wide text-white">
            Spiritual & Astrological Insights
          </h1>
          <p className="font-cormorant text-lg text-slate-300 max-w-xl italic">
            Read Acharya Vishal&apos;s analysis on transit changes, gemstone biophysics, and traditional mantra remediation frameworks.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-inter text-[10px] tracking-wider uppercase font-semibold border transition-all ${
                selectedCategory === null
                  ? 'bg-secondary text-[#050816] border-secondary'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:border-secondary/30'
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-inter text-[10px] tracking-wider uppercase font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-[#050816] border-secondary'
                    : 'bg-white/5 text-slate-300 border-white/5 hover:border-secondary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search cosmic articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-secondary transition-all"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-4 top-3" />
          </div>
        </div>

        {/* Article Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-xl glass border border-white/5 flex flex-col justify-between hover:border-secondary/30 hover:shadow-[0_8px_30px_rgba(103,58,183,0.12)] transition-all group"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[10px] font-inter text-slate-400">
                    <span className="text-secondary font-bold uppercase tracking-wider">{blog.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-cinzel text-lg font-bold text-white group-hover:text-secondary transition-colors leading-snug">
                    {blog.title}
                  </h2>
                  
                  <p className="font-inter text-xs text-slate-400 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="p-6 pt-0 flex flex-col gap-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-inter text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-inter text-slate-400">
                      <User className="w-3.5 h-3.5 text-secondary" />
                      <span>{blog.author}</span>
                    </div>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="font-inter text-[10px] font-bold uppercase tracking-widest text-secondary inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-xl border border-white/5 max-w-xl mx-auto flex flex-col gap-4">
            <span className="text-secondary text-lg font-cinzel">No Articles Found</span>
            <p className="font-inter text-xs text-slate-400">
              No cosmic archives match your search parameters. Try clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}
              className="mt-2 self-center px-6 py-2.5 rounded-full font-inter text-xs font-bold uppercase tracking-wider text-[#050816] bg-secondary hover:bg-amber-400 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

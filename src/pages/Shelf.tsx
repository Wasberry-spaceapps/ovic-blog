import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { getPosts } from '@/lib/posts';
import shelfContent from '@/content/site-copy/shelf.json';

export default function Shelf() {
  const posts = getPosts();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <Link href="/">
        <span className="font-display font-semibold text-ink-light hover:text-coral transition-colors cursor-pointer mb-6 inline-block">
          ← Home
        </span>
      </Link>
      <div className="flex items-center gap-4 mb-12">
        <h1 className="font-display text-5xl font-semibold text-ink">{shelfContent.pageTitle}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <Link href={`/shelf/${post.slug}`} key={post.slug}>
            <motion.div
              className="bg-cream-dark border-[3px] border-ink rounded-[24px] p-6 sm:p-8 cursor-pointer group flex flex-col h-full"
              style={{ boxShadow: 'var(--shadow-cartoon)' }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-cartoon-hover)' }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display text-2xl font-semibold text-ink mb-3 group-hover:text-coral transition-colors">
                {post.frontmatter.title}
              </h2>
              <div className="font-sans text-sm text-ink-light mb-4 font-medium">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <p className="font-sans text-ink leading-relaxed flex-1">
                {post.frontmatter.excerpt}
              </p>
              
              <div className="mt-6 flex justify-end">
                <span className="inline-flex items-center text-coral font-display font-semibold group-hover:translate-x-1 transition-transform">
                  {shelfContent.readButtonText} <span className="ml-1">→</span>
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

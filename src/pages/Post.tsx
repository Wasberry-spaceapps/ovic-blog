import React from 'react';
import { useRoute, Link } from 'wouter';
import { getPost } from '@/lib/posts';
import shelfContent from '@/content/site-copy/shelf.json';

export default function Post() {
  const [, params] = useRoute('/shelf/:slug');
  const slug = params?.slug;
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="font-display text-4xl text-ink">Post not found</h1>
        <Link href="/shelf">
          <div className="mt-8 px-6 py-3 bg-coral text-cream font-display font-semibold rounded-full border-[3px] border-ink shadow-[4px_4px_0px_0px_var(--ink)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--ink)] transition-all inline-block cursor-pointer">
            {shelfContent.backButtonText}
          </div>
        </Link>
      </div>
    );
  }

  const { Component, frontmatter } = post;

  return (
    <article className="w-full max-w-2xl mx-auto py-8">
      <Link href="/shelf">
        <span className="font-display font-semibold text-ink-light hover:text-coral transition-colors cursor-pointer mb-6 inline-block">
          ← Back to The Shelf
        </span>
      </Link>
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight mb-4">
          {frontmatter.title}
        </h1>
        <div className="font-sans text-ink-light font-medium mb-8">
          {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        
        {/* Decorative divider */}
        <div className="flex justify-center mb-10">
          <svg aria-hidden="true" width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 Q15 0 30 10 T60 10 T90 10 T120 10" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      <div className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-p:font-sans prose-p:text-ink prose-p:leading-[1.8] prose-p:mb-6 prose-a:text-coral prose-a:font-semibold hover:prose-a:text-ink prose-blockquote:border-l-[4px] prose-blockquote:border-coral prose-blockquote:bg-cream-dark prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:font-sans prose-blockquote:italic prose-blockquote:text-ink-light prose-strong:font-semibold">
        <Component />
      </div>

      <div className="mt-16 pt-8 border-t-[3px] border-ink/10 flex justify-center">
        <Link href="/shelf">
          <div className="flex items-center gap-2 px-6 py-3 bg-cream-dark text-ink font-display font-semibold rounded-full border-[3px] border-ink shadow-[4px_4px_0px_0px_var(--ink)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--ink)] transition-all group cursor-pointer">
            <svg className="group-hover:-translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {shelfContent.backButtonText}
          </div>
        </Link>
      </div>
    </article>
  );
}

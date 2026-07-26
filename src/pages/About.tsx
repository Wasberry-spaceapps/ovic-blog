import React from 'react';
import { Pip } from '@/components/Pip';
import aboutContent from '@/content/site-copy/about.json';

export default function About() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col pt-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-display text-5xl font-semibold text-ink">{aboutContent.pageTitle}</h1>
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 16 C 10 26 14 30 20 30 C 26 30 30 26 30 16 Z" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 30 18 Q 36 18 36 22 Q 36 26 30 26" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 16 10 Q 18 6 20 10 Q 22 14 24 10" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 15 22 Q 20 26 25 22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="bg-cream-dark border-[3px] border-ink rounded-[24px] p-8 sm:p-10 relative mb-12 shadow-[4px_4px_0px_0px_var(--ink)]">
        <p className="font-sans text-lg text-ink leading-relaxed mb-6">
          {aboutContent.paragraph1}
        </p>
        <p className="font-sans text-lg text-ink leading-relaxed mb-6">
          {aboutContent.paragraph2}
        </p>
        <p className="font-sans text-lg text-ink leading-relaxed">
          {aboutContent.paragraph3}
        </p>
        
        {/* Pip in the corner */}
        <div className="absolute -bottom-8 -right-4 sm:-right-8 flex items-end">
          <div className="relative mb-16 mr-[-20px] bg-white border-[3px] border-ink rounded-2xl p-3 px-4 shadow-[2px_2px_0px_0px_var(--ink)] z-10 hidden sm:block">
            <p className="font-display font-semibold text-ink text-sm">{aboutContent.mascotGreeting}</p>
            {/* Speech bubble tail */}
            <svg className="absolute -bottom-3 right-4" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 0 L 16 0 L 8 14 Z" fill="white" />
              <path d="M 0 0 L 8 14 L 16 0" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 0 0 L 16 0" stroke="white" strokeWidth="4" />
            </svg>
          </div>
          <Pip size={120} wave={true} />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Pip } from '@/components/Pip';
import contactContent from '@/content/site-copy/contact.json';

export default function Hello() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center pt-12 pb-20">
      <div className="relative mb-12">
        <Pip size={180} wave={true} />
        {/* Decorative sparkles */}
        <svg aria-hidden="true" className="absolute top-0 -right-8" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 0 L 23 17 L 40 20 L 23 23 L 20 40 L 17 23 L 0 20 L 17 17 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <svg aria-hidden="true" className="absolute bottom-8 -left-10" width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 0 L 23 17 L 40 20 L 23 23 L 20 40 L 17 23 L 0 20 L 17 17 Z" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="font-display text-5xl sm:text-6xl font-semibold text-ink mb-6">
        {contactContent.pageTitle}
      </h1>
      
      <p className="font-sans text-xl text-ink leading-relaxed max-w-md mx-auto mb-12">
        {contactContent.description}
      </p>

      <a 
        href={`mailto:${contactContent.emailAddress}`}
        className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-cream font-display text-xl font-semibold rounded-full border-[3px] border-ink shadow-[6px_6px_0px_0px_var(--ink)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--ink)] transition-all group"
      >
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 4 10 L 36 10 L 36 30 L 4 30 Z" fill="var(--cream)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 4 10 L 20 22 L 36 10" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        {contactContent.buttonText} <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
      </a>
    </div>
  );
}

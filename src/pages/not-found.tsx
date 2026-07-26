import React from 'react';
import { Link } from 'wouter';
import { Pip } from '@/components/Pip';

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
      <Pip size={160} />
      <h1 className="font-display text-6xl font-semibold text-ink mt-8 mb-4">
        404
      </h1>
      <p className="font-sans text-xl text-ink-light mb-8 max-w-md">
        Oh dear. It seems this page has been misplaced in the archives.
      </p>
      
      <Link href="/">
        <div className="flex items-center gap-2 px-8 py-4 bg-coral text-cream font-display text-lg font-semibold rounded-full border-[3px] border-ink shadow-[4px_4px_0px_0px_var(--ink)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--ink)] transition-all cursor-pointer inline-block">
          Back to the Home
        </div>
      </Link>
    </div>
  );
}

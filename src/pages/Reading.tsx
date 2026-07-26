import React from 'react';

const currentlyReading = [
  {
    title: "The Dictionary of Lost Words",
    author: "Pip Williams",
    progress: 65,
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    progress: 30,
  }
];

const upNext = [
  "Babel by R.F. Kuang",
  "Piranesi by Susanna Clarke",
  "The Starless Sea by Erin Morgenstern"
];

export default function Reading() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col pt-8">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink">What I'm Reading</h1>
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 14 32 L 26 32 L 24 12 L 16 12 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 18 12 L 18 8 C 18 6 22 6 22 8 L 22 12" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 12 32 L 28 32" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 20 26 C 22 26 22 22 20 20 C 18 22 18 26 20 26 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex flex-col gap-6 mb-16">
        {currentlyReading.map((book, i) => (
          <div key={i} className="bg-cream-dark border-[3px] border-ink rounded-[24px] p-6 sm:p-8 flex items-center gap-6 shadow-[4px_4px_0px_0px_var(--ink)]">
            <div className="hidden sm:block">
              <svg aria-hidden="true" width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="40" height="60" rx="4" fill="var(--sky)" stroke="var(--ink)" strokeWidth="3" />
                <path d="M 16 10 L 16 70" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                <path d="M 24 25 L 40 25" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 24 35 L 35 35" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold text-ink mb-1">{book.title}</h2>
              <p className="font-sans text-ink-light font-medium mb-6">by {book.author}</p>
              
              <div className="w-full">
                <div className="flex justify-between font-sans text-sm font-bold text-ink mb-2">
                  <span>Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="h-4 w-full bg-cream rounded-full border-[2.5px] border-ink overflow-hidden">
                  <div 
                    className="h-full bg-coral border-r-[2.5px] border-ink transition-all duration-1000 ease-out"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl font-semibold text-ink mb-6 flex items-center gap-3">
        Next on the pile
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 4 20 L 20 20" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 6 20 L 6 14 L 18 14 L 18 20" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 8 14 L 8 8 L 16 8 L 16 14" fill="var(--coral)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </h2>
      
      <div className="bg-cream-dark border-[3px] border-ink rounded-[24px] p-6 sm:p-8 shadow-[4px_4px_0px_0px_var(--ink)]">
        <ul className="flex flex-col gap-4">
          {upNext.map((book, i) => (
            <li key={i} className="flex items-center gap-3 font-sans text-lg text-ink font-medium">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <circle cx="8" cy="8" r="5" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
              </svg>
              {book}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import recommendationsContent from '@/content/site-copy/recommendations.json';

const recommendations = [
  {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    note: "A book that feels like it's made entirely of magic, smoke, and mirrors.",
    rating: 5
  },
  {
    title: "A Psalm for the Wild-Built",
    author: "Becky Chambers",
    note: "Like drinking a warm cup of tea on a rainy afternoon. Pure comfort.",
    rating: 5
  },
  {
    title: "The Ocean at the End of the Lane",
    author: "Neil Gaiman",
    note: "Reminded me exactly what it felt like to be a child encountering the unknown.",
    rating: 4
  },
  {
    title: "This Is How You Lose the Time War",
    author: "Amal El-Mohtar & Max Gladstone",
    note: "The most beautiful prose I have read in the last decade. A masterpiece.",
    rating: 5
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    note: "An absolute delight of a sci-fi novel that made me laugh out loud.",
    rating: 4
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    note: "A quiet, beautiful puzzle of a book. The less you know going in, the better.",
    rating: 5
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill={i < rating ? "var(--sun)" : "none"} 
          stroke="var(--ink)" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Recommendations() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col pt-8">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink">{recommendationsContent.pageTitle}</h1>
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 30 L 30 30 L 30 24 L 10 24 Z" fill="var(--cream-dark)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 12 24 L 28 24 L 28 18 L 12 18 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 14 18 L 26 18 L 26 12 L 14 12 Z" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {recommendations.map((book, i) => (
          <div key={i} className="bg-cream-dark border-[3px] border-ink rounded-[24px] p-6 shadow-[4px_4px_0px_0px_var(--ink)] flex flex-col">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-1">
              {book.title}
            </h2>
            <p className="font-sans text-ink-light font-medium mb-4">by {book.author}</p>
            
            <p className="font-sans text-ink leading-relaxed mb-6 flex-1">
              "{book.note}"
            </p>
            
            <div className="mt-auto pt-4 border-t-[2.5px] border-ink/10 flex justify-between items-center">
              <span className="font-display font-semibold text-ink-light text-sm">{recommendationsContent.ratingLabel}</span>
              <StarRating rating={book.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

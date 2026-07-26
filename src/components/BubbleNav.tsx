import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useReducedMotion } from 'framer-motion';
import globalContent from '@/content/site-copy/global.json';

interface Bubble {
  label: string;
  path: string;
  color: string;
  Object3D: React.FC<any>;
  // desktop specific offset for organic look
  desktopTransform: string;
  icon: React.ReactNode;
}

const bubbles: Bubble[] = [
  {
    label: globalContent.bubbleNavHome,
    path: "/",
    color: "var(--cream-dark)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20 6 L 6 18 L 10 18 L 10 32 L 30 32 L 30 18 L 34 18 Z" fill="currentColor" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 24 10 L 24 6 L 28 6 L 28 14" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 16 22 L 20 26 L 24 22 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: globalContent.bubbleNavShelf,
    path: "/shelf",
    color: "var(--coral)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 12 L 20 16 L 32 12 L 32 28 L 20 32 L 8 28 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 20 16 L 20 32" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 12 18 L 16 19" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 24 19 L 28 18" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: globalContent.bubbleNavAbout,
    path: "/about",
    color: "var(--sky)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 16 C 10 26 14 30 20 30 C 26 30 30 26 30 16 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 30 18 Q 36 18 36 22 Q 36 26 30 26" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 16 10 Q 18 6 20 10 Q 22 14 24 10" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 15 22 Q 20 26 25 22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="20" r="1.5" fill="var(--ink)" />
        <circle cx="23" cy="20" r="1.5" fill="var(--ink)" />
      </svg>
    ),
  },
  {
    label: globalContent.bubbleNavReading,
    path: "/reading",
    color: "var(--sun)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 14 32 L 26 32 L 24 12 L 16 12 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 18 12 L 18 8 C 18 6 22 6 22 8 L 22 12" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 12 32 L 28 32" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 20 26 C 22 26 22 22 20 20 C 18 22 18 26 20 26 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: globalContent.bubbleNavRecommendations,
    path: "/recommendations",
    color: "var(--leaf)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 30 L 30 30 L 30 24 L 10 24 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 12 24 L 28 24 L 28 18 L 12 18 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 14 18 L 26 18 L 26 12 L 14 12 Z" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 20 15 L 21 17 L 23 17 L 21.5 18.5 L 22 20.5 L 20 19.5 L 18 20.5 L 18.5 18.5 L 17 17 L 19 17 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: globalContent.bubbleNavContact,
    path: "/hello",
    color: "var(--coral)",
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 14 L 32 14 L 32 28 L 8 28 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 8 14 L 20 22 L 32 14" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="20" cy="22" r="3" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function BubbleNav() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      {/* 
        Responsive Layout Grid:
        - Mobile: 2 columns, predictable grid, no overlaps.
        - Desktop: flex-wrap layout with staggered placements.
      */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 md:gap-12 place-items-center">
        {bubbles.map((bubble, i) => {
          const floatAnimation = shouldReduceMotion ? {} : {
            y: [0, -8, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: i * 0.3,
            }
          };

          return (
            <Link href={bubble.path} key={bubble.path} className={`w-full max-w-[180px] aspect-square ${bubble.desktopTransform}`}>
              <motion.div
                className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                animate={floatAnimation}
              >
                {/* 2D Bubble */}
                <div 
                  className="absolute inset-0 rounded-full border-[3px] border-ink transition-colors z-0"
                  style={{ backgroundColor: bubble.color, boxShadow: 'var(--shadow-cartoon-sm)' }}
                />
                
                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                  <div className="text-ink mb-2 group-hover:scale-110 transition-transform">
                    {bubble.icon}
                  </div>
                  <span className="font-display text-sm md:text-base font-semibold text-center leading-tight px-3 text-ink">
                    {bubble.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

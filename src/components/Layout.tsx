import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Pip } from './Pip';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isHome = location === '/';

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-cream selection:bg-coral selection:text-cream">
      {/* Background decorative elements */}
      {!isHome && (
        <div className="fixed -bottom-10 -left-10 opacity-[0.03] pointer-events-none z-0">
          <Pip size={400} />
        </div>
      )}

      {/* Sticky App Shell Header */}
      <header className={`sticky top-0 z-40 bg-cream-dark border-b-[3px] border-ink flex items-center justify-between px-4 sm:px-6 h-16 shadow-sm ${isHome ? 'mb-8' : ''}`}>
        <Link href="/">
          <div className="cursor-pointer group flex items-center">
            <Logo size={40} className="group-hover:scale-105 transition-transform" />
          </div>
        </Link>
        <Link href="/about">
          <div className="cursor-pointer hover:rotate-12 transition-transform duration-300">
            <Pip size={36} />
          </div>
        </Link>
      </header>

      {/* Main Content Area with AnimatePresence */}
      <main className={`flex-1 relative z-10 flex flex-col ${!isHome ? 'max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12' : 'items-center justify-center'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Simple Footer for non-home pages */}
      {!isHome && (
        <footer className="w-full py-8 text-center text-ink-light text-sm font-sans mt-auto z-10">
          <p>Made with love &lt;3</p>
        </footer>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Pip } from './Pip';
import globalContent from '@/content/site-copy/global.json';

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedTheShelf');
    if (!hasVisited) {
      setShow(true);
      sessionStorage.setItem('hasVisitedTheShelf', 'true');
      
      const duration = shouldReduceMotion ? 500 : 2500;
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <Pip size={160} animateBook={!shouldReduceMotion} />
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h1 className="font-display text-4xl font-semibold text-ink tracking-wide relative">
                {globalContent.siteTitle}
                <svg aria-hidden="true" width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute -bottom-2 left-0 mt-1">
                  <path
                    d="M0,4 Q10,0 20,4 T40,4 T60,4 T80,4 T100,4"
                    fill="none"
                    stroke="var(--coral)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </h1>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

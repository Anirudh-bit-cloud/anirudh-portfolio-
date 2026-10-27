"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Safe check for sessionStorage and reduced motion
    try {
      const hasSeen = sessionStorage.getItem("as_preloader_seen");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hasSeen || prefersReducedMotion) {
        setIsLoaded(true);
        onComplete?.();
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    const duration = 1200; // ms
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          try {
            sessionStorage.setItem("as_preloader_seen", "true");
          } catch {}
          onComplete?.();
        }, 250);
      }
    }, intervalTime);

    // Hard fallback safety timeout: always dismiss after 1.8 seconds maximum
    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      setIsLoaded(true);
      try {
        sessionStorage.setItem("as_preloader_seen", "true");
      } catch {}
      onComplete?.();
    }, 1800);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsLoaded(true);
    try {
      sessionStorage.setItem("as_preloader_seen", "true");
    } catch {}
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#0b0c0e] text-[#edeae3] cursor-pointer select-none"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span>Portfolio &bull; Anirudh Saini</span>
            <span className="text-[11px] text-zinc-400 hover:text-white transition-colors underline underline-offset-4">
              Click anywhere to skip
            </span>
          </div>

          {/* Central Identity Title */}
          <div className="max-w-4xl space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              Anirudh Saini
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-400 font-normal">
              Machine Learning &amp; Software Engineering
            </p>
          </div>

          {/* Bottom Counter Strip */}
          <div className="flex items-end justify-between border-t border-zinc-800/80 pt-6">
            <div className="text-xs font-mono text-zinc-500">
              SRMIST &bull; C-DAC MEPZ CHENNAI
            </div>
            <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tighter text-[#d4ff3f]">
              {count.toString().padStart(2, "0")}
              <span className="text-base font-normal text-zinc-600 ml-1.5">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

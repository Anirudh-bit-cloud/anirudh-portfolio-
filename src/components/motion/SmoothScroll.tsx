"use client";

import React, { useEffect } from "react";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lenisInstance: any = null;
    let rafId: number | null = null;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    import("lenis")
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });

        (window as any).__lenis = lenisInstance;

        function raf(time: number) {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        // Fallback to native scrolling if lenis fails to load
        console.warn("Smooth scroll fallback:", err);
      });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      try {
        delete (window as any).__lenis;
      } catch {}
    };
  }, []);

  return <>{children}</>;
};

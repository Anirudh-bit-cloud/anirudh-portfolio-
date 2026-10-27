"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.15 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Disable on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;
      const clickableEl = target?.closest("a, button, [role='button']") as HTMLElement | null;

      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else if (clickableEl) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
    >
      <motion.div
        animate={{
          width: cursorText ? 76 : isHovered ? 48 : 12,
          height: cursorText ? 76 : isHovered ? 48 : 12,
          backgroundColor: cursorText ? "#d4ff3f" : isHovered ? "rgba(255, 255, 255, 0.2)" : "#ffffff",
          borderColor: cursorText ? "#d4ff3f" : "#ffffff",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="rounded-full border border-white flex items-center justify-center text-center backdrop-blur-[1px]"
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#0b0c0e] uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

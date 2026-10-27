"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  speed = 28,
  className = "",
}) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none py-3 hairline-t hairline-b ${className}`}>
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="inline-flex items-center gap-8"
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 group">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-muted group-hover:text-accent transition-colors">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-fg-faint" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = "",
  delay = 0,
  as = "h1",
}) => {
  const words = children.split(" ");
  const Component = motion[as] as any;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      y: "115%",
      opacity: 0,
      rotateZ: 2,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.28em] py-0.5">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

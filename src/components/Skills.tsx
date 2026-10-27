"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Marquee } from "./motion/Marquee";
import { SplitText } from "./motion/SplitText";

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const SKILL_GROUPS = data.skillGroups;
  const marqueeKeywords = [
    "Scikit-learn",
    "FastAPI",
    "Optuna (HPO)",
    "SHAP (XAI)",
    "React.js",
    "Spring Boot",
    "Python",
    "Java",
    "C++",
    "MySQL",
    "Pandas & NumPy",
    "Data Structures & Algorithms",
    "System Design",
  ];

  return (
    <section id="skills" className="py-24 sm:py-36 hairline-t">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              03 / System Toolkit
            </span>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-fg"
            >
              Capabilities &amp; Stack
            </SplitText>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
            Technologies and engineering foundations exercised in active production workflows and academic coursework.
          </p>
        </div>
      </div>

      {/* Kinetic Infinite Typography Ticker */}
      <Marquee items={marqueeKeywords} speed={32} className="mb-16" />

      {/* Typographic Technical Ledger Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div
            key={group.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.76, 0, 0.24, 1] as const }}
            className="space-y-4 p-6 rounded-lg bg-bg-card hairline hover:border-fg transition-colors group"
          >
            <div className="flex items-baseline justify-between hairline-b pb-3">
              <span className="font-mono text-xs text-accent font-bold">
                /{group.index}
              </span>
              <h3 className="font-display text-base font-bold uppercase tracking-tight text-fg group-hover:text-accent transition-colors">
                {group.name}
              </h3>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm font-mono text-fg-muted">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center justify-between hover:text-fg transition-colors py-0.5"
                >
                  <span>{skill}</span>
                  <span className="text-fg-faint text-[10px]">&bull;</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

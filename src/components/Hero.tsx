"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Copy, Check, Github, Linkedin, Award, Mail } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SplitText } from "./motion/SplitText";
import { Magnetic } from "./motion/Magnetic";

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { data } = usePortfolio();
  const PERSONAL = data.personal;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="main-content"
      className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Top Metadata Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 hairline-b text-xs font-mono text-fg-muted uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-accent font-bold">[00]</span>
          <span>Computer Science Undergraduate &bull; SRMIST</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{PERSONAL.coordinates}</span>
          <span className="hidden sm:inline text-fg-faint">&bull;</span>
          <span className="hidden sm:inline">CGPA 8.70 / 10.00</span>
        </div>
      </div>

      {/* Main Hero Title */}
      <div className="py-12 sm:py-16 space-y-6">
        <div className="max-w-5xl">
          <SplitText
            as="h1"
            delay={0.1}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-fg leading-[1.08]"
          >
            I build machine learning systems that actually ship.
          </SplitText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.76, 0, 0.24, 1] as const }}
          className="max-w-2xl"
        >
          <p className="text-lg sm:text-xl text-fg-muted font-normal leading-relaxed">
            AI &amp; ML Trainee at <span className="text-fg font-medium">C-DAC MEPZ</span> and Computer Science undergraduate at <span className="text-fg font-medium">SRMIST</span>, training predictive pipelines and building reliable software.
          </p>
        </motion.div>
      </div>

      {/* Human First-Person Context & Currently Line */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 hairline-t items-start">
        {/* Left Column: Currently indicator & Short Bio */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-start gap-3 p-4 bg-bg-card hairline rounded-lg">
            <span className="font-mono text-xs text-accent font-bold mt-0.5 shrink-0">[CURRENTLY]</span>
            <p className="text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
              Completing a 400-hour machine learning specialization at <strong className="text-fg font-semibold">C-DAC MEPZ</strong> in Chennai, working through exploratory data analysis, Scikit-learn pipelines, and SHAP explainability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-fg text-bg rounded-md text-xs font-mono font-bold tracking-wider uppercase hover:bg-accent hover:text-accent-contrast transition-colors"
              >
                <span>View Selected Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-6 py-3.5 hairline rounded-md text-xs font-mono text-fg hover:border-fg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Copied sainianirudh03march@gmail.com</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-fg-muted" />
                    <span>Copy Direct Email</span>
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Direct Verified Links & LeetCode Handle */}
        <div className="md:col-span-5 space-y-3 font-mono text-xs">
          <span className="text-[11px] uppercase tracking-widest text-fg-faint block pb-1">
            Direct Portals
          </span>

          <a
            href={PERSONAL.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 hairline rounded-md hover:bg-bg-subtle hover:border-fg transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Github className="w-4 h-4 text-fg-muted group-hover:text-fg transition-colors" />
              <span className="text-fg">GitHub</span>
              <span className="text-fg-faint text-[11px]">@Anirudh-bit-cloud</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-fg-muted group-hover:text-accent transition-colors" />
          </a>

          <a
            href={PERSONAL.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 hairline rounded-md hover:bg-bg-subtle hover:border-fg transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className="w-4 h-4 text-fg-muted group-hover:text-fg transition-colors" />
              <span className="text-fg">LinkedIn</span>
              <span className="text-fg-faint text-[11px]">/in/anirudh-saini-cse</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-fg-muted group-hover:text-accent transition-colors" />
          </a>

          <a
            href={PERSONAL.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 hairline rounded-md hover:bg-bg-subtle hover:border-fg transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-fg-muted group-hover:text-fg transition-colors" />
              <span className="text-fg">LeetCode</span>
              <span className="text-fg-faint text-[11px]">30+ DSA Solved ({PERSONAL.socials.leetcodeHandle})</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-fg-muted group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

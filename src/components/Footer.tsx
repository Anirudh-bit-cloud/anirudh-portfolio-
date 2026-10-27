"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Settings } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Magnetic } from "./motion/Magnetic";

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const PERSONAL = data.personal;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="hairline-t bg-bg text-fg py-12 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 hairline-b text-xs font-mono text-fg-muted">
        <div>
          <span className="font-display font-bold uppercase text-fg text-sm block">
            Anirudh Saini
          </span>
          <span className="text-fg-faint">
            Machine Learning Trainee (C-DAC MEPZ) &bull; SRMIST
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PERSONAL.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            LeetCode
          </a>
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="p-2 rounded hairline bg-bg-card hover:border-fg text-fg transition-colors ml-2"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-fg-faint">
        <p>&copy; {new Date().getFullYear()} Anirudh Saini. Designed with editorial rigor.</p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hover:text-accent transition-colors flex items-center gap-1">
            <Settings className="w-3 h-3" />
            <span>CMS / Admin Mode</span>
          </Link>
          <span>&bull;</span>
          <p>Next.js 15 &bull; TypeScript &bull; Lenis &bull; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

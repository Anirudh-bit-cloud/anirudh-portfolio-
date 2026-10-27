"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SplitText } from "./motion/SplitText";

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const EXPERIENCES = data.experiences;
  return (
    <section id="experience" className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto hairline-t">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 hairline-b">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block mb-2">
            02 / Traineeships &amp; Roles
          </span>
          <SplitText
            as="h2"
            className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-fg"
          >
            Experience
          </SplitText>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
          Applied industry specialization at C-DAC MEPZ alongside cross-functional quality operations at SRMIST.
        </p>
      </div>

      {/* Vertical Timeline Entries */}
      <div className="relative pt-12 space-y-16">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.76, 0, 0.24, 1] as const }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative pb-12 hairline-b last:border-b-0"
          >
            {/* Meta Col */}
            <div className="md:col-span-4 space-y-2 font-mono text-xs text-fg-muted">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">/{exp.number}</span>
                <span className="text-fg font-semibold">{exp.period}</span>
              </div>
              <div className="flex items-center gap-1.5 text-fg-faint">
                <MapPin className="w-3.5 h-3.5" />
                <span>{exp.location}</span>
              </div>
              {exp.current && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[11px] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Current Engagement</span>
                </div>
              )}
            </div>

            {/* Role & Responsibilities */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-fg uppercase tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-sm font-medium text-fg-muted mt-0.5">
                  {exp.organization}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed font-mono">
                {exp.summary}
              </p>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-fg">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-accent font-mono text-xs mt-1 shrink-0">&bull;</span>
                    <span className="text-fg-muted">{r}</span>
                  </li>
                ))}
              </ul>

              {/* Tools chips */}
              <div className="flex flex-wrap gap-2 pt-3">
                {exp.tools.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-card hairline text-fg-faint"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github, Layers, Cpu, Database, Layout, ShieldCheck } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm overscroll-contain"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] as const }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-bg text-fg hairline rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col overscroll-contain"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 hairline-b bg-bg-subtle shrink-0">
            <div className="flex items-center gap-3 font-mono text-xs text-fg-muted">
              <span className="text-accent font-bold">PROJECT {project.number}</span>
              <span>&bull;</span>
              <span>{project.category}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg rounded-md transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="p-6 sm:p-10 overflow-y-auto space-y-8 overscroll-contain modal-scroll"
          >
            {/* Title & Tagline */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded bg-accent/15 text-accent border border-accent/30 font-semibold">
                {project.metricBadge}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-fg tracking-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-fg-muted font-normal leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Problem & Built & Outcome Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-lg bg-bg-card hairline space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-fg-faint block">
                  01 / The Problem
                </span>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-bg-card hairline space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-fg-faint block">
                  02 / What I Built
                </span>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {project.built}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-bg-card hairline space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block">
                  03 / Real Outcome
                </span>
                <p className="text-xs sm:text-sm text-fg leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Architecture Ledger */}
            <div className="space-y-4 pt-4 hairline-t">
              <span className="font-mono text-xs uppercase tracking-widest text-fg-faint block">
                Technical Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {project.architecture.model && (
                  <div className="p-4 rounded-lg bg-bg-card hairline flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="text-fg-faint block text-[10px] uppercase">Model / Engine</span>
                      <span className="text-fg">{project.architecture.model}</span>
                    </div>
                  </div>
                )}
                {project.architecture.backend && (
                  <div className="p-4 rounded-lg bg-bg-card hairline flex items-start gap-3">
                    <Layers className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="text-fg-faint block text-[10px] uppercase">Backend Service</span>
                      <span className="text-fg">{project.architecture.backend}</span>
                    </div>
                  </div>
                )}
                {project.architecture.frontend && (
                  <div className="p-4 rounded-lg bg-bg-card hairline flex items-start gap-3">
                    <Layout className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="text-fg-faint block text-[10px] uppercase">Client Interface</span>
                      <span className="text-fg">{project.architecture.frontend}</span>
                    </div>
                  </div>
                )}
                {project.architecture.database && (
                  <div className="p-4 rounded-lg bg-bg-card hairline flex items-start gap-3">
                    <Database className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="text-fg-faint block text-[10px] uppercase">Data Store</span>
                      <span className="text-fg">{project.architecture.database}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technology Stack Tags */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-fg-faint block">
                Toolchain
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded bg-bg-subtle text-fg font-mono text-xs hairline"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 hairline-t bg-bg-subtle flex items-center justify-between">
            <span className="text-xs font-mono text-fg-muted">
              Source verified on GitHub
            </span>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-fg text-bg rounded-md text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent hover:text-accent-contrast transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Code Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Download, ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const PERSONAL = data.personal;
  const EXPERIENCES = data.experiences;
  const PROJECTS = data.projects;
  const EDUCATION = data.education;
  const CERTIFICATIONS = data.certifications;

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-black/85 backdrop-blur-sm overscroll-contain"
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
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] as const }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-bg text-fg hairline rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans overscroll-contain"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 hairline-b bg-bg-subtle shrink-0">
            <div className="font-mono text-xs text-fg-muted flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-bold text-fg">Curriculum Vitae</span>
              <span className="text-fg-faint">&bull; Anirudh Saini</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hairline text-xs font-mono text-fg hover:bg-bg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg rounded transition-colors ml-2"
                aria-label="Close CV modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Body */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="p-6 sm:p-12 overflow-y-auto space-y-8 text-xs sm:text-sm overscroll-contain modal-scroll"
          >
            {/* Header Identity */}
            <div className="space-y-3 pb-6 hairline-b">
              <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-fg">
                Anirudh Saini
              </h1>
              <p className="text-sm sm:text-base text-fg-muted font-normal">
                {PERSONAL.role} &bull; SRMIST CSE (8.70 CGPA)
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-muted pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-fg-faint" />
                  {PERSONAL.location}
                </span>
                <a href={`mailto:${PERSONAL.email}`} className="hover:text-fg underline">
                  {PERSONAL.email}
                </a>
                <a href={`tel:${PERSONAL.phone}`} className="hover:text-fg underline">
                  {PERSONAL.phone}
                </a>
                <a
                  href={PERSONAL.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg underline"
                >
                  LinkedIn
                </a>
                <a
                  href={PERSONAL.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Traineeships & Experience */}
            <div className="space-y-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                Experience &amp; Traineeships
              </h2>
              <div className="space-y-6">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.number} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-mono text-xs">
                      <span className="font-bold text-fg text-sm">
                        {exp.role} <span className="font-normal text-fg-muted">| {exp.organization}</span>
                      </span>
                      <span className="text-fg-faint">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 list-disc list-outside pl-4 text-fg-muted">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4 pt-4 hairline-t">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                Selected Projects
              </h2>
              <div className="space-y-4">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="space-y-1 p-3 rounded bg-bg-card hairline">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-fg">{proj.title}</span>
                      <span className="text-accent font-semibold">{proj.metricBadge}</span>
                    </div>
                    <p className="text-fg-muted text-xs">{proj.built}</p>
                    <p className="font-mono text-[11px] text-fg-faint pt-1">
                      Stack: {proj.stack.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4 pt-4 hairline-t">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                Education
              </h2>
              <div className="space-y-3 font-mono text-xs">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-fg">{edu.school}</span>
                      <span className="block text-fg-muted">{edu.degree}</span>
                    </div>
                    <span className="text-accent font-semibold sm:text-right mt-1 sm:mt-0">
                      {edu.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4 pt-4 hairline-t">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                Certifications &amp; Algorithmic Milestones
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-bg-card hairline">
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[10px] uppercase font-bold">{cert.tag}</span>
                      {cert.issueDate && (
                        <span className="text-[10px] text-fg-faint">{cert.issueDate}</span>
                      )}
                    </div>
                    <span className="text-fg font-semibold block">{cert.title}</span>
                    <span className="text-fg-faint text-[11px] block">{cert.issuer}</span>
                    {cert.credentialId && (
                      <span className="text-[10px] text-fg-faint block mt-0.5">ID: {cert.credentialId}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink, ShieldCheck, Printer, CheckCircle2, Calendar, Hash } from "lucide-react";
import { CertificationItem } from "@/data/portfolioData";

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    if (cert) {
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
  }, [cert]);

  if (!cert) return null;

  const handlePrint = () => {
    window.print();
  };

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
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] as const }}
          className="relative w-full max-w-2xl bg-bg text-fg hairline rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans overscroll-contain"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 hairline-b bg-bg-subtle shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs text-fg-muted">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-bold text-fg">Verified Credential Record</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hairline text-xs font-mono text-fg hover:bg-bg transition-colors"
                title="Print Certificate"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg rounded transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Diploma Card */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="p-6 sm:p-10 space-y-6 overflow-y-auto max-h-[80vh] overscroll-contain modal-scroll"
          >
            <div className="p-8 sm:p-10 rounded-xl bg-bg-card hairline border-2 border-line/60 relative overflow-hidden space-y-6 text-center">
              {/* Subtle Guilloche Corner Accents */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-fg-faint">
                [ID: {cert.credentialId}]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-accent font-bold">
                VERIFIED CREDENTIAL
              </div>

              {/* Issuer Crest / Award Icon */}
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/40 text-accent mx-auto flex items-center justify-center shadow-lg shadow-accent/10">
                <Award className="w-8 h-8" />
              </div>

              {/* Title & Recognition */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-fg-faint block">
                  Certificate of Competence &amp; Mastery
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-fg">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs text-accent font-semibold pt-1">
                  Issued by {cert.issuer}
                </p>
              </div>

              {/* Recipient Details */}
              <div className="py-3 hairline-t hairline-b max-w-sm mx-auto space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-fg-faint block">
                  Conferred Upon
                </span>
                <span className="font-display text-xl font-bold uppercase tracking-wider text-fg block">
                  Anirudh Saini
                </span>
                <span className="text-xs font-mono text-fg-muted block">
                  SRM Institute of Science &amp; Technology (B.Tech CSE)
                </span>
              </div>

              {/* Syllabus / Description */}
              <p className="text-xs font-mono text-fg-muted leading-relaxed max-w-md mx-auto">
                {cert.description}
              </p>

              {/* Skills Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                  {cert.skills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg hairline text-fg-muted"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              )}

              {/* Verification Metadata Footer */}
              <div className="pt-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-fg-faint border-t border-line/40">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Issue: {cert.issueDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Officially Authenticated</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-fg-faint text-[11px]">
                Credential ID: <span className="text-fg font-semibold">{cert.credentialId}</span>
              </span>
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-bold hover:brightness-110 transition-all"
                >
                  <span>Verify with Issuing Body</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

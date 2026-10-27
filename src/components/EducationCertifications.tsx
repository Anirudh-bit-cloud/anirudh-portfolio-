"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Award, CheckCircle2, ShieldCheck, Eye } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { CertificationItem } from "@/data/portfolioData";
import { CertificateModal } from "./CertificateModal";
import { SplitText } from "./motion/SplitText";

export const EducationCertifications: React.FC = () => {
  const { data } = usePortfolio();
  const EDUCATION = data.education;
  const CERTIFICATIONS = data.certifications;
  const PERSONAL = data.personal;

  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <>
      <section id="education" className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto hairline-t">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 hairline-b">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              04 / Academics &amp; Problem Solving
            </span>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-fg"
            >
              Education &amp; Credentials
            </SplitText>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
            Rigorous academic performance, accredited enterprise certifications, and algorithmic problem-solving milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Education Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-faint block pb-2 hairline-b">
              Academic Ledger
            </span>

            <div className="space-y-6">
              {EDUCATION.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 rounded-lg bg-bg-card hairline space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-fg-muted">
                    <span>{item.period}</span>
                    <span className="text-accent font-bold">{item.grade}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-fg uppercase tracking-tight pt-1">
                    {item.degree}
                  </h3>
                  <div className="text-xs text-fg-muted mt-0.5 font-medium">
                    {item.school}
                  </div>
                  <p className="text-xs text-fg-muted font-mono leading-relaxed pt-2">
                    {item.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & DSA Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 hairline-b font-mono text-xs">
              <span className="uppercase tracking-widest text-fg-faint">
                Verified Credentials &amp; DSA ({CERTIFICATIONS.length})
              </span>
              <a
                href={PERSONAL.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                <span>LeetCode Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => setSelectedCert(cert)}
                  className="p-5 rounded-lg bg-bg-card hairline flex flex-col justify-between space-y-4 hover:border-fg transition-colors cursor-pointer group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-bg-subtle text-accent font-bold inline-block">
                        {cert.tag}
                      </span>
                      {cert.issueDate && (
                        <span className="text-[11px] font-mono text-fg-faint">
                          {cert.issueDate}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-bold text-fg uppercase tracking-tight group-hover:text-accent transition-colors">
                      {cert.title}
                    </h4>
                    <div className="text-xs text-fg-muted font-medium">
                      {cert.issuer}
                    </div>
                    <p className="text-xs text-fg-muted font-mono leading-relaxed pt-1 line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 font-mono text-[11px] text-fg-faint flex items-center justify-between hairline-t">
                    <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                    <span className="text-accent group-hover:underline flex items-center gap-1 text-[11px]">
                      <Eye className="w-3 h-3" />
                      <span>Inspect Credential</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal Viewer */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
};

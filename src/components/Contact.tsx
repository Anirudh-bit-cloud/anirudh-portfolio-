"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, Send, Github, Linkedin, Mail, Phone, Loader2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Magnetic } from "./motion/Magnetic";
import { SplitText } from "./motion/SplitText";

export const Contact: React.FC = () => {
  const { data, addMessage } = usePortfolio();
  const PERSONAL = data.personal;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Name is required.";
    if (!formState.email.trim() || !formState.email.includes("@")) {
      errs.email = "Valid email is required.";
    }
    if (!formState.message.trim() || formState.message.length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      addMessage({
        name: formState.name,
        email: formState.email,
        subject: "Direct Inquiry from Portfolio",
        message: formState.message,
      });
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto hairline-t">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 hairline-b">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block mb-2">
            05 / Dialogue
          </span>
          <SplitText
            as="h2"
            className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-fg"
          >
            Let&apos;s Build.
          </SplitText>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
          Open to Machine Learning and Software Engineering opportunities, internships, and technical collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
        {/* Left Direct Copy Pills & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-faint block">
              Direct Inquiries
            </span>
            <p className="text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
              I respond to emails and LinkedIn messages typically within 24 hours.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Email Box */}
            <div className="p-4 rounded-lg bg-bg-card hairline flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-[10px] uppercase text-fg-faint block">Email</span>
                <span className="text-fg truncate block">{PERSONAL.email}</span>
              </div>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded hairline bg-bg-subtle hover:border-fg text-fg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-fg-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>

            {/* Phone Box */}
            <div className="p-4 rounded-lg bg-bg-card hairline flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase text-fg-faint block">Phone / WhatsApp</span>
                <span className="text-fg block">{PERSONAL.phone}</span>
              </div>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyPhone}
                  className="px-3 py-1.5 rounded hairline bg-bg-subtle hover:border-fg text-fg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-fg-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Social Portals */}
          <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
            <a
              href={PERSONAL.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 p-3 rounded-lg bg-bg-card hairline hover:border-fg transition-colors"
            >
              <Linkedin className="w-4 h-4 text-fg-muted" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-fg-faint" />
            </a>
            <a
              href={PERSONAL.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 p-3 rounded-lg bg-bg-card hairline hover:border-fg transition-colors"
            >
              <Github className="w-4 h-4 text-fg-muted" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-fg-faint" />
            </a>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-xl bg-bg-card hairline space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
              Send a Transmission
            </h3>

            {isSent ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono">
                Message recorded. Thank you for reaching out, Anirudh will respond shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-fg-muted uppercase text-[10px]">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-bg hairline text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent"
                    />
                    {errors.name && <p className="text-rose-500 text-[11px]">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-fg-muted uppercase text-[10px]">Your Email</label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-bg hairline text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent"
                    />
                    {errors.email && <p className="text-rose-500 text-[11px]">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-muted uppercase text-[10px]">Message Details</label>
                  <textarea
                    rows={4}
                    placeholder="Hello Anirudh, let's discuss..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-bg hairline text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent resize-none"
                  />
                  {errors.message && <p className="text-rose-500 text-[11px]">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-fg text-bg rounded font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent hover:text-accent-contrast transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Dispatch</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

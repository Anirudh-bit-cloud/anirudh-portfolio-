"use client";

import React, { useState } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { EducationCertifications } from "@/components/EducationCertifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ResumeModal } from "@/components/ResumeModal";
import { AdminEditorBar } from "@/components/AdminEditorBar";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />

      <div className="relative min-h-screen bg-bg text-fg flex flex-col selection:bg-accent selection:text-accent-contrast">
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        <main className="flex-grow">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <Projects />
          <Experience />
          <Skills />
          <EducationCertifications />
          <Contact />
        </main>

        <Footer />

        <AdminEditorBar />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}

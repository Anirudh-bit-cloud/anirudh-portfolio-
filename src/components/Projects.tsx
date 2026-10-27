"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Code2, Layers } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { SplitText } from "./motion/SplitText";

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const PROJECTS = data.projects;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              01 / Selected Work
            </span>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-fg"
            >
              Systems &amp; Models
            </SplitText>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-fg-muted font-mono leading-relaxed">
            Real implementations built with Scikit-learn, FastAPI, Spring Boot, and React. Verified code available on GitHub.
          </p>
        </div>

        {/* Project Ledger List */}
        <div className="divide-y divide-line">
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.76, 0, 0.24, 1] as const }}
              data-cursor="VIEW"
              onClick={() => setActiveModalProject(project)}
              className="group py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start cursor-pointer hover:bg-bg-subtle/50 transition-colors -mx-6 sm:-mx-12 px-6 sm:px-12"
            >
              {/* Col 1: Number & Year */}
              <div className="lg:col-span-2 font-mono text-xs text-fg-muted flex lg:flex-col justify-between">
                <span className="text-accent font-bold text-base sm:text-lg">
                  /{project.number}
                </span>
                <span className="text-fg-faint">{project.year}</span>
              </div>

              {/* Col 2: Title & Category & Summary */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-fg-muted">
                      {project.category}
                    </span>
                    <span className="text-fg-faint">&bull;</span>
                    <span className="text-xs font-mono text-accent font-bold">
                      {project.metricBadge}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-fg group-hover:text-accent transition-colors tracking-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-fg-muted font-normal leading-relaxed">
                  {project.tagline}
                </p>

                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed line-clamp-2">
                  {project.built}
                </p>

                {/* Toolchain tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-bg-card hairline text-fg-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 3: Outcomes & Direct Actions */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:hairline-l">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-fg-faint block">
                    Verified Outcome
                  </span>
                  <p className="text-xs font-mono text-fg leading-relaxed bg-bg-card p-3 rounded hairline">
                    {project.outcome}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-accent font-medium group-hover:underline flex items-center gap-1">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-fg-muted hover:text-fg hover:bg-bg-card rounded-md hairline transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </>
  );
};

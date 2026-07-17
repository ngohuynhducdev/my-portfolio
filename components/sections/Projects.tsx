"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { GithubIcon } from "@/components/ui/icons";

// ─── Project card ─────────────────────────────────────────────────────────────
type Project = (typeof PROJECTS)[number];

/** Placeholder-aware: hide links until a real URL replaces "#". */
function hasUrl(url: string): boolean {
  return url.length > 0 && url !== "#";
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group relative rounded-xl overflow-hidden border border-border bg-card flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-bold text-foreground leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-secondary border border-border text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links — always visible so touch and keyboard users can reach them */}
        {(hasUrl(project.caseStudyUrl) || hasUrl(project.githubUrl)) && (
          <div className="flex items-center gap-4 pt-2 border-t border-border mt-1">
            {hasUrl(project.caseStudyUrl) && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={13} aria-hidden="true" />
                View Case
              </a>
            )}
            {hasUrl(project.githubUrl) && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Portfolio
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.5,
              delay: 0.25,
              ease: EASE,
            }}
            className="h-1 w-16 rounded-full bg-primary origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-xl text-sm sm:text-base"
          >
            Selected websites I&apos;ve designed and built.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

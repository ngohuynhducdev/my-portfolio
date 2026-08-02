"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { GithubIcon } from "@/components/ui/icons";

// ─── Project card ─────────────────────────────────────────────────────────────
type Project = (typeof PROJECTS)[number];

/** Both links are optional — a project without one leaves the field empty. */
function hasUrl(url: string): boolean {
  return url.length > 0;
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
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-base font-bold text-foreground leading-snug">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
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
                className="flex items-center gap-1.5 py-3 -my-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={13} aria-hidden="true" />
                Live Demo
              </a>
            )}
            {hasUrl(project.githubUrl) && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 py-3 -my-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
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
        <SectionHeading
          title="Portfolio"
          subtitle="Selected websites I've designed and built."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

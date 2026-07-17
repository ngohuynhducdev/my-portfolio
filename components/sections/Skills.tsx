"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types ───────────────────────────────────────────────────────────────────
type Skill = { readonly name: string; readonly level: "frequent" | "occasional" };

// Bar length per usage level — tweak widths here (same accent color for all).
const BAR_WIDTHS: Record<Skill["level"], string> = {
  frequent: "w-full",
  occasional: "w-1/3",
};

// ─── Skill badge: bordered pill with a small tick showing usage frequency ────
function SkillBadge({
  name,
  level,
  delay,
}: {
  name: string;
  level: "frequent" | "occasional";
  delay?: number;
}) {
  const badge = (
    <span className="relative inline-flex overflow-hidden px-3 py-1.5 rounded-md border border-border bg-secondary text-sm text-foreground transition-colors duration-300 hover:border-primary/50">
      {name}
      {/* Usage bar flush with the badge's bottom edge — length encodes frequency */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-0.5 bg-primary ${BAR_WIDTHS[level]}`}
      />
    </span>
  );

  if (delay === undefined) return badge;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex"
    >
      {badge}
    </motion.span>
  );
}

// ─── Category block ──────────────────────────────────────────────────────────
function CategoryBlock({
  label,
  skills,
  delay,
}: {
  label: string;
  skills: readonly Skill[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="flex flex-col gap-5"
    >
      <h3 className="text-xl font-bold text-foreground">{label}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <SkillBadge
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={delay + 0.04 * i}
          />
        ))}
      </div>
    </motion.div>
  );
}

const CATEGORIES = [
  { key: "languages" as const, label: "Programming Languages" },
  { key: "technologies" as const, label: "Technologies" },
  { key: "tools" as const, label: "Software and Tools" },
];

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-16 px-6">
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
            Technical Expertise
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="h-1 w-16 rounded-full bg-primary origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-xl text-sm sm:text-base"
          >
            The bar under each label shows how often I use it:
          </motion.p>
        </div>

        {/* Category blocks */}
        <div className="flex flex-col gap-12">
          {/* Legend — same badge style as the skills, lives with them */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <SkillBadge name="Frequently Used" level="frequent" />
            <SkillBadge name="Occasionally" level="occasional" />
          </motion.div>

          {CATEGORIES.map(({ key, label }, i) => (
            <CategoryBlock
              key={key}
              label={label}
              skills={SKILLS[key]}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

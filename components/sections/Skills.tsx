"use client";

import { motion } from "framer-motion";
import { SKILLS, type SkillLevel } from "@/lib/constants";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

type Skill = (typeof SKILLS)[keyof typeof SKILLS][number];

// Bar length encodes how often the skill is used, on the CV's four-step scale.
const BAR_WIDTHS: Record<SkillLevel, string> = {
  100: "w-full",
  75: "w-3/4",
  50: "w-1/2",
  25: "w-1/4",
};

// ─── Skill badge: bordered pill with a small tick showing usage frequency ────
function SkillBadge({
  name,
  level,
  delay,
}: {
  name: string;
  level: SkillLevel;
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
  { key: "languages", label: "Programming Languages" },
  { key: "technologies", label: "Technologies" },
  { key: "tools", label: "Software and Tools" },
] as const;

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionHeading
          title="Technical Expertise"
          subtitle="The bar under each label shows how often I use it:"
        />

        <div className="flex flex-col gap-12">
          {/* Legend — same badge style as the skills, so it reads as a key */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            {/* The CV's legend names only the two ends of the scale, so this
                one does too. */}
            <SkillBadge name="Frequently Used" level={100} />
            <SkillBadge name="Occasionally" level={25} />
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

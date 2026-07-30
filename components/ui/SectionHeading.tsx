"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animation";

const VIEWPORT = { once: true, amount: 0.5 } as const;

/**
 * Centered section header: title, animated accent rule, optional subtitle.
 * Shared so the four sections stay in step — the stagger between the three
 * elements is the same everywhere and only needs tuning in one place.
 */
export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-foreground"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
        className="h-1 w-16 rounded-full bg-primary origin-left"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-xl text-sm sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

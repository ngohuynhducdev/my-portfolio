"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, EXPERIENCE_NOTE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Work Experience
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
            Companies I&apos;ve worked with and what I built along the way.
          </motion.p>
        </div>

        {/* ── Plain editorial list ── */}
        <div className="flex flex-col">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              // The note below closes the list, so the last entry drops its
              // trailing rule and padding — only entries followed by another
              // entry get a divider.
              className={cn(
                "pt-8 first:pt-0",
                i < EXPERIENCE.length - 1 && "pb-8 border-b border-border",
              )}
            >
              {/* Role @ company — dates */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-bold text-foreground">
                  {item.role}{" "}
                  <span className="font-medium text-muted-foreground">
                    @ {item.company}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground shrink-0">
                  {item.period}
                </span>
              </div>

              {/* Stack — tag row above the bullets, same chips as project cards */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.highlights.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-secondary border border-border text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <ul className="mt-4 flex flex-col gap-2 list-disc pl-5 marker:text-primary">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Pre-development background — closes the gap before 2022 */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pt-4 text-sm text-muted-foreground leading-relaxed"
          >
            {EXPERIENCE_NOTE}
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}

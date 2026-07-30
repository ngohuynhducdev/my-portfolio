"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, EXPERIENCE_NOTE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionHeading
          title="Work Experience"
          subtitle="Companies I've worked with and what I built along the way."
        />

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
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-bold text-foreground">
                  {item.role}{" "}
                  <span className="font-medium text-muted-foreground">
                    @ {item.company}
                  </span>
                </h3>
                <span className="text-xs text-muted-foreground shrink-0">
                  {item.period}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.highlights.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <ul className="mt-4 flex flex-col gap-2 list-disc pl-5 marker:text-primary">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
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
            className="pt-4 text-sm sm:text-base italic text-muted-foreground leading-relaxed"
          >
            {EXPERIENCE_NOTE}
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}

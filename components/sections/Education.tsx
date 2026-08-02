"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/lib/constants";
import { EASE } from "@/lib/animation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionHeading
          title="Education"
          subtitle="Where the front-end groundwork came from."
        />

        {/* Cards rather than the experience section's full-width rows: two
            short entries stretched across the container left the period
            stranded far from its school name. Capped narrower than the usual
            max-w-7xl for the same reason — the content is only a few words. */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {EDUCATION.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <GraduationCap size={20} aria-hidden="true" />
              </span>

              {/* min-w-0 lets a long school name wrap instead of forcing the
                  card wider than its grid column. */}
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="text-base font-bold leading-snug text-balance text-foreground">
                  {item.school}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.program}
                </p>
                <span className="mt-1 text-xs text-muted-foreground">
                  {item.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

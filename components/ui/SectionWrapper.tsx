"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

interface SectionWrapperProps extends ComponentPropsWithoutRef<"section"> {
  /** The anchor id used for navbar smooth-scroll links */
  id?: string;
  /** Extra classes applied to the outer <section> element */
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps every page section with a fade-in + slide-up animation.
 * The animation triggers once the element enters the viewport (40% visible).
 *
 * Usage:
 *   <SectionWrapper id="about" className="py-24">
 *     ...
 *   </SectionWrapper>
 */
export default function SectionWrapper({
  id,
  className,
  children,
  ...rest
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn("w-full", className)}
      {...(rest as ComponentPropsWithoutRef<typeof motion.section>)}
    >
      {children}
    </motion.section>
  );
}

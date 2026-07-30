"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

/**
 * Wraps every page section in a fade-in + slide-up that fires once, when 15%
 * of the section has entered the viewport. `id` doubles as the navbar's
 * scroll anchor.
 */
export default function SectionWrapper({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof motion.section>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn("w-full", className)}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

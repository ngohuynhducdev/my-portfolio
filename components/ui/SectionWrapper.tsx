"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

/**
 * Wraps every page section in a fade-in + slide-up that fires once, when 15%
 * of the section has entered the viewport. `id` doubles as the navbar's
 * scroll anchor.
 *
 * The motion sits on an inner element, not on the <section> itself: a
 * transform moves the element's box, and scrollIntoView measures that box. If
 * the section were the one sliding, clicking a nav link before it had played
 * its entry animation would aim 40px too low, and the heading would end up
 * behind the fixed header once the transform settled.
 */
export default function SectionWrapper({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn("w-full", className)} {...rest}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </section>
  );
}

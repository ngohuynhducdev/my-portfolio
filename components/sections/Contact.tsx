"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { EASE } from "@/lib/animation";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const SOCIALS = [
  { icon: <GithubIcon />, label: "GitHub", href: PERSONAL_INFO.socials.github },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    href: PERSONAL_INFO.socials.linkedin,
  },
];

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <SectionWrapper id="contact" className="py-16 px-6">
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
            Get In Touch
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
        </div>

        {/* Direct contact block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-lg">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. The fastest way to reach
            me is a direct email.
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex max-w-full items-center gap-2 rounded-lg px-4 sm:px-6 min-h-11 py-2 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
          >
            <Mail size={16} aria-hidden="true" className="shrink-0" />
            <span className="break-all">{PERSONAL_INFO.email}</span>
          </a>

          {/* Phone + location */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/\s|\(|\)|-/g, "")}`}
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone size={13} aria-hidden="true" />
              {PERSONAL_INFO.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} aria-hidden="true" />
              {PERSONAL_INFO.location}
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

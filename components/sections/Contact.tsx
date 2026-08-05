"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
        <SectionHeading title="Get In Touch" />

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

          {/* Email CTA — a real link, so it borrows the CTA styling rather than
              the Button primitive, which would stamp role="button" over the link
              semantics. Long addresses have to wrap on narrow screens, so the
              button's default nowrap and fixed height are both relaxed here. */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className={cn(
              buttonVariants({ variant: "cta", size: "cta" }),
              "max-w-full h-auto min-h-11 py-2 whitespace-normal"
            )}
          >
            <Mail size={16} aria-hidden="true" className="shrink-0" />
            <span className="break-all">{PERSONAL_INFO.email}</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a
              href={`tel:${PERSONAL_INFO.phoneHref}`}
              className="flex items-center gap-1.5 py-3 -my-3 hover:text-primary transition-colors"
            >
              <Phone size={13} aria-hidden="true" />
              {PERSONAL_INFO.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} aria-hidden="true" />
              {PERSONAL_INFO.location}
            </span>
          </div>

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

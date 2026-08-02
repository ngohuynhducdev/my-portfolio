"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, FileText, Heart, Sparkles } from "lucide-react";
import {
  siFigma,
  siFramer,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { Button } from "@/components/ui/button";
import {
  PERSONAL_INFO,
  PILLARS,
  TECH_STACK,
  TOOL_STACK,
} from "@/lib/constants";
import { EASE } from "@/lib/animation";
import { scrollToSection } from "@/lib/scroll";

/** Masked line reveal: line slides up from behind an overflow-hidden mask. */
function MaskedLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── Tech stack: monochrome brand icons (simple-icons path data) ─────────────
// simple-icons dropped the VS Code mark over trademark policy, so its path
// lives here — same approach as the brand icons in components/ui/icons.tsx.
const VS_CODE_ICON = {
  title: "Visual Studio Code",
  path: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
};

/** Every label in TECH_STACK / TOOL_STACK. Keyed this way so adding a stack
 *  entry without an icon is a type error instead of a silently missing icon. */
type StackLabel = (typeof TECH_STACK)[number] | (typeof TOOL_STACK)[number];

const TECH_ICONS: Record<StackLabel, { title: string; path: string }> = {
  TypeScript: siTypescript,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  "Framer Motion": siFramer,
  "Next.js": siNextdotjs,
  "VS Code": VS_CODE_ICON,
  Figma: siFigma,
};

function TechIcon({ label }: { label: StackLabel }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={26}
      height={26}
      fill="currentColor"
      className="text-muted-foreground/70 hover:text-foreground transition-colors"
    >
      {/* Serves as both the hover tooltip and the accessible name. */}
      <title>{label}</title>
      <path d={TECH_ICONS[label].path} />
    </svg>
  );
}

// ─── Pillar cards (philosophy row) ───────────────────────────────
const PILLAR_ICONS = {
  sparkles: Sparkles,
  heart: Heart,
  code: Code2,
} as const;

const PILLAR_ACCENTS = {
  amber: "bg-amber-600",
  rose: "bg-rose-600",
  indigo: "bg-indigo-600",
} as const;

export default function Hero() {
  const [firstName, ...restName] = PERSONAL_INFO.name.split(" ");

  return (
    <section id="about" className="relative flex flex-col px-6 pt-20 pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
        <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-blue-600/10 dark:bg-blue-400/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: greeting + headline ── */}
          <div className="flex flex-col gap-5 w-full">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-xl sm:text-2xl font-semibold text-muted-foreground"
            >
              hi!{" "}
              <motion.span
                animate={{ rotate: [0, 24, -8, 24, 0] }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                className="inline-block origin-[70%_70%]"
                aria-hidden="true"
              >
                🤟
              </motion.span>
            </motion.p>

            {/* 7xl waits for xl: at lg the text column is only ~456px and the
                headline needs ~537px at that size, so it would wrap to two
                lines. */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
              <MaskedLine delay={0.15}>
                I&apos;m <span className="text-primary">{firstName}</span>
                {restName.length > 0 && <> {restName.join(" ")}</>},
              </MaskedLine>
            </h1>

            <div className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md">
              <MaskedLine delay={0.3}>
                a{" "}
                <span className="font-bold text-foreground">
                  {PERSONAL_INFO.title.toLowerCase()}
                </span>{" "}
                {PERSONAL_INFO.tagline}
              </MaskedLine>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
              className="flex flex-wrap items-center gap-5 mt-2"
            >
              <Button
                variant="cta"
                size="cta"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
              </Button>
              <a
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                /* py-3 lifts the tap target to the CTA's 44px; the row is already
                   that tall, so nothing moves. */
                className="inline-flex items-center gap-2 py-3 text-sm font-bold tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText size={16} aria-hidden="true" />
                RESUME
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
              className="flex flex-col gap-3 mt-10"
            >
              <span className="text-sm text-muted-foreground">
                current favorite tech stack/tools:
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {TECH_STACK.map((label) => (
                  <TechIcon key={label} label={label} />
                ))}
                <span aria-hidden="true" className="h-4 w-px bg-border" />
                {TOOL_STACK.map((label) => (
                  <TechIcon key={label} label={label} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: masked portrait, desktop only ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="relative hidden lg:flex items-center justify-end"
          >
            {/* Soft violet halo pooling under the portrait. Deliberately
                OUTSIDE the mask: anything painted inside gets clipped to the
                mask's straight top and left edges, and its corner step then
                reads as a hard staircase rather than as design. Dark mode
                leans on it to separate the black hoodie from the near-black
                background. */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-120 h-80 rounded-full blur-[90px] bg-primary/20 dark:bg-primary/30"
            />

            {/* Organic corner-cut mask (the 603x590 shape in .mask-portrait);
                its one job is curving the bottom of the portrait. The box is
                ~1.5x the visible portrait — the image fills only its right
                66.3% — so it is deliberately wider and taller than the grid
                column. shrink-0 stops flex from clamping it to the column and
                dragging the portrait down; the overhang is empty mask area
                that clears the text, and pointer-events-none keeps it inert. */}
            <div className="relative shrink-0 pointer-events-none w-152 xl:w-184 aspect-603/590 mask-portrait">
              {/* Portrait fades and scales in once the layout has settled.
                  Occupies the right 400 of the mask's 603 units (66.3%), at the
                  PNG's own 1064x1479 ratio — matching the ratio is what makes
                  bottom-0 actually sit on the mask's bottom edge. A mismatched
                  box would letterbox the contained image and float it upward. */}
              <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                className="absolute bottom-0 right-0 w-[66.3%] aspect-1064/1479"
              >
                <Image
                  src="/images/hero-portrait-image.png"
                  alt={`Portrait of ${PERSONAL_INFO.name}`}
                  fill
                  priority
                  /* Rendered width is 66.3% of the mask: ~31rem at xl, ~25rem
                     at lg. Below lg the whole block is display:none, so 1px
                     stops the priority preload fetching it on mobile. */
                  sizes="(min-width: 1280px) 31rem, (min-width: 1024px) 25rem, 1px"
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Pillar cards row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PILLARS.map(({ title, description, icon, accent }) => {
            const Icon = PILLAR_ICONS[icon];
            return (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-3 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex items-center gap-3 rounded-full bg-secondary pr-4">
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-white ${PILLAR_ACCENTS[accent]}`}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {title}
                  </span>
                </div>
                <p className="px-3 pt-3 pb-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

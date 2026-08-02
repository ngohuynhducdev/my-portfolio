// ─── Site / SEO config ────────────────────────────────────────────────────────
export const SITE = {
  name: "Duc Ngo — Front-End Developer",
  shortName: "Duc Ngo",
  // Split in two so the logo can colour the halves differently.
  brand: { first: "duc", second: "dev" },
  description:
    "Portfolio of Duc Ngo — front-end developer with 4 years building web applications with React, Next.js, and TypeScript at Gameloft.",
  url: "https://ngohuynhducdev.vercel.app",
  ogImageAlt: "Duc Ngo — Front-End Developer portfolio",
  locale: "en_US",
} as const;

// ─── Navigation Links ─────────────────────────────────────────────────────────
// Single source of truth for the page's sections: the navbar renders from this
// list and the IntersectionObserver that drives the active-link state observes
// exactly the same ids. Adding a section is one edit — the two can't drift.
// Order must match the render order in app/page.tsx.
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

// ─── Personal Information ────────────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Duc Ngo",
  title: "Front-End Developer",
  tagline: "who loves building intuitive, clean and modern web experiences.",
  email: "ngohuynhducdev@gmail.com",
  phone: "0939 166 553",
  // E.164 for the tel: link — the display string above stays local format.
  phoneHref: "+84939166553",
  location: "Ho Chi Minh City, Vietnam",
  cvUrl: "/CV_NgoHuynhDuc.pdf",
  socials: {
    github: "https://github.com/ngohuynhducdev",
    linkedin: "https://www.linkedin.com/in/ngohuynhducdev",
  },
} as const;

// ─── Tech Stack (Hero icon row) ───────────────────────────────────────────────
// Rendered as two groups split by a divider: what I build with, then what I
// build in. Every label must exist in TECH_ICONS (components/sections/Hero.tsx).
export const TECH_STACK = [
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Next.js",
] as const;

export const TOOL_STACK = ["VS Code", "Figma"] as const;

// ─── Hero pillars (philosophy cards) ─────────────────────────────────────────
export const PILLARS = [
  {
    title: "Clean & Intuitive",
    description:
      "Keep the UI clean with a modern touch without compromising UX.",
    icon: "sparkles",
    accent: "amber",
  },
  {
    title: "Detail Oriented",
    description: "Aware of ease of access, UI consistency, and improved UX.",
    icon: "heart",
    accent: "rose",
  },
  {
    title: "Pretty & Optimized",
    description:
      "Writing clean code is a top priority while keeping it as optimized as possible.",
    icon: "code",
    accent: "indigo",
  },
] as const;

// ─── Skills ──────────────────────────────────────────────────────────────────
// `level` drives the usage-frequency bar under each skill badge:
// "frequent" = used on most projects, "occasional" = used situationally.
export const SKILLS = {
  languages: [
    { name: "HTML", level: "frequent" },
    { name: "CSS / SCSS", level: "frequent" },
    { name: "TypeScript", level: "frequent" },
    { name: "JavaScript", level: "frequent" },
  ],
  technologies: [
    { name: "React", level: "frequent" },
    { name: "Next.js", level: "frequent" },
    { name: "Tailwind CSS", level: "frequent" },
    { name: "shadcn/ui", level: "frequent" },
    { name: "Framer Motion", level: "frequent" },
    { name: "Jotai", level: "frequent" },
    { name: "Strapi", level: "frequent" },
    { name: "REST APIs", level: "frequent" },
    { name: "Material UI", level: "occasional" },
    { name: "Vite", level: "occasional" },
    { name: "Redux", level: "occasional" },
    { name: "GraphQL", level: "occasional" },
    { name: "Vitest", level: "occasional" },
  ],
  tools: [
    { name: "Git / GitHub", level: "frequent" },
    { name: "VS Code", level: "frequent" },
    { name: "Vercel", level: "frequent" },
    { name: "Figma", level: "frequent" },
    { name: "Postman", level: "occasional" },
    { name: "Illustrator", level: "occasional" },
    { name: "Photoshop", level: "occasional" },
  ],
} as const;

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: "gameloft",
    role: "Front-End Developer",
    company: "Gameloft",
    period: "May 2022 — Present",
    bullets: [
      "Built and maintained responsive, high-traffic web pages and marketing sites for Gameloft's global products using React, Next.js, and TypeScript.",
      "Improved page-load performance through code splitting, image optimization, and bundle-size reduction.",
      "Developed a library of 20+ reusable UI components, cutting feature-development time and keeping the UI consistent across projects.",
      "Collaborated with designers, backend engineers, and PMs in an Agile team on weekly release cycles.",
    ],
    highlights: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Jotai",
      "Strapi",
      "Figma",
    ],
  },
] as const;

/** Rendered under the experience list — the pre-development background. */
export const EXPERIENCE_NOTE =
  "Earlier: 4 years as a Graphic Designer before transitioning into front-end development via CyberSoft Bootcamp.";

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: "cybersoft",
    school: "CyberSoft Academy",
    program: "Bootcamp Front-End Website",
    period: "Sep 2021 — Mar 2022",
  },
  {
    id: "it-college",
    school: "Information Technology College",
    program: "Software Engineering",
    period: "2014 — 2017",
  },
] as const;

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "ecommerce",
    title: "Furniture E-Commerce Store",
    description:
      "A furniture e-commerce site with a complete purchase flow — browsing, cart, checkout, and order confirmation — backed by a decoupled Strapi CMS. Cart, wishlist, and order data persist via Jotai, with session-based auth on protected routes, automated unit/e2e testing, CI/CD, and a Lighthouse Accessibility score of 100.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi", "Jotai", "Vitest"],
    image: "/images/project-ecommerce.jpg",
    caseStudyUrl: "https://ecommerce-dexr.vercel.app",
    githubUrl: "https://github.com/ngohuynhducdev/ecommerce",
  },
  {
    id: "web-studio",
    title: "Web Studio",
    description:
      "A template-based landing page platform for small businesses: clients pick a design, customize content via CMS, and deploy to their own domain — with a layered content-fallback system so non-technical clients can safely edit copy without breaking the layout.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity", "Vitest"],
    image: "/images/project-web-studio.jpg",
    caseStudyUrl: "https://web-studio-chi.vercel.app",
    githubUrl: "https://github.com/ngohuynhducdev/web-studio",
  },
] as const;

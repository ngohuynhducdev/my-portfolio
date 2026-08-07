// ─── Site / SEO config ────────────────────────────────────────────────────────
export const SITE = {
  name: "Duc Ngo — Front-End Developer",
  shortName: "Duc Ngo",
  // Split in two so the logo can colour the halves differently.
  brand: { first: "duc", second: "dev" },
  description:
    "Portfolio of Duc Ngo — front-end developer with 4 years building web applications with React, Next.js, Remix.js, and TypeScript at Gameloft.",
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
// `level` is the percentage of the badge the usage bar fills, mirroring the
// underline under each skill in the CV. That underline runs on a four-step
// scale; the CV's own legend names only the two ends ("Frequently Used" at 100,
// "Occasionally" at 25). Nothing currently sits at 75 — the step exists so a
// skill can move there without reworking the scale.
export type SkillLevel = 25 | 50 | 75 | 100;

// Each category is a list of sub-groups, mirroring the CV's own breakdown, so
// related tech sits together rather than being ordered by usage level. A group
// with a `null` label renders its badges with no sub-heading — used where the
// category is small enough that a single label would only repeat the category.
export const SKILLS = {
  languages: [
    {
      label: null,
      items: [
        { name: "HTML", level: 100 },
        { name: "CSS / SCSS", level: 100 },
        { name: "TypeScript", level: 100 },
        { name: "JavaScript", level: 100 },
      ],
    },
  ],
  technologies: [
    {
      label: "Frameworks",
      items: [
        { name: "React", level: 100 },
        { name: "Next.js", level: 100 },
        { name: "Remix.js", level: 50 },
        { name: "Vite", level: 100 },
      ],
    },
    {
      label: "State",
      items: [
        { name: "Jotai", level: 100 },
        { name: "Redux", level: 25 },
      ],
    },
    {
      label: "UI & Styling",
      items: [
        { name: "Tailwind CSS", level: 100 },
        { name: "shadcn/ui", level: 50 },
        { name: "Framer Motion", level: 50 },
        { name: "Material UI", level: 25 },
      ],
    },
    {
      label: "Backend",
      items: [
        { name: "Strapi", level: 100 },
        { name: "GraphQL", level: 100 },
        { name: "REST APIs", level: 25 },
      ],
    },
    {
      label: "Testing",
      items: [{ name: "Vitest", level: 25 }],
    },
  ],
  tools: [
    {
      label: "Coder",
      items: [
        { name: "VS Code", level: 100 },
        { name: "Git / GitHub", level: 100 },
        { name: "Vercel", level: 50 },
        { name: "Postman", level: 50 },
      ],
    },
    {
      label: "Designer",
      items: [
        { name: "Figma", level: 100 },
        { name: "Illustrator", level: 25 },
        { name: "Photoshop", level: 25 },
      ],
    },
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
      "Built and maintained responsive, high-traffic web pages and marketing sites for Gameloft's global products using React, Next.js, Remix.js and TypeScript.",
      "Translated Figma designs into responsive, cross-browser-compatible interfaces.",
      "Improved page-load performance through code splitting, image optimization, and bundle-size reduction.",
      "Developed a library of 20+ reusable UI components, cutting feature-development time and keeping the UI consistent across projects.",
      "Managed site content with Strapi CMS and integrated GraphQL and REST APIs in collaboration with backend engineers.",
      "Collaborated with designers, backend engineers, and PMs in an Agile team on weekly release cycles.",
    ],
    highlights: [
      "React",
      "Next.js",
      "Remix.js",
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
      "A furniture e-commerce site with a complete purchase flow — browsing, cart, checkout, and order confirmation — backed by a decoupled Strapi CMS. Cart, wishlist, and order data persist via Jotai, with session-based auth on protected routes. Tested with Vitest, and scores 100 on Lighthouse Accessibility.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Strapi",
      "Jotai",
      "Vitest",
    ],
    image: "/images/project-ecommerce.jpg",
    caseStudyUrl: "https://ecommerce-dexr.vercel.app",
    githubUrl: "https://github.com/ngohuynhducdev/ecommerce",
  },
  {
    id: "web-studio",
    title: "Web Studio",
    description:
      "A template-driven landing page platform for small businesses, starting with three spa templates: clients choose a design, customize content through a headless CMS, and publish to their own domain. Tested with Vitest.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest"],
    image: "/images/project-web-studio.jpg",
    caseStudyUrl: "https://web-studio-chi.vercel.app",
    githubUrl: "https://github.com/ngohuynhducdev/web-studio",
  },
] as const;

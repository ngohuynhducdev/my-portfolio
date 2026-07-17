// ─── Site / SEO config ────────────────────────────────────────────────────────
// TODO: thay url thật khi deploy (vd https://ducngo.dev)
export const SITE = {
  name: "Duc Ngo — Web Developer",
  shortName: "Duc Ngo",
  // Navbar/footer wordmark — split in two for the two-tone logo.
  brand: { first: "duc", second: "dev" },
  description:
    "Portfolio of Duc Ngo — crafting beautiful, functional web experiences with React, Next.js, and modern tooling.",
  url: "https://ducngo.dev",
  repoUrl: "https://github.com/ngohuynhducdev/my-portfolio",
  ogImageAlt: "Duc Ngo — Web Developer portfolio",
  locale: "en_US",
} as const;

// ─── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Personal Information ────────────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Duc Ngo",
  title: "Web Developer",
  tagline: "who loves building intuitive, clean and modern web experiences.",
  bio: "I craft beautiful, functional web experiences that solve real problems. Specialized in modern web technologies and creating seamless user interfaces.",
  email: "ngohuynhducdev@gmail.com",
  phone: "+00 000 000 0000",
  location: "[City, Country]",
  cvUrl: "/cv.pdf",
  socials: {
    github: "https://github.com/ngohuynhducdev",
    linkedin: "https://linkedin.com",
  },
} as const;

// ─── Tech Stack (Hero ticker) ─────────────────────────────────────────────────
export const TECH_STACK = [
  { label: "HTML", emoji: "🌐" },
  { label: "CSS", emoji: "🎨" },
  { label: "JavaScript", emoji: "⚡" },
  { label: "React", emoji: "⚛️" },
  { label: "Node.js", emoji: "🟢" },
  { label: "Next.js", emoji: "▲" },
] as const;

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
    { name: "TypeScript", level: "frequent" },
    { name: "JavaScript", level: "frequent" },
    { name: "HTML5", level: "occasional" },
    { name: "CSS3 / Sass", level: "occasional" },
  ],
  technologies: [
    { name: "React", level: "frequent" },
    { name: "Next.js", level: "frequent" },
    { name: "Tailwind CSS", level: "frequent" },
    { name: "Webpack", level: "occasional" },
    { name: "Jest", level: "occasional" },
    { name: "Docker", level: "occasional" },
    { name: "Firebase", level: "occasional" },
    { name: "AWS", level: "occasional" },
  ],
  tools: [
    { name: "Git / GitHub", level: "frequent" },
    { name: "Figma", level: "frequent" },
  ],
} as const;

// ─── Experience ───────────────────────────────────────────────────────────────
// PLACEHOLDER DATA — replace every entry below with real work history before
// sharing this portfolio; these are intentionally obvious placeholders, not
// real employers.
export const EXPERIENCE = [
  {
    role: "[Your Job Title]",
    company: "[Company Name]",
    location: "[City, Country]",
    period: "[YYYY — Present]",
    current: true,
    bullets: [
      "[Describe a key responsibility or achievement.]",
      "[Describe another responsibility or achievement.]",
    ],
    highlights: ["Tech", "Stack", "Here"],
  },
  {
    role: "[Your Job Title]",
    company: "[Company Name]",
    location: "[City, Country]",
    period: "[YYYY — YYYY]",
    current: false,
    bullets: [
      "[Describe a key responsibility or achievement.]",
      "[Describe another responsibility or achievement.]",
    ],
    highlights: ["Tech", "Stack", "Here"],
  },
  {
    role: "[Your Job Title]",
    company: "[Company Name]",
    location: "[City, Country]",
    period: "[YYYY — YYYY]",
    current: false,
    bullets: [
      "[Describe a key responsibility or achievement.]",
      "[Describe another responsibility or achievement.]",
    ],
    highlights: ["Tech", "Stack", "Here"],
  },
] as const;

// ─── Projects ─────────────────────────────────────────────────────────────────
// PLACEHOLDER DATA — swap in real projects (real screenshots, real
// case-study/repo links) before sharing this portfolio. Unsplash stock
// photos + "#" links are intentional placeholders, not real work.
export const PROJECTS = [
  {
    title: "[Project Name]",
    description: "[One or two sentences describing this project.]",
    tags: ["Tech", "Stack", "Here"],
    image:
      "https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800&q=80",
    caseStudyUrl: "#",
    githubUrl: "#",
  },
  {
    title: "[Project Name]",
    description: "[One or two sentences describing this project.]",
    tags: ["Tech", "Stack", "Here"],
    image:
      "https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?w=800&q=80",
    caseStudyUrl: "#",
    githubUrl: "#",
  },
] as const;

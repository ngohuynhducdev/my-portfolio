# Portfolio Project

## Tech Stack

- Next.js 16 (App Router)
- TypeScript strict mode
- Tailwind CSS v4 (CSS-first config in app/globals.css, no tailwind.config)
- shadcn/ui + Base UI primitives
- Framer Motion
- Lucide React

## Design Reference

- Style: Clean minimalist — light + dark mode
- Light mode (default): background #ffffff, surface #f8fafc, border #e2e8f0, text #0f172a / muted #475569
- Dark mode: background #0f172a (slate-900), surface #1e293b, border #334155, text #f8fafc / muted #94a3b8
- Accent: violet (violet-600 light / violet-400 dark) — use the `primary` token, never hardcode hex
- Gradient partner: blue — use Tailwind classes (`to-blue-600 dark:to-blue-400`), never hex
- Theming: next-themes class strategy (`.dark`), light default, toggle in Navbar; all colors via tokens in app/globals.css so both modes work
- Font: Inter

## Data Source

All content/data is in /lib/constants.ts — always import from there, never hardcode.

## Folder Structure

/app → layout.tsx, page.tsx, globals.css
/components/sections → one file per section
/components/ui → reusable small components
/lib → constants.ts
/public/images → all images

## Code Rules

- Tailwind only, no inline styles
- Framer Motion for all animations
- whileInView + viewport={{ once: true }} for scroll animations
- Import data from /lib/constants.ts
- TypeScript strict, no "any"
- Mobile first

## Sections Order (match page.tsx)

Hero → Experience (Work Experience) → Projects (Portfolio) → Skills (Technical Expertise) → Contact → Footer

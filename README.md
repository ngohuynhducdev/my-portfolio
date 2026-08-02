# Portfolio — Duc Ngo

Personal portfolio: a single-page site, dark by default, with a light theme
behind a toggle.

**Live:** [ngohuynhducdev.vercel.app](https://ngohuynhducdev.vercel.app)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, statically prerendered)
- TypeScript (strict mode)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, no `tailwind.config`)
- [shadcn/ui](https://ui.shadcn.com) + Base UI primitives
- [Framer Motion](https://www.framer.com/motion/) (scroll-triggered animations, reduced-motion aware)
- [Lucide](https://lucide.dev) + [Simple Icons](https://simpleicons.org)
- next-themes (class-based themes, dark by default, choice remembered)

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
yarn build      # production build
yarn lint       # ESLint
yarn typecheck  # tsc --noEmit
yarn test:e2e   # Playwright, against a production build
```

The end-to-end suite runs on Desktop Chrome and Pixel 5. It covers the
navigation (each link scrolls its section under the fixed header, the active
link tracks scrolling both ways), the mobile menu, the 404 route, and the skip
link. `playwright.config.ts` builds and starts the app itself, so no server
needs to be running first.

## Project Structure

```
app/                  # layout, page, 404, globals.css
                      # generated assets: sitemap, robots, OG image, icons
components/sections/  # one per page section (Hero, Experience, Projects, Skills, Education, Contact)
components/ui/        # reusable components (Navbar, Footer, ThemeToggle, ...)
lib/constants.ts      # ALL site content/data lives here — edit this to update the site
public/               # images, CV PDF
tests/                # Playwright end-to-end specs
```

## Accessibility and Performance

Verified rather than assumed — each of these was measured against the running
build:

- every text/background pair in use clears WCAG AA contrast, most clear AAA in
  the light theme
- skip link, named landmarks, and `aria-current` on the active nav link
- interactive targets all clear the 24x24px minimum of WCAG 2.5.8
- no horizontal overflow from 320px up
- images served as AVIF with a WebP fallback through `next/image`

## Editing Content

All text, links, experience entries, projects, and skills are defined in [`lib/constants.ts`](lib/constants.ts). Components never hardcode content — update the constants and the whole site follows.

Design tokens (colors for both themes, radius, fonts) live in [`app/globals.css`](app/globals.css).

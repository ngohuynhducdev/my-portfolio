/** Matches the section entry animation in SectionWrapper. */
const DURATION = 600;

/** easeOutCubic — fast departure, soft landing. */
const ease = (t: number) => 1 - (1 - t) ** 3;

/** Cancels an in-flight scroll so rapid nav clicks don't fight each other. */
let frame = 0;

/**
 * Animate the window to an absolute y offset, clamped to the scrollable range.
 *
 * The animation is driven here instead of handed to the browser, because
 * native smooth scrolling is not something the page can count on: it is off
 * whenever the browser's own "Smooth Scrolling" setting is disabled, and the
 * CSS `scroll-behavior` rule doesn't apply to a scroll that starts during a
 * client-side route change. Both cases used to land as an instant jump. A
 * reduced-motion preference still gets the jump, deliberately.
 */
function scrollToY(target: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const from = window.scrollY;
  const to = Math.max(0, Math.min(target, max));

  cancelAnimationFrame(frame);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || Math.abs(to - from) < 2) {
    window.scrollTo(0, to);
    return;
  }

  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - start) / DURATION, 1);
    window.scrollTo(0, from + (to - from) * ease(t));
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}

/**
 * Scroll a page section into view by its anchor id.
 *
 * Shared by the navbar links and the hero's inline CTA so both land at the
 * same offset — the `scroll-margin-top` on `section[id]` in globals.css is
 * read back here rather than hardcoded, so the fixed header only has to be
 * accounted for in one place.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - margin);
}

/** Scroll back to the top, on the same engine the nav links use. */
export function scrollToTop() {
  scrollToY(0);
}

/**
 * Scroll a page section into view by its anchor id.
 *
 * Shared by the navbar links and the hero's inline CTA so both land at the
 * same offset — the `scroll-margin-top` on `section[id]` in globals.css keeps
 * the target clear of the fixed header.
 *
 * No `behavior` is passed on purpose: the default "auto" defers to the CSS
 * `scroll-behavior` rule, which is already wrapped in a reduced-motion query.
 */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView();
}

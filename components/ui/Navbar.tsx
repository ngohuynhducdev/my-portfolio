"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import Logo from "@/components/ui/Logo";
import { scrollToSection } from "@/lib/scroll";

type SectionId = (typeof NAV_LINKS)[number]["id"];

/** GitHub + LinkedIn, followed by the divider that separates them from the
 *  theme toggle. p-2/-m-2 grows the touch target past 24px without shifting
 *  layout, so the same markup serves the desktop and mobile bars. */
function SocialLinks() {
  return (
    <>
      {(
        [
          ["GitHub", PERSONAL_INFO.socials.github, GithubIcon],
          ["LinkedIn", PERSONAL_INFO.socials.linkedin, LinkedinIcon],
        ] as const
      ).map(([label, href, Icon]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon size={18} />
        </a>
      ))}
      <span aria-hidden="true" className="h-4 w-px bg-border" />
    </>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Annotated so the state widens to every nav id — inferring it from the
  // initial value would pin it to the first one.
  const [activeSection, setActiveSection] = useState<SectionId>(
    NAV_LINKS[0].id,
  );
  const router = useRouter();
  const onHome = usePathname() === "/";
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Two independent inputs to the active-link state, kept in refs so either
  // one changing can re-resolve the answer without stale-closure trouble.
  const inBand = useRef(new Set<string>());
  const atBottom = useRef(false);
  const maxScroll = useRef(0);

  // The observer only reports *changes* in intersection, so it can't be the
  // sole source of truth: once the page bottoms out we pin the last link, and
  // scrolling back up emits no new entry for the section that was already in
  // the band — leaving it permanently unreachable. Resolving from the current
  // state of both signals instead makes the answer order-independent.
  const syncActive = useCallback(() => {
    if (atBottom.current) {
      setActiveSection(NAV_LINKS[NAV_LINKS.length - 1].id);
      return;
    }
    // Last match wins: when the band straddles a boundary both sections are in
    // it, and the lower one is the one being scrolled into.
    for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
      if (inBand.current.has(NAV_LINKS[i].id)) {
        setActiveSection(NAV_LINKS[i].id);
        return;
      }
    }
    // Nothing in the band (a gap between sections): keep the previous link.
  }, []);

  // Close the mobile menu on taps outside the header, and on Escape —
  // returning focus to the toggle so keyboard users keep their place.
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Measured out of the scroll handler: reading scrollHeight forces layout,
  // and doing that on every scroll event is a reflow per frame. The observer
  // catches content growing (fonts, images settling); the resize listener
  // catches viewport-height-only changes, which leave the document box alone.
  useEffect(() => {
    const measure = () => {
      maxScroll.current =
        document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Blurs in the navbar background past 20px, and keeps `atBottom` current —
  // the last section can never reach the observer band, because the page runs
  // out of scroll first.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      atBottom.current = window.scrollY >= maxScroll.current - 2;
      syncActive();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncActive]);

  // Track active section: a section is "active" while it crosses a narrow
  // band around 40% of the viewport height. Unlike a visibility threshold,
  // this also works for sections taller than the viewport (e.g. on mobile).
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) inBand.current.add(target.id);
          else inBand.current.delete(target.id);
        });
        syncActive();
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [syncActive]);

  // The navbar also renders on /404, where none of the sections exist and
  // scrolling would silently do nothing — send those clicks home instead.
  const handleNavClick = (id: SectionId) => {
    setMenuOpen(false);
    if (document.getElementById(id)) scrollToSection(id);
    else router.push(`/#${id}`);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative"
      >
        <a
          href={onHome ? `#${NAV_LINKS[0].id}` : "/"}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(NAV_LINKS[0].id);
          }}
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </a>

        {/* Desktop nav links — centered */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {NAV_LINKS.map(({ id, label }) => {
            // Off the home page there is no current section to mark.
            const isActive = onHome && activeSection === id;
            return (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  // Colour and the underline both mark the current section;
                  // this is the same cue for assistive tech.
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-1 -bottom-0.5 h-px bg-primary rounded-full"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <SocialLinks />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <SocialLinks />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            {/* Capped below the fixed header so every item stays reachable
                on short (landscape) viewports */}
            <ul className="flex flex-col px-6 py-4 gap-1 max-h-[calc(100dvh-4rem)] overflow-y-auto">
              {NAV_LINKS.map(({ id, label }) => {
                // Off the home page there is no current section to mark.
            const isActive = onHome && activeSection === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => handleNavClick(id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      )}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-2">
                <button
                  onClick={() => handleNavClick("contact")}
                  className="w-full rounded-full py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  // Blur in navbar background when user scrolls past 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section: a section is "active" while it crosses a narrow
  // band around 40% of the viewport height. Unlike a visibility threshold,
  // this also works for sections taller than the viewport (e.g. on mobile).
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    // Default "auto" behavior follows the CSS scroll-behavior rule,
    // which already respects prefers-reduced-motion.
    if (el) el.scrollIntoView();
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
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </a>

        {/* Desktop nav links — centered */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
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

        {/* Desktop: social icons | theme toggle */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-border" />
          <ThemeToggle />
        </div>

        {/* Mobile: GitHub + LinkedIn | theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {/* p-2/-m-2 grows the touch target past 24px without shifting layout */}
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-border" />
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
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <li key={href}>
                    <button
                      onClick={() => handleNavClick(href)}
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
                  onClick={() => handleNavClick("#contact")}
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

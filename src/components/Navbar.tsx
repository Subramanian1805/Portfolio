"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const isScrollingClick = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const getActiveSection = useCallback(() => {
    if (typeof window === "undefined") return "#home";

    // 1. If reached the bottom of the page, activate the contact section
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 60
    ) {
      return navLinks[navLinks.length - 1].href;
    }

    // 2. If near top, activate #home
    if (window.scrollY < 120) {
      return "#home";
    }

    // 3. Focal line: accounts for navbar height and visual focal reading point
    const focalLine = window.scrollY + 140;

    for (let i = navLinks.length - 1; i >= 0; i--) {
      const link = navLinks[i];
      const el = document.querySelector(link.href) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (focalLine >= top) {
          return link.href;
        }
      }
    }

    return "#home";
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);

      if (!isScrollingClick.current) {
        const currentActive = getActiveSection();
        setActive(currentActive);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [getActiveSection]);

  function handleClick(href: string) {
    setOpen(false);
    isScrollingClick.current = true;
    setActive(href);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollingClick.current = false;
      setActive(getActiveSection());
    }, 850); // Matches smooth scroll transition time
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 0 24px rgba(59,130,246,0.35)"
            : "0 0 0px rgba(59,130,246,0)",
        }}
        className="glass relative w-full max-w-6xl rounded-2xl px-5 py-3 flex items-center justify-between"
      >
        <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-white/5 overflow-hidden">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "0% 50%" }}
            className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan"
          />
        </div>

        <button
          onClick={() => handleClick("#home")}
          className="flex items-center gap-2 font-display font-bold text-lg"
        >
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-neon">
            {profile.shortName}
          </span>
          <span className="hidden sm:inline gradient-text">{profile.name}</span>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-medium rounded-full transition-colors ${
                active === link.href
                  ? "text-white"
                  : "text-ink-secondary hover:text-white"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10 neon-border"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </nav>

        <button
          className="lg:hidden p-2 rounded-lg glass"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="glass absolute top-20 left-4 right-4 max-h-[80vh] overflow-y-auto rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                  active === link.href
                    ? "bg-white/10 text-white"
                    : "text-ink-secondary hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

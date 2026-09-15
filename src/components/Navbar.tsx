"use client";

import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Activates when section is in active reading view
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingClick.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

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

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors ${
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
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="glass absolute top-20 left-4 right-4 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
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

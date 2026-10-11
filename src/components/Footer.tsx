"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile, navLinks } from "@/data/portfolio";

export default function Footer() {
  function handleClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6 text-center">
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm text-ink-secondary hover:text-brand-cyan transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center flex-wrap justify-center gap-4 relative z-20">
          {[
            { name: "LinkedIn", key: "linkedin", icon: Linkedin, href: profile.social.linkedin, isExternal: true },
            { name: "GitHub", key: "github", icon: Github, href: profile.social.github, isExternal: true },
            { name: "Email", key: "email", icon: Mail, href: profile.social.email, isExternal: false },
          ].map(({ name, key, icon: Icon, href, isExternal }) => (
            <div key={key} className={`social-icon-wrapper ${key}`}>
              <span className="social-icon-tooltip">{name}</span>
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="social-icon-btn h-9 w-9"
                aria-label={`Visit my ${name}`}
              >
                <Icon size={15} />
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-secondary">
          © {currentYear} {profile.name}. Designed & Built with Next.js, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

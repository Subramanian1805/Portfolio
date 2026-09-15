"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile, navLinks } from "@/data/portfolio";

const footerLinks = navLinks.filter((l) =>
  ["#home", "#about", "#skills", "#projects", "#badges", "#experience", "#certifications", "#education", "#contact"].includes(l.href)
);

export default function Footer() {
  function handleClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6 text-center">
        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm text-ink-secondary hover:text-brand-cyan transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Branded tooltipped social connections wrapper */}
        <div className="flex items-center flex-wrap justify-center gap-4 relative z-20">
          {[
            { name: "LinkedIn", key: "linkedin", icon: Linkedin, href: profile.social.linkedin },
            { name: "GitHub", key: "github", icon: Github, href: profile.social.github },
            { name: "Email", key: "email", icon: Mail, href: profile.social.email },
          ].map(({ name, key, icon: Icon, href }) => (
            <div key={key} className={`social-icon-wrapper ${key}`}>
              <span className="social-icon-tooltip">{name}</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn h-9 w-9"
                aria-label={`Visit my ${name}`}
              >
                <Icon size={15} />
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-secondary">
          © 2026 {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

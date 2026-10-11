"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/portfolio";

function OctocatSvg({ className = "octocat-svg" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function LinkedinSvg({ className = "octocat-svg" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function MailSvg({ className = "octocat-svg" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    let didCopy = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(profile.email);
        didCopy = true;
      } catch {
        // Fallback
      }
    }

    if (!didCopy) {
      const textArea = document.createElement("textarea");
      textArea.value = profile.email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      didCopy = document.execCommand("copy");
      textArea.remove();
    }

    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  const cards = [
    {
      id: "github",
      name: "Subramanian1805",
      title: "OPEN SOURCE / AI DEV",
      avatarSvg: OctocatSvg,
      stats: [
        { label: "REPOSITORIES", value: "PUBLIC" },
        { label: "PROJECTS", value: "ML/NLP" },
      ],
      btnText: "VIEW_ON_GITHUB",
      href: profile.social.github,
      isEmail: false,
    },
    {
      id: "linkedin",
      name: "SUBRAMANIAN M",
      title: "DATA SCIENTIST",
      avatarSvg: LinkedinSvg,
      stats: [
        { label: "NETWORK", value: "LINKEDIN" },
        { label: "AVAILABILITY", value: "OPEN" },
      ],
      btnText: "CONNECT_LINKEDIN",
      href: profile.social.linkedin,
      isEmail: false,
    },
    {
      id: "email",
      name: "EMAIL",
      title: profile.email.toLowerCase(),
      avatarSvg: MailSvg,
      stats: [
        { label: "COMMUNICATION", value: "DIRECT" },
        { label: "STATUS", value: "ACTIVE" },
      ],
      btnText: copied ? "EMAIL_COPIED!" : "SEND_DIRECT_EMAIL",
      href: profile.social.email,
      isEmail: true,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-[#050816]/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Let's Build Something Impactful"
          description="Interested in collaborating on Data Science, Machine Learning, or NLP projects? Reach out through any channel below."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 items-stretch justify-items-center">
          {cards.map((card, i) => {
            const AvatarIcon = card.avatarSvg;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glitch-profile-wrapper h-full w-full max-w-sm"
              >
                <div className="glitch-card profile-card">
                  <div className="card-header-visual" />
                  
                  <div className="profile-avatar">
                    <AvatarIcon className="octocat-svg" />
                  </div>

                  <div className="card-body profile-body">
                    <div className="profile-info">
                      <div className="profile-name" data-text={card.name}>
                        {card.name}
                      </div>
                      <p className="profile-title">{card.title}</p>
                    </div>

                    <div className="profile-stats">
                      {card.stats.map((st) => (
                        <div key={st.label} className="stat-item">
                          <span className="stat-label">{st.label}</span>
                          <span className="stat-value" data-text={st.value}>
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {card.isEmail ? (
                      <a
                        href={card.href}
                        onClick={handleCopyEmail}
                        className="submit-btn"
                        data-text={copied ? "EMAIL_COPIED!" : "SEND_DIRECT_EMAIL"}
                      >
                        <span className="btn-text">
                          {copied ? "EMAIL_COPIED!" : "SEND_DIRECT_EMAIL"}
                        </span>
                      </a>
                    ) : (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="submit-btn"
                        data-text={card.btnText}
                      >
                        <span className="btn-text">{card.btnText}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

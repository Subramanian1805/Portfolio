"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Check, Copy, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const contactCards = [
    {
      title: "Direct Email",
      value: profile.email,
      desc: "Get in touch for roles, speaking, or collaborations.",
      actionText: "Send Email",
      href: profile.social.email,
      icon: Mail,
      color: "text-brand-blue",
      isEmail: true,
    },
    {
      title: "Professional LinkedIn",
      value: "Subramanian M",
      desc: "Connect for professional networking and career updates.",
      actionText: "Visit Profile",
      href: profile.social.linkedin,
      icon: Linkedin,
      color: "text-brand-cyan",
      isEmail: false,
    },
    {
      title: "Open Source GitHub",
      value: "Subramanian1805",
      desc: "Explore my source code, repositories, and AI pipelines.",
      actionText: "View Codebases",
      href: profile.social.github,
      icon: Github,
      color: "text-brand-purple",
      isEmail: false,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-[#050816]/30 relative overflow-hidden">
      {/* Ambient decorative glowing particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Reusable Title Header */}
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Turning Ideas into Intelligent Solutions"
          description="Whether you're looking for a data scientist, have an AI or machine learning project to discuss, or simply want to exchange ideas, I'd love to connect. Let's build something impactful together."
        />

        {/* 3-Card Balanced Connection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-6 flex flex-col justify-between items-start border border-white/5 bg-[#0a0f2d]/30 rounded-2xl hover:border-brand-blue/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 min-h-[220px]"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${card.color}`}>
                      <Icon size={18} />
                    </span>
                    
                    {/* Copy to clipboard utility inside the Email Card */}
                    {card.isEmail && (
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-[10px] font-mono text-ink-secondary hover:text-white px-2.5 py-1 rounded-md bg-white/5 border border-white/5 transition-all"
                        aria-label="Copy email address"
                      >
                        {copied ? (
                          <>
                            <Check size={11} className="text-brand-green" /> COPIED
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> COPY
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <h4 className="font-display font-semibold text-lg text-white mb-1.5">
                    {card.title}
                  </h4>
                  <p className="text-xs text-brand-cyan font-mono mb-2 truncate max-w-full">
                    {card.value}
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <a
                  href={card.href}
                  target={card.isEmail ? undefined : "_blank"}
                  rel={card.isEmail ? undefined : "noopener noreferrer"}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-brand-blue hover:border-transparent transition-all group"
                >
                  {card.actionText}
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

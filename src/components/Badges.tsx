"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink, ShieldCheck } from "lucide-react";
import { badges } from "@/data/portfolio";

function BadgeImage({ image, title, issuer }: { image?: string; title: string; issuer: string }) {
  const isPdf = image && /\.pdf$/i.test(image);
  const hasImage = image;

  if (!hasImage) {
    return (
      <svg viewBox="0 0 320 320" className="w-full h-full text-brand-cyan select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" rx="12" fill="#070a1e" stroke="rgba(56,189,248,0.2)" strokeWidth="1.5"/>
        <rect x="12" y="12" width="296" height="296" rx="8" stroke="rgba(56,189,248,0.08)" strokeWidth="1"/>
        <text x="160" y="160" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="monospace">NO BADGE IMAGE</text>
      </svg>
    );
  }

  if (isPdf) {
    return (
      <embed src={image} type="application/pdf" className="w-full h-full object-cover rounded-lg" />
    );
  }

  return (
    <img src={image} alt={`${issuer} ${title} badge`} className="w-full h-full object-cover rounded-lg" />
  );
}

export default function Badges() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="badges" className="section-padding bg-[#050816]/60 relative z-20">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-10 text-center mx-auto max-w-2xl">
          <span className="eyebrow">PROOF OF KNOWLEDGE</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Badges & Credentials
          </h2>
          <p className="mt-4 text-ink-secondary text-sm md:text-base leading-relaxed">
            Sleek tech credentials verified across cloud architectures, generative AI, and algorithms.
          </p>
        </div>
      </div>

      <div className="w-full relative marquee-container hover-pause py-6">
        <div className="marquee-content-left gap-6 px-3">
          {badges.map((badge, i) => (
            <div key={`b1-${i}`} className="w-[180px] sm:w-[220px] shrink-0">
              <div onClick={() => setActive(i)} className="glass-card overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f2d]/30 cursor-pointer transition-all duration-300 aspect-square select-none hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-brand-cyan/30">
                <div className="relative w-full h-full shrink-0 overflow-hidden p-1.5">
                  <BadgeImage image={badge.image} title={badge.title} issuer={badge.issuer} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="marquee-content-left gap-6 px-3" aria-hidden="true">
          {badges.map((badge, i) => (
            <div key={`b2-${i}`} className="w-[180px] sm:w-[220px] shrink-0">
              <div onClick={() => setActive(i)} className="glass-card overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f2d]/30 cursor-pointer transition-all duration-300 aspect-square select-none hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-brand-cyan/30">
                <div className="relative w-full h-full shrink-0 overflow-hidden p-1.5">
                  <BadgeImage image={badge.image} title={badge.title} issuer={badge.issuer} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 sm:px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md w-full p-1 rounded-3xl border border-brand-blue/30 bg-[#070b1e] shadow-[0_20px_50px_rgba(59,130,246,0.2)] relative overflow-hidden"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-ink-secondary hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close badge details"
              >
                <X size={18} />
              </button>

              <div className="relative p-6 sm:p-8 rounded-[22px] bg-gradient-to-br from-[#0c102a] to-[#040612] overflow-hidden flex flex-col items-center border border-white/5 text-center min-h-[300px]">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />

                <BadgeImage image={badges[active].image} title={badges[active].title} issuer={badges[active].issuer} />

                <div className="mt-6 relative z-10 w-full">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-brand-cyan uppercase">
                    VERIFIED CREDENTIAL
                  </span>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight mt-2 px-4 leading-snug">
                    {badges[active].title}
                  </h3>
                  <p className="text-xs text-ink-secondary font-mono tracking-wide uppercase mt-1">
                    {badges[active].issuer}
                  </p>
                </div>

                <div className="w-full mt-6 space-y-2 text-left bg-white/5 rounded-2xl p-4 border border-white/5 relative z-10 text-xs text-ink-secondary font-mono">
                  <div className="flex justify-between">
                    <span>EARNED DATE:</span>
                    <span className="text-white">{badges[active].date}</span>
                  </div>
                </div>

                <div className="mt-6 w-full relative z-10">
                  <a
                    href={badges[active].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-2.5 text-xs font-mono tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink size={13} /> VERIFY CREDENTIAL
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

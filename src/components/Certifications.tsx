"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/data/portfolio";

function CertificateImage({ imgsrc, title, issuer }: { imgsrc?: string; title: string; issuer: string }) {
  const isPdf = imgsrc && /\.pdf$/i.test(imgsrc);
  const hasImage = Boolean(imgsrc);

  if (!hasImage) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c102a] via-[#070b20] to-[#040612] flex flex-col items-center justify-center p-4 text-center rounded-xl border border-white/10 select-none">
        <Award className="text-brand-cyan mb-2" size={24} />
        <span className="font-mono text-[9px] text-brand-cyan tracking-widest uppercase">VERIFIED CREDENTIAL</span>
        <h4 className="font-display text-xs font-bold text-white mt-1 line-clamp-1">{title}</h4>
        <span className="text-[10px] text-ink-secondary mt-0.5">{issuer}</span>
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0e1438] via-[#080d28] to-[#040612] p-5 rounded-xl border border-white/10 flex flex-col justify-between relative overflow-hidden group-hover:border-brand-cyan/40 transition-all select-none">
        {/* Ambient background glows */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-[9px] font-bold tracking-wider">
              PDF DOCUMENT
            </span>
            <span className="text-[9px] font-mono text-brand-cyan tracking-wider">VERIFIED</span>
          </div>
          <div className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan shadow-inner">
            <FileText size={14} />
          </div>
        </div>

        {/* Certificate Title Details */}
        <div className="relative z-10 my-2">
          <span className="text-[9px] font-mono text-brand-cyan/80 tracking-widest uppercase block">{issuer}</span>
          <h4 className="font-display text-base font-bold text-white tracking-tight leading-snug mt-1 group-hover:text-brand-cyan transition-colors line-clamp-2">
            {title}
          </h4>
        </div>

        {/* Footer Prompt */}
        <div className="flex items-center justify-between relative z-10 pt-2.5 border-t border-white/5 text-[10px] font-mono text-ink-secondary">
          <span className="flex items-center gap-1.5 text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
            Official Credential
          </span>
          <span className="text-brand-cyan group-hover:underline flex items-center gap-1">
            View Certificate <ExternalLink size={10} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#060a1e] rounded-xl overflow-hidden p-2 border border-white/5">
      <img
        src={imgsrc}
        alt={`${issuer} ${title} certificate`}
        loading="lazy"
        className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

function CertificateModal({ cert }: { cert: (typeof certifications)[number] }) {
  const isPdf = cert.imgsrc && /\.pdf$/i.test(cert.imgsrc);

  return (
    <div className="relative p-6 sm:p-10 rounded-[22px] bg-gradient-to-br from-[#0c102a] to-[#040612] overflow-hidden flex flex-col justify-between border border-white/5 min-h-[380px] sm:min-h-[420px]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-cyan uppercase">SECURE DIGITAL CREDENTIAL</span>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight mt-1">{cert.issuer}</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] font-mono font-bold tracking-wider">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          VERIFIED
        </div>
      </div>

      <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0a0f2d]/50 my-4 flex items-center justify-center">
        {isPdf ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0d133b] via-[#070c28] to-[#040612] relative overflow-hidden">
            <div className="h-16 w-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mb-3 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <FileText size={32} />
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold text-white max-w-md">{cert.title}</h4>
            <p className="text-xs text-ink-secondary mt-1.5 max-w-sm">Official verified digital PDF credential issued by {cert.issuer} ({cert.year}).</p>
            <a
              href={cert.imgsrc}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 btn-primary py-2.5 px-6 text-xs font-mono tracking-wider flex items-center gap-2 shadow-neon-cyan"
            >
              <ExternalLink size={14} /> Open Official PDF Document
            </a>
          </div>
        ) : cert.imgsrc ? (
          <img src={cert.imgsrc} alt={`${cert.issuer} ${cert.title} certificate`} className="w-full h-full object-contain p-2" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-secondary text-xs font-mono">NO CERTIFICATE IMAGE</div>
        )}
      </div>

      <div className="my-3 relative z-10">
        <span className="text-[10px] font-mono text-ink-secondary tracking-widest uppercase">THIS IS TO CERTIFY THAT THE WORK COMPLETED FOR</span>
        <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">{cert.title}</h2>
        <p className="text-xs text-ink-secondary leading-relaxed mt-2.5 max-w-lg">Has been successfully verified as completed under academic requirements. This record represents the developer&apos;s verified mastery of specific competencies, syllabus milestones, and coding challenges.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 relative z-10 pt-4 border-t border-white/5">
        <div className="flex flex-col gap-1 text-[11px] font-mono text-ink-secondary">
          <div className="flex justify-between sm:justify-start gap-4">
            <span>ISSUE DATE:</span>
            <span className="text-white font-semibold">{cert.year}</span>
          </div>
        </div>
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-5 text-xs font-mono tracking-wider flex items-center gap-1.5">
          <ExternalLink size={13} />
          VERIFY RECORD
        </a>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="certifications" className="section-padding bg-[#050816]/10 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading eyebrow="VERIFIED LEARNING" title="Certifications" description="Verified course completions and specializations across networking, algorithms, and cloud systems." />
      </div>

      <div className="w-full relative marquee-container hover-pause py-6">
        <div className="marquee-content-left gap-6 px-3">
          {certifications.map((c, i) => (
            <div key={`c1-${i}`} className="w-[280px] sm:w-[380px] shrink-0">
              <div onClick={() => setActive(i)} className="glass-card overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f2d]/30 cursor-pointer transition-all duration-300 aspect-[3/2] select-none hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-brand-blue/30 group">
                <div className="relative w-full h-full shrink-0 overflow-hidden p-2">
                  <CertificateImage imgsrc={c.imgsrc} title={c.title} issuer={c.issuer} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="marquee-content-left gap-6 px-3" aria-hidden="true">
          {certifications.map((c, i) => (
            <div key={`c2-${i}`} className="w-[280px] sm:w-[380px] shrink-0">
              <div onClick={() => setActive(i)} className="glass-card overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f2d]/30 cursor-pointer transition-all duration-300 aspect-[3/2] select-none hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-brand-blue/30 group">
                <div className="relative w-full h-full shrink-0 overflow-hidden p-2">
                  <CertificateImage imgsrc={c.imgsrc} title={c.title} issuer={c.issuer} />
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
              className="glass-card max-w-2xl w-full p-1 rounded-3xl border border-brand-blue/30 bg-[#070b1e] shadow-[0_20px_50px_rgba(59,130,246,0.2)] relative overflow-hidden"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-ink-secondary hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>

              {active !== null && <CertificateModal cert={certifications[active]} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

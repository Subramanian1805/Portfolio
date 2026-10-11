"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/data/portfolio";

function CertificateModal({ cert }: { cert: (typeof certifications)[number] }) {
  const isPdf = cert.imgsrc && /\.pdf$/i.test(cert.imgsrc);

  return (
    <div className="relative p-6 sm:p-10 rounded-[22px] bg-gradient-to-br from-[#0c102a] to-[#040612] overflow-hidden flex flex-col justify-between border border-white/10 min-h-[380px] sm:min-h-[420px]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-cyan uppercase">SECURE DIGITAL CREDENTIAL</span>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight mt-1">{cert.issuer}</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-wider">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          VERIFIED
        </div>
      </div>

      <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#060919] my-4 flex items-center justify-center">
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
          <Image src={cert.imgsrc} alt={`${cert.issuer} ${cert.title} certificate`} width={600} height={400} className="w-full h-full object-contain p-2" unoptimized />
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

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 0.65,
    rotateY: direction > 0 ? 80 : -80,
    filter: "blur(12px) brightness(1.4)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.65,
    rotateY: direction > 0 ? -80 : 80,
    filter: "blur(12px) brightness(0.6)",
    transition: {
      duration: 0.45,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
};

export default function Certifications() {
  const [active, setActive] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const ITEMS_PER_SET = 10;
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_SET);
  const currentCertificates = certifications.slice(
    currentPage * ITEMS_PER_SET,
    (currentPage + 1) * ITEMS_PER_SET
  );

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  return (
    <section id="certifications" className="section-padding bg-[#050816]/10 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="VERIFIED LEARNING"
          title="Certifications 3D Gallery"
          description="Hover over the 3D rotating cylinder to pause rotation. Click any card to inspect full certificate credentials."
        />
      </div>

      {/* Main 3D Rotating Gallery Stage with Side Arrow Buttons */}
      <div className="relative max-w-7xl mx-auto -mt-6 sm:-mt-8 mb-2 px-2 sm:px-6">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#070c28]/85 border border-brand-cyan/40 text-brand-cyan hover:text-white hover:bg-brand-cyan hover:border-brand-cyan hover:scale-110 shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center group backdrop-blur-lg"
          aria-label="Previous certificates set"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#070c28]/85 border border-brand-cyan/40 text-brand-cyan hover:text-white hover:bg-brand-cyan hover:border-brand-cyan hover:scale-110 shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center group backdrop-blur-lg"
          aria-label="Next certificates set"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3D Rotating Cylinder Carousel Stage with AnimatePresence */}
        <div className="cert-3d-container relative z-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`cert-set-${currentPage}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="wrapper w-full h-full"
            >
              <div className="inner" style={{ "--quantity": currentCertificates.length } as React.CSSProperties}>
                {currentCertificates.map((c, i) => {
                  const globalIndex = currentPage * ITEMS_PER_SET + i;
                  const isPdf = c.imgsrc && /\.pdf$/i.test(c.imgsrc);

                  return (
                    <div
                      key={`cert-card-${currentPage}-${i}`}
                      className="card group"
                      style={{
                        "--index": i,
                      } as React.CSSProperties}
                      onClick={() => setActive(globalIndex)}
                    >
                      <div className="img flex flex-col justify-between p-3 select-none relative overflow-hidden bg-[#050819]">
                        {/* Certificate Image - Clean, 100% Opacity, Un-tinted */}
                        <div className="absolute inset-0 z-0">
                          {c.imgsrc && !isPdf ? (
                            <Image
                              src={c.imgsrc}
                              alt={`${c.issuer} ${c.title}`}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c102a] via-[#070b22] to-[#040614] p-3 text-center">
                              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mb-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                                <FileText size={20} />
                              </div>
                              <span className="text-[10px] text-white/90 font-semibold line-clamp-2 mt-1 px-1">{c.title}</span>
                            </div>
                          )}
                        </div>

                        {/* Top Header Badge */}
                        <div className="relative z-10 flex items-center justify-between pointer-events-none">
                          <span className="px-2 py-0.5 rounded-md bg-black/80 border border-white/20 text-white font-mono text-[9px] font-bold tracking-wider backdrop-blur-md shadow-md">
                            {c.issuer}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-black/75 border border-white/10 text-brand-cyan font-mono text-[9px] font-semibold backdrop-blur-md">
                            {c.year}
                          </span>
                        </div>

                        {/* Bottom Title & Click Prompt Bar */}
                        <div className="relative z-10 mt-auto bg-black/85 backdrop-blur-md p-2 rounded-xl border border-white/15 shadow-lg">
                          <h4 className="text-[11px] sm:text-xs font-bold text-white line-clamp-1 group-hover:text-brand-cyan transition-colors">
                            {c.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-white/70">
                            <span className="text-brand-cyan font-semibold">Inspect Record</span>
                            <ExternalLink size={10} className="text-brand-cyan group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Set Counter & Glowing Dots Indicator */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-2 relative z-20">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => {
                  setDirection(idx > currentPage ? 1 : -1);
                  setCurrentPage(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === idx
                    ? "w-8 bg-brand-cyan shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to certificate set ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-ink-secondary tracking-widest uppercase">
            SET <span className="text-brand-cyan font-bold">{String(currentPage + 1).padStart(2, "0")}</span> / {String(totalPages).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Modal View for Selected Certificate */}
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
              className="glass-card max-w-2xl w-full p-1 rounded-3xl border border-brand-cyan/30 bg-[#070b1e] shadow-[0_20px_50px_rgba(56,189,248,0.25)] relative overflow-hidden"
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

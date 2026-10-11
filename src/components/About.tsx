"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, FolderGit2, ShieldCheck, ArrowRight, Mail, Github, Linkedin, GraduationCap, Award, Code2 } from "lucide-react";
import { profile } from "@/data/portfolio";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 25);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

const HexagonLogoSvg = ({ className = "w-6 h-6 text-[#38bdf8]" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const ChevronLogoSvg = ({ className = "w-5 h-5 text-[#38bdf8]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5l6 7-6 7" />
    <path d="M12 5l6 7-6 7" />
  </svg>
);

const BarcodeSvg = () => (
  <svg viewBox="0 0 180 34" className="w-36 h-7 text-[#f8fafc]">
    <rect x="0" y="0" width="3" height="30" fill="currentColor" />
    <rect x="5" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="9" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="16" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="20" y="0" width="3" height="30" fill="currentColor" />
    <rect x="25" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="29" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="36" y="0" width="3" height="30" fill="currentColor" />
    <rect x="42" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="46" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="53" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="57" y="0" width="3" height="30" fill="currentColor" />
    <rect x="63" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="70" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="74" y="0" width="3" height="30" fill="currentColor" />
    <rect x="80" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="84" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="91" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="95" y="0" width="3" height="30" fill="currentColor" />
    <rect x="101" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="108" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="112" y="0" width="3" height="30" fill="currentColor" />
    <rect x="118" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="122" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="129" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="133" y="0" width="3" height="30" fill="currentColor" />
    <rect x="139" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="146" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="150" y="0" width="3" height="30" fill="currentColor" />
    <rect x="156" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="160" y="0" width="4.5" height="30" fill="currentColor" />
    <rect x="167" y="0" width="1.5" height="30" fill="currentColor" />
    <rect x="171" y="0" width="3" height="30" fill="currentColor" />
    <rect x="176" y="0" width="4" height="30" fill="currentColor" />
  </svg>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const stats = [
    { label: "Internships", value: 2, suffix: "", icon: Briefcase, color: "text-brand-blue" },
    { label: "ML Flagships", value: 3, suffix: "", icon: FolderGit2, color: "text-brand-purple" },
    { label: "Certifications", value: 6, suffix: "+", icon: ShieldCheck, color: "text-brand-green" },
  ];

  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-20 pt-24 pb-20 md:pt-28 md:pb-24 bg-[#050816]/10 overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="eyebrow">ABOUT ME</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
              Transforming Data into <br />
              <span className="gradient-text">Actionable Intelligence</span>
            </h2>
            <p className="mt-6 text-ink-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              Hello! I&apos;m a B.E. Computer Science Engineering student at Dhaanish Ahmed College of Engineering (graduating 2027) with an 8.4 CGPA. I specialize in Data Science, Machine Learning, and NLP Engineering.
            </p>
            <p className="mt-4 text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl">
              My engineering focus centers on clean dataset preprocessing, model evaluation (Scikit-learn, XGBoost, PyTorch, TensorFlow), and building production REST APIs with FastAPI and Flask. I strive to create scalable, reproducible ML pipelines that drive real-world business value.
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass p-4 rounded-2xl border border-white/5 shadow-md flex flex-col items-start gap-2.5 transition-all duration-300 hover:border-white/10 hover:shadow-neon"
                  >
                    <span className={`h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                      <Icon size={16} />
                    </span>
                    <div className="flex flex-col">
                      <Counter value={stat.value} suffix={stat.suffix} />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-ink-secondary mt-1">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary inline-flex items-center gap-2 group text-sm border-white/10 hover:border-brand-purple/40"
              >
                Let&apos;s Build Together
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Lanyard Strap & Clip Assembly */}
            <div className="id-lanyard-assembly pointer-events-none select-none">
              <div className="id-lanyard-strap" />
              <div className="id-lanyard-clip">
                <div className="id-lanyard-metal-top" />
                <div className="id-lanyard-rivet-group">
                  <span className="id-lanyard-rivet" />
                  <span className="id-lanyard-rivet" />
                </div>
                <div className="id-lanyard-clasp-loop" />
              </div>
            </div>

            <div
              className="ticket-container cursor-pointer select-none"
              tabIndex={0}
              onClick={() => setIsFlipped(!isFlipped)}
              aria-label="Interactive Employee ID Card - Click to flip"
            >
              <div className="interaction-grid">
                {Array.from({ length: 10 }).map((_, r) =>
                  Array.from({ length: 10 }).map((_, c) => (
                    <div key={`cell-${r + 1}-${c + 1}`} className={`grid-cell cell-${r + 1}-${c + 1}`} />
                  ))
                )}
              </div>

              <div className={`ticket-flipper ${isFlipped ? "flipped" : ""}`}>
                {/* ID CARD FRONT FACE: STATE 1 (COVER) + STATE 2 (CORPORATE ID) */}
                <div className="ticket-card id-card-face id-card-front">
                  <div className="id-card-punch-hole" />

                  {/* -----------------------------------------------------------------
                      STATE 1: BEFORE HOVER - PORTRAIT ACCESS PASS COVER
                      Prominently showcases Subramanian's portrait photo before hovering
                      ----------------------------------------------------------------- */}
                  <div className="id-card-cover-layer">
                    <div className="id-cover-bg-image-container">
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        fill
                        sizes="320px"
                        priority
                        className="object-cover object-top id-cover-photo"
                      />
                      <div className="id-cover-gradient-scrim" />
                    </div>

                    <div className="id-cover-header">
                      <div className="flex items-center gap-2">
                        <HexagonLogoSvg className="w-4 h-4 text-[#38bdf8]" />
                        <span className="text-[10px] font-mono tracking-widest text-slate-200 uppercase font-bold">
                          IDENTITY PASS
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-wider">ACTIVE</span>
                      </div>
                    </div>

                    <div className="id-cover-footer">
                      <div className="flex flex-col">
                        <span className="text-[9.5px] font-mono tracking-widest text-[#38bdf8] uppercase font-bold">
                          CANDIDATE ID • 2027
                        </span>
                        <h3 className="font-display font-extrabold text-xl text-white tracking-wide mt-0.5">
                          SUBRAMANIAN <span className="text-[#38bdf8]">M</span>
                        </h3>
                        <p className="font-mono text-[10px] text-slate-300 tracking-wider uppercase mt-1">
                          DATA SCIENTIST & ML ENGINEER
                        </p>
                      </div>

                      <div className="mt-3 py-1.5 px-3 rounded-lg bg-black/55 border border-white/10 backdrop-blur-md flex items-center justify-between">
                        <span className="text-[9px] font-mono text-cyan-300 font-semibold tracking-wide flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          HOVER TO SCAN ID
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 font-medium">CLICK TO FLIP ↻</span>
                      </div>
                    </div>
                  </div>

                  {/* -----------------------------------------------------------------
                      STATE 2: WHILE HOVER - CORPORATE ID CARD
                      Recreated matching reference image media_1791738491486_0f119002.jpg
                      with diagonal royal blue/cyan geometric stripes & clean details
                      ----------------------------------------------------------------- */}
                  <div className="id-card-revealed-content">
                    {/* Top Carbon Striped Header */}
                    <div className="id-header-corporate">
                      <div className="flex items-center gap-2.5">
                        <div className="id-corp-logo-mark">
                          <ChevronLogoSvg className="w-6 h-5 text-[#38bdf8]" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-display font-black text-xs text-white tracking-widest leading-tight">
                            SUBRAMANIAN <span className="text-[#38bdf8]">M</span>
                          </span>
                          <span className="font-mono text-[7.5px] text-slate-400 tracking-wider uppercase mt-0.5">
                            AI & DATA SCIENCE ENGINEER
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Diagonal Geometric Stripes Section */}
                    <div className="id-diagonal-stripes-banner">
                      <svg className="id-diagonal-stripes-svg" viewBox="0 0 320 115" preserveAspectRatio="none">
                        <polygon points="0,0 320,0 320,68 0,26" fill="#080e2b" />
                        <polygon points="0,26 320,68 320,92 0,50" fill="#2563eb" />
                        <polygon points="0,50 320,92 320,102 0,60" fill="#38bdf8" />
                        <polygon points="0,60 320,102 320,106 0,64" fill="#93c5fd" opacity="0.9" />
                      </svg>

                      {/* Circular Avatar intersecting diagonal stripes */}
                      <div className="id-avatar-circle-wrapper">
                        <div className="id-avatar-circle-frame">
                          <Image
                            src={profile.avatar}
                            alt={profile.name}
                            width={94}
                            height={94}
                            priority
                            className="id-avatar-circle-img select-none"
                            style={{ objectPosition: "50% 10%" }}
                          />
                          <div className="id-avatar-status-beacon" title="Available for Internships & MNC Roles" />
                        </div>
                      </div>
                    </div>

                    {/* Employee ID Details Section */}
                    <div className="id-card-details-section">
                      <div className="text-center mt-0.5">
                        <h3 className="id-corp-name">
                          SUBRAMANIAN <span>M</span>
                        </h3>
                        <p className="id-corp-role">DATA SCIENTIST & ML ENGINEER</p>
                      </div>

                      <div className="id-corp-table">
                        <div className="id-corp-row">
                          <span className="id-corp-key">ID</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val">2023-CSE-84</span>
                        </div>
                        <div className="id-corp-row">
                          <span className="id-corp-key">Degree</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val">B.E. Computer Science</span>
                        </div>
                        <div className="id-corp-row">
                          <span className="id-corp-key">College</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val">Dhaanish Ahmed College of Engineering</span>
                        </div>
                        <div className="id-corp-row">
                          <span className="id-corp-key">CGPA</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val">8.4 / 10.0</span>
                        </div>
                        <div className="id-corp-row">
                          <span className="id-corp-key">Phone</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val">+91 63795 53156</span>
                        </div>
                        <div className="id-corp-row">
                          <span className="id-corp-key">E-mail</span>
                          <span className="id-corp-sep">:</span>
                          <span className="id-corp-val text-[9.5px]">marisubramanian01@gmail.com</span>
                        </div>
                      </div>

                      <div className="id-corp-bottom-bar">
                        <div className="id-barcode-container">
                          <BarcodeSvg />
                          <span className="id-barcode-label">SUBRAMANIAN M • CSE 2027 • VERIFIED ID</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* -----------------------------------------------------------------
                    STATE 3: AFTER CLICKING - ID CARD BACK FACE
                    Exact user-requested layout, text, holographic emblem & signature
                    ----------------------------------------------------------------- */}
                <div className="ticket-card ticket-card-back id-card-face id-card-back">
                  <div className="id-card-punch-hole" />

                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 w-full relative z-10 pt-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <HexagonLogoSvg className="w-5 h-5 text-[#38bdf8]" />
                      <span className="font-display font-extrabold text-xs text-white tracking-wider">
                        PORTFOLIO <span className="text-[#38bdf8]">CARD</span>
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#38bdf8] font-bold tracking-wider uppercase">
                      VERIFIED CANDIDATE
                    </span>
                  </div>

                  {/* Centered Holographic SM Emblem - Lowered & aligned at the center between top section and core technical focus */}
                  <div className="flex-1 flex items-center justify-center my-auto py-1">
                    <div className="holographic-emblem">
                      <div className="emblem-logo">SM</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left w-full relative z-10 shrink-0">
                    <span className="font-display font-bold text-xs text-[#38bdf8] tracking-wide">
                      Core Technical Focus :
                    </span>

                    <ul className="flex flex-col gap-1.5 font-sans text-[10.5px] text-slate-300 leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#38bdf8] shrink-0 mt-1 shadow-[0_0_6px_#38bdf8]" />
                        <span>Machine Learning, Scikit-learn, XGBoost & Deep Learning.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#38bdf8] shrink-0 mt-1 shadow-[0_0_6px_#38bdf8]" />
                        <span>NLP text processing, dataset feature engineering & REST API deployment.</span>
                      </li>
                    </ul>

                    <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-slate-800 font-mono text-[10px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-bold text-[#38bdf8]">Status :</span>
                        <span>Final Year Engineering Student</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-bold text-[#38bdf8]">Availability :</span>
                        <span>Open for Internships & Job Roles</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-2 pt-1.5 text-center border-t border-slate-800">
                      <span className="id-card-back-signature font-bold">Subramanian M</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                        Signature Verified
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center gap-3 pt-2 border-t border-slate-700/60 w-full relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn h-7 w-7 text-slate-300 hover:text-white"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn h-7 w-7 text-slate-300 hover:text-white"
                      aria-label="GitHub Profile"
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={profile.social.email}
                      className="social-icon-btn h-7 w-7 text-slate-300 hover:text-white"
                      aria-label="Send Email"
                    >
                      <Mail size={14} />
                    </a>
                  </div>

                  <svg
                    className="absolute bottom-0 left-0 w-full h-10 pointer-events-none z-0 opacity-80"
                    viewBox="0 0 320 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 16C60 -5 140 30 220 10C270 0 300 20 320 25V40H0V16Z" fill="url(#wave_gradient_back_1)" />
                    <path d="M0 25C80 10 150 35 230 15C280 5 305 25 320 30V40H0V25Z" fill="url(#wave_gradient_back_2)" />
                    <defs>
                      <linearGradient id="wave_gradient_back_1" x1="0" y1="0" x2="320" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#8b5cf6" />
                      </linearGradient>
                      <linearGradient id="wave_gradient_back_2" x1="0" y1="0" x2="320" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className="dev-pass-ambient-glow" />
          </div>

        </div>
      </div>
    </section>
  );
}

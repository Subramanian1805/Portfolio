"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, FolderGit2, Users2, ShieldCheck, ArrowRight, Mail, MapPin, Github, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiNodedotjs } from "react-icons/si";
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
        setCount(end); // Ensure exact final value
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

// Vector-crisp drawing of a high-tech microprocessor chip
const MicrochipSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="25" width="50" height="50" rx="6" fill="#070a1e" stroke="currentColor" strokeWidth="4.5" />
    <rect x="35" y="35" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.75" />
    <circle cx="50" cy="50" r="5.5" fill="currentColor" />
    
    {/* Connector pins */}
    <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="10" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    <line x1="75" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="75" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="75" y1="65" x2="90" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    <line x1="35" y1="10" x2="35" y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="10" x2="50" y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="65" y1="10" x2="65" y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    <line x1="35" y1="75" x2="35" y2="90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="75" x2="50" y2="90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <line x1="65" y1="75" x2="65" y2="90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// High-fidelity dynamic vector QR code drawing
const QrCodeSvg = ({ size = 60, className = "" }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
    {/* Outer corner alignment blocks */}
    <rect x="0" y="0" width="24" height="24" stroke="currentColor" strokeWidth="6.5" fill="none" rx="2.5" />
    <rect x="6" y="6" width="12" height="12" fill="currentColor" rx="1" />
    
    <rect x="76" y="0" width="24" height="24" stroke="currentColor" strokeWidth="6.5" fill="none" rx="2.5" />
    <rect x="82" y="6" width="12" height="12" fill="currentColor" rx="1" />
    
    <rect x="0" y="76" width="24" height="24" stroke="currentColor" strokeWidth="6.5" fill="none" rx="2.5" />
    <rect x="6" y="82" width="12" height="12" fill="currentColor" rx="1" />
    
    {/* Complex matrix of modules */}
    <rect x="36" y="0" width="10" height="10" fill="currentColor" rx="1" />
    <rect x="56" y="4" width="10" height="10" fill="currentColor" rx="1" />
    <rect x="42" y="20" width="14" height="8" fill="currentColor" rx="1" />
    
    <rect x="0" y="36" width="10" height="10" fill="currentColor" rx="1" />
    <rect x="14" y="44" width="12" height="12" fill="currentColor" rx="1" />
    <rect x="0" y="62" width="8" height="8" fill="currentColor" rx="1" />
    
    <rect x="76" y="36" width="12" height="8" fill="currentColor" rx="1" />
    <rect x="84" y="48" width="16" height="16" fill="currentColor" rx="1" />
    <rect x="76" y="68" width="10" height="8" fill="currentColor" rx="1" />
    
    <rect x="36" y="76" width="14" height="12" fill="currentColor" rx="1" />
    <rect x="56" y="84" width="12" height="16" fill="currentColor" rx="1" />
    <rect x="44" y="62" width="10" height="10" fill="currentColor" rx="1" />
    
    {/* Center dot grid */}
    <rect x="42" y="42" width="16" height="16" fill="currentColor" rx="2" opacity="0.9" />
  </svg>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  
  const stats = [
    { label: "Internship Experience", value: 2, suffix: "+", icon: Briefcase, color: "text-brand-blue" },
    { label: "Projects Completed", value: 5, suffix: "+", icon: FolderGit2, color: "text-brand-purple" },
    { label: "Certifications", value: 15, suffix: "+", icon: ShieldCheck, color: "text-brand-green" },
  ];

  const techStack = [
    { icon: SiReact, name: "React", color: "text-[#61DAFB]" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: SiTypescript, name: "TypeScript", color: "text-[#3178C6]" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-[#38BDF8]" },
    { icon: SiPython, name: "Python", color: "text-[#3776AB]" },
    { icon: SiNodedotjs, name: "Node.js", color: "text-[#339933]" },
  ];

  // Cursor tracker calculation for smooth 3D pass tilts
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Elegant soft tilt - restricted to 12 degrees max
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);

    // Coordinate mapping for sweep reflection
    const gX = ((e.clientX - rect.left) / width) * 100;
    const gY = ((e.clientY - rect.top) / height) * 100;
    setGlowX(gX);
    setGlowY(gY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  return (
    <section id="about" className="section-padding bg-[#050816]/10 relative overflow-hidden" ref={containerRef}>
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Context, Bio & Counters */}
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
Hello! I'm a Computer Science graduate and aspiring Data Scientist from India who enjoys uncovering patterns, building predictive models, and transforming data into meaningful insights. My work focuses on machine learning, deep learning, data analytics, and visualization, with the goal of creating solutions that are both intelligent and practical.
            </p>
            <p className="mt-4 text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl">
Whether exploring large datasets, developing AI models, or building interactive dashboards, I'm driven by curiosity, continuous learning, and a passion for solving real-world problems through data. I strive to create scalable, efficient, and impactful solutions that help organizations make smarter decisions.            </p>

            {/* Premium SaaS style stats counter row */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
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

            {/* Let's Connect CTA Button */}
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

          {/* Right Column - Premium 3D Developer Pass Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full max-w-[320px] h-[430px] sm:h-[450px] cursor-pointer group animate-float-gentle"
              style={{ perspective: "1500px" }}
            >
              <motion.div
                animate={{
                  rotateX: rotateX,
                  rotateY: isFlipped ? 180 - rotateY : rotateY, // mathematically compensates tilt direction on flip
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative animate-float-gentle"
              >
                {/* 3D FRONT SIDE */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 w-full h-full dev-pass-glow-outline"
                >
                  <div className="dev-pass-cover-front">
                    {/* Skewed light sweep reflection */}
                    <div className="reflex" />
                    {/* Noise texture overlay */}
                    <div className="noise-overlay" />
                    {/* Dynamic reflection point overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
                      style={{
                        background: `radial-gradient(circle 120px at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 100%)`,
                      }}
                    />

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10 w-full">
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[8px] tracking-[0.3em] text-brand-cyan/60 uppercase">IDENTITY PASS</span>
                        <h4 className="font-display text-sm font-bold text-white tracking-widest mt-0.5">DEV // ACCESS</h4>
                      </div>
                      <MicrochipSvg className="dev-pass-chip-svg" />
                    </div>

                    {/* Body */}
                    <div className="flex flex-col items-center text-center mt-6 w-full relative z-10 flex-1 justify-center gap-4">
                      {/* Avatar circular frame with glowing neon boundary */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-cyan/40 shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="h-full w-full object-cover select-none"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
                          {profile.name}
                        </h3>
                        <span className="font-mono text-[10px] tracking-[0.18em] text-brand-cyan uppercase mt-1">
                          Data Scientist & AI Enthusiast
                        </span>
                      </div>

                      {/* Credentials Grid */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 text-left font-mono text-[10px] text-ink-secondary border-t border-b border-white/5 py-3 w-full">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-brand-purple" />
                          <span>India</span>
                        </div>
                        
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10 w-full mt-auto">
                      <div className="flex flex-col text-left font-mono text-[9px] text-brand-cyan/50 tracking-wider">
                        <span>DEV IDENTITY</span>
                        <span className="text-white font-semibold text-[10px] mt-0.5 select-all">#DEV-8490-SM</span>
                      </div>
                      
                      {/* Mini QR SVG */}
                      <div className="p-1 bg-white/5 border border-white/10 rounded-lg">
                        <QrCodeSvg size={28} className="text-white/60" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3D BACK SIDE */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 w-full h-full dev-pass-glow-outline"
                >
                  <div className="dev-pass-cover-back">
                    {/* Skewed light sweep reflection */}
                    <div className="reflex" />
                    {/* Noise texture overlay */}
                    <div className="noise-overlay" />
                    {/* Dynamic reflection point overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
                      style={{
                        background: `radial-gradient(circle 120px at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 100%)`,
                      }}
                    />

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10 w-full">
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[8px] tracking-[0.3em] text-brand-purple/60 uppercase">PASS STATUS</span>
                        <h4 className="font-display text-xs font-bold text-brand-green tracking-widest mt-0.5 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" /> ACTIVE ACCESS
                        </h4>
                      </div>
                      <MicrochipSvg className="dev-pass-chip-svg" />
                    </div>

                    {/* Body */}
                    <div className="flex flex-col items-center justify-between mt-5 w-full relative z-10 flex-1">
                      {/* Tech badges grid */}
                      <div className="w-full">
                        <span className="font-mono text-[9px] text-brand-cyan tracking-wider uppercase block text-left mb-2.5">
                          CORE TECH STACK
                        </span>
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {techStack.map((tech) => {
                            const Icon = tech.icon;
                            return (
                              <div
                                key={tech.name}
                                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-mono text-ink-secondary hover:text-white hover:border-white/10 hover:bg-white/10 transition-all duration-300"
                              >
                                <Icon size={16} className={`${tech.color} mb-1`} />
                                <span>{tech.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Large Scanning QR code overlay */}
                      <div className="flex items-center justify-center relative w-28 h-28 p-2 bg-[#050816]/70 border border-white/10 rounded-xl overflow-hidden shadow-inner mt-4">
                        <QrCodeSvg size={90} className="text-brand-cyan/80" />
                        <div className="qr-scanner-line" />
                      </div>
                    </div>

                    {/* Footer - Social Connections tooltips */}
                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/10 relative z-20 w-full mt-auto" onClick={(e) => e.stopPropagation()}>
                      {[
                        { name: "LinkedIn", key: "linkedin", icon: Linkedin, href: profile.social.linkedin },
                        { name: "GitHub", key: "github", icon: Github, href: profile.social.github },
                        { name: "Facebook", key: "facebook", icon: Facebook, href: profile.social.facebook },
                        { name: "Instagram", key: "instagram", icon: Instagram, href: profile.social.instagram },
                        { name: "Twitter/X", key: "twitter", icon: Twitter, href: profile.social.twitter },
                        { name: "Email", key: "email", icon: Mail, href: profile.social.email },
                      ].map(({ name, key, icon: Icon, href }) => (
                        <div key={key} className={`social-icon-wrapper ${key}`}>
                          <span className="social-icon-tooltip">{name}</span>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-btn h-8 w-8"
                            aria-label={`Visit my ${name}`}
                          >
                            <Icon size={14} />
                          </a>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
            
            {/* Ambient ground pass shadow glow */}
            <div className="dev-pass-ambient-glow" />
          </div>

        </div>
      </div>
    </section>
  );
}

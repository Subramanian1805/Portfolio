"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Github, Linkedin, BadgeCheck, Download, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";

const decorCircles = [
  { color: "bg-red-500/70", size: "h-4 w-4 sm:h-5 sm:w-5", pos: "top-4 left-1 sm:top-6 sm:left-2", delay: 0 },
  { color: "bg-brand-green/70", size: "h-5 w-5 sm:h-7 sm:w-7", pos: "bottom-6 left-6 sm:bottom-10 sm:left-10", delay: 0.6 },
  { color: "bg-yellow-400/70", size: "h-3 w-3 sm:h-4 sm:w-4", pos: "top-12 right-2 sm:top-16 sm:right-4", delay: 1.1 },
  { color: "bg-brand-purple/70", size: "h-5 w-5 sm:h-6 sm:w-6", pos: "bottom-2 right-8 sm:bottom-4 sm:right-12", delay: 1.6 },
];

export default function Hero() {
  const roles = [
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "Deep Learning Engineer"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fullText = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, 50);
      }
    } else {
      if (currentText === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => fullText.slice(0, prev.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-8 md:px-12 lg:px-20 pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 w-full">
        {/* Right - Profile Box (Mobile first ordering for visual impact) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex h-[270px] w-[270px] sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] items-center justify-center lg:order-last"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue/30 via-brand-purple/20 to-brand-cyan/30 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-brand-cyan/30 animate-spin-slow" />
          <div className="absolute inset-8 sm:inset-10 rounded-full border border-brand-blue/20" />

          {/* Enlarge circular profile element with original full color photo */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[350px] md:w-[350px] rounded-full overflow-hidden border-2 border-brand-cyan/40 shadow-neon-cyan transition-all duration-500 cursor-pointer group"
            style={{
              boxShadow: isHovered
                ? "0 0 35px rgba(56, 189, 248, 0.55), 0 0 70px rgba(139, 92, 246, 0.35)"
                : "0 0 20px rgba(56, 189, 248, 0.2)",
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={profile.avatar}
                alt={`${profile.name} profile photo`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                }}
              />
            </div>
          </motion.div>

          {decorCircles.map((c, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay,
              }}
              className={`absolute rounded-full ${c.color} ${c.size} ${c.pos} blur-[1px] shadow-lg`}
            />
          ))}
        </motion.div>

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <span className="eyebrow">Welcome to my portfolio</span>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3">
            <span className="gradient-text">{profile.name}</span>
            <BadgeCheck className="text-brand-cyan h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 shrink-0" />
          </h1>

          {/* Typewriter text animation */}
          <div className="mt-3 flex items-center justify-center lg:justify-start h-9 sm:h-10 font-mono text-base sm:text-lg md:text-xl text-ink-secondary bg-transparent">
            <span className="mr-2">I&apos;m a</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple font-bold tracking-wide drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              {currentText}
            </span>
            <span className="inline-block w-[2.5px] h-4 sm:h-5 bg-brand-cyan ml-1.5 align-middle animate-pulse" />
          </div>

          <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base text-ink-secondary leading-relaxed">
            I design and build intelligent, data-driven solutions — from collecting and analyzing data to deploying scalable machine learning models.
          </p>

          <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 w-full max-w-xs lg:max-w-none">
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-ink-secondary">
              <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-full glass flex items-center justify-center text-brand-cyan shrink-0">
                <Phone size={15} />
              </span>
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-ink-secondary">
              <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-full glass flex items-center justify-center text-brand-cyan shrink-0">
                <Mail size={15} />
              </span>
              <span className="break-all">{profile.email}</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-ink-secondary">
              <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-full glass flex items-center justify-center text-brand-cyan shrink-0">
                <MapPin size={15} />
              </span>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
            <a href={profile.resumeUrl} className="btn-primary text-xs sm:text-sm py-2.5 px-5 sm:py-3 sm:px-6">
              <Download size={16} /> View Resume
            </a>
            <a href="#contact" className="btn-secondary text-xs sm:text-sm py-2.5 px-5 sm:py-3 sm:px-6">
              Contact Me <ArrowRight size={16} />
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-7 sm:mt-8 flex items-center justify-center lg:justify-start flex-wrap gap-3 sm:gap-4 relative z-20">
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
                  className="social-icon-btn"
                  aria-label={`Visit my ${name}`}
                >
                  <Icon size={17} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

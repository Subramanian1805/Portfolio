"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Github, Linkedin, BadgeCheck, Download, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";

const decorCircles = [
  { color: "bg-red-500/70", size: "h-5 w-5", pos: "top-6 left-2", delay: 0 },
  { color: "bg-brand-green/70", size: "h-7 w-7", pos: "bottom-10 left-10", delay: 0.6 },
  { color: "bg-yellow-400/70", size: "h-4 w-4", pos: "top-16 right-4", delay: 1.1 },
  { color: "bg-brand-purple/70", size: "h-6 w-6", pos: "bottom-4 right-12", delay: 1.6 },
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
        }, 50); // Deleting letter by letter speed
      }
    } else {
      if (currentText === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause briefly after typing completes
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => fullText.slice(0, prev.length + 1));
        }, 100); // Typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-32 pb-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 items-center gap-16 w-full">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="eyebrow">Welcome to my portfolio</span>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight flex items-center flex-wrap gap-3">
            <span className="gradient-text">{profile.name}</span>
            <BadgeCheck className="text-brand-cyan h-8 w-8 lg:h-9 lg:w-9 shrink-0" />
          </h1>

          {/* Typewriter text animation */}
          <div className="mt-4 flex items-center h-10 font-mono text-lg md:text-xl text-ink-secondary bg-transparent">
            <span className="mr-2">I&apos;m a</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple font-bold tracking-wide drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              {currentText}
            </span>
            <span className="inline-block w-[2.5px] h-5 bg-brand-cyan ml-1.5 align-middle animate-pulse" />
          </div>

          <p className="mt-6 max-w-md text-ink-secondary leading-relaxed">
            I design and build intelligent, data-driven solutions — from collecting and analyzing data to deploying scalable machine learning models.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-ink-secondary">
              <span className="h-9 w-9 rounded-full glass flex items-center justify-center text-brand-cyan">
                <Phone size={16} />
              </span>
              {profile.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-secondary">
              <span className="h-9 w-9 rounded-full glass flex items-center justify-center text-brand-cyan">
                <Mail size={16} />
              </span>
              {profile.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-secondary">
              <span className="h-9 w-9 rounded-full glass flex items-center justify-center text-brand-cyan">
                <MapPin size={16} />
              </span>
              {profile.location}
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={profile.resumeUrl} className="btn-primary">
              <Download size={18} /> View Resume
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me <ArrowRight size={18} />
            </a>
          </div>

          {/* Social icons with custom animated tooltips wrapper */}
          <div className="mt-8 flex items-center flex-wrap gap-4 relative z-20">
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
                  <Icon size={18} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Profile Box with original color photo and seamless GIF overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto flex h-[350px] w-[350px] sm:h-[420px] sm:w-[420px] items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue/30 via-brand-purple/20 to-brand-cyan/30 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-6 rounded-full border border-brand-cyan/30 animate-spin-slow" />
          <div className="absolute inset-10 rounded-full border border-brand-blue/20" />

          {/* Enlarge circular profile element with original full color photo */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[290px] w-[290px] sm:h-[350px] sm:w-[350px] rounded-full overflow-hidden border-2 border-brand-cyan/40 shadow-neon-cyan transition-all duration-500 cursor-pointer group"
            style={{
              boxShadow: isHovered
                ? "0 0 35px rgba(56, 189, 248, 0.55), 0 0 70px rgba(139, 92, 246, 0.35)"
                : "0 0 20px rgba(56, 189, 248, 0.2)",
            }}
          >
            <div className="relative w-full h-full">
              {/* Static original colored profile photo */}
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
              animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
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
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Github, Linkedin, Download, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";

const roles = [
  "Data Scientist",
  "Machine Learning Engineer",
  "NLP Engineer",
  "AI Developer"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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

    return () => clearInterval(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-8 md:px-12 lg:px-20 pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 w-full">
        {/* Right - Profile Box with 3D Coin Rotation Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex h-[270px] w-[270px] sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] items-center justify-center lg:order-last"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue/30 via-brand-purple/20 to-brand-cyan/30 blur-3xl animate-pulse-glow" />

          {/* 3D Rotating Coin Element */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hero-3d-coin-stage"
          >
            <div className="hero-3d-coin" title="Continuous 3D Coin View • Hover to Pause">
              {/* Front Coin Side (Heads) */}
              <div className="hero-coin-side heads">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} profile photo front`}
                  width={300}
                  height={300}
                  className="hero-coin-img"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070c22]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Back Coin Side (Tails) */}
              <div className="hero-coin-side tails">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} profile photo back`}
                  width={300}
                  height={300}
                  className="hero-coin-img"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070c22]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Left - Context & Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <span className="eyebrow">Welcome to my portfolio</span>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3">
            <span className="gradient-text">{profile.name}</span>
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
            I design and build intelligent, data-driven solutions - from collecting and processing data to deploying scalable machine learning models.
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
              { name: "LinkedIn", key: "linkedin", icon: Linkedin, href: profile.social.linkedin, isExternal: true },
              { name: "GitHub", key: "github", icon: Github, href: profile.social.github, isExternal: true },
              { name: "Email", key: "email", icon: Mail, href: profile.social.email, isExternal: false },
            ].map(({ name, key, icon: Icon, href, isExternal }) => (
              <div key={key} className={`social-icon-wrapper ${key}`}>
                <span className="social-icon-tooltip">{name}</span>
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
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
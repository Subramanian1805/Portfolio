"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, FileText } from "lucide-react";
import { projects } from "@/data/portfolio";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Check file formats dynamically
  const isVideo = /\.(mp4|webm|ogg)$/i.test(project.image);
  const isPdf = /\.pdf$/i.test(project.image);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = (x / rect.width - 0.5) * 8; // Max 8deg tilt to keep it subtle
    const tiltY = (y / rect.height - 0.5) * -8;

    setTilt({ x: tiltX, y: tiltY });
    setMousePos({ x, y });
  }

  function handleMouseEnter() {
    setHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  function handleCardClick() {
    if (isPdf) {
      window.open(project.image, "_blank");
    } else if (project.demo) {
      window.open(project.demo, "_blank");
    }
  }

  const categories: Record<string, string> = {
    "Business Event Portal": "Full Stack Development",
    "Tourist Mobile App": "Mobile Architecture & AI",
    "SEO Campaign Suite": "Data Analytics & SaaS",
  };
  const category = categories[project.title] || "Software Engineering";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(${hovered ? 1.03 : 1}, ${hovered ? 1.03 : 1}, 1)`,
        transition: hovered ? "none" : "all 0.5s ease-out",
      }}
      className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c102b]/60 to-[#050816]/90 p-1 shadow-2xl transition-all duration-300 w-full h-[470px] cursor-pointer"
    >
      {/* Dynamic Cursor Spotlight Radial Background */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Card Border Hover Glow */}
      <div
        className={`absolute inset-0 z-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          index % 2 === 0 ? "neon-border" : "neon-border-purple"
        }`}
        style={{ pointerEvents: "none" }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Project Image Panel */}
        <div className="relative h-56 overflow-hidden rounded-2xl m-3 border border-white/5 flex items-center justify-center bg-[#050816]">
          {isPdf ? (
            /* PDF Custom Vector Representation */
            <div className="h-full w-full bg-gradient-to-br from-brand-purple/20 via-[#0a0e28] to-brand-cyan/20 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative h-20 w-16 bg-[#0c1135] border border-white/10 rounded-lg flex flex-col justify-between p-2.5 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <span className="absolute top-1 right-1 bg-red-500 text-[6px] font-mono font-bold text-white px-1 rounded">PDF</span>
                <FileText size={22} className="text-brand-cyan mt-1" />
                <div className="h-1.5 w-10 bg-white/10 rounded mt-1" />
                <div className="h-1.5 w-6 bg-white/10 rounded" />
                <div className="flex justify-between items-center pt-1 border-t border-white/5 mt-1">
                  <span className="text-[5px] text-brand-green font-mono">VERIFIED</span>
                  <div className="h-2 w-2 rounded-full bg-yellow-500 flex items-center justify-center text-[4px] text-black">★</div>
                </div>
              </div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-brand-cyan uppercase mt-4">
                PDF SPECIFICATION DOCUMENT
              </span>
              <span className="text-[9px] text-ink-secondary mt-1">
                Click card to open document
              </span>
            </div>
          ) : isVideo ? (
            /* Autoplay Video Player on Hover */
            <video
              ref={videoRef}
              src={project.image}
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            /* Standard Responsive Image */
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60 pointer-events-none" />
          
          {/* Tech stack float overlay */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#050816]/90 text-brand-cyan border border-white/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Text Details */}
        <div className="px-6 pb-6 pt-1 flex-grow flex flex-col justify-between">
          <div className="text-left">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-brand-purple uppercase">
              {category}
            </span>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-2 text-xs text-ink-secondary leading-relaxed font-normal line-clamp-3">
              {project.desc}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono text-ink-secondary hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View source code of ${project.title} on GitHub`}
              >
                <Github size={13} /> CODE
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cyan hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={13} /> LIVE
              </a>
            </div>

            {/* Dynamic Arrow Indicator */}
            <div
              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-neon group-hover:border-transparent"
            >
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[#050816]/40 relative overflow-hidden">
      {/* Ambient background accent light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Premium SaaS style top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-7 text-left">
            <span className="eyebrow">SELECTED WORKS</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Crafting Digital Solutions <br />
              <span className="gradient-text">Through Data & Code</span>
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col items-start md:items-end text-left md:text-right">
            <p className="text-ink-secondary text-sm md:text-base leading-relaxed mb-4 max-w-md">
              A curated showcase of applications leveraging full-stack web engineering, 
              robust machine learning models, and intuitive UI/UX design.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Projects Presentation: Marquee if > 3 projects, Static layout if <= 3 projects */}
      {projects.length > 3 ? (
        <div className="w-full relative marquee-container hover-pause py-4">
          <div className="marquee-content-left gap-6 px-3">
            {projects.map((p, index) => (
              <div key={`p1-${index}`} className="w-[300px] sm:w-[340px] shrink-0">
                <ProjectCard project={p} index={index} />
              </div>
            ))}
          </div>
          <div className="marquee-content-left gap-6 px-3" aria-hidden="true">
            {projects.map((p, index) => (
              <div key={`p2-${index}`} className="w-[300px] sm:w-[340px] shrink-0">
                <ProjectCard project={p} index={index} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {projects.map((p, index) => (
              <div key={`p-static-${index}`} className="w-full">
                <ProjectCard project={p} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

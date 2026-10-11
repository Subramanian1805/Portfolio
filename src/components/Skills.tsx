"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiMysql, SiFigma, SiGit, SiGithub, SiVercel, SiStreamlit, SiHtml5, SiCss, SiPlotly,
  SiPostgresql, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs
} from "react-icons/si";
import { IoLogoTableau } from "react-icons/io5";
import { BsFileExcel } from "react-icons/bs";
import { SKILLS, SPECIFIED_SKILL_ROWS, stagger, Skill } from "@/data/constants";

const PowerBISvg = ({ size = 24, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} width={size} height={size}>
    <rect x="3" y="13" width="4" height="8" rx="0.5" fill="#E6AD12" />
    <rect x="10" y="7" width="4" height="14" rx="0.5" fill="#F8C124" />
    <rect x="17" y="2" width="4" height="19" rx="0.5" fill="#F9D939" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiMysql, 
  SiTableau: IoLogoTableau,
  SiPowerbi: PowerBISvg,
  SiFigma, SiGit, SiGithub, SiVercel, SiStreamlit, SiHtml5, SiCss, SiPlotly,
  SiMicrosoftexcel: BsFileExcel,
  SiPostgresql, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs
};

const PARTICLE_COUNT = 10;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 35 + Math.random() * 40;
    const size = 3 + Math.random() * 4;
    const duration = 0.35 + Math.random() * 0.2;
    return { angle, distance, size, duration, id: i };
  });
}

function BurstParticles({ color = "#38bdf8", onComplete }: { color?: string; onComplete?: () => void }) {
  const particles = useRef(generateParticles()).current;

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          onAnimationComplete={p.id === 0 ? onComplete : undefined}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            background: `radial-gradient(circle, ${color} 0%, rgba(56,189,248,0.3) 100%)`,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 44,
          height: 44,
          border: `2px solid ${color}`,
          boxShadow: `0 0 16px ${color}`,
        }}
      />
    </div>
  );
}

function SkillOrb({
  skill,
  index,
  pointerPos,
}: {
  skill: Skill;
  index: number;
  pointerPos: { x: number; y: number } | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [imageError, setImageError] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 180, damping: 16, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 16, mass: 0.5 });

  const dist = useMotionValue(0);
  const scaleMapped = useTransform(dist, [0, 60], [1, 1.15]);
  const scale = useSpring(scaleMapped, { stiffness: 300, damping: 20 });

  const FLEE_RADIUS = 100;
  const FLEE_STRENGTH = 40;

  const floatDuration = useMemo(() => 3 + (index % 4) * 0.7, [index]);
  const floatDelay = useMemo(() => (index % 5) * 0.4, [index]);

  useEffect(() => {
    if (!pointerPos || !ref.current) {
      rawX.set(0);
      rawY.set(0);
      dist.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - pointerPos.x;
    const dy = cy - pointerPos.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d < FLEE_RADIUS && d > 0) {
      const force = (1 - d / FLEE_RADIUS) * FLEE_STRENGTH;
      const angle = Math.atan2(dy, dx);
      rawX.set(Math.cos(angle) * force);
      rawY.set(Math.sin(angle) * force);
      dist.set(force);
    } else {
      rawX.set(0);
      rawY.set(0);
      dist.set(0);
    }
  }, [pointerPos, rawX, rawY, dist]);

  const handlePop = useCallback(() => {
    if (popped) return;
    setPopped(true);
    setShowParticles(true);
  }, [popped]);

  const handleParticlesDone = useCallback(() => {
    setShowParticles(false);
    setTimeout(() => setPopped(false), 300);
  }, []);

  const IconComponent = iconMap[skill.icon];
  const brandColor = skill.color || "#38bdf8";

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ x, y, scale }}
      className="group relative flex cursor-pointer flex-col items-center select-none touch-manipulation"
      aria-label={skill.name}
      onClick={handlePop}
    >
      <AnimatePresence>
        {showParticles && (
          <BurstParticles color={brandColor} onComplete={handleParticlesDone} />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          y: [0, -5, 0, 5, 0],
          rotate: [0, 1.2, 0, -1.2, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="flex flex-col items-center"
      >
        <div 
          className="absolute -inset-2 rounded-full opacity-30 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl pointer-events-none"
          style={{ backgroundColor: `${brandColor}40` }}
        />

        <motion.div
          animate={
            popped
              ? {
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.15, ease: "easeIn" },
                }
              : {
                  scale: 1,
                  opacity: 1,
                  borderColor: `${brandColor}45`,
                  transition: { type: "spring", stiffness: 260, damping: 14 },
                }
          }
          className="relative flex h-[54px] w-[54px] sm:h-[64px] sm:w-[64px] md:h-[70px] md:w-[70px] items-center justify-center rounded-full border bg-[#080d26]/90 shadow-[0_8px_25px_rgba(5,12,40,0.8)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
          style={{
            boxShadow: `0 0 18px ${brandColor}20, inset 0 0 12px ${brandColor}15`,
          }}
        >
          {skill.file && !imageError ? (
            <Image
              src={`/skills/${skill.file}`}
              alt={skill.name}
              width={30}
              height={30}
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : IconComponent ? (
            <IconComponent
              size={26}
              className="transition-all duration-300 group-hover:scale-110 sm:text-[28px]"
              style={{ color: brandColor }}
            />
          ) : (
            <span className="text-xs font-bold text-white">{skill.name.slice(0, 2)}</span>
          )}
        </motion.div>

        <div
          className="mt-1.5 flex flex-col items-center opacity-95 transition-all duration-300 group-hover:scale-105 pointer-events-none"
          style={popped ? { visibility: "hidden" } : undefined}
        >
          <span className="text-[11px] sm:text-xs font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {skill.name}
          </span>
          {skill.level && (
            <span className="text-[9px] font-mono text-ink-secondary/90 tracking-wider">
              {skill.level}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Tech" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Data & Analytics" },
    { id: "web", label: "Web & Full Stack" },
    { id: "tools", label: "Tools & Platforms" },
  ];

  const staggeredRows = useMemo(() => {
    if (activeCategory === "all") {
      return SPECIFIED_SKILL_ROWS;
    }
    return SPECIFIED_SKILL_ROWS.map((row) =>
      row.filter((s) => s.category === activeCategory)
    ).filter((row) => row.length > 0);
  }, [activeCategory]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setPointerPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointerPos(null);
  }, []);

  return (
    <motion.section
      id="skills"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-20 md:py-24 md:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[130px]" />
        <div className="absolute right-1/4 top-1/3 h-[320px] w-[320px] bg-brand-purple/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <span className="eyebrow">MY TOOLBOX</span>
        <h2 className="mt-2.5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Interactive <span className="gradient-text">Skill Galaxy</span>
        </h2>
        <p className="mt-3 max-w-2xl text-center text-xs sm:text-sm md:text-base text-ink-secondary leading-relaxed px-2">
          Explore my tech stack. Hover over or tap bubbles to displace orbs or trigger particle pops.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-2 rounded-full bg-[#0a0f2d]/80 border border-white/10 backdrop-blur-md shadow-2xl max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-300 relative shrink-0 ${
                activeCategory === cat.id
                  ? "text-white font-bold shadow-neon-cyan"
                  : "text-ink-secondary hover:text-white"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative z-10 mx-auto mt-10 sm:mt-12 flex max-w-5xl flex-col items-center gap-4 sm:gap-6 min-h-[340px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 sm:gap-6 w-full"
          >
            {staggeredRows.map((row, rowIndex) => (
              <motion.div
                key={`staggered-row-${activeCategory}-${rowIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 ${
                  rowIndex % 2 === 1 ? "sm:px-8 px-2" : ""
                }`}
              >
                {row.map((skill, itemIndex) => (
                  <SkillOrb
                    key={`${activeCategory}-${skill.name}`}
                    skill={skill}
                    index={rowIndex * 5 + itemIndex}
                    pointerPos={pointerPos}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export { SkillsSection as Skills };

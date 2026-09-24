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
import { SKILLS, fadeUp, stagger, Skill } from "@/data/constants";

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

/* ── burst particle generation ── */
const PARTICLE_COUNT = 12;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 40 + Math.random() * 45;
    const size = 3 + Math.random() * 5;
    const duration = 0.4 + Math.random() * 0.25;
    return { angle, distance, size, duration, id: i };
  });
}

/* ── burst particles overlay ── */
function BurstParticles({ color = "#38bdf8", onComplete }: { color?: string; onComplete?: () => void }) {
  const particles = useRef(generateParticles()).current;

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
          }}
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

      {/* Central flash ring */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 50,
          height: 50,
          border: `2px solid ${color}`,
          boxShadow: `0 0 20px ${color}`,
        }}
      />
    </div>
  );
}

/* ── single bubble that flees cursor / touch with organic zero-G float ── */
function SkillOrb({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [imageError, setImageError] = useState(false);

  /* motion values driven by proximity */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* spring-damped for a rubbery water bubble feel */
  const x = useSpring(rawX, { stiffness: 180, damping: 16, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 16, mass: 0.5 });

  const dist = useMotionValue(0);
  const scaleMapped = useTransform(dist, [0, 60], [1, 1.18]);
  const scale = useSpring(scaleMapped, { stiffness: 300, damping: 20 });

  const FLEE_RADIUS = 110;
  const FLEE_STRENGTH = 45;

  // Float animation parameters unique per orb for zero-g effect
  const floatDuration = useMemo(() => 3 + (index % 4) * 0.7, [index]);
  const floatDelay = useMemo(() => (index % 5) * 0.4, [index]);

  const updateProximity = useCallback((px: number, py: number) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - px;
    const dy = cy - py;
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
  }, [rawX, rawY, dist]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }
      updateProximity(clientX, clientY);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
      dist.set(0);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [updateProximity, rawX, rawY, dist]);

  /* ── click/tap → pop → reform ── */
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
      {/* Burst particles */}
      <AnimatePresence>
        {showParticles && (
          <BurstParticles color={brandColor} onComplete={handleParticlesDone} />
        )}
      </AnimatePresence>

      {/* Ambient Bobbing Wrapper */}
      <motion.div
        animate={{
          y: [0, -6, 0, 6, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="flex flex-col items-center"
      >
        {/* Outer aura glow */}
        <div 
          className="absolute -inset-2 rounded-full opacity-30 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl pointer-events-none"
          style={{ backgroundColor: `${brandColor}40` }}
        />

        {/* Circular icon badge */}
        <motion.div
          animate={
            popped
              ? {
                  scale: 0,
                  opacity: 0,
                  borderColor: "rgba(56,189,248,0)",
                  transition: { duration: 0.15, ease: "easeIn" },
                }
              : {
                  scale: 1,
                  opacity: 1,
                  borderColor: `${brandColor}45`,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  },
                }
          }
          className="relative flex h-[54px] w-[54px] sm:h-[64px] sm:w-[64px] md:h-[72px] md:w-[72px] items-center justify-center rounded-full border bg-[#080d26]/90 shadow-[0_8px_25px_rgba(5,12,40,0.8)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
          style={{
            boxShadow: `0 0 20px ${brandColor}20, inset 0 0 15px ${brandColor}15`,
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

        {/* Skill Label + Category Tag */}
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

/* ── main section ── */
export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tech" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Data & Analytics" },
    { id: "web", label: "Web & Full Stack" },
    { id: "tools", label: "Tools & Platforms" },
  ];

  const filteredSkills = useMemo(() => {
    return activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Organic Honeycomb / Staggered Constellation Rows
  // Breaks filteredSkills into staggered alternating rows (e.g. 3, 4, 5, 5, 4, 3 or 3, 3) for an impressive non-rectangular pattern
  const staggeredRows = useMemo(() => {
    const rows: Skill[][] = [];
    let currentIdx = 0;
    
    // Custom staggered pattern lengths depending on count
    const pattern = filteredSkills.length > 12 
      ? [3, 4, 5, 5, 4, 3]  // Organic Honeycomb Diamond layout for 24 items
      : [3, 3];             // Balanced cluster for 6 items in individual categories

    for (const count of pattern) {
      if (currentIdx >= filteredSkills.length) break;
      rows.push(filteredSkills.slice(currentIdx, currentIdx + count));
      currentIdx += count;
    }

    // Capture any remaining items
    if (currentIdx < filteredSkills.length) {
      rows.push(filteredSkills.slice(currentIdx));
    }

    return rows;
  }, [filteredSkills]);

  return (
    <motion.section
      id="skills"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-20 md:py-24 md:px-8 overflow-hidden"
    >
      {/* Ambient background glows */}
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
          Explore my interactive tech ecosystem. Touch or hover bubbles to displace zero-gravity water orbs, or tap to trigger particle pops.
        </p>

        {/* Category Filter Pills */}
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

      {/* Organic Floating Honeycomb Constellation */}
      <div className="relative z-10 mx-auto mt-10 sm:mt-12 flex max-w-5xl flex-col items-center gap-4 sm:gap-6 min-h-[340px]">
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
                  // Offset alternating rows to create organic honeycomb diamond pattern instead of rigid rectangle grid
                  rowIndex % 2 === 1 ? "sm:px-8 px-2" : ""
                }`}
              >
                {row.map((skill, itemIndex) => (
                  <SkillOrb
                    key={`${activeCategory}-${skill.name}`}
                    skill={skill}
                    index={rowIndex * 5 + itemIndex}
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

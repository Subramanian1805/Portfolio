"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const colors = [217, 262, 199]; // blue, purple, cyan hues
    const count = Math.min(70, Math.floor((width * height) / 22000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number = 0;
    let isPageVisible = !document.hidden;

    function handleVisibilityChange() {
      isPageVisible = !document.hidden;
      if (isPageVisible && !prefersReducedMotion) {
        cancelAnimationFrame(raf);
        draw();
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function draw() {
      if (!ctx || !isPageVisible) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.55)`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.8)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
      draw();
    } else {
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.4)`;
        ctx.fill();
      }
    }

    function onResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    let rafGlow: number;
    function onMove(e: MouseEvent) {
      if (glowRef.current) {
        cancelAnimationFrame(rafGlow);
        rafGlow = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${
              e.clientY - 200
            }px)`;
          }
        });
      }
    }
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafGlow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 bg-grid-glow" />
      <div
        ref={glowRef}
        className="hidden md:block pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-brand-blue/10 blur-[100px] transition-transform duration-300 ease-out"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

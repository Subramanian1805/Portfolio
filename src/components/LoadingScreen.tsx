"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  /** Custom writing animation duration in ms (default: 2800) */
  duration?: number;
  /** Hold duration after writing completes in ms (default: 700) */
  holdDuration?: number;
}

export default function LoadingScreen({
  onComplete,
  duration = 1600,
  holdDuration = 200,
}: LoadingScreenProps) {
  const textRef = useRef<SVGTextElement>(null);
  const [isFading, setIsFading] = useState(false);
  const [totalLength, setTotalLength] = useState(2200);
  const [strokeOffset, setStrokeOffset] = useState(2200);
  const [fillOpacity, setFillOpacity] = useState(0);
  const [penPos, setPenPos] = useState({ x: 0, y: 0 });
  const [penVisible, setPenVisible] = useState(true);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    // Respect reduced motion accessibility preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setPenVisible(false);
      setFillOpacity(1);
      setStrokeOffset(0);
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 400);
      }, 200);
      return () => clearTimeout(timer);
    }

    // Calculate length of the continuous calligraphy stroke
    const svgEl = textEl as any;
    let calculatedLength = 2200;
    try {
      if (typeof svgEl.getTotalLength === "function") {
        calculatedLength = svgEl.getTotalLength() || 2200;
      }
    } catch {
      calculatedLength = 2200;
    }

    setTotalLength(calculatedLength);
    setStrokeOffset(calculatedLength);

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth natural handwriting easing (easeInOutCubic)
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentOffset = calculatedLength * (1 - easedProgress);
      setStrokeOffset(currentOffset);

      // Track exact lead point of the pen stroke
      if (typeof svgEl.getPointAtLength === "function") {
        try {
          const currentLen = calculatedLength * easedProgress;
          const point = svgEl.getPointAtLength(currentLen);
          if (point && !isNaN(point.x) && !isNaN(point.y)) {
            setPenPos({ x: point.x, y: point.y });
          }
        } catch {
          // Fallback if browser doesn't support getPointAtLength on SVG text
        }
      }

      // Smooth fill transition as drawing nears completion (without layout shift)
      if (progress > 0.5) {
        const normalizedFill = (progress - 0.5) / 0.5;
        setFillOpacity(Math.min(normalizedFill, 1));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Hide pen lead particle & hold completed state
        setPenVisible(false);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 400);
        }, holdDuration);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete, duration, holdDuration]);

  return (
    <div
      aria-label="Loading portfolio, Subramanian"
      role="status"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050816] transition-opacity duration-400 ease-in-out select-none ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Central Viewport Stage */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-center">
        <svg
          className="w-full h-auto max-h-[260px] overflow-visible"
          viewBox="0 0 1000 260"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cinematic Gradient Spectrum */}
            <linearGradient id="calligraphyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="75%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Soft Ambient Neon Aura Filter */}
            <filter id="handwritingGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pen Tip Glow Filter */}
            <filter id="penNibGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="penBlur" />
              <feMerge>
                <feMergeNode in="penBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continuous Vector Handwriting Progress Text */}
          <text
            ref={textRef}
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-cursive font-normal text-[120px] sm:text-[145px] md:text-[170px] lg:text-[190px]"
            style={{
              stroke: "url(#calligraphyGradient)",
              strokeWidth: "2.5px",
              fill: "url(#calligraphyGradient)",
              filter: "url(#handwritingGlow)",
              strokeDasharray: totalLength,
              strokeDashoffset: strokeOffset,
              fillOpacity: fillOpacity,
              letterSpacing: "0.02em",
              fontFeatureSettings: '"liga" 1, "calt" 1',
            }}
          >
            Subramanian
          </text>

          {/* Glowing Leading Pen Tip Particle */}
          {penVisible && penPos.x > 0 && penPos.y > 0 && (
            <g transform={`translate(${penPos.x}, ${penPos.y})`}>
              <circle r="9" fill="#38bdf8" opacity="0.4" filter="url(#penNibGlow)" />
              <circle r="4" fill="#ffffff" filter="url(#penNibGlow)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

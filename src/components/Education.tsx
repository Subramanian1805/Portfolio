"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="ACADEMIC JOURNEY"
          title="Education"
          description="My academic journey from school to university."
        />

        <div className="relative pl-10">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-brand-purple via-brand-blue to-brand-cyan"
          />

          <div className="space-y-8">
            {education.map((e, i) => (
              <motion.div
                key={e.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative"
              >
                <span className="absolute -left-10 top-1 h-8 w-8 rounded-full glass neon-border flex items-center justify-center text-brand-purple">
                  <GraduationCap size={14} />
                </span>
                <div className="glass-card p-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold">{e.level}</h3>
                    <p className="text-sm text-ink-secondary">{e.school}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-mono text-brand-cyan">{e.period}</span>
                    <span className="block text-sm font-semibold gradient-text">{e.score}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Where I've worked"
          title="Experience"
          description="Internships"
        />

        <div className="relative pl-10">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-brand-blue via-brand-purple to-brand-cyan"
          />

          <div className="space-y-10">
            {experience.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative"
              >
                <span className="absolute -left-10 top-1 h-8 w-8 rounded-full glass neon-border flex items-center justify-center text-brand-cyan">
                  <Briefcase size={14} />
                </span>
                <div className="glass-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-lg">{e.role}</h3>
                    <span className="text-xs font-mono text-brand-cyan">{e.period}</span>
                  </div>
                  <p className="text-sm text-brand-purple mb-3">{e.company}</p>
                  <ul className="space-y-1.5">
                    {e.points.map((pt) => (
                      <li key={pt} className="text-sm text-ink-secondary leading-relaxed">
                        — {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

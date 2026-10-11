"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="WHERE I'VE WORKED"
          title="Professional Experience"
          description="Internships & Applied Technical Roles"
        />

        <div className="relative pl-8 sm:pl-10">
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
                <span className="absolute -left-8 sm:-left-10 top-1.5 h-8 w-8 rounded-full glass neon-border flex items-center justify-center text-brand-cyan shadow-neon">
                  <Briefcase size={14} />
                </span>
                <div className="glass-card p-6 md:p-8 hover:border-brand-cyan/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-xl text-white">{e.role}</h3>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-cyan/30 text-brand-cyan">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-brand-purple mb-4">{e.company}</p>
                  <ul className="space-y-2.5">
                    {e.points.map((pt) => (
                      <li key={pt} className="text-sm text-ink-secondary leading-relaxed flex items-start gap-2">
                        <span className="text-brand-cyan mt-1">•</span>
                        <span>{pt}</span>
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

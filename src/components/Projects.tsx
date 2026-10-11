"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Cpu } from "lucide-react";
import { projects } from "@/data/portfolio";

interface ProjectDetails {
  title: string;
  desc: string;
  image: string;
  stack: string[];
  github: string;
  architecture?: string;
  metrics?: string;
  features?: string;
}

const extendedProjectData: Record<string, { architecture: string; metrics: string; features: string }> = {
  "HealthCare AI": {
    architecture: "Binary Classification model utilizing Scikit-learn Logistic Regression and Random Forest with cross-validated hyperparameter tuning.",
    metrics: "Achieved ~88% ROC-AUC evaluation accuracy on test dataset split.",
    features: "Age, blood pressure, cholesterol levels, resting ECG results, max heart rate, chest pain type.",
  },
  "Stroke Prediction System": {
    architecture: "Gradient Boosting model utilizing XGBoost with SMOTE oversampling for imbalanced medical class distributions.",
    metrics: "Achieved 0.91 ROC-AUC score; serialized model served via Flask REST API.",
    features: "Hypertension, heart disease status, average glucose level, BMI, smoking history, age bracket.",
  },
  "DermaCare AI": {
    architecture: "Convolutional Neural Network (CNN) built with TensorFlow/Keras fine-tuned on skin lesion datasets with data augmentation.",
    metrics: "Achieved multi-class prediction with dynamic confidence scoring and image preprocessing pipeline.",
    features: "Skin image tensor input (224x224 RGB), batch normalization, dropout regularization, Softmax output.",
  },
};

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: (typeof projects)[number];
  index: number;
  onSelect: (p: (typeof projects)[number]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = (x / rect.width - 0.5) * 6;
    const tiltY = (y / rect.height - 0.5) * -6;

    setTilt({ x: tiltX, y: tiltY });
    setMousePos({ x, y });
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(${hovered ? 1.02 : 1}, ${hovered ? 1.02 : 1}, 1)`,
        transition: hovered ? "none" : "all 0.4s ease-out",
      }}
      className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c102b]/70 to-[#050816]/95 p-1 shadow-2xl transition-all duration-300 w-full h-[460px] cursor-pointer"
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div
        className={`absolute inset-0 z-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          index % 2 === 0 ? "neon-border" : "neon-border-purple"
        }`}
        style={{ pointerEvents: "none" }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="relative h-52 overflow-hidden rounded-2xl m-3 border border-white/5 flex items-center justify-center bg-[#050816]">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={220}
            className="h-full w-full object-contain bg-white/5 p-2 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60 pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#050816]/90 text-brand-cyan border border-white/10"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#050816]/90 text-brand-purple border border-white/10">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 pt-1 flex-grow flex flex-col justify-between">
          <div className="text-left">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-brand-purple uppercase">
              MACHINE LEARNING FLAGSHIP
            </span>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-2 text-xs text-ink-secondary leading-relaxed font-normal line-clamp-3">
              {project.desc}
            </p>
          </div>

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
                <Github size={13} /> GITHUB REPO
              </a>
            </div>

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
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  const extraInfo = selectedProject ? extendedProjectData[selectedProject.title] : null;

  return (
    <section id="projects" className="section-padding bg-[#050816]/40 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-7 text-left">
            <span className="eyebrow">FEATURED ML PROJECTS</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
              Intelligent ML Models & <br />
              <span className="gradient-text">Predictive Systems</span>
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col items-start md:items-end text-left md:text-right">
            <p className="text-ink-secondary text-sm md:text-base leading-relaxed mb-4 max-w-md">
              End-to-end Machine Learning and Deep Learning implementations featuring feature engineering, evaluation metrics, and API integration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {projects.map((p, index) => (
            <div key={`p-static-${index}`} className="w-full">
              <ProjectCard project={p} index={index} onSelect={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass p-6 md:p-8 border border-white/10 bg-[#070c22] text-white shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan mb-2">
                <Cpu size={15} /> CASE STUDY ARCHITECTURE
              </div>

              <h3 className="text-2xl font-bold font-display text-white mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed mb-6">{selectedProject.desc}</p>

              <div className="space-y-4 text-xs font-mono border-t border-white/10 pt-4">
                {extraInfo && (
                  <>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-brand-purple font-bold block mb-1">MODEL ARCHITECTURE:</span>
                      <span className="text-gray-300 font-sans">{extraInfo.architecture}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-brand-cyan font-bold block mb-1">KEY PERFORMANCE METRICS:</span>
                      <span className="text-gray-300 font-sans">{extraInfo.metrics}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-brand-green font-bold block mb-1">INPUT FEATURES:</span>
                      <span className="text-gray-300 font-sans">{extraInfo.features}</span>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <span className="text-gray-400 font-bold block mb-2">TECHNOLOGY STACK:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-brand-blue/10 border border-brand-cyan/30 text-brand-cyan text-xs font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-5 inline-flex items-center gap-2"
                >
                  <Github size={16} /> View GitHub Source Code
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-secondary text-xs py-2.5 px-4"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

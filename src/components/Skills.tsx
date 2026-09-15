"use client";

import { motion } from "framer-motion";
import { 
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiMysql, SiFigma, SiGit, SiGithub, SiVercel, SiStreamlit, SiHtml5, SiCss, SiPlotly,
  SiPostgresql
} from "react-icons/si";
import { IoLogoTableau } from "react-icons/io5";
import { BsFileExcel } from "react-icons/bs";
import SectionHeading from "./SectionHeading";
import { marqueeSkillsRow1, marqueeSkillsRow2 } from "@/data/portfolio";

const PowerBISvg = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
    <rect x="3" y="13" width="4" height="8" rx="0.5" fill="#E6AD12" />
    <rect x="10" y="7" width="4" height="14" rx="0.5" fill="#F8C124" />
    <rect x="17" y="2" width="4" height="19" rx="0.5" fill="#F9D939" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiMysql, 
  SiTableau: IoLogoTableau,
  SiPowerbi: PowerBISvg,
  SiFigma, SiGit, SiGithub, SiVercel, SiStreamlit, SiHtml5, SiCss, SiPlotly,
  SiMicrosoftexcel: BsFileExcel,
  SiPostgresql
};

export default function Skills() {
  function renderSkillChip(skill: { name: string; icon: string }, index: number) {
    const IconComponent = iconMap[skill.icon];
    return (
      <motion.div
        key={`${skill.name}-${index}`}
        whileHover={{ 
          scale: 1.08,
          boxShadow: "0 0 20px rgba(56, 189, 248, 0.45)",
          borderColor: "rgba(56, 189, 248, 0.5)",
        }}
        className="chip shrink-0 cursor-pointer mx-2 select-none"
      >
        {IconComponent && <IconComponent className="text-brand-cyan group-hover:text-white transition-colors" size={18} />}
        <span className="text-white font-medium">{skill.name}</span>
      </motion.div>
    );
  }

  return (
    <section id="skills" className="section-padding bg-[#050816]/30 relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="My Toolbox"
          title="Skills & Technologies"
          description="A comprehensive view of the core machine learning frameworks, full-stack tools, and design suites I leverage."
        />

        <div className="space-y-6 mt-10">
          
          {/* Row 1: Right -> Left Marquee */}
          <div className="marquee-container py-2">
            <div className="marquee-content-left">
              {marqueeSkillsRow1.map((skill, index) => renderSkillChip(skill, index))}
            </div>
            <div className="marquee-content-left" aria-hidden="true">
              {marqueeSkillsRow1.map((skill, index) => renderSkillChip(skill, index + 100))}
            </div>
          </div>

          {/* Row 2: Left -> Right Marquee */}
          <div className="marquee-container py-2">
            <div className="marquee-content-right">
              {marqueeSkillsRow2.map((skill, index) => renderSkillChip(skill, index))}
            </div>
            <div className="marquee-content-right" aria-hidden="true">
              {marqueeSkillsRow2.map((skill, index) => renderSkillChip(skill, index + 100))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

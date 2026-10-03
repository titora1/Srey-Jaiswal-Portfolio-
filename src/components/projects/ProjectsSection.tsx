import React from 'react';
import { SystolicArrayProject } from './SystolicArrayProject';
import { RiscVProcessorProject } from './RiscVProcessorProject';
import { FormulaStudentProject } from './FormulaStudentProject';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Primary Engineering Implementations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            FEATURED PROJECTS & HARDWARE ARCHITECTURES.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Detailed hardware systems, RTL implementations, and physical electrical architectures
            engineered, validated, and synthesized for silicon and FPGA targets.
          </p>
        </div>

        {/* 3 Immersive Project Sections */}
        <div className="space-y-20">
          <SystolicArrayProject />
          <RiscVProcessorProject />
          <FormulaStudentProject />
        </div>
      </div>
    </section>
  );
};

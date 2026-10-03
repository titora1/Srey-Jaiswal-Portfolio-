import React from 'react';
import { CV_DATA } from '../data/cvData';
import { DatapathVisualizer } from './DatapathVisualizer';
import { ProfilePhoto } from './ProfilePhoto';
import { downloadCvPdf } from '../utils/generatePdf';
import { ArrowDown, FileText, ChevronRight, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-zinc-800/80 overflow-hidden">
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Massive Typography & Core Profile */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top context badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400/90 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DIGITAL HARDWARE & ARCHITECTURE PORTFOLIO</span>
            </div>

            {/* Massive Hero Name */}
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-slate-100 uppercase leading-[0.9]">
                SREY
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-cyan-400">
                  JAISWAL
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-slate-300 tracking-tight">
              Electronics Engineering · VLSI · FPGA · Computer Architecture
            </p>

            {/* Professional Statement */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              {CV_DATA.personal.statement}
            </p>

            {/* Photo + Education Verified Lockup */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch max-w-xl">
              {/* Photo Box */}
              <div className="sm:col-span-4 max-w-[170px] sm:max-w-none">
                <ProfilePhoto />
              </div>

              {/* Education Box */}
              <div className="sm:col-span-8 p-4 bg-zinc-950/60 border border-zinc-800/90 text-xs font-mono space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-slate-400 border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-200 font-semibold">{CV_DATA.personal.university}</span>
                    <span className="text-cyan-400 tabular-nums">2024–2028</span>
                  </div>
                  <div className="pt-2 text-slate-300 font-sans text-xs">
                    {CV_DATA.personal.degree}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-500">ACADEMIC STANDING:</span>
                  <span className="text-slate-100 font-semibold">
                    CGPA: <strong className="text-cyan-300 font-mono">9.08/10</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-medium uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => downloadCvPdf()}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-medium uppercase tracking-wider text-slate-200 bg-zinc-900 border border-zinc-700/80 hover:border-cyan-500/80 hover:text-cyan-300 transition-colors cursor-pointer"
                title="Download Srey Jaiswal CV (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Precision Technical Visualizer */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between px-1">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>RTL INTERCONNECT MODEL</span>
              </span>
              <span className="text-zinc-500">PYNQ-Z2 FABRIC</span>
            </div>

            <DatapathVisualizer />

            {/* Core Competencies Quick Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="border border-zinc-800/80 bg-zinc-950/40 p-3">
                <span className="text-zinc-500 block text-[10px]">RTL DESIGN</span>
                <span className="text-slate-200 font-medium">SystemVerilog & Verilog</span>
              </div>
              <div className="border border-zinc-800/80 bg-zinc-950/40 p-3">
                <span className="text-zinc-500 block text-[10px]">CO-DESIGN</span>
                <span className="text-slate-200 font-medium">ARM Cortex-A9 / AXI4</span>
              </div>
              <div className="border border-zinc-800/80 bg-zinc-950/40 p-3">
                <span className="text-zinc-500 block text-[10px]">ISA IMPLEMENTATION</span>
                <span className="text-slate-200 font-medium">RV32I 5-Stage Core</span>
              </div>
              <div className="border border-zinc-800/80 bg-zinc-950/40 p-3">
                <span className="text-zinc-500 block text-[10px]">SYNTHESIS & TIMING</span>
                <span className="text-slate-200 font-medium">Xilinx Vivado @ 100 MHz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { CV_DATA } from '../data/cvData';
import { ArrowRight, Layers, Terminal, Cpu, Cog } from 'lucide-react';

export const About: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'arch',
      name: 'ARCHITECTURE',
      icon: Layers,
      headline: 'Instruction Sets & Datapath Microarchitectures',
      description:
        'Designing computer architectures from first principles: 32-bit RV32I pipelined processing cores, hazard detection units, forwarding networks, and 2D systolic array datapaths for parallel matrix operations.',
      deliverables: ['RV32I ISA compliance', '5-stage pipeline registers', 'Output-stationary systolic scheduling'],
    },
    {
      id: 'rtl',
      name: 'RTL DESIGN',
      icon: Terminal,
      headline: 'Synthesizable SystemVerilog & Verilog',
      description:
        'Authoring deterministic, synthesizable digital hardware logic. Implementing finite-state machines, custom ALU blocks, register files, and AXI4-Lite slave controllers with comprehensive self-checking testbenches.',
      deliverables: ['SystemVerilog / Verilog', 'ModelSim functional verification', 'Golden model checking with NumPy'],
    },
    {
      id: 'fpga',
      name: 'FPGA PROTOTYPING',
      icon: Cpu,
      headline: 'Synthesis, Place & Route, and Timing Closure',
      description:
        'Targeting Xilinx Zynq-7020 on the PYNQ-Z2 evaluation platform using Vivado. Running synthesis, implementation, static timing analysis at 100 MHz, resource optimization (LUTs, FFs, BRAM, DSP48s), and bitstream generation.',
      deliverables: ['100 MHz timing closure', 'DSP48E1 MAC pipelining', 'Shared-BRAM memory mapping'],
    },
    {
      id: 'system',
      name: 'SYSTEM CO-DESIGN',
      icon: Cog,
      headline: 'Hardware-Software Integration & Electrical Systems',
      description:
        'Bridging FPGA fabric with ARM Cortex-A9 processing systems via AXI buses and memory-mapped registers. Extending down to real-world vehicle electrical engineering: 13S14P accumulator packs, CAN BMS, and safety shutdown circuits.',
      deliverables: ['ARM Cortex-A9 + AXI4-Lite', 'Python PYNQ driver stack', 'Orion Jr. 2 CAN BMS & BSPD'],
    },
  ];

  return (
    <section id="about" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Engineering Philosophy & Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            ABOUT ME
          </h2>
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
            <p className="text-slate-200 leading-relaxed">
              I’m Srey Jaiswal, a third-year B.Tech student in Electronics and Engineering, specializing in VLSI at SRM Institute of Science and Technology. My interests include digital design, FPGA systems, and computer architecture. Through projects on RISC-V processors and a neural-network accelerator, I’ve gained hands-on experience in RTL design and simulation using Verilog and Vivado.
              <span className="block mt-3 font-mono font-semibold text-cyan-300 text-sm">
                CGPA:- 9.08/10
              </span>
            </p>
            <p className="text-slate-400">
              Beyond digital silicon and FPGA accelerators, I contribute to real-world automotive electrical
              systems—integrating high-voltage accumulator packs, CAN-based battery management systems, and
              hardwired safety shutdown loops for Formula Student racing.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-zinc-950/60 border border-zinc-800 space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                CORE TECHNICAL PROGRESSION
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="text-zinc-600">01</span>
                  <span>RTL & Digital Logic</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 pl-4 border-l border-zinc-800">
                  <span className="text-zinc-600">02</span>
                  <span>FPGA Prototyping & Vivado</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 pl-4 border-l border-zinc-800">
                  <span className="text-zinc-600">03</span>
                  <span>Computer Architecture (RISC-V)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 pl-4 border-l border-zinc-800">
                  <span className="text-zinc-600">04</span>
                  <span>Hardware Acceleration (Systolic INT8)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 pl-4 border-l border-zinc-800">
                  <span className="text-zinc-600">05</span>
                  <span>Embedded & Automotive Electrical</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">ACADEMIC STANDING:</span>
                <span className="text-slate-200">CGPA 9.08 / 10.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Flow: ARCHITECTURE → RTL → FPGA → SYSTEM */}
        <div className="border border-zinc-800 bg-[#090c14] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/80">
            <div>
              <span className="text-xs font-mono text-cyan-400 block mb-1">INTERACTIVE PIPELINE WORKFLOW</span>
              <h3 className="text-lg font-bold text-slate-100">
                ARCHITECTURE → RTL → FPGA → SYSTEM
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              SELECT STAGE TO INSPECT METHODOLOGY
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {stages.map((stg, idx) => {
              const Icon = stg.icon;
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 text-left transition-all duration-150 border cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-cyan-500/80 text-cyan-300 shadow-sm'
                      : 'bg-zinc-950/40 border-zinc-800/80 text-slate-400 hover:border-zinc-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                  </div>
                  <div className="text-xs font-mono font-semibold tracking-wider">{stg.name}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
              <h4 className="text-base font-semibold text-slate-100">
                {stages[activeStage].headline}
              </h4>
              <span className="text-xs font-mono text-cyan-400">
                STAGE 0{activeStage + 1} OF 04
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-zinc-500 block mb-2 uppercase">
                Concrete Hardware Implementations:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {stages[activeStage].deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-slate-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

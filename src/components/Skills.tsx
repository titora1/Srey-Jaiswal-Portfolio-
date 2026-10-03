import React, { useState } from 'react';
import { CV_DATA } from '../data/cvData';
import { Terminal, Cpu, Layers, HardDrive, Code2, CircuitBoard } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Grouped skills mapping strictly matching the CV
  const skillCategories = [
    {
      category: 'HDL & RTL Design',
      code: 'HDL_01',
      icon: Terminal,
      skills: ['Verilog', 'SystemVerilog', 'RTL Design', 'Digital Logic Design'],
      context: 'Synthesizable digital circuit modeling, FSMs, synchronous pipelining, and functional verification.',
    },
    {
      category: 'FPGA & EDA Tools',
      code: 'EDA_02',
      icon: Cpu,
      skills: ['Xilinx Vivado', 'ModelSim', 'PYNQ-Z2'],
      context: 'Synthesis, place-and-route, static timing analysis (STA) at 100 MHz, and bitstream deployment on Zynq-7020.',
    },
    {
      category: 'Computer Architecture',
      code: 'ARC_03',
      icon: Layers,
      skills: ['RISC-V', 'RV32I', 'Pipelined Processors', 'Systolic Arrays'],
      context: '5-stage IF-ID-EX-MEM-WB microarchitecture, data forwarding networks, load-use hazard interlocks, and 2D PE arrays.',
    },
    {
      category: 'Hardware Interfaces',
      code: 'IFC_04',
      icon: HardDrive,
      skills: ['AXI4-Lite', 'BRAM', 'FPGA–ARM Hardware/Software Integration'],
      context: 'Memory-mapped register spaces, dual-port block RAM buffers, and high-bandwidth processing-system co-design.',
    },
    {
      category: 'Programming & OS',
      code: 'PRG_05',
      icon: Code2,
      skills: ['C', 'Python', 'NumPy', 'Assembly', 'Linux'],
      context: 'Bit-accurate golden models, numerical simulation, bare-metal / embedded C programming, and Linux driver environments.',
    },
    {
      category: 'Hardware & Embedded Systems',
      code: 'EMB_06',
      icon: CircuitBoard,
      skills: [
        'PCB Design',
        'KiCad',
        'Microcontroller Interfacing',
        'Battery Management Systems',
        'HV/LV Systems',
        'Electrical Safety',
      ],
      context: 'High-voltage accumulator safety loops, Orion Jr. 2 CAN BMS, schematic capture, and sensor bus communication.',
    },
  ];

  return (
    <section id="skills" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Core Technical Stack & Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            TECHNICAL MATRIX & PROFICIENCIES.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Organized across digital design levels—from low-level RTL descriptions and synthesis constraints
            to processor microarchitectures and automotive electrical safety.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.code}
                className="border border-zinc-800 bg-[#080b12] p-6 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                        {cat.category}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{cat.code}</span>
                  </div>

                  {/* Skills List without pill shapes - clean typography */}
                  <ul className="space-y-2 mb-4">
                    {cat.skills.map((skill, sIdx) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <li
                          key={sIdx}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`text-xs font-mono py-1 px-2 border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-950/30 text-cyan-300'
                              : 'border-zinc-800/80 bg-zinc-950/40 text-slate-300 hover:border-zinc-700 hover:text-slate-100'
                          }`}
                        >
                          <span>{skill}</span>
                          <span className="text-[9px] text-zinc-600">VERIFIED</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Practical Context Footnote */}
                <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {cat.context}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Selection Footer */}
        {selectedSkill && (
          <div className="mt-8 p-4 bg-zinc-950 border border-cyan-500/40 font-mono text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">SELECTED SKILL:</span>
              <strong className="text-cyan-300 font-bold">{selectedSkill}</strong>
            </div>
            <div className="text-slate-300 text-[11px]">
              Implemented in verified projects and tested on physical hardware (PYNQ-Z2 & Formula Student powertrain).
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-zinc-400 hover:text-slate-100 underline text-[10px] cursor-pointer"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

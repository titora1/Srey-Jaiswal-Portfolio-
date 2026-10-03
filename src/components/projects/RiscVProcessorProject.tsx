import React, { useState } from 'react';
import { CV_DATA } from '../../data/cvData';
import { Cpu, CheckCircle2, ChevronRight, AlertCircle, ArrowRight } from 'lucide-react';

export const RiscVProcessorProject: React.FC = () => {
  const project = CV_DATA.projects[1];
  const [activeStage, setActiveStage] = useState<number | null>(2); // Default to EX
  const [traceStep, setTraceStep] = useState(2);

  // 5 Pipeline Stages
  const pipelineStages = [
    {
      code: 'IF',
      name: 'Instruction Fetch',
      registers: 'PC → IF/ID Register',
      components: ['Program Counter (PC)', 'Instruction Memory (IMEM)', 'PC+4 Adder', 'Branch MUX'],
      description:
        'Fetches 32-bit instruction from memory indexed by current PC. Advances PC to PC+4 or latches branch target from MEM stage if branch/jump taken. Latches into 64-bit IF/ID pipeline register.',
      hazardBehavior: 'Frozen during 1-cycle load-use hazard stall; flushed with NOP on taken branch/jump.',
    },
    {
      code: 'ID',
      name: 'Instruction Decode',
      registers: 'IF/ID → ID/EX Register',
      components: ['32 × 32-bit Register File', 'Immediate Generator', 'Main Control Unit', 'Hazard Detection Unit'],
      description:
        'Decodes opcode, funct3, and funct7. Reads register file ports rs1 and rs2 simultaneously. Generates sign-extended 32-bit immediate (I, S, B, U, J types). Hazard Detection Unit detects load-use conditions.',
      hazardBehavior: 'Inserts bubble (zeroed control signals) into ID/EX on load-use hazard; flushed on branch mispredict.',
    },
    {
      code: 'EX',
      name: 'Execute / Address Calc',
      registers: 'ID/EX → EX/MEM Register',
      components: ['32-bit Arithmetic Logic Unit (ALU)', 'Forwarding Multiplexers', 'Branch Comparator', 'Target Adder'],
      description:
        'Performs arithmetic (ADD, SUB), logic (AND, OR, XOR), shifts (SLL, SRL, SRA), comparisons (SLT, SLTU), and calculates branch target (PC + imm) and memory effective addresses (rs1 + offset).',
      hazardBehavior: 'Operands forwarded directly from EX/MEM or MEM/WB pipeline registers without memory stall penalty.',
    },
    {
      code: 'MEM',
      name: 'Memory Access',
      registers: 'EX/MEM → MEM/WB Register',
      components: ['Data Memory (DMEM)', 'Byte/Half/Word Alignment', 'Branch Resolution Logic', 'Flush Signal Gen'],
      description:
        'Performs data memory loads and stores. Supports signed/unsigned byte (LB, LBU), half-word (LH, LHU), and full word (LW, SW). Evaluates 6 branch conditions (BEQ, BNE, BLT, BGE, BLTU, BGEU) and jump links (JAL, JALR).',
      hazardBehavior: 'Signals pipeline flush to IF and ID stages when branch condition evaluates true or jump executed.',
    },
    {
      code: 'WB',
      name: 'Write Back',
      registers: 'MEM/WB → Register File',
      components: ['MemToReg Multiplexer', 'Register File Write Port (rd)', 'RegWrite Enable Logic'],
      description:
        'Selects write-back data between ALU calculation result, memory read value, or PC+4 (for return address in JAL/JALR). Commits final 32-bit value into the target register rd in the 32 × 32-bit register file.',
      hazardBehavior: 'RegWrite data made immediately accessible to ID stage in same cycle via split-cycle register file.',
    },
  ];

  // Sample instruction pipeline progression trace
  const instructionTrace = [
    {
      step: 0,
      label: 'Cycle T+1: Standard Arithmetic Pipeline',
      stages: {
        IF: 'LW x6, 0(x7)',
        ID: 'SUB x4, x1, x5',
        EX: 'ADD x1, x2, x3',
        MEM: 'ANDI x10, x11, 0xFF',
        WB: 'OR x12, x13, x14',
      },
      note: 'Normal pipeline flow with maximum throughput of 1 instruction per cycle.',
    },
    {
      step: 1,
      label: 'Cycle T+2: EX/MEM & MEM/WB Data Forwarding',
      stages: {
        IF: 'BEQ x4, x6, target',
        ID: 'LW x6, 0(x7)',
        EX: 'SUB x4, x1, x5',
        MEM: 'ADD x1, x2, x3',
        WB: 'ANDI x10, x11, 0xFF',
      },
      note: 'Forwarding unit routes updated x1 from EX/MEM stage directly into ALU operand input, bypassing register file writeback.',
    },
    {
      step: 2,
      label: 'Cycle T+3: 1-Cycle Load-Use Hazard Stall',
      stages: {
        IF: '[STALLED PC]',
        ID: 'ADD x8, x6, x9',
        EX: '[NOP BUBBLE]',
        MEM: 'LW x6, 0(x7)',
        WB: 'SUB x4, x1, x5',
      },
      note: 'Hazard Detection Unit detects ADD reading x6 immediately after LW. Pipeline freezes PC & IF/ID, injecting 1-cycle NOP bubble into EX.',
    },
    {
      step: 3,
      label: 'Cycle T+4: Branch Taken & Pipeline Flush',
      stages: {
        IF: '[FLUSH / NOP]',
        ID: '[FLUSH / NOP]',
        EX: 'BEQ x4, x6, target',
        MEM: 'ADD x8, x6, x9',
        WB: 'LW x6, 0(x7)',
      },
      note: 'Branch condition evaluates TRUE. Control unit issues flush signal; incorrect speculative instructions in IF and ID are cleared with NOPs.',
    },
  ];

  return (
    <article className="border border-zinc-800 bg-[#080b12] p-6 sm:p-10 relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
            PROJECT 02 // COMPUTER ARCHITECTURE
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-mono">{project.subtitle}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-cyan-400 block">{project.timeline}</span>
          <span className="text-xs font-mono text-zinc-500">SYNTHESIZED IN VIVADO</span>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {project.keyMetrics.map((metric, i) => (
          <div key={i} className="p-3 bg-zinc-950/70 border border-zinc-800/90 font-mono">
            <span className="text-[10px] text-zinc-500 block uppercase">{metric.label}</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold text-slate-100 tabular-nums">
                {metric.value}
              </span>
              {metric.unit && <span className="text-xs text-cyan-400">{metric.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive 5-Stage Pipeline Architecture Diagram */}
      <div className="relative space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-bold uppercase tracking-wider">
              5-STAGE RV32I PIPELINE ARCHITECTURE
            </span>
          </div>
          <span className="text-zinc-500">HOVER OR CLICK ANY STAGE TO INSPECT RTL MODULES</span>
        </div>

        {/* Pipeline Stage Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {pipelineStages.map((stage, idx) => {
            const isSelected = activeStage === idx;
            return (
              <div
                key={stage.code}
                onMouseEnter={() => setActiveStage(idx)}
                onClick={() => setActiveStage(idx)}
                className={`p-4 border transition-all duration-200 cursor-pointer font-mono ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-950/40 translate-y-[-2px]'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-bold px-2 py-0.5 border ${
                      isSelected
                        ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                        : 'border-zinc-800 text-slate-300 bg-zinc-900'
                    }`}
                  >
                    {stage.code}
                  </span>
                  <span className="text-[10px] text-zinc-500">STAGE 0{idx + 1}</span>
                </div>

                <div className="text-xs font-bold text-slate-100 mb-1">{stage.name}</div>
                <div className="text-[10px] text-zinc-500 leading-tight">{stage.registers}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage RTL Detail Inspector */}
        {activeStage !== null && (
          <div className="p-6 bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/60 text-cyan-300 font-bold">
                  {pipelineStages[activeStage].code}
                </span>
                <span className="text-slate-100 text-sm font-bold">
                  {pipelineStages[activeStage].name} Microarchitecture
                </span>
              </div>
              <span className="text-zinc-500 text-[11px]">
                {pipelineStages[activeStage].registers}
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {pipelineStages[activeStage].description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase block font-semibold">
                  Hardware Components & Sub-modules
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pipelineStages[activeStage].components.map((comp, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-slate-300 text-[11px]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase block font-semibold">
                  Hazard & Forwarding Response
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {pipelineStages[activeStage].hazardBehavior}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Instruction Pipeline & Hazard Stepper */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <span className="text-cyan-400 uppercase tracking-wider text-[10px] block">
              PIPELINE HAZARD & FORWARDING TRACER
            </span>
            <span className="text-slate-200 font-semibold text-sm">
              {instructionTrace[traceStep].label}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {instructionTrace.map((_, i) => (
              <button
                key={i}
                onClick={() => setTraceStep(i)}
                className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                  traceStep === i
                    ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                    : 'bg-zinc-900 text-slate-400 border-zinc-700 hover:text-slate-200'
                }`}
              >
                Case 0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stage Table */}
        <div className="grid grid-cols-5 gap-2 text-center">
          {(['IF', 'ID', 'EX', 'MEM', 'WB'] as const).map((stageCode) => {
            const currentInst = instructionTrace[traceStep].stages[stageCode];
            const isStall = currentInst.includes('STALL') || currentInst.includes('NOP') || currentInst.includes('FLUSH');
            return (
              <div
                key={stageCode}
                className={`p-2.5 border text-left ${
                  isStall
                    ? 'bg-rose-950/20 border-rose-800/60 text-rose-300'
                    : 'bg-zinc-900/60 border-zinc-800 text-slate-200'
                }`}
              >
                <div className="text-[10px] text-zinc-500 mb-1">{stageCode} STAGE</div>
                <div className="text-[11px] font-semibold truncate">{currentInst}</div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 text-slate-300 text-[11px] flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <span>{instructionTrace[traceStep].note}</span>
        </div>
      </div>

      {/* Full CV Technical Bullet Points */}
      <div className="space-y-3 mb-8">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
          VERIFIED TECHNICAL IMPLEMENTATION
        </span>
        {project.bulletPoints.map((point, idx) => (
          <div
            key={idx}
            className="p-4 bg-zinc-950/60 border border-zinc-800 text-sm text-slate-300 flex items-start gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>{point}</span>
          </div>
        ))}
      </div>

      {/* Technologies Footer */}
      <div className="relative pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">TECH USED:</span>
          <span>{project.technologies.join(' · ')}</span>
        </div>
        <div className="text-cyan-400">
          Validation: 42-Instruction Self-Checking Program on PYNQ-Z2
        </div>
      </div>
    </article>
  );
};

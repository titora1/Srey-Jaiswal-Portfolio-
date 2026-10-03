import React, { useState } from 'react';
import { CV_DATA } from '../data/cvData';
import { downloadCvPdf } from '../utils/generatePdf';
import { X, Printer, Download, Copy, Check, FileText, ExternalLink } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawResumeText = `Srey Jaiswal
Phone: +91 6371714883 | Email: shreyjaiswal2005@gmail.com | Location: Chennai, India
Specialization: Electronics Engineering (VLSI Design & Technology), SRM IST

EDUCATION
SRM Institute of Science and Technology, Chennai, India
B.Tech in Electronics Engineering (VLSI Design & Technology) | 2024 - 2028 (Expected)
CGPA: 9.08/10

Kenbridge School, Kota, India
CBSE Board: 76.2% | 2022 - 2024

EXPERIENCE
D.D. Iron & Steel (P) Ltd. | Jun - Jul 2026
Electrical Systems Intern
• Assisted in inspection and understanding of induction-furnace electrical systems, including transformers, control panels, induction coils, cooling circuits, and electrical measurements using multimeters and clamp meters.
• Led a four-member team on electrical quality-assurance measurements using multimeters and clamp meters.

Team 1.618, SRM IST | 2024 - Present
Electrical Team Member
• Contributed to HV/LV electrical integration, 13S14P accumulator and BMS systems, BSPD/shutdown circuitry, pre-charge, contactors, protection, and vehicle-level testing.

The Faith, Rourkela | Jun - Jul 2026
Social Development Coordinator Intern
• Organized food and clothing distribution drives and assisted people with disabilities during community and religious outreach activities.

PROJECTS
FPGA-Based INT8 Neural-Network Accelerator using a 4x4 Systolic Array | 2025 - 2026
Tech: SystemVerilog | Xilinx Vivado | PYNQ-Z2 | AXI | FPGA | Python | NumPy
• Designed and implemented a 4x4 output-stationary systolic-array accelerator with 16 pipelined MAC processing elements, supporting signed INT8 activations and weights with 32-bit accumulation.
• Developed shared-BRAM-based data exchange, local tile buffering, data scheduling, address generation, and FSM-based control for automated tiled matrix-multiplication execution.
• Integrated the accelerator with the ARM Cortex-A9 processing system on PYNQ-Z2 using AXI4-Lite control and AXI-accessible shared BRAM for hardware-software co-design.
• Extended the matrix engine for quantized neural-network inference using bias addition, ReLU activation, INT8 requantization/saturation, and a tiled 16-input x 16-output dense-layer demonstration.
• Implemented the accelerator at 100 MHz and validated functionality using self-checking SystemVerilog testbenches and Python/NumPy golden models, while evaluating latency, throughput, and FPGA resource utilization.

5-Stage Pipelined RV32I RISC-V Processor on PYNQ-Z2 | 2025 - 2026
Tech: Verilog | Xilinx Vivado | ModelSim | PYNQ-Z2 | RISC-V
• Designed and implemented a 32-bit RV32I processor using a 5-stage IF–ID–EX–MEM–WB pipeline with 4 pipeline registers and a 32 × 32-bit register file.
• Implemented EX/MEM and MEM/WB forwarding, 1-cycle load-use hazard stalls, and pipeline flushing with NOP insertion for 6 branch types, JAL, and JALR.
• Supported arithmetic, logic, shift, comparison, load/store, immediate, branch, jump, LUI, and AUIPC instructions with signed/unsigned byte, half-word, and word memory operations.
• Deployed the processor on the PYNQ-Z2 FPGA and validated correct register and memory outputs using a 42-instruction test program after synthesis, implementation, timing analysis, and bitstream generation in Vivado.

Formula Student Hybrid Vehicle Electrical System & BSPD | 2024 - 2025
Tech: Battery Systems | BMS | HV/LV Systems | Electrical Safety | KiCad
• Contributed to HV/LV electrical design and integration for a Formula Student hybrid vehicle.
• Worked on a 13S14P Li-ion accumulator (182 cells, 48.1 V nominal, 54.6 V max) with pre-charge, contactors, protection, monitoring, and isolation.
• Integrated the Orion Jr. 2 CAN BMS and supported BSPD/shutdown-system testing and vehicle-level electrical validation.

TECHNICAL SKILLS & INTERESTS
HDL & RTL: Verilog, SystemVerilog, RTL Design, Digital Logic Design
FPGA & EDA: Xilinx Vivado, ModelSim, PYNQ-Z2
Computer Architecture: RISC-V, RV32I, Pipelined Processors, Systolic Arrays
Hardware Interfaces: AXI4-Lite, BRAM, FPGA-ARM Hardware/Software Integration
Programming & OS: C, Python, NumPy, Assembly, Linux
Embedded Systems: Microcontroller Interfacing, Hardware–Software Integration
Hardware Design: PCB Design, KiCad
Electrical Systems: Battery Management Systems, HV/LV Systems, Electrical Safety

LANGUAGES
Spoken: English (Professional / Academic), Hindi (Native / Bilingual), Odia (Native / Regional), Tamil (Conversational / Working)
Hardware & Systems: SystemVerilog, Verilog, C, Python, RISC-V Assembly

ACHIEVEMENTS
• 1st Prize | Konnect Case Quest | Won 1st prize in the Case Quest competition at SRM IST (2026)
• 1st Prize | Technical Quiz, Mini Colloquium on Semiconductor Manufacturing Technologies | Secured 1st prize in the inter-college technical quiz at SRM IST (2026)
• City Topper | JEE Main, Rourkela | Recognized as JEE Main City Topper in Rourkela (2024)

VOLUNTEERING
• Technical Volunteer | VEGA Processor Workshop, SRM IST | Assisted with software setup, troubleshooting, and hands-on sessions using VEGA/ARIES RISC-V boards (2026)
• Volunteer | Dibya Dham Trust | Supported underprivileged communities and elderly residents (2020-Present)`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadCvPdf();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#090c14] border border-zinc-800 shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#06080d]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Curriculum Vitae // Srey Jaiswal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/60 transition-colors cursor-pointer"
              title="Print document or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/60 transition-colors cursor-pointer"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/60 transition-colors cursor-pointer"
              title="Copy text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-slate-100 hover:bg-zinc-800 transition-colors cursor-pointer ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-300 text-sm font-sans bg-[#080b12]">
          {/* Resume Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-zinc-800 pb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-none border border-zinc-700 bg-zinc-900 overflow-hidden relative">
              <img
                src={CV_DATA.personal.photoUrl}
                alt="Srey Jaiswal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 uppercase">
                Srey Jaiswal
              </h1>
              <div className="text-xs font-mono text-cyan-300">
                {CV_DATA.personal.title}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs font-mono text-slate-400 pt-1">
                <span>{CV_DATA.personal.phone}</span>
                <span>·</span>
                <a href={`mailto:${CV_DATA.personal.email}`} className="text-cyan-300 hover:underline">
                  {CV_DATA.personal.email}
                </a>
                <span>·</span>
                <span>LinkedIn</span>
                <span>·</span>
                <span>GitHub</span>
                <span>·</span>
                <span>Certificates</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Education
            </div>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <div className="font-bold text-slate-100">{CV_DATA.personal.university}</div>
                  <div className="text-xs text-slate-300">{CV_DATA.personal.degree}</div>
                  <div className="text-xs font-mono text-cyan-300 mt-0.5">CGPA: {CV_DATA.personal.cgpa}</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 sm:text-right">
                  <div>Chennai, India</div>
                  <div>{CV_DATA.personal.educationTimeline}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pt-1">
                <div>
                  <div className="font-bold text-slate-100">{CV_DATA.personal.highSchool}</div>
                  <div className="text-xs text-slate-400">{CV_DATA.personal.highSchoolBoard}</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 sm:text-right">
                  <div>Kota, India</div>
                  <div>{CV_DATA.personal.highSchoolTimeline}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Experience
            </div>
            <div className="space-y-5">
              {CV_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <span className="font-bold text-slate-100">{exp.company}</span>
                      <span className="text-xs text-slate-400 block">{exp.role}</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">{exp.timeline}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 leading-relaxed">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Projects
            </div>
            <div className="space-y-6">
              {CV_DATA.projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <span className="font-bold text-slate-100">{proj.title}</span>
                      <span className="text-xs font-mono text-cyan-300 block">
                        Tech used: {proj.technologies.join(' | ')}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">{proj.timeline}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 leading-relaxed">
                    {proj.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Interests */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Technical Skills & Interests
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {CV_DATA.skills.map((cat, idx) => (
                <div key={idx} className="p-2.5 bg-zinc-950/60 border border-zinc-800">
                  <span className="text-slate-100 font-bold block mb-0.5">{cat.category}:</span>
                  <span className="text-slate-400">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Languages
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-zinc-950/60 border border-zinc-800 space-y-1">
                <span className="text-slate-100 font-bold block">Spoken & Natural Languages:</span>
                <span className="text-slate-300">English (Professional / Academic), Hindi (Native / Bilingual), Odia (Native / Regional), Tamil (Conversational / Working)</span>
              </div>
              <div className="p-2.5 bg-zinc-950/60 border border-zinc-800 space-y-1">
                <span className="text-slate-100 font-bold block">Hardware & System Languages:</span>
                <span className="text-slate-300">SystemVerilog (Synthesizable RTL), Verilog (Datapaths), C (Embedded), Python (NumPy), Assembly (RV32I)</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Achievements
            </div>
            <ul className="list-disc list-outside pl-4 space-y-2 text-xs text-slate-300">
              {CV_DATA.achievements.map((ach, idx) => (
                <li key={idx}>
                  <strong className="text-slate-100">{ach.title} | {ach.event}:</strong> {ach.summary} ({ach.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Volunteering */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-zinc-800/80 pb-1">
              Volunteering
            </div>
            <ul className="list-disc list-outside pl-4 space-y-2 text-xs text-slate-300">
              {CV_DATA.volunteering.map((vol, idx) => (
                <li key={idx}>
                  <strong className="text-slate-100">{vol.role} | {vol.organization}:</strong> {vol.description} ({vol.timeline})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-[#06080d] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Source: Verified CV of Srey Jaiswal</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 underline cursor-pointer"
          >
            Close document
          </button>
        </div>
      </div>
    </div>
  );
};

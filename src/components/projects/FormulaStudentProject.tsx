import React, { useState, useEffect } from 'react';
import { CV_DATA } from '../../data/cvData';
import { Zap, ShieldCheck, CheckCircle2, Activity, BatteryCharging, AlertTriangle } from 'lucide-react';

export const FormulaStudentProject: React.FC = () => {
  const project = CV_DATA.projects[2];
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [systemState, setSystemState] = useState<'idle' | 'precharging' | 'armed' | 'bspd_test'>('armed');
  const [signalPulse, setSignalPulse] = useState(0);

  // Electrical signal loop animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalPulse((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const flowNodes = [
    {
      id: 'battery',
      title: 'BATTERY',
      spec: '13S14P Accumulator',
      details: '182 Li-ion cylindrical cells configured as 13 series, 14 parallel. 48.1V nominal, 54.6V maximum peak voltage. Galvanic isolation and thermal monitoring.',
    },
    {
      id: 'bms',
      title: 'BMS',
      spec: 'Orion Jr. 2 CAN',
      details: 'Continuous cell voltage & temperature telemetry, state of charge (SoC), active fault management, and CAN bus broadcasting to powertrain controller.',
    },
    {
      id: 'precharge',
      title: 'PRECHARGE',
      spec: 'Sequencing Resistor',
      details: 'Current-limiting precharge circuit protecting DC-bus capacitors from severe inrush current. Energizes prior to main positive contactor closing.',
    },
    {
      id: 'contactors',
      title: 'CONTACTORS',
      spec: 'HV Relays (AIR+ / AIR-)',
      details: 'Heavy-duty automotive contactors controlled by the vehicle safety state machine. Immediate galvanic disconnect in overcurrent or fault conditions.',
    },
    {
      id: 'hvlv',
      title: 'HV / LV',
      spec: 'DC-DC & Isolation',
      details: 'Strict physical and electrical segregation between High Voltage (48.1V traction pack) and Low Voltage (12V logic, sensors, and telemetry systems).',
    },
    {
      id: 'bspd',
      title: 'BSPD',
      spec: 'Brake Safety Plausibility',
      details: 'Brake System Plausibility Device. Hardwired analog safety circuit that trips the shutdown loop if hard braking and >5 kW motor power occur simultaneously.',
    },
    {
      id: 'vehicle',
      title: 'VEHICLE',
      spec: 'Hybrid Powertrain',
      details: 'Formula Student hybrid vehicle integration. Track testing, regenerative braking validation, and full shutdown loop compliance certification.',
    },
  ];

  return (
    <article className="border border-zinc-800 bg-[#080b12] p-6 sm:p-10 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
            PROJECT 03 // ELECTRICAL SYSTEMS & SAFETY
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-mono">{project.subtitle}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-cyan-400 block">{project.timeline}</span>
          <span className="text-xs font-mono text-zinc-500">TEAM 1.618 // FORMULA STUDENT</span>
        </div>
      </div>

      {/* Key Metrics */}
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

      {/* Electrical System Diagram: BATTERY → BMS → PRECHARGE → CONTACTORS → HV/LV → BSPD → VEHICLE */}
      <div className="relative space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-bold uppercase tracking-wider">
              POWERTRAIN ELECTRICAL & SAFETY SHUTDOWN ARCHITECTURE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">STATUS:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ARMED
            </span>
          </div>
        </div>

        {/* Animated Flow Track */}
        <div className="p-6 bg-[#06080e] border border-zinc-800 overflow-x-auto">
          {/* SVG Animated Circuit Wiring Diagram */}
          <div className="min-w-[760px] relative py-4">
            {/* SVG Connecting Traces with Animated Signal */}
            <svg
              className="w-full h-12 absolute top-8 left-0 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="40"
                y1="24"
                x2="720"
                y2="24"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="24"
                x2="720"
                y2="24"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="8 12"
                strokeDashoffset={-signalPulse * 4}
              />
            </svg>

            {/* Nodes along the flow */}
            <div className="grid grid-cols-7 gap-2 relative z-10">
              {flowNodes.map((node, index) => {
                const isHovered = activeStep === index;
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    className={`p-3 border transition-all duration-200 cursor-pointer font-mono text-center ${
                      isHovered
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                        : 'border-zinc-800 bg-zinc-950/90 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500 mb-1">0{index + 1}</div>
                    <div className="text-xs font-bold text-slate-100 mb-1">{node.title}</div>
                    <div className="text-[9px] text-cyan-400 font-mono leading-tight truncate">
                      {node.spec}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Detail Readout Box */}
          <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800/80 font-mono text-xs">
            {activeStep !== null ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-200 font-bold border-b border-zinc-800 pb-2">
                  <span>{flowNodes[activeStep].title} // {flowNodes[activeStep].spec}</span>
                  <span className="text-cyan-400">NODE 0{activeStep + 1} OF 07</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm pt-2 leading-relaxed font-sans">
                  {flowNodes[activeStep].details}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between text-zinc-400">
                <span>Click or hover any node above to inspect circuit schematics and protection rationale.</span>
                <span className="text-cyan-400">CURRENT LOOP: 48.1V NOMINAL DC</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* High-Voltage & Safety Telemetry Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 font-mono text-xs">
        <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <BatteryCharging className="w-4 h-4 text-cyan-400" />
            <span>ACCUMULATOR PACK ARCHITECTURE</span>
          </div>
          <ul className="space-y-1 text-slate-400 text-[11px]">
            <li>• Cell Format: 182 Cylindrical Li-ion Cells</li>
            <li>• Pack Topology: 13S14P Configuration</li>
            <li>• Nominal Voltage: 48.1 V DC</li>
            <li>• Maximum Charge Cutoff: 54.6 V DC</li>
          </ul>
        </div>

        <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>BMS & CAN BUS TELEMETRY</span>
          </div>
          <ul className="space-y-1 text-slate-400 text-[11px]">
            <li>• Integrated Orion Jr. 2 CAN BMS</li>
            <li>• 13-channel cell voltage monitoring</li>
            <li>• Thermal sensor array with over-temp cutoff</li>
            <li>• Isolation monitoring interlock (IMD)</li>
          </ul>
        </div>

        <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>BSPD & SAFETY INTERLOCKS</span>
          </div>
          <ul className="space-y-1 text-slate-400 text-[11px]">
            <li>• Hardwired analog Brake Plausibility Device</li>
            <li>• Pre-charge relay sequencing & resistor load</li>
            <li>• Dual AIR+ and AIR- safety contactors</li>
            <li>• Vehicle-level electrical validation testing</li>
          </ul>
        </div>
      </div>

      {/* Bullet Points from CV */}
      <div className="space-y-3 mb-8">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
          VERIFIED WORK & CONTRIBUTIONS
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
          Domain: High-Voltage Accumulators · Safety Circuitry · KiCad
        </div>
      </div>
    </article>
  );
};

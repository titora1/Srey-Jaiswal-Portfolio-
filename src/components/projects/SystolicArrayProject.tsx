import React, { useState, useEffect } from 'react';
import { CV_DATA } from '../../data/cvData';
import { Play, Pause, RotateCcw, SkipForward, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const SystolicArrayProject: React.FC = () => {
  const project = CV_DATA.projects[0];
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'specs' | 'codesign'>('visualizer');

  // Matrix multiplication sample data: A (4x4) * W (4x4)
  // Signed INT8 values
  const inputActivations = [
    [2, -1, 3, 1],
    [1, 4, -2, 0],
    [3, 0, 1, -2],
    [-2, 1, 4, 3],
  ];

  const inputWeights = [
    [1, 2, 0, -1],
    [3, -1, 2, 1],
    [0, 4, -1, 2],
    [2, 1, 3, 0],
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCycle((prev) => (prev < 8 ? prev + 1 : 0));
    }, 1200);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStep = () => {
    setIsRunning(false);
    setCycle((prev) => (prev < 8 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setIsRunning(false);
    setCycle(0);
  };

  // Compute PE state for current cycle
  // For an output-stationary 4x4 array, cycle k (0..3) computes product A[r, k] * W[k, c]
  const getPEState = (row: number, col: number) => {
    // Systolic delay skew: row delay + col delay in wavefront, or direct output-stationary clock
    const activeK = cycle - (row); // skewed activation
    const isActive = activeK >= 0 && activeK < 4;
    const k = Math.min(Math.max(activeK, 0), 3);

    const aVal = isActive ? inputActivations[row][k] : 0;
    const wVal = isActive ? inputWeights[k][col] : 0;
    const prod = aVal * wVal;

    // Running accumulated sum up to current cycle
    let accum = 0;
    for (let step = 0; step <= Math.min(cycle - row, 3); step++) {
      if (step >= 0) {
        accum += inputActivations[row][step] * inputWeights[step][col];
      }
    }

    // ReLU and saturation if cycle completed
    const isFinished = cycle - row >= 3;
    const reluVal = Math.max(0, accum);
    const requantVal = Math.min(127, Math.max(-128, Math.round(reluVal / 2)));

    return {
      isActive,
      aVal,
      wVal,
      prod,
      accum,
      isFinished,
      reluVal,
      requantVal,
    };
  };

  return (
    <article className="border border-zinc-800 bg-[#080b12] p-6 sm:p-10 relative overflow-hidden">
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Top Project Label */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
            PROJECT 01 // ACCELERATOR ARCHITECTURE
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-mono">{project.subtitle}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-cyan-400 block">{project.timeline}</span>
          <span className="text-xs font-mono text-zinc-500">PYNQ-Z2 (ZYNQ-7020)</span>
        </div>
      </div>

      {/* Technical Specifications Matrix */}
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

      {/* Interactive Tabs Header */}
      <div className="relative flex items-center gap-2 mb-6 border-b border-zinc-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeTab === 'visualizer'
              ? 'bg-zinc-900 border-cyan-500 text-cyan-300'
              : 'border-zinc-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          4×4 Systolic Array Visualizer
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeTab === 'specs'
              ? 'bg-zinc-900 border-cyan-500 text-cyan-300'
              : 'border-zinc-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          RTL & Verification Specs
        </button>
        <button
          onClick={() => setActiveTab('codesign')}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeTab === 'codesign'
              ? 'bg-zinc-900 border-cyan-500 text-cyan-300'
              : 'border-zinc-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          ARM Co-Design & AXI4-Lite
        </button>
      </div>

      {/* TAB 1: INTERACTIVE 4x4 SYSTOLIC ARRAY VISUALIZER */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-950/80 border border-zinc-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">CLOCK CYCLE:</span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-cyan-300 font-bold tabular-nums">
                T+{cycle} / T+8
              </span>
              <span className="text-zinc-500 hidden sm:inline">|</span>
              <span className="text-zinc-400 hidden sm:inline">
                {cycle === 0 && 'Pre-load & Tile Setup'}
                {cycle > 0 && cycle < 7 && `Wavefront MAC Execution (k=${Math.min(cycle, 3)})`}
                {cycle >= 7 && 'Tile Completed → ReLU & INT8 Saturation'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause' : 'Auto Step'}</span>
              </button>
              <button
                onClick={handleStep}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-700 text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Step</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4x4 Grid Container */}
          <div className="p-6 bg-[#06080e] border border-zinc-800 overflow-x-auto">
            {/* Array Column Labels (Weights streaming down) */}
            <div className="grid grid-cols-4 gap-3 max-w-[680px] mx-auto mb-2 text-center text-[10px] font-mono text-zinc-500">
              <div>COL 0 // W[k,0]</div>
              <div>COL 1 // W[k,1]</div>
              <div>COL 2 // W[k,2]</div>
              <div>COL 3 // W[k,3]</div>
            </div>

            {/* 4x4 Processing Elements */}
            <div className="grid grid-cols-4 gap-3 max-w-[680px] mx-auto">
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3].map((c) => {
                  const state = getPEState(r, c);
                  return (
                    <div
                      key={`pe-${r}-${c}`}
                      className={`p-3 border transition-all duration-200 font-mono text-left ${
                        state.isActive
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-950/40'
                          : state.isFinished
                          ? 'border-emerald-700/60 bg-emerald-950/10'
                          : 'border-zinc-800/80 bg-zinc-950/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] text-zinc-500 border-b border-zinc-800/80 pb-1 mb-1.5">
                        <span>PE[{r},{c}]</span>
                        <span className={state.isActive ? 'text-cyan-400 font-bold' : 'text-zinc-600'}>
                          {state.isActive ? 'MAC_ACTIVE' : state.isFinished ? 'DONE' : 'IDLE'}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-zinc-600">A × W:</span>
                          <span className="text-slate-200 tabular-nums">
                            {state.isActive ? `${state.aVal} × ${state.wVal}` : '—'}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-zinc-600">ACC:</span>
                          <span className={state.isActive ? 'text-cyan-300 tabular-nums' : 'text-slate-300 tabular-nums'}>
                            {state.accum}
                          </span>
                        </div>

                        {/* Post-processing if finished */}
                        {state.isFinished && (
                          <div className="pt-1 mt-1 border-t border-zinc-800/60 flex justify-between text-[9px] text-emerald-400">
                            <span>INT8_OUT:</span>
                            <span className="font-bold tabular-nums">0x{Math.abs(state.requantVal).toString(16).padStart(2, '0').toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Post-Processing Pipeline Banner */}
            <div className="max-w-[680px] mx-auto mt-6 p-3 bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-3">
              <span className="text-zinc-500">POST-ARRAY INFERENCE PIPELINE:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-cyan-300">
                  + Bias Addition
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-cyan-300">
                  ReLU Activation
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-cyan-300">
                  INT8 Requant & Saturation
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPECS & BULLETS */}
      {activeTab === 'specs' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {project.architectureOverview}
          </p>

          <div className="space-y-3 pt-2">
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
        </div>
      )}

      {/* TAB 3: ARM CO-DESIGN & AXI4-LITE */}
      {activeTab === 'codesign' && (
        <div className="p-6 bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-cyan-400 uppercase block mb-1">HARDWARE / SOFTWARE CO-DESIGN MAPPING</span>
            <h4 className="text-sm font-semibold text-slate-100">
              PYNQ-Z2 Zynq-7020 Processing System (PS) ↔ Programmable Logic (PL)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="text-slate-200 font-bold block">AXI4-Lite Control Registers</span>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li><strong className="text-cyan-300">0x00 [CTL_REG]:</strong> START_TILE (bit 0), RESET_ACC (bit 1)</li>
                <li><strong className="text-cyan-300">0x04 [STAT_REG]:</strong> IDLE (bit 0), DONE (bit 1), BUSY (bit 2)</li>
                <li><strong className="text-cyan-300">0x08 [TILE_CFG]:</strong> M_DIM, K_DIM, N_DIM (16×16 Tiling)</li>
                <li><strong className="text-cyan-300">0x0C [SCALE_REG]:</strong> Fixed-Point INT8 Requant Multiplier</li>
              </ul>
            </div>

            <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="text-slate-200 font-bold block">AXI-Accessible Shared BRAM</span>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li><strong className="text-cyan-300">0x4000_0000:</strong> Input Activation Buffer (16×16 signed INT8)</li>
                <li><strong className="text-cyan-300">0x4000_1000:</strong> Filter Weight Buffer (16×16 signed INT8)</li>
                <li><strong className="text-cyan-300">0x4000_2000:</strong> Output Result Buffer (16×16 Quantized INT8)</li>
                <li><strong className="text-cyan-300">Dual-Port BRAM:</strong> Port A (ARM Cortex-A9), Port B (Systolic FSM)</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-zinc-900/30 border border-zinc-800/80 text-slate-400 text-[11px]">
            <span className="text-cyan-400 font-semibold">Verification Pipeline: </span>
            Self-checking SystemVerilog testbenches verified with random and corner-case stimuli. Python NumPy golden reference model matched bit-exact outputs across tiled 16×16 matrix operations.
          </div>
        </div>
      )}

      {/* Technologies Footer */}
      <div className="relative mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">TECH USED:</span>
          <span>{project.technologies.join(' · ')}</span>
        </div>
        <div className="text-cyan-400">
          Target: 100 MHz @ PYNQ-Z2 FPGA
        </div>
      </div>
    </article>
  );
};

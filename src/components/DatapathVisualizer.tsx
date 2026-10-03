import React, { useState, useEffect } from 'react';

export const DatapathVisualizer: React.FC = () => {
  const [clockCycle, setClockCycle] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setClockCycle((prev) => (prev + 1) % 64);
    }, 450);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Simulated FPGA CLB blocks
  const clbNodes = [
    { id: 0, label: 'CLB[0,0]', type: 'LUT6 + FF', signal: 'INT8_ACT_PIPE' },
    { id: 1, label: 'CLB[0,1]', type: 'MAC_DSP48', signal: 'A[i] * W[k]' },
    { id: 2, label: 'CLB[1,0]', type: 'AXI_LITE_FSM', signal: 'ARREADY / RVALID' },
    { id: 3, label: 'CLB[1,1]', type: 'BRAM_CTL', signal: 'ADDR_GEN_16x16' },
  ];

  return (
    <div className="relative border border-zinc-800 bg-[#090d16]/80 p-5 overflow-hidden">
      {/* Subtle background coordinate grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />

      {/* Header bar of visualizer */}
      <div className="relative flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-300 font-semibold tracking-wider">HARDWARE FABRIC // PYNQ-Z2</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>CLK: <strong className="text-cyan-300 font-mono">100 MHz</strong></span>
          <span className="hidden sm:inline">CYCLE: <strong className="text-slate-200 tabular-nums">#{clockCycle.toString().padStart(3, '0')}</strong></span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-2 py-0.5 border border-zinc-700 bg-zinc-900 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* SVG Circuit Traces & Datapath Interconnect */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[300px]">
        <svg
          viewBox="0 0 460 220"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for active signal trace */}
            <linearGradient id="cyanTrace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Routing Grid Lines */}
          <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="3 3">
            <line x1="50" y1="20" x2="410" y2="20" />
            <line x1="50" y1="110" x2="410" y2="110" />
            <line x1="50" y1="200" x2="410" y2="200" />
            <line x1="110" y1="10" x2="110" y2="210" />
            <line x1="230" y1="10" x2="230" y2="210" />
            <line x1="350" y1="10" x2="350" y2="210" />
          </g>

          {/* Clock Distribution Tree (Tree lines) */}
          <path
            d="M 230 15 L 230 55 M 230 55 L 110 55 M 230 55 L 350 55 M 110 55 L 110 80 M 350 55 L 350 80 M 110 140 L 110 165 M 350 140 L 350 165"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Animated Clock / Data Pulse travelling through bus */}
          <circle
            cx={50 + ((clockCycle * 6) % 360)}
            cy={110}
            r="3"
            fill="#38bdf8"
            filter="url(#glow)"
          />
          <circle
            cx={230}
            cy={15 + ((clockCycle * 4) % 190)}
            r="2.5"
            fill="#38bdf8"
            filter="url(#glow)"
          />

          {/* Active Interconnect Wire paths */}
          <path
            d="M 160 110 L 200 110 L 200 60 L 240 60"
            stroke="#0284c7"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 2"
            strokeDashoffset={-clockCycle * 2}
          />
          <path
            d="M 240 160 L 280 160 L 280 110 L 320 110"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 2"
            strokeDashoffset={-clockCycle * 2}
          />

          {/* Node 0: CLB[0,0] Top-Left */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode(0)}
          >
            <rect
              x="60"
              y="70"
              width="100"
              height="60"
              fill={activeNode === 0 ? '#0c2238' : '#0c121e'}
              stroke={activeNode === 0 ? '#38bdf8' : '#1e293b'}
              strokeWidth="1"
            />
            <text x="70" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">CLB[0,0] // LUT6</text>
            <text x="70" y="106" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="600">INT8_ACT_PIPE</text>
            <text x="70" y="120" fill="#38bdf8" fontSize="8" fontFamily="monospace">SYNC VALID: 1</text>
          </g>

          {/* Node 1: DSP48 MAC Top-Right */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode(1)}
          >
            <rect
              x="300"
              y="70"
              width="100"
              height="60"
              fill={activeNode === 1 ? '#0c2238' : '#0c121e'}
              stroke={activeNode === 1 ? '#38bdf8' : '#1e293b'}
              strokeWidth="1"
            />
            <text x="310" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">MAC DSP48E1</text>
            <text x="310" y="106" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="600">A[i] × W[k] + P</text>
            <text x="310" y="120" fill="#38bdf8" fontSize="8" fontFamily="monospace">32b ACCUMULATE</text>
          </g>

          {/* Center Switch Matrix */}
          <g>
            <rect
              x="195"
              y="85"
              width="70"
              height="50"
              fill="#060b13"
              stroke="#0369a1"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text x="202" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace">SWITCH BOX</text>
            <text x="202" y="122" fill="#64748b" fontSize="8" fontFamily="monospace">AXI4-LITE BUS</text>
          </g>

          {/* Node 2: AXI FSM Bottom-Left */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode(2)}
          >
            <rect
              x="60"
              y="145"
              width="100"
              height="55"
              fill={activeNode === 2 ? '#0c2238' : '#0c121e'}
              stroke={activeNode === 2 ? '#38bdf8' : '#1e293b'}
              strokeWidth="1"
            />
            <text x="70" y="165" fill="#94a3b8" fontSize="9" fontFamily="monospace">CONTROL FSM</text>
            <text x="70" y="180" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="600">AXI_READY_ST</text>
            <text x="70" y="193" fill="#10b981" fontSize="8" fontFamily="monospace">STATE: RUN_TILE</text>
          </g>

          {/* Node 3: BRAM Address Gen Bottom-Right */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode(3)}
          >
            <rect
              x="300"
              y="145"
              width="100"
              height="55"
              fill={activeNode === 3 ? '#0c2238' : '#0c121e'}
              stroke={activeNode === 3 ? '#38bdf8' : '#1e293b'}
              strokeWidth="1"
            />
            <text x="310" y="165" fill="#94a3b8" fontSize="9" fontFamily="monospace">SHARED BRAM</text>
            <text x="310" y="180" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="600">ADDR 0x4000_00</text>
            <text x="310" y="193" fill="#38bdf8" fontSize="8" fontFamily="monospace">TILE: 16×16 DENSE</text>
          </g>
        </svg>
      </div>

      {/* Real-time bus telemetry footer */}
      <div className="mt-3 pt-3 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-400">
        <div>
          <span className="text-zinc-500 block">AXI4_LITE:</span>
          <span className="text-emerald-400">HANDSHAKE_OK</span>
        </div>
        <div>
          <span className="text-zinc-500 block">PROCESSING:</span>
          <span className="text-slate-200">16×16 TILE DENSE</span>
        </div>
        <div>
          <span className="text-zinc-500 block">QUANTIZATION:</span>
          <span className="text-cyan-400">INT8 REQUANT</span>
        </div>
        <div>
          <span className="text-zinc-500 block">TARGET FPGA:</span>
          <span className="text-slate-200">XILINX ZYNQ-7020</span>
        </div>
      </div>
    </div>
  );
};

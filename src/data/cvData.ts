export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  timeline: string;
  category: string;
  technologies: string[];
  keyMetrics: { label: string; value: string; unit?: string }[];
  bulletPoints: string[];
  architectureOverview: string;
}

export interface ExperienceData {
  company: string;
  role: string;
  timeline: string;
  location?: string;
  description: string[];
}

export interface AchievementData {
  title: string;
  event: string;
  year: string;
  organization: string;
  summary: string;
}

export interface VolunteeringData {
  role: string;
  organization: string;
  timeline: string;
  description: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  proficiency: number; // 0 to 100
  note: string;
  category: 'spoken' | 'technical';
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const CV_DATA = {
  personal: {
    name: 'Srey Jaiswal',
    photoUrl: '/src/assets/images/srey_jaiswal_portrait_1791055990395.jpg',
    title: 'Electronics Engineering · VLSI · FPGA · Computer Architecture',
    statement:
      'Undergraduate engineer focused on digital hardware architectures, RTL design in SystemVerilog/Verilog, FPGA prototyping on Xilinx PYNQ-Z2, pipelined RISC-V processor cores, and systolic neural network acceleration.',
    phone: '+91 6371714883',
    email: 'shreyjaiswal2005@gmail.com',
    location: 'Chennai, India',
    degree: 'B.Tech in Electronics Engineering (VLSI Design & Technology)',
    university: 'SRM Institute of Science and Technology',
    educationTimeline: '2024 – 2028 (Expected)',
    cgpa: '9.08/10',
    highSchool: 'Kenbridge School, Kota, India',
    highSchoolBoard: 'CBSE Board: 76.2%',
    highSchoolTimeline: '2022 – 2024',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:shreyjaiswal2005@gmail.com',
    },
  },

  languages: {
    spoken: [
      {
        name: 'English',
        level: 'Professional Working & Academic',
        proficiency: 95,
        note: 'Technical research papers, architecture specifications, presentations, and team documentation.',
        category: 'spoken',
      },
      {
        name: 'Hindi',
        level: 'Native / Bilingual',
        proficiency: 100,
        note: 'First language fluency, verbal and written technical communication.',
        category: 'spoken',
      },
      {
        name: 'Odia',
        level: 'Native / Regional',
        proficiency: 90,
        note: 'Regional native language of home district (Rourkela, Odisha).',
        category: 'spoken',
      },
      {
        name: 'Tamil',
        level: 'Conversational / Working',
        proficiency: 75,
        note: 'Everyday conversational proficiency and campus collaboration in Chennai, Tamil Nadu.',
        category: 'spoken',
      },
    ] as LanguageItem[],
    technical: [
      {
        name: 'SystemVerilog',
        level: 'Advanced / Synthesizable RTL',
        proficiency: 92,
        note: 'IEEE 1800 synthesizable RTL, AXI4-Lite controllers, self-checking testbenches.',
        category: 'technical',
      },
      {
        name: 'Verilog',
        level: 'Advanced / Processor Datapaths',
        proficiency: 94,
        note: 'IEEE 1364 digital logic, 5-stage RV32I pipelining, forwarding & hazard units.',
        category: 'technical',
      },
      {
        name: 'C',
        level: 'Proficient / Embedded Systems',
        proficiency: 88,
        note: 'Embedded software, register-level hardware programming, microcontrollers.',
        category: 'technical',
      },
      {
        name: 'Python / NumPy',
        level: 'Proficient / Hardware Verification',
        proficiency: 86,
        note: 'Golden matrix-multiplication reference models, PYNQ-Z2 API driver scripts.',
        category: 'technical',
      },
      {
        name: 'RISC-V Assembly',
        level: 'Working Knowledge / Microarchitecture',
        proficiency: 85,
        note: 'RV32I 32-bit machine instruction sequences, branch delay, register validation.',
        category: 'technical',
      },
    ] as LanguageItem[],
  },

  progression: [
    { step: '01', title: 'Architecture', detail: 'ISA specification, datapath design & algorithmic scheduling' },
    { step: '02', title: 'RTL', detail: 'Synthesizable SystemVerilog/Verilog with ModelSim verification' },
    { step: '03', title: 'FPGA', detail: 'Vivado synthesis, timing closure, bitstreams on PYNQ-Z2' },
    { step: '04', title: 'System', detail: 'ARM Cortex-A9 AXI4-Lite co-design & vehicle electrical integration' },
  ],

  projects: [
    {
      id: 'systolic-accelerator',
      title: 'FPGA-Based INT8 Neural-Network Accelerator',
      subtitle: '4×4 Output-Stationary Systolic Array with ARM AXI4-Lite Co-Design',
      timeline: '2025 – 2026',
      category: 'Hardware Acceleration / VLSI',
      technologies: ['SystemVerilog', 'Xilinx Vivado', 'PYNQ-Z2', 'AXI', 'FPGA', 'Python', 'NumPy'],
      keyMetrics: [
        { label: 'Clock Frequency', value: '100', unit: 'MHz' },
        { label: 'Array Topology', value: '4 × 4', unit: 'Grid' },
        { label: 'Processing Elements', value: '16', unit: 'MACs' },
        { label: 'Precision Format', value: 'INT8 / 32-bit', unit: 'Accum' },
      ],
      architectureOverview:
        'A synthesizable output-stationary 2D systolic array engineered to accelerate dense matrix operations and quantized neural-network inference at 100 MHz. The design couples 16 pipelined MAC units with shared-BRAM ping-pong buffers, automated FSM scheduling, and AXI4-Lite register mapping for high-throughput ARM Cortex-A9 hardware/software co-execution.',
      bulletPoints: [
        'Designed and implemented a 4×4 output-stationary systolic-array accelerator with 16 pipelined MAC processing elements, supporting signed INT8 activations and weights with 32-bit accumulation.',
        'Developed shared-BRAM-based data exchange, local tile buffering, data scheduling, address generation, and FSM-based control for automated tiled matrix-multiplication execution.',
        'Integrated the accelerator with the ARM Cortex-A9 processing system on PYNQ-Z2 using AXI4-Lite control and AXI-accessible shared BRAM for hardware-software co-design.',
        'Extended the matrix engine for quantized neural-network inference using bias addition, ReLU activation, INT8 requantization/saturation, and a tiled 16-input × 16-output dense-layer demonstration.',
        'Implemented the accelerator at 100 MHz and validated functionality using self-checking SystemVerilog testbenches and Python/NumPy golden models, while evaluating latency, throughput, and FPGA resource utilization.',
      ],
    },
    {
      id: 'riscv-processor',
      title: '5-Stage Pipelined RV32I RISC-V Processor',
      subtitle: 'Fully Forwarded 32-Bit Microarchitecture on Xilinx PYNQ-Z2',
      timeline: '2025 – 2026',
      category: 'Computer Architecture / RTL',
      technologies: ['Verilog', 'Xilinx Vivado', 'ModelSim', 'PYNQ-Z2', 'RISC-V'],
      keyMetrics: [
        { label: 'Pipeline Stages', value: '5', unit: 'IF-ID-EX-MEM-WB' },
        { label: 'Instruction Set', value: 'RV32I', unit: '32-Bit' },
        { label: 'Register File', value: '32 × 32', unit: 'Registers' },
        { label: 'Hazard Handling', value: '1-Cycle Stall', unit: 'Forwarding' },
      ],
      architectureOverview:
        'A clean-room 32-bit RV32I pipelined processor core featuring hardware hazard detection, full EX/MEM and MEM/WB data forwarding paths, branch penalty minimization with pipeline flushing, and support for all byte/half/word memory variants.',
      bulletPoints: [
        'Designed and implemented a 32-bit RV32I processor using a 5-stage IF–ID–EX–MEM–WB pipeline with 4 pipeline registers and a 32 × 32-bit register file.',
        'Implemented EX/MEM and MEM/WB forwarding, 1-cycle load-use hazard stalls, and pipeline flushing with NOP insertion for 6 branch types, JAL, and JALR.',
        'Supported arithmetic, logic, shift, comparison, load/store, immediate, branch, jump, LUI, and AUIPC instructions with signed/unsigned byte, half-word, and word memory operations.',
        'Deployed the processor on the PYNQ-Z2 FPGA and validated correct register and memory outputs using a 42-instruction test program after synthesis, implementation, timing analysis, and bitstream generation in Vivado.',
      ],
    },
    {
      id: 'formula-student',
      title: 'Formula Student Hybrid Vehicle Electrical System & BSPD',
      subtitle: '13S14P Li-ion Accumulator, Orion Jr. 2 CAN BMS & Safety Shutdown Loop',
      timeline: '2024 – 2025',
      category: 'Electrical Systems / Embedded Safety',
      technologies: ['Battery Systems', 'BMS', 'HV/LV Systems', 'Electrical Safety', 'KiCad'],
      keyMetrics: [
        { label: 'Accumulator Cells', value: '182', unit: 'Cells (13S14P)' },
        { label: 'Nominal Voltage', value: '48.1', unit: 'V' },
        { label: 'Peak Voltage', value: '54.6', unit: 'V' },
        { label: 'BMS Integration', value: 'Orion Jr. 2', unit: 'CAN Bus' },
      ],
      architectureOverview:
        'High-voltage and low-voltage electrical architecture engineered for a Formula Student hybrid powertrain. Features pre-charge resistor sequencing, contactor state machines, galvanic isolation, CAN-integrated battery monitoring, and hardwired Brake System Plausibility Device (BSPD) interlocks.',
      bulletPoints: [
        'Contributed to HV/LV electrical design and integration for a Formula Student hybrid vehicle.',
        'Worked on a 13S14P Li-ion accumulator (182 cells, 48.1 V nominal, 54.6 V max) with pre-charge, contactors, protection, monitoring, and isolation.',
        'Integrated the Orion Jr. 2 CAN BMS and supported BSPD/shutdown-system testing and vehicle-level electrical validation.',
      ],
    },
  ] as ProjectData[],

  experience: [
    {
      company: 'D.D. Iron & Steel (P) Ltd.',
      role: 'Electrical Systems Intern',
      timeline: 'Jun – Jul 2026',
      description: [
        'Assisted in inspection and understanding of induction-furnace electrical systems, including transformers, control panels, induction coils, cooling circuits, and electrical measurements using multimeters and clamp meters.',
        'Led a four-member team on electrical quality-assurance measurements using multimeters and clamp meters.',
      ],
    },
    {
      company: 'Team 1.618, SRM IST',
      role: 'Electrical Team Member',
      timeline: '2024 – Present',
      description: [
        'Contributed to HV/LV electrical integration, 13S14P accumulator and BMS systems, BSPD/shutdown circuitry, pre-charge, contactors, protection, and vehicle-level testing.',
      ],
    },
    {
      company: 'The Faith, Rourkela',
      role: 'Social Development Coordinator Intern',
      timeline: 'Jun – Jul 2026',
      description: [
        'Organized food and clothing distribution drives and assisted people with disabilities during community and religious outreach activities.',
      ],
    },
  ] as ExperienceData[],

  skills: [
    {
      category: 'HDL & RTL',
      skills: ['Verilog', 'SystemVerilog', 'RTL Design', 'Digital Logic Design'],
    },
    {
      category: 'FPGA & EDA',
      skills: ['Xilinx Vivado', 'ModelSim', 'PYNQ-Z2'],
    },
    {
      category: 'Computer Architecture',
      skills: ['RISC-V', 'RV32I', 'Pipelined Processors', 'Systolic Arrays'],
    },
    {
      category: 'Hardware Interfaces',
      skills: ['AXI4-Lite', 'BRAM', 'FPGA–ARM Hardware/Software Integration'],
    },
    {
      category: 'Programming & OS',
      skills: ['C', 'Python', 'NumPy', 'Assembly', 'Linux'],
    },
    {
      category: 'Embedded Systems',
      skills: ['Microcontroller Interfacing', 'Hardware–Software Integration'],
    },
    {
      category: 'Hardware Design',
      skills: ['PCB Design', 'KiCad'],
    },
    {
      category: 'Electrical Systems',
      skills: ['Battery Management Systems', 'HV/LV Systems', 'Electrical Safety'],
    },
  ] as SkillCategory[],

  achievements: [
    {
      title: '1st Prize',
      event: 'Konnect Case Quest',
      organization: 'SRM IST',
      year: '2026',
      summary: 'Won 1st prize in the Case Quest competition at SRM IST, demonstrating case analysis, strategic thinking, and presentation skills.',
    },
    {
      title: '1st Prize',
      event: 'Technical Quiz, Mini Colloquium on Semiconductor Manufacturing Technologies',
      organization: 'SRM IST',
      year: '2026',
      summary: 'Secured 1st prize in the inter-college technical quiz at SRM IST focusing on modern semiconductor manufacturing processes.',
    },
    {
      title: 'City Topper',
      event: 'JEE Main',
      organization: 'Rourkela',
      year: '2024',
      summary: 'Recognized as JEE Main City Topper in Rourkela among all participating engineering aspirants.',
    },
  ] as AchievementData[],

  volunteering: [
    {
      role: 'Technical Volunteer',
      organization: 'VEGA Processor Workshop, SRM IST',
      timeline: '2026',
      description: 'Assisted with software setup, troubleshooting, and hands-on sessions using VEGA/ARIES RISC-V boards.',
    },
    {
      role: 'Volunteer',
      organization: 'Dibya Dham Trust',
      timeline: '2020 – Present',
      description: 'Supported underprivileged communities and elderly residents through old-age home assistance, city cleanliness drives, and community service activities.',
    },
  ] as VolunteeringData[],
};

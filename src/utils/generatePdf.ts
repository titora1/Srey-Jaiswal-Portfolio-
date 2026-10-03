import { jsPDF } from 'jspdf';

export function downloadCvPdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Helper for Section Titles
  const addSectionHeader = (title: string) => {
    checkPageBreak(30);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;
  };

  // Helper for Bullet items
  const addBullet = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const bulletChar = '•';
    const indent = 12;
    const splitText = doc.splitTextToSize(text, contentWidth - indent);
    checkPageBreak(splitText.length * 12 + 4);

    doc.text(bulletChar, margin + 2, y);
    doc.text(splitText, margin + indent, y);
    y += splitText.length * 11.5 + 4;
  };

  // PAGE 1 HEADER
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text('Srey Jaiswal', pageWidth / 2, y, { align: 'center' });
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const contactLine = '+91 6371714883  |  shreyjaiswal2005@gmail.com  |  LinkedIn  |  GitHub  |  Certificates';
  doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
  y += 6;

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 1. EDUCATION
  addSectionHeader('EDUCATION');

  // SRM IST
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('SRM Institute of Science and Technology', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Chennai, India', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(51, 65, 85);
  doc.text('B.Tech in Electronics Engineering (VLSI Design & Technology)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('2024 - 2028 (Expected)', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(2, 132, 199);
  doc.text('CGPA: 9.08/10', margin, y);
  y += 14;

  // Kenbridge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Kenbridge School', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Kota, India', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('CBSE Board: 76.2%', margin, y);
  doc.text('2022-2024', pageWidth - margin, y, { align: 'right' });
  y += 10;

  // 2. EXPERIENCE
  addSectionHeader('EXPERIENCE');

  // D.D. Iron & Steel
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('D.D. Iron & Steel (P) Ltd.', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Jun - Jul 2026', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 41, 59);
  doc.text('Electrical Systems Intern', margin, y);
  y += 11;

  addBullet('Assisted in inspection and understanding of induction-furnace electrical systems, including transformers, control panels, induction coils, cooling circuits, and electrical measurements using multimeters and clamp meters.');
  addBullet('Led a four-member team on electrical quality-assurance measurements using multimeters and clamp meters.');
  y += 4;

  // Team 1.618
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Team 1.618, SRM IST', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('2024 - Present', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 41, 59);
  doc.text('Electrical Team Member', margin, y);
  y += 11;

  addBullet('Contributed to HV/LV electrical integration, 13S14P accumulator and BMS systems, BSPD/shutdown circuitry, pre-charge, contactors, protection, and vehicle-level testing.');
  y += 4;

  // The Faith
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('The Faith, Rourkela', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Jun - Jul 2026', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 41, 59);
  doc.text('Social Development Coordinator Intern', margin, y);
  y += 11;

  addBullet('Organized food and clothing distribution drives and assisted people with disabilities during community and religious outreach activities.');
  y += 6;

  // 3. PROJECTS
  addSectionHeader('PROJECTS');

  // Project 1: Systolic
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('FPGA-Based INT8 Neural-Network Accelerator using a 4x4 Systolic Array', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('2025-2026', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(2, 132, 199);
  doc.text('Tech used: SystemVerilog | Xilinx Vivado | PYNQ-Z2 | AXI | FPGA | Python | NumPy', margin, y);
  y += 11;

  addBullet('Designed and implemented a 4x4 output-stationary systolic-array accelerator with 16 pipelined MAC processing elements, supporting signed INT8 activations and weights with 32-bit accumulation.');
  addBullet('Developed shared-BRAM-based data exchange, local tile buffering, data scheduling, address generation, and FSM-based control for automated tiled matrix-multiplication execution.');
  addBullet('Integrated the accelerator with the ARM Cortex-A9 processing system on PYNQ-Z2 using AXI4-Lite control and AXI-accessible shared BRAM for hardware-software co-design.');
  addBullet('Extended the matrix engine for quantized neural-network inference using bias addition, ReLU activation, INT8 requantization/saturation, and a tiled 16-input x 16-output dense-layer demonstration.');
  addBullet('Implemented the accelerator at 100 MHz and validated functionality using self-checking SystemVerilog testbenches and Python/NumPy golden models, while evaluating latency, throughput, and FPGA resource utilization.');
  y += 6;

  // Project 2: RISC-V
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('5-Stage Pipelined RV32I RISC-V Processor on PYNQ-Z2', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('2025-2026', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(2, 132, 199);
  doc.text('Tech used: Verilog | Xilinx Vivado | ModelSim | PYNQ-Z2 | RISC-V', margin, y);
  y += 11;

  addBullet('Designed and implemented a 32-bit RV32I processor using a 5-stage IF-ID-EX-MEM-WB pipeline with 4 pipeline registers and a 32 × 32-bit register file.');
  addBullet('Implemented EX/MEM and MEM/WB forwarding, 1-cycle load-use hazard stalls, and pipeline flushing with NOP insertion for 6 branch types, JAL, and JALR.');
  addBullet('Supported arithmetic, logic, shift, comparison, load/store, immediate, branch, jump, LUI, and AUIPC instructions with signed/unsigned byte, half-word, and word memory operations.');
  addBullet('Deployed the processor on the PYNQ-Z2 FPGA and validated correct register and memory outputs using a 42-instruction test program after synthesis, implementation, timing analysis, and bitstream generation in Vivado.');
  y += 6;

  // Project 3: Formula Student
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Formula Student Hybrid Vehicle Electrical System & BSPD', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('2024-2025', pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(2, 132, 199);
  doc.text('Tech used: Battery Systems | BMS | HV/LV Systems | Electrical Safety | KiCad', margin, y);
  y += 11;

  addBullet('Contributed to HV/LV electrical design and integration for a Formula Student hybrid vehicle.');
  addBullet('Worked on a 13S14P Li-ion accumulator (182 cells, 48.1 V nominal, 54.6 V max) with pre-charge, contactors, protection, monitoring, and isolation.');
  addBullet('Integrated the Orion Jr. 2 CAN BMS and supported BSPD/shutdown-system testing and vehicle-level electrical validation.');
  y += 8;

  // PAGE BREAK FOR PAGE 2
  doc.addPage();
  y = margin;

  // TECHNICAL SKILLS & INTERESTS
  addSectionHeader('TECHNICAL SKILLS & INTERESTS');

  const skillsList = [
    { label: 'HDL & RTL', val: 'Verilog, SystemVerilog, RTL Design, Digital Logic Design' },
    { label: 'FPGA & EDA', val: 'Xilinx Vivado, ModelSim, PYNQ-Z2' },
    { label: 'Computer Architecture', val: 'RISC-V, RV32I, Pipelined Processors, Systolic Arrays' },
    { label: 'Hardware Interfaces', val: 'AXI4-Lite, BRAM, FPGA-ARM Hardware/Software Integration' },
    { label: 'Programming & OS', val: 'C, Python, NumPy, Assembly, Linux' },
    { label: 'Embedded Systems', val: 'Microcontroller Interfacing, Hardware-Software Integration' },
    { label: 'Hardware Design', val: 'PCB Design, KiCad' },
    { label: 'Electrical Systems', val: 'Battery Management Systems, HV/LV Systems, Electrical Safety' },
  ];

  skillsList.forEach((sk) => {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(sk.label + ':', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(sk.val, margin + 125, y);
    y += 14;
  });
  y += 6;

  // LANGUAGES
  addSectionHeader('LANGUAGES');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Spoken & Natural:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('English (Professional/Academic), Hindi (Native), Odia (Native), Tamil (Conversational)', margin + 125, y);
  y += 14;

  // ACHIEVEMENTS
  addSectionHeader('ACHIEVEMENTS');
  addBullet('1st Prize | Konnect Case Quest | Won 1st prize in the Case Quest competition at SRM IST, demonstrating case analysis, strategic thinking, and presentation skills (2026)');
  addBullet('1st Prize | Technical Quiz, Mini Colloquium on Semiconductor Manufacturing Technologies | Secured 1st prize in the inter-college technical quiz at SRM IST (2026)');
  addBullet('City Topper | JEE Main, Rourkela | Recognized as JEE Main City Topper in Rourkela (2024)');
  y += 6;

  // VOLUNTEERING
  addSectionHeader('VOLUNTEERING');
  addBullet('Technical Volunteer | VEGA Processor Workshop, SRM IST | Assisted with software setup, troubleshooting, and hands-on sessions using VEGA/ARIES RISC-V boards (2026)');
  addBullet('Volunteer | Dibya Dham Trust | Supported underprivileged communities and elderly residents through old-age home assistance, city cleanliness drives, and community service activities (2020-Present)');

  // Save the PDF
  doc.save('Srey_Jaiswal_CV.pdf');
}

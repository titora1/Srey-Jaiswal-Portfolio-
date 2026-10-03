import React, { useState } from 'react';
import { CV_DATA } from '../data/cvData';
import { CertificatesModal } from './CertificatesModal';
import { downloadCvPdf } from '../utils/generatePdf';
import { Mail, Phone, Github, Linkedin, Award, Copy, Check, FileText, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  onOpenCvModal: () => void;
  onOpenCertificatesModal?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCvModal, onOpenCertificatesModal }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CV_DATA.personal.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(CV_DATA.personal.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleOpenCertificates = () => {
    if (onOpenCertificatesModal) {
      onOpenCertificatesModal();
    } else {
      setCertModalOpen(true);
    }
  };

  return (
    <>
      {/* 9. CV CTA SECTION */}
      <section className="py-20 border-b border-zinc-800/80 bg-[#07090f] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="border border-zinc-800 bg-[#090d16] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                COMPREHENSIVE DOSSIER
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                WANT THE FULL TECHNICAL BREAKDOWN?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Access complete technical specifications, course modules, testbench architectures,
                and verified industrial credentials in standard printable format.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => downloadCvPdf()}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer"
                title="Download Srey Jaiswal CV (PDF)"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <button
                onClick={onOpenCvModal}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-mono font-medium uppercase tracking-wider text-slate-300 bg-zinc-900 border border-zinc-700/80 hover:border-cyan-500/80 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>View Full CV</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="py-24 border-b border-zinc-800/80 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading & Availability */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                // Direct Communications & Inquiries
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-100 leading-tight">
                LET'S BUILD
                <br />
                SOMETHING.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                Open to discussions regarding VLSI design internships, FPGA acceleration projects,
                digital verification, and computer architecture research opportunities.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-950 font-mono text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CURRENT LOCATION: SRM IST, CHENNAI, INDIA</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-6 space-y-4">
              {/* Email Card */}
              <div className="border border-zinc-800 bg-[#080b12] p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">EMAIL</span>
                    <a
                      href={`mailto:${CV_DATA.personal.email}`}
                      className="text-sm font-mono text-slate-100 hover:text-cyan-400 transition-colors font-medium break-all"
                    >
                      {CV_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1 text-xs font-mono border border-zinc-800 bg-zinc-950 text-slate-300 hover:border-zinc-700 transition-colors cursor-pointer shrink-0"
                  title="Copy email"
                >
                  {emailCopied ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3 text-zinc-400" /> Copy
                    </span>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="border border-zinc-800 bg-[#080b12] p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">PHONE</span>
                    <span className="text-sm font-mono text-slate-100 font-medium">
                      {CV_DATA.personal.phone}
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="px-2.5 py-1 text-xs font-mono border border-zinc-800 bg-zinc-950 text-slate-300 hover:border-zinc-700 transition-colors cursor-pointer shrink-0"
                  title="Copy phone"
                >
                  {phoneCopied ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3 text-zinc-400" /> Copy
                    </span>
                  )}
                </button>
              </div>

              {/* Social / Profiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-zinc-800 bg-[#080b12] p-4 flex items-center justify-between hover:border-cyan-500/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-200">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-zinc-800 bg-[#080b12] p-4 flex items-center justify-between hover:border-cyan-500/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-200">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                <button
                  onClick={handleOpenCertificates}
                  className="border border-zinc-800 bg-[#080b12] p-4 flex items-center justify-between hover:border-cyan-500/60 transition-colors group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-200">Certificates</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Certificates Modal */}
      <CertificatesModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </>
  );
};

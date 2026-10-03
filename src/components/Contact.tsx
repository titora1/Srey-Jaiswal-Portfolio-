import React, { useState } from 'react';
import { CV_DATA } from '../data/cvData';
import { CertificatesModal } from './CertificatesModal';
import { downloadCvPdf } from '../utils/generatePdf';
import { Mail, Phone, Github, Linkedin, Award, Copy, Check, FileText, ArrowUpRight, MessageCircle } from 'lucide-react';

interface ContactProps {
  onOpenCvModal: () => void;
  onOpenCertificatesModal?: () => void;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.27 15.03 3.81 13.49 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.25 7.15C9.07 7.15 8.78 7.22 8.53 7.49C8.28 7.76 7.57 8.43 7.57 9.8C7.57 11.17 8.57 12.49 8.71 12.68C8.85 12.87 10.68 15.69 13.48 16.9C14.15 17.19 14.67 17.36 15.07 17.49C15.74 17.7 16.35 17.67 16.84 17.6C17.38 17.52 18.51 16.92 18.74 16.27C18.97 15.62 18.97 15.07 18.9 14.96C18.83 14.85 18.65 14.78 18.38 14.65C18.11 14.52 16.78 13.87 16.53 13.78C16.28 13.69 16.1 13.64 15.92 13.91C15.74 14.18 15.22 14.78 15.06 14.96C14.9 15.14 14.74 15.16 14.47 15.03C14.2 14.9 13.33 14.61 12.3 13.69C11.5 12.98 10.96 12.1 10.82 11.87C10.68 11.64 10.81 11.52 10.94 11.39C11.06 11.27 11.21 11.08 11.35 10.92C11.49 10.76 11.53 10.64 11.62 10.46C11.71 10.28 11.67 10.12 11.6 9.99C11.53 9.86 11 8.56 10.77 8.02C10.55 7.49 10.33 7.56 10.16 7.56C10 7.56 9.82 7.55 9.64 7.55C9.46 7.55 9.25 7.15 9.25 7.15Z" />
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ onOpenCvModal, onOpenCertificatesModal }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [whatsappCopied, setWhatsappCopied] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const whatsappNumber = '8852004883';
  const whatsappDisplay = '+91 8852004883';
  const whatsappMessage = 'Hi Srey! I visited your website';
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

  const copyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappDisplay);
    setWhatsappCopied(true);
    setTimeout(() => setWhatsappCopied(false), 2000);
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
      <section id="contact" className="py-24 relative bg-black/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading & Availability */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                  // Direct Communications
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
                  LET'S BUILD<br />
                  SOMETHING.
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                  Open to discussions regarding VLSI design internships, FPGA acceleration projects,
                  digital verification, and computer architecture research opportunities.
                </p>

                <div className="pt-2 flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-950 font-mono text-xs text-slate-300 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CURRENT LOCATION: SRM IST, CHENNAI, INDIA</span>
                  </div>

                  {/* Instant WhatsApp CTA banner */}
                  <div className="pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      title="Direct Chat on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp Me</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-6 space-y-4">
              {/* WhatsApp Dedicated Card */}
              <div className="border border-emerald-500/40 bg-[#06140b] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group hover:border-emerald-400/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                      WHATSAPP
                    </span>
                    <span className="text-sm font-mono text-slate-100 font-bold block pt-0.5">
                      {whatsappDisplay}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400 uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                    title="Send WhatsApp message"
                  >
                    <span>WhatsApp Me</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={copyWhatsapp}
                    className="px-2.5 py-2 text-xs font-mono border border-emerald-500/30 bg-emerald-950/40 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/60 transition-colors cursor-pointer"
                    title="Copy WhatsApp number"
                  >
                    {whatsappCopied ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3 text-emerald-400" /> Copy
                      </span>
                    )}
                  </button>
                </div>
              </div>

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

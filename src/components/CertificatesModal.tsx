import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, X, Check, Link as LinkIcon, ShieldCheck } from 'lucide-react';

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  category: string;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({ isOpen, onClose }) => {
  const defaultCertLink = 'https://drive.google.com';
  const [certLink, setCertLink] = useState(() => {
    try {
      return localStorage.getItem('srey_cert_link') || defaultCertLink;
    } catch (e) {
      return defaultCertLink;
    }
  });

  const [isEditingLink, setIsEditingLink] = useState(false);
  const [inputLink, setInputLink] = useState(certLink);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const certificates: CertificateItem[] = [
    {
      id: 'cert-1',
      title: 'Technical Certification — VEGA Processor Workshop',
      issuer: 'SRM Institute of Science and Technology · VEGA / ARIES RISC-V',
      year: '2026',
      category: 'Computer Architecture & RISC-V',
      description:
        'Certified technical facilitation and hands-on deployment using indigenous VEGA/ARIES RISC-V processor development boards, toolchain setup, and embedded software verification.',
    },
    {
      id: 'cert-2',
      title: '1st Prize Award — Semiconductor Manufacturing Technologies Quiz',
      issuer: 'Mini Colloquium on Semiconductor Manufacturing Technologies, SRM IST',
      year: '2026',
      category: 'VLSI & Semiconductor Fabrication',
      description:
        'Secured 1st Prize in the inter-collegiate technical competition covering advanced lithography, wafer processing, CMOS fabrication steps, and semiconductor packaging.',
    },
    {
      id: 'cert-3',
      title: '1st Prize Award — Konnect Case Quest',
      issuer: 'SRM Institute of Science and Technology',
      year: '2026',
      category: 'Strategic Problem Solving',
      description:
        'Awarded 1st place in strategic case analysis, technical defense, and engineering solution modeling.',
    },
    {
      id: 'cert-4',
      title: 'City Topper Merit Recognition — JEE Main',
      issuer: 'National Testing Agency (NTA) · Rourkela Center',
      year: '2024',
      category: 'Academic Distinction',
      description:
        'Recognized as the City Topper for JEE Main in Rourkela, achieving top standing across mathematics, physics, and chemistry.',
    },
  ];

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    let formatted = inputLink.trim();
    if (formatted && !formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    setCertLink(formatted);
    try {
      localStorage.setItem('srey_cert_link', formatted);
    } catch (e) {
      // ignore
    }
    setIsEditingLink(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#090c14] border border-zinc-800 shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#06080d]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Verified Certificates & Academic Honors
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={certLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-cyan-400 text-black font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
            >
              <span>Open Online Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-slate-100 hover:bg-zinc-800 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#080b12]">
          {/* Custom Link Configuration Bar */}
          <div className="p-4 bg-zinc-950/80 border border-zinc-800 font-mono text-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Certificate Drive URL:</span>
              </span>

              {!isEditingLink ? (
                <div className="flex items-center gap-2">
                  <a
                    href={certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline max-w-[280px] sm:max-w-md truncate"
                  >
                    {certLink}
                  </a>
                  <button
                    onClick={() => {
                      setInputLink(certLink);
                      setIsEditingLink(true);
                    }}
                    className="text-zinc-500 hover:text-slate-200 underline text-[11px] cursor-pointer ml-1"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingLink(false)}
                  className="text-zinc-400 hover:text-slate-200 text-[11px] cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            {isEditingLink && (
              <form onSubmit={handleSaveLink} className="pt-2 flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Paste your Google Drive or Credly certificate folder link"
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-cyan-400 text-black font-bold uppercase text-[11px] hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  Save URL
                </button>
              </form>
            )}

            {savedSuccess && (
              <div className="flex items-center gap-1 text-emerald-400 text-[10px]">
                <Check className="w-3 h-3" />
                <span>Certificate destination link updated!</span>
              </div>
            )}
          </div>

          {/* Certificate Cards */}
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 bg-zinc-950/60 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <span className="text-cyan-400 uppercase text-[10px] tracking-wider">
                    {cert.category}
                  </span>
                  <span className="text-zinc-500 tabular-nums">{cert.year}</span>
                </div>

                <div className="text-base font-bold text-slate-100 tracking-tight">
                  {cert.title}
                </div>

                <div className="text-xs font-mono text-cyan-300">
                  {cert.issuer}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-[#06080d] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified against official records from SRM IST & NTA</span>
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

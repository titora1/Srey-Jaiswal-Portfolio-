import React, { useState, useEffect } from 'react';
import { CV_DATA } from '../data/cvData';
import { downloadCvPdf } from '../utils/generatePdf';
import { FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Languages', href: '#languages' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#06080d]/90 backdrop-blur-md border-zinc-800/80 shadow-lg shadow-black/40'
          : 'bg-[#06080d]/60 backdrop-blur-sm border-zinc-800/40'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="font-mono text-cyan-400 font-semibold tracking-wider text-xs px-1.5 py-0.5 border border-cyan-500/30 bg-cyan-950/20">
            RTL//HW
          </span>
          <span className="tracking-tight uppercase">{CV_DATA.personal.name}</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-slate-100 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => downloadCvPdf()}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 bg-zinc-900 border border-zinc-700/80 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-zinc-800/80 transition-all duration-150 cursor-pointer"
            title="Download Srey Jaiswal CV (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => downloadCvPdf()}
            aria-label="Download CV"
            className="px-2.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/40 bg-zinc-900"
            title="Download CV (PDF)"
          >
            CV
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#080b12] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono text-cyan-300 border border-cyan-500/40 bg-zinc-900"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

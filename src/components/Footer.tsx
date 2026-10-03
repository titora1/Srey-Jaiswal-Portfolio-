import React from 'react';
import { CV_DATA } from '../data/cvData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#05070c] border-t border-zinc-900 text-xs font-mono text-zinc-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-slate-200 font-bold uppercase tracking-wider text-sm">
            {CV_DATA.personal.name}
          </div>
          <div className="text-zinc-400">
            {CV_DATA.personal.title}
          </div>
          <div className="text-[11px] text-zinc-600">
            SRM Institute of Science and Technology · B.Tech VLSI Design & Technology (2024–2028)
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[11px] text-zinc-600">
            DATA STRICTLY GROUNDED IN VERIFIED CURRICULUM VITAE
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[10px]">TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

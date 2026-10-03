import React from 'react';
import { CV_DATA } from '../data/cvData';
import { HeartHandshake, Users } from 'lucide-react';

export const Volunteering: React.FC = () => {
  return (
    <section id="volunteering" className="py-20 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Community & Technical Outreach
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            VOLUNTEERING & OUTREACH.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Contributing to processor ecosystem literacy and community welfare initiatives.
          </p>
        </div>

        {/* 2 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CV_DATA.volunteering.map((item, idx) => (
            <div
              key={idx}
              className="border border-zinc-800/90 bg-[#080b12] p-6 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                <span className="text-slate-200 font-bold text-sm">
                  {item.role}
                </span>
                <span className="text-cyan-400 tabular-nums">{item.timeline}</span>
              </div>

              <div className="text-xs font-mono text-cyan-300">
                {item.organization}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

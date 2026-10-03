import React from 'react';
import { CV_DATA } from '../data/cvData';
import { Award, Trophy, Star } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Competitive & Academic Recognition
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            HONORS & ACHIEVEMENTS.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Distinctions across semiconductor domain competitions, technical case analyses, and national examinations.
          </p>
        </div>

        {/* Minimal Grid of 3 Verified Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CV_DATA.achievements.map((item, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-[#080b12] p-8 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-colors relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{item.title}</span>
                  </span>
                  <span className="text-zinc-500 tabular-nums">{item.year}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 tracking-tight leading-snug">
                  {item.event}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>VENUE / ORG:</span>
                <span className="text-slate-300 font-medium">{item.organization}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

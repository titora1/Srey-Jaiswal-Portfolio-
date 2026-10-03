import React from 'react';
import { CV_DATA } from '../data/cvData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Industry & Team Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            EXPERIENCE.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Practical hardware testing, team leadership, and physical system validation across industrial
            furnaces, collegiate electric vehicles, and community outreach.
          </p>
        </div>

        {/* Clean Vertical Engineering Timeline */}
        <div className="relative border-l border-zinc-800/80 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
          {CV_DATA.experience.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-cyan-400 group-hover:bg-cyan-950 transition-colors" />

              <div className="border border-zinc-800 bg-[#080b12] p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-mono text-cyan-300 font-medium mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.timeline}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  {item.description.map((desc, dIdx) => (
                    <div key={dIdx} className="text-sm text-slate-300 leading-relaxed flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

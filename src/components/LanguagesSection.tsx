import React, { useState, useEffect } from 'react';
import { CV_DATA, LanguageItem } from '../data/cvData';
import { Globe, Terminal, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const LanguagesSection: React.FC = () => {
  // Load saved custom languages from localStorage or fallback to default
  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(() => {
    try {
      const saved = localStorage.getItem('srey_spoken_languages_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return CV_DATA.languages.spoken;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newLangName, setNewLangName] = useState('');
  const [newLangLevel, setNewLangLevel] = useState('Conversational / Working');
  const [newLangNote, setNewLangNote] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('srey_spoken_languages_v2', JSON.stringify(spokenLanguages));
    } catch (e) {
      // ignore
    }
  }, [spokenLanguages]);

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLangName.trim()) return;

    const newItem: LanguageItem = {
      name: newLangName.trim(),
      level: newLangLevel,
      proficiency: 100,
      note: newLangNote.trim() || 'Spoken and written communication.',
      category: 'spoken',
    };

    setSpokenLanguages([...spokenLanguages, newItem]);
    setNewLangName('');
    setNewLangNote('');
    setIsAdding(false);
  };

  const handleRemoveLanguage = (name: string) => {
    setSpokenLanguages(spokenLanguages.filter((l) => l.name !== name));
  };

  return (
    <section id="languages" className="py-24 border-b border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            // Linguistic & Notation Proficiencies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            LANGUAGES I KNOW.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Spoken languages for academic research and international engineering collaboration,
            paired with synthesizable hardware description and low-level system languages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spoken / Natural Languages (WITHOUT percentage bars) */}
          <div className="lg:col-span-6 border border-zinc-800 bg-[#080b12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-zinc-900 border border-zinc-800 text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 tracking-tight">
                    Spoken & Natural Languages
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">
                    ACADEMIC & PROFESSIONAL COLLABORATION
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-zinc-700 bg-zinc-900 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAdding ? 'Cancel' : 'Add Language'}</span>
              </button>
            </div>

            {/* Add Language Form */}
            {isAdding && (
              <form
                onSubmit={handleAddLanguage}
                className="p-4 bg-zinc-950 border border-cyan-500/30 space-y-3 font-mono text-xs"
              >
                <div className="text-cyan-400 font-semibold uppercase text-[10px]">
                  ADD SPOKEN LANGUAGE
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Language Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. German, French, Telugu"
                    value={newLangName}
                    onChange={(e) => setNewLangName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Proficiency Level</label>
                  <select
                    value={newLangLevel}
                    onChange={(e) => setNewLangLevel(e.target.value)}
                    className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Native / Bilingual">Native / Bilingual</option>
                    <option value="Professional Working & Academic">Professional Working & Academic</option>
                    <option value="Conversational / Working">Conversational / Working</option>
                    <option value="Elementary / Basic">Elementary / Basic</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Context / Usage Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Campus conversations, reading literature"
                    value={newLangNote}
                    onChange={(e) => setNewLangNote(e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                >
                  Save Language
                </button>
              </form>
            )}

            {/* Spoken List without percentage bars */}
            <div className="space-y-4">
              {spokenLanguages.map((lang, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-zinc-950/70 border border-zinc-800/90 space-y-2.5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-100 text-base tracking-tight">
                      {lang.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-300 font-medium px-2 py-0.5 border border-zinc-800 bg-zinc-900/90">
                        {lang.level}
                      </span>
                      {spokenLanguages.length > 4 && (
                        <button
                          onClick={() => handleRemoveLanguage(lang.name)}
                          className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                          title="Remove language"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {lang.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Formal Hardware & Computing Languages */}
          <div className="lg:col-span-6 border border-zinc-800 bg-[#080b12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-zinc-900 border border-zinc-800 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 tracking-tight">
                    Hardware & Computing Languages
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">
                    SYNTHESIS, VERIFICATION & BARE-METAL
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono text-cyan-400">5 DIALECTS</span>
            </div>

            <div className="space-y-4">
              {CV_DATA.languages.technical.map((lang, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-zinc-950/70 border border-zinc-800/90 space-y-2 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-100 text-sm font-mono">
                      {lang.name}
                    </span>

                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 border border-zinc-800 bg-zinc-900/90">
                      {lang.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono leading-relaxed pt-1">
                    {lang.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footnote Strip */}
        <div className="mt-8 p-4 bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>LINGUISTIC CODESIGN: English, Hindi, Odia & Tamil with specialized HDL syntax fluency.</span>
          </div>
          <span className="text-zinc-500">SRM IST · CHENNAI, TAMIL NADU</span>
        </div>
      </div>
    </section>
  );
};

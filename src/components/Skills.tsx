import React, { useState } from 'react';
import {
  Code,
  Server,
  Terminal,
  Database,
  Wrench,
  Palette,
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { SkillItem, SkillCategory } from '../data/portfolioData';

interface SkillsProps {
  skills: SkillItem[];
  currentlyLearning: { title: string; area: string; description: string; progress: string }[];
}

export const Skills: React.FC<SkillsProps> = ({ skills, currentlyLearning }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(skills[0]);

  const categories: (string | SkillCategory)[] = [
    'All',
    'Frontend Development',
    'Backend Development',
    'Programming Languages',
    'Database Management',
    'Development Tools',
    'UI/UX Design'
  ];

  const getCategoryIcon = (category: SkillCategory | string) => {
    switch (category) {
      case 'Frontend Development':
        return <Code className="w-4 h-4 text-blue-500" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-indigo-500" />;
      case 'Programming Languages':
        return <Terminal className="w-4 h-4 text-cyan-500" />;
      case 'Database Management':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'Development Tools':
        return <Wrench className="w-4 h-4 text-amber-500" />;
      case 'UI/UX Design':
        return <Palette className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: SkillItem['status']) => {
    switch (status) {
      case 'Used in Projects':
        return (
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Used in Projects</span>
          </span>
        );
      case 'Familiar':
        return (
          <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            <span>Familiar</span>
          </span>
        );
      case 'Learning':
        return (
          <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Currently Learning</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesQuery =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="skills" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Skills, Languages & Tooling
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Organized into 6 core technical domains. Click on any technology card to view detailed notes on its purpose, project applications, and how I learned it.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or tag..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 w-fit max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main Content: Interactive Skill Grid + Selected Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skills Grid (7 cols on large desktop) */}
          <div className="lg:col-span-7">
            {filteredSkills.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400 animate-fadeIn">
                No matching skills found for "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredSkills.map((skill) => {
                  const isSelected = activeSkill.name === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => setActiveSkill(skill)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveSkill(skill);
                        }
                      }}
                      className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md ${
                        isSelected
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-xs ring-1 ring-blue-500'
                          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-blue-400/50 dark:hover:border-blue-500/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-200">
                              {getCategoryIcon(skill.category)}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {skill.name}
                            </h3>
                          </div>
                          <div>{getStatusBadge(skill.status)}</div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                          {skill.purpose}
                        </p>
                      </div>

                      {/* Tag strip */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-1">
                        <div className="flex flex-wrap items-center gap-1">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          inspect &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skill Detail Inspector Card (5 cols on large desktop) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Info className="w-3.5 h-3.5" />
                  <span>Technology Inspector</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Selected Item</span>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    {getCategoryIcon(activeSkill.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {activeSkill.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeSkill.category}
                    </p>
                  </div>
                </div>
                <div className="mt-2.5">{getStatusBadge(activeSkill.status)}</div>
              </div>

              {/* Purpose */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Purpose & Capabilities:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeSkill.purpose}
                </p>
              </div>

              {/* How Justin used or learned it */}
              <div className="space-y-1.5 text-xs p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block">
                  How I Use / Practice It:
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeSkill.howUsedOrLearned}
                </p>
              </div>

              {/* Relevant Topics */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                  Core Topics Mastered / Practiced:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span>Domain: {activeSkill.category}</span>
                <span className="font-mono text-[10px]">Grade 12 Verified</span>
              </div>
            </div>
          </div>

        </div>

        {/* Currently Exploring / Roadmap Section */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <BookOpen className="w-4 h-4" />
            <span>Proactive Academic Roadmap</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Currently Exploring & Deepening
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 mb-6 max-w-2xl">
            To prepare for computer science and IT undergraduate study, I am proactively exploring core computing concepts and modern engineering practices outside school hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentlyLearning.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                    <span>{item.area}</span>
                    <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  {item.progress}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

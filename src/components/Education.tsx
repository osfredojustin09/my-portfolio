import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Code2,
  Users,
  Award,
  ShieldAlert,
  Sparkles,
  Milestone as MilestoneIcon,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { TimelineEntry, Milestone } from '../data/portfolioData';

interface EducationProps {
  timeline: TimelineEntry[];
  milestones?: Milestone[];
  onOpenCustomizer: () => void;
}

export const Education: React.FC<EducationProps> = ({
  timeline,
  milestones = [],
  onOpenCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'timeline'>('milestones');

  const getTypeIcon = (type: TimelineEntry['type']) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'Coursework':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'Projects':
        return <Code2 className="w-4 h-4 text-cyan-500" />;
      case 'Extracurricular':
        return <Users className="w-4 h-4 text-emerald-500" />;
      case 'Certificates':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section id="education" className="py-20 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Academic Growth & Developmental Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              My Learning Journey & Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              An authentic chronological record tracing how curiosity in software grew into practical web engineering, algorithmic focus, and university preparation.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCustomizer}
            className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors self-start sm:self-auto shrink-0"
          >
            Update Journey Entries
          </button>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-10 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('milestones')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'milestones'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MilestoneIcon className="w-3.5 h-3.5 text-blue-500" />
            <span>Learning Milestones (7 Key Steps)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Academic & Extracurricular Timeline</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: 7 LEARNING MILESTONES (Requested in Prompt Section 8)
            ========================================================================= */}
        {activeTab === 'milestones' && (
          <div className="relative pl-6 sm:pl-8 ml-3 sm:ml-4 border-l-2 border-blue-200 dark:border-blue-900/60 space-y-8 animate-fadeIn">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                
                {/* Milestone Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold font-mono text-blue-600 dark:text-blue-400">
                    {idx + 1}
                  </span>
                </div>

                {/* Milestone Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                      {m.year}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Step 0{idx + 1} of 07
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {m.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {m.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            TAB 2: ACADEMIC & COURSEWORK TIMELINE
            ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="relative pl-6 sm:pl-8 ml-3 sm:ml-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 animate-fadeIn">
            {timeline.map((item) => (
              <div key={item.id} className="relative group">
                
                {/* Timeline Indicator Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800">
                        {getTypeIcon(item.type)}
                      </div>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {item.type}
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {item.period}
                      </span>
                    </div>

                    {!item.isVerified && (
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                        Placeholder / In Progress
                      </span>
                    )}
                  </div>

                  {/* Title & Context */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className={`text-xs font-medium mt-0.5 ${item.institutionOrContext.startsWith('[') ? 'text-amber-600 dark:text-amber-400 font-mono text-[11px]' : 'text-slate-600 dark:text-slate-400'}`}>
                    {item.institutionOrContext}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2.5">
                    {item.description}
                  </p>

                  {/* Skills Acquired Tags */}
                  {item.skillsAcquired.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 mr-1">Skills Developed:</span>
                      {item.skillsAcquired.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verification Ethics Notice */}
        <div className="mt-12 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-850/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
          <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Ethical Stance: </span>
            This portfolio does not claim fabricated corporate internships or unverified awards. High school academic dedication, active self-education, and real independent coding projects form the bedrock of Justin Osfredo's preparation for university-level computing.
          </div>
        </div>

      </div>
    </section>
  );
};

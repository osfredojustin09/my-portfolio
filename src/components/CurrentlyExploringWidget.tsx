import React from 'react';
import { BookOpen, Compass, Code, Target, ArrowUpRight, Sparkles } from 'lucide-react';

interface CurrentlyExploringProps {
  onOpenProductivityApp?: () => void;
  onOpenCustomizer?: () => void;
}

export const CurrentlyExploringWidget: React.FC<CurrentlyExploringProps> = ({
  onOpenProductivityApp,
  onOpenCustomizer,
}) => {
  const items = [
    {
      label: 'Currently Learning',
      value: 'Data Structures & Algorithms',
      detail: 'Big-O analysis, binary trees, recursion & algorithmic efficiency in Python',
      icon: BookOpen,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60',
      borderColor: 'border-blue-200/60 dark:border-blue-900/40',
    },
    {
      label: 'Currently Exploring',
      value: 'Relational Database Schema Design',
      detail: 'Normalization rules (1NF-3NF), indexing, and complex SQL joins with MySQL',
      icon: Compass,
      color: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/60',
      borderColor: 'border-cyan-200/60 dark:border-cyan-900/40',
    },
    {
      label: 'Current Project',
      value: 'Student Productivity Dashboard',
      detail: 'Comprehensive academic manager with calendar, Pomodoro chime, and task CRUD',
      icon: Code,
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60',
      borderColor: 'border-indigo-200/60 dark:border-indigo-900/40',
      action: onOpenProductivityApp ? 'Launch App' : undefined,
      onAction: onOpenProductivityApp,
    },
    {
      label: 'Next Learning Goal',
      value: 'University CS Admissions & TypeScript',
      detail: 'Rigorous portfolio preparation, competitive entry standards & strict typing',
      icon: Target,
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/60',
      borderColor: 'border-purple-200/60 dark:border-purple-900/40',
    },
  ];

  return (
    <section className="py-8 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Widget Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Live Radar: Current Focus & Learning Activities
            </span>
          </div>

          {onOpenCustomizer && (
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Update Status
            </button>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl bg-white dark:bg-slate-900 border ${item.borderColor} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>
                    <div className={`p-1.5 rounded-lg ${item.bgColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {item.value}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {item.action && item.onAction && (
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={item.onAction}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{item.action}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

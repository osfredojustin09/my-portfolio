import React, { useState } from 'react';
import { Target, Flag, Calendar, Sparkles, CheckCircle2, Clock, Activity, ArrowUpRight } from 'lucide-react';
import { GoalItem, ActivityUpdate } from '../data/portfolioData';

interface GoalsAndUpdatesProps {
  goals: GoalItem[];
  updates: ActivityUpdate[];
}

export const GoalsAndUpdates: React.FC<GoalsAndUpdatesProps> = ({ goals, updates }) => {
  const [selectedHorizon, setSelectedHorizon] = useState<'All' | 'Short-Term' | 'Long-Term'>('All');

  const filteredGoals = goals.filter((g) => {
    if (selectedHorizon === 'All') return true;
    if (selectedHorizon === 'Short-Term') return g.horizon.startsWith('Short-Term');
    return g.horizon.startsWith('Long-Term');
  });

  return (
    <section className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Split: Goals on left (7 cols), Latest Updates on right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Goals & Aspirations (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Future Ambition</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Goals & Aspirations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Structured milestones guiding my transition from high school self-study into university computer science and the tech industry.
              </p>
            </div>

            {/* Horizon Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-fit text-xs">
              <button
                type="button"
                onClick={() => setSelectedHorizon('All')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedHorizon === 'All'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All Horizons
              </button>
              <button
                type="button"
                onClick={() => setSelectedHorizon('Short-Term')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedHorizon === 'Short-Term'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Short-Term (Uni Prep)
              </button>
              <button
                type="button"
                onClick={() => setSelectedHorizon('Long-Term')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedHorizon === 'Long-Term'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Long-Term (Industry)
              </button>
            </div>

            {/* Goals Cards */}
            <div className="space-y-3.5">
              {filteredGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {goal.horizon}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800">
                      Target: {goal.targetYear}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {goal.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Updates & Learning Activity Log (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Live Activity Feed</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Recent Updates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Recent coding milestones, coursework updates, and portfolio enhancements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
                {updates.map((update, idx) => (
                  <div key={idx} className={`${idx === 0 ? '' : 'pt-4'} space-y-1.5`}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {update.badge}
                      </span>
                      <span className="font-mono text-slate-400">{update.date}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {update.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {update.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to Connect */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
                <span>Continuously updated as projects progress</span>
                <a
                  href="#contact"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Compass,
  FileCode,
  Layers,
  CheckCircle,
  Repeat,
  ArrowRight,
  Sparkles,
  Workflow
} from 'lucide-react';

interface DevelopmentProcessProps {
  processSteps: { step: string; title: string; desc: string; deliverables: string }[];
}

export const DevelopmentProcess: React.FC<DevelopmentProcessProps> = ({ processSteps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-4 h-4 text-blue-500" />;
      case 1:
        return <Layers className="w-4 h-4 text-indigo-500" />;
      case 2:
        return <FileCode className="w-4 h-4 text-cyan-500" />;
      case 3:
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 4:
        return <Repeat className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5" />
            <span>Engineering Methodology</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            How I Approach Building Software
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Writing code is only one phase of solving problems. Through high school coursework and personal projects, I follow a disciplined 5-stage lifecycle to turn vague ideas into reliable, well-tested applications.
          </p>
        </div>

        {/* 5-Step Process Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {processSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveStep(idx);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border text-left flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-500 dark:border-blue-500 shadow-sm ring-1 ring-blue-500'
                      : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className={`text-xs sm:text-sm font-bold ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Deep-Dive Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    {getStepIcon(activeStep)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
                      Phase {processSteps[activeStep].step}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {processSteps[activeStep].title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  0{activeStep + 1} / 0{processSteps.length}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white block">
                  Purpose & Thought Process:
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {processSteps[activeStep].desc}
                </p>
              </div>

              {/* Concrete Deliverables */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                  Concrete Deliverables at this stage:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  {processSteps[activeStep].deliverables}
                </p>
              </div>

              {/* Navigation stepper buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Previous Phase
                </button>
                <button
                  type="button"
                  disabled={activeStep === processSteps.length - 1}
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

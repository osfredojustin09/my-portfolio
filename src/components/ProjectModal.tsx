import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  UserCheck,
  Layers,
  Play,
  ListOrdered
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenTaskPreview?: () => void;
  onOpenProductivityApp?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenTaskPreview,
  onOpenProductivityApp,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'learning'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{project.category}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400">{project.statusLabel}</span>
            {project.isExample && (
              <>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Representative Project Example</span>
              </>
            )}
          </div>
          <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {project.tagline}
          </p>
        </div>

        {/* Project Image Frame */}
        <div className="mt-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-16/9 relative">
          <img
            src={project.image}
            alt={`${project.title} preview screenshot`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Modal Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview & Solution
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('process')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'process'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Development Process
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('learning')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'learning'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Challenges & Lessons
          </button>
        </div>

        {/* Tab 1: Overview & Solution */}
        {activeTab === 'overview' && (
          <div className="mt-6 space-y-6 text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
            
            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Problem Identified</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Engineered Solution</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Key Features Implemented
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
                Technologies & Tools:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* My Role */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-500" />
                <span>My Role & Individual Contribution</span>
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.roleAndContribution}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Development Process */}
        {activeTab === 'process' && (
          <div className="mt-6 space-y-4 animate-fadeIn">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-blue-500" />
              <span>Step-by-Step Development Journey</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800 p-4">
              {project.developmentProcess.map((step, idx) => (
                <div key={idx} className="py-2.5 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Challenges & Lessons */}
        {activeTab === 'learning' && (
          <div className="mt-6 space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Technical Challenge</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-blue-500" />
                  <span>What I Learned</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </div>
            </div>

            {/* Core Learning Outcomes */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Core Learning Outcomes
              </h3>
              <div className="flex flex-col gap-2">
                {project.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-mono text-blue-600 dark:text-blue-400 text-[11px] shrink-0 font-bold">
                      0{idx + 1}.
                    </span>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* If Student Productivity Dashboard, launch full app! */}
            {project.id === 'student-productivity-dashboard' && onOpenProductivityApp && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProductivityApp();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Full Application</span>
              </button>
            )}

            {/* If task manager, launch live sandbox! */}
            {project.id === 'class-notes-task-manager' && onOpenTaskPreview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTaskPreview();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive Sandbox</span>
              </button>
            )}

            {/* GitHub Link */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Github className="w-4 h-4" />
              <span>Repository:</span>
              <span className={`font-mono text-[11px] ${project.githubUrl.startsWith('[') ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {project.githubUrl}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

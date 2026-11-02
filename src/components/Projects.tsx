import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Eye,
  CheckCircle,
  Info,
  Sparkles,
  Play,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { TaskPreviewModal } from './TaskPreviewModal';

interface ProjectsProps {
  projects: Project[];
  onOpenProductivityApp?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenProductivityApp }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [taskPreviewOpen, setTaskPreviewOpen] = useState(false);

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  const filterOptions = [
    'All',
    'Web Development',
    'Applications',
    'UI/UX Design',
    'Data & Programming'
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Project Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Engineering Experiments & Practical Software
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every project here reflects a concrete problem identified, researched, and solved through code. Transparently labeled with development notes, architecture decisions, and verified learning outcomes.
            </p>
          </div>

          {/* Clarity Notice */}
          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 max-w-sm flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              Initial project entries are labeled as representative learning examples until replaced with confirmed repository links.
            </span>
          </div>
        </div>

        {/* Featured Project Spotlight Hero Card */}
        {featuredProject && (
          <div className="mb-14 rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Media Preview (5 cols) */}
              <div className="lg:col-span-5 relative aspect-16/10 lg:aspect-auto lg:h-full bg-slate-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    Featured Project
                  </span>
                </div>
              </div>

              {/* Spotlight Content (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{featuredProject.category}</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-slate-500 dark:text-slate-400">{featuredProject.statusLabel}</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="font-mono text-slate-400">{featuredProject.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {featuredProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featuredProject.tagline}
                </p>

                {/* Problem & Solution Quick Pills */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Problem & Solution:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {featuredProject.solution}
                  </p>
                </div>

                {/* Metrics */}
                {featuredProject.metrics && (
                  <div className="flex flex-wrap items-center gap-4 py-1 text-xs">
                    {featuredProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">{m.label}</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {featuredProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {featuredProject.id === 'student-productivity-dashboard' && onOpenProductivityApp ? (
                    <button
                      type="button"
                      onClick={onOpenProductivityApp}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Full Application</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTaskPreviewOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Live Interactive Sandbox</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredProject)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Architecture Details</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 w-fit max-w-full">
          {filterOptions.map((filter) => {
            const count = filter === 'All'
              ? projects.length
              : projects.filter((p) => p.category === filter).length;
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{filter}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No projects found in this category yet.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Select "All" or explore other categories. Justin is continuously adding new projects.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset to All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail / Image Frame */}
                  <div className="relative aspect-16/10 bg-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Unboxed Metadata Header Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 text-white backdrop-blur-xs font-mono text-[10px]">
                        {project.category}
                      </span>
                      {project.isExample && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-white backdrop-blur-xs text-[10px] font-semibold">
                          Example Entry
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Status & Title */}
                    <div>
                      <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                        {project.statusLabel}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Problem Solved Highlight */}
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Problem Solved:</span>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-[11px]">
                        {project.problemSolved}
                      </p>
                    </div>

                    {/* Technologies list */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Quick Contribution Tagline */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{project.roleAndContribution}</span>
                    </div>

                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  
                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* If Student Productivity Dashboard, launch full application */}
                    {project.id === 'student-productivity-dashboard' && onOpenProductivityApp && (
                      <button
                        type="button"
                        onClick={onOpenProductivityApp}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-2xs whitespace-nowrap flex items-center gap-1"
                        title="Open the complete Student Productivity Dashboard"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Launch App</span>
                      </button>
                    )}

                    {/* If task manager, launch interactive sandbox */}
                    {project.id === 'class-notes-task-manager' && (
                      <button
                        type="button"
                        onClick={() => setTaskPreviewOpen(true)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-2xs whitespace-nowrap flex items-center gap-1"
                        title="Try the live task manager inside your browser"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Live Sandbox</span>
                      </button>
                    )}

                    {/* Repo indicator */}
                    <span
                      title={project.githubUrl}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal for In-Depth Details */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenTaskPreview={() => setTaskPreviewOpen(true)}
          onOpenProductivityApp={onOpenProductivityApp}
        />

        {/* Interactive App Sandbox for Task Manager */}
        <TaskPreviewModal
          isOpen={taskPreviewOpen}
          onClose={() => setTaskPreviewOpen(false)}
        />

      </div>
    </section>
  );
};

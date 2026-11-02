import React from 'react';
import { ArrowDown, ArrowUpRight, Play, Sparkles, Terminal, Code2, Compass } from 'lucide-react';
import { PersonalInfo, Project } from '../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  personalInfo: PersonalInfo;
  featuredProject?: Project;
  onOpenTaskPreview?: () => void;
  onOpenProductivityApp?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  personalInfo,
  featuredProject,
  onOpenTaskPreview,
  onOpenProductivityApp,
  onNavigateSection,
}) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Subtle background tech matrix grid pattern (pure CSS, low contrast) */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Typography & Personal Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability / Learning Status Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Grade 12 · Aspiring Software Developer · Exploring Computer Science & Web Systems</span>
            </div>

            {/* Headline with scale and balance */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 font-mono tracking-tight">
                Hi, I'm Justin Osfredo
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] text-balance">
                Turning Ideas Into Digital Experiences.
              </h1>
            </div>

            {/* Supporting Pitch Text required by prompt */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I'm Justin Osfredo, an aspiring software developer passionate about technology, programming, and building practical solutions through code.
            </p>

            {/* Short Narrative Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              Preparing for university Computer Science admission while designing and building verifiable software projects, deconstructing algorithmic logic, and mastering modern full-stack web standards.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {featuredProject?.id === 'student-productivity-dashboard' && onOpenProductivityApp ? (
                <button
                  type="button"
                  onClick={onOpenProductivityApp}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg border border-blue-200/60 dark:border-blue-900/60 transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Student Dashboard</span>
                </button>
              ) : onOpenTaskPreview ? (
                <button
                  type="button"
                  onClick={onOpenTaskPreview}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg border border-blue-200/60 dark:border-blue-900/60 transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Try Interactive Sandbox</span>
                </button>
              ) : null}

              <a
                href="#digital-world"
                onClick={(e) => scrollToSection(e, '#digital-world')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>Digital World Hub</span>
              </a>
            </div>

            {/* Unboxed Tech Stack Teaser with Floating Tech Pills */}
            <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Daily Stacks:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                  Python 3
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                  JavaScript ES6+
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                  React & Vite
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                  MySQL & SQL
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                  Git & Linux CLI
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Functional Interactive Developer Terminal */}
          <div className="lg:col-span-5">
            <InteractiveTerminal
              onOpenProductivityApp={onOpenProductivityApp}
              onNavigateSection={handleNavigate}
              compact={false}
            />
          </div>

        </div>

        {/* 3-Column Highlights Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Academic Standing</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">Grade 12 High School</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Focusing on IT, Mathematics & Software Foundations</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technical Trajectory</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">Aspiring Software Developer</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Building projects in Web, Python, and Databases</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Future Horizon</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">University & Scholarships</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Preparing a rigorous, verifiable technical portfolio</p>
          </div>
        </div>

        {/* Subtle Scroll Down Prompt */}
        <div className="mt-10 flex justify-center">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            aria-label="Scroll to About Me section"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <span>Explore my journey and projects</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};

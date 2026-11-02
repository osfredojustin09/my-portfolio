import React, { useState } from 'react';
import {
  Monitor,
  FolderGit2,
  Cpu,
  BookOpen,
  Target,
  Terminal,
  Code2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  GraduationCap,
  HardDrive,
  Workflow,
  Lightbulb,
  Play
} from 'lucide-react';

interface DigitalWorldProps {
  onOpenProductivityApp?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const DigitalWorld: React.FC<DigitalWorldProps> = ({
  onOpenProductivityApp,
  onNavigateSection,
}) => {
  type DestinationId = 'workspace' | 'projects' | 'skills' | 'learningspace' | 'goals';
  const [activeDestination, setActiveDestination] = useState<DestinationId>('workspace');

  const destinations: {
    id: DestinationId;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    badge: string;
    accentColor: string;
    accentBg: string;
  }[] = [
    {
      id: 'workspace',
      title: 'My Workspace',
      subtitle: 'Daily Developer Environment & Tools',
      icon: Monitor,
      badge: 'Development Setup',
      accentColor: 'text-blue-600 dark:text-blue-400',
      accentBg: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'projects',
      title: 'My Projects',
      subtitle: 'Engineered Web Apps & Prototypes',
      icon: FolderGit2,
      badge: 'Software Portfolio',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'skills',
      title: 'My Skills',
      subtitle: 'Verified Technical Capabilities',
      icon: Cpu,
      badge: 'Stacks & Languages',
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      accentBg: 'bg-cyan-50 dark:bg-cyan-950/60',
    },
    {
      id: 'learningspace',
      title: 'My Learning Space',
      subtitle: 'Concepts & Architectures in Progress',
      icon: BookOpen,
      badge: 'Active Exploration',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'goals',
      title: 'My Future Goals',
      subtitle: 'University & Professional Aspirations',
      icon: Target,
      badge: 'Next Horizon',
      accentColor: 'text-purple-600 dark:text-purple-400',
      accentBg: 'bg-purple-50 dark:bg-purple-950/60',
    },
  ];

  return (
    <section id="digital-world" className="py-20 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0B0F17]/50 relative overflow-hidden">
      
      {/* Background Tech Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Digital Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Explore My Digital World
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Step into an interactive digital workspace showcasing my daily tooling, completed engineering projects, core skills, active learning explorations, and long-term university goals.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>5 Interactive Destinations</span>
          </div>
        </div>

        {/* Destination Cards Navigator (5 columns / responsive) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {destinations.map((dest) => {
            const Icon = dest.icon;
            const isSelected = activeDestination === dest.id;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => setActiveDestination(dest.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${dest.accentBg} transition-transform duration-200 group-hover:scale-110`}>
                      <Icon className={`w-4 h-4 ${dest.accentColor}`} />
                    </div>
                    <span className="text-[9px] font-mono font-semibold uppercase text-slate-400">
                      0{destinations.findIndex((d) => d.id === dest.id) + 1}
                    </span>
                  </div>
                  <h3 className={`text-xs font-bold transition-colors ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                    {dest.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {dest.subtitle}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-medium">
                  <span className={isSelected ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}>
                    {isSelected ? 'Viewing' : 'Select'}
                  </span>
                  <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5 text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Destination Detail Panel */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden p-6 sm:p-8 animate-fadeIn">
          
          {/* Destination 1: My Workspace */}
          {activeDestination === 'workspace' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Destination 01</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">My Workspace & Setup</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">The battle-tested tools, software, and hardware I rely on daily for code and learning.</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full self-start sm:self-auto">
                  Primary Environment: VS Code + Linux CLI
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold">
                    <Code2 className="w-4 h-4" />
                    <span>Editor & Extensions</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">VS Code + JetBrains Mono</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Customized with Prettier, ESLint, GitLens, Python extension, and minimal dark theme for distraction-free coding sessions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>Command Line & Shell</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Bash & Git CLI</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Accustomed to standard terminal navigation, package management (`npm`, `pip`), and structured branch-based git commits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                    <Workflow className="w-4 h-4" />
                    <span>Design & Prototyping</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Figma & Wireframing</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Layout planning, UI component structuring, and visual prototyping before writing a single line of React or CSS.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <HardDrive className="w-4 h-4" />
                    <span>Runtime & DB</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Node.js + Python 3 + MySQL</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Dual environments for algorithmic scripting (Python) and reactive web systems (Node / Vite / Express / relational databases).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Destination 2: My Projects */}
          {activeDestination === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Destination 02</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">My Projects Showcase</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Engineered applications addressing real academic challenges and digital needs.</p>
                  </div>
                </div>
                {onOpenProductivityApp && (
                  <button
                    type="button"
                    onClick={onOpenProductivityApp}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs self-start sm:self-auto"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Featured App (Student Dashboard)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                      #1 Featured Application
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">Student Productivity Dashboard</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Centralized hub featuring full assignment CRUD, monthly calendar planner, customized Pomodoro study timer with synthesized audio, and live completion analytics.
                    </p>
                  </div>
                  {onOpenProductivityApp && (
                    <button
                      type="button"
                      onClick={onOpenProductivityApp}
                      className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open Application</span> &rarr;
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Prototype</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Class Notes & Task Manager</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Clean task organizer built to solve homework tracking with category filtering, priority indicators, and local storage state persistence.
                    </p>
                  </div>
                  {onNavigateSection && (
                    <button
                      type="button"
                      onClick={() => onNavigateSection('projects')}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-blue-500 font-medium inline-flex items-center gap-1"
                    >
                      <span>View in Projects</span> &rarr;
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Concept & Wireframe</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Local Business Showcase</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Exploratory responsive directory concept assisting neighborhood small businesses with discoverability and operating details.
                    </p>
                  </div>
                  {onNavigateSection && (
                    <button
                      type="button"
                      onClick={() => onNavigateSection('projects')}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-blue-500 font-medium inline-flex items-center gap-1"
                    >
                      <span>View in Projects</span> &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Destination 3: My Skills */}
          {activeDestination === 'skills' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Destination 03</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Technical Stacks & Capabilities</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Honest, verified skills categorized across 6 primary engineering domains.</p>
                  </div>
                </div>
                {onNavigateSection && (
                  <button
                    type="button"
                    onClick={() => onNavigateSection('skills')}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline self-start sm:self-auto"
                  >
                    Open Full Skills Inspector &rarr;
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold block">Python</span>
                  <p className="text-[10px] text-slate-500">Core Logic & Math</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold block">JavaScript ES6</span>
                  <p className="text-[10px] text-slate-500">Modern Web Apps</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold block">React & Vite</span>
                  <p className="text-[10px] text-slate-500">Component State</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold block">SQL / MySQL</span>
                  <p className="text-[10px] text-slate-500">Relational Schemas</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold block">Git & GitHub</span>
                  <p className="text-[10px] text-slate-500">Version Control</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold block">Figma & UI</span>
                  <p className="text-[10px] text-slate-500">Design Systems</p>
                </div>
              </div>
            </div>
          )}

          {/* Destination 4: My Learning Space */}
          {activeDestination === 'learningspace' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Destination 04</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">My Learning Space</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Concepts, documentation, and algorithms currently under active study.</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                  Independent Study Track
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">1. Data Structures & Big-O Complexity</span>
                    <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">Active</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Analyzing arrays, linked lists, stacks, queues, hash maps, and recursion to write predictable, performant algorithmic routines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">2. Relational Database Normalization</span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Studying 1NF, 2NF, 3NF database designs, foreign key constraints, indexes, and write/read optimizations for structured queries.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">3. TypeScript Architectural Patterns</span>
                    <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Active</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Refactoring JavaScript apps into strict TypeScript with generic interfaces, tagged unions, and zero `any` type policies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">4. RESTful API & Server-Client Contracts</span>
                    <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-bold">Active</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Connecting frontend interfaces with Node/Express backends, handling HTTP status codes, error boundaries, and JSON payloads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Destination 5: My Future Goals */}
          {activeDestination === 'goals' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Destination 05</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">My Future Goals</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Clear academic and career milestones guiding my high school graduation and university admission.</p>
                  </div>
                </div>
                {onNavigateSection && (
                  <button
                    type="button"
                    onClick={() => onNavigateSection('contact')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs self-start sm:self-auto"
                  >
                    <span>Connect with Justin</span> &rarr;
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
                    <GraduationCap className="w-4 h-4" />
                    <span>Horizon 1 (2026-2027)</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">University CS / IT Admission</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Successfully gain admission to a competitive university Computer Science or Information Technology program with scholarship consideration.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
                    <Code2 className="w-4 h-4" />
                    <span>Horizon 2 (Undergrad)</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Open Source & Practical Tools</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Contribute meaningful bug fixes and documentation to open-source developer tooling, and launch independent software serving students.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                    <Lightbulb className="w-4 h-4" />
                    <span>Horizon 3 (Career)</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Software Engineering Mastery</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Grow into an impactful full-stack software engineer designing reliable, accessible systems that resolve real human bottlenecks.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

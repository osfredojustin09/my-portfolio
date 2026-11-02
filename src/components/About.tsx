import React, { useState, useRef } from 'react';
import {
  User,
  MapPin,
  GraduationCap,
  Compass,
  Briefcase,
  Target,
  ShieldCheck,
  Edit3,
  Sparkles,
  BookOpen,
  Lightbulb,
  Heart,
  Calculator,
  Trophy,
  Cpu,
  Users,
  Code,
  Laptop,
  CheckCircle2,
  Camera,
  Upload,
  Image as ImageIcon,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import { PersonalInfo, Milestone } from '../data/portfolioData';

interface AboutProps {
  personalInfo: PersonalInfo;
  milestones: Milestone[];
  onOpenCustomizer: () => void;
  onUpdateAvatar?: (url: string) => void;
}

export const About: React.FC<AboutProps> = ({
  personalInfo,
  milestones,
  onOpenCustomizer,
  onUpdateAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'approach' | 'values' | 'milestones'>('story');
  const [hoveredInterest, setHoveredInterest] = useState<number | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && onUpdateAvatar) {
          onUpdateAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 5 Specific Core Interests required by user brief
  const coreInterests = [
    {
      title: 'Coding & Programming',
      description: 'Writing clean, readable code in Python and modern JavaScript. Dissecting syntax, logic patterns, and data structures through consistent daily practice.',
      icon: Code,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
      borderColor: 'group-hover:border-blue-500/50',
      tag: 'Python · JS · Syntax',
    },
    {
      title: 'Software Development',
      description: 'Architecting full web applications with modular components, reactive state management, persistent databases, and intuitive student-focused interfaces.',
      icon: Laptop,
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
      borderColor: 'group-hover:border-indigo-500/50',
      tag: 'React · Architecture · Systems',
    },
    {
      title: 'Technology Exploration',
      description: 'Investigating emerging developer frameworks, modern web APIs, system tooling, and relational databases like PostgreSQL and MySQL to broaden technical horizons.',
      icon: Cpu,
      color: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/50',
      borderColor: 'group-hover:border-cyan-500/50',
      tag: 'APIs · Tools · Databases',
    },
    {
      title: 'Problem Solving',
      description: 'Breaking down ambiguous challenges into structured modular steps, edge cases, and deterministic algorithms through systematic root-cause debugging.',
      icon: Lightbulb,
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
      borderColor: 'group-hover:border-amber-500/50',
      tag: 'Logic · Algorithms · Analysis',
    },
    {
      title: 'Continuous Learning',
      description: 'Driven by curiosity: reviewing official documentation, inspecting open-source repositories, and building prototypes beyond classroom syllabus requirements.',
      icon: BookOpen,
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
      borderColor: 'group-hover:border-emerald-500/50',
      tag: 'Self-Study · Docs · Growth',
    },
  ];

  // Personal information cards required by user brief
  const personalInfoCards = [
    {
      label: 'Full Name',
      value: personalInfo.name || 'Justin Osfredo',
      icon: User,
      color: 'text-blue-500',
    },
    {
      label: 'Education',
      value: personalInfo.educationLevel || 'Grade 12',
      subtext: personalInfo.school.startsWith('[') ? 'Senior High School' : personalInfo.school,
      icon: GraduationCap,
      color: 'text-indigo-500',
    },
    {
      label: 'Location',
      value: personalInfo.location || 'Indonesia',
      icon: MapPin,
      color: 'text-emerald-500',
    },
    {
      label: 'Core Interests',
      value: 'Programming, Technology, Problem Solving',
      icon: Compass,
      color: 'text-cyan-500',
    },
    {
      label: 'Career Interest',
      value: 'Software Development',
      subtext: 'IT & Computer Science Trajectory',
      icon: Briefcase,
      color: 'text-purple-500',
    },
  ];

  const renderBeyondCodingIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'Trophy':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'Users':
        return <Users className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20 relative overflow-hidden">
      
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.025] dark:opacity-[0.035] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden file input for quick direct photo replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Personal Profile & Biography
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              About Justin Osfredo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Discover the curiosity, problem-solving mindset, and personal commitment shaping my journey into software development.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs hover:border-blue-400 dark:hover:border-blue-500"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customize Profile & Photo</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PART 1: PROFILE PHOTO & PERSONAL INTRODUCTION (Desktop: side-by-side)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          
          {/* Profile Photo Column (5 cols on desktop, stacked on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Profile Photo Card */}
            <div className="group relative w-full rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-md p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-blue-500/40">
              
              {/* Modern editorial corner brackets */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-blue-600/40 dark:border-blue-400/40 pointer-events-none rounded-tl-sm z-20" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-blue-600/40 dark:border-blue-400/40 pointer-events-none rounded-tr-sm z-20" />
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-blue-600/40 dark:border-blue-400/40 pointer-events-none rounded-bl-sm z-20" />
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-blue-600/40 dark:border-blue-400/40 pointer-events-none rounded-br-sm z-20" />

              {/* Photo Display Area - Consistent compact size for both Placeholder & Uploaded Photo */}
              <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-200/50 dark:from-slate-800/60 dark:via-slate-900/80 dark:to-slate-950 flex flex-col items-center justify-center p-5 sm:p-6 border border-slate-200/60 dark:border-slate-800/80 text-center">
                
                {/* Background tech blueprint concentric rings */}
                <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.1] pointer-events-none flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full border border-current" />
                  <div className="w-40 h-40 rounded-full border border-dashed border-current absolute" />
                </div>

                {personalInfo.avatarUrl ? (
                  /* Custom actual photo uploaded by user - Sized right to match the default avatar size! */
                  <>
                    <div className="relative mb-3.5 group/photo">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-500/50 dark:border-blue-400/50 ring-4 ring-blue-500/10 bg-slate-200 dark:bg-slate-800 relative transition-transform duration-300 group-hover/photo:scale-105">
                        <img
                          src={personalInfo.avatarUrl}
                          alt="Justin Osfredo - Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Corner camera button to replace */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="Upload new photo"
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors border border-white/20"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Status label indicating active custom photo */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono font-semibold tracking-wide uppercase border border-emerald-200/70 dark:border-emerald-900/60 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Profile Photo Active</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsPreviewModalOpen(true)}
                        title="View photo full size"
                        className="p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Justin Osfredo
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mt-1 leading-relaxed">
                      Grade 12 student passionate about software engineering, IT architectures, and problem-solving.
                    </p>

                    {/* Quick photo management controls */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateAvatar?.('')}
                        title="Remove photo and return to default placeholder"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-rose-500" />
                        <span>Reset</span>
                      </button>
                      <button
                        type="button"
                        onClick={onOpenCustomizer}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <ImageIcon className="w-3 h-3 text-blue-500" />
                        <span>URL</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Clearly labeled editorial placeholder */
                  <>
                    {/* Developer Monogram Avatar */}
                    <div className="relative mb-3.5">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-lg border-2 border-white/20 transform transition-transform duration-300 group-hover:scale-105">
                        JO
                      </div>
                      <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                        <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>

                    {/* Prominent label indicating placeholder */}
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-semibold tracking-wide uppercase mb-2 border border-blue-200/70 dark:border-blue-900/60">
                      Profile Photo Placeholder
                    </span>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Justin Osfredo
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mt-1 leading-relaxed">
                      High school developer portfolio. Upload your portrait photo anytime to display here.
                    </p>

                    {/* Quick photo upload button */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={onOpenCustomizer}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <ImageIcon className="w-3 h-3 text-blue-500" />
                        <span>Add URL</span>
                      </button>
                    </div>
                  </>
                )}

              </div>

              {/* Status pill required by brief: "Aspiring Software Developer" */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="inline-flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Aspiring Software Developer</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenCustomizer}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-[11px]"
                >
                  Edit Settings
                </button>
              </div>

            </div>

            {/* Academic & Candidate Profile Card (complements 5-col space neatly) */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Student Profile</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-medium">
                  Grade 12
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Focused on university computer science admissions, technical scholarships, and software engineering opportunities.
              </p>
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 dark:text-slate-500">Location:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Indonesia (WIB / UTC+7)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 dark:text-slate-500">Focus:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Full-Stack & Systems Dev</span>
              </div>
            </div>

          </div>

          {/* Personal Introduction & Highlights (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Biography Container */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
              
              {/* Introduction Label */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                <span>Personal Introduction</span>
              </div>

              {/* Natural and Engaging Introduction Text required by user prompt */}
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  Hi, I'm <strong className="font-semibold text-slate-900 dark:text-white">Justin Osfredo</strong>, a high school student passionate about <span className="text-blue-600 dark:text-blue-400 font-semibold">Information Technology</span>, <span className="text-blue-600 dark:text-blue-400 font-semibold">programming</span>, and <span className="text-blue-600 dark:text-blue-400 font-semibold">software development</span>. I enjoy exploring how technology works, solving problems through <span className="text-slate-900 dark:text-white font-semibold">logical thinking</span>, and turning ideas into <span className="text-slate-900 dark:text-white font-semibold">practical digital solutions</span>.
                </p>
                <p>
                  I'm continuously developing my technical skills through <span className="text-blue-600 dark:text-blue-400 font-semibold">independent learning</span> and <span className="text-blue-600 dark:text-blue-400 font-semibold">personal projects</span>. My goal is to build <span className="text-slate-900 dark:text-white font-semibold">meaningful software solutions</span> while growing into a <span className="text-slate-900 dark:text-white font-semibold">capable IT professional</span>.
                </p>
              </div>

              {/* Quote / Mission Callout */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="italic">"Curiosity + structured code = practical impact."</span>
                <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-medium">justin-osfredo.dev</span>
              </div>

            </div>

            {/* =========================================================================
                PART 2: PERSONAL INFORMATION CARDS (5 interactive cards with hover effects)
                ========================================================================= */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
                Quick Facts & Academic Profile
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {personalInfoCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between ${
                        idx === 3 ? 'sm:col-span-2 lg:col-span-2' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
                          <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {card.label}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {card.value}
                      </p>
                      {card.subtext && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate block">
                          {card.subtext}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            PART 3: MY INTERESTS (Interactive feature section requested by brief)
            ========================================================================= */}
        <div className="mb-16">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Areas of Fascination
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              My Core Interests
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The focal points driving my daily code experiments, architectural learning, and problem-solving projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreInterests.map((interest, i) => {
              const Icon = interest.icon;
              const isHovered = hoveredInterest === i;
              return (
                <div
                  key={interest.title}
                  onMouseEnter={() => setHoveredInterest(i)}
                  onMouseLeave={() => setHoveredInterest(null)}
                  className={`group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                    i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div>
                    {/* Icon and Tag Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${interest.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${interest.color}`} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {interest.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                      {interest.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>

                  {/* Micro interaction indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      <span>Active Focus Area</span>
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                      explore &rarr;
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PART 4: IN-DEPTH NARRATIVE TABS (Preserves all rich story, approach & values)
            ========================================================================= */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                In-Depth Perspectives
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Origin Story, Methodical Approach & Milestones
              </h4>
            </div>

            {/* Tab Controls Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-fit max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('story')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  activeTab === 'story'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Origin Story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('approach')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  activeTab === 'approach'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Learning Approach
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('values')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  activeTab === 'values'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Core Values
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('milestones')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  activeTab === 'milestones'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Milestones
              </button>
            </div>
          </div>

          {/* Active Tab View Body */}
          <div className="space-y-6">
            
            {/* View 1: Origin Story */}
            {activeTab === 'story' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-4 h-4" />
                    <span>The First Spark</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    How Curiosity Turned into Software Engineering
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {personalInfo.originStory}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {personalInfo.aboutBio}
                  </p>
                </div>

                {/* What Drives Me Grid */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>What Drives Me</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(personalInfo.whatDrivesMe || []).map((driver, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-400/50 transition-colors"
                      >
                        <h6 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {driver.title}
                        </h6>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {driver.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Learning Approach */}
            {activeTab === 'approach' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <span>My Methodical Approach</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Build, Break, Inspect Internals & Rebuild
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {personalInfo.learningApproach || personalInfo.aboutBio}
                  </p>
                  
                  {/* Practical steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800">
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">01. Dissect</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Read official documentation and explore open-source code.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800">
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">02. Prototype</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Write minimal working code to verify logic and test assumptions.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800">
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">03. Refactor</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Clean up architecture, eliminate redundancy, and document findings.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Core Philosophy: </span>
                    "You never truly understand a programming concept until you can build a working tool with it from scratch without copy-pasting."
                  </div>
                </div>
              </div>
            )}

            {/* View 3: Personal Values */}
            {activeTab === 'values' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(personalInfo.personalValues || []).map((val, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-blue-400/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                          <span>0{idx + 1}</span>
                          <Heart className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                          {val.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 4: Milestones */}
            {activeTab === 'milestones' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
                  {(milestones || []).map((m, idx) => (
                    <div key={idx} className={`py-4 ${idx === 0 ? 'pt-0' : ''} ${idx === (milestones || []).length - 1 ? 'pb-0' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60">
                          {m.year}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                          {m.title}
                        </h5>
                      </div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        {m.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beyond Coding Component */}
            <div className="pt-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Beyond Coding: Interests & Habits</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(personalInfo.beyondCoding || []).map((interest, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3 hover:border-blue-400/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 shrink-0">
                      {renderBeyondCodingIcon(interest.icon)}
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                        {interest.title}
                      </h6>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credibility & Privacy Policy Banner */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-850/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Portfolio Authenticity Policy: </span>
                This portfolio deliberately protects personal sensitive information (no national IDs, exact residential addresses, or private school records). All stated skills reflect genuine self-study and completed high school coursework without exaggerated corporate claims.
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Profile Photo Full-size Lightbox Modal */}
      {isPreviewModalOpen && personalInfo.avatarUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsPreviewModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile Photo Lightbox"
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl p-5 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-500" />
                <span>Profile Photo Preview</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-full max-h-[340px] aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner">
              <img
                src={personalInfo.avatarUrl}
                alt="Justin Osfredo - Portrait Full"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between w-full text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Justin Osfredo</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">High School Portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    onUpdateAvatar?.('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors border border-rose-200/50 dark:border-rose-900/40"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

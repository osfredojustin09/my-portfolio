import React from 'react';
import { Mail, Github, Linkedin, Heart } from 'lucide-react';
import { PersonalInfo } from '../data/portfolioData';

interface FooterProps {
  personalInfo: PersonalInfo;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ personalInfo, onOpenCustomizer }) => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080B11] text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-850">
          
          {/* Identity & Short Tagline */}
          <div className="text-center md:text-left space-y-1">
            <a
              href="#home"
              onClick={(e) => scrollTo(e, '#home')}
              className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {personalInfo.name}
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grade 12 High School Student · Aspiring Software Developer
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#about" onClick={(e) => scrollTo(e, '#about')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" onClick={(e) => scrollTo(e, '#skills')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" onClick={(e) => scrollTo(e, '#projects')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Projects
            </a>
            <a href="#education" onClick={(e) => scrollTo(e, '#education')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Education
            </a>
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email Justin"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              title={personalInfo.githubUrl}
              aria-label="GitHub Profile"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              title={personalInfo.linkedinUrl}
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Dynamic Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Designed and built with curiosity.</span>
          </p>

          <button
            type="button"
            onClick={onOpenCustomizer}
            className="text-[11px] hover:text-blue-600 dark:hover:text-blue-400 underline transition-colors"
          >
            Customize Placeholders
          </button>
        </div>

      </div>
    </footer>
  );
};

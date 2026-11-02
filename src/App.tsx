/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPortfolioData, PersonalInfo } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { DevelopmentProcess } from './components/DevelopmentProcess';
import { Education } from './components/Education';
import { GoalsAndUpdates } from './components/GoalsAndUpdates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { CustomizeModal } from './components/CustomizeModal';
import { TaskPreviewModal } from './components/TaskPreviewModal';
import { ProductivityApp } from './components/dashboard/ProductivityApp';
import { CurrentlyExploringWidget } from './components/CurrentlyExploringWidget';
import { DigitalWorld } from './components/DigitalWorld';

export default function App() {
  // Theme management with OS detection and local storage persistence
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('justin_portfolio_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true; // Default to dark aesthetic
    }
  });

  // Manage personalInfo with local state so Justin can customize and preview
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const savedInfo = localStorage.getItem('justin_portfolio_personal_info');
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        return {
          ...initialPortfolioData.personalInfo,
          ...parsed,
          whatDrivesMe: parsed.whatDrivesMe?.length ? parsed.whatDrivesMe : initialPortfolioData.personalInfo.whatDrivesMe,
          personalValues: parsed.personalValues?.length ? parsed.personalValues : initialPortfolioData.personalInfo.personalValues,
          beyondCoding: parsed.beyondCoding?.length ? parsed.beyondCoding : initialPortfolioData.personalInfo.beyondCoding,
        };
      }
    } catch {
      // use initial
    }
    return initialPortfolioData.personalInfo;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isGlobalSandboxOpen, setIsGlobalSandboxOpen] = useState(false);
  const [isProductivityAppOpen, setIsProductivityAppOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#student-dashboard';
    }
    return false;
  });

  // Hash listener for direct navigation to Student Productivity Dashboard
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#student-dashboard') {
        setIsProductivityAppOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenProductivityApp = () => {
    setIsProductivityAppOpen(true);
    window.location.hash = 'student-dashboard';
  };

  const handleExitProductivityApp = () => {
    setIsProductivityAppOpen(false);
    if (window.location.hash === '#student-dashboard') {
      window.history.pushState(null, '', window.location.pathname + '#projects');
    }
  };

  // Sync dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('justin_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('justin_portfolio_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleSavePersonalInfo = (updated: PersonalInfo) => {
    setPersonalInfo(updated);
    try {
      localStorage.setItem('justin_portfolio_personal_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setPersonalInfo(initialPortfolioData.personalInfo);
    try {
      localStorage.removeItem('justin_portfolio_personal_info');
    } catch {
      // ignore
    }
  };

  const featuredProject = initialPortfolioData.projects.find((p) => p.featured) || initialPortfolioData.projects[0];

  // If Student Productivity Dashboard application is launched
  if (isProductivityAppOpen) {
    return (
      <ProductivityApp
        onExit={handleExitProductivityApp}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero
          personalInfo={personalInfo}
          featuredProject={featuredProject}
          onOpenTaskPreview={() => setIsGlobalSandboxOpen(true)}
          onOpenProductivityApp={handleOpenProductivityApp}
          onNavigateSection={handleNavigateSection}
        />

        {/* Live Radar: Currently Exploring Widget */}
        <CurrentlyExploringWidget
          onOpenProductivityApp={handleOpenProductivityApp}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Section 2: About Me */}
        <About
          personalInfo={personalInfo}
          milestones={initialPortfolioData.milestones}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onUpdateAvatar={(newUrl) => handleSavePersonalInfo({ ...personalInfo, avatarUrl: newUrl })}
        />

        {/* Section 3: Skills & Technologies */}
        <Skills
          skills={initialPortfolioData.skills}
          currentlyLearning={initialPortfolioData.currentlyLearning}
        />

        {/* Section 4: Projects */}
        <Projects
          projects={initialPortfolioData.projects}
          onOpenProductivityApp={handleOpenProductivityApp}
        />

        {/* Explore My Digital World Hub */}
        <DigitalWorld
          onOpenProductivityApp={handleOpenProductivityApp}
          onNavigateSection={handleNavigateSection}
        />

        {/* Informative Component: Development Process */}
        <DevelopmentProcess processSteps={initialPortfolioData.developmentProcess} />

        {/* Section 5: Education & Learning Journey */}
        <Education
          timeline={initialPortfolioData.timeline}
          milestones={initialPortfolioData.milestones}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Informative Component: Goals & Latest Updates */}
        <GoalsAndUpdates
          goals={initialPortfolioData.goals}
          updates={initialPortfolioData.latestUpdates}
        />

        {/* Section 6: Contact */}
        <Contact
          personalInfo={personalInfo}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        personalInfo={personalInfo}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Back to top button */}
      <BackToTop />

      {/* Profile & Placeholder Customizer Modal */}
      <CustomizeModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        personalInfo={personalInfo}
        onSavePersonalInfo={handleSavePersonalInfo}
        onResetDefaults={handleResetDefaults}
      />

      {/* Global Interactive Sandbox Modal */}
      <TaskPreviewModal
        isOpen={isGlobalSandboxOpen}
        onClose={() => setIsGlobalSandboxOpen(false)}
      />
    </div>
  );
}

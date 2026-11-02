import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onOpenCustomizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      const sections = ['home', 'about', 'skills', 'projects', 'digital-world', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Digital World', href: '#digital-world', id: 'digital-world' },
    { label: 'Journey', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Top Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-75 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav links) - Zone 3 (Action) separated by gap-8 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Justin Osfredo
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`whitespace-nowrap shrink-0 transition-all duration-200 relative py-1 hover:text-slate-900 dark:hover:text-white ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Button with micro-rotation animation */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 active:scale-90 focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            <div className="transition-transform duration-300 hover:rotate-12">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </div>
          </button>

          {/* Customize / Edit Data Shortcut */}
          <button
            type="button"
            onClick={onOpenCustomizer}
            title="Edit placeholders & customize portfolio data"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all active:scale-95 border border-slate-200 dark:border-slate-700 focus-visible:outline-2 focus-visible:outline-blue-500 whitespace-nowrap"
          >
            <span>Edit Profile</span>
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="group inline-flex items-center gap-1 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 animate-fadeIn" /> : <Menu className="w-5 h-5 animate-fadeIn" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with slide-up animation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                  activeSection === link.id
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium py-1"
            >
              ✎ Edit Placeholders & Photo
            </button>
            <span className="text-xs text-slate-400">Grade 12 Portfolio</span>
          </div>
        </div>
      )}
    </header>
  );
};

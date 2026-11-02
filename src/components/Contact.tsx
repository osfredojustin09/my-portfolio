import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2, Copy, AlertCircle, ArrowUpRight } from 'lucide-react';
import { PersonalInfo } from '../data/portfolioData';

interface ContactProps {
  personalInfo: PersonalInfo;
  onOpenCustomizer: () => void;
}

export const Contact: React.FC<ContactProps> = ({ personalInfo, onOpenCustomizer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeyPot: '', // spam prevention bot trap
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'success' | 'copied'>('idle');

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Please provide a subject';
    if (!formData.message.trim()) {
      errors.message = 'Please write your message';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.honeyPot) {
      return;
    }

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Functional delivery via mailto link with encoded payload
      const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
      const encodedBody = encodeURIComponent(
        `Hi Justin,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
      );
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodedSubject}&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoUrl;
      setSubmittedStatus('success');
    }
  };

  const handleCopyMessage = () => {
    const text = `Subject: [Portfolio Inquiry] ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setSubmittedStatus('copied');
    setTimeout(() => {
      setSubmittedStatus('idle');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
            Let's Connect
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Get in Touch
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Interested in discussing learning opportunities, software projects, university programs, or upcoming high school internships? Feel free to reach out directly.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Contact Channels
              </h3>

              {/* Verified Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Direct Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">GitHub Repository Profile</span>
                  <span className={`text-xs font-mono ${personalInfo.githubUrl.startsWith('[') ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {personalInfo.githubUrl}
                  </span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">LinkedIn Profile</span>
                  <span className={`text-xs font-mono ${personalInfo.linkedinUrl.startsWith('[') ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {personalInfo.linkedinUrl}
                  </span>
                </div>
              </div>

              {/* Instagram (optional) */}
              {personalInfo.instagramUrl && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Professional Instagram (Optional)</span>
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
                      {personalInfo.instagramUrl}
                    </span>
                  </div>
                </div>
              )}

              {/* Shortcut to customize placeholders */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onOpenCustomizer}
                  className="w-full py-2 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <span>Edit Links & Placeholders</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Note on transmission */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Technical Note: </span>
              In adherence to portfolio privacy and security standards, this form prepares your message directly into your email client or system clipboard without routing through untrusted third-party marketing servers.
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill out the details below. All fields marked with * are required.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Honeypot field (hidden from real users to catch automated spam bots) */}
                <input
                  type="text"
                  name="user_title_bot_trap"
                  value={formData.honeyPot}
                  onChange={(e) => setFormData({ ...formData, honeyPot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors ${
                        formErrors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="e.g. jane@example.com"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors ${
                        formErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                    }}
                    placeholder="e.g. University Inquiry / Project Discussion"
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formErrors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Write your note or question here..."
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formErrors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button & Alternative Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all duration-200 shadow-xs hover:shadow-md focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span>Send Message via Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-lg transition-all border border-slate-200 dark:border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </button>
                </div>

                {/* Status Banners */}
                {submittedStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5 animate-fadeIn shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Email Client Opened!</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Your message has been formatted for {personalInfo.email}. Simply press send in your email client, or use the copy button if preferred.
                      </p>
                    </div>
                  </div>
                )}

                {submittedStatus === 'copied' && (
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2 animate-fadeIn shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Message content copied to your clipboard! Ready to paste into any email app.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

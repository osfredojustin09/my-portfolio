import React, { useState, useRef } from 'react';
import { X, Check, Copy, HelpCircle, Save, RotateCcw, Upload, Camera, Trash2, Image as ImageIcon } from 'lucide-react';
import { PersonalInfo } from '../data/portfolioData';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onSavePersonalInfo: (updated: PersonalInfo) => void;
  onResetDefaults: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  onSavePersonalInfo,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if props change
  React.useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  if (!isOpen) return null;

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleChange('avatarUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePersonalInfo(formData);
    onClose();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Personalization & Profile Photo Customizer</span>
            </div>
            <h2 id="customizer-modal-title" className="text-xl font-bold tracking-tight">
              Edit Justin Osfredo's Profile Data
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload your photo, set custom URLs, and replace placeholders. Changes reflect live on the website!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleApply} className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
          
          {/* Profile Photo Upload / URL Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Profile Photo (About Me Section)</span>
              </label>
              {formData.avatarUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('avatarUrl', '')}
                  className="text-[11px] text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Reset to Placeholder</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview Thumbnail */}
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt="Preview avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                    <span className="text-[10px] text-slate-500 block leading-tight">Editorial Placeholder Active</span>
                  </div>
                )}
              </div>

              {/* Upload & URL Inputs */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload From Device</span>
                  </button>
                  <span className="text-[11px] text-slate-400">or enter image URL below</span>
                </div>
                <input
                  type="text"
                  value={formData.avatarUrl || ''}
                  onChange={(e) => handleChange('avatarUrl', e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              When left blank, a clearly labeled, modern editorial portrait placeholder is displayed.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300">
            <strong>Easy update guide:</strong> Fields containing square brackets like <code>[Insert actual school name]</code> are intended to be customized with your verified details.
          </div>

          {/* School Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              High School Name
            </label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => handleChange('school', e.target.value)}
              placeholder="e.g. SMA Negeri 1 Jakarta or SMA Labschool"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Graduation Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expected Graduation Year
              </label>
              <input
                type="text"
                value={formData.graduationYear}
                onChange={(e) => handleChange('graduationYear', e.target.value)}
                placeholder="e.g. 2026 or 2027"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g. Indonesia"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Current Focus */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Learning Focus
            </label>
            <input
              type="text"
              value={formData.currentFocus}
              onChange={(e) => handleChange('currentFocus', e.target.value)}
              placeholder="e.g. Data Structures, Python, & Modern Web Architecture"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                placeholder="https://github.com/your-username"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Instagram URL (Optional)
              </label>
              <input
                type="text"
                value={formData.instagramUrl || ''}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/your-profile"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Permanent code hint */}
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>To permanently save into the codebase, update <code>src/data/portfolioData.ts</code>.</span>
            <button
              type="button"
              onClick={handleCopyJson}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Placeholders</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Apply to Website</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

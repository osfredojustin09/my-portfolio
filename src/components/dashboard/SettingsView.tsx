import React, { useState } from 'react';
import { Save, RotateCcw, Download, Trash2, CheckCircle2, User, Clock, Shield } from 'lucide-react';
import { UserPreferences, TaskItem, StudySession } from '../../types/dashboard';

interface SettingsViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (pref: UserPreferences) => void;
  onResetDemoData: () => void;
  onClearAllData: () => void;
  tasks: TaskItem[];
  studySessions: StudySession[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
  onResetDemoData,
  onClearAllData,
  tasks,
  studySessions,
}) => {
  const [studentName, setStudentName] = useState(preferences.studentName);
  const [gradeLevel, setGradeLevel] = useState(preferences.gradeLevel);
  const [academicGoal, setAcademicGoal] = useState(preferences.academicGoal);
  const [focusDuration, setFocusDuration] = useState(preferences.pomodoro.focusDuration);
  const [shortBreak, setShortBreak] = useState(preferences.pomodoro.shortBreakDuration);
  const [longBreak, setLongBreak] = useState(preferences.pomodoro.longBreakDuration);
  const [soundEnabled, setSoundEnabled] = useState(preferences.pomodoro.soundEnabled);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences({
      studentName: studentName.trim() || 'Justin Osfredo',
      gradeLevel: gradeLevel.trim(),
      academicGoal: academicGoal.trim(),
      pomodoro: {
        ...preferences.pomodoro,
        focusDuration: Number(focusDuration) || 25,
        shortBreakDuration: Number(shortBreak) || 5,
        longBreakDuration: Number(longBreak) || 15,
        soundEnabled,
      },
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      preferences,
      tasks,
      studySessions,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_dashboard_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Preferences & Configuration
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
          Dashboard Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize student profile details, adjust Pomodoro session intervals, and manage local storage data.
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Your preferences have been saved and applied to the dashboard!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Details Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Student Profile Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Level / Year
              </label>
              <input
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Academic Mission / Goal
            </label>
            <input
              type="text"
              value={academicGoal}
              onChange={(e) => setAcademicGoal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pomodoro Timer Configuration */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Focus & Break Durations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Focus Duration (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={90}
                value={focusDuration}
                onChange={(e) => setFocusDuration(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Break (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Long Break (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={60}
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs">
            <input
              type="checkbox"
              id="sound-pref"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sound-pref" className="text-slate-700 dark:text-slate-300 font-medium">
              Play harmonic chime audio when timer session completes
            </label>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

      {/* Data Management & Backup */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Shield className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Data Storage & Backups
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          All tasks, study sessions, and timers are saved securely in your web browser's <strong className="text-slate-900 dark:text-white">localStorage</strong>. You can export a portable JSON backup, restore realistic demo assignments, or reset the database cleanly.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup (JSON)</span>
          </button>

          <button
            type="button"
            onClick={onResetDemoData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors border border-blue-200/60 dark:border-blue-900/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Demo Sample Data</span>
          </button>

          <button
            type="button"
            onClick={onClearAllData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-xl transition-colors border border-rose-200/60 dark:border-rose-900/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Data & Start Blank</span>
          </button>
        </div>
      </div>

    </div>
  );
};

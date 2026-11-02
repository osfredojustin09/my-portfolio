import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, AlertCircle } from 'lucide-react';
import { StudySession, SubjectType } from '../../types/dashboard';

interface StudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Omit<StudySession, 'id'> & { id?: string }) => void;
  initialSession?: StudySession | null;
}

const subjects: SubjectType[] = [
  'Mathematics',
  'English',
  'Computer Science',
  'Science',
  'History',
  'Other',
];

export const StudySessionModal: React.FC<StudySessionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSession,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<SubjectType>('Mathematics');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('16:00');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialSession) {
      setTitle(initialSession.title);
      setSubject(initialSession.subject);
      setDate(initialSession.date);
      setStartTime(initialSession.startTime);
      setDurationMinutes(initialSession.durationMinutes);
      setCompleted(initialSession.completed);
      setNotes(initialSession.notes || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      setTitle('');
      setSubject('Mathematics');
      setDate(today);
      setStartTime('16:00');
      setDurationMinutes(60);
      setCompleted(false);
      setNotes('');
    }
    setError('');
  }, [initialSession, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a session title.');
      return;
    }
    if (!date) {
      setError('Please choose a session date.');
      return;
    }

    onSave({
      id: initialSession?.id,
      title: title.trim(),
      subject,
      date,
      startTime,
      durationMinutes: Number(durationMinutes) || 45,
      completed,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {initialSession ? 'Edit Study Block' : 'Schedule Study Session'}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
            {initialSession ? 'Update Study Session' : 'Plan Focus Block'}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Session Focus Topic *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Light Refraction Problems"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min={15}
                step={15}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Session Goal / Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Read textbook pages 110-125 and complete summary"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="session-completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="session-completed" className="text-slate-700 dark:text-slate-300 font-medium">
              Mark session as completed
            </label>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{initialSession ? 'Save Changes' : 'Schedule Session'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

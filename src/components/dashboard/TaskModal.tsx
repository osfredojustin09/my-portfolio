import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, AlertCircle, BookOpen, Tag } from 'lucide-react';
import { TaskItem, SubjectType, PriorityType, TaskStatus } from '../../types/dashboard';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<TaskItem, 'id' | 'createdAt'> & { id?: string }) => void;
  initialTask?: TaskItem | null;
}

const subjects: SubjectType[] = [
  'Mathematics',
  'English',
  'Computer Science',
  'Science',
  'History',
  'Other',
];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<SubjectType>('Computer Science');
  const [priority, setPriority] = useState<PriorityType>('Medium');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [dueDate, setDueDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(60);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setSubject(initialTask.subject);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate);
      setEstimatedMinutes(initialTask.estimatedMinutes || 60);
      setNotes(initialTask.notes || '');
    } else {
      // Default to tomorrow
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setTitle('');
      setDescription('');
      setSubject('Computer Science');
      setPriority('Medium');
      setStatus('Pending');
      setDueDate(tomorrow);
      setEstimatedMinutes(60);
      setNotes('');
    }
    setError('');
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an assignment title.');
      return;
    }
    if (!dueDate) {
      setError('Please specify a due date.');
      return;
    }

    onSave({
      id: initialTask?.id,
      title: title.trim(),
      description: description.trim(),
      subject,
      priority,
      status,
      dueDate,
      estimatedMinutes: Number(estimatedMinutes) || 30,
      notes: notes.trim(),
      completedAt: status === 'Completed' ? initialTask?.completedAt || new Date().toISOString() : undefined,
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
            {initialTask ? 'Edit Assignment' : 'New Assignment'}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
            {initialTask ? 'Update Assignment Details' : 'Create Academic Task'}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assignment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Calculus Problem Set 4"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be accomplished in this assignment?"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Subject
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
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Due Date & Estimated Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Est. Duration (Minutes)
              </label>
              <input
                type="number"
                min={5}
                step={5}
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-2 text-center rounded-lg border transition-colors font-medium text-xs ${
                    status === st
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Study Notes / Reminders (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Check formulas on page 42"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Modal Actions */}
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
              <span>{initialTask ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

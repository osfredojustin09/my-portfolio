import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2, Circle, BookOpen, Calendar, Filter } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const defaultTasks: Task[] = [
  {
    id: 't1',
    title: 'CS Algorithm Analysis - Binary Search Trace',
    subject: 'Computer Science',
    dueDate: 'Tomorrow',
    completed: false,
    priority: 'High',
  },
  {
    id: 't2',
    title: 'Mathematics: Calculus Problem Set #4',
    subject: 'Math',
    dueDate: 'In 3 days',
    completed: true,
    priority: 'Medium',
  },
  {
    id: 't3',
    title: 'Physics Lab Report: Rotational Dynamics',
    subject: 'Physics',
    dueDate: 'Next Monday',
    completed: false,
    priority: 'Low',
  },
];

interface TaskPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskPreviewModal: React.FC<TaskPreviewModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('justin_portfolio_demo_tasks');
      return saved ? JSON.parse(saved) : defaultTasks;
    } catch {
      return defaultTasks;
    }
  });

  const [activeSubject, setActiveSubject] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Computer Science');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  useEffect(() => {
    try {
      localStorage.setItem('justin_portfolio_demo_tasks', JSON.stringify(tasks));
    } catch {
      // storage unavailable
    }
  }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: 'task_' + Date.now(),
      title: newTitle.trim(),
      subject: newSubject,
      dueDate: 'Due this week',
      completed: false,
      priority: newPriority,
    };
    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  const handleReset = () => {
    setTasks(defaultTasks);
  };

  const subjects = ['All', 'Computer Science', 'Math', 'Physics'];
  const filteredTasks = activeSubject === 'All'
    ? tasks
    : tasks.filter((t) => t.subject === activeSubject);

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Interactive App Sandbox</span>
            </div>
            <h2 id="preview-modal-title" className="text-xl font-bold tracking-tight">
              Class Notes & Task Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live functional demonstration of Justin's high school assignment and note tracker logic.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close interactive sandbox"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress summary banner */}
        <div className="py-3 px-4 my-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Completion Progress:
            </span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {completedCount} / {tasks.length} Done
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
          >
            Reset demo data
          </button>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="space-y-3 mb-5">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Read Operating Systems Chapter 3..."
              className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="General">General</option>
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </form>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-2 pb-2 text-xs border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Subject:</span>
          </div>
          <div className="flex items-center gap-1">
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setActiveSubject(sub)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  activeSubject === sub
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 my-2 pr-1">
          {filteredTasks.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No tasks found for "{activeSubject}". Add one above!
            </div>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t.id}
                className="py-3 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => handleToggle(t.id)}
                    aria-label={t.completed ? 'Mark incomplete' : 'Mark complete'}
                    className="mt-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                  >
                    {t.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-medium truncate ${
                        t.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="font-medium text-blue-600 dark:text-blue-400">{t.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  aria-label="Delete task"
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Data persists in your browser localStorage</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};

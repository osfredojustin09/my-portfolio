import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Timer,
  Settings,
  ArrowLeft,
  Plus,
  Moon,
  Sun,
  Bell,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import {
  TaskItem,
  StudySession,
  UserPreferences,
  initialTasks,
  initialStudySessions,
  defaultPreferences
} from '../../types/dashboard';
import { MainOverview } from './MainOverview';
import { TasksView } from './TasksView';
import { StudyPlannerView } from './StudyPlannerView';
import { AnalyticsView } from './AnalyticsView';
import { PomodoroTimer } from './PomodoroTimer';
import { SettingsView } from './SettingsView';
import { TaskModal } from './TaskModal';
import { StudySessionModal } from './StudySessionModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface ProductivityAppProps {
  onExit: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ProductivityApp: React.FC<ProductivityAppProps> = ({
  onExit,
  isDark,
  toggleTheme,
}) => {
  type ActiveNav = 'overview' | 'tasks' | 'calendar' | 'analytics' | 'timer' | 'settings';
  const [activeNav, setActiveNav] = useState<ActiveNav>('overview');

  // Persistence in localStorage
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('justin_studentos_tasks');
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    try {
      const saved = localStorage.getItem('justin_studentos_sessions');
      return saved ? JSON.parse(saved) : initialStudySessions;
    } catch {
      return initialStudySessions;
    }
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('justin_studentos_preferences');
      return saved ? JSON.parse(saved) : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('justin_studentos_tasks', JSON.stringify(tasks));
    } catch {
      // storage unavailable
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('justin_studentos_sessions', JSON.stringify(studySessions));
    } catch {
      // storage unavailable
    }
  }, [studySessions]);

  useEffect(() => {
    try {
      localStorage.setItem('justin_studentos_preferences', JSON.stringify(preferences));
    } catch {
      // storage unavailable
    }
  }, [preferences]);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // CRUD Handlers for Tasks
  const handleSaveTask = (taskData: Omit<TaskItem, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      // Update
      setTasks(tasks.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t)));
    } else {
      // Create new
      const newTask: TaskItem = {
        ...taskData,
        id: 'task-' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'Completed' ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTaskPrompt = (task: TaskItem) => {
    setDeleteDialog({
      isOpen: true,
      title: 'Delete Assignment',
      message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
      onConfirm: () => {
        setTasks(tasks.filter((t) => t.id !== task.id));
        setDeleteDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // CRUD Handlers for Sessions
  const handleSaveSession = (sessionData: Omit<StudySession, 'id'> & { id?: string }) => {
    if (sessionData.id) {
      setStudySessions(studySessions.map((s) => (s.id === sessionData.id ? { ...s, ...sessionData } : s)));
    } else {
      const newSession: StudySession = {
        ...sessionData,
        id: 'session-' + Date.now(),
      };
      setStudySessions([newSession, ...studySessions]);
    }
  };

  const handleToggleSession = (id: string) => {
    setStudySessions(
      studySessions.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDeleteSessionPrompt = (session: StudySession) => {
    setDeleteDialog({
      isOpen: true,
      title: 'Delete Study Session',
      message: `Delete "${session.title}" on ${session.date}?`,
      onConfirm: () => {
        setStudySessions(studySessions.filter((s) => s.id !== session.id));
        setDeleteDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Reset to default sample demo data
  const handleResetDemoData = () => {
    setTasks(initialTasks);
    setStudySessions(initialStudySessions);
    setPreferences(defaultPreferences);
  };

  // Clear all data
  const handleClearAllData = () => {
    setTasks([]);
    setStudySessions([]);
  };

  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'calendar', label: 'Study Planner', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'timer', label: 'Focus Timer', icon: Timer },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080C14] text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0E131F]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Exit button & App Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            title="Return to Justin Osfredo's Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block leading-tight">
                StudentOS
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium block">
                Productivity Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Assignment */}
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Task</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Profile Pill */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[11px] text-slate-700 dark:text-slate-200">
              JO
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                {preferences.studentName}
              </p>
              <p className="text-[10px] text-slate-400">Grade 12</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (Sidebar + Content Pane) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar */}
        <aside className="w-60 border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] hidden md:flex flex-col justify-between p-4 shrink-0">
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 block">
              Navigation
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id as ActiveNav)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Academic Tip footer in sidebar */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
              Offline Ready
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your tasks & timer stats persist locally in browser storage.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeNav === 'overview' && (
            <MainOverview
              tasks={tasks}
              studySessions={studySessions}
              preferences={preferences}
              onOpenNewTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onOpenNewSession={() => {
                setEditingSession(null);
                setIsSessionModalOpen(true);
              }}
              onNavigate={(v) => setActiveNav(v)}
              onToggleTask={handleToggleTask}
            />
          )}

          {activeNav === 'tasks' && (
            <TasksView
              tasks={tasks}
              onOpenNewTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onEditTask={(task) => {
                setEditingTask(task);
                setIsTaskModalOpen(true);
              }}
              onDeleteTaskPrompt={handleDeleteTaskPrompt}
              onToggleTask={handleToggleTask}
            />
          )}

          {activeNav === 'calendar' && (
            <StudyPlannerView
              tasks={tasks}
              studySessions={studySessions}
              onOpenNewSession={() => {
                setEditingSession(null);
                setIsSessionModalOpen(true);
              }}
              onEditSession={(s) => {
                setEditingSession(s);
                setIsSessionModalOpen(true);
              }}
              onDeleteSessionPrompt={handleDeleteSessionPrompt}
              onToggleSession={handleToggleSession}
            />
          )}

          {activeNav === 'analytics' && (
            <AnalyticsView
              tasks={tasks}
              studySessions={studySessions}
            />
          )}

          {activeNav === 'timer' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Focus Session
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Pomodoro Study Timer
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Stay focused on your school assignments using scientific time-boxing.
                </p>
              </div>

              <PomodoroTimer
                settings={preferences.pomodoro}
                onUpdateSettings={(newSettings) => {
                  setPreferences({ ...preferences, pomodoro: newSettings });
                }}
              />
            </div>
          )}

          {activeNav === 'settings' && (
            <SettingsView
              preferences={preferences}
              onUpdatePreferences={(p) => setPreferences(p)}
              onResetDemoData={handleResetDemoData}
              onClearAllData={handleClearAllData}
              tasks={tasks}
              studySessions={studySessions}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden sticky bottom-0 z-40 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id as ActiveNav)}
              className={`p-2 rounded-xl flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Task Creation & Editing Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Study Session Creation & Editing Modal */}
      <StudySessionModal
        isOpen={isSessionModalOpen}
        onClose={() => {
          setIsSessionModalOpen(false);
          setEditingSession(null);
        }}
        onSave={handleSaveSession}
        initialSession={editingSession}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.title}
        message={deleteDialog.message}
        onConfirm={deleteDialog.onConfirm}
        onCancel={() => setDeleteDialog((prev) => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
};

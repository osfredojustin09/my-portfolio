import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Circle,
  Play
} from 'lucide-react';
import { TaskItem, StudySession, UserPreferences } from '../../types/dashboard';

interface MainOverviewProps {
  tasks: TaskItem[];
  studySessions: StudySession[];
  preferences: UserPreferences;
  onOpenNewTask: () => void;
  onOpenNewSession: () => void;
  onNavigate: (view: 'overview' | 'tasks' | 'calendar' | 'analytics' | 'timer' | 'settings') => void;
  onToggleTask: (id: string) => void;
}

export const MainOverview: React.FC<MainOverviewProps> = ({
  tasks,
  studySessions,
  preferences,
  onOpenNewTask,
  onOpenNewSession,
  onNavigate,
  onToggleTask,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const formattedToday = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate live statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;

  // Upcoming deadlines within 3 days
  const now = new Date();
  const threeDaysFromNow = new Date(Date.now() + 86400000 * 3);
  const urgentTasks = tasks
    .filter((t) => {
      if (t.status === 'Completed') return false;
      const due = new Date(t.dueDate);
      return due <= threeDaysFromNow;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Today's study sessions
  const todaysSessions = studySessions
    .filter((s) => s.date === todayStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Completion rate
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Subject breakdown for mini-chart
  const subjectCounts: { [key: string]: { total: number; completed: number } } = {};
  tasks.forEach((t) => {
    if (!subjectCounts[t.subject]) {
      subjectCounts[t.subject] = { total: 0, completed: 0 };
    }
    subjectCounts[t.subject].total += 1;
    if (t.status === 'Completed') {
      subjectCounts[t.subject].completed += 1;
    }
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. Welcome Section */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none [background:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedToday}</span>
              <span aria-hidden="true">·</span>
              <span>{preferences.gradeLevel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {preferences.studentName}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              "Small daily disciplines turn academic challenges into lifelong mastery." You have <strong className="font-semibold underline underline-offset-2">{pendingTasks} pending tasks</strong> and <strong className="font-semibold underline underline-offset-2">{todaysSessions.length} study sessions</strong> scheduled today.
            </p>
          </div>

          {/* Quick Action buttons inside welcome banner */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
            <button
              type="button"
              onClick={onOpenNewTask}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
            <button
              type="button"
              onClick={onOpenNewSession}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-800/80 hover:bg-blue-800 transition-colors border border-blue-400/40"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Plan Study Block</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 Statistics Cards Calculated from actual data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Tasks */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Total Assignments</span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {totalTasks}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all enrolled subjects</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Completed</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {completedTasks}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {completionRate}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Accomplished milestones</p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Pending Tasks</span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {pendingTasks}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Active assignments in queue</p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Upcoming &lt;3 Days</span>
            <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {urgentTasks.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">High urgency items</p>
          </div>
        </div>
      </div>

      {/* 3. Main Split Grid: Upcoming Tasks & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Upcoming Tasks sorted by deadline */}
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span>Upcoming Assignments</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Sorted chronologically by nearest deadline</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({tasks.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No assignments recorded. Click "Add Task" to get started!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {tasks.slice(0, 5).map((task) => {
                const isOverdue = new Date(task.dueDate) < new Date(todayStr) && task.status !== 'Completed';
                const isCompleted = task.status === 'Completed';

                return (
                  <div
                    key={task.id}
                    className="py-3 flex items-start justify-between gap-3 group transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        aria-label={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                        className="mt-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isCompleted
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400 mt-0.5">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {task.subject}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            {task.dueDate}
                          </span>
                          {isOverdue && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-rose-600 dark:text-rose-400 font-bold">Overdue</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className={`font-mono ${task.priority === 'High' ? 'text-rose-500' : task.priority === 'Medium' ? 'text-amber-500' : 'text-slate-400'}`}>
                            {task.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : task.status === 'In Progress'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Today's Schedule Timeline & Focus Timer Widget */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Today's Schedule Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Today's Study Schedule</span>
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Calendar
              </button>
            </div>

            {todaysSessions.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No study sessions scheduled for today. Plan one now!
              </div>
            ) : (
              <div className="space-y-3">
                {todaysSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {session.startTime}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {session.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {session.subject} · {session.durationMinutes} mins
                      </p>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      session.completed
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                    }`}>
                      {session.completed ? 'Done' : 'Upcoming'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={onOpenNewSession}
              className="w-full py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule New Focus Block</span>
            </button>
          </div>

          {/* Quick Focus Mode Card */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 dark:from-indigo-950/30 dark:via-slate-900 dark:to-blue-950/20 border border-indigo-200/60 dark:border-indigo-900/40 shadow-xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                Pomodoro Focus Timer
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Ready for deep study?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                25-minute focus intervals with audio chimes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('timer')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs shrink-0"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Open Timer</span>
            </button>
          </div>

        </div>

      </div>

      {/* 4. Productivity Overview Charts Bar */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Productivity & Subject Progress Breakdown</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live calculated completion metrics across all enrolled courses
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('analytics')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Full Analytics Report</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Subject progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {Object.entries(subjectCounts).map(([subj, counts]) => {
            const pct = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;
            return (
              <div
                key={subj}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">{subj}</span>
                  <span className="font-mono text-slate-400">
                    {counts.completed}/{counts.total} ({pct}%)
                  </span>
                </div>
                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

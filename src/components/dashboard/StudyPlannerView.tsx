import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  CheckCircle2,
  Trash2,
  Edit2
} from 'lucide-react';
import { TaskItem, StudySession } from '../../types/dashboard';

interface StudyPlannerViewProps {
  tasks: TaskItem[];
  studySessions: StudySession[];
  onOpenNewSession: () => void;
  onEditSession: (session: StudySession) => void;
  onDeleteSessionPrompt: (session: StudySession) => void;
  onToggleSession: (id: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  tasks,
  studySessions,
  onOpenNewSession,
  onEditSession,
  onDeleteSessionPrompt,
  onToggleSession,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [plannerView, setPlannerView] = useState<'month' | 'schedule'>('month');

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthYearLabel = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Calendar Grid generation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  // Empty padding for days before the 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push(formatted);
  }

  // Items for selected day
  const selectedDayTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const selectedDaySessions = studySessions.filter((s) => s.date === selectedDate);

  const dayOfWeekHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Calendar & Time Blocking
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Study Planner & Academic Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Map out study hours, track deadlines, and maintain consistent review routines.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setPlannerView('month')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                plannerView === 'month'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Month Grid
            </button>
            <button
              type="button"
              onClick={() => setPlannerView('schedule')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                plannerView === 'schedule'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Session List
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenNewSession}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Session</span>
          </button>
        </div>
      </div>

      {plannerView === 'month' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            
            {/* Month Navigator */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {monthYearLabel}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    setCurrentDate(now);
                    setSelectedDate(now.toISOString().split('T')[0]);
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 pb-1">
              {dayOfWeekHeaders.map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((dateStr, idx) => {
                if (!dateStr) {
                  return <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-slate-50/40 dark:bg-slate-900/40" />;
                }

                const dayNum = parseInt(dateStr.split('-')[2], 10);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === new Date().toISOString().split('T')[0];

                const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
                const daySessions = studySessions.filter((s) => s.date === dateStr);

                return (
                  <div
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all border flex flex-col justify-between text-left ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 dark:bg-blue-950/30'
                        : isToday
                        ? 'border-blue-300 dark:border-blue-800 bg-white dark:bg-slate-900'
                        : 'border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center'
                          : isSelected
                          ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {dayNum}
                      </span>
                    </div>

                    {/* Small Activity Indicator Dots */}
                    <div className="flex flex-col gap-0.5 mt-1 overflow-hidden">
                      {dayTasks.slice(0, 1).map((t) => (
                        <div
                          key={t.id}
                          className="text-[9px] px-1 py-0.2 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 truncate font-medium"
                        >
                          Due: {t.title}
                        </div>
                      ))}
                      {daySessions.slice(0, 1).map((s) => (
                        <div
                          key={s.id}
                          className="text-[9px] px-1 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 truncate font-medium"
                        >
                          Study: {s.title}
                        </div>
                      ))}
                      {dayTasks.length + daySessions.length > 2 && (
                        <span className="text-[9px] text-slate-400 font-mono pl-1">
                          +{dayTasks.length + daySessions.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Assignment Deadline</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Study Session</span>
              </span>
            </div>
          </div>

          {/* Day Detail Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">
                  Schedule Details
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h3>
              </div>

              <button
                type="button"
                onClick={onOpenNewSession}
                className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                title="Schedule session for this date"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tasks due on this day */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                <span>Assignments Due ({selectedDayTasks.length})</span>
              </h4>
              {selectedDayTasks.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No assignments due on this date.</p>
              ) : (
                <div className="space-y-1.5">
                  {selectedDayTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {t.title}
                        </span>
                        <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{t.subject}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Study Sessions on this day */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Planned Study Sessions ({selectedDaySessions.length})</span>
              </h4>
              {selectedDaySessions.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No study blocks planned for this day.</p>
              ) : (
                <div className="space-y-2">
                  {selectedDaySessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onToggleSession(s.id)}
                            className="text-slate-400 hover:text-blue-500"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${s.completed ? 'text-emerald-500' : 'text-slate-300'}`}
                            />
                          </button>
                          <span className={`font-semibold ${s.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                            {s.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-5">
                          {s.startTime} · {s.durationMinutes} mins · {s.subject}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEditSession(s)}
                          className="p-1 text-slate-400 hover:text-blue-500"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSessionPrompt(s)}
                          className="p-1 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Full Session List View */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            All Scheduled Study Blocks ({studySessions.length})
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {studySessions.map((session) => (
              <div
                key={session.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleSession(session.id)}
                    className="text-slate-400 hover:text-blue-500"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${session.completed ? 'text-emerald-500' : 'text-slate-300'}`}
                    />
                  </button>
                  <div>
                    <h3 className={`font-bold ${session.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {session.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {session.date} at {session.startTime} · {session.durationMinutes} mins · {session.subject}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEditSession(session)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteSessionPrompt(session)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

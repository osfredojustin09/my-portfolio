import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Circle,
  Calendar,
  AlertCircle,
  Edit2,
  Trash2,
  ArrowUpDown,
  BookOpen,
  Clock,
  Sparkles
} from 'lucide-react';
import { TaskItem, SubjectType, PriorityType, TaskStatus } from '../../types/dashboard';

interface TasksViewProps {
  tasks: TaskItem[];
  onOpenNewTask: () => void;
  onEditTask: (task: TaskItem) => void;
  onDeleteTaskPrompt: (task: TaskItem) => void;
  onToggleTask: (id: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onOpenNewTask,
  onEditTask,
  onDeleteTaskPrompt,
  onToggleTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'dueDateAsc' | 'dueDateDesc' | 'priority' | 'title'>('dueDateAsc');

  const todayStr = new Date().toISOString().split('T')[0];

  const subjects = ['All', 'Mathematics', 'English', 'Computer Science', 'Science', 'History', 'Other'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  // Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesSubject = selectedSubject === 'All' || task.subject === selectedSubject;
    const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
    const matchesQuery =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesPriority && matchesStatus && matchesQuery;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDateAsc') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'dueDateDesc') {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const weight = { High: 3, Medium: 2, Low: 1 };
      return weight[b.priority] - weight[a.priority];
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Task Management System
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Academic Assignments & Deadlines
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track, filter, and prioritize your coursework across all subjects.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewTask}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
        
        {/* Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title, description, or notes..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="dueDateAsc">Due Date (Earliest First)</option>
              <option value="dueDateDesc">Due Date (Latest First)</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Badges Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Subjects */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1 text-[11px]">Subject:</span>
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1 text-[11px]">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedStatus === st
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Task List */}
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No matching assignments found
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try resetting your search query or subject filters, or click below to create a new assignment.
            </p>
            <button
              type="button"
              onClick={onOpenNewTask}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Assignment</span>
            </button>
          </div>
        ) : (
          sortedTasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            const isOverdue = new Date(task.dueDate) < new Date(todayStr) && !isCompleted;
            const isDueToday = task.dueDate === todayStr && !isCompleted;

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                  isCompleted ? 'opacity-70 border-slate-200/60 dark:border-slate-800/60' : 'border-slate-200/90 dark:border-slate-800'
                }`}
              >
                {/* Left content area */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  {/* Complete checkbox button */}
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    aria-label={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                    className="mt-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 hover:text-blue-500" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {task.subject}
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold'
                          : task.priority === 'Medium'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {task.priority} Priority
                      </span>
                      {isOverdue && (
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Overdue</span>
                        </span>
                      )}
                      {isDueToday && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                          Due Today
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {task.notes && (
                      <p className="text-[11px] text-slate-400 italic">
                        Note: {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right metadata & Action buttons */}
                <div className="flex sm:flex-col sm:items-end justify-between items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate}</span>
                    </span>
                    {task.estimatedMinutes && (
                      <span className="text-[10px] text-slate-400 font-mono block">
                        ~{task.estimatedMinutes} mins
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onEditTask(task)}
                      title="Edit task"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteTaskPrompt(task)}
                      title="Delete task"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

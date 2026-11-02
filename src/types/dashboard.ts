export type SubjectType =
  | 'Mathematics'
  | 'English'
  | 'Computer Science'
  | 'Science'
  | 'History'
  | 'Other';

export type PriorityType = 'Low' | 'Medium' | 'High';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  subject: SubjectType;
  priority: PriorityType;
  status: TaskStatus;
  dueDate: string; // YYYY-MM-DD
  notes?: string;
  estimatedMinutes?: number;
  completedAt?: string;
  createdAt: string;
}

export interface StudySession {
  id: string;
  title: string;
  subject: SubjectType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface PomodoroSettings {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  longBreakInterval: number; // sessions before long break
  soundEnabled: boolean;
  autoStartBreaks: boolean;
}

export interface UserPreferences {
  studentName: string;
  gradeLevel: string;
  academicGoal: string;
  pomodoro: PomodoroSettings;
}

export const defaultPomodoroSettings: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  soundEnabled: true,
  autoStartBreaks: false,
};

export const defaultPreferences: UserPreferences = {
  studentName: 'Justin Osfredo',
  gradeLevel: 'Grade 12 Senior High School',
  academicGoal: 'Excel in high school examinations & build foundational computer science projects',
  pomodoro: defaultPomodoroSettings,
};

// Realistic initial sample assignments
export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Complete Mathematics Calculus Problem Set',
    description: 'Solve differential equations and curve sketching exercises from chapter 4.',
    subject: 'Mathematics',
    priority: 'High',
    status: 'In Progress',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    notes: 'Focus on question 8 and 14 which involve optimization curves.',
    estimatedMinutes: 90,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Prepare English Literature Presentation',
    description: 'Create 8 slides summarizing character motivations and thematic motifs in 1984.',
    subject: 'English',
    priority: 'Medium',
    status: 'Pending',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days
    notes: 'Rehearse delivery timing to keep under 7 minutes.',
    estimatedMinutes: 60,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Study JavaScript Asynchronous Patterns & Fetch API',
    description: 'Read MDN documentation on Promises, async/await, and error handling with try/catch.',
    subject: 'Computer Science',
    priority: 'High',
    status: 'Completed',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    notes: 'Built a small test script testing Promise.all() concurrency.',
    estimatedMinutes: 120,
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Review Computer Science Binary Search Tree Notes',
    description: 'Trace in-order, pre-order, and post-order node traversals on paper.',
    subject: 'Computer Science',
    priority: 'Medium',
    status: 'Pending',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    notes: 'Include recursive base case diagram in notebook.',
    estimatedMinutes: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Finish Physics Laboratory Report on Optics',
    description: 'Calculate refractive indices and compile experimental error margins from Friday lab.',
    subject: 'Science',
    priority: 'High',
    status: 'Pending',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    notes: 'Graph Snell Law data points using Google Sheets.',
    estimatedMinutes: 75,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Read World History Chapter on Industrial Revolution',
    description: 'Summarize economic shifts, technological innovations, and social reforms.',
    subject: 'History',
    priority: 'Low',
    status: 'Completed',
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    notes: 'Completed mindmap in study journal.',
    estimatedMinutes: 50,
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export const initialStudySessions: StudySession[] = [
  {
    id: 'session-1',
    title: 'Calculus Review & Problem Solving',
    subject: 'Mathematics',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '15:30',
    durationMinutes: 60,
    completed: true,
    notes: 'Reviewed chain rule and trigonometric limits.',
  },
  {
    id: 'session-2',
    title: 'CS Algorithm Implementation Session',
    subject: 'Computer Science',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '17:00',
    durationMinutes: 90,
    completed: false,
    notes: 'Focus on debugging array partitioning logic.',
  },
  {
    id: 'session-3',
    title: 'Physics Lab Data Analysis',
    subject: 'Science',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: '16:00',
    durationMinutes: 45,
    completed: false,
    notes: 'Double check refractive index formulas.',
  },
  {
    id: 'session-4',
    title: 'English Speech Outline & Rehearsal',
    subject: 'English',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    startTime: '19:00',
    durationMinutes: 45,
    completed: false,
  },
];

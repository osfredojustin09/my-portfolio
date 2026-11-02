import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Play, ArrowUpRight, Copy, Check, RotateCcw } from 'lucide-react';

interface TerminalProps {
  onOpenProductivityApp?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  compact?: boolean;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  onOpenProductivityApp,
  onNavigateSection,
  compact = false,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'welcome',
      timestamp: '00:01',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-semibold">
            Justin Osfredo - Interactive Developer Terminal [v2.4]
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-cyan-400 font-bold font-mono">help</span> to view commands, or click any suggestion below to execute.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = [
    'help',
    'about',
    'skills',
    'projects',
    'dashboard',
    'journey',
    'world',
    'contact',
    'whoami',
    'clear',
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const id = `out-${Date.now()}`;

    if (cmd === 'clear') {
      setOutputs([]);
      setInput('');
      return;
    }

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-amber-300 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300 font-mono">
              <div><span className="text-cyan-400 font-bold">about</span> : Justin's background & education</div>
              <div><span className="text-cyan-400 font-bold">skills</span> : Core technologies & stacks</div>
              <div><span className="text-cyan-400 font-bold">projects</span> : Highlighted engineering projects</div>
              <div><span className="text-cyan-400 font-bold">dashboard</span> : Launch Student Dashboard app</div>
              <div><span className="text-cyan-400 font-bold">journey</span> : Learning timeline & milestones</div>
              <div><span className="text-cyan-400 font-bold">world</span> : Explore My Digital World hub</div>
              <div><span className="text-cyan-400 font-bold">contact</span> : Email & social channels</div>
              <div><span className="text-cyan-400 font-bold">whoami</span> : Profile summary</div>
              <div><span className="text-cyan-400 font-bold">clear</span> : Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        resultNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">Justin Osfredo</p>
            <p>Grade 12 Senior High School Student · Aspiring Software Developer</p>
            <p>Location: Indonesia | Email: osfredojustin@gmail.com</p>
            <p className="text-slate-400 pt-1">
              "Building digital experiences through structured logic, modern web stacks, and a relentless curiosity for how technology works beneath the surface."
            </p>
            {onNavigateSection && (
              <button
                type="button"
                onClick={() => onNavigateSection('about')}
                className="text-blue-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px] mt-1"
              >
                <span>Navigate to About section</span> &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-300 font-bold">Verified Technology Stacks:</p>
            <p><span className="text-amber-300">Languages:</span> Python, JavaScript (ES6+), HTML5, CSS3, SQL</p>
            <p><span className="text-amber-300">Frontend:</span> React, Tailwind CSS, Responsive Design, State Management</p>
            <p><span className="text-amber-300">Databases:</span> MySQL, Relational Schema Design, SQL Queries</p>
            <p><span className="text-amber-300">Tools:</span> Git, GitHub, VS Code, Linux Shell, Figma</p>
            <p><span className="text-blue-300">Exploring:</span> Data Structures, Algorithms, TypeScript Architecture</p>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-blue-400 font-bold font-mono">Featured Engineering Projects:</p>
            <div className="space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span>1. <strong className="text-white">Student Productivity Dashboard</strong> [Featured App]</span>
                {onOpenProductivityApp && (
                  <button
                    type="button"
                    onClick={onOpenProductivityApp}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" /> launch
                  </button>
                )}
              </div>
              <p className="text-slate-400 text-[11px] pl-4">Full academic planner with CRUD assignments, calendar, Pomodoro timer & analytics.</p>
              
              <div className="pt-1">
                <span>2. <strong className="text-white">Class Notes & Task Manager</strong> [Prototype]</span>
                <p className="text-slate-400 text-[11px] pl-4">Interactive assignment tracker with priority flags and local persistence.</p>
              </div>

              <div className="pt-1">
                <span>3. <strong className="text-white">Local Community Business Directory</strong> [Web Prototype]</span>
                <p className="text-slate-400 text-[11px] pl-4">Category-driven business portal with search and responsive directory cards.</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'dashboard':
      case 'launch':
        if (onOpenProductivityApp) {
          onOpenProductivityApp();
          resultNode = (
            <div className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launching Student Productivity Dashboard application...</span>
            </div>
          );
        } else {
          resultNode = (
            <p className="text-amber-300 font-mono text-xs">
              Student Productivity Dashboard can be launched from the Projects section.
            </p>
          );
        }
        break;

      case 'journey':
      case 'education':
        resultNode = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-purple-300 font-bold">Learning Journey Milestones:</p>
            <p className="text-slate-400">1. Tech Awakening & Curiosity</p>
            <p className="text-slate-400">2. Programming Fundamentals in Python</p>
            <p className="text-slate-400">3. Web Development with Modern JavaScript</p>
            <p className="text-slate-400">4. Personal Projects & Productivity Applications</p>
            <p className="text-slate-400">5. Relational Databases & System Architecture</p>
            <p className="text-slate-400">6. Advanced CS Foundations & University Admissions Prep</p>
          </div>
        );
        break;

      case 'world':
        if (onNavigateSection) {
          onNavigateSection('digital-world');
        }
        resultNode = (
          <div className="text-xs text-cyan-300 font-mono">
            <p className="font-bold">Explore My Digital World</p>
            <p className="text-slate-400">Interactive workspace featuring: My Workspace, My Projects, My Skills, My Learning Space, and My Future Goals.</p>
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">Contact Channels:</p>
            <p>Email: <a href="mailto:osfredojustin@gmail.com" className="text-blue-400 hover:underline">osfredojustin@gmail.com</a></p>
            <p>Status: Open to university academic inquiries, scholarships, and high school internships.</p>
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="text-xs text-rose-400 font-mono">
            Command not recognized: <span className="text-white font-bold">{rawCmd}</span>. Type <span className="text-cyan-400 font-bold">help</span> to view all commands.
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id,
        command: rawCmd,
        output: resultNode,
        timestamp: timeStr,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (current) {
        const match = availableCommands.find((c) => c.startsWith(current));
        if (match) {
          setInput(match);
        }
      }
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 shadow-2xl flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px]">justin@portfolio:~</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            live
          </span>
          <button
            type="button"
            onClick={() => handleCommand('clear')}
            title="Clear terminal"
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Suggested Command Quick Chips Bar */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
        <span className="text-slate-500 text-[10px] shrink-0 font-sans">Quick:</span>
        {availableCommands.slice(0, 6).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 text-[10px] border border-slate-700/60"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Screen */}
      <div
        className={`p-4 overflow-y-auto space-y-3 bg-[#0B0F17] text-slate-200 ${
          compact ? 'max-h-[220px]' : 'max-h-[300px] min-h-[200px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {outputs.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-slate-300 font-semibold">{item.command}</span>
              <span className="text-[9px] text-slate-600 font-mono">[{item.timestamp}]</span>
            </div>
            <div className="pl-3.5 border-l border-slate-800/80 py-0.5">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. help, projects, dashboard)..."
          className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-600 focus:outline-hidden font-mono"
        />
        <button
          type="button"
          onClick={() => handleCommand(input)}
          className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
          title="Execute command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

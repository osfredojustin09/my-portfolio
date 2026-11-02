import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import { PomodoroSettings } from '../../types/dashboard';

interface PomodoroTimerProps {
  settings: PomodoroSettings;
  onUpdateSettings?: (settings: PomodoroSettings) => void;
  onSessionComplete?: (type: 'focus' | 'break') => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  settings,
  onUpdateSettings,
  onSessionComplete,
}) => {
  type Mode = 'focus' | 'shortBreak' | 'longBreak';
  const [mode, setMode] = useState<Mode>('focus');
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  // Time remaining in seconds
  const getInitialSeconds = (m: Mode) => {
    switch (m) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(() => getInitialSeconds('focus'));
  const [totalSeconds, setTotalSeconds] = useState(() => getInitialSeconds('focus'));
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled ?? true);

  // Web Audio Chime player
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      // Harmonic chime chord
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  // Sync if settings change
  useEffect(() => {
    const s = getInitialSeconds(mode);
    setTotalSeconds(s);
    if (!isRunning) {
      setTimeLeft(s);
    }
  }, [settings.focusDuration, settings.shortBreakDuration, settings.longBreakDuration, mode]);

  // Timer interval
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playChime();
            if (mode === 'focus') {
              const nextCount = completedSessions + 1;
              setCompletedSessions(nextCount);
              onSessionComplete?.('focus');
              // Determine next break
              if (nextCount % settings.longBreakInterval === 0) {
                switchMode('longBreak');
              } else {
                switchMode('shortBreak');
              }
            } else {
              onSessionComplete?.('break');
              switchMode('focus');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, completedSessions, settings.longBreakInterval]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setIsRunning(false);
    const secs = getInitialSeconds(newMode);
    setTotalSeconds(secs);
    setTimeLeft(secs);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    const secs = getInitialSeconds(mode);
    setTimeLeft(secs);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      switchMode('shortBreak');
    } else {
      switchMode('focus');
    }
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG Progress Ring calculations
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const getModeColor = () => {
    switch (mode) {
      case 'focus':
        return {
          stroke: '#3B82F6', // Blue
          bgGlow: 'from-blue-500/10 via-indigo-500/5 to-transparent',
          badgeText: 'text-blue-600 dark:text-blue-400',
          badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
        };
      case 'shortBreak':
        return {
          stroke: '#10B981', // Emerald
          bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
          badgeText: 'text-emerald-600 dark:text-emerald-400',
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
        };
      case 'longBreak':
        return {
          stroke: '#8B5CF6', // Purple
          bgGlow: 'from-purple-500/10 via-violet-500/5 to-transparent',
          badgeText: 'text-purple-600 dark:text-purple-400',
          badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
        };
    }
  };

  const colors = getModeColor();

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.bgGlow} pointer-events-none transition-all duration-500`} />

      {/* Mode Switcher Tabs */}
      <div className="relative z-10 flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6 text-xs font-medium">
        <button
          type="button"
          onClick={() => switchMode('focus')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            mode === 'focus'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Deep Focus ({settings.focusDuration}m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('shortBreak')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            mode === 'shortBreak'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Short Break ({settings.shortBreakDuration}m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('longBreak')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            mode === 'longBreak'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Long Break ({settings.longBreakDuration}m)
        </button>
      </div>

      {/* Circular Progress Countdown */}
      <div className="relative z-10 w-64 h-64 flex items-center justify-center my-2">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
          {/* Base background circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="10"
          />
          {/* Animated active stroke */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="transparent"
            stroke={colors.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-linear"
          />
        </svg>

        {/* Center Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${colors.badgeBg} ${colors.badgeText}`}>
            {mode === 'focus' ? 'Focus Session' : mode === 'shortBreak' ? 'Short Break' : 'Rest & Recharge'}
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
            {timeFormatted}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
            {isRunning ? 'Timer active' : 'Paused / Ready'}
          </span>
        </div>
      </div>

      {/* Main Controls: Start/Pause, Reset, Skip */}
      <div className="relative z-10 flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={handleReset}
          title="Reset timer to beginning"
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleStartPause}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md active:scale-95 ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Start Session</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          title="Skip to next phase"
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Status Footer: Completed count + Sound toggle */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>
            Completed Focus Sessions: <strong className="text-slate-900 dark:text-white font-mono">{completedSessions}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Chime On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Muted</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

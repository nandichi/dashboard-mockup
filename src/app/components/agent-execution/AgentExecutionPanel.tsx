'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { agents, activityLogLines } from '@/data/agent-config';
import StepTimeline, { TimelineStep } from './StepTimeline';
import ActivityFeed, { LogLine } from './ActivityFeed';
import { cn } from '@/lib/utils';

interface AgentExecutionPanelProps {
  agentId: string;
  onClose: () => void;
  onComplete?: () => void;
}

function AnimatedCounter({ value, duration = 600 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prevRef.current = value;
      }
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  return <>{display.toLocaleString('nl-NL')}</>;
}

export default function AgentExecutionPanel({ agentId, onClose, onComplete }: AgentExecutionPanelProps) {
  const agent = agents.find((a) => a.id === agentId);
  const logSource = activityLogLines[agentId as keyof typeof activityLogLines] || [];

  const [running, setRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<LogLine[]>([]);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pausedRef = useRef(false);
  const pausedAtRef = useRef<number | null>(null);
  const totalPausedRef = useRef(0);

  const totalSteps = agent?.stappen.length || 0;
  const totalDuration = agent?.stappen.reduce((s, st) => s + st.duration, 0) || 10000;

  const currentMetrics = useMemo(() => {
    if (!agent?.metrics) return [];
    const stepIdx = Math.min(currentStep, totalSteps);
    return agent.metrics.map((m) => ({
      label: m.label,
      value: m.values[stepIdx] ?? 0,
    }));
  }, [agent, currentStep, totalSteps]);

  const currentDetail = useMemo(() => {
    if (!agent || !running || currentStep < 1 || currentStep > totalSteps) return null;
    return agent.stappen[currentStep - 1]?.detail || null;
  }, [agent, running, currentStep, totalSteps]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const finishRun = useCallback(() => {
    clearTimer();
    setRunning(false);
    setIsPaused(false);
    pausedRef.current = false;
    setSmoothProgress(100);
    setCurrentStep(totalSteps);
    setVisibleLogs(logSource);
    onComplete?.();
  }, [totalSteps, logSource, clearTimer, onComplete]);

  const togglePause = useCallback(() => {
    if (!running) return;
    if (pausedRef.current) {
      if (pausedAtRef.current) {
        totalPausedRef.current += Date.now() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      pausedRef.current = false;
      setIsPaused(false);
    } else {
      pausedAtRef.current = Date.now();
      pausedRef.current = true;
      setIsPaused(true);
    }
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && running && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [running, togglePause]);

  useEffect(() => {
    if (!running || !agent) return;

    startTimeRef.current = Date.now();
    totalPausedRef.current = 0;
    pausedAtRef.current = null;

    const getVisibleLogCount = (effectiveElapsed: number) => {
      const logsPerStep = Math.ceil(logSource.length / totalSteps);
      let accum = 0;

      for (let i = 0; i < totalSteps; i++) {
        const stepStart = accum;
        accum += agent.stappen[i].duration;
        const stepEnd = accum;
        const startLogIdx = i * logsPerStep;
        const endLogIdx = Math.min((i + 1) * logsPerStep, logSource.length);

        if (effectiveElapsed < stepEnd) {
          const stepProgress = Math.max(0, (effectiveElapsed - stepStart) / (stepEnd - stepStart));
          const stepLogCount = endLogIdx - startLogIdx;
          return startLogIdx + Math.ceil(stepProgress * stepLogCount);
        }
      }

      return logSource.length;
    };

    const getCurrentStep = (effectiveElapsed: number) => {
      let accum = 0;
      for (let i = 0; i < totalSteps; i++) {
        accum += agent.stappen[i].duration;
        if (effectiveElapsed < accum) return i;
      }
      return totalSteps;
    };

    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;

      const effectiveElapsed = Date.now() - startTimeRef.current - totalPausedRef.current;
      setElapsed(effectiveElapsed);

      const step = getCurrentStep(effectiveElapsed);
      setCurrentStep(step);

      const logCount = getVisibleLogCount(effectiveElapsed);
      setVisibleLogs(logSource.slice(0, logCount));

      const pct = Math.min((effectiveElapsed / totalDuration) * 100, 99);
      setSmoothProgress(pct);

      if (effectiveElapsed >= totalDuration + 500) {
        finishRun();
      }
    }, 80);

    return clearTimer;
  }, [running, agent, totalSteps, totalDuration, logSource, finishRun, clearTimer]);

  if (!agent) return null;

  const steps: TimelineStep[] = agent.stappen.map((s, i) => ({
    label: s.label,
    status: i < currentStep ? 'completed' : i === currentStep && running ? 'active' : 'waiting',
    duration: i < currentStep ? `${(s.duration / 1000).toFixed(1)}s` : undefined,
  }));

  const formatElapsed = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const remainder = s % 60;
    if (m > 0) return `${m}m ${remainder}s`;
    return `${s}s`;
  };

  return (
    <div className="fixed inset-0 z-60 bg-bg-primary/95 backdrop-blur-sm flex flex-col">
      <div className="h-1 bg-bg-input relative overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-liber to-placed absolute left-0 top-0"
          style={{
            width: `${smoothProgress}%`,
            transition: 'width 0.15s linear',
          }}
        />
        {running && !isPaused && (
          <div
            className="absolute top-0 h-full w-32 bg-linear-to-r from-transparent via-white/20 to-transparent animate-scan-line"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
            running && !isPaused ? 'bg-liber/20 animate-pulse-ring' : isPaused ? 'bg-warm/20' : 'bg-placed/20'
          )}>
            {isPaused ? (
              <svg className="w-5 h-5 text-warm" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : running ? (
              <svg className="w-5 h-5 text-liber-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-placed animate-scale-in" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-text-primary truncate">{agent.naam}</h2>
            <p className="text-xs text-text-secondary">{agent.rol}</p>
          </div>
          <span className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0',
            isPaused
              ? 'bg-warm/20 text-warm'
              : running
                ? 'bg-liber/20 text-liber-accent'
                : 'bg-placed/20 text-placed'
          )}>
            {isPaused ? 'Gepauzeerd' : running ? 'Bezig...' : 'Voltooid'}
          </span>
          <span className="text-xs text-text-muted font-mono shrink-0">{formatElapsed(elapsed)}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {running ? (
            <>
              <button
                onClick={togglePause}
                title={isPaused ? 'Hervat (spatiebalk)' : 'Pauzeer (spatiebalk)'}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                  isPaused
                    ? 'bg-placed/10 text-placed hover:bg-placed/20'
                    : 'bg-warm/10 text-warm hover:bg-warm/20'
                )}
              >
                {isPaused ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Hervat</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    <span>Pauzeer</span>
                  </>
                )}
                <span className="hidden sm:inline text-[10px] opacity-50">(spatie)</span>
              </button>
              <button
                onClick={finishRun}
                className="px-3 sm:px-4 py-2 rounded-lg bg-liber-red/10 text-liber-red text-sm font-medium hover:bg-liber-red/20 transition-colors"
              >
                Afbreken
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sluiten
            </button>
          )}
        </div>
      </div>

      {running ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6 overflow-y-auto shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Stappen</h3>
              <span className="text-xs text-text-muted font-mono">{currentStep}/{totalSteps}</span>
            </div>
            <div className="hidden lg:block">
              <StepTimeline steps={steps} variant="vertical" />
            </div>
            <div className="lg:hidden">
              <StepTimeline steps={steps} variant="horizontal" />
            </div>

            {currentMetrics.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Live statistieken</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className={cn(
                        'rounded-lg p-2.5 transition-all duration-500',
                        metric.value > 0
                          ? 'bg-liber/5 border border-liber/20'
                          : 'bg-bg-input border border-border'
                      )}
                    >
                      <p className={cn(
                        'text-lg font-bold tabular-nums transition-colors duration-300',
                        metric.value > 0 ? 'text-liber-accent' : 'text-text-muted'
                      )}>
                        <AnimatedCounter value={metric.value} />
                      </p>
                      <p className="text-[10px] text-text-muted leading-tight mt-0.5">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 sm:p-6 min-h-0 flex flex-col">
            {currentDetail && (
              <div className={cn(
                'mb-3 px-3 py-2 rounded-lg border animate-fade-in',
                isPaused ? 'bg-warm/5 border-warm/15' : 'bg-liber/5 border-liber/15'
              )}>
                <div className="flex items-center gap-2">
                  {isPaused ? (
                    <svg className="w-3 h-3 text-warm shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-liber-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-liber-accent" />
                    </span>
                  )}
                  <span className={cn(
                    'text-xs font-medium truncate',
                    isPaused ? 'text-warm' : 'text-liber-accent'
                  )}>{currentDetail}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Activiteit</h3>
              {running && currentStep > 0 && currentStep <= totalSteps && (
                isPaused ? (
                  <span className="flex items-center gap-1.5 text-xs text-warm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    Gepauzeerd
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-liber-accent">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-liber-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-liber-accent" />
                    </span>
                    Verwerken
                  </span>
                )
              )}
              <span className="text-[10px] text-text-muted font-mono ml-auto">{visibleLogs.length} regels</span>
            </div>
            <div className="flex-1 min-h-0">
              <ActivityFeed lines={visibleLogs} paused={isPaused} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-lg w-full text-center">
            <div className="w-16 h-16 rounded-full bg-placed/20 flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <svg className="w-8 h-8 text-placed" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Succesvol voltooid</h3>
            <p className="text-sm text-text-secondary mb-6">
              {agent.naam} heeft de run succesvol afgerond in {formatElapsed(elapsed)}.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="card-flat text-center p-3 sm:p-4">
                <p className="text-xl sm:text-2xl font-bold text-liber-accent">{agent.resultaatAantal}</p>
                <p className="text-xs text-text-muted mt-1">Resultaten</p>
              </div>
              <div className="card-flat text-center p-3 sm:p-4">
                <p className="text-xl sm:text-2xl font-bold text-placed">{totalSteps}</p>
                <p className="text-xs text-text-muted mt-1">Stappen</p>
              </div>
              <div className="card-flat text-center p-3 sm:p-4">
                <p className="text-xl sm:text-2xl font-bold text-text-primary">{formatElapsed(elapsed)}</p>
                <p className="text-xs text-text-muted mt-1">Duur</p>
              </div>
            </div>

            {agent.metrics.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                {agent.metrics.map((m) => {
                  const finalValue = m.values[m.values.length - 1];
                  return (
                    <div key={m.label} className="card-flat text-center p-2 sm:p-3">
                      <p className="text-lg font-bold text-text-primary">{finalValue.toLocaleString('nl-NL')}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{m.label}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={agent.resultaatLink}
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity text-center"
              >
                Bekijk resultaten
              </Link>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

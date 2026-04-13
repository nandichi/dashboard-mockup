'use client';

import { cn } from '@/lib/utils';

export interface TimelineStep {
  label: string;
  status: 'completed' | 'active' | 'waiting';
  duration?: string;
}

interface StepTimelineProps {
  steps: TimelineStep[];
  variant?: 'vertical' | 'horizontal';
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 animate-scale-in" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function VerticalTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300',
                step.status === 'completed' && 'bg-placed text-white',
                step.status === 'active' && 'bg-liber text-white animate-pulse-ring',
                step.status === 'waiting' && 'bg-bg-elevated text-text-muted border border-border'
              )}
            >
              {step.status === 'completed' ? (
                <CheckIcon />
              ) : step.status === 'active' ? (
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 h-8 relative bg-border overflow-hidden">
                <div
                  className={cn(
                    'absolute top-0 left-0 w-full bg-placed transition-all duration-700 ease-out',
                    step.status === 'completed' ? 'h-full' : 'h-0'
                  )}
                />
              </div>
            )}
          </div>
          <div className="pb-8 min-w-0">
            <p className={cn(
              'text-sm font-medium transition-colors duration-300',
              step.status === 'completed' && 'text-text-primary',
              step.status === 'active' && 'text-text-primary',
              step.status === 'waiting' && 'text-text-muted'
            )}>
              {step.label}
            </p>
            {step.duration && (
              <p className="text-xs text-placed mt-0.5 animate-fade-in">{step.duration}</p>
            )}
            {step.status === 'active' && (
              <p className="text-xs text-liber-accent mt-0.5 animate-fade-in">Bezig...</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function HorizontalTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="flex items-start gap-1 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center shrink-0">
          <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
            <div
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300',
                step.status === 'completed' && 'bg-placed text-white',
                step.status === 'active' && 'bg-liber text-white animate-pulse-ring',
                step.status === 'waiting' && 'bg-bg-elevated text-text-muted border border-border'
              )}
            >
              {step.status === 'completed' ? (
                <CheckIcon />
              ) : step.status === 'active' ? (
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span className={cn(
              'text-[10px] text-center leading-tight max-w-[70px]',
              step.status === 'active' ? 'text-text-primary font-medium' : 'text-text-muted'
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-6 h-0.5 relative bg-border mt-3 -mx-0.5 shrink-0 overflow-hidden">
              <div
                className={cn(
                  'absolute top-0 left-0 h-full bg-placed transition-all duration-700 ease-out',
                  step.status === 'completed' ? 'w-full' : 'w-0'
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function StepTimeline({ steps, variant = 'vertical' }: StepTimelineProps) {
  if (variant === 'horizontal') {
    return <HorizontalTimeline steps={steps} />;
  }
  return <VerticalTimeline steps={steps} />;
}

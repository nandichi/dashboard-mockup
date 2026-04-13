'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface LogLine {
  text: string;
  type: string;
  badge?: string;
}

interface ActivityFeedProps {
  lines: LogLine[];
  paused?: boolean;
}

const typeStyles: Record<string, { dot: string; text: string }> = {
  start: { dot: 'bg-text-muted/50', text: 'text-text-secondary' },
  connect: { dot: 'bg-[#14b8a6]', text: 'text-[#14b8a6]' },
  search: { dot: 'bg-liber-accent', text: 'text-liber-accent' },
  found: { dot: 'bg-placed', text: 'text-placed' },
  filter: { dot: 'bg-[#f59e0b]', text: 'text-[#f59e0b]' },
  ai: { dot: 'bg-[#a855f7]', text: 'text-[#a855f7]' },
  location: { dot: 'bg-[#14b8a6]', text: 'text-[#14b8a6]' },
  save: { dot: 'bg-[#64748b]', text: 'text-[#64748b]' },
  done: { dot: 'bg-placed', text: 'text-placed font-medium' },
  info: { dot: 'bg-text-muted/40', text: 'text-text-secondary' },
};

const badgeColors: Record<string, { bg: string; text: string }> = {
  Google: { bg: 'bg-[#4285f4]/15', text: 'text-[#4285f4]' },
  Indeed: { bg: 'bg-[#ff6d00]/15', text: 'text-[#ff6d00]' },
  LinkedIn: { bg: 'bg-[#0077b5]/15', text: 'text-[#0077b5]' },
  NVB: { bg: 'bg-[#00a651]/15', text: 'text-[#00a651]' },
  AI: { bg: 'bg-[#a855f7]/15', text: 'text-[#a855f7]' },
  DB: { bg: 'bg-[#64748b]/15', text: 'text-[#64748b]' },
  GEO: { bg: 'bg-[#14b8a6]/15', text: 'text-[#14b8a6]' },
};

export default function ActivityFeed({ lines, paused }: ActivityFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const prevLenRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsAtBottom(true);
      setNewCount(0);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 30;
    setIsAtBottom(atBottom);
    if (atBottom) setNewCount(0);
  }, []);

  useEffect(() => {
    if (lines.length > prevLenRef.current) {
      if (isAtBottom) {
        scrollToBottom();
      } else {
        setNewCount((c) => c + (lines.length - prevLenRef.current));
      }
    }
    prevLenRef.current = lines.length;
  }, [lines.length, isAtBottom, scrollToBottom]);

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn(
          'h-full overflow-y-auto text-sm leading-relaxed p-4 bg-bg-input rounded-xl border border-border transition-opacity duration-300',
          paused && 'opacity-60'
        )}
      >
        <div className="space-y-1">
          {lines.map((line, i) => {
            const style = typeStyles[line.type] || typeStyles.info;
            const badge = line.badge ? badgeColors[line.badge] : null;
            const isLast = i === lines.length - 1;

            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 py-1.5 px-2 rounded-lg animate-fade-in',
                  isLast && !paused && line.type !== 'done' && 'bg-white/3'
                )}
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <div className="flex items-center justify-center w-5 shrink-0">
                  {isLast && !paused && line.type !== 'done' ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-60', style.dot)} />
                      <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', style.dot)} />
                    </span>
                  ) : line.type === 'done' ? (
                    <svg className="w-4 h-4 text-placed animate-scale-in" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <span className={cn('inline-flex rounded-full h-2 w-2', style.dot)} />
                  )}
                </div>
                <span className={cn('flex-1', style.text)}>{line.text}</span>
                {line.badge && (
                  <span className={cn(
                    'shrink-0 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide',
                    badge ? `${badge.bg} ${badge.text}` : 'bg-liber/20 text-liber-accent'
                  )}>
                    {line.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {lines.length > 0 && lines[lines.length - 1].type !== 'done' && !paused && (
          <div className="flex items-center gap-3 mt-1.5 px-2">
            <div className="w-5 flex justify-center">
              <span className="inline-block w-1.5 h-4 bg-liber-accent/60 animate-pulse rounded-sm" />
            </div>
          </div>
        )}
      </div>

      {paused && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 rounded-full bg-warm/10 border border-warm/25 shadow-lg backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-warm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            <span className="text-xs font-medium text-warm">Gepauzeerd</span>
          </div>
        </div>
      )}

      {!isAtBottom && newCount > 0 && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-liber text-white text-xs font-medium shadow-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 animate-fade-in"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          {newCount} nieuwe {newCount === 1 ? 'regel' : 'regels'}
        </button>
      )}
    </div>
  );
}

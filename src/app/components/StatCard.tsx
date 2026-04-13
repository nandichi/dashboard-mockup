'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  subtitle: string;
  color: 'blue' | 'red' | 'green' | 'muted';
}

const colorMap = {
  blue: {
    border: 'border-l-liber',
    glow: 'stat-glow-blue',
    text: 'text-liber',
  },
  red: {
    border: 'border-l-liber-red',
    glow: 'stat-glow-red',
    text: 'text-liber-red',
  },
  green: {
    border: 'border-l-placed',
    glow: 'stat-glow-green',
    text: 'text-placed',
  },
  muted: {
    border: 'border-l-liber-accent',
    glow: 'stat-glow-muted',
    text: 'text-liber-accent',
  },
};

export default function StatCard({ label, value, subtitle, color }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={cn(
        'card border-l-[3px] animate-fade-in',
        colors.border,
        colors.glow
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
        {label}
      </p>
      <p className={cn('text-3xl font-bold mb-1', colors.text)}>
        {value}
      </p>
      <p className="text-sm text-text-secondary">{subtitle}</p>
    </div>
  );
}

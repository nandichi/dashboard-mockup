'use client';

import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-150',
            active === option.value
              ? 'bg-liber text-white shadow-lg shadow-liber/20'
              : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-light'
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={cn(
              'ml-1.5',
              active === option.value ? 'text-white/70' : 'text-text-muted'
            )}>
              ({option.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

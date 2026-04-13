'use client';

import { chatSuggestions } from '@/data/conversations';
import { useBrand } from '../BrandProvider';

interface ChatEmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

export default function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  const { brand } = useBrand();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-liber to-liber-red flex items-center justify-center mx-auto mb-4 shadow-lg shadow-liber/20">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">DevelopingAI</h2>
        <p className="text-sm text-text-secondary mb-6">
          Ik ben je AI-assistent voor het {brand.brandName} dashboard. Vraag me alles over vacatures, matches, outreach, en meer.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {chatSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-3 py-2.5 rounded-lg bg-bg-card border border-border text-xs text-text-secondary hover:text-text-primary hover:border-border-light transition-all text-left"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

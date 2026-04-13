'use client';

import { useState } from 'react';
import { conversations, Conversation } from '@/data/conversations';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export default function ChatSidebar({ isOpen, onClose, activeId, onSelect }: ChatSidebarProps) {
  const [search, setSearch] = useState('');

  const groups: Record<string, { label: string; convs: Conversation[] }> = {
    pinned: { label: 'Vastgezet', convs: [] },
    today: { label: 'Vandaag', convs: [] },
    yesterday: { label: 'Gisteren', convs: [] },
    last_week: { label: 'Vorige week', convs: [] },
  };

  conversations.forEach((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return;
    groups[c.group]?.convs.push(c);
  });

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          'fixed lg:relative top-0 left-0 h-full w-72 z-50 lg:z-0 flex flex-col bg-bg-card border-r border-border transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-border">
          <button
            onClick={() => onSelect(null)}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-liber to-liber/80 text-white text-sm font-medium hover:opacity-90 transition-opacity mb-3"
          >
            Nieuw gesprek
          </button>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zoek gesprekken..."
              className="w-full pl-9 pr-3 py-2 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {Object.entries(groups).map(([key, { label, convs }]) => {
            if (convs.length === 0) return null;
            return (
              <div key={key} className="mb-2">
                <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  {key === 'pinned' && (
                    <svg className="w-3 h-3 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                  )}
                  {label}
                </p>
                {convs.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { onSelect(c.id); onClose(); }}
                    className={cn(
                      'w-full px-4 py-2.5 text-left transition-all',
                      activeId === c.id
                        ? 'bg-liber/10 border-l-2 border-l-liber-red'
                        : 'hover:bg-bg-card-hover border-l-2 border-l-transparent'
                    )}
                  >
                    <p className={cn(
                      'text-sm truncate',
                      activeId === c.id ? 'text-text-primary font-medium' : 'text-text-secondary'
                    )}>
                      {c.title}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">{c.date}</p>
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-[10px] text-text-muted text-center">{conversations.length} gesprekken</p>
        </div>
      </aside>
    </>
  );
}

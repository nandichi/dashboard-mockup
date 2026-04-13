'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatEmptyState from '../components/chat/ChatEmptyState';
import ChatInput from '../components/chat/ChatInput';
import { conversations, ChatMessage as ChatMessageType } from '@/data/conversations';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeConvId, setActiveConvId] = useState<string | null>('c1');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    if (activeConv) {
      setMessages(activeConv.messages);
    } else {
      setMessages([]);
    }
  }, [activeConvId, activeConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const streamResponse = useCallback((text: string) => {
    setStreaming(true);
    let idx = 0;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const interval = setInterval(() => {
      idx += 3;
      if (idx >= text.length) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: text };
          return copy;
        });
        setStreaming(false);
        clearInterval(interval);
      } else {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: text.slice(0, idx) };
          return copy;
        });
      }
    }, 15);
  }, []);

  const handleSend = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    const dummyResponse = `Bedankt voor je vraag! Hier is een samenvatting:

**Dashboard Status:**
- 147 actieve vacatures gevonden
- 34 hot matches beschikbaar
- 312 vakmensen in het systeem
- 56 outreach berichten verstuurd

De AI agents draaien normaal. De laatste scanner run was 2 uur geleden en heeft 36 nieuwe vacatures opgeleverd. De matcher heeft 89 matches gecreeerd, waarvan 34 als hot zijn gecategoriseerd.

Kan ik je ergens anders mee helpen?`;

    setTimeout(() => streamResponse(dummyResponse), 500);
  }, [streamResponse]);

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] -m-4 lg:-m-6">
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeId={activeConvId}
        onSelect={setActiveConvId}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-card/50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-liber to-liber-red flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-muted">DevelopingAI</p>
            <p className="text-sm font-medium text-text-primary truncate">
              {activeConv?.title || 'Nieuw gesprek'}
            </p>
          </div>
        </div>

        {messages.length === 0 ? (
          <ChatEmptyState onSuggestionClick={handleSend} />
        ) : (
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <ChatInput onSend={handleSend} disabled={streaming} />
      </div>
    </div>
  );
}

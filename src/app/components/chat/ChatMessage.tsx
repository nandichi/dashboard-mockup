'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === 'user' ? 'justify-end' : ''}`}>
      {role === 'assistant' && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-liber to-liber-red flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          role === 'user'
            ? 'bg-liber text-white rounded-br-sm'
            : 'bg-bg-card border border-border rounded-bl-sm'
        }`}
      >
        {role === 'assistant' ? (
          <div className="prose prose-sm prose-invert max-w-none text-text-primary [&_table]:text-xs [&_th]:text-text-muted [&_th]:font-semibold [&_th]:px-3 [&_th]:py-1.5 [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-text-secondary [&_tr]:border-b [&_tr]:border-border [&_strong]:text-text-primary [&_h3]:text-sm [&_h3]:text-text-primary [&_h3]:mt-3 [&_h3]:mb-1 [&_ul]:text-text-secondary [&_ol]:text-text-secondary [&_li]:text-text-secondary [&_p]:text-text-secondary [&_p]:text-sm [&_li]:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>

      {role === 'user' && (
        <div className="w-8 h-8 rounded-lg bg-liber/20 flex items-center justify-center shrink-0 text-xs font-bold text-liber-accent">
          JV
        </div>
      )}
    </div>
  );
}

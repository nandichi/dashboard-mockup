'use client';

import { useState, useRef, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import { cn } from '@/lib/utils';

const consolePresets: Record<string, string[]> = {
  scan: [
    '[INFO] Agent gestart: lead_researcher',
    '[INFO] Configuratie geladen',
    '[INFO] Bronnen: Google CSE, Indeed',
    '[SCAN] Google CSE doorzoeken... 23 resultaten',
    '[SCAN] Indeed doorzoeken... 18 resultaten',
    '[FILTER] Duplicaten verwijderd: 5',
    '[FILTER] Relevantie check: 36 van 41 behouden',
    '[RESULT] 36 nieuwe vacatures gevonden',
    '[INFO] Opgeslagen naar vacatures.json',
    '[DONE] Agent voltooid in 47s',
  ],
  match: [
    '[INFO] Agent gestart: lead_matcher',
    '[INFO] 147 vacatures geladen',
    '[INFO] 312 flexwerkers geladen',
    '[MATCH] Scores berekenen...',
    '[MATCH] 34 hot, 18 warm, 12 cold',
    '[RESULT] 89 matches opgeslagen',
    '[DONE] Agent voltooid in 38s',
  ],
  preview: [
    '[INFO] Agent gestart: outreach_assistant',
    '[LOAD] 5 goedgekeurde matches geladen',
    '[EMAIL] Genereren voor VDL Groep...',
    '[EMAIL] Genereren voor ASML...',
    '[REVIEW] AI Review score: 8.4/10',
    '[RESULT] 5 previews opgeslagen',
    '[DONE] Agent voltooid in 31s',
  ],
  replies: [
    '[INFO] Agent gestart: reply_checker',
    '[CHECK] Inbox controleren...',
    '[CHECK] 3 nieuwe reacties gevonden',
    '[CLASSIFY] Geinteresseerd: 2',
    '[CLASSIFY] Opt-out: 1',
    '[RESULT] Reacties verwerkt',
    '[DONE] Agent voltooid in 12s',
  ],
};

const buttons = [
  { id: 'scan', label: 'Scan vacatures', agent: 'Lead Researcher' },
  { id: 'match', label: 'Start matching', agent: 'Lead Matcher' },
  { id: 'preview', label: 'Preview outreach', agent: 'Outreach Assistent' },
  { id: 'replies', label: 'Check replies', agent: 'Reply Checker' },
];

const lastRuns = [
  { agent: 'Lead Researcher', tijd: '31-03-2026 14:30', status: 'Succesvol' as const },
  { agent: 'Lead Matcher', tijd: '31-03-2026 14:31', status: 'Succesvol' as const },
  { agent: 'Outreach Assistent', tijd: '31-03-2026 09:00', status: 'Succesvol' as const },
  { agent: 'Lead Researcher', tijd: '31-03-2026 08:00', status: 'Succesvol' as const },
];

function getLineColor(line: string) {
  if (line.startsWith('[RESULT]') || line.startsWith('[DONE]')) return 'text-placed';
  if (line.startsWith('[ERROR]')) return 'text-liber-red';
  if (line.startsWith('[SCAN]') || line.startsWith('[MATCH]') || line.startsWith('[EMAIL]') || line.startsWith('[CHECK]') || line.startsWith('[CLASSIFY]')) return 'text-liber-accent';
  return 'text-text-muted';
}

export default function SysteemPage() {
  const [consoleLines, setConsoleLines] = useState<string[]>(consolePresets.scan);
  const [running, setRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleLines]);

  const runAgent = (id: string) => {
    const lines = consolePresets[id] || [];
    setRunning(true);
    setConsoleLines([]);

    lines.forEach((line, i) => {
      setTimeout(() => {
        setConsoleLines((prev) => [...prev, line]);
        if (i === lines.length - 1) setRunning(false);
      }, (i + 1) * 400);
    });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Systeem</h1>

      <div className="card mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-placed" />
          <span className="text-sm font-semibold text-text-primary">OpenClaw Gateway</span>
          <StatusBadge variant="succesvol">Online</StatusBadge>
          <span className="text-xs text-text-muted ml-auto">Poort: 18789</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Vacatures', value: 147, file: 'vacatures.json' },
          { label: 'Matches', value: 89, file: 'matches.json' },
          { label: 'Flexwerkers', value: 312, file: 'flexwerkers.json' },
          { label: 'Outreach logs', value: 56, file: 'outreach_log.json' },
        ].map((d) => (
          <div key={d.label} className="card text-center">
            <p className="text-2xl font-bold text-liber-accent">{d.value}</p>
            <p className="text-xs text-text-muted mt-1">{d.label}</p>
            <p className="text-[10px] text-text-muted mt-0.5">Laatst: {d.file}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => runAgent(btn.id)}
            disabled={running}
            className="card-flat hover:border-border-light transition-all text-center disabled:opacity-50"
          >
            <p className="text-sm font-semibold text-text-primary">{btn.label}</p>
            <p className="text-xs text-text-muted">{btn.agent}</p>
          </button>
        ))}
      </div>

      <div className="card-flat mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Console output</h3>
          {running && (
            <button
              onClick={() => setRunning(false)}
              className="px-3 py-1 rounded-lg bg-liber-red/10 text-liber-red text-xs font-medium hover:bg-liber-red/20 transition-colors"
            >
              Afbreken
            </button>
          )}
        </div>
        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto font-mono text-xs leading-relaxed p-4 bg-bg-input rounded-lg border border-border"
        >
          {consoleLines.map((line, i) => (
            <div key={i} className={cn('animate-fade-in', getLineColor(line))}>
              {line}
            </div>
          ))}
          {running && (
            <div className="flex items-center gap-1 text-text-muted mt-1">
              <span className="inline-block w-1.5 h-3 bg-text-muted animate-pulse" />
            </div>
          )}
        </div>
      </div>

      <div className="card-flat">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Laatste runs</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Agent</th>
              <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Tijdstip</th>
              <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {lastRuns.map((run, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="px-4 py-2.5 text-text-primary">{run.agent}</td>
                <td className="px-4 py-2.5 text-text-secondary">{run.tijd}</td>
                <td className="px-4 py-2.5"><StatusBadge variant="succesvol">{run.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

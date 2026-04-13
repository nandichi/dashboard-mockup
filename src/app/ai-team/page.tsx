'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { useDemo } from '../components/DemoContext';
import { useBrand } from '../components/BrandProvider';
import { agents, getOutreachSettings } from '@/data/agent-config';
import AgentExecutionPanel from '../components/agent-execution/AgentExecutionPanel';
import { cn } from '@/lib/utils';

const agentDemoMap: Record<string, 'scan' | 'match' | 'outreach'> = {
  lead_researcher: 'scan',
  lead_matcher: 'match',
  outreach_assistant: 'outreach',
};

export default function AITeamPage() {
  const { state, completeScan, completeMatch, completeOutreach, canRunMatcher, canRunOutreach } = useDemo();
  const { brand } = useBrand();

  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(agents.map((a) => [a.id, a.status !== 'inactive']))
  );
  const [schemas, setSchemas] = useState<Record<string, string>>(
    Object.fromEntries(agents.map((a) => [a.id, a.huidigeSchema]))
  );
  const [runningAgent, setRunningAgent] = useState<string | null>(null);
  const [loadingAgent, setLoadingAgent] = useState<string | null>(null);
  const [expandedRuns, setExpandedRuns] = useState<Record<string, boolean>>({});
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showOutreachSettings, setShowOutreachSettings] = useState(false);
  const [outreach, setOutreach] = useState(getOutreachSettings(brand));

  const isAgentCompleted = (agentId: string) => {
    const type = agentDemoMap[agentId];
    if (type === 'scan') return state.scanCompleted;
    if (type === 'match') return state.matchCompleted;
    if (type === 'outreach') return state.outreachCompleted;
    return false;
  };

  const isAgentLocked = (agentId: string) => {
    const type = agentDemoMap[agentId];
    if (type === 'match') return !canRunMatcher;
    if (type === 'outreach') return !canRunOutreach;
    return false;
  };

  const getLockMessage = (agentId: string) => {
    const type = agentDemoMap[agentId];
    if (type === 'match') return 'Voer eerst de Lead Researcher uit';
    if (type === 'outreach') return 'Voer eerst de Lead Match Medewerker uit';
    return '';
  };

  const handleExecute = useCallback((agentId: string) => {
    setLoadingAgent(agentId);
    setTimeout(() => {
      setLoadingAgent(null);
      setRunningAgent(agentId);
    }, 800);
  }, []);

  const handleComplete = useCallback((agentId: string) => {
    const type = agentDemoMap[agentId];
    if (type === 'scan') completeScan();
    if (type === 'match') completeMatch();
    if (type === 'outreach') completeOutreach();
  }, [completeScan, completeMatch, completeOutreach]);

  const statusColors: Record<string, string> = {
    active: 'bg-placed',
    waiting: 'bg-warm',
    inactive: 'bg-text-muted',
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="AI Team" subtitle="Beheer je AI-agenten en hun configuratie" />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold', state.scanCompleted ? 'bg-placed text-white' : 'bg-border text-text-muted')}>
            {state.scanCompleted ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            ) : '1'}
          </span>
          <span className={cn('text-xs font-medium', state.scanCompleted ? 'text-placed' : 'text-text-muted')}>Scannen</span>
        </div>
        <div className={cn('w-8 h-0.5 rounded-full', state.scanCompleted ? 'bg-placed' : 'bg-border')} />
        <div className="flex items-center gap-2">
          <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold', state.matchCompleted ? 'bg-placed text-white' : 'bg-border text-text-muted')}>
            {state.matchCompleted ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            ) : '2'}
          </span>
          <span className={cn('text-xs font-medium', state.matchCompleted ? 'text-placed' : 'text-text-muted')}>Matchen</span>
        </div>
        <div className={cn('w-8 h-0.5 rounded-full', state.matchCompleted ? 'bg-placed' : 'bg-border')} />
        <div className="flex items-center gap-2">
          <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold', state.outreachCompleted ? 'bg-placed text-white' : 'bg-border text-text-muted')}>
            {state.outreachCompleted ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            ) : '3'}
          </span>
          <span className={cn('text-xs font-medium', state.outreachCompleted ? 'text-placed' : 'text-text-muted')}>Outreach</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {agents.map((agent) => {
          const completed = isAgentCompleted(agent.id);
          const locked = isAgentLocked(agent.id);

          return (
            <div key={agent.id} className={cn('card relative', completed && 'border-placed/30')}>
              {completed && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-placed/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-placed" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    {completed && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-placed opacity-75" />
                    )}
                    <span className={cn(
                      'relative inline-flex rounded-full h-2.5 w-2.5',
                      completed ? 'bg-placed' : locked ? 'bg-text-muted' : statusColors[agent.status]
                    )} />
                  </span>
                  <span className="text-xs text-text-secondary">
                    {completed ? 'Voltooid' : locked ? 'Vergrendeld' : agent.statusLabel}
                  </span>
                </div>
                <button
                  role="switch"
                  aria-checked={toggles[agent.id]}
                  aria-label={`${agent.naam} ${toggles[agent.id] ? 'deactiveren' : 'activeren'}`}
                  onClick={() => setToggles((p) => ({ ...p, [agent.id]: !p[agent.id] }))}
                  className={cn(
                    'relative w-10 h-5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liber',
                    toggles[agent.id] ? 'bg-placed' : 'bg-border'
                  )}
                >
                  <span className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm',
                    toggles[agent.id] ? 'translate-x-5' : 'translate-x-0.5'
                  )} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-text-primary">{agent.naam}</h3>
              <p className="text-xs text-text-muted mb-2">{agent.rol}</p>
              <p className="text-sm text-text-secondary mb-4">{agent.beschrijving}</p>

              {completed ? (
                <Link
                  href={agent.resultaatLink}
                  className="inline-flex items-center gap-1.5 text-sm text-placed hover:text-text-primary transition-colors mb-3"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {agent.resultaatTekst}
                </Link>
              ) : (
                <p className="text-sm text-text-muted mb-3">Nog niet uitgevoerd</p>
              )}

              <div className="mb-4">
                <label className="text-xs text-text-muted mb-1 block">Schema</label>
                <select
                  value={schemas[agent.id]}
                  onChange={(e) => setSchemas((p) => ({ ...p, [agent.id]: e.target.value }))}
                  className="w-full text-sm"
                >
                  {agent.schemaOpties.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {locked ? (
                <div className="w-full py-2 rounded-lg bg-bg-elevated border border-border text-center">
                  <span className="text-xs text-text-muted flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    {getLockMessage(agent.id)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleExecute(agent.id)}
                  disabled={loadingAgent === agent.id}
                  className={cn(
                    'w-full py-2 rounded-lg text-white text-sm font-medium transition-all relative overflow-hidden',
                    completed
                      ? 'bg-placed/80 hover:bg-placed'
                      : loadingAgent === agent.id
                        ? 'bg-liber/70 cursor-wait'
                        : 'bg-linear-to-r from-liber to-liber/80 hover:opacity-90'
                  )}
                >
                  {loadingAgent === agent.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Starten...
                    </span>
                  ) : completed ? (
                    'Opnieuw uitvoeren'
                  ) : (
                    'Nu uitvoeren'
                  )}
                </button>
              )}

              {completed && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => setExpandedRuns((p) => ({ ...p, [agent.id]: !p[agent.id] }))}
                    className="flex items-center justify-between w-full text-xs text-text-muted hover:text-text-secondary transition-colors"
                  >
                    <span>Run historie ({agent.runs.length})</span>
                    <svg className={cn('w-3.5 h-3.5 transition-transform duration-300', expandedRuns[agent.id] && 'rotate-180')} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {expandedRuns[agent.id] && (
                    <div className="mt-3 relative animate-accordion-open">
                      <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-border" />
                      {agent.runs.map((run) => (
                        <div key={run.id} className="flex items-start gap-3 relative pl-4 pb-3 last:pb-0">
                          <span className={cn(
                            'absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2 border-bg-card shrink-0',
                            run.status === 'success' ? 'bg-placed' : run.status === 'error' ? 'bg-liber-red' : 'bg-text-muted'
                          )} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-text-secondary">{run.datum}</span>
                              <StatusBadge variant={run.status === 'success' ? 'succesvol' : 'fout'}>
                                {run.status === 'success' ? 'Succesvol' : 'Fout'}
                              </StatusBadge>
                              <span className="text-xs text-text-muted">{run.duur}</span>
                            </div>
                            {run.log && (
                              <p className="text-[11px] text-liber-red/80 mt-1 font-mono">{run.log}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="card">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="text-sm font-semibold text-text-primary">Hoe werkt het?</h3>
            <svg className={cn('w-4 h-4 text-text-muted transition-transform duration-300', showHowItWorks && 'rotate-180')} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showHowItWorks && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-accordion-open">
              {[
                { step: '1', title: 'Scanner vindt vacatures', desc: 'De Lead Researcher doorzoekt automatisch meerdere bronnen naar relevante vacatures' },
                { step: '2', title: 'Matcher koppelt vakmensen', desc: 'De Lead Matcher analyseert vacatures en koppelt de beste beschikbare vakmensen' },
                { step: '3', title: 'Outreach verstuurt berichten', desc: 'De Outreach Assistent stelt gepersonaliseerde e-mails op voor goedgekeurde matches' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-liber/20 flex items-center justify-center text-sm font-bold text-liber-accent shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <button
            onClick={() => setShowOutreachSettings(!showOutreachSettings)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="text-sm font-semibold text-text-primary">Outreach instellingen</h3>
            <svg className={cn('w-4 h-4 text-text-muted transition-transform duration-300', showOutreachSettings && 'rotate-180')} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showOutreachSettings && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-accordion-open">
              {[
                { label: 'Naam', key: 'naam' as const },
                { label: 'Functie', key: 'functie' as const },
                { label: 'Bedrijf', key: 'bedrijf' as const },
                { label: 'Email', key: 'email' as const },
                { label: 'Telefoon', key: 'telefoon' as const },
                { label: 'Website', key: 'website' as const },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-text-muted mb-1 block">{field.label}</label>
                  <input
                    value={outreach[field.key]}
                    onChange={(e) => setOutreach((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full text-sm"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <button className="px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Opslaan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {runningAgent && (
        <AgentExecutionPanel
          agentId={runningAgent}
          onClose={() => setRunningAgent(null)}
          onComplete={() => handleComplete(runningAgent)}
        />
      )}
    </div>
  );
}

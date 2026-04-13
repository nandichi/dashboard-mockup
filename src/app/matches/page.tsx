'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import FilterBar from '../components/FilterBar';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { useDemo } from '../components/DemoContext';
import { matches } from '@/data/matches';
import { cn } from '@/lib/utils';

const breakdownLabels = [
  { key: 'vakgebied' as const, label: 'Vakgebied', weight: 40 },
  { key: 'beschikbaar' as const, label: 'Beschikbaar', weight: 20 },
  { key: 'regio' as const, label: 'Regio', weight: 15 },
  { key: 'certificeringen' as const, label: 'Certificeringen', weight: 15 },
  { key: 'ervaring' as const, label: 'Ervaring', weight: 10 },
];

const catAccent: Record<string, string> = {
  hot: 'border-l-hot',
  warm: 'border-l-warm',
  cold: 'border-l-cold',
};

function getScoreColor(pct: number) {
  if (pct >= 75) return 'bg-placed';
  if (pct >= 50) return 'bg-warm';
  return 'bg-liber-red';
}

function getScoreTextColor(pct: number) {
  if (pct >= 80) return 'text-placed';
  if (pct >= 65) return 'text-warm';
  return 'text-liber-red';
}

function ScoreRing({ score }: { score: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeColor = score >= 80 ? '#16a34a' : score >= 65 ? '#f59e0b' : '#e50045';

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="var(--border)" strokeWidth="3" />
        <circle
          cx="26" cy="26" r={radius} fill="none"
          stroke={strokeColor} strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className={cn(
        'absolute inset-0 flex items-center justify-center text-sm font-bold',
        getScoreTextColor(score)
      )}>
        {score}
      </span>
    </div>
  );
}

export default function MatchesPage() {
  const { state } = useDemo();
  const [filter, setFilter] = useState('alle');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [expandedMotivatie, setExpandedMotivatie] = useState<Record<string, boolean>>({});

  const filterOptions = [
    { label: 'Alle', value: 'alle' },
    { label: 'Hot', value: 'hot' },
    { label: 'Warm', value: 'warm' },
    { label: 'Cold', value: 'cold' },
  ];

  const filtered = useMemo(() => {
    if (filter === 'alle') return matches;
    return matches.filter((m) => m.categorie === filter);
  }, [filter]);

  const stats = useMemo(() => ({
    hot: matches.filter((m) => m.categorie === 'hot').length,
    warm: matches.filter((m) => m.categorie === 'warm').length,
    cold: matches.filter((m) => m.categorie === 'cold').length,
  }), []);

  const totalKandidaten = useMemo(
    () => matches.reduce((sum, m) => sum + m.kandidaten.length, 0), []
  );

  const catVariant = (cat: string) => {
    if (cat === 'hot') return 'hot';
    if (cat === 'warm') return 'warm';
    return 'cold';
  };

  const toggleExpand = (id: string) => {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  };

  if (!state.matchCompleted) {
    const needsScan = !state.scanCompleted;
    return (
      <div className="animate-fade-in">
        <PageHeader title="Matches" />
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-liber/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-liber-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">Nog geen matches beschikbaar</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-md">
            {needsScan
              ? 'Voer eerst de Lead Researcher uit om vacatures te scannen, en daarna de Lead Match Medewerker om matches te genereren.'
              : 'De vacatures zijn gescand. Voer nu de Lead Match Medewerker uit om kandidaten te koppelen aan vacatures.'
            }
          </p>
          <Link
            href="/ai-team"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
            Ga naar AI Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Matches" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Hot Matches" value={stats.hot} subtitle={`${stats.hot} vacatures`} color="red" />
        <StatCard label="Warm Matches" value={stats.warm} subtitle={`${stats.warm} vacatures`} color="muted" />
        <StatCard label="Cold Matches" value={stats.cold} subtitle={`${stats.cold} vacatures`} color="blue" />
        <StatCard label="Totaal Kandidaten" value={totalKandidaten} subtitle="unieke matches" color="green" />
      </div>

      <div className="mb-6">
        <FilterBar options={filterOptions} active={filter} onChange={setFilter} />
      </div>

      <div className="space-y-3">
        {filtered.map((match) => {
          const isExpanded = expanded[match.id];
          return (
            <div
              key={match.id}
              className={cn('card-flat overflow-hidden border-l-[3px]', catAccent[match.categorie])}
            >
              <div
                onClick={() => toggleExpand(match.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(match.id); } }}
                className="flex flex-wrap items-center gap-3 sm:gap-4 cursor-pointer"
              >
                <StatusBadge variant={catVariant(match.categorie)}>
                  {match.categorie.charAt(0).toUpperCase() + match.categorie.slice(1)}
                </StatusBadge>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{match.vacatureTitel}</p>
                  <p className="text-xs text-text-muted truncate">
                    {match.bedrijf}
                    <span className="mx-1.5 opacity-40">|</span>
                    {match.locatie}
                    <span className="mx-1.5 opacity-40">|</span>
                    {match.vakgebied}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-text-muted">
                    {match.kandidaten.length} match{match.kandidaten.length !== 1 ? 'es' : ''}
                  </span>

                  {match.outreachStatus === 'approved' && <StatusBadge variant="approved">Goedgekeurd</StatusBadge>}
                  {match.outreachStatus === 'sent' && <StatusBadge variant="sent">Verstuurd</StatusBadge>}

                  <svg
                    className={cn('w-4 h-4 text-text-muted transition-transform duration-300 shrink-0', isExpanded && 'rotate-180')}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <div className="animate-accordion-open mt-4 pt-4 border-t border-border space-y-4">
                  {match.outreachStatus === 'pending' && match.categorie === 'hot' && (
                    <div className="flex items-center justify-between bg-placed/5 rounded-lg p-3 border border-placed/20">
                      <span className="text-xs text-text-secondary">Deze hot match wacht op goedkeuring voor outreach</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="px-4 py-1.5 rounded-lg bg-placed/10 text-placed text-xs font-medium hover:bg-placed/20 transition-colors"
                      >
                        Goedkeuren
                      </button>
                    </div>
                  )}

                  {match.kandidaten.map((k) => (
                    <div key={k.rang} className="bg-bg-input rounded-lg p-3 sm:p-4">
                      <div className="flex items-start gap-3 sm:gap-4 mb-3">
                        <ScoreRing score={k.score} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="w-5 h-5 rounded-full bg-liber/20 flex items-center justify-center text-[10px] font-bold text-liber-accent shrink-0">
                              {k.rang}
                            </span>
                            <p className="text-sm font-semibold text-text-primary truncate">{k.naam}</p>
                          </div>
                          <p className="text-xs text-text-secondary">{k.reden}</p>
                        </div>
                      </div>

                      {k.motivatie && (
                        <div className="mb-3">
                          <button
                            onClick={() => setExpandedMotivatie((p) => ({
                              ...p,
                              [`${match.id}-${k.rang}`]: !p[`${match.id}-${k.rang}`],
                            }))}
                            className="text-xs text-liber-accent hover:text-text-primary transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                            </svg>
                            AI Motivatie
                          </button>
                          {expandedMotivatie[`${match.id}-${k.rang}`] && (
                            <p className="mt-2 text-xs text-text-secondary bg-bg-card rounded-lg p-3 border border-border animate-fade-in">
                              {k.motivatie}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Score breakdown</p>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3">
                          {breakdownLabels.map((bd) => {
                            const val = k.breakdown[bd.key];
                            return (
                              <div key={bd.key} className="sm:text-center">
                                <div className="flex sm:flex-col items-center sm:items-stretch gap-2 sm:gap-1">
                                  <span className="text-xs text-text-muted w-28 sm:w-auto shrink-0 sm:text-center">{bd.label} ({bd.weight})</span>
                                  <div className="flex-1 sm:flex-none h-1.5 bg-bg-card rounded-full overflow-hidden">
                                    <div
                                      className={cn('h-full rounded-full transition-all duration-700', getScoreColor(val))}
                                      style={{ width: `${val}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-text-secondary w-10 sm:w-auto text-right sm:text-center font-medium">{val}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-xs text-text-muted pt-2">
                    <span>Gematcht op {match.datum}</span>
                    <span className="px-2 py-0.5 rounded bg-liber/10 text-liber-accent text-[10px]">AI-assisted</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useDemo } from '../components/DemoContext';
import { useBrand } from '../components/BrandProvider';
import { outreachLogs, getOutreachPreviews, OutreachLog } from '@/data/outreach';
import { outreachStats } from '@/data/stats';
import { cn } from '@/lib/utils';

const reviewVariant: Record<string, 'goed' | 'matig' | 'slecht' | 'wachtend' | 'neutraal'> = {
  Goed: 'goed',
  Matig: 'matig',
  Slecht: 'slecht',
  Wachtend: 'wachtend',
  Neutraal: 'neutraal',
};

const reactieVariant: Record<string, 'geinteresseerd' | 'geen-reactie' | 'opt-out' | 'neutraal'> = {
  Geinteresseerd: 'geinteresseerd',
  'Geen reactie': 'geen-reactie',
  'Opt-out': 'opt-out',
  'Niet geinteresseerd': 'neutraal',
};

function getScoreColor(score: number) {
  if (score >= 8.5) return 'text-placed';
  if (score >= 7.5) return 'text-liber-accent';
  if (score >= 6.5) return 'text-warm';
  return 'text-liber-red';
}

function getScoreBg(score: number) {
  if (score >= 8.5) return 'bg-placed/10';
  if (score >= 7.5) return 'bg-liber/10';
  if (score >= 6.5) return 'bg-warm/10';
  return 'bg-liber-red/10';
}

interface SamenvattingModalProps {
  log: OutreachLog | null;
  onClose: () => void;
}

function SamenvattingModal({ log, onClose }: SamenvattingModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!log) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-bg-card border border-border rounded-2xl shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-text-primary truncate">{log.bedrijf}</h3>
            <p className="text-xs text-text-muted mt-0.5">{log.datum} -- {log.type}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover transition-all shrink-0 ml-4"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-input rounded-lg p-3 border border-border/50">
              <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1">Contactpersoon</p>
              <p className="text-sm text-text-primary font-medium truncate">{log.email}</p>
            </div>
            <div className="bg-bg-input rounded-lg p-3 border border-border/50">
              <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1">Status</p>
              <StatusBadge variant="verstuurd">{log.status}</StatusBadge>
            </div>
            <div className="bg-bg-input rounded-lg p-3 border border-border/50">
              <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1">Reactie</p>
              {log.reactie ? (
                <StatusBadge variant={reactieVariant[log.reactie] || 'neutraal'}>{log.reactie}</StatusBadge>
              ) : (
                <span className="text-sm text-text-muted">Nog geen reactie</span>
              )}
            </div>
            <div className="bg-bg-input rounded-lg p-3 border border-border/50">
              <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1">AI Review</p>
              <div className="flex items-center gap-2">
                <StatusBadge variant={reviewVariant[log.aiReview] || 'neutraal'}>{log.aiReview}</StatusBadge>
                <span className={cn('text-sm font-bold', getScoreColor(log.score))}>{log.score}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">Samenvatting</p>
            {log.samenvatting ? (
              <div className="bg-bg-input rounded-lg p-4 border border-border/50">
                <p className="text-sm text-text-primary leading-relaxed">{log.samenvatting}</p>
              </div>
            ) : (
              <div className="bg-bg-input rounded-lg p-4 border border-border/50 text-center">
                <p className="text-sm text-text-muted">Nog geen samenvatting beschikbaar</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OutreachPage() {
  const { state } = useDemo();
  const { brand } = useBrand();
  const outreachPreviews = useMemo(() => getOutreachPreviews(brand), [brand]);
  const [tab, setTab] = useState('log');
  const [expandedPreviews, setExpandedPreviews] = useState<Record<string, boolean>>({});
  const [testEmail, setTestEmail] = useState('');
  const [testSent, setTestSent] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<OutreachLog | null>(null);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const filteredLogs = outreachLogs.filter((row) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      row.bedrijf.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      (row.samenvatting && row.samenvatting.toLowerCase().includes(q))
    );
  });

  const sortedLogs = sortKey
    ? [...filteredLogs].sort((a, b) => {
        const aVal = String(a[sortKey as keyof OutreachLog] ?? '');
        const bVal = String(b[sortKey as keyof OutreachLog] ?? '');
        const cmp = aVal.localeCompare(bVal, 'nl', { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filteredLogs;

  const totalPages = Math.max(1, Math.ceil(sortedLogs.length / pageSize));
  const pagedLogs = sortedLogs.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const tabs = [
    { label: 'Log', value: 'log', count: outreachLogs.length },
    { label: 'Previews', value: 'previews', count: outreachPreviews.length },
    { label: 'Test email', value: 'test' },
  ];

  const handleTestSend = () => {
    if (!testEmail) return;
    setTestLoading(true);
    setTimeout(() => {
      setTestLoading(false);
      setTestSent(true);
    }, 2000);
  };

  type SortableCol = {
    key: string;
    label: string;
    width: string;
    sortable?: boolean;
  };

  const columns: SortableCol[] = [
    { key: 'datum', label: 'Datum', width: 'w-[100px]' },
    { key: 'bedrijf', label: 'Bedrijf', width: 'min-w-[140px]' },
    { key: 'email', label: 'Email', width: 'min-w-[180px]' },
    { key: 'type', label: 'Type', width: 'w-[120px]' },
    { key: 'reactie', label: 'Reactie', width: 'w-[130px]' },
    { key: 'samenvatting', label: 'Samenvatting', width: 'min-w-[200px]', sortable: false },
    { key: 'aiReview', label: 'AI Review', width: 'w-[100px]' },
    { key: 'score', label: 'Score', width: 'w-[80px]' },
  ];

  if (!state.outreachCompleted) {
    const needsMatch = !state.matchCompleted;
    const needsScan = !state.scanCompleted;
    let message = 'De Outreach Assistent moet worden uitgevoerd om e-mails te genereren en te versturen naar bedrijven.';
    if (needsScan) {
      message = 'Voer eerst de volledige pipeline uit: Lead Researcher (scannen), Lead Match Medewerker (matchen), en dan de Outreach Assistent.';
    } else if (needsMatch) {
      message = 'De vacatures zijn gescand. Voer nu de Lead Match Medewerker uit, en daarna de Outreach Assistent om e-mails te versturen.';
    }

    return (
      <div className="animate-fade-in">
        <PageHeader title="Outreach" />
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-liber/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-liber-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">Nog geen outreach verstuurd</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-md">{message}</p>
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
      <PageHeader title="Outreach" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Verstuurd" value={outreachStats.verstuurd.value} subtitle="" color={outreachStats.verstuurd.color} />
        <StatCard label="Reacties" value={outreachStats.reacties.value} subtitle="" color={outreachStats.reacties.color} />
        <StatCard label="Geinteresseerd" value={outreachStats.geinteresseerd.value} subtitle="" color={outreachStats.geinteresseerd.color} />
        <StatCard label="Previews" value={outreachStats.previews.value} subtitle="" color={outreachStats.previews.color} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              tab === t.value
                ? 'bg-liber text-white'
                : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
            )}
          >
            {t.label}
            {t.count !== undefined && <span className="ml-1.5 opacity-70">({t.count})</span>}
          </button>
        ))}
      </div>

      {tab === 'log' && (
        <div className="card-flat">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                placeholder="Zoek op bedrijf, email of samenvatting..."
                className="w-full pl-9 pr-4 py-2 text-sm"
              />
            </div>
            <p className="text-xs text-text-muted shrink-0">{sortedLogs.length} resultaten</p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                      className={cn(
                        'text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted',
                        col.width,
                        col.sortable !== false && 'cursor-pointer hover:text-text-secondary select-none'
                      )}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        {sortKey === col.key && (
                          <svg className={cn('w-3 h-3 transition-transform', sortDir === 'desc' && 'rotate-180')} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                        )}
                      </span>
                    </th>
                  ))}
                  <th className="w-[60px] px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {pagedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-12 text-center">
                      <p className="text-text-muted text-sm">Geen resultaten gevonden</p>
                    </td>
                  </tr>
                ) : (
                  pagedLogs.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border/50 hover:bg-bg-card-hover/50 transition-colors group"
                    >
                      <td className="px-4 py-3 text-text-muted text-xs">{row.datum}</td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary font-medium">{row.bedrijf}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{row.email}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{row.type}</td>
                      <td className="px-4 py-3">
                        {row.reactie ? (
                          <StatusBadge variant={reactieVariant[row.reactie] || 'neutraal'}>{row.reactie}</StatusBadge>
                        ) : (
                          <span className="text-text-muted text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-text-secondary line-clamp-1">
                          {row.samenvatting || <span className="text-text-muted">-</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge variant={reviewVariant[row.aiReview] || 'neutraal'}>{row.aiReview}</StatusBadge>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          'inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums',
                          getScoreBg(row.score),
                          getScoreColor(row.score)
                        )}>
                          {row.score}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedLog(row)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-liber-accent hover:bg-liber/10 transition-all opacity-0 group-hover:opacity-100"
                          aria-label={`Details bekijken voor ${row.bedrijf}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="lg:hidden space-y-3">
            {pagedLogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-muted text-sm">Geen resultaten gevonden</p>
              </div>
            ) : (
              pagedLogs.map((row) => (
                <div
                  key={row.id}
                  className="bg-bg-input rounded-lg p-3 border border-border/50 cursor-pointer hover:border-border transition-colors"
                  onClick={() => setSelectedLog(row)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{row.bedrijf}</span>
                    <span className={cn(
                      'inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums',
                      getScoreBg(row.score),
                      getScoreColor(row.score)
                    )}>
                      {row.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs text-text-muted">{row.datum}</span>
                    {row.reactie && (
                      <StatusBadge variant={reactieVariant[row.reactie] || 'neutraal'}>{row.reactie}</StatusBadge>
                    )}
                    <StatusBadge variant={reviewVariant[row.aiReview] || 'neutraal'}>{row.aiReview}</StatusBadge>
                  </div>
                  {row.samenvatting && (
                    <p className="text-xs text-text-secondary line-clamp-2">{row.samenvatting}</p>
                  )}
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-text-muted">
                Pagina {page + 1} van {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Vorige
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 5) {
                    p = i;
                  } else if (page < 3) {
                    p = i;
                  } else if (page > totalPages - 4) {
                    p = totalPages - 5 + i;
                  } else {
                    p = page - 2 + i;
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                        page === p ? 'bg-liber text-white' : 'text-text-secondary hover:bg-bg-card-hover'
                      )}
                    >
                      {p + 1}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Volgende
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'previews' && (
        <div className="space-y-3">
          {outreachPreviews.map((preview) => (
            <div key={preview.id} className="card-flat">
              <button
                onClick={() => setExpandedPreviews((p) => ({ ...p, [preview.id]: !p[preview.id] }))}
                className="w-full flex items-center gap-4 text-left"
              >
                <span className={cn(
                  'px-2.5 py-1 rounded-lg text-sm font-bold',
                  preview.score >= 8 ? 'bg-placed/15 text-placed' : preview.score >= 7 ? 'bg-warm/15 text-warm' : 'bg-liber-red/15 text-liber-red'
                )}>
                  {preview.score}/10
                </span>
                <span className="flex-1 text-sm font-semibold text-text-primary">{preview.bedrijf}</span>
                <StatusBadge variant={reviewVariant[preview.aiReview] || 'neutraal'}>{preview.aiReview}</StatusBadge>
                <svg
                  className={cn('w-4 h-4 text-text-muted transition-transform duration-300', expandedPreviews[preview.id] && 'rotate-180')}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {expandedPreviews[preview.id] && (
                <div className="mt-4 pt-4 border-t border-border space-y-3 animate-accordion-open">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-text-muted">Aan:</span> <span className="text-text-primary">{preview.contactpersoon} - {preview.bedrijf}</span></div>
                    <div><span className="text-text-muted">Email:</span> <span className="text-text-primary">{preview.email}</span></div>
                  </div>
                  <div className="text-sm">
                    <span className="text-text-muted">AI Prospect selectie:</span>
                    <span className="text-text-secondary ml-1">{preview.aiProspectReden}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-text-muted">Onderwerp:</span>
                    <span className="text-text-primary font-medium ml-1">{preview.onderwerp}</span>
                  </div>
                  <pre className="text-xs text-text-secondary bg-bg-input p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono border border-border">
                    {preview.body}
                  </pre>
                  {preview.verbeterpunten.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-text-muted mb-1">AI Review - Verbeterpunten:</p>
                      <ul className="list-disc list-inside text-xs text-text-secondary space-y-0.5">
                        {preview.verbeterpunten.map((v, i) => <li key={i}>{v}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'test' && (
        <div className="card max-w-lg">
          <h3 className="text-sm font-semibold text-text-primary mb-2">Test e-mail versturen</h3>
          <p className="text-xs text-text-secondary mb-4">
            Verstuur een test e-mail om de outreach-flow te testen
          </p>

          {!testSent ? (
            <div className="space-y-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="naam@voorbeeld.nl"
                className="w-full"
              />
              <button
                onClick={handleTestSend}
                disabled={testLoading || !testEmail}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-liber to-liber/80 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {testLoading ? 'Versturen...' : 'Verstuur test'}
              </button>
            </div>
          ) : (
            <div className="bg-bg-input rounded-lg p-4 border border-placed/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-placed/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-placed" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-placed">Test e-mail verstuurd</p>
              </div>
              <div className="space-y-1 text-xs text-text-secondary">
                <p>Verzonden naar: <span className="text-text-primary">{testEmail}</span></p>
                <p>Bron: VDL Groep</p>
                <p>Vacature: Elektromonteur Industrieel</p>
              </div>
              <pre className="mt-3 text-xs text-text-secondary bg-bg-card p-3 rounded-lg font-mono border border-border whitespace-pre-wrap">
{`Onderwerp: Ervaren Elektromonteur beschikbaar - direct inzetbaar

Geachte heer Bakker,

Via onze database zijn wij op de hoogte van uw openstaande vacature...

Met vriendelijke groet,
Sophie Bakker
Business Developer - ${brand.brandName}`}
              </pre>
              <p className="mt-2 text-xs text-text-muted">AI Review score: 8.5/10</p>
              <button
                onClick={() => { setTestSent(false); setTestEmail(''); }}
                className="mt-3 text-xs text-liber-accent hover:text-text-primary transition-colors"
              >
                Nog een test versturen
              </button>
            </div>
          )}
        </div>
      )}

      {selectedLog && (
        <SamenvattingModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  );
}

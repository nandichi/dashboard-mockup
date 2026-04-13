'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import FilterBar from '../components/FilterBar';
import DataTable, { Column } from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { useDemo } from '../components/DemoContext';
import { vacatures, vakgebiedCounts, Vacature } from '@/data/vacatures';
import { cn } from '@/lib/utils';

const statusVariantMap: Record<string, 'nieuw' | 'gematcht' | 'verlopen'> = {
  Nieuw: 'nieuw',
  Gematcht: 'gematcht',
  Verlopen: 'verlopen',
};

const columns: Column<Vacature>[] = [
  { key: 'titel', label: 'Titel', primary: true, render: (r) => <span className="text-text-primary font-medium">{r.titel}</span> },
  { key: 'bedrijf', label: 'Bedrijf' },
  { key: 'locatie', label: 'Locatie' },
  { key: 'vakgebied', label: 'Vakgebied' },
  { key: 'datum', label: 'Datum' },
  { key: 'bron', label: 'Bron' },
  {
    key: 'status',
    label: 'Status',
    render: (r) => (
      <StatusBadge variant={statusVariantMap[r.status] || 'neutraal'}>
        {r.status}
      </StatusBadge>
    ),
  },
  {
    key: 'link',
    label: 'Link',
    sortable: false,
    render: () => (
      <button className="text-xs text-liber-accent hover:text-text-primary transition-colors">Bekijk</button>
    ),
  },
];

export default function VacaturesPage() {
  const { state } = useDemo();
  const [filter, setFilter] = useState('alle');
  const [vakgebiedFilter, setVakgebiedFilter] = useState<string | null>(null);

  const filterOptions = [
    { label: 'Alle', value: 'alle', count: 147 },
    { label: 'Nieuw', value: 'Nieuw', count: 23 },
    { label: 'Gematcht', value: 'Gematcht', count: 89 },
    { label: 'Verlopen', value: 'Verlopen', count: 35 },
  ];

  const filtered = useMemo(() => {
    let data = vacatures;
    if (filter !== 'alle') {
      data = data.filter((v) => v.status === filter);
    }
    if (vakgebiedFilter) {
      data = data.filter((v) => v.vakgebied === vakgebiedFilter);
    }
    return data;
  }, [filter, vakgebiedFilter]);

  if (!state.scanCompleted) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Vacatures" />
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-liber/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-liber-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">Nog geen vacatures gescand</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-md">
            De Lead Researcher moet eerst worden uitgevoerd om vacatures uit meerdere bronnen te scannen en te verzamelen.
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
      <PageHeader title="Vacatures" />

      <div className="mb-4">
        <FilterBar options={filterOptions} active={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {vakgebiedCounts.map((vak) => (
          <button
            key={vak.label}
            onClick={() => setVakgebiedFilter(vakgebiedFilter === vak.label ? null : vak.label)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
              vakgebiedFilter === vak.label
                ? 'bg-liber/20 text-liber-accent border-liber/30'
                : 'bg-bg-card text-text-secondary border-border hover:border-border-light'
            )}
          >
            {vak.label}: {vak.count}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Zoek op titel, bedrijf, locatie of vakgebied..."
        searchKeys={['titel', 'bedrijf', 'locatie', 'vakgebied']}
      />
    </div>
  );
}

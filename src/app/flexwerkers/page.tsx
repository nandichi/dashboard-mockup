'use client';

import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import FilterBar from '../components/FilterBar';
import DataTable, { Column } from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { flexwerkers, flexwerkerVakgebiedCounts, Flexwerker } from '@/data/flexwerkers';
import { cn } from '@/lib/utils';

const columns: Column<Flexwerker>[] = [
  { key: 'naam', label: 'Naam', render: (r) => <span className="text-text-primary font-medium">{r.naam}</span> },
  { key: 'vakgebied', label: 'Vakgebied' },
  { key: 'ervaring', label: 'Ervaring', render: (r) => <span>{r.ervaring} jaar</span> },
  {
    key: 'certificeringen',
    label: 'Certificeringen',
    sortable: false,
    render: (r) => (
      <div className="flex flex-wrap gap-1">
        {r.certificeringen.map((c) => (
          <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-liber/10 text-liber-accent border border-liber/20">
            {c}
          </span>
        ))}
      </div>
    ),
  },
  { key: 'locatie', label: 'Locatie' },
  { key: 'beschikbaarVanaf', label: 'Beschikbaar vanaf' },
  { key: 'urenPerWeek', label: 'Uren/week', render: (r) => <span>{r.urenPerWeek}u</span> },
  {
    key: 'status',
    label: 'Status',
    render: (r) => (
      <StatusBadge variant={r.status === 'Beschikbaar' ? 'beschikbaar' : 'geplaatst'}>
        {r.status}
      </StatusBadge>
    ),
  },
  { key: 'bron', label: 'Bron' },
];

export default function FlexwerkersPage() {
  const [filter, setFilter] = useState('alle');
  const [vakgebiedFilter, setVakgebiedFilter] = useState<string | null>(null);

  const filterOptions = [
    { label: 'Alle', value: 'alle', count: 312 },
    { label: 'Beschikbaar', value: 'Beschikbaar', count: 248 },
    { label: 'Geplaatst', value: 'Geplaatst', count: 64 },
  ];

  const filtered = useMemo(() => {
    let data = flexwerkers;
    if (filter !== 'alle') {
      data = data.filter((f) => f.status === filter);
    }
    if (vakgebiedFilter) {
      data = data.filter((f) => f.vakgebied === vakgebiedFilter);
    }
    return data;
  }, [filter, vakgebiedFilter]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Flexwerkers" subtitle="248 van 312 beschikbaar" />

      <div className="mb-4">
        <FilterBar options={filterOptions} active={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {flexwerkerVakgebiedCounts.map((vak) => (
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
        searchPlaceholder="Zoek op naam, vakgebied of locatie..."
        searchKeys={['naam', 'vakgebied', 'locatie']}
      />
    </div>
  );
}

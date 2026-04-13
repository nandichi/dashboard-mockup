'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  primary?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKeys?: string[];
  pageSize?: number;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchPlaceholder = 'Zoeken...',
  searchKeys = [],
  pageSize: initialPageSize = 25,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) => {
      const keys = searchKeys.length > 0 ? searchKeys : Object.keys(row);
      return keys.some((key) => {
        const val = row[key];
        return val != null && String(val).toLowerCase().includes(q);
      });
    });
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), 'nl', { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const primaryCol = columns.find((c) => c.primary) || columns[0];
  const secondaryCols = columns.filter((c) => c !== primaryCol);

  return (
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
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm"
          />
        </div>
        <select
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
          className="px-3 py-2 text-sm w-auto"
        >
          <option value={10}>10 per pagina</option>
          <option value={25}>25 per pagina</option>
          <option value={50}>50 per pagina</option>
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto -mx-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                  className={cn(
                    'text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap',
                    col.sortable !== false && 'cursor-pointer hover:text-text-secondary select-none'
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {sortKey === col.key && (
                      <svg className={cn('w-3 h-3 transition-transform', sortDir === 'desc' && 'rotate-180')} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-text-muted text-sm">Geen resultaten gevonden</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-bg-card-hover/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3 text-text-secondary whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {paged.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12">
            <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-text-muted text-sm">Geen resultaten gevonden</p>
          </div>
        ) : (
          paged.map((row, i) => (
            <div key={i} className="bg-bg-input rounded-lg p-3 border border-border/50">
              <div className="mb-2">
                {primaryCol.render ? primaryCol.render(row) : (
                  <p className="text-sm font-medium text-text-primary">{String(row[primaryCol.key] ?? '')}</p>
                )}
              </div>
              <div className="space-y-1.5">
                {secondaryCols.map((col) => (
                  <div key={col.key} className="flex items-start justify-between gap-2 text-xs">
                    <span className="text-text-muted shrink-0">{col.label}</span>
                    <span className="text-text-secondary text-right">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-text-muted">
            {sorted.length} resultaten -- pagina {page + 1} van {totalPages}
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
                    page === p
                      ? 'bg-liber text-white'
                      : 'text-text-secondary hover:bg-bg-card-hover'
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
  );
}

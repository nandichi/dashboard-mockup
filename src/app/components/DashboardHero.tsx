'use client';

import Link from 'next/link';
import { getGreeting } from '@/lib/utils';
import { getCurrentUser } from '@/data/user';
import { useBrand } from './BrandProvider';

export default function DashboardHero() {
  const greeting = getGreeting();
  const { brand } = useBrand();
  const user = getCurrentUser(brand);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-liber/20 via-bg-card to-bg-card border border-border p-6 lg:p-8 mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-liber/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-liber/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-liber to-liber-red flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg shadow-liber/20">
          {user.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-text-secondary text-sm mb-1">{greeting},</p>
          <h2 className="text-2xl font-bold text-text-primary mb-1">{user.name}</h2>
          <p className="text-sm text-text-muted mb-2">{user.email}</p>
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">{user.bio}</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-liber/15 text-liber-accent border border-liber/30">
              {user.role}
            </span>
            <span className="text-xs text-text-muted">{brand.tagline}</span>
          </div>
        </div>

        <Link
          href="/profiel"
          className="shrink-0 px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-secondary hover:text-text-primary hover:border-border-light transition-all"
        >
          Profiel bewerken
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import DashboardHero from './components/DashboardHero';
import StatCard from './components/StatCard';
import { useDemo } from './components/DemoContext';
import { dashboardStats, matchCategories, pipelineFunnel } from '@/data/stats';

export default function OverzichtPage() {
  const { state } = useDemo();

  const vacatures = dashboardStats.vacatures.value;
  const hotMatches = dashboardStats.hotMatches.value;
  const emails = dashboardStats.emailsVerstuurd.value;

  const vacSub = dashboardStats.vacatures.subtitle;
  const matchSub = dashboardStats.hotMatches.subtitle;
  const emailSub = dashboardStats.emailsVerstuurd.subtitle;

  const activeFunnel = pipelineFunnel;

  const maxFunnel = Math.max(...activeFunnel.map((s) => s.value), 1);

  const activeCategories = matchCategories;

  const nothingDone = !state.scanCompleted && !state.matchCompleted && !state.outreachCompleted;

  return (
    <div className="animate-fade-in">
      <DashboardHero />

      {nothingDone && (
        <div className="card mb-6 border-l-[3px] border-l-liber">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-liber/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-liber-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary mb-1">Welkom bij het AI Matching Dashboard</h3>
              <p className="text-sm text-text-secondary mb-3">
                De AI-agenten staan klaar om voor je aan de slag te gaan. Ga naar het AI Team om de pipeline te starten.
              </p>
              <Link
                href="/ai-team"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Start het AI Team
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Vacatures" value={vacatures} subtitle={vacSub} color="blue" />
        <StatCard label="Hot Matches" value={hotMatches} subtitle={matchSub} color="red" />
        <StatCard label="Beschikbare vakmensen" value={dashboardStats.beschikbaar.value} subtitle={dashboardStats.beschikbaar.subtitle} color="green" />
        <StatCard label="Emails verstuurd" value={emails} subtitle={emailSub} color="muted" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Matches per categorie</h3>
          <div className="space-y-4">
            {activeCategories.map((cat) => {
              const pct = cat.value > 0 ? Math.round((cat.value / cat.total) * 100) : 0;
              return (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-text-secondary">{cat.label}</span>
                    <span className="text-sm text-text-muted">
                      {cat.value} / {cat.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-bg-input rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Pipeline Funnel</h3>
          <div className="space-y-3">
            {activeFunnel.map((step, i) => {
              const widthPct = step.value > 0 ? (step.value / maxFunnel) * 100 : 0;
              const nextStep = activeFunnel[i + 1];
              const conversion = nextStep && step.value > 0
                ? ((nextStep.value / step.value) * 100).toFixed(1)
                : null;

              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <Link href={step.href} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                      {step.label}
                    </Link>
                    <span className="text-sm font-semibold text-text-primary">{step.value}</span>
                  </div>
                  <div className="h-8 bg-bg-input rounded-lg overflow-hidden">
                    {step.value > 0 ? (
                      <div
                        className="h-full rounded-lg bg-linear-to-r from-liber to-liber/60 flex items-center justify-end pr-3 transition-all duration-700 ease-out"
                        style={{ width: `${widthPct}%` }}
                      >
                        <span className="text-[11px] font-medium text-white/80">{step.value}</span>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-[11px] text-text-muted">--</span>
                      </div>
                    )}
                  </div>
                  {conversion && Number(conversion) > 0 && (
                    <div className="flex justify-center mt-1">
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        {conversion}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

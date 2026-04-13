'use client';

import { usePathname } from 'next/navigation';

const routeNames: Record<string, string> = {
  '/': 'Overzicht',
  '/ai-team': 'AI Team',
  '/vacatures': 'Vacatures',
  '/matches': 'Matches',
  '/outreach': 'Outreach',
  '/flexwerkers': 'Flexwerkers',
  '/chat': 'AI Chat',
  '/profiel': 'Profiel',
  '/admin': 'Admin',
  '/systeem': 'Systeem',
};

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const title = routeNames[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <nav className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-text-muted">Dashboard</span>
            <svg className="hidden sm:block w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-text-primary font-medium">{title}</span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full" />
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-liber flex items-center justify-center text-white text-xs font-bold">
              JV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

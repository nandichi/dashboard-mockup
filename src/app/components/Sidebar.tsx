'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useBrand } from './BrandProvider';
import { useDemo } from './DemoContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Handshake,
  Send,
  Users,
  MessageSquareText,
  CircleUser,
  Settings,
  LogOut,
  Sun,
  Moon,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const mainNav: NavItem[] = [
  { label: 'Overzicht', href: '/', icon: LayoutDashboard },
  { label: 'AI Team', href: '/ai-team', icon: Sparkles },
  { label: 'Vacatures', href: '/vacatures', icon: Briefcase },
  { label: 'Matches', href: '/matches', icon: Handshake },
  { label: 'Outreach', href: '/outreach', icon: Send },
  { label: 'Flexwerkers', href: '/flexwerkers', icon: Users },
];

const toolsNav: NavItem[] = [
  { label: 'AI Chat', href: '/chat', icon: MessageSquareText },
];

const accountNav: NavItem[] = [
  { label: 'Profiel', href: '/profiel', icon: CircleUser },
];

const adminNav: NavItem[] = [
  { label: 'Admin', href: '/admin', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function NavSection({ title, items }: { title?: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="mb-2">
      {title && (
        <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </p>
      )}
      <nav className="flex flex-col gap-0.5 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative',
                isActive
                  ? 'bg-liber/20 text-text-primary'
                  : 'text-text-secondary hover:bg-bg-card-hover hover:text-text-primary'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent-red rounded-r-full" />
              )}
              <Icon size={20} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { brand } = useBrand();
  const { resetDemo } = useDemo();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'sidebar-nav fixed top-0 left-0 h-full w-64 z-50 flex flex-col border-r border-border bg-bg-card transition-transform duration-300',
          isOpen ? 'sidebar-open' : 'sidebar-closed'
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <img
            src={brand.logoUrl}
            alt={brand.brandName}
            width={36}
            height={36}
            className="rounded-lg w-9 h-9 object-contain"
          />
          <div>
            <h1 className="text-sm font-bold text-text-primary tracking-tight">{brand.brandName}</h1>
            <p className="text-[11px] text-text-muted">{brand.tagline}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <NavSection items={mainNav} />
          <NavSection title="Tools" items={toolsNav} />
          <NavSection title="Account" items={accountNav} />
          <NavSection title="Beheer" items={adminNav} />
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-liber flex items-center justify-center text-white text-xs font-bold">
              JV
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">Jan de Vries</p>
              <p className="text-[11px] text-text-muted truncate">{brand.contactEmail}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/login"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1.5"
            >
              <LogOut size={16} strokeWidth={1.75} />
              Uitloggen
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={resetDemo}
                className="p-1.5 rounded-lg text-text-muted hover:text-liber-red hover:bg-liber-red/10 transition-all"
                title="Demo resetten"
              >
                <RotateCcw size={16} strokeWidth={1.75} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover transition-all"
                title={theme === 'dark' ? 'Licht thema' : 'Donker thema'}
              >
                {theme === 'dark' ? (
                  <Sun size={16} strokeWidth={1.75} />
                ) : (
                  <Moon size={16} strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

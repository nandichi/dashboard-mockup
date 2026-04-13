export interface BrandConfig {
  brandName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  website: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const defaultBrandConfig: BrandConfig = {
  brandName: 'Liber Personeel',
  tagline: 'AI Matching Dashboard',
  logoUrl: '/liber-icon.png',
  faviconUrl: '/favicon.png',
  contactEmail: 'admin@liberpersoneel.nl',
  website: 'liberpersoneel.nl',
  colors: {
    primary: '#154094',
    secondary: '#e50045',
    accent: '#9aadd1',
  },
};

const STORAGE_KEY = 'brand-config';

export function loadBrandConfig(): BrandConfig {
  if (typeof window === 'undefined') return defaultBrandConfig;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<BrandConfig>;
      return { ...defaultBrandConfig, ...parsed, colors: { ...defaultBrandConfig.colors, ...parsed.colors } };
    }
  } catch {
    // corrupted storage
  }
  return defaultBrandConfig;
}

export function saveBrandConfig(config: BrandConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearBrandConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function applyBrandColors(colors: BrandConfig['colors']): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', colors.primary);
  root.style.setProperty('--brand-secondary', colors.secondary);
  root.style.setProperty('--brand-accent', colors.accent);
}

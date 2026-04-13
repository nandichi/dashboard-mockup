'use client';

import { useState, useEffect, useRef } from 'react';
import { useBrand } from '../components/BrandProvider';
import { BrandConfig, defaultBrandConfig } from '@/lib/brand-config';
import {
  Globe,
  Loader2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Palette,
  Type,
  Image as ImageIcon,
  Mail,
  Link2,
  AlertCircle,
  Check,
  Search,
  Eye,
} from 'lucide-react';

interface ExtractedResult {
  brandName: string;
  logos: { url: string; type: string }[];
  colors: { hex: string; usage: string }[];
  description: string;
}

export default function BrandingPage() {
  const { brand, updateBrand, resetBrand } = useBrand();
  const [config, setConfig] = useState<BrandConfig>(brand);
  const [extractUrl, setExtractUrl] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractResult, setExtractResult] = useState<ExtractedResult | null>(null);
  const [extractError, setExtractError] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'extract' | 'manual' | 'preview'>('extract');
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setConfig(brand);
  }, [brand]);

  const handleExtract = async () => {
    if (!extractUrl.trim()) return;
    setExtracting(true);
    setExtractError('');
    setExtractResult(null);

    try {
      const res = await fetch('/api/brand-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractUrl.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setExtractError(data.error ?? 'Ophalen mislukt');
        return;
      }

      setExtractResult(data as ExtractedResult);
    } catch {
      setExtractError('Netwerkfout bij het ophalen');
    } finally {
      setExtracting(false);
    }
  };

  const applyExtracted = () => {
    if (!extractResult) return;

    const updated = { ...config };

    if (extractResult.brandName) {
      updated.brandName = extractResult.brandName;
    }

    if (extractResult.logos.length > 0) {
      const favicon = extractResult.logos.find(l => l.type === 'favicon' || l.type === 'favicon-default');
      const ogImage = extractResult.logos.find(l => l.type === 'og-image');
      if (favicon) {
        updated.logoUrl = favicon.url;
        updated.faviconUrl = favicon.url;
      }
      if (ogImage) {
        updated.logoUrl = ogImage.url;
      }
    }

    const primary = extractResult.colors.find(c => c.usage === 'primary');
    const secondary = extractResult.colors.find(c => c.usage === 'secondary');
    const accent = extractResult.colors.find(c => c.usage === 'accent');

    if (primary) updated.colors.primary = primary.hex;
    if (secondary) updated.colors.secondary = secondary.hex;
    if (accent) updated.colors.accent = accent.hex;

    let domain = '';
    try {
      domain = new URL(extractUrl.includes('://') ? extractUrl : `https://${extractUrl}`).hostname;
    } catch { /* ignore */ }

    if (domain) {
      updated.website = domain;
      updated.contactEmail = `info@${domain}`;
    }

    setConfig(updated);
    setActiveTab('manual');
  };

  const handleSave = () => {
    updateBrand(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetBrand();
    setConfig(defaultBrandConfig);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-config-${config.brandName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string) as BrandConfig;
        setConfig({ ...defaultBrandConfig, ...imported, colors: { ...defaultBrandConfig.colors, ...imported.colors } });
      } catch {
        setExtractError('Ongeldig JSON bestand');
      }
    };
    reader.readAsText(file);
    if (importRef.current) importRef.current.value = '';
  };

  const updateColor = (key: keyof BrandConfig['colors'], value: string) => {
    setConfig(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  const tabs = [
    { id: 'extract' as const, label: 'Automatisch ophalen', icon: Search },
    { id: 'manual' as const, label: 'Handmatig aanpassen', icon: Palette },
    { id: 'preview' as const, label: 'Preview', icon: Eye },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">White-label configuratie</h1>
        <p className="text-sm text-text-secondary mt-1">
          Pas de branding van het dashboard aan voor jouw bedrijf
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 bg-bg-card border border-border rounded-xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-bg-elevated text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Automatisch ophalen */}
      {activeTab === 'extract' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                <Globe size={20} className="text-text-secondary" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text-primary">Website URL invoeren</h2>
                <p className="text-xs text-text-muted">Voer de website van het bedrijf in om automatisch de branding op te halen</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.75} />
                <input
                  type="text"
                  value={extractUrl}
                  onChange={(e) => setExtractUrl(e.target.value)}
                  placeholder="bijv. https://bedrijfsnaam.nl"
                  className="w-full pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
                />
              </div>
              <button
                onClick={handleExtract}
                disabled={extracting || !extractUrl.trim()}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-liber to-liber-red text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {extracting ? (
                  <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
                ) : (
                  <Search size={16} strokeWidth={1.75} />
                )}
                {extracting ? 'Ophalen...' : 'Ophalen'}
              </button>
            </div>

            {extractError && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} strokeWidth={1.75} />
                {extractError}
              </div>
            )}
          </div>

          {/* Resultaten */}
          {extractResult && (
            <div className="card space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-primary">Gevonden branding</h3>
                <button
                  onClick={applyExtracted}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-liber to-liber-red text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Check size={16} strokeWidth={1.75} />
                  Toepassen
                </button>
              </div>

              {/* Brand naam */}
              {extractResult.brandName && (
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Bedrijfsnaam</p>
                  <p className="text-lg font-semibold text-text-primary">{extractResult.brandName}</p>
                </div>
              )}

              {/* Logo's */}
              {extractResult.logos.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Gevonden logo&apos;s</p>
                  <div className="flex gap-3 flex-wrap">
                    {extractResult.logos.map((logo, i) => (
                      <div key={i} className="bg-bg-elevated border border-border-light rounded-lg p-3 flex flex-col items-center gap-2">
                        <img
                          src={logo.url}
                          alt={logo.type}
                          className="w-16 h-16 object-contain rounded"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="text-[11px] text-text-muted">{logo.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kleuren */}
              {extractResult.colors.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Gevonden kleuren</p>
                  <div className="flex gap-3 flex-wrap">
                    {extractResult.colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2 bg-bg-elevated border border-border-light rounded-lg px-3 py-2">
                        <div className="w-8 h-8 rounded-md border border-border-light" style={{ backgroundColor: color.hex }} />
                        <div>
                          <p className="text-sm font-mono text-text-primary">{color.hex}</p>
                          <p className="text-[11px] text-text-muted capitalize">{color.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {extractResult.description && (
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Beschrijving</p>
                  <p className="text-sm text-text-secondary">{extractResult.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Handmatig aanpassen */}
      {activeTab === 'manual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bedrijfsgegevens */}
          <div className="card space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center">
                <Type size={18} className="text-text-secondary" strokeWidth={1.75} />
              </div>
              <h2 className="text-base font-semibold text-text-primary">Bedrijfsgegevens</h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Bedrijfsnaam</label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => setConfig(prev => ({ ...prev, brandName: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Tagline</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Contact e-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.75} />
                <input
                  type="email"
                  value={config.contactEmail}
                  onChange={(e) => setConfig(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Website</label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.75} />
                <input
                  type="text"
                  value={config.website}
                  onChange={(e) => setConfig(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </div>

          {/* Logo & visueel */}
          <div className="card space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center">
                <ImageIcon size={18} className="text-text-secondary" strokeWidth={1.75} />
              </div>
              <h2 className="text-base font-semibold text-text-primary">Logo & visueel</h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Logo URL</label>
              <input
                type="text"
                value={config.logoUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, logoUrl: e.target.value }))}
                className="w-full"
                placeholder="/liber-icon.png of https://..."
              />
              {config.logoUrl && (
                <div className="mt-2 p-3 bg-bg-elevated rounded-lg border border-border-light inline-block">
                  <img
                    src={config.logoUrl}
                    alt="Logo preview"
                    className="w-12 h-12 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Favicon URL</label>
              <input
                type="text"
                value={config.faviconUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, faviconUrl: e.target.value }))}
                className="w-full"
                placeholder="/favicon.png of https://..."
              />
            </div>
          </div>

          {/* Kleuren */}
          <div className="card space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center">
                <Palette size={18} className="text-text-secondary" strokeWidth={1.75} />
              </div>
              <h2 className="text-base font-semibold text-text-primary">Kleuren</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([
                { key: 'primary' as const, label: 'Primair', desc: 'Hoofdkleur, knoppen, accenten' },
                { key: 'secondary' as const, label: 'Secundair', desc: 'Actiekleur, highlights' },
                { key: 'accent' as const, label: 'Accent', desc: 'Subtiele accenten, badges' },
              ]).map(({ key, label, desc }) => (
                <div key={key} className="bg-bg-elevated border border-border-light rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="color"
                      value={config.colors[key]}
                      onChange={(e) => updateColor(key, e.target.value)}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent p-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{label}</p>
                      <p className="text-[11px] text-text-muted">{desc}</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={config.colors[key]}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^#[0-9a-fA-F]{0,6}$/.test(v)) updateColor(key, v);
                    }}
                    className="w-full font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-base font-semibold text-text-primary mb-4">Live preview</h2>

            {/* Sidebar preview */}
            <div className="bg-bg-elevated border border-border-light rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light">
                {config.logoUrl && (
                  <img
                    src={config.logoUrl}
                    alt="Logo"
                    className="w-9 h-9 rounded-lg object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-text-primary">{config.brandName}</p>
                  <p className="text-[11px] text-text-muted">{config.tagline}</p>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ backgroundColor: `${config.colors.primary}33` }}>
                  <div className="w-1 h-5 rounded-r-full" style={{ backgroundColor: config.colors.secondary }} />
                  <span className="text-text-primary font-medium">Overzicht</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary">
                  <span>Vacatures</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary">
                  <span>Matches</span>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-border-light flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: config.colors.primary }}
                >
                  AB
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Admin Beheerder</p>
                  <p className="text-[11px] text-text-muted">{config.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Knoppen preview */}
          <div className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Knoppen & elementen</h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ background: `linear-gradient(to right, ${config.colors.primary}, ${config.colors.secondary})` }}
              >
                Primaire knop
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: config.colors.primary }}
              >
                Secundaire knop
              </button>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${config.colors.accent}33`, color: config.colors.accent }}
              >
                Badge
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${config.colors.secondary}22`, color: config.colors.secondary }}
              >
                Status
              </span>
            </div>
          </div>

          {/* Login preview */}
          <div className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Login scherm preview</h3>
            <div className="bg-bg-elevated border border-border-light rounded-xl p-6 max-w-sm mx-auto">
              <div
                className="h-1 rounded-t-xl -mt-6 -mx-6 mb-5"
                style={{ background: `linear-gradient(to right, ${config.colors.primary}, ${config.colors.secondary}, ${config.colors.primary})` }}
              />
              <div className="flex flex-col items-center mb-4">
                {config.logoUrl && (
                  <img
                    src={config.logoUrl}
                    alt="Logo"
                    className="w-14 h-14 rounded-xl mb-3 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <p className="text-lg font-bold text-text-primary">Inloggen</p>
                <p className="text-xs text-text-muted">{config.tagline}</p>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder={config.contactEmail} className="w-full text-xs" readOnly />
                <input type="password" placeholder="Wachtwoord" className="w-full text-xs" readOnly />
                <button
                  className="w-full py-2 rounded-lg text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(to right, ${config.colors.primary}, ${config.colors.secondary})` }}
                >
                  Inloggen
                </button>
              </div>
              <p className="text-center text-[11px] text-text-muted mt-4">{config.brandName} - Beveiligde omgeving</p>
            </div>
          </div>
        </div>
      )}

      {/* Actieknoppen (altijd zichtbaar) */}
      <div className="card flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-liber to-liber-red text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          {saved ? <Check size={16} strokeWidth={1.75} /> : <Save size={16} strokeWidth={1.75} />}
          {saved ? 'Opgeslagen' : 'Opslaan'}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:bg-bg-card-hover transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} strokeWidth={1.75} />
          Reset naar standaard
        </button>

        <div className="flex-1" />

        <button
          onClick={handleExport}
          className="px-4 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:bg-bg-card-hover transition-colors flex items-center gap-2"
        >
          <Download size={16} strokeWidth={1.75} />
          Exporteren
        </button>

        <label className="px-4 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:bg-bg-card-hover transition-colors flex items-center gap-2 cursor-pointer">
          <Upload size={16} strokeWidth={1.75} />
          Importeren
          <input
            ref={importRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useBrand } from '../components/BrandProvider';
import { cn } from '@/lib/utils';

export default function AdminPage() {
  const { brand } = useBrand();
  const [activeTab, setActiveTab] = useState('scanner');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const tabs = [
    {
      id: 'scanner',
      label: 'Scanner',
      desc: 'Configureer de vacature scanner',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
    },
    {
      id: 'outreach',
      label: 'Outreach',
      desc: 'Beheer outreach instellingen',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      id: 'data',
      label: 'Data',
      desc: 'Bekijk en exporteer data',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Admin Panel" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'card-flat flex items-center gap-3 text-left transition-all',
              activeTab === tab.id
                ? 'border-liber ring-1 ring-liber/20'
                : 'hover:border-border-light'
            )}
          >
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              activeTab === tab.id ? 'bg-liber/20 text-liber-accent' : 'bg-bg-elevated text-text-muted'
            )}>
              {tab.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{tab.label}</p>
              <p className="text-xs text-text-muted">{tab.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {activeTab === 'scanner' && (
        <div className="space-y-6">
          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Bronnen</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Indeed', checked: true },
                { label: 'Google CSE', checked: true },
                { label: 'LinkedIn', checked: false },
                { label: 'Nationale Vacaturebank', checked: true },
              ].map((bron) => (
                <label key={bron.label} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input type="checkbox" defaultChecked={bron.checked} className="w-4 h-4 rounded border-border accent-liber" />
                  {bron.label}
                </label>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Parameters</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Max resultaten per bron</span>
                  <span className="text-text-primary font-medium">50</span>
                </div>
                <input type="range" min={10} max={100} defaultValue={50} className="w-full accent-liber" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Max pagina's</span>
                  <span className="text-text-primary font-medium">3</span>
                </div>
                <input type="range" min={1} max={10} defaultValue={3} className="w-full accent-liber" />
              </div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Vaste contracten meenemen</span>
                <div className="relative w-10 h-5 rounded-full bg-border cursor-pointer">
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </label>
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">AI Agent</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Pre-filter', on: true },
                { label: 'Classificatie', on: true },
                { label: 'Verificatie', on: false },
                { label: 'Semantische dedup', on: true },
              ].map((toggle) => (
                <label key={toggle.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{toggle.label}</span>
                  <div className={cn('relative w-10 h-5 rounded-full cursor-pointer', toggle.on ? 'bg-placed' : 'bg-border')}>
                    <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform', toggle.on ? 'translate-x-5' : 'translate-x-0.5')} />
                  </div>
                </label>
              ))}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Confidence drempel</span>
                  <span className="text-text-primary font-medium">70%</span>
                </div>
                <input type="range" min={0} max={100} defaultValue={70} className="w-full accent-liber" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Batch grootte</span>
                  <span className="text-text-primary font-medium">5</span>
                </div>
                <input type="range" min={1} max={20} defaultValue={5} className="w-full accent-liber" />
              </div>
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Regio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Centrum</label>
                <input defaultValue="Wageningen" className="w-full text-sm" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Straal</span>
                  <span className="text-text-primary font-medium">75 km</span>
                </div>
                <input type="range" min={10} max={200} defaultValue={75} className="w-full accent-liber" />
              </div>
            </div>
          </section>

          <div className="sticky bottom-4">
            <button
              onClick={() => showToast('Instellingen opgeslagen')}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-liber to-liber/80 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-liber/20"
            >
              Opslaan
            </button>
          </div>
        </div>
      )}

      {activeTab === 'outreach' && (
        <div className="space-y-6">
          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Afzender</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Naam', value: 'Sophie Bakker' },
                { label: 'Functie', value: 'Business Developer' },
                { label: 'Bedrijf', value: brand.brandName },
                { label: 'Email', value: brand.contactEmail },
                { label: 'Telefoon', value: '085 130 2368' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs text-text-muted mb-1 block">{f.label}</label>
                  <input defaultValue={f.value} className="w-full text-sm" />
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Throttling</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Max emails per dag</span>
                  <span className="text-text-primary font-medium">20</span>
                </div>
                <input type="range" min={1} max={50} defaultValue={20} className="w-full accent-liber" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Interval (minuten)</span>
                  <span className="text-text-primary font-medium">30</span>
                </div>
                <input type="range" min={5} max={120} defaultValue={30} className="w-full accent-liber" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Tijdvenster: 09:00 - 17:00</span>
              </div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Alleen werkdagen</span>
                <div className="relative w-10 h-5 rounded-full bg-placed cursor-pointer">
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm translate-x-5" />
                </div>
              </label>
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Suppressielijst</h3>
            <p className="text-xs text-text-muted mb-2">3 adressen</p>
            <div className="space-y-1 mb-3">
              {['hr@heerema.com', 'noreply@example.nl', 'spam@test.com'].map((email) => (
                <p key={email} className="text-sm text-text-secondary font-mono">{email}</p>
              ))}
            </div>
            <button className="text-xs text-liber-red hover:text-liber-red/80 transition-colors">
              Lijst legen
            </button>
          </section>

          <button
            onClick={() => showToast('Outreach instellingen opgeslagen')}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-liber to-liber/80 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Opslaan
          </button>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Vacatures', value: 147 },
              { label: 'Matches', value: 89 },
              { label: 'Flexwerkers', value: 312 },
              { label: 'Outreach', value: 56 },
            ].map((d) => (
              <div key={d.label} className="card text-center">
                <p className="text-3xl font-bold text-liber-accent">{d.value}</p>
                <p className="text-xs text-text-muted mt-1">{d.label}</p>
              </div>
            ))}
          </div>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">CSV Export</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Vacatures', 'Matches', 'Outreach', 'Flexwerkers'].map((type) => (
                <button
                  key={type}
                  onClick={() => showToast(`Export ${type} gestart`)}
                  className="px-4 py-2.5 rounded-lg bg-bg-elevated text-sm text-text-secondary hover:text-text-primary transition-colors border border-border"
                >
                  Export {type} (CSV)
                </button>
              ))}
            </div>
          </section>

          <section className="card border-liber-red/30">
            <h3 className="text-sm font-semibold text-liber-red mb-4">Danger Zone</h3>
            <div className="space-y-3">
              {[
                { label: 'Verwijder vacatures', count: 147 },
                { label: 'Verwijder matches', count: 89 },
                { label: 'Verwijder outreach', count: 56 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{item.label} ({item.count} records)</span>
                  <button
                    onClick={() => setConfirmDialog(item.label)}
                    className="px-3 py-1.5 rounded-lg bg-liber-red/10 text-liber-red text-xs font-medium hover:bg-liber-red/20 transition-colors"
                  >
                    Verwijderen
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Cron schema</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Scanner interval</label>
                <select className="w-full text-sm">
                  <option>Elke 6 uur</option>
                  <option>Elke 12 uur</option>
                  <option>Eens per dag</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Matcher interval</label>
                <select className="w-full text-sm">
                  <option>Direct na elke scan</option>
                  <option>Elke 6 uur</option>
                  <option>Eens per dag</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => showToast('Cron schema opgeslagen')}
              className="mt-4 px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Opslaan
            </button>
          </section>
        </div>
      )}

      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-text-primary mb-2">Bevestiging</h3>
            <p className="text-sm text-text-secondary mb-4">
              Weet je zeker dat je wilt {confirmDialog.toLowerCase()}? Dit kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 rounded-lg bg-bg-elevated text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={() => { setConfirmDialog(null); showToast('Actie uitgevoerd (demo)'); }}
                className="px-4 py-2 rounded-lg bg-liber-red text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}

      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-placed text-white text-sm font-medium shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

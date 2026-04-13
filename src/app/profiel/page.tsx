'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/data/user';
import { useBrand } from '../components/BrandProvider';

export default function ProfielPage() {
  const { brand } = useBrand();
  const user = useMemo(() => getCurrentUser(brand), [brand]);
  const [naam, setNaam] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-1">Profiel</h1>
      <p className="text-sm text-text-secondary mb-6">Beheer je weergavenaam, foto en wachtwoord</p>

      {successMsg && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-placed/10 border border-placed/30 text-sm text-placed">
          {successMsg}
        </div>
      )}

      <div className="space-y-6">
        <div className="card">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Profielfoto</h3>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-liber to-liber-red flex items-center justify-center text-white text-2xl font-bold">
              {user.initials}
            </div>
            <div className="space-y-2">
              <button className="px-4 py-2 rounded-lg bg-bg-elevated text-sm text-text-secondary hover:text-text-primary transition-colors border border-border">
                Upload foto
              </button>
              <button className="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-liber-red transition-colors ml-2">
                Verwijder foto
              </button>
              <p className="text-xs text-text-muted">JPG, PNG of GIF. Max 2MB.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Profielgegevens</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Weergavenaam</label>
              <input value={naam} onChange={(e) => setNaam(e.target.value)} className="w-full text-sm" />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">E-mail</label>
              <input value={user.email} readOnly className="w-full text-sm bg-bg-elevated cursor-not-allowed opacity-70" />
              <p className="text-xs text-text-muted mt-1">E-mail kan alleen door een beheerder gewijzigd worden</p>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full text-sm resize-none" />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Rol</label>
              <p className="text-sm text-text-primary">{user.role}</p>
            </div>
            <button
              onClick={() => showSuccess('Profiel opgeslagen')}
              className="px-4 py-2 rounded-lg bg-liber text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Opslaan
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Wachtwoord wijzigen</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Huidig wachtwoord</label>
              <input type="password" className="w-full text-sm" />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Nieuw wachtwoord</label>
              <input type="password" className="w-full text-sm" />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Bevestig wachtwoord</label>
              <input type="password" className="w-full text-sm" />
              <p className="text-xs text-text-muted mt-1">Minimaal 8 tekens</p>
            </div>
            <button
              onClick={() => showSuccess('Wachtwoord gewijzigd')}
              className="px-4 py-2 rounded-lg bg-bg-elevated text-sm text-text-secondary hover:text-text-primary transition-colors border border-border"
            >
              Wijzig wachtwoord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

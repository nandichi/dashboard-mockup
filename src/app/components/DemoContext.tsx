'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DemoState {
  scanCompleted: boolean;
  matchCompleted: boolean;
  outreachCompleted: boolean;
}

interface DemoContextType {
  state: DemoState;
  completeScan: () => void;
  completeMatch: () => void;
  completeOutreach: () => void;
  /** Zet scannen, matchen en outreach direct op voltooid (demo/presentatie). */
  completeFullDemo: () => void;
  resetDemo: () => void;
  canRunMatcher: boolean;
  canRunOutreach: boolean;
}

const initialState: DemoState = {
  scanCompleted: false,
  matchCompleted: false,
  outreachCompleted: false,
};

const STORAGE_KEY = 'liber-demo-state';

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemo(): DemoContextType {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}

export default function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch {
      // sessionStorage unavailable
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage unavailable
    }
  }, [state, hydrated]);

  const completeScan = useCallback(() => {
    setState((prev) => ({ ...prev, scanCompleted: true }));
  }, []);

  const completeMatch = useCallback(() => {
    setState((prev) => ({ ...prev, matchCompleted: true }));
  }, []);

  const completeOutreach = useCallback(() => {
    setState((prev) => ({ ...prev, outreachCompleted: true }));
  }, []);

  const completeFullDemo = useCallback(() => {
    setState({
      scanCompleted: true,
      matchCompleted: true,
      outreachCompleted: true,
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState(initialState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const canRunMatcher = state.scanCompleted;
  const canRunOutreach = state.matchCompleted;

  return (
    <DemoContext.Provider value={{ state, completeScan, completeMatch, completeOutreach, completeFullDemo, resetDemo, canRunMatcher, canRunOutreach }}>
      {children}
    </DemoContext.Provider>
  );
}

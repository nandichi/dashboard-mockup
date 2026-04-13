'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  BrandConfig,
  defaultBrandConfig,
  loadBrandConfig,
  saveBrandConfig,
  clearBrandConfig,
  applyBrandColors,
} from '@/lib/brand-config';

interface BrandContextType {
  brand: BrandConfig;
  updateBrand: (config: BrandConfig) => void;
  resetBrand: () => void;
}

const BrandContext = createContext<BrandContextType>({
  brand: defaultBrandConfig,
  updateBrand: () => {},
  resetBrand: () => {},
});

export function useBrand() {
  return useContext(BrandContext);
}

export default function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(defaultBrandConfig);

  useEffect(() => {
    const loaded = loadBrandConfig();
    setBrand(loaded);
    applyBrandColors(loaded.colors);

    if (loaded.brandName !== defaultBrandConfig.brandName) {
      document.title = `${loaded.brandName} - ${loaded.tagline}`;
    }
    if (loaded.faviconUrl !== defaultBrandConfig.faviconUrl) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (link) link.href = loaded.faviconUrl;
    }
  }, []);

  const updateBrand = useCallback((config: BrandConfig) => {
    setBrand(config);
    saveBrandConfig(config);
    applyBrandColors(config.colors);

    if (config.faviconUrl) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (link) link.href = config.faviconUrl;
    }

    if (config.brandName) {
      document.title = `${config.brandName} - ${config.tagline}`;
    }
  }, []);

  const resetBrand = useCallback(() => {
    clearBrandConfig();
    setBrand(defaultBrandConfig);
    applyBrandColors(defaultBrandConfig.colors);
    document.title = `${defaultBrandConfig.brandName} - ${defaultBrandConfig.tagline}`;
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) link.href = defaultBrandConfig.faviconUrl;
  }, []);

  return (
    <BrandContext.Provider value={{ brand, updateBrand, resetBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

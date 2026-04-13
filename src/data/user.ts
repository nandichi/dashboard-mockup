import { BrandConfig, defaultBrandConfig } from '@/lib/brand-config';

export function getCurrentUser(brand: BrandConfig = defaultBrandConfig) {
  return {
    id: '1',
    name: 'Jan de Vries',
    email: brand.contactEmail,
    initials: 'JV',
    role: 'Beheerder',
    bio: `Verantwoordelijk voor de AI-gestuurde werving bij ${brand.brandName}`,
    isAdmin: true,
  };
}

export const currentUser = getCurrentUser();

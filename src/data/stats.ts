export const dashboardStats = {
  vacatures: { value: 147, subtitle: '23 nieuw / 89 gematcht' },
  hotMatches: { value: 34, subtitle: '18 warm / 12 cold' },
  beschikbaar: { value: 312, subtitle: '28 geplaatst' },
  emailsVerstuurd: { value: 156, subtitle: '41 geinteresseerd' },
};

export const matchCategories = [
  { label: 'Hot', value: 34, total: 147, color: '#e50045' },
  { label: 'Warm', value: 18, total: 147, color: '#f59e0b' },
  { label: 'Cold', value: 12, total: 147, color: '#154094' },
];

export const pipelineFunnel = [
  { label: 'Vacatures gescand', value: 147, href: '/vacatures' },
  { label: 'Gematcht', value: 89, href: '/matches' },
  { label: 'Outreach verstuurd', value: 56, href: '/outreach' },
  { label: 'Reacties ontvangen', value: 41, href: '/outreach' },
];

export const outreachStats = {
  verstuurd: { value: 56, color: 'blue' as const },
  reacties: { value: 41, color: 'green' as const },
  geinteresseerd: { value: 23, color: 'red' as const },
  previews: { value: 12, color: 'muted' as const },
};

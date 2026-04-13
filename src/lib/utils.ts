export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Goedemorgen';
  if (hour >= 12 && hour < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

export function formatDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  }
  return dateStr;
}

export function getRelativeTime(hoursAgo: number): string {
  if (hoursAgo < 1) return 'Zojuist';
  if (hoursAgo === 1) return '1 uur geleden';
  if (hoursAgo < 24) return `${hoursAgo} uur geleden`;
  const days = Math.floor(hoursAgo / 24);
  if (days === 1) return 'Gisteren';
  return `${days} dagen geleden`;
}

import { cn } from '@/lib/utils';

type BadgeVariant = 'hot' | 'warm' | 'cold' | 'nieuw' | 'gematcht' | 'verlopen' | 'beschikbaar' | 'geplaatst' | 'verstuurd' | 'geinteresseerd' | 'geen-reactie' | 'opt-out' | 'approved' | 'sent' | 'pending' | 'goed' | 'matig' | 'slecht' | 'neutraal' | 'wachtend' | 'succesvol' | 'fout';

const variantStyles: Record<BadgeVariant, string> = {
  hot: 'bg-liber-red/15 text-liber-red border-liber-red/30',
  warm: 'bg-warm/15 text-warm border-warm/30',
  cold: 'bg-liber/15 text-liber-accent border-liber/30',
  nieuw: 'bg-liber/15 text-liber-accent border-liber/30',
  gematcht: 'bg-placed/15 text-placed border-placed/30',
  verlopen: 'bg-text-muted/15 text-text-muted border-text-muted/30',
  beschikbaar: 'bg-placed/15 text-placed border-placed/30',
  geplaatst: 'bg-liber/15 text-liber-accent border-liber/30',
  verstuurd: 'bg-liber/15 text-liber-accent border-liber/30',
  geinteresseerd: 'bg-placed/15 text-placed border-placed/30',
  'geen-reactie': 'bg-text-muted/15 text-text-muted border-text-muted/30',
  'opt-out': 'bg-liber-red/15 text-liber-red border-liber-red/30',
  approved: 'bg-placed/15 text-placed border-placed/30',
  sent: 'bg-liber/15 text-liber-accent border-liber/30',
  pending: 'bg-warm/15 text-warm border-warm/30',
  goed: 'bg-placed/15 text-placed border-placed/30',
  matig: 'bg-warm/15 text-warm border-warm/30',
  slecht: 'bg-liber-red/15 text-liber-red border-liber-red/30',
  neutraal: 'bg-text-muted/15 text-text-muted border-text-muted/30',
  wachtend: 'bg-warm/15 text-warm border-warm/30',
  succesvol: 'bg-placed/15 text-placed border-placed/30',
  fout: 'bg-liber-red/15 text-liber-red border-liber-red/30',
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant] || variantStyles.neutraal,
        className
      )}
    >
      {children}
    </span>
  );
}

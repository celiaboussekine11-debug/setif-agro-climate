import React from 'react';
import { AlertTriangle, CheckCircle2, OctagonAlert } from 'lucide-react';
import { Language, StatusLevel } from '../types/agro';
import { SHORT_STATUS_LABELS, STATUS_LABELS } from '../i18n/translations';

interface StatusBadgeProps {
  status: StatusLevel;
  lang: Language;
  variant?: 'full' | 'short';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  lang,
  variant = 'full',
  className = '',
}) => {
  const label = variant === 'short' ? SHORT_STATUS_LABELS[status][lang] : STATUS_LABELS[status][lang];

  const styles: Record<StatusLevel, string> = {
    optimal: 'bg-[#ECFDF5] text-[#15803D] border-[#86EFAC]',
    vigilance: 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]',
    alert: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]',
  };

  const Icon =
    status === 'optimal'
      ? CheckCircle2
      : status === 'vigilance'
        ? AlertTriangle
        : OctagonAlert;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 ${styles[status]} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};

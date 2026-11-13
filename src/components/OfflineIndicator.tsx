import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types/agro';

interface OfflineIndicatorProps {
  lang: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ lang }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  const message =
    lang === 'fr'
      ? 'Mode hors-ligne — Données en cache utilisées.'
      : lang === 'ar'
        ? 'وضع دون اتصال — يتم استخدام البيانات المحفوظة.'
        : 'Offline Mode — Cached field data active.';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-4 left-4 z-40 flex items-center gap-2 rounded-lg border border-[#FDBA74] bg-[#FFF7ED] px-3.5 py-2 text-xs font-semibold text-[#9A3412] shadow-md"
    >
      <WifiOff className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

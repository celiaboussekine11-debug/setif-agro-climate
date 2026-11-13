import React from 'react';
import { CheckCircle2, Sprout, WifiOff } from 'lucide-react';
import { Language } from '../types/agro';
import { TRANSLATIONS } from '../i18n/translations';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onChangeLang }) => {
  const t = TRANSLATIONS[lang];
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2DDD2] bg-[#FAF8F4]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#1A261F] whitespace-nowrap shrink-0 font-display"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B4332] text-[#FAF8F4] shrink-0">
            <Sprout className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>{t.brandTitle}</span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A5850]"
        >
          <a
            href="#zone-selector"
            className="hover:text-[#1B4332] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navZone}
          </a>
          <a
            href="#climate-signals"
            className="hover:text-[#1B4332] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navSignals}
          </a>
          <a
            href="#rotation-planner"
            className="hover:text-[#1B4332] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navRotation}
          </a>
          <a
            href="#seasonal-alerts"
            className="hover:text-[#1B4332] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navAlerts}
          </a>
        </nav>

        {/* Zone 3: Language Toggle + Offline-Ready PWA Status + Install */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#D4CEC0] bg-[#F2EFE7] px-2.5 py-1.5 text-xs font-semibold text-[#1B4332] whitespace-nowrap shrink-0"
            title={t.offlineReadyPwa}
          >
            {isOnline ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" aria-hidden="true" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-[#C2410C] shrink-0" aria-hidden="true" />
            )}
            <span>{isOnline ? t.offlineReadyPwa : t.offlineActive}</span>
          </div>

          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-lg border border-[#D4CEC0] bg-[#F2EFE7] p-0.5 shrink-0"
          >
            {(['en', 'fr', 'ar'] as Language[]).map((code) => {
              const label = code === 'en' ? 'EN' : code === 'fr' ? 'FR' : 'عربي';
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onChangeLang(code)}
                  aria-pressed={active}
                  className={`min-h-[34px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1B4332] text-[#FAF8F4] shadow-xs'
                      : 'text-[#4A5850] hover:text-[#1A261F]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <PWAInstallButton lang={lang} installLabel={t.installApp} compact />
        </div>
      </div>
    </header>
  );
};

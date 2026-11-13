import React, { useState } from 'react';
import { ArrowDownRight, Compass, Layers } from 'lucide-react';
import { Language } from '../types/agro';
import { TRANSLATIONS } from '../i18n/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E2DDD2] bg-[#16271F]"
    >
      {/* Background Documentary Photograph with Measured Scrim */}
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src="/src/assets/images/hero_setif_wheat_1794597704881.jpg"
            alt="Farmers inspecting soil in a durum wheat field on the Setif high plains"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#3A5A40]" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#111D16]/90 via-[#15251C]/75 to-[#15251C]/40"
          aria-hidden="true"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-22 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#A7D7B8] uppercase">
            {t.heroKicker}
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F4] font-display leading-[1.08]">
            {t.heroTitle}
          </h1>

          <p className="mt-3 text-sm sm:text-base font-medium text-[#D8E8DD] font-mono tabular-nums">
            {t.brandSubtitle}
          </p>

          <p className="mt-5 text-base sm:text-lg text-[#F2EFE7]/90 leading-relaxed max-w-xl">
            {t.heroDesc}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-[#CBE0D2] font-medium">
            {t.heroMeta}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#zone-selector"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FAF8F4] px-5 py-3 text-sm font-semibold text-[#1B4332] shadow-sm transition-colors hover:bg-[#EAE5D9] min-h-[44px] whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.exploreZoneCta}</span>
              <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href="#rotation-planner"
              className="inline-flex items-center gap-2 rounded-lg border border-[#FAF8F4]/35 bg-[#1B4332]/65 px-5 py-3 text-sm font-semibold text-[#FAF8F4] backdrop-blur-xs transition-colors hover:bg-[#1B4332]/90 min-h-[44px] whitespace-nowrap shrink-0"
            >
              <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.viewRotationCta}</span>
            </a>

            <PWAInstallButton lang={lang} installLabel={t.installApp} />
          </div>
        </div>
      </div>
    </section>
  );
};

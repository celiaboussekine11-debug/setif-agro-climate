import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/agro';

interface PWAInstallButtonProps {
  lang: Language;
  installLabel: string;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  installLabel,
  compact = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B4332] text-[#FAF8F4] font-semibold transition-colors hover:bg-[#2D6A4F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332] whitespace-nowrap shrink-0 cursor-pointer ${
          compact ? 'min-h-[40px] px-3 py-1.5 text-xs' : 'min-h-[44px] px-4 py-2 text-sm'
        }`}
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{installLabel}</span>
      </button>
    );
  }

  if (isIOS) {
    const iosLabel =
      lang === 'fr' ? 'Installer (iOS)' : lang === 'ar' ? 'تثبيت (iOS)' : 'Install on iOS';
    const guideTitle =
      lang === 'fr'
        ? 'Installer sur iPhone / iPad'
        : lang === 'ar'
          ? 'التثبيت على iPhone / iPad'
          : 'Install on iPhone / iPad';
    const step1 =
      lang === 'fr'
        ? '1. Appuyez sur le bouton Partager dans la barre Safari.'
        : lang === 'ar'
          ? '1. اضغط على زر المشاركة في شريط Safari.'
          : '1. Tap the Share button in the Safari toolbar.';
    const step2 =
      lang === 'fr'
        ? '2. Faites défiler et appuyez sur « Sur l’écran d’accueil ».'
        : lang === 'ar'
          ? '2. مرر للأسفل واختر «إضافة إلى الشاشة الرئيسية».'
          : '2. Scroll down and tap Add to Home Screen.';
    const closeText = lang === 'fr' ? 'Fermer' : lang === 'ar' ? 'إغلاق' : 'Close';

    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4CEC0] bg-white px-3 py-2 text-xs font-semibold text-[#1A261F] hover:bg-[#F2EFE7] transition-colors min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{iosLabel}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl border border-[#E2DDD2] bg-[#FAF8F4] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-[#1A261F]">{guideTitle}</h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 rounded-lg text-[#526058] hover:bg-[#E2DDD2]/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
                  aria-label={closeText}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 space-y-2 text-sm text-[#3F4D45]">
                <p>{step1}</p>
                <p>{step2}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-[#1B4332] py-2.5 text-sm font-semibold text-white hover:bg-[#2D6A4F] min-h-[44px]"
              >
                {closeText}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

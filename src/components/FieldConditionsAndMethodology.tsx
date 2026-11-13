import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Database,
  Hand,
  Languages,
  MessageSquare,
  Volume2,
  VolumeX,
  Wifi,
} from 'lucide-react';
import { COMMUNES, SUMMER_GUIDANCE } from '../data/agroData';
import { STATUS_LABELS, TRANSLATIONS } from '../i18n/translations';
import { CommuneId, Language, SummerCropId } from '../types/agro';
import { PWAInstallButton } from './PWAInstallButton';

interface FieldConditionsAndMethodologyProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  selectedCommuneId: CommuneId;
  summerCrop: SummerCropId;
  lastCachedAt: string;
  onSyncOffline: () => void;
}

export const FieldConditionsAndMethodology: React.FC<
  FieldConditionsAndMethodologyProps
> = ({
  lang,
  onChangeLang,
  selectedCommuneId,
  summerCrop,
  lastCachedAt,
  onSyncOffline,
}) => {
  const t = TRANSLATIONS[lang];
  const [imgError, setImgError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSmsDrawer, setShowSmsDrawer] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);
  const [thresholdsOpen, setThresholdsOpen] = useState(true);

  const commune = COMMUNES.find((c) => c.id === selectedCommuneId) || COMMUNES[0];
  const reading = commune.signals.recent;
  const summer = SUMMER_GUIDANCE[summerCrop];

  const smsText = `[Setif Agro-Climate] ${commune.name[lang]} (${STATUS_LABELS[commune.status][lang]}): T=${reading.temperatureC}°C, RH=${reading.humidityPct}%, P=${reading.pressureKpa}kPa. ${summer.cropName[lang]}: ${summer.action[lang]}`;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(smsText);
    utterance.lang = lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopySms = async () => {
    try {
      await navigator.clipboard.writeText(smsText);
      setCopiedSms(true);
      setTimeout(() => setCopiedSms(false), 2000);
    } catch {
      setCopiedSms(false);
    }
  };

  return (
    <>
      {/* Section 07: Built for Real Conditions */}
      <section className="border-b border-[#E2DDD2] bg-[#F2EFE7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Features */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
                  {t.sec07Eyebrow}
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
                  {t.sec07Title}
                </h2>
                <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
                  {t.sec07Desc}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4CEC0] bg-white text-[#1B4332]">
                    <Languages className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A261F]">{t.featureLangTitle}</h3>
                    <p className="text-sm text-[#4A5850]">{t.featureLangDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4CEC0] bg-white text-[#1B4332]">
                    <Hand className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A261F]">{t.featureTouchTitle}</h3>
                    <p className="text-sm text-[#4A5850]">{t.featureTouchDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4CEC0] bg-white text-[#1B4332]">
                    <Wifi className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A261F]">{t.featureOfflineTitle}</h3>
                    <p className="text-sm text-[#4A5850]">{t.featureOfflineDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4CEC0] bg-white text-[#1B4332]">
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A261F]">{t.featurePathsTitle}</h3>
                    <p className="text-sm text-[#4A5850]">{t.featurePathsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Field Image + Interactive Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#D4CEC0] bg-[#EAE5D7] aspect-[16/10]">
                {!imgError ? (
                  <img
                    src="/src/assets/images/farmer_mobile_field_1794597704029.jpg"
                    alt="Farmer checking agro-climatic guidance on a smartphone in a golden Setif wheat field"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#2D6A4F] to-[#1B4332]" />
                )}
              </div>

              {/* Language Quick Buttons + Offline Cache + Voice / SMS Pathways */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['fr', 'ar', 'en'] as Language[]).map((code) => {
                  const active = lang === code;
                  const title =
                    code === 'fr' ? 'Français' : code === 'ar' ? 'العربية' : 'English';
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onChangeLang(code)}
                      aria-pressed={active}
                      className={`min-h-[44px] rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'border-[#1B4332] bg-[#1B4332] text-[#FAF8F4]'
                          : 'border-[#D4CEC0] bg-white text-[#1A261F] hover:bg-[#FAF8F4]'
                      }`}
                    >
                      {active ? `✓ ${title}` : title}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4CEC0] bg-white px-4 py-2.5 text-xs font-semibold text-[#1A261F] hover:bg-[#FAF8F4] min-h-[44px] cursor-pointer"
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#1B4332] shrink-0" aria-hidden="true" />
                  )}
                  <span>{isSpeaking ? t.stopVoiceBtn : t.listenVoiceBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSmsDrawer((v) => !v)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4CEC0] bg-white px-4 py-2.5 text-xs font-semibold text-[#1A261F] hover:bg-[#FAF8F4] min-h-[44px] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#1B4332] shrink-0" aria-hidden="true" />
                  <span>{t.smsPreviewBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={onSyncOffline}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1B4332] bg-[#FAF8F4] px-4 py-2.5 text-xs font-semibold text-[#1B4332] hover:bg-[#1B4332] hover:text-[#FAF8F4] transition-colors min-h-[44px] cursor-pointer"
                >
                  <Database className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.syncOfflineBtn}</span>
                </button>
              </div>

              <p className="text-xs text-[#526058] font-mono tabular-nums">
                {t.savedOfflineAt} {lastCachedAt}
              </p>

              {showSmsDrawer && (
                <div className="rounded-xl border border-[#1B4332]/30 bg-white p-4 space-y-3">
                  <p className="text-xs font-mono text-[#1A261F] leading-relaxed break-words">
                    {smsText}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopySms}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B4332] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#2D6A4F] min-h-[38px] cursor-pointer"
                  >
                    {copiedSms ? (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{copiedSms ? t.copiedBtn : t.copyMessageBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 08: Data & Methodology */}
      <section className="border-b border-[#E2DDD2] bg-[#FAF8F4] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              {t.sec08Eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
              {t.sec08Title}
            </h2>
            <p className="mt-2.5 text-base text-[#4A5850]">{t.sec08Desc}</p>
            <p className="mt-2 text-xs font-mono text-[#526058]">{t.methodologyRef}</p>
          </div>

          {/* 5-Step Transparent Pipeline */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {t.pipeline.map((step, index) => {
              const isLast = index === t.pipeline.length - 1;
              return (
                <div
                  key={step.title}
                  className={`rounded-2xl border p-5 flex flex-col justify-between min-h-[124px] ${
                    isLast
                      ? 'border-[#1B4332] bg-[#1B4332] text-[#FAF8F4]'
                      : 'border-[#E2DDD2] bg-white text-[#1A261F]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isLast ? 'text-[#A7D7B8]' : 'text-[#526058]'
                    }`}
                  >
                    0{index + 1} · {step.title}
                  </span>
                  <div className="mt-3 text-sm font-bold leading-snug">{step.detail}</div>
                </div>
              );
            })}
          </div>

          {/* Collapsible Threshold Definitions */}
          <div className="mt-6 rounded-2xl border border-[#E2DDD2] bg-white">
            <button
              type="button"
              onClick={() => setThresholdsOpen((o) => !o)}
              aria-expanded={thresholdsOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-start text-sm font-bold text-[#1A261F] min-h-[52px] cursor-pointer"
            >
              <span>{t.thresholdsTitle}</span>
              {thresholdsOpen ? (
                <ChevronUp className="w-4 h-4 text-[#526058]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#526058]" />
              )}
            </button>

            {thresholdsOpen && (
              <div className="border-t border-[#ECE7DC] px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#3F4D45]">
                {t.thresholdsList.map((rule) => (
                  <div key={rule} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2D6A4F] shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 09: Next Field Decision CTA Footer */}
      <footer className="bg-[#132A20] text-[#FAF8F4] py-14 sm:py-18 pb-24 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A7D7B8]">
              {t.pilotNote}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-display">
              {t.sec09Title}
            </h2>
            <p className="mt-3 text-base text-[#D8E8DD]">{t.sec09Desc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#zone-selector"
              className="inline-flex items-center justify-center rounded-lg bg-[#FAF8F4] px-5 py-3 text-sm font-semibold text-[#1B4332] hover:bg-[#EAE5D9] min-h-[44px] whitespace-nowrap"
            >
              {t.exploreZoneCta}
            </a>
            <a
              href="#rotation-planner"
              className="inline-flex items-center justify-center rounded-lg border border-[#FAF8F4]/35 px-5 py-3 text-sm font-semibold text-[#FAF8F4] hover:bg-[#1B4332] min-h-[44px] whitespace-nowrap"
            >
              {t.viewRotationCta}
            </a>
            <PWAInstallButton lang={lang} installLabel={t.installApp} />
          </div>
        </div>
      </footer>
    </>
  );
};

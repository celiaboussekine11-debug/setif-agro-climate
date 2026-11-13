import React from 'react';
import { Droplets, Gauge, Thermometer } from 'lucide-react';
import {
  COMMUNES,
  getHumidityStatus,
  getPressureStatus,
  getTemperatureStatus,
} from '../data/agroData';
import { TRANSLATIONS } from '../i18n/translations';
import { CommuneId, CustomParcel, DateRangeId, Language } from '../types/agro';
import { StatusBadge } from './StatusBadge';

interface ClimateSignalsProps {
  lang: Language;
  selectedCommuneId: CommuneId;
  customParcel: CustomParcel | null;
  dateRange: DateRangeId;
  onChangeDateRange: (range: DateRangeId) => void;
}

export const ClimateSignals: React.FC<ClimateSignalsProps> = ({
  lang,
  selectedCommuneId,
  customParcel,
  dateRange,
  onChangeDateRange,
}) => {
  const t = TRANSLATIONS[lang];
  const commune =
    COMMUNES.find((c) => c.id === (customParcel ? customParcel.nearestCommuneId : selectedCommuneId)) ||
    COMMUNES[0];

  const reading = commune.signals[dateRange];
  const tempStatus = getTemperatureStatus(reading.temperatureC);
  const pressureStatus = getPressureStatus(reading.pressureKpa);
  const humidityStatus = getHumidityStatus(reading.humidityPct);

  const cards = [
    {
      id: 'temp',
      title: t.tempTitle,
      value: reading.temperatureC.toFixed(1),
      unit: '°C',
      status: tempStatus,
      thresholdNote: t.tempThreshold,
      fillPct: Math.min(100, Math.max(15, (reading.temperatureC / 35) * 100)),
      icon: Thermometer,
    },
    {
      id: 'pressure',
      title: t.pressureTitle,
      value: reading.pressureKpa.toFixed(1),
      unit: 'kPa',
      status: pressureStatus,
      thresholdNote: t.pressureThreshold,
      fillPct: Math.min(100, Math.max(20, ((reading.pressureKpa - 88) / 5) * 100)),
      icon: Gauge,
    },
    {
      id: 'humidity',
      title: t.humidityTitle,
      value: String(reading.humidityPct),
      unit: '%',
      status: humidityStatus,
      thresholdNote: t.humidityThreshold,
      fillPct: Math.min(100, Math.max(10, reading.humidityPct)),
      icon: Droplets,
    },
  ];

  const barColor = {
    optimal: 'bg-[#15803D]',
    vigilance: 'bg-[#D97706]',
    alert: 'bg-[#DC2626]',
  };

  return (
    <section id="climate-signals" className="border-b border-[#E2DDD2] bg-[#F2EFE7] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              {t.sec02Eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
              {t.sec02Title}
            </h2>
            <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
              {t.sec02Desc}
            </p>
            <p className="mt-4 text-xs font-medium text-[#526058]">
              {t.signalsFootnote}
            </p>
          </div>

          {/* Right Column: Station Header + Date Range + 3 Signal Cards */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#DED8CA]">
              <div>
                <h3 className="text-lg font-bold text-[#1A261F] font-display">
                  {customParcel
                    ? `${t.customParcelName} (${commune.name[lang]})`
                    : `${commune.name[lang]} · ${commune.profileName[lang]}`}
                </h3>
                <p className="text-xs text-[#526058]">
                  {t.estimatesNotLive} ·{' '}
                  <span className="font-mono tabular-nums">
                    {commune.coords.lat}° N, {commune.coords.lon}° E
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <label
                  htmlFor="date-range-select"
                  className="text-xs font-semibold text-[#526058] whitespace-nowrap"
                >
                  {t.dateRangeLabel}
                </label>
                <select
                  id="date-range-select"
                  value={dateRange}
                  onChange={(e) => onChangeDateRange(e.target.value as DateRangeId)}
                  className="min-h-[40px] rounded-lg border border-[#D4CEC0] bg-white px-3 py-1.5 text-sm font-semibold text-[#1A261F] focus:outline-2 focus:outline-[#1B4332] cursor-pointer"
                >
                  {(['recent', '7d', '30d', 'spring-peak'] as DateRangeId[]).map((id) => (
                    <option key={id} value={id}>
                      {t.dateRanges[id]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.id}
                    className="rounded-2xl border border-[#E2DDD2] bg-white p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#3F4D45]">
                          {card.title}
                        </span>
                        <Icon className="w-4 h-4 text-[#526058] shrink-0" aria-hidden="true" />
                      </div>

                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold tracking-tight text-[#1A261F] font-mono tabular-nums">
                          {card.value}
                        </span>
                        <span className="text-sm font-semibold text-[#526058] font-mono">
                          {card.unit}
                        </span>
                      </div>

                      <div className="mt-3">
                        <StatusBadge status={card.status} lang={lang} variant="short" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ECE7DC]">
                        <div
                          className={`h-full rounded-full transition-all duration-200 ${barColor[card.status]}`}
                          style={{ width: `${card.fillPct}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-[#526058] leading-snug">
                        {card.thresholdNote}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

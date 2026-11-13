import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEASONAL_ALERTS } from '../data/agroData';
import { TRANSLATIONS } from '../i18n/translations';
import { AlertCategory, Language, SeasonMonth } from '../types/agro';

interface SeasonalAlertsProps {
  lang: Language;
}

export const SeasonalAlerts: React.FC<SeasonalAlertsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [category, setCategory] = useState<AlertCategory>('all');
  const [selectedMonth, setSelectedMonth] = useState<SeasonMonth | null>(null);
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>('spring-frost');

  const months: { id: SeasonMonth; barColor: string }[] = [
    { id: 'march', barColor: 'bg-[#D97706]' },
    { id: 'april', barColor: 'bg-[#EA580C]' },
    { id: 'may', barColor: 'bg-[#D97706]' },
    { id: 'autumn', barColor: 'bg-[#15803D]' },
  ];

  const filteredAlerts = SEASONAL_ALERTS.filter((item) => {
    const matchCategory = category === 'all' || item.category === category;
    const matchMonth = !selectedMonth || item.months.includes(selectedMonth);
    return matchCategory && matchMonth;
  });

  const severityStyles = {
    'green-light': 'bg-[#ECFDF5] text-[#15803D] border-[#86EFAC]',
    'red-alert': 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]',
    'priority-alert': 'bg-[#132A20] text-[#FAF8F4] border-[#132A20]',
  };

  return (
    <section id="seasonal-alerts" className="border-b border-[#E2DDD2] bg-[#FAF8F4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              {t.sec05Eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
              {t.sec05Title}
            </h2>
            <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
              {t.sec05Desc}
            </p>
            <p className="mt-4 text-xs font-medium text-[#526058]">
              {t.alertsFootnote}
            </p>
          </div>

          {/* Right Column: Filters + Seasonal Timeline + Alert Cards */}
          <div className="lg:col-span-8 space-y-5">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: t.filterAll },
                  { id: 'sowing', label: t.filterSowing },
                  { id: 'frost', label: t.filterFrost },
                  { id: 'heat', label: t.filterHeat },
                ] as { id: AlertCategory; label: string }[]
              ).map((tab) => {
                const active = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tab.id)}
                    aria-pressed={active}
                    className={`min-h-[40px] rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1B4332] text-[#FAF8F4]'
                        : 'border border-[#D4CEC0] bg-white text-[#3F4D45] hover:bg-[#F2EFE7]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Seasonal Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl border border-[#E2DDD2] bg-white p-2.5">
              {months.map((m) => {
                const active = selectedMonth === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMonth(active ? null : m.id)}
                    aria-pressed={active}
                    className={`rounded-lg p-2.5 text-start transition-colors cursor-pointer ${
                      active ? 'bg-[#F2EFE7] ring-1 ring-[#1B4332]' : 'hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1A261F]">{t.months[m.id]}</div>
                    <div className={`mt-2 h-1.5 w-full rounded-full ${m.barColor}`} />
                  </button>
                );
              })}
            </div>

            {/* Alert Cards */}
            {filteredAlerts.length === 0 ? (
              <div className="rounded-2xl border border-[#E2DDD2] bg-white p-6 text-center text-sm text-[#526058]">
                {t.filterAll} —{' '}
                <button
                  type="button"
                  onClick={() => {
                    setCategory('all');
                    setSelectedMonth(null);
                  }}
                  className="font-semibold text-[#1B4332] underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredAlerts.map((alert) => {
                  const isExpanded = expandedAlertId === alert.id;
                  return (
                    <article
                      key={alert.id}
                      className="rounded-2xl border border-[#E2DDD2] bg-white p-5 flex flex-col justify-between transition-colors hover:border-[#B9B1A0]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold text-[#1A261F] font-display leading-snug">
                            {alert.title[lang]}
                          </h3>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedAlertId(isExpanded ? null : alert.id)
                            }
                            aria-expanded={isExpanded}
                            aria-label={alert.title[lang]}
                            className="p-1.5 rounded-md text-[#526058] hover:bg-[#F2EFE7] min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="mt-2.5">
                          <span
                            className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                              severityStyles[alert.severity]
                            }`}
                          >
                            {t.severityLabels[alert.severity]}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-[#4A5850] leading-relaxed">
                          {alert.condition[lang]}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-[#ECE7DC] pt-3">
                        <p className="text-sm font-bold text-[#1A261F]">{alert.action[lang]}</p>
                        {isExpanded && (
                          <p className="mt-2.5 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#3F4D45] leading-relaxed border border-[#E2DDD2]">
                            {alert.fieldNotes[lang]}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

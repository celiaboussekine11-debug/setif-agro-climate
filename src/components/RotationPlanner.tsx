import React from 'react';
import { Check, Droplet, Flame, FlaskConical, ShieldCheck } from 'lucide-react';
import { COMMUNES, CROP_LABELS, getRotationOptions } from '../data/agroData';
import { TRANSLATIONS } from '../i18n/translations';
import { CommuneId, CropId, Language, ScenarioId } from '../types/agro';
import { StatusBadge } from './StatusBadge';

interface RotationPlannerProps {
  lang: Language;
  selectedCommuneId: CommuneId;
  onSelectCommune: (id: CommuneId) => void;
  currentCrop: CropId;
  onChangeCrop: (crop: CropId) => void;
  scenario: ScenarioId;
  onChangeScenario: (scenario: ScenarioId) => void;
  selectedFollowUpId: string;
  onSelectFollowUp: (id: string) => void;
}

export const RotationPlanner: React.FC<RotationPlannerProps> = ({
  lang,
  selectedCommuneId,
  onSelectCommune,
  currentCrop,
  onChangeCrop,
  scenario,
  onChangeScenario,
  selectedFollowUpId,
  onSelectFollowUp,
}) => {
  const t = TRANSLATIONS[lang];
  const options = getRotationOptions(currentCrop, selectedCommuneId, scenario);
  const activeOption = options.find((o) => o.id === selectedFollowUpId) || options[0];

  const impactMetrics = [
    {
      id: 'nitrogen',
      icon: FlaskConical,
      title: t.impactNitrogen,
      subtitle: t.impactNitrogenSub,
      baselinePct: Math.min(100, Math.round((activeOption.baselineNitrogen / 50) * 100)),
      recommendedPct: Math.min(100, Math.round((activeOption.nitrogenGainKgHa / 50) * 100)),
      baselineVal: `${activeOption.baselineNitrogen} kg N/ha`,
      recommendedVal: `${activeOption.nitrogenGainKgHa} kg N/ha`,
    },
    {
      id: 'water',
      icon: Droplet,
      title: t.impactWater,
      subtitle: t.impactWaterSub,
      baselinePct: Math.min(100, Math.round((activeOption.baselineWaterMm / 65) * 100)),
      recommendedPct: Math.min(100, Math.round((activeOption.waterSavedMm / 65) * 100)),
      baselineVal: `${activeOption.baselineWaterMm} mm`,
      recommendedVal: `${activeOption.waterSavedMm} mm`,
    },
    {
      id: 'heat',
      icon: Flame,
      title: t.impactHeat,
      subtitle: t.impactHeatSub,
      baselinePct: activeOption.baselineHeat,
      recommendedPct: activeOption.heatResilience,
      baselineVal: `${activeOption.baselineHeat}/100`,
      recommendedVal: `${activeOption.heatResilience}/100`,
    },
    {
      id: 'humidity',
      icon: ShieldCheck,
      title: t.impactHumidity,
      subtitle: t.impactHumiditySub,
      baselinePct: activeOption.baselineHumidity,
      recommendedPct: activeOption.humidityResilience,
      baselineVal: `${activeOption.baselineHumidity}/100`,
      recommendedVal: `${activeOption.humidityResilience}/100`,
    },
  ];

  return (
    <>
      {/* Section 03: Rotation Planner */}
      <section id="rotation-planner" className="border-b border-[#E2DDD2] bg-[#FAF8F4] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
                {t.sec03Eyebrow}
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
                {t.sec03Title}
              </h2>
              <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
                {t.sec03Desc}
              </p>
              <p className="mt-4 inline-block rounded-md bg-[#EAE5D7] px-3 py-1.5 text-xs font-semibold text-[#1B4332]">
                {t.estimateMode}
              </p>
            </div>

            {/* Right Interactive Planner */}
            <div className="lg:col-span-8 space-y-5">
              {/* 3 Interactive Dropdown Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label
                    htmlFor="current-crop-select"
                    className="block text-xs font-semibold text-[#526058] mb-1.5"
                  >
                    {t.currentCropLabel}
                  </label>
                  <select
                    id="current-crop-select"
                    value={currentCrop}
                    onChange={(e) => onChangeCrop(e.target.value as CropId)}
                    className="w-full min-h-[44px] rounded-xl border border-[#D4CEC0] bg-white px-3.5 py-2 text-sm font-semibold text-[#1A261F] focus:outline-2 focus:outline-[#1B4332] cursor-pointer"
                  >
                    {(Object.keys(CROP_LABELS) as CropId[]).map((cropKey) => (
                      <option key={cropKey} value={cropKey}>
                        {CROP_LABELS[cropKey][lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="zone-rotation-select"
                    className="block text-xs font-semibold text-[#526058] mb-1.5"
                  >
                    {t.zoneLabel}
                  </label>
                  <select
                    id="zone-rotation-select"
                    value={selectedCommuneId}
                    onChange={(e) => onSelectCommune(e.target.value as CommuneId)}
                    className="w-full min-h-[44px] rounded-xl border border-[#D4CEC0] bg-white px-3.5 py-2 text-sm font-semibold text-[#1A261F] focus:outline-2 focus:outline-[#1B4332] cursor-pointer"
                  >
                    {COMMUNES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.profileName[lang]} ({c.name[lang]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="scenario-select"
                    className="block text-xs font-semibold text-[#526058] mb-1.5"
                  >
                    {t.scenarioLabel}
                  </label>
                  <select
                    id="scenario-select"
                    value={scenario}
                    onChange={(e) => onChangeScenario(e.target.value as ScenarioId)}
                    className="w-full min-h-[44px] rounded-xl border border-[#D4CEC0] bg-white px-3.5 py-2 text-sm font-semibold text-[#1A261F] focus:outline-2 focus:outline-[#1B4332] cursor-pointer"
                  >
                    {(['two-year', 'three-year'] as ScenarioId[]).map((sc) => (
                      <option key={sc} value={sc}>
                        {t.scenarios[sc]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3 Clickable Candidate Follow-Up Crop Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {options.map((opt) => {
                  const isActive = opt.id === activeOption.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectFollowUp(opt.id)}
                      aria-pressed={isActive}
                      className={`flex flex-col justify-between gap-2.5 rounded-xl border p-4 text-start transition-colors min-h-[92px] cursor-pointer ${
                        isActive
                          ? 'border-[#1B4332] bg-white ring-1 ring-[#1B4332]'
                          : 'border-[#E2DDD2] bg-white/75 hover:bg-white hover:border-[#B9B1A0]'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#1A261F] font-display">
                          {opt.name[lang]}
                        </span>
                        {isActive && (
                          <Check className="w-4 h-4 text-[#1B4332] shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      <StatusBadge status={opt.status} lang={lang} variant="short" />
                    </button>
                  );
                })}
              </div>

              {/* Deep Evergreen Summary Recommendation Panel */}
              <div className="rounded-2xl bg-[#132A20] text-[#FAF8F4] overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#264638]">
                  <div className="p-5 col-span-2 sm:col-span-1">
                    <div className="text-xs text-[#A7D7B8] font-medium">
                      {t.recommendedFollowUp}
                    </div>
                    <div className="mt-2 text-xl font-bold font-display">
                      {activeOption.name[lang]}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-[#A7D7B8] font-medium">{t.nitrogenGain}</div>
                    <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
                      {activeOption.nitrogenGainKgHa}
                    </div>
                    <div className="mt-0.5 text-xs text-[#CBE0D2] font-mono">kg N/ha</div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-[#A7D7B8] font-medium">{t.waterSaved}</div>
                    <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
                      {activeOption.waterSavedM3Ha}
                    </div>
                    <div className="mt-0.5 text-xs text-[#CBE0D2] font-mono">m³/ha</div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-[#A7D7B8] font-medium">{t.resilienceScore}</div>
                    <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
                      {activeOption.resilienceScore}
                    </div>
                    <div className="mt-0.5 text-xs text-[#CBE0D2] font-mono">/ 100</div>
                  </div>
                </div>

                <div className="border-t border-[#264638] bg-[#0F2119] px-5 py-3 text-xs text-[#CBE0D2]">
                  {activeOption.rationale[lang]}
                </div>
              </div>

              <p className="text-xs text-[#526058] font-mono">{t.rotationFormula}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Rotation Impact at a Glance */}
      <section className="border-b border-[#E2DDD2] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              {t.sec04Eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
              {t.sec04Title}
            </h2>
            <p className="mt-2.5 text-base text-[#4A5850]">{t.sec04Desc}</p>
          </div>

          {/* 4 Metric Pillars */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.id} className="space-y-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2DDD2] bg-[#FAF8F4] text-[#1B4332]">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A261F] font-display">{m.title}</h3>
                  <p className="text-sm text-[#4A5850] leading-relaxed">{m.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Comparative Horizontal Bar Matrix */}
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E2DDD2] bg-[#FAF8F4] p-5 sm:p-6">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-5 gap-4 pb-3 border-b border-[#DED8CA] text-xs font-semibold text-[#526058]">
                <div className="uppercase tracking-wider">{t.currentPractice} vs.</div>
                {impactMetrics.map((m) => (
                  <div key={m.id}>{m.title}</div>
                ))}
              </div>

              {/* Row 1: Current Practice */}
              <div className="grid grid-cols-5 gap-4 py-4 border-b border-[#ECE7DC] items-center">
                <div className="text-sm font-semibold text-[#3F4D45]">{t.currentPractice}</div>
                {impactMetrics.map((m) => (
                  <div key={m.id} className="space-y-1.5">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2DDD2]">
                      <div
                        className="h-full rounded-full bg-[#334139] transition-all duration-300"
                        style={{ width: `${m.baselinePct}%` }}
                      />
                    </div>
                    <div className="text-xs font-mono tabular-nums text-[#526058]">
                      {m.baselineVal}
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Recommended Rotation */}
              <div className="grid grid-cols-5 gap-4 pt-4 items-center">
                <div className="text-sm font-bold text-[#1B4332]">{t.recommendedRotation}</div>
                {impactMetrics.map((m) => (
                  <div key={m.id} className="space-y-1.5">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2DDD2]">
                      <div
                        className="h-full rounded-full bg-[#40916C] transition-all duration-300"
                        style={{ width: `${m.recommendedPct}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold font-mono tabular-nums text-[#15803D]">
                      {m.recommendedVal}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-[#E2DDD2] pt-3.5 text-xs font-medium text-[#526058]">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-5 rounded-full bg-[#334139]" aria-hidden="true" />
                {t.currentPractice}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-5 rounded-full bg-[#40916C]" aria-hidden="true" />
                {t.recommendedRotation} ({activeOption.name[lang]})
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

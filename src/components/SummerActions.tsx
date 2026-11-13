import React, { useState } from 'react';
import { CheckSquare, Droplets, Square } from 'lucide-react';
import { COMMUNES, SUMMER_GUIDANCE } from '../data/agroData';
import { TRANSLATIONS } from '../i18n/translations';
import { CommuneId, Language, SummerCropId } from '../types/agro';

interface SummerActionsProps {
  lang: Language;
  selectedCommuneId: CommuneId;
  summerCrop: SummerCropId;
  onChangeSummerCrop: (crop: SummerCropId) => void;
  checklist: Record<'zone' | 'stage' | 'moisture' | 'night', boolean>;
  onToggleChecklist: (key: 'zone' | 'stage' | 'moisture' | 'night') => void;
}

export const SummerActions: React.FC<SummerActionsProps> = ({
  lang,
  selectedCommuneId,
  summerCrop,
  onChangeSummerCrop,
  checklist,
  onToggleChecklist,
}) => {
  const t = TRANSLATIONS[lang];
  const [imgError, setImgError] = useState(false);

  const commune = COMMUNES.find((c) => c.id === selectedCommuneId) || COMMUNES[0];
  const guidance = SUMMER_GUIDANCE[summerCrop];

  // Adjust water demand score dynamically by commune aridity
  const zoneModifier =
    selectedCommuneId === 'ain-oulmene'
      ? 10
      : selectedCommuneId === 'el-eulma'
        ? 5
        : selectedCommuneId === 'bougaa'
          ? -12
          : 0;
  const demandPct = Math.min(98, Math.max(18, guidance.demandLevel + zoneModifier));

  const checklistKeys: ('zone' | 'stage' | 'moisture' | 'night')[] = [
    'zone',
    'stage',
    'moisture',
    'night',
  ];

  return (
    <section className="border-b border-[#E2DDD2] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Field Irrigation Documentary Image */}
          <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-[#E2DDD2] bg-[#EAE5D7] min-h-[280px]">
            {!imgError ? (
              <img
                src="/src/assets/images/field_drip_irrigation_1794597704411.jpg"
                alt="Farmers checking drip irrigation lines along potato crop rows in Setif"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-[#FAF8F4]">
                <Droplets className="w-10 h-10 mb-3" />
                <p className="text-sm font-semibold">{t.sec06Title}</p>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Crop Selector + Water Drop Gauge + Checklist */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
                {t.sec06Eyebrow}
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
                {t.sec06Title}
              </h2>
              <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
                {t.sec06Desc}
              </p>

              {/* Crop Selector + Water-Drop Visual */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label
                    htmlFor="summer-crop-select"
                    className="block text-xs font-semibold text-[#526058] mb-1.5"
                  >
                    {t.cropLabel}
                  </label>
                  <select
                    id="summer-crop-select"
                    value={summerCrop}
                    onChange={(e) => onChangeSummerCrop(e.target.value as SummerCropId)}
                    className="w-full min-h-[44px] rounded-xl border border-[#D4CEC0] bg-[#FAF8F4] px-3.5 py-2 text-sm font-semibold text-[#1A261F] focus:outline-2 focus:outline-[#1B4332] cursor-pointer"
                  >
                    {(Object.keys(SUMMER_GUIDANCE) as SummerCropId[]).map((cropKey) => (
                      <option key={cropKey} value={cropKey}>
                        {SUMMER_GUIDANCE[cropKey].cropName[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Water-Drop Demand Visual */}
                <div className="flex items-center gap-3.5 rounded-xl border border-[#E2DDD2] bg-[#FAF8F4] px-4 py-2.5">
                  <svg
                    viewBox="0 0 36 44"
                    className="w-8 h-10 shrink-0"
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath id="drop-clip">
                        <path d="M18 3C18 3 4 19 4 29a14 14 0 0 0 28 0C32 19 18 3 18 3z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M18 3C18 3 4 19 4 29a14 14 0 0 0 28 0C32 19 18 3 18 3z"
                      fill="#EAE5D7"
                      stroke="#1B4332"
                      strokeWidth="2"
                    />
                    <rect
                      x="0"
                      y={44 - (demandPct / 100) * 41}
                      width="36"
                      height="44"
                      fill={demandPct > 75 ? '#C2410C' : '#2D6A4F'}
                      clipPath="url(#drop-clip)"
                    />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#3F4D45]">
                      <span className="truncate">{t.waterDemandLabel}</span>
                      <span className="font-mono tabular-nums text-[#1B4332]">{demandPct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E2DDD2]">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ${
                          demandPct > 75 ? 'bg-[#C2410C]' : 'bg-[#2D6A4F]'
                        }`}
                        style={{ width: `${demandPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Action Box */}
              <div className="mt-5 rounded-xl border border-[#D4CEC0] bg-[#FAF8F4] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#1B4332] mb-2">
                  <span>
                    {commune.name[lang]} · {guidance.cropName[lang]}
                  </span>
                  <span className="font-mono">{guidance.windowBadge[lang]}</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#1A261F] leading-relaxed">
                  {guidance.action[lang]}
                </p>
              </div>

              {/* Interactive 4-Item Field Checklist */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {checklistKeys.map((key) => {
                  const checked = checklist[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onToggleChecklist(key)}
                      aria-pressed={checked}
                      className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-start text-sm font-medium transition-colors min-h-[44px] cursor-pointer ${
                        checked
                          ? 'border-[#1B4332] bg-[#ECFDF5] text-[#15803D]'
                          : 'border-[#E2DDD2] bg-white text-[#3F4D45] hover:bg-[#FAF8F4]'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 shrink-0 text-[#8A9488]" aria-hidden="true" />
                      )}
                      <span>{t.checklistItems[key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-5 text-xs text-[#526058]">{t.summerFootnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

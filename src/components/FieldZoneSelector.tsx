import React, { useState } from 'react';
import { Check, MapPin, PenTool, RotateCcw, Trash2 } from 'lucide-react';
import { COMMUNES } from '../data/agroData';
import { TRANSLATIONS, STATUS_LABELS } from '../i18n/translations';
import { CommuneId, CustomParcel, Language, ParcelPoint } from '../types/agro';
import { StatusBadge } from './StatusBadge';

interface FieldZoneSelectorProps {
  lang: Language;
  selectedCommuneId: CommuneId;
  onSelectCommune: (id: CommuneId) => void;
  customParcel: CustomParcel | null;
  onSaveParcel: (parcel: CustomParcel | null) => void;
}

function computePolygonAreaHectares(points: ParcelPoint[]): number {
  if (points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  const pxArea = Math.abs(area) / 2;
  // Scale SVG units to representative Sétif field parcel hectares (1.5 ha – 65 ha)
  return Math.max(1.4, Number((pxArea / 220).toFixed(1)));
}

function findNearestCommune(points: ParcelPoint[]): {
  communeId: CommuneId;
  lat: number;
  lon: number;
} {
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  let closest = COMMUNES[0];
  let bestDist = Infinity;
  for (const c of COMMUNES) {
    const dx = c.svgPos.x - cx;
    const dy = c.svgPos.y - cy;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      closest = c;
    }
  }

  // Approximate Sétif wilaya lat/lon projection from SVG canvas
  const lat = Number((36.44 - (cy / 340) * 0.62).toFixed(2));
  const lon = Number((4.92 + (cx / 480) * 1.05).toFixed(2));
  return { communeId: closest.id, lat, lon };
}

export const FieldZoneSelector: React.FC<FieldZoneSelectorProps> = ({
  lang,
  selectedCommuneId,
  onSelectCommune,
  customParcel,
  onSaveParcel,
}) => {
  const t = TRANSLATIONS[lang];
  const [isDrawing, setIsDrawing] = useState(false);
  const [draftPoints, setDraftPoints] = useState<ParcelPoint[]>([]);

  const activeCommune =
    COMMUNES.find((c) => c.id === (customParcel ? customParcel.nearestCommuneId : selectedCommuneId)) ||
    COMMUNES[0];

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 480);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 340);
    setDraftPoints((prev) => [...prev, { x, y }]);
  };

  const handleStartDraw = () => {
    setDraftPoints([]);
    setIsDrawing(true);
  };

  const handleFinishDraw = () => {
    if (draftPoints.length < 3) return;
    const areaHectares = computePolygonAreaHectares(draftPoints);
    const { communeId, lat, lon } = findNearestCommune(draftPoints);
    onSaveParcel({
      points: draftPoints,
      areaHectares,
      centroidLat: lat,
      centroidLon: lon,
      nearestCommuneId: communeId,
    });
    onSelectCommune(communeId);
    setIsDrawing(false);
  };

  const handleClearParcel = () => {
    setDraftPoints([]);
    setIsDrawing(false);
    onSaveParcel(null);
  };

  const statusColors = {
    optimal: { dot: '#15803D', ring: '#86EFAC' },
    vigilance: { dot: '#C2410C', ring: '#FDBA74' },
    alert: { dot: '#B91C1C', ring: '#FCA5A5' },
  };

  return (
    <section id="zone-selector" className="border-b border-[#E2DDD2] bg-[#FAF8F4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Title, Instructions, 4 Commune Selectors */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              {t.sec01Eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1A261F] font-display">
              {t.sec01Title}
            </h2>
            <p className="mt-3 text-base text-[#4A5850] leading-relaxed">
              {t.sec01Desc}
            </p>

            {/* 4 Interactive Commune Selector Buttons */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMMUNES.map((commune) => {
                const isSelected = !customParcel && selectedCommuneId === commune.id;
                const sc = statusColors[commune.status];
                return (
                  <button
                    key={commune.id}
                    type="button"
                    onClick={() => {
                      onSaveParcel(null);
                      setIsDrawing(false);
                      onSelectCommune(commune.id);
                    }}
                    className={`group flex flex-col items-start justify-between gap-2 rounded-xl border p-4 text-start transition-colors min-h-[88px] cursor-pointer ${
                      isSelected
                        ? 'border-[#1B4332] bg-[#1B4332] text-[#FAF8F4]'
                        : 'border-[#E2DDD2] bg-white text-[#1A261F] hover:border-[#2D6A4F]/60 hover:bg-[#F2EFE7]/70'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-base font-bold font-display">
                        {commune.name[lang]}
                      </span>
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: isSelected ? '#A7D7B8' : sc.dot }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-xs font-medium opacity-85">
                      {commune.profileName[lang]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-medium text-[#4A5850]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]" aria-hidden="true" />
                {STATUS_LABELS.optimal[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C2410C]" aria-hidden="true" />
                {STATUS_LABELS.vigilance[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B91C1C]" aria-hidden="true" />
                {STATUS_LABELS.alert[lang]}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Sétif Map + Diagnostic Readout */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Map Canvas */}
            <div className="md:col-span-7 rounded-2xl border border-[#E2DDD2] bg-[#F2EFE7] p-3 flex flex-col justify-between">
              <div className="relative overflow-hidden rounded-xl border border-[#D8D2C5] bg-[#EAE5D7]">
                <svg
                  viewBox="0 0 480 340"
                  onClick={handleSvgClick}
                  className={`w-full h-auto block select-none ${
                    isDrawing ? 'cursor-crosshair' : 'cursor-default'
                  }`}
                  role="img"
                  aria-label="Interactive agro-climatic map of Setif communes"
                >
                  {/* Agro-Climatic Terrain Regions */}
                  {/* Humid Mountainous North (Bougaa) */}
                  <path
                    d="M0,0 L285,0 L250,115 L155,155 L0,130 Z"
                    fill="#D4E2D1"
                    stroke="#C5D4C2"
                    strokeWidth="1"
                  />
                  {/* Dry Rainfed East (El Eulma) */}
                  <path
                    d="M285,0 L480,0 L480,175 L315,175 L250,115 Z"
                    fill="#EAE2CE"
                    stroke="#D8D0BB"
                    strokeWidth="1"
                  />
                  {/* Cereal Plain Center-East (Bir El Arch) */}
                  <path
                    d="M250,115 L315,175 L480,175 L480,340 L245,340 L225,210 Z"
                    fill="#E2EAD9"
                    stroke="#CFD9C5"
                    strokeWidth="1"
                  />
                  {/* Semi-Arid Steppe South-West (Ain Oulmene) */}
                  <path
                    d="M0,130 L155,155 L250,115 L225,210 L245,340 L0,340 Z"
                    fill="#F2E4CE"
                    stroke="#E1D1B8"
                    strokeWidth="1"
                  />

                  {/* Subtle Lat/Lon Grid */}
                  <g stroke="#8A9488" strokeOpacity="0.18" strokeDasharray="3 4" strokeWidth="1">
                    <line x1="0" y1="85" x2="480" y2="85" />
                    <line x1="0" y1="170" x2="480" y2="170" />
                    <line x1="0" y1="255" x2="480" y2="255" />
                    <line x1="120" y1="0" x2="120" y2="340" />
                    <line x1="240" y1="0" x2="240" y2="340" />
                    <line x1="360" y1="0" x2="360" y2="340" />
                  </g>

                  {/* Connector lines from Sétif center */}
                  <g stroke="#64746B" strokeOpacity="0.45" strokeDasharray="4 4" strokeWidth="1.2">
                    {COMMUNES.map((c) => (
                      <line key={c.id} x1="235" y1="158" x2={c.svgPos.x} y2={c.svgPos.y} />
                    ))}
                  </g>

                  {/* Sétif Reference Point */}
                  <g transform="translate(235, 158)">
                    <rect
                      x="-54"
                      y="-13"
                      width="108"
                      height="26"
                      rx="6"
                      fill="#FAF8F4"
                      stroke="#C9C2B3"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#1A261F"
                      fontSize="11"
                      fontWeight="600"
                    >
                      Sétif, Algeria
                    </text>
                  </g>

                  {/* Saved Custom Parcel Polygon */}
                  {customParcel && customParcel.points.length >= 3 && (
                    <polygon
                      points={customParcel.points.map((p) => `${p.x},${p.y}`).join(' ')}
                      fill="#1B4332"
                      fillOpacity="0.28"
                      stroke="#1B4332"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Active Draft Parcel */}
                  {isDrawing && draftPoints.length > 0 && (
                    <g>
                      {draftPoints.length >= 2 && (
                        <polygon
                          points={draftPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                          fill="#2D6A4F"
                          fillOpacity="0.2"
                          stroke="#1B4332"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                        />
                      )}
                      {draftPoints.map((pt, idx) => (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r="5"
                          fill="#FAF8F4"
                          stroke="#1B4332"
                          strokeWidth="2.5"
                        />
                      ))}
                    </g>
                  )}

                  {/* 4 Clickable Commune Nodes */}
                  {COMMUNES.map((commune) => {
                    const isSelected = !customParcel && selectedCommuneId === commune.id;
                    const sc = statusColors[commune.status];
                    const pillW = Math.max(96, commune.name[lang].length * 8 + 34);
                    return (
                      <g
                        key={commune.id}
                        transform={`translate(${commune.svgPos.x}, ${commune.svgPos.y})`}
                        onClick={(e) => {
                          if (isDrawing) return;
                          e.stopPropagation();
                          onSaveParcel(null);
                          onSelectCommune(commune.id);
                        }}
                        className={isDrawing ? 'pointer-events-none opacity-65' : 'cursor-pointer'}
                        role="button"
                        tabIndex={0}
                        aria-label={`${commune.name[lang]} - ${commune.profileName[lang]}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSaveParcel(null);
                            onSelectCommune(commune.id);
                          }
                        }}
                      >
                        {isSelected && (
                          <rect
                            x={-pillW / 2 - 4}
                            y="-20"
                            width={pillW + 8}
                            height="40"
                            rx="11"
                            fill="none"
                            stroke="#1B4332"
                            strokeWidth="2"
                            strokeOpacity="0.35"
                          />
                        )}
                        <rect
                          x={-pillW / 2}
                          y="-16"
                          width={pillW}
                          height="32"
                          rx="8"
                          fill={isSelected ? '#1B4332' : '#FAF8F4'}
                          stroke={isSelected ? '#1B4332' : '#B9B1A0'}
                          strokeWidth="1.2"
                        />
                        <circle
                          cx={-pillW / 2 + 15}
                          cy="0"
                          r="5"
                          fill={sc.dot}
                          stroke={isSelected ? '#FAF8F4' : '#FAF8F4'}
                          strokeWidth="1.5"
                        />
                        <text
                          x={6}
                          y="4"
                          textAnchor="middle"
                          fill={isSelected ? '#FAF8F4' : '#1A261F'}
                          fontSize="12"
                          fontWeight="600"
                        >
                          {commune.name[lang]}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {isDrawing && (
                  <div className="bg-[#1B4332] px-3 py-2 text-xs font-medium text-[#FAF8F4] flex items-center justify-between gap-2">
                    <span>{t.drawingHint}</span>
                    <span className="font-mono tabular-nums shrink-0">
                      {draftPoints.length} pts
                    </span>
                  </div>
                )}
              </div>

              {/* Coordinates strip below map */}
              <div className="mt-2.5 flex items-center justify-between px-1 text-xs text-[#526058] font-mono tabular-nums">
                <span>
                  {customParcel
                    ? `${customParcel.centroidLat}° N, ${customParcel.centroidLon}° E`
                    : `${activeCommune.coords.lat}° N, ${activeCommune.coords.lon}° E`}
                </span>
                <span>
                  {activeCommune.elevationM} m · {activeCommune.annualRainfallMm} mm/yr
                </span>
              </div>
            </div>

            {/* Selected Zone Diagnostic Card */}
            <div className="md:col-span-5 rounded-2xl border border-[#E2DDD2] bg-white p-5 sm:p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#526058]">
                    {t.selectedZoneLabel}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xl font-bold text-[#1A261F] font-display">
                    <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0" aria-hidden="true" />
                    <span>
                      {customParcel ? t.customParcelName : activeCommune.name[lang]}
                    </span>
                  </div>
                  {customParcel && (
                    <p className="mt-1 text-xs text-[#526058]">
                      {t.nearestProfileNote}: {activeCommune.name[lang]} ·{' '}
                      <span className="font-mono tabular-nums">
                        {customParcel.areaHectares} {t.hectaresUnit}
                      </span>
                    </p>
                  )}
                </div>

                <div className="border-t border-[#ECE7DC] pt-3.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#526058]">
                    {t.agroProfileLabel}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#1A261F]">
                    {activeCommune.profileName[lang]}
                  </div>
                </div>

                <div className="border-t border-[#ECE7DC] pt-3.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#526058]">
                    {t.demoDiagnosticLabel}
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={activeCommune.status} lang={lang} />
                  </div>
                  <p className="mt-2.5 text-xs text-[#4A5850] leading-relaxed">
                    {activeCommune.summaryNote[lang]}
                  </p>
                </div>
              </div>

              {/* Draw a parcel interactive controls */}
              <div className="mt-6 border-t border-[#ECE7DC] pt-4 space-y-2">
                {!isDrawing ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleStartDraw}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#1B4332] bg-[#FAF8F4] px-4 py-2.5 text-sm font-semibold text-[#1B4332] hover:bg-[#1B4332] hover:text-[#FAF8F4] transition-colors min-h-[44px] whitespace-nowrap cursor-pointer"
                    >
                      <PenTool className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.drawParcelBtn}</span>
                    </button>
                    {customParcel && (
                      <button
                        type="button"
                        onClick={handleClearParcel}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D4CEC0] bg-white px-3 py-2.5 text-xs font-semibold text-[#526058] hover:bg-[#F2EFE7] min-h-[44px] cursor-pointer"
                        aria-label={t.clearParcelBtn}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={draftPoints.length < 3}
                      onClick={handleFinishDraw}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1B4332] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#2D6A4F] disabled:opacity-45 disabled:cursor-not-allowed min-h-[44px] cursor-pointer"
                    >
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.finishParcelBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleClearParcel}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D4CEC0] bg-white px-3 py-2.5 text-xs font-semibold text-[#526058] hover:bg-[#F2EFE7] min-h-[44px] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{t.clearParcelBtn}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

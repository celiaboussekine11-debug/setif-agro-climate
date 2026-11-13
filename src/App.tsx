import { useEffect, useState } from 'react';
import { Compass, Layers, BellRing, Thermometer } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FieldZoneSelector } from './components/FieldZoneSelector';
import { ClimateSignals } from './components/ClimateSignals';
import { RotationPlanner } from './components/RotationPlanner';
import { SeasonalAlerts } from './components/SeasonalAlerts';
import { SummerActions } from './components/SummerActions';
import { FieldConditionsAndMethodology } from './components/FieldConditionsAndMethodology';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TRANSLATIONS } from './i18n/translations';
import {
  CommuneId,
  CropId,
  CustomParcel,
  DateRangeId,
  Language,
  ScenarioId,
  SummerCropId,
} from './types/agro';

const STORAGE_KEY = 'setif-agro-climate-state-v1';

interface PersistedState {
  lang: Language;
  selectedCommuneId: CommuneId;
  customParcel: CustomParcel | null;
  dateRange: DateRangeId;
  currentCrop: CropId;
  scenario: ScenarioId;
  selectedFollowUpId: string;
  summerCrop: SummerCropId;
  checklist: Record<'zone' | 'stage' | 'moisture' | 'night', boolean>;
  lastCachedAt: string;
}

function loadInitialState(): PersistedState {
  const fallback: PersistedState = {
    lang: 'en',
    selectedCommuneId: 'el-eulma',
    customParcel: null,
    dateRange: 'recent',
    currentCrop: 'durum-wheat',
    scenario: 'two-year',
    selectedFollowUpId: 'chickpea',
    summerCrop: 'potato',
    checklist: {
      zone: true,
      stage: false,
      moisture: false,
      night: false,
    },
    lastCachedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export default function App() {
  const initial = loadInitialState();

  const [lang, setLang] = useState<Language>(initial.lang);
  const [selectedCommuneId, setSelectedCommuneId] = useState<CommuneId>(
    initial.selectedCommuneId
  );
  const [customParcel, setCustomParcel] = useState<CustomParcel | null>(initial.customParcel);
  const [dateRange, setDateRange] = useState<DateRangeId>(initial.dateRange);
  const [currentCrop, setCurrentCrop] = useState<CropId>(initial.currentCrop);
  const [scenario, setScenario] = useState<ScenarioId>(initial.scenario);
  const [selectedFollowUpId, setSelectedFollowUpId] = useState<string>(
    initial.selectedFollowUpId
  );
  const [summerCrop, setSummerCrop] = useState<SummerCropId>(initial.summerCrop);
  const [checklist, setChecklist] = useState(initial.checklist);
  const [lastCachedAt, setLastCachedAt] = useState<string>(initial.lastCachedAt);

  // Sync HTML dir and lang attributes for Arabic RTL vs Latin LTR
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Persist field decisions locally for offline resilience
  useEffect(() => {
    const stateToSave: PersistedState = {
      lang,
      selectedCommuneId,
      customParcel,
      dateRange,
      currentCrop,
      scenario,
      selectedFollowUpId,
      summerCrop,
      checklist,
      lastCachedAt,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore quota errors cleanly
    }
  }, [
    lang,
    selectedCommuneId,
    customParcel,
    dateRange,
    currentCrop,
    scenario,
    selectedFollowUpId,
    summerCrop,
    checklist,
    lastCachedAt,
  ]);

  const handleToggleChecklist = (key: 'zone' | 'stage' | 'moisture' | 'night') => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSyncOffline = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastCachedAt(now);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A261F]">
      <Header lang={lang} onChangeLang={setLang} />

      <main>
        <HeroSection lang={lang} />

        <FieldZoneSelector
          lang={lang}
          selectedCommuneId={selectedCommuneId}
          onSelectCommune={setSelectedCommuneId}
          customParcel={customParcel}
          onSaveParcel={setCustomParcel}
        />

        <ClimateSignals
          lang={lang}
          selectedCommuneId={selectedCommuneId}
          customParcel={customParcel}
          dateRange={dateRange}
          onChangeDateRange={setDateRange}
        />

        <RotationPlanner
          lang={lang}
          selectedCommuneId={selectedCommuneId}
          onSelectCommune={setSelectedCommuneId}
          currentCrop={currentCrop}
          onChangeCrop={setCurrentCrop}
          scenario={scenario}
          onChangeScenario={setScenario}
          selectedFollowUpId={selectedFollowUpId}
          onSelectFollowUp={setSelectedFollowUpId}
        />

        <SeasonalAlerts lang={lang} />

        <SummerActions
          lang={lang}
          selectedCommuneId={selectedCommuneId}
          summerCrop={summerCrop}
          onChangeSummerCrop={setSummerCrop}
          checklist={checklist}
          onToggleChecklist={handleToggleChecklist}
        />

        <FieldConditionsAndMethodology
          lang={lang}
          onChangeLang={setLang}
          selectedCommuneId={selectedCommuneId}
          summerCrop={summerCrop}
          lastCachedAt={lastCachedAt}
          onSyncOffline={handleSyncOffline}
        />
      </main>

      {/* Mobile Bottom Thumb Navigation (<= 15% mobile viewport cap) */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#D4CEC0] bg-[#FAF8F4]/95 backdrop-blur-md lg:hidden"
      >
        <div className="grid grid-cols-4 h-14 items-center text-center">
          <a
            href="#zone-selector"
            className="flex flex-col items-center justify-center gap-0.5 text-[#1B4332] min-h-[44px]"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span className="text-[11px] font-semibold truncate max-w-[76px]">{t.navZone}</span>
          </a>
          <a
            href="#climate-signals"
            className="flex flex-col items-center justify-center gap-0.5 text-[#3F4D45] min-h-[44px]"
          >
            <Thermometer className="w-4 h-4" aria-hidden="true" />
            <span className="text-[11px] font-semibold truncate max-w-[76px]">{t.navSignals}</span>
          </a>
          <a
            href="#rotation-planner"
            className="flex flex-col items-center justify-center gap-0.5 text-[#3F4D45] min-h-[44px]"
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span className="text-[11px] font-semibold truncate max-w-[76px]">{t.navRotation}</span>
          </a>
          <a
            href="#seasonal-alerts"
            className="flex flex-col items-center justify-center gap-0.5 text-[#3F4D45] min-h-[44px]"
          >
            <BellRing className="w-4 h-4" aria-hidden="true" />
            <span className="text-[11px] font-semibold truncate max-w-[76px]">{t.navAlerts}</span>
          </a>
        </div>
      </nav>

      <OfflineIndicator lang={lang} />
    </div>
  );
}

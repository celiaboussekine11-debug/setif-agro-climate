export type Language = 'en' | 'fr' | 'ar';

export type CommuneId = 'el-eulma' | 'ain-oulmene' | 'bougaa' | 'bir-el-arch';

export type StatusLevel = 'optimal' | 'vigilance' | 'alert';

export type DateRangeId = 'recent' | '7d' | '30d' | 'spring-peak';

export type CropId = 'durum-wheat' | 'barley' | 'potato' | 'chickpea' | 'fallow';

export type SummerCropId = 'potato' | 'durum-wheat' | 'chickpea' | 'olive' | 'tomato';

export type ScenarioId = 'two-year' | 'three-year';

export type AlertCategory = 'all' | 'sowing' | 'frost' | 'heat';

export type SeasonMonth = 'march' | 'april' | 'may' | 'autumn';

export interface SignalReading {
  temperatureC: number;
  pressureKpa: number;
  humidityPct: number;
}

export interface CommuneData {
  id: CommuneId;
  name: Record<Language, string>;
  profileName: Record<Language, string>;
  status: StatusLevel;
  coords: { lat: number; lon: number };
  elevationM: number;
  annualRainfallMm: number;
  svgPos: { x: number; y: number };
  signals: Record<DateRangeId, SignalReading>;
  summaryNote: Record<Language, string>;
}

export interface FollowUpOption {
  id: string;
  name: Record<Language, string>;
  status: StatusLevel;
  nitrogenGainKgHa: number;
  waterSavedM3Ha: number;
  waterSavedMm: number;
  resilienceScore: number;
  heatResilience: number;
  humidityResilience: number;
  baselineNitrogen: number;
  baselineWaterMm: number;
  baselineHeat: number;
  baselineHumidity: number;
  rationale: Record<Language, string>;
}

export interface ParcelPoint {
  x: number;
  y: number;
}

export interface CustomParcel {
  points: ParcelPoint[];
  areaHectares: number;
  centroidLat: number;
  centroidLon: number;
  nearestCommuneId: CommuneId;
}

export interface AlertItem {
  id: string;
  category: Exclude<AlertCategory, 'all'>;
  months: SeasonMonth[];
  severity: 'green-light' | 'red-alert' | 'priority-alert';
  title: Record<Language, string>;
  condition: Record<Language, string>;
  action: Record<Language, string>;
  fieldNotes: Record<Language, string>;
}

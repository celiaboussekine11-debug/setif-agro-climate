import {
  AlertItem,
  CommuneData,
  CommuneId,
  CropId,
  FollowUpOption,
  Language,
  ScenarioId,
  StatusLevel,
  SummerCropId,
} from '../types/agro';

export const COMMUNES: CommuneData[] = [
  {
    id: 'el-eulma',
    name: {
      en: 'El Eulma',
      fr: 'El Eulma',
      ar: 'العلمة',
    },
    profileName: {
      en: 'Dry Rainfed Zone',
      fr: 'Zone pluviale sèche',
      ar: 'منطقة بعلية جافة',
    },
    status: 'vigilance',
    coords: { lat: 36.15, lon: 5.69 },
    elevationM: 945,
    annualRainfallMm: 365,
    svgPos: { x: 355, y: 122 },
    signals: {
      recent: { temperatureC: 22.8, pressureKpa: 91.1, humidityPct: 36 },
      '7d': { temperatureC: 23.4, pressureKpa: 90.9, humidityPct: 34 },
      '30d': { temperatureC: 19.6, pressureKpa: 91.3, humidityPct: 43 },
      'spring-peak': { temperatureC: 26.1, pressureKpa: 90.1, humidityPct: 28 },
    },
    summaryNote: {
      en: 'Low spring moisture retention; prioritize drought-tolerant legumes and morning soil checks.',
      fr: 'Rétention hydrique printanière modérée ; privilégier les légumineuses tolérantes au sec.',
      ar: 'احتفاظ محدود بالرطوبة الربيعية؛ يُنصح بالبقوليات المقاومة للجفاف وفحص التربة صباحاً.',
    },
  },
  {
    id: 'ain-oulmene',
    name: {
      en: 'Ain Oulmene',
      fr: 'Aïn Oulmène',
      ar: 'عين ولمان',
    },
    profileName: {
      en: 'Semi-Arid Steppe',
      fr: 'Steppe semi-aride',
      ar: 'سهوب شبه جافة',
    },
    status: 'alert',
    coords: { lat: 35.91, lon: 5.30 },
    elevationM: 918,
    annualRainfallMm: 270,
    svgPos: { x: 130, y: 278 },
    signals: {
      recent: { temperatureC: 26.4, pressureKpa: 90.0, humidityPct: 26 },
      '7d': { temperatureC: 27.1, pressureKpa: 89.9, humidityPct: 24 },
      '30d': { temperatureC: 23.8, pressureKpa: 90.4, humidityPct: 31 },
      'spring-peak': { temperatureC: 29.5, pressureKpa: 89.6, humidityPct: 19 },
    },
    summaryNote: {
      en: 'High evapotranspiration stress. Trigger night drip irrigation and mulch exposed rows.',
      fr: 'Stress évapotranspiratoire élevé. Activer l’irrigation goutte-à-goutte nocturne et le paillage.',
      ar: 'إجهاد تبخر عالٍ. فعّل الري بالتنقيط ليلاً وغطِّ الخطوط المكشوفة.',
    },
  },
  {
    id: 'bougaa',
    name: {
      en: 'Bougaa',
      fr: 'Bougaâ',
      ar: 'بوقاعة',
    },
    profileName: {
      en: 'Humid Mountainous',
      fr: 'Zone montagneuse humide',
      ar: 'منطقة جبلية رطبة',
    },
    status: 'optimal',
    coords: { lat: 36.33, lon: 5.09 },
    elevationM: 1085,
    annualRainfallMm: 610,
    svgPos: { x: 112, y: 74 },
    signals: {
      recent: { temperatureC: 16.2, pressureKpa: 91.9, humidityPct: 62 },
      '7d': { temperatureC: 15.8, pressureKpa: 91.7, humidityPct: 64 },
      '30d': { temperatureC: 14.5, pressureKpa: 91.8, humidityPct: 67 },
      'spring-peak': { temperatureC: 21.3, pressureKpa: 91.0, humidityPct: 49 },
    },
    summaryNote: {
      en: 'Favorable soil moisture and cool nights. Monitor late spring frosts in valley pockets.',
      fr: 'Humidité du sol favorable et nuits fraîches. Surveiller les gelées tardives de vallée.',
      ar: 'رطوبة تربة ملائمة وليالٍ باردة. راقب الصقيع الربيعي المتأخر في المنخفضات.',
    },
  },
  {
    id: 'bir-el-arch',
    name: {
      en: 'Bir El Arch',
      fr: 'Bir El Arch',
      ar: 'بئر العرش',
    },
    profileName: {
      en: 'Cereal Plain',
      fr: 'Plaine céréalière',
      ar: 'سهل الحبوب',
    },
    status: 'optimal',
    coords: { lat: 36.14, lon: 5.83 },
    elevationM: 925,
    annualRainfallMm: 430,
    svgPos: { x: 356, y: 224 },
    signals: {
      recent: { temperatureC: 18.4, pressureKpa: 91.4, humidityPct: 47 },
      '7d': { temperatureC: 19.1, pressureKpa: 91.2, humidityPct: 45 },
      '30d': { temperatureC: 17.6, pressureKpa: 91.5, humidityPct: 51 },
      'spring-peak': { temperatureC: 24.2, pressureKpa: 90.5, humidityPct: 35 },
    },
    summaryNote: {
      en: 'Balanced thermal window for durum wheat and chickpea rotations on deep clay-loam plains.',
      fr: 'Fenêtre thermique équilibrée pour blé dur et pois chiche sur sols argilo-limoneux.',
      ar: 'نافذة حرارية متوازنة لتناوب القمح الصلب والحمص في السهول الطينية.',
    },
  },
];

export function getTemperatureStatus(tempC: number): StatusLevel {
  if (tempC >= 25) return 'alert';
  if (tempC >= 21.5) return 'vigilance';
  return 'optimal';
}

export function getPressureStatus(pressureKpa: number): StatusLevel {
  if (pressureKpa <= 90.2) return 'alert';
  if (pressureKpa <= 91.0) return 'vigilance';
  return 'optimal';
}

export function getHumidityStatus(humidityPct: number): StatusLevel {
  if (humidityPct < 30) return 'alert';
  if (humidityPct < 42) return 'vigilance';
  return 'optimal';
}

export const CROP_LABELS: Record<CropId, Record<Language, string>> = {
  'durum-wheat': { en: 'Durum wheat', fr: 'Blé dur', ar: 'القمح الصلب' },
  barley: { en: 'Barley', fr: 'Orge', ar: 'الشعير' },
  potato: { en: 'Potato', fr: 'Pomme de terre', ar: 'البطاطس' },
  chickpea: { en: 'Chickpea', fr: 'Pois chiche', ar: 'الحمص' },
  fallow: { en: 'Worked fallow', fr: 'Jachère travaillée', ar: 'بور محروث' },
};

export function getRotationOptions(
  currentCrop: CropId,
  communeId: CommuneId,
  scenario: ScenarioId
): FollowUpOption[] {
  const isThreeYear = scenario === 'three-year';
  const zoneBonus =
    communeId === 'bougaa'
      ? 6
      : communeId === 'bir-el-arch'
        ? 4
        : communeId === 'el-eulma'
          ? 0
          : -5;
  const scenarioNBonus = isThreeYear ? 8 : 0;
  const scenarioWBonus = isThreeYear ? 65 : 0;

  if (currentCrop === 'durum-wheat' || currentCrop === 'barley') {
    return [
      {
        id: 'chickpea',
        name: { en: 'Chickpea', fr: 'Pois chiche', ar: 'الحمص' },
        status: communeId === 'ain-oulmene' ? 'vigilance' : 'optimal',
        nitrogenGainKgHa: 35 + scenarioNBonus,
        waterSavedM3Ha: 420 + scenarioWBonus,
        waterSavedMm: 42 + (isThreeYear ? 7 : 0),
        resilienceScore: Math.min(96, 78 + zoneBonus + (isThreeYear ? 4 : 0)),
        heatResilience: Math.min(95, 76 + zoneBonus),
        humidityResilience: Math.min(95, 74 + zoneBonus),
        baselineNitrogen: 14,
        baselineWaterMm: 16,
        baselineHeat: 44,
        baselineHumidity: 42,
        rationale: {
          en: 'Deep taproot legume fixes atmospheric nitrogen and breaks cereal disease cycles.',
          fr: 'Légumineuse à racine pivotante fixant l’azote et coupant les maladies des céréales.',
          ar: 'بقوليات ذات جذور عميقة تثبت الآزوت وتكسر دورة أمراض الحبوب.',
        },
      },
      {
        id: 'lentil',
        name: { en: 'Lentil', fr: 'Lentille', ar: 'العدس' },
        status: communeId === 'bougaa' ? 'optimal' : 'vigilance',
        nitrogenGainKgHa: 29 + scenarioNBonus,
        waterSavedM3Ha: 380 + scenarioWBonus,
        waterSavedMm: 38 + (isThreeYear ? 6 : 0),
        resilienceScore: Math.min(92, 72 + zoneBonus + (isThreeYear ? 3 : 0)),
        heatResilience: Math.min(92, 71 + zoneBonus),
        humidityResilience: Math.min(92, 69 + zoneBonus),
        baselineNitrogen: 14,
        baselineWaterMm: 16,
        baselineHeat: 44,
        baselineHumidity: 42,
        rationale: {
          en: 'Short-cycle legume well suited to Sétif spring windows; watch terminal heat.',
          fr: 'Cycle court adapté aux printemps sétifiens ; surveiller la chaleur de fin de cycle.',
          ar: 'دورة قصيرة ملائمة لربيع سطيف مع مراقبة الحرارة في نهاية النمو.',
        },
      },
      {
        id: 'vetch-oat',
        name: { en: 'Vetch-oat', fr: 'Vesce-avoine', ar: 'البيقية والشوفان' },
        status: communeId === 'ain-oulmene' ? 'alert' : 'vigilance',
        nitrogenGainKgHa: 24 + scenarioNBonus,
        waterSavedM3Ha: 310 + scenarioWBonus,
        waterSavedMm: 31 + (isThreeYear ? 5 : 0),
        resilienceScore: Math.min(89, 67 + zoneBonus + (isThreeYear ? 3 : 0)),
        heatResilience: Math.min(88, 66 + zoneBonus),
        humidityResilience: Math.min(88, 64 + zoneBonus),
        baselineNitrogen: 14,
        baselineWaterMm: 16,
        baselineHeat: 44,
        baselineHumidity: 42,
        rationale: {
          en: 'Dual forage-nitrogen mix; best harvested early before dry steppe winds.',
          fr: 'Mélange fourrager fixateur d’azote ; faucher tôt avant les vents secs.',
          ar: 'خليط علفي مثبت للآزوت؛ يُفضل حصاده مبكراً قبل الرياح الجافة.',
        },
      },
    ];
  }

  if (currentCrop === 'potato') {
    return [
      {
        id: 'durum-wheat',
        name: { en: 'Durum wheat', fr: 'Blé dur', ar: 'القمح الصلب' },
        status: communeId === 'ain-oulmene' ? 'vigilance' : 'optimal',
        nitrogenGainKgHa: 22 + scenarioNBonus,
        waterSavedM3Ha: 480 + scenarioWBonus,
        waterSavedMm: 48 + (isThreeYear ? 8 : 0),
        resilienceScore: Math.min(94, 80 + zoneBonus),
        heatResilience: Math.min(92, 78 + zoneBonus),
        humidityResilience: Math.min(92, 75 + zoneBonus),
        baselineNitrogen: 11,
        baselineWaterMm: 14,
        baselineHeat: 40,
        baselineHumidity: 38,
        rationale: {
          en: 'Captures residual potato fertilizer while resting soil from intensive irrigation.',
          fr: 'Valorise les reliquats d’engrais de la pomme de terre tout en économisant l’eau.',
          ar: 'يستفيد من بقايا تسميد البطاطس ويريح التربة من الري المكثف.',
        },
      },
      {
        id: 'chickpea',
        name: { en: 'Chickpea', fr: 'Pois chiche', ar: 'الحمص' },
        status: 'optimal',
        nitrogenGainKgHa: 38 + scenarioNBonus,
        waterSavedM3Ha: 510 + scenarioWBonus,
        waterSavedMm: 51 + (isThreeYear ? 7 : 0),
        resilienceScore: Math.min(95, 82 + zoneBonus),
        heatResilience: Math.min(94, 79 + zoneBonus),
        humidityResilience: Math.min(94, 77 + zoneBonus),
        baselineNitrogen: 11,
        baselineWaterMm: 14,
        baselineHeat: 40,
        baselineHumidity: 38,
        rationale: {
          en: 'Restores soil nitrogen and dramatically lowers summer pumping demand.',
          fr: 'Restaure l’azote du sol et réduit fortement les besoins de pompage estival.',
          ar: 'يعيد الآزوت للتربة ويخفض بشكل كبير الحاجة للضخ الصيفي.',
        },
      },
      {
        id: 'barley',
        name: { en: 'Barley', fr: 'Orge', ar: 'الشعير' },
        status: 'vigilance',
        nitrogenGainKgHa: 18 + scenarioNBonus,
        waterSavedM3Ha: 440 + scenarioWBonus,
        waterSavedMm: 44 + (isThreeYear ? 6 : 0),
        resilienceScore: Math.min(90, 74 + zoneBonus),
        heatResilience: Math.min(90, 75 + zoneBonus),
        humidityResilience: Math.min(89, 70 + zoneBonus),
        baselineNitrogen: 11,
        baselineWaterMm: 14,
        baselineHeat: 40,
        baselineHumidity: 38,
        rationale: {
          en: 'Fast ground cover for drier plots; lower nitrogen balance than legumes.',
          fr: 'Couverture rapide en parcelle sèche ; bilan azoté inférieur aux légumineuses.',
          ar: 'غطاء سريع للأراضي الجافة؛ رصيد آزوت أقل مقارنة بالبقوليات.',
        },
      },
    ];
  }

  return [
    {
      id: 'durum-wheat',
      name: { en: 'Durum wheat', fr: 'Blé dur', ar: 'القمح الصلب' },
      status: communeId === 'ain-oulmene' ? 'vigilance' : 'optimal',
      nitrogenGainKgHa: 34 + scenarioNBonus,
      waterSavedM3Ha: 390 + scenarioWBonus,
      waterSavedMm: 39 + (isThreeYear ? 6 : 0),
      resilienceScore: Math.min(95, 81 + zoneBonus),
      heatResilience: Math.min(93, 77 + zoneBonus),
      humidityResilience: Math.min(92, 76 + zoneBonus),
      baselineNitrogen: 15,
      baselineWaterMm: 18,
      baselineHeat: 46,
      baselineHumidity: 44,
      rationale: {
        en: 'Maximizes legume-fixed nitrogen or fallow moisture reserve for high-protein grain.',
        fr: 'Valorise l’azote des légumineuses ou l’eau stockée pour un grain riche en protéines.',
        ar: 'يستثمر الآزوت المثبت أو رطوبة البور لإنتاج قمح غني بالبروتين.',
      },
    },
    {
      id: 'barley',
      name: { en: 'Barley', fr: 'Orge', ar: 'الشعير' },
      status: 'optimal',
      nitrogenGainKgHa: 28 + scenarioNBonus,
      waterSavedM3Ha: 430 + scenarioWBonus,
      waterSavedMm: 43 + (isThreeYear ? 6 : 0),
      resilienceScore: Math.min(93, 79 + zoneBonus),
      heatResilience: Math.min(94, 80 + zoneBonus),
      humidityResilience: Math.min(90, 72 + zoneBonus),
      baselineNitrogen: 15,
      baselineWaterMm: 18,
      baselineHeat: 46,
      baselineHumidity: 44,
      rationale: {
        en: 'Reliable yield stability in low-rainfall communes like Ain Oulmene and El Eulma.',
        fr: 'Rendement stable dans les communes à faible pluviométrie.',
        ar: 'استقرار موثوق في المناطق قليلة الأمطار مثل عين ولمان والعلمة.',
      },
    },
    {
      id: 'potato',
      name: { en: 'Potato (irrigated)', fr: 'Pomme de terre (irriguée)', ar: 'البطاطس (مسقية)' },
      status: communeId === 'bougaa' ? 'optimal' : 'alert',
      nitrogenGainKgHa: 20 + scenarioNBonus,
      waterSavedM3Ha: 210 + scenarioWBonus,
      waterSavedMm: 21 + (isThreeYear ? 4 : 0),
      resilienceScore: Math.min(86, 62 + zoneBonus),
      heatResilience: Math.min(84, 58 + zoneBonus),
      humidityResilience: Math.min(86, 60 + zoneBonus),
      baselineNitrogen: 15,
      baselineWaterMm: 18,
      baselineHeat: 46,
      baselineHumidity: 44,
      rationale: {
        en: 'High water demand; reserve only for humid zones or night-drip irrigated plots.',
        fr: 'Forte demande en eau ; réserver aux zones humides ou au goutte-à-goutte nocturne.',
        ar: 'طلب مائي مرتفع؛ يُخصص فقط للمناطق الرطبة أو السقي الليلي بالتنقيط.',
      },
    },
  ];
}

export const SEASONAL_ALERTS: AlertItem[] = [
  {
    id: 'autumn-sowing',
    category: 'sowing',
    months: ['autumn'],
    severity: 'green-light',
    title: {
      en: 'Autumn sowing',
      fr: 'Semis d’automne',
      ar: 'البذر الخريفي',
    },
    condition: {
      en: 'below 18 °C and above 65% humidity',
      fr: 'en dessous de 18 °C et plus de 65 % d’humidité',
      ar: 'أقل من 18 °م ورطوبة أعلى من 65%',
    },
    action: {
      en: 'review sowing window',
      fr: 'vérifier la fenêtre de semis',
      ar: 'مراجعة نافذة البذر المناسبة',
    },
    fieldNotes: {
      en: 'Check upper 8 cm soil moisture before seeding durum wheat or chickpea; avoid sowing into crusted dry beds.',
      fr: 'Vérifier l’humidité sur les 8 premiers cm avant de semer le blé dur ou le pois chiche.',
      ar: 'تأكد من رطوبة أول 8 سم من التربة قبل بذر القمح الصلب أو الحمص.',
    },
  },
  {
    id: 'spring-frost',
    category: 'frost',
    months: ['march', 'april'],
    severity: 'red-alert',
    title: {
      en: 'Spring frost and depression',
      fr: 'Gel de printemps et dépression',
      ar: 'صقيع الربيع والمنخفض الجوي',
    },
    condition: {
      en: 'in March–April near 5 °C and below 90.2 kPa',
      fr: 'en mars–avril près de 5 °C et sous 90,2 kPa',
      ar: 'في مارس–أبريل قرب 5 °م وأقل من 90.2 كيلوباسكال',
    },
    action: {
      en: 'protect exposed crops and review field access',
      fr: 'protéger les cultures exposées et vérifier l’accès aux parcelles',
      ar: 'حماية المحاصيل المكشوفة ومراجعة إمكانية دخول الحقول',
    },
    fieldNotes: {
      en: 'Delay foliar spraying, inspect low-lying valley hollows at dawn, and clear drainage channels before depression rain.',
      fr: 'Reporter les traitements foliaires, inspecter les bas-fonds à l’aube et dégager le drainage.',
      ar: 'أجّل الرش الورقي وتفقد المنخفضات عند الفجر ونظّف قنوات الصرف.',
    },
  },
  {
    id: 'heat-irrigation',
    category: 'heat',
    months: ['april', 'may'],
    severity: 'priority-alert',
    title: {
      en: 'Heat stress and supplementary irrigation',
      fr: 'Stress thermique et irrigation d’appoint',
      ar: 'الإجهاد الحراري والري التكميلي',
    },
    condition: {
      en: 'in April–May above 20 °C and below 50% humidity',
      fr: 'en avril–mai au-dessus de 20 °C et sous 50 % d’humidité',
      ar: 'في أبريل–مايو أعلى من 20 °م ورطوبة أقل من 50%',
    },
    action: {
      en: 'inspect crop stress and prepare supplementary irrigation',
      fr: 'inspecter le stress des cultures et préparer l’irrigation d’appoint',
      ar: 'فحص إجهاد المحاصيل وتجهيز الري التكميلي',
    },
    fieldNotes: {
      en: 'Shift irrigation solely to dusk/night hours to cut evaporation losses by up to 30% on hot sirocco afternoons.',
      fr: 'Décaler l’irrigation en soirée/nuit pour réduire jusqu’à 30 % les pertes par évaporation.',
      ar: 'حوّل السقي إلى المساء أو الليل لتقليل التبخر بنسبة تصل إلى 30%.',
    },
  },
];

export interface SummerGuidance {
  cropName: Record<Language, string>;
  demandLevel: number; // 0-100
  action: Record<Language, string>;
  windowBadge: Record<Language, string>;
}

export const SUMMER_GUIDANCE: Record<SummerCropId, SummerGuidance> = {
  potato: {
    cropName: { en: 'Potato', fr: 'Pomme de terre', ar: 'البطاطس' },
    demandLevel: 82,
    action: {
      en: 'Schedule night drip irrigation when air is 25–30 °C and humidity is 20–35%.',
      fr: 'Programmer l’irrigation goutte-à-goutte de nuit lorsque l’air est à 25–30 °C et l’humidité à 20–35 %.',
      ar: 'برمجة السقي الليلي بالتنقيط عندما تكون الحرارة 25–30 °م والرطوبة 20–35%.',
    },
    windowBadge: {
      en: '21:00 – 05:00 Night Window',
      fr: 'Créneau nocturne 21h – 05h',
      ar: 'نافذة ليلية 21:00 – 05:00',
    },
  },
  'durum-wheat': {
    cropName: { en: 'Durum wheat', fr: 'Blé dur', ar: 'القمح الصلب' },
    demandLevel: 48,
    action: {
      en: 'Apply one targeted supplementary pass at grain filling if 7-day humidity stays below 35%.',
      fr: 'Appliquer un passage d’appoint au remplissage du grain si l’humidité reste sous 35 % sur 7 jours.',
      ar: 'تطبيق رية تكميلية واحدة عند امتلاء الحبة إذا بقيت الرطوبة أقل من 35% لمدة 7 أيام.',
    },
    windowBadge: {
      en: 'Grain-Fill Check',
      fr: 'Contrôle remplissage',
      ar: 'فحص امتلاء الحبوب',
    },
  },
  chickpea: {
    cropName: { en: 'Chickpea', fr: 'Pois chiche', ar: 'الحمص' },
    demandLevel: 34,
    action: {
      en: 'Skip midday watering; light evening misting only if flowering coincides with > 28 °C dry wind.',
      fr: 'Éviter l’arrosage en journée ; apport léger le soir uniquement si floraison > 28 °C par vent sec.',
      ar: 'تجنب السقي نهاراً؛ سقي مسائي خفيف فقط إذا تزامن الإزهار مع رياح جافة فوق 28 °م.',
    },
    windowBadge: {
      en: 'Low Water Need',
      fr: 'Faible besoin hydrique',
      ar: 'احتياج مائي منخفض',
    },
  },
  olive: {
    cropName: { en: 'Olive orchard', fr: 'Oliveraie', ar: 'بستان الزيتون' },
    demandLevel: 56,
    action: {
      en: 'Maintain deep root-zone basin moisture every 10–12 days and preserve straw mulch around trunks.',
      fr: 'Maintenir une humidité profonde au pied toutes les 10–12 jours et conserver le paillis.',
      ar: 'حافظ على رطوبة حوض الجذور كل 10–12 يوماً مع الإبقاء على التغطية بالقش.',
    },
    windowBadge: {
      en: 'Deep Basin Cycle',
      fr: 'Cycle profond 10–12 j',
      ar: 'دورة عميقة كل 10–12 يوماً',
    },
  },
  tomato: {
    cropName: { en: 'Field tomato', fr: 'Tomate de plein champ', ar: 'طماطم الحقل' },
    demandLevel: 88,
    action: {
      en: 'Split drip pulses into two short dawn/dusk intervals to prevent blossom-end stress above 26 °C.',
      fr: 'Fractionner le goutte-à-goutte en deux courtes impulsions aube/crépuscule au-delà de 26 °C.',
      ar: 'قسّم التنقيط إلى دفعتين قصيرتين عند الفجر والغروب لتفادي إجهاد الإزهار فوق 26 °م.',
    },
    windowBadge: {
      en: 'Split Dawn + Dusk',
      fr: 'Fractionné aube + soir',
      ar: 'تقسيم فجراً وغروباً',
    },
  },
};

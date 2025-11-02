export const BUNDESLAENDER = [
  { slug: 'baden-wuerttemberg', name: 'Baden-Wuerttemberg' },
  { slug: 'bayern', name: 'Bayern' },
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'brandenburg', name: 'Brandenburg' },
  { slug: 'bremen', name: 'Bremen' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'hessen', name: 'Hessen' },
  { slug: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern' },
  { slug: 'niedersachsen', name: 'Niedersachsen' },
  { slug: 'nordrhein-westfalen', name: 'Nordrhein-Westfalen' },
  { slug: 'rheinland-pfalz', name: 'Rheinland-Pfalz' },
  { slug: 'saarland', name: 'Saarland' },
  { slug: 'sachsen', name: 'Sachsen' },
  { slug: 'sachsen-anhalt', name: 'Sachsen-Anhalt' },
  { slug: 'schleswig-holstein', name: 'Schleswig-Holstein' },
  { slug: 'thueringen', name: 'Thueringen' },
] as const;

export type BundeslandInfo = typeof BUNDESLAENDER[number];
export type BundeslandKey = BundeslandInfo['slug'];

export type BundeslandRawQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  images?: string[];
  isImageQuestion?: boolean;
};

type BundeslandLoader = () => Promise<BundeslandRawQuestion[]>;

export const BUNDESLAND_QUESTION_LOADERS: Record<BundeslandKey, BundeslandLoader> = {
  'baden-wuerttemberg': () =>
    import('@/data/bundesland/baden-wuerttemberg.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  bayern: () =>
    import('@/data/bundesland/bayern.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  berlin: () =>
    import('@/data/bundesland/berlin.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  brandenburg: () =>
    import('@/data/bundesland/brandenburg.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  bremen: () =>
    import('@/data/bundesland/bremen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  hamburg: () =>
    import('@/data/bundesland/hamburg.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  hessen: () =>
    import('@/data/bundesland/hessen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  'mecklenburg-vorpommern': () =>
    import('@/data/bundesland/mecklenburg-vorpommern.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  niedersachsen: () =>
    import('@/data/bundesland/niedersachsen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  'nordrhein-westfalen': () =>
    import('@/data/bundesland/nordrhein-westfalen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  'rheinland-pfalz': () =>
    import('@/data/bundesland/rheinland-pfalz.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  saarland: () =>
    import('@/data/bundesland/saarland.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  sachsen: () =>
    import('@/data/bundesland/sachsen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  'sachsen-anhalt': () =>
    import('@/data/bundesland/sachsen-anhalt.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  'schleswig-holstein': () =>
    import('@/data/bundesland/schleswig-holstein.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
  thueringen: () =>
    import('@/data/bundesland/thueringen.json').then(
      (module) => module.default as BundeslandRawQuestion[],
    ),
};

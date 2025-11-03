import { BUNDESLAND_QUESTION_BANK } from "./bundeslandQuestionBank";

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

const cloneQuestion = (question: BundeslandRawQuestion): BundeslandRawQuestion => ({
  ...question,
  options: [...question.options],
  images: question.images ? [...question.images] : undefined,
});

const createLoader = (slug: BundeslandKey): BundeslandLoader => {
  return async () => {
    const questions = BUNDESLAND_QUESTION_BANK[slug];
    if (!questions) {
      return [];
    }
    return questions.map(cloneQuestion);
  };
};

export const BUNDESLAND_QUESTION_LOADERS: Record<BundeslandKey, BundeslandLoader> = BUNDESLAENDER.reduce(
  (acc, entry) => {
    acc[entry.slug] = createLoader(entry.slug);
    return acc;
  },
  {} as Record<BundeslandKey, BundeslandLoader>,
);

import type { Question } from "@/types/quiz";

export type CategoryKey = Question["category"];

export type CategoryConfig = {
  key: CategoryKey;
  slug: string;
  title: string;
  description: string;
  accent: string;
};

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    key: "Politik in der Demokratie",
    slug: "politik",
    title: "Politik in der Demokratie",
    description: "Political system and democracy",
    accent: "from-purple-100 to-purple-200",
  },
  {
    key: "Geschichte und Verantwortung",
    slug: "geschichte",
    title: "Geschichte und Verantwortung",
    description: "History and responsibility",
    accent: "from-amber-100 to-amber-200",
  },
  {
    key: "Mensch und Gesellschaft",
    slug: "gesellschaft",
    title: "Mensch und Gesellschaft",
    description: "Society and community",
    accent: "from-blue-100 to-blue-200",
  },
];

export const CATEGORY_KEYS: CategoryKey[] = CATEGORY_CONFIG.map(
  (category) => category.key,
);

export const CATEGORY_BY_SLUG: Record<string, CategoryConfig> =
  CATEGORY_CONFIG.reduce((acc, config) => {
    acc[config.slug] = config;
    return acc;
  }, {} as Record<string, CategoryConfig>);

export const CATEGORY_BY_KEY: Record<CategoryKey, CategoryConfig> =
  CATEGORY_CONFIG.reduce((acc, config) => {
    acc[config.key] = config;
    return acc;
  }, {} as Record<CategoryKey, CategoryConfig>);

export const DEFAULT_CATEGORY = CATEGORY_CONFIG[0];

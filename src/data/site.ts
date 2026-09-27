// Languages, URLs and store links. Every page URL on the site is defined here.

export const SITE = 'https://germanexamprep.org';

export const LANGS = ['en', 'de', 'tr', 'ar', 'uk', 'ru'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<Lang, { name: string; dir: 'ltr' | 'rtl'; ogLocale: string }> = {
  en: { name: 'English', dir: 'ltr', ogLocale: 'en_US' },
  de: { name: 'Deutsch', dir: 'ltr', ogLocale: 'de_DE' },
  tr: { name: 'Türkçe', dir: 'ltr', ogLocale: 'tr_TR' },
  ar: { name: 'العربية', dir: 'rtl', ogLocale: 'ar_AR' },
  uk: { name: 'Українська', dir: 'ltr', ogLocale: 'uk_UA' },
  ru: { name: 'Русский', dir: 'ltr', ogLocale: 'ru_RU' },
};

export const EXAM_IDS = ['telc-a1', 'telc-a2', 'telc-b1', 'dtz', 'goethe-a1', 'goethe-a2', 'goethe-b1'] as const;
export type ExamId = (typeof EXAM_IDS)[number];

/** Home page of each language. English lives at the root and is the x-default. */
export function homePath(lang: Lang): string {
  return lang === 'en' ? '/' : `/${lang}/`;
}

/**
 * Exam page URLs. English and German keep the URLs the site already ranks with
 * (/telc-b1-exam-guide/, /telc-b1-pruefung/); the other languages live under a prefix.
 */
export function examPath(lang: Lang, id: ExamId): string {
  switch (lang) {
    case 'en': return `/${id}-exam-guide/`;
    case 'de': return `/${id}-pruefung/`;
    case 'tr': return `/tr/${id}-sinavi/`;
    default: return `/${lang}/${id}/`;
  }
}

export type PageRef = { kind: 'home' } | { kind: 'exam'; id: ExamId };

export function pathFor(lang: Lang, page: PageRef): string {
  return page.kind === 'home' ? homePath(lang) : examPath(lang, page.id);
}

export function alternatesFor(page: PageRef): Record<Lang, string> {
  return Object.fromEntries(LANGS.map((l) => [l, pathFor(l, page)])) as Record<Lang, string>;
}

export const STORE = {
  play: 'https://play.google.com/store/apps/details?id=com.germanexamsimulator.examapp',
  apple: 'https://apps.apple.com/app/id6777960267',
};

export const CONTACT_EMAIL = 'germanlang2604@gmail.com';
export const PRIVACY_URL = 'https://germanlang2604-dotcom.github.io/privacy-policy/';

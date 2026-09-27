import { LANGS, type Lang, type PageRef, pathFor } from '../data/site';
import type { Dict } from './types';
import { en } from './en';
import { de } from './de';
import { tr } from './tr';
import { ar } from './ar';
import { uk } from './uk';
import { ru } from './ru';

const DICTS: Partial<Record<Lang, Dict>> = { en, de, tr, ar, uk, ru };

/** Languages that have a dictionary; only these are built and linked. */
export const ACTIVE_LANGS: Lang[] = LANGS.filter((l) => DICTS[l]);

export function dict(lang: Lang): Dict {
  const d = DICTS[lang];
  if (!d) throw new Error(`No dictionary for ${lang}`);
  return d;
}

export function alternates(page: PageRef): Partial<Record<Lang, string>> {
  return Object.fromEntries(ACTIVE_LANGS.map((l) => [l, pathFor(l, page)]));
}

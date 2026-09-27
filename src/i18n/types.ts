import type { Lang, ExamId } from '../data/site';
import type { Chip, Exam, Family, Module, ModuleKey } from '../data/exams';

/** Text for one exam page in one language. Facts (minutes, parts, points) come from data/exams.ts. */
export interface ExamCopy {
  /** <title>, about 60 characters. */
  title: string;
  /** Meta description, about 150 characters. */
  description: string;
  h1: string;
  lede: string;
  /** Who takes the exam and why. */
  purpose: string;
  /** One summary per module, and optionally one line per Teil in exam order. */
  modules: Partial<Record<ModuleKey, { summary: string; teile?: string[] }>>;
  /** How the result is decided, in plain words. */
  scoring: string;
  tips: { t: string; d: string }[];
  /** Exam-specific questions; duration, pass mark and practice questions are generated. */
  faq: { q: string; a: string }[];
}

export interface QA { q: string; a: string }

export interface Dict {
  lang: Lang;
  meta: { homeTitle: string; homeDescription: string };

  fx: {
    /** "65 min", "about 40 min" */
    min(n: number, approx?: boolean): string;
    parts(n: number): string;
    tasks(n: number): string;
    items(n: number): string;
    points(n: number): string;
    /** "3 parts", "3 tasks", "1 letter", "1 task, A or B" */
    unit(m: Module): string;
    prep(n: number): string;
    /** "90 min, shared with Sprachbausteine" */
    shared(n: number, other: string): string;
    group: string;
    pair: string;
    playedOnce: string;
    chip(c: Chip): string;
    /** Short pass rule for the fact strip on an exam page. */
    passShort(e: Exam): string;
    /** Join a list: "a, b and c" */
    list(items: string[]): string;
  };

  /** Plain-language name next to the German module name: "Lesen · Reading". */
  moduleName: Record<ModuleKey, string>;
  rowLabel: { total: string; written: string; oral: string; hl: string; mustB1: string };
  family: Record<Family, { tag: string; desc: string }>;
  levels: { B2: string; C1: string; integration: string };

  nav: { how: string; exams: string; pricing: string; download: string; language: string; home: string; skip: string };
  store: { play: string; apple: string; playLong: string; appleLong: string };

  hero: { eyebrow: string; h1a: string; h1em: string; lede: string; rating: string; free: string };
  story: {
    eyebrow: string;
    h2: string;
    p: string;
    note: string;
    heads: { lesen: string; hoeren: string; schreiben: string; sprechen: string; result: string };
    sprechenLead: string;
  };
  picker: { exam: string; level: string; soon: string };
  formats: { eyebrow: string; h2: string; p: string; guide: string; soon: string; dtzScale: string; below: string; dtzFoot: string };
  scoring: { eyebrow: string; h2: string; colModule: string; colMax: string; colPass: string; source: string };
  pricing: {
    eyebrow: string; h2: string;
    free: string; freePer: string; freeList: string[]; freeBtn: string;
    week: string; weekPer: string; weekList: string[]; weekBtn: string;
    month: string; monthPer: string; monthList: string[]; monthBtn: string;
    best: string; fine: string;
  };
  final: { h2a: string; h2em: string; p: string };
  footer: { privacy: string; contact: string; disclaimer: string; languages: string; exams: string };

  exam: {
    crumbExams: string;
    written: string;
    oral: string;
    passMark: string;
    glanceTitle: string;
    glanceNote: string;
    prepLabel: string;
    whoTitle: string;
    modulesTitle: string;
    modulesLead: string;
    scoringTitle: string;
    tipsTitle: string;
    faqTitle: string;
    ctaTitle(e: Exam): string;
    ctaText: string;
    relatedTitle: string;
    checked: string;
    faqDuration(e: Exam, d: Dict): QA;
    faqPass(e: Exam, copy: ExamCopy): QA;
    faqApp(e: Exam): QA;
  };

  exams: Record<ExamId, ExamCopy>;
}

/** Plural helper built on Intl.PluralRules; forms are keyed by CLDR category. */
export function plural(lang: Lang, n: number, forms: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }): string {
  const cat = new Intl.PluralRules(lang).select(n);
  return (forms[cat] ?? forms.other).replace('#', String(n));
}

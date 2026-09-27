// Exam facts, language-independent. Checked against the published formats of
// telc, the Goethe-Institut and g.a.s.t./BAMF (DTZ) in September 2026.
// Everything a page says about minutes, parts and points comes from here.

import type { ExamId } from './site';
import { EXAM_IDS } from './site';

export type Family = 'telc' | 'dtz' | 'goethe';
export type ModuleKey = 'hoeren' | 'lesen' | 'sprachbausteine' | 'schreiben' | 'sprechen';

/** How a module's sections are counted: Teile, Aufgaben, one letter, or one task out of two. */
export type Unit = 'parts' | 'tasks' | 'letter' | 'choice';

export interface Module {
  key: ModuleKey;
  /** Name printed on the exam paper. */
  de: string;
  count: number;
  unit: Unit;
  /** Number of scored questions, where the format fixes it. */
  items?: number;
  /** Minutes for this module, or for the time block it shares. */
  minutes: number;
  approx?: boolean;
  /** Lesen and Schreiben (telc A2) or Leseverstehen and Sprachbausteine (telc B1) share one time block. */
  sharedWith?: ModuleKey;
  points?: number;
  /** Rated as a level instead of points (DTZ Sprechen). */
  level?: 'B1';
  oral?: boolean;
  /** Preparation minutes before the oral exam. */
  prep?: number;
  format?: 'group' | 'pair';
  playedOnce?: boolean;
}

export type RowLabel = 'total' | 'written' | 'oral' | 'hl' | ModuleKey;

export interface ScoreRow {
  label: RowLabel;
  /** Label on the German result screen. */
  de: string;
  max?: number;
  pass?: number;
  /** DTZ: lowest score for A2. */
  a2?: number;
  level?: 'B1';
  sub?: [string, number][];
  /** Show sub rows on the phone mock-up (default true). */
  phoneSub?: boolean;
}

export type Chip =
  | { t: 'total'; n: number }
  | { t: 'passFrom'; n: number }
  | { t: 'writtenOral'; w: number; o: number }
  | { t: 'sixtyEach' }
  | { t: 'perSkill'; n: number }
  | { t: 'minWrittenOral'; w: number; o: number }
  | { t: 'modules'; n: number; max: number }
  | { t: 'passEach'; n: number }
  | { t: 'dtzResult' }
  | { t: 'dtzSprechen' };

export interface Exam {
  id: ExamId;
  family: Family;
  level: 'A1' | 'A2' | 'B1' | 'A2–B1';
  /** Official name. */
  name: string;
  short: string;
  /** Modules in the order they are taken. */
  modules: Module[];
  /** Total minutes of the written exam. */
  written: number;
  /** Approximate minutes of the oral exam (without preparation). */
  oral: number;
  scoring: {
    kind: 'total' | 'parts' | 'modular' | 'dtz';
    rows: ScoreRow[];
    chips: Chip[];
    /** Short German rule line on the result screen. */
    ruleDe: string;
    passWordDe?: string;
    badge?: string;
    stamp?: string;
  };
}

const SD1_MODULES: Module[] = [
  { key: 'hoeren', de: 'Hören', count: 3, unit: 'parts', items: 15, minutes: 20, approx: true },
  { key: 'lesen', de: 'Lesen', count: 3, unit: 'parts', items: 15, minutes: 25, approx: true },
  { key: 'schreiben', de: 'Schreiben', count: 2, unit: 'parts', minutes: 20, approx: true },
  { key: 'sprechen', de: 'Sprechen', count: 3, unit: 'parts', minutes: 15, approx: true, oral: true, format: 'group' },
];

export const EXAMS: Record<ExamId, Exam> = {
  'telc-a1': {
    id: 'telc-a1', family: 'telc', level: 'A1',
    name: 'Start Deutsch 1 / telc Deutsch A1', short: 'telc A1',
    modules: SD1_MODULES.map((m) => ({ ...m, points: 15 })),
    written: 65, oral: 15,
    scoring: {
      kind: 'total',
      rows: [{ label: 'total', de: 'Gesamt', max: 60, pass: 36, sub: [['Hören', 15], ['Lesen', 15], ['Schreiben', 15], ['Sprechen', 15]] }],
      chips: [{ t: 'total', n: 60 }, { t: 'passFrom', n: 36 }],
      ruleDe: 'Bestanden ab 36 von 60 Punkten',
    },
  },
  'telc-a2': {
    id: 'telc-a2', family: 'telc', level: 'A2',
    name: 'Start Deutsch 2 / telc Deutsch A2', short: 'telc A2',
    modules: [
      { key: 'hoeren', de: 'Hören', count: 3, unit: 'parts', items: 15, minutes: 20, approx: true, points: 15 },
      { key: 'lesen', de: 'Lesen', count: 3, unit: 'parts', items: 15, minutes: 50, sharedWith: 'schreiben', points: 15 },
      { key: 'schreiben', de: 'Schreiben', count: 2, unit: 'parts', minutes: 50, sharedWith: 'lesen', points: 15 },
      { key: 'sprechen', de: 'Sprechen', count: 3, unit: 'parts', minutes: 15, approx: true, oral: true, format: 'pair', points: 15 },
    ],
    written: 70, oral: 15,
    scoring: {
      kind: 'total',
      rows: [{ label: 'total', de: 'Gesamt', max: 60, pass: 36, sub: [['Hören', 15], ['Lesen', 15], ['Schreiben', 15], ['Sprechen', 15]] }],
      chips: [{ t: 'total', n: 60 }, { t: 'passFrom', n: 36 }],
      ruleDe: 'Bestanden ab 36 von 60 Punkten',
    },
  },
  'telc-b1': {
    id: 'telc-b1', family: 'telc', level: 'B1',
    name: 'Zertifikat Deutsch / telc Deutsch B1', short: 'telc B1',
    modules: [
      { key: 'lesen', de: 'Leseverstehen', count: 3, unit: 'parts', items: 20, minutes: 90, sharedWith: 'sprachbausteine', points: 75 },
      { key: 'sprachbausteine', de: 'Sprachbausteine', count: 2, unit: 'parts', items: 20, minutes: 90, sharedWith: 'lesen', points: 30 },
      { key: 'hoeren', de: 'Hörverstehen', count: 3, unit: 'parts', items: 20, minutes: 30, approx: true, points: 75 },
      { key: 'schreiben', de: 'Schriftlicher Ausdruck', count: 1, unit: 'letter', minutes: 30, points: 45 },
      { key: 'sprechen', de: 'Mündlicher Ausdruck', count: 3, unit: 'parts', minutes: 15, approx: true, oral: true, prep: 20, format: 'pair', points: 75 },
    ],
    written: 150, oral: 15,
    scoring: {
      kind: 'parts',
      rows: [
        { label: 'written', de: 'Schriftlich', max: 225, pass: 135, sub: [['Leseverstehen', 75], ['Sprachbausteine', 30], ['Hörverstehen', 75], ['Schriftlicher Ausdruck', 45]] },
        { label: 'oral', de: 'Mündlich', max: 75, pass: 45, sub: [['Teil 1', 15], ['Teil 2', 30], ['Teil 3', 30]] },
      ],
      chips: [{ t: 'writtenOral', w: 225, o: 75 }, { t: 'sixtyEach' }],
      ruleDe: 'Bestanden ab 135 von 225 (schriftlich) und 45 von 75 (mündlich)',
    },
  },
  dtz: {
    id: 'dtz', family: 'dtz', level: 'A2–B1',
    name: 'Deutsch-Test für Zuwanderer (DTZ)', short: 'DTZ',
    modules: [
      { key: 'hoeren', de: 'Hören', count: 4, unit: 'parts', items: 20, minutes: 25, points: 20, playedOnce: true },
      { key: 'lesen', de: 'Lesen', count: 5, unit: 'parts', items: 25, minutes: 45, points: 25 },
      { key: 'schreiben', de: 'Schreiben', count: 1, unit: 'choice', minutes: 30, points: 20 },
      { key: 'sprechen', de: 'Sprechen', count: 3, unit: 'parts', minutes: 16, approx: true, oral: true, format: 'pair', level: 'B1' },
    ],
    written: 100, oral: 16,
    scoring: {
      kind: 'dtz',
      rows: [
        { label: 'hl', de: 'Hören + Lesen', max: 45, pass: 33, a2: 20, sub: [['Hören', 20], ['Lesen', 25]] },
        { label: 'schreiben', de: 'Schreiben', max: 20, pass: 15, a2: 7 },
        { label: 'sprechen', de: 'Sprechen', level: 'B1' },
      ],
      chips: [{ t: 'dtzResult' }, { t: 'dtzSprechen' }],
      ruleDe: 'B1 mit Sprechen B1 und einem weiteren Teil auf B1',
      passWordDe: 'B1 ab',
      badge: 'B1',
      stamp: 'NIVEAU B1',
    },
  },
  'goethe-a1': {
    id: 'goethe-a1', family: 'goethe', level: 'A1',
    name: 'Goethe-Zertifikat A1: Start Deutsch 1', short: 'Goethe A1',
    modules: SD1_MODULES.map((m) => ({ ...m, points: 25 })),
    written: 65, oral: 15,
    scoring: {
      kind: 'total',
      rows: [{ label: 'total', de: 'Gesamt', max: 100, pass: 60, sub: [['Hören', 25], ['Lesen', 25], ['Schreiben', 25], ['Sprechen', 25]] }],
      chips: [{ t: 'total', n: 100 }, { t: 'passFrom', n: 60 }],
      ruleDe: 'Bestanden ab 60 von 100 Punkten',
    },
  },
  'goethe-a2': {
    id: 'goethe-a2', family: 'goethe', level: 'A2',
    name: 'Goethe-Zertifikat A2', short: 'Goethe A2',
    modules: [
      { key: 'lesen', de: 'Lesen', count: 4, unit: 'parts', items: 20, minutes: 30, points: 25 },
      { key: 'hoeren', de: 'Hören', count: 4, unit: 'parts', items: 20, minutes: 30, approx: true, points: 25 },
      { key: 'schreiben', de: 'Schreiben', count: 2, unit: 'parts', minutes: 30, points: 25 },
      { key: 'sprechen', de: 'Sprechen', count: 3, unit: 'parts', minutes: 15, approx: true, oral: true, format: 'pair', points: 25 },
    ],
    written: 90, oral: 15,
    scoring: {
      kind: 'parts',
      rows: [
        { label: 'written', de: 'Schriftlich', max: 75, pass: 45, sub: [['Lesen', 25], ['Hören', 25], ['Schreiben', 25]] },
        { label: 'sprechen', de: 'Sprechen', max: 25, pass: 15 },
      ],
      chips: [{ t: 'perSkill', n: 25 }, { t: 'minWrittenOral', w: 45, o: 15 }],
      ruleDe: 'Bestanden ab 60 von 100 · mind. 45 schriftlich und 15 mündlich',
    },
  },
  'goethe-b1': {
    id: 'goethe-b1', family: 'goethe', level: 'B1',
    name: 'Goethe-Zertifikat B1', short: 'Goethe B1',
    modules: [
      { key: 'lesen', de: 'Lesen', count: 5, unit: 'parts', items: 30, minutes: 65, points: 100 },
      { key: 'hoeren', de: 'Hören', count: 4, unit: 'parts', items: 30, minutes: 40, approx: true, points: 100 },
      { key: 'schreiben', de: 'Schreiben', count: 3, unit: 'tasks', minutes: 60, points: 100 },
      { key: 'sprechen', de: 'Sprechen', count: 3, unit: 'parts', minutes: 15, approx: true, oral: true, prep: 15, format: 'pair', points: 100 },
    ],
    written: 165, oral: 15,
    scoring: {
      kind: 'modular',
      rows: [
        { label: 'lesen', de: 'Lesen', max: 100, pass: 60 },
        { label: 'hoeren', de: 'Hören', max: 100, pass: 60 },
        { label: 'schreiben', de: 'Schreiben', max: 100, pass: 60, phoneSub: false, sub: [['Aufgabe 1', 40], ['Aufgabe 2', 40], ['Aufgabe 3', 20]] },
        { label: 'sprechen', de: 'Sprechen', max: 100, pass: 60, sub: [['Teil 1', 28], ['Teil 2', 40], ['Teil 3', 16], ['Aussprache', 16]] },
      ],
      chips: [{ t: 'modules', n: 4, max: 100 }, { t: 'passEach', n: 60 }],
      ruleDe: 'Jedes Modul wird einzeln bewertet · bestanden ab 60 von 100 Punkten',
    },
  },
};

export const FAMILIES: Record<Family, { name: string; levels: ExamId[] }> = {
  telc: { name: 'telc', levels: ['telc-a1', 'telc-a2', 'telc-b1'] },
  dtz: { name: 'DTZ', levels: ['dtz'] },
  goethe: { name: 'Goethe', levels: ['goethe-a1', 'goethe-a2', 'goethe-b1'] },
};

export const allExams = (): Exam[] => EXAM_IDS.map((id) => EXAMS[id]);

export const mod = (exam: Exam, key: ModuleKey): Module | undefined => exam.modules.find((m) => m.key === key);

/** Blocks for the exam-day timeline: shared time blocks are merged. */
export interface Block { mods: Module[]; minutes: number; approx?: boolean; prep?: boolean }

export function timeline(exam: Exam): { written: Block[]; oral: Block[] } {
  const written: Block[] = [];
  const seen = new Set<ModuleKey>();
  for (const m of exam.modules.filter((x) => !x.oral)) {
    if (seen.has(m.key)) continue;
    seen.add(m.key);
    const partner = m.sharedWith ? mod(exam, m.sharedWith) : undefined;
    if (partner) seen.add(partner.key);
    written.push({ mods: partner ? [m, partner] : [m], minutes: m.minutes, approx: m.approx });
  }
  const oral: Block[] = [];
  for (const m of exam.modules.filter((x) => x.oral)) {
    if (m.prep) oral.push({ mods: [], minutes: m.prep, prep: true });
    oral.push({ mods: [m], minutes: m.minutes, approx: m.approx });
  }
  return { written, oral };
}

/** Phone mock-up: number of Teil circles and exam clock per screen. */
export function phoneConfig(exam: Exam) {
  const l = mod(exam, 'lesen')!;
  const sb = mod(exam, 'sprachbausteine');
  const h = mod(exam, 'hoeren')!;
  const s = mod(exam, 'schreiben')!;
  return {
    lesen: { circles: l.count + (sb?.count ?? 0), minutes: l.minutes },
    hoeren: { circles: h.count, minutes: h.minutes },
    schreiben: { circles: s.count, minutes: s.minutes },
  };
}

/** Other exams worth linking from an exam page: same family first, then the same level elsewhere. */
export function relatedExams(exam: Exam): Exam[] {
  const same = FAMILIES[exam.family].levels.filter((id) => id !== exam.id).map((id) => EXAMS[id]);
  const lvl = exam.level === 'A2–B1' ? ['A2', 'B1'] : [exam.level];
  const other = allExams().filter((e) => e.family !== exam.family && (lvl.includes(e.level) || (e.level === 'A2–B1' && exam.level !== 'A1')));
  return [...same, ...other];
}

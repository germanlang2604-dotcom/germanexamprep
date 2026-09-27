// Small HTML builders shared by the server-rendered pages and the home page picker,
// so the first paint and the client-side exam switch produce identical markup.

import { EXAMS, mod, phoneConfig, type Exam, type Module } from '../data/exams';
import type { ExamId } from '../data/site';
import type { Dict } from '../i18n/types';

const esc = (s: string | number) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Rows inside the German result card on the phone. */
export function resultRowsHtml(e: Exam): string {
  const badge = e.scoring.badge ?? 'BESTANDEN';
  const passWord = e.scoring.passWordDe ?? 'bestanden ab';
  return e.scoring.rows.map((r) => {
    const val = r.max ? `<span class="cnt" data-max="${r.max}">${r.max}</span> / ${r.max}` : esc(r.level ?? '');
    const pass = r.max ? `${passWord} ${r.pass}` : `Niveau ${r.level}`;
    const subs = r.sub && r.phoneSub !== false
      ? `<div class="subs">${r.sub.map(([l, n]) => `<span>${esc(l)}</span><b>${n} / ${n}</b>`).join('')}</div>`
      : '';
    return `<div class="mod"><div class="top"><b>${esc(r.de)}</b><span>${val}</span></div><div class="bar"><i></i></div><div class="st"><em>${esc(pass)}</em><span class="badge">${esc(badge)}</span></div>${subs}</div>`;
  }).join('');
}

/** Body rows of the scoring table. */
export function scoreRowsHtml(e: Exam, d: Dict): string {
  return e.scoring.rows.map((r) => {
    const label = r.label === 'total' || r.label === 'written' || r.label === 'oral' || r.label === 'hl' ? d.rowLabel[r.label] : r.de;
    const pass = r.level ? d.rowLabel.mustB1 : r.a2 !== undefined ? `A2 ${r.a2} · B1 ${r.pass}` : String(r.pass);
    let html = `<tr><td class="m">${esc(label)}</td><td><b>${r.max ?? '—'}</b></td><td class="ps">${esc(pass)}</td></tr>`;
    for (const [l, n] of r.sub ?? []) html += `<tr class="sub"><td class="p">${esc(l)}</td><td>${n}</td><td></td></tr>`;
    return html;
  }).join('');
}

/** Time chip for a module, aware of shared time blocks. */
export function moduleTime(e: Exam, m: Module, d: Dict): string {
  const other = m.sharedWith ? mod(e, m.sharedWith) : undefined;
  return other ? d.fx.shared(m.minutes, other.de) : d.fx.min(m.minutes, m.approx);
}

export interface StepData { desc: string; facts: string[] }

/** Text and fact chips for the five story steps on the home page. */
export function storySteps(e: Exam, d: Dict): Record<'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result', StepData> {
  const c = d.exams[e.id];
  const L = mod(e, 'lesen')!, SB = mod(e, 'sprachbausteine'), H = mod(e, 'hoeren')!, S = mod(e, 'schreiben')!, P = mod(e, 'sprechen')!;
  const clean = (xs: (string | false | undefined)[]) => xs.filter(Boolean) as string[];
  return {
    lesen: {
      desc: [c.modules.lesen?.summary, SB ? c.modules.sprachbausteine?.summary : ''].filter(Boolean).join(' '),
      facts: SB ? [`${d.fx.unit(L)} + ${SB.count} ${SB.de}`, d.fx.min(L.minutes)] : [d.fx.unit(L), moduleTime(e, L, d)],
    },
    hoeren: { desc: c.modules.hoeren?.summary ?? '', facts: clean([d.fx.unit(H), moduleTime(e, H, d), H.playedOnce && d.fx.playedOnce]) },
    schreiben: { desc: c.modules.schreiben?.summary ?? '', facts: [d.fx.unit(S), moduleTime(e, S, d)] },
    sprechen: {
      desc: `${d.story.sprechenLead} ${c.modules.sprechen?.summary ?? ''}`.trim(),
      facts: clean([d.fx.unit(P), d.fx.min(P.minutes, P.approx), P.prep ? d.fx.prep(P.prep) : P.format === 'group' ? d.fx.group : d.fx.pair]),
    },
    result: { desc: c.scoring, facts: e.scoring.chips.map((x) => d.fx.chip(x)) },
  };
}

/** Everything the home page script needs to switch exams, for one language. */
export function pickerPayload(d: Dict) {
  const out: Record<string, unknown> = {};
  for (const id of Object.keys(EXAMS) as ExamId[]) {
    const e = EXAMS[id];
    out[id] = {
      short: e.short,
      name: e.name,
      steps: storySteps(e, d),
      phone: phoneConfig(e),
      result: { name: e.name, ruleDe: e.scoring.ruleDe, stamp: e.scoring.stamp ?? 'BESTANDEN', rows: resultRowsHtml(e) },
      table: scoreRowsHtml(e, d),
      scoring: d.exams[id].scoring,
    };
  }
  return out;
}

export function factsHtml(facts: string[]): string {
  return facts.map((f) => `<li>${esc(f)}</li>`).join('');
}

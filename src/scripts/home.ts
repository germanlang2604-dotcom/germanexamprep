// Home page: exam picker, scroll-driven story, parallax decor and small phone animations.

type StepKey = 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result';
interface ExamPayload {
  short: string;
  name: string;
  steps: Record<StepKey, { desc: string; facts: string[] }>;
  phone: Record<'lesen' | 'hoeren' | 'schreiben', { circles: number; minutes: number }>;
  result: { name: string; ruleDe: string; stamp: string; rows: string };
  table: string;
  scoring: string;
}
interface Payload { i18n: { exam: string; level: string; soon: string }; exams: Record<string, ExamPayload> }

const FAMS: Record<string, { name: string; lv: string[] }> = {
  telc: { name: 'telc', lv: ['A1', 'A2', 'B1'] },
  dtz: { name: 'DTZ', lv: ['A2–B1'] },
  goethe: { name: 'Goethe', lv: ['A1', 'A2', 'B1'] },
};
const STEP_KEYS: StepKey[] = ['lesen', 'hoeren', 'schreiben', 'sprechen', 'result'];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (s: number) => {
  s = Math.max(0, Math.round(s));
  const m = Math.floor(s / 60), r = s % 60;
  return `${m < 10 ? '0' : ''}${m}:${r < 10 ? '0' : ''}${r}`;
};
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T & Element>(sel)) as unknown as T[];

const dataEl = document.getElementById('exam-data');
if (dataEl?.textContent) init(JSON.parse(dataEl.textContent) as Payload);

function init(P: Payload) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { fam: 'goethe', lvl: 'B1' };
  const key = () => (state.fam === 'dtz' ? 'dtz' : `${state.fam}-${state.lvl.toLowerCase()}`);

  const story = document.querySelector<HTMLElement>('.story');
  const screenEl = document.getElementById('storyScreen');
  const steps = $$<HTMLElement>('.step');
  const screens = $$<HTMLElement>('.scr[data-scr]');
  const ticks = $$<HTMLElement>('.progress i');
  const decor = $$<HTMLElement>('[data-speed]');
  let active = -1;

  /* ---------- picker ---------- */
  function renderPickers() {
    for (const root of $$<HTMLElement>('[data-picker]')) {
      let h = `<div class="p-row" role="group" aria-label="${esc(P.i18n.exam)}">`;
      for (const f of Object.keys(FAMS)) {
        h += `<button type="button" class="p-fam p-${f}" data-fam="${f}" aria-pressed="${state.fam === f}">${FAMS[f].name}</button>`;
      }
      h += `</div><div class="p-row" role="group" aria-label="${esc(P.i18n.level)}">`;
      for (const l of FAMS[state.fam].lv) {
        h += `<button type="button" class="p-lvl" data-lvl="${l}" aria-pressed="${state.lvl === l}">${l}</button>`;
      }
      if (state.fam !== 'dtz') {
        for (const l of ['B2', 'C1']) h += `<button type="button" class="p-lvl" disabled aria-label="${l}, ${esc(P.i18n.soon)}">${l} <small>${esc(P.i18n.soon)}</small></button>`;
      }
      root.innerHTML = `${h}</div>`;
    }
  }

  document.addEventListener('click', (ev) => {
    const b = (ev.target as Element).closest<HTMLButtonElement>('[data-picker] button');
    if (!b || b.disabled) return;
    const root = b.closest('[data-picker]')!;
    let sel: string;
    if (b.dataset.fam) {
      if (b.dataset.fam === state.fam) return;
      state.fam = b.dataset.fam;
      const lv = FAMS[state.fam].lv;
      state.lvl = lv.includes(state.lvl) ? state.lvl : lv[lv.length - 1];
      sel = `[data-fam="${state.fam}"]`;
    } else {
      if (!b.dataset.lvl || b.dataset.lvl === state.lvl) return;
      state.lvl = b.dataset.lvl;
      sel = `[data-lvl="${state.lvl}"]`;
    }
    update(true);
    root.querySelector<HTMLElement>(sel)?.focus();
  });

  /* ---------- apply an exam ---------- */
  function update(animate: boolean) {
    const ex = P.exams[key()];
    renderPickers();
    STEP_KEYS.forEach((k, i) => {
      const st = steps[i];
      if (!st) return;
      st.querySelector('.ex-tag')!.textContent = ex.short;
      st.querySelector('.desc')!.textContent = ex.steps[k].desc;
      st.querySelector('.facts')!.innerHTML = ex.steps[k].facts.map((f) => `<li>${esc(f)}</li>`).join('');
    });
    (['lesen', 'hoeren', 'schreiben'] as const).forEach((k, i) => {
      const scr = screens[i];
      const t = scr.querySelector<HTMLElement>('.teile');
      if (t) {
        let h = `<b>${t.dataset.label}</b>`;
        for (let n = 1; n <= ex.phone[k].circles; n++) h += `<span${n === 1 ? ' class="a"' : ''}>${n}</span>`;
        t.innerHTML = h;
      }
      const c = scr.querySelector<HTMLElement>('.clock[data-mod]');
      if (c) { c.dataset.start = String(ex.phone[k].minutes * 60 - 1); c.textContent = fmt(ex.phone[k].minutes * 60 - 1); }
    });
    const res = (n: string) => document.querySelector<HTMLElement>(`[data-res="${n}"]`);
    res('name')!.textContent = ex.result.name;
    res('rule')!.textContent = ex.result.ruleDe;
    res('stamp')!.textContent = ex.result.stamp;
    res('rows')!.innerHTML = ex.result.rows;
    const sc = (n: string) => document.querySelector<HTMLElement>(`[data-score="${n}"]`);
    if (sc('cap')) sc('cap')!.textContent = ex.name;
    if (sc('body')) sc('body')!.innerHTML = ex.table;
    if (sc('text')) sc('text')!.textContent = ex.scoring;

    if (animate && !reduce && screenEl) { screenEl.classList.remove('swap'); void screenEl.offsetWidth; screenEl.classList.add('swap'); }
    if (active >= 0) { const a = active; active = -1; setActive(a); }
    onScroll();
  }

  /* ---------- scroll story ---------- */
  function setActive(i: number) {
    if (i === active) return;
    active = i;
    steps.forEach((s, k) => s.classList.toggle('on', k === i));
    screens.forEach((s, k) => s.classList.toggle('on', k === i));
    ticks.forEach((t, k) => t.classList.toggle('on', k === i));
    story?.classList.toggle('dark', i === 3);
    onEnter(i);
  }

  function onScroll() {
    const y = window.scrollY, vh = window.innerHeight;
    if (!reduce) for (const el of decor) {
      if (el.dataset.base === undefined) { const t = getComputedStyle(el).transform; el.dataset.base = t === 'none' ? '' : t; }
      el.style.transform = `${el.dataset.base} translate3d(0,${(y * parseFloat(el.dataset.speed ?? '0')).toFixed(1)}px,0)`;
    }
    if (!steps.length) return;
    let best = 0, bestD = Infinity;
    steps.forEach((s, k) => {
      const r = s.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - vh / 2);
      if (d < bestD) { bestD = d; best = k; }
    });
    setActive(best);
    // The exam clock runs down while you scroll through a step.
    const r = steps[best].getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)));
    const clock = screens[best]?.querySelector<HTMLElement>('.clock');
    if (clock) clock.textContent = fmt(Number(clock.dataset.start) - p * 90);
  }
  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; onScroll(); });
  }, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- per-screen moments ---------- */
  let timers: number[] = [];
  const clear = () => { timers.forEach((t) => { clearInterval(t); clearTimeout(t); }); timers = []; };
  const letter = 'Liebe Anna,\n\nam Samstag war ich auf dem Food-Festival. Die Stimmung war super und das Essen aus Korea war lecker! Leider warst du nicht dabei. Hast du nächsten Samstag Zeit? Wir könnten zusammen essen gehen.\n\nLiebe Grüße\nDeniz';
  const words = (s: string) => (s.trim().match(/\S+/g) || []).length;

  function onEnter(i: number) {
    clear();
    if (i === 1) {
      const bar = document.getElementById('aBar')!, t = document.getElementById('aT')!, f = document.getElementById('falsch')!;
      let s = 1;
      f.classList.remove('sel');
      if (reduce) { bar.style.width = '30%'; f.classList.add('sel'); }
      else {
        timers.push(window.setInterval(() => { s = (s + 3) % 443; bar.style.width = `${(s / 443) * 100}%`; t.textContent = fmt(s); }, 120));
        timers.push(window.setTimeout(() => f.classList.add('sel'), 1600));
      }
    }
    if (i === 2) {
      const el = document.getElementById('typed')!, wc = document.getElementById('wc')!;
      if (reduce) { el.textContent = letter; wc.textContent = String(words(letter)); }
      else {
        let n = 0;
        el.textContent = '';
        timers.push(window.setInterval(() => {
          n = Math.min(letter.length, n + 2);
          el.textContent = letter.slice(0, n);
          wc.textContent = String(words(el.textContent));
        }, 45));
      }
    }
    if (i === 3) {
      const a = document.getElementById('phPartner')!, b = document.getElementById('phYou')!;
      let you = false;
      a.classList.remove('off'); b.classList.add('off');
      if (!reduce) timers.push(window.setInterval(() => { you = !you; a.classList.toggle('off', you); b.classList.toggle('off', !you); }, 2600));
    }
    const scr4 = screens[4];
    const stamp = document.querySelector<HTMLElement>('[data-res="stamp"]');
    if (!scr4 || !stamp) return;
    const bars = $$<HTMLElement>('.bar i', scr4), cnts = $$<HTMLElement>('.cnt', scr4);
    stamp.classList.remove('in');
    if (i === 4 && !reduce) {
      bars.forEach((b) => { b.style.transition = 'none'; b.style.width = '0'; });
      void scr4.offsetWidth;
      bars.forEach((b) => { b.style.transition = ''; b.style.width = '100%'; });
      let p = 0;
      const draw = () => cnts.forEach((c) => { c.textContent = String(Math.round(Number(c.dataset.max) * p)); });
      draw();
      timers.push(window.setInterval(() => { p = Math.min(1, p + 0.04); draw(); }, 40));
      timers.push(window.setTimeout(() => stamp.classList.add('in'), 1300));
    } else if (i === 4) {
      stamp.classList.add('in');
    }
  }

  onScroll();
}

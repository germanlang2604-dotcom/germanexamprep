import type { Dict, ExamCopy } from './types';
import { timeline } from '../data/exams';

const min = (n: number, approx?: boolean) => `${approx ? 'ca. ' : ''}${n} Min.`;
const pl = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const SD1_MODULES: ExamCopy['modules'] = {
  hoeren: {
    summary: 'Kurze Alltagsgespräche, Durchsagen und Telefonansagen.',
    teile: [
      'Kurze Alltagsgespräche. Zu jedem wählen Sie a, b oder c.',
      'Durchsagen an öffentlichen Orten, zum Beispiel am Bahnhof oder im Kaufhaus. Sie entscheiden: richtig oder falsch.',
      'Nachrichten am Telefon und kurze Ansagen. Sie wählen a, b oder c.',
    ],
  },
  lesen: {
    summary: 'Kurze E-Mails und Briefe, Anzeigen und Schilder.',
    teile: [
      'Zwei kurze Texte, zum Beispiel eine E-Mail oder ein Brief. Sie entscheiden, ob die Aussagen richtig oder falsch sind.',
      'Anzeigen und kurze Internetseiten. Zu jeder Situation wählen Sie den passenden Text, a oder b.',
      'Schilder und Aushänge, zum Beispiel in einer Arztpraxis oder einem Geschäft. Sie entscheiden: richtig oder falsch.',
    ],
  },
  schreiben: {
    summary: 'Ein Formular ausfüllen, dann eine kurze persönliche Nachricht schreiben.',
    teile: [
      'Ein Formular mit fünf fehlenden Angaben ergänzen, zum Beispiel eine Kursanmeldung.',
      'Eine kurze Nachricht mit etwa 30 Wörtern schreiben, etwa eine E-Mail oder eine Notiz, zu drei vorgegebenen Punkten.',
    ],
  },
  sprechen: {
    summary: 'Eine Sprechprüfung in der Kleingruppe: sich vorstellen, Fragen stellen und beantworten, Bitten äußern.',
    teile: [
      'Sich anhand von Stichwörtern vorstellen: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobbys. Dazu kann gehören, ein Wort zu buchstabieren oder eine Zahl zu nennen.',
      'Mit Wortkarten Fragen zu einem Alltagsthema stellen und beantworten.',
      'Mit Bildkarten Bitten formulieren und darauf reagieren.',
    ],
  },
};

const SD1_TIPS: ExamCopy['tips'] = [
  { t: 'Die Vorstellung auswendig lernen', d: 'Sprechen Teil 1 fragt immer dieselben Angaben ab: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobbys. Bereiten Sie für jeden Punkt einen klaren Satz vor und üben Sie, Ihren Namen zu buchstabieren.' },
  { t: 'Erst die Aufgaben lesen, dann hören', d: 'Vor jedem Hörtext haben Sie Zeit, die Aufgaben zu lesen. Unterstreichen Sie Tage, Uhrzeiten und Preise, denn genau danach wird gefragt.' },
  { t: 'Jeden Punkt in der Nachricht beantworten', d: 'In Schreiben Teil 2 zählt jeder der drei Punkte. Ein einfacher Satz pro Punkt bringt mehr als ein langer Text, der einen Punkt vergisst.' },
  { t: 'Zahlen sicher verstehen', d: 'Preise, Telefonnummern, Daten und Uhrzeiten kommen in allen Teilen vor. Sprechen Sie sie laut, bis Sie sie im normalen Tempo verstehen.' },
];

export const de: Dict = {
  lang: 'de',
  meta: {
    homeTitle: 'German Exam Simulator | Übungsprüfungen für telc, Goethe & DTZ mit KI-Sprechen',
    homeDescription: 'Komplette Übungsprüfungen für telc A1, A2, B1, Goethe-Zertifikat A1, A2, B1 und den DTZ. Mit Zeitlimit wie in der echten Prüfung, bewertet wie das Zertifikat, mit KI-Sprechpartner. Prüfung 1 ist kostenlos.',
  },

  fx: {
    min,
    parts: (n) => pl(n, 'Teil', 'Teile'),
    tasks: (n) => pl(n, 'Aufgabe', 'Aufgaben'),
    items: (n) => pl(n, 'Aufgabe', 'Aufgaben'),
    points: (n) => pl(n, 'Punkt', 'Punkte'),
    unit: (m) => m.unit === 'parts' ? pl(m.count, 'Teil', 'Teile') : m.unit === 'tasks' ? pl(m.count, 'Aufgabe', 'Aufgaben') : m.unit === 'letter' ? '1 Brief' : '1 Aufgabe, A oder B',
    prep: (n) => `+ ${n} Min. Vorbereitung`,
    shared: (n, other) => `${n} Min. inkl. ${other}`,
    group: 'Kleingruppe',
    pair: 'Paarprüfung',
    playedOnce: 'jeder Text nur einmal',
    chip: (c) => {
      switch (c.t) {
        case 'total': return `${c.n} Punkte insgesamt`;
        case 'passFrom': return `bestanden ab ${c.n}`;
        case 'writtenOral': return `${c.w} schriftlich + ${c.o} mündlich`;
        case 'sixtyEach': return '60 % in jedem Teil';
        case 'perSkill': return `4 × ${c.n} Punkte`;
        case 'minWrittenOral': return `mind. ${c.w} schriftlich + ${c.o} mündlich`;
        case 'modules': return `${c.n} Module × ${c.max}`;
        case 'passEach': return `je ab ${c.n} bestanden`;
        case 'dtzResult': return 'Ergebnis A2 oder B1';
        case 'dtzSprechen': return 'Sprechen muss B1 sein';
      }
    },
    passShort: (e) => {
      switch (e.id) {
        case 'telc-b1': return '135/225 schriftlich · 45/75 mündlich';
        case 'goethe-a2': return '60/100, davon 45 schriftlich + 15 mündlich';
        case 'goethe-b1': return '60/100 in jedem Modul';
        case 'dtz': return 'B1 im Sprechen + ein weiterer Teil';
        default: { const r = e.scoring.rows[0]; return `${r.pass} von ${r.max} Punkten`; }
      }
    },
    list: (items) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`,
  },

  moduleName: { hoeren: 'Hörverstehen', lesen: 'Leseverstehen', sprachbausteine: 'Grammatik und Wortschatz', schreiben: 'Schriftlicher Ausdruck', sprechen: 'Mündliche Prüfung' },
  rowLabel: { total: 'Gesamt', written: 'Schriftliche Prüfung', oral: 'Mündliche Prüfung', hl: 'Hören + Lesen', mustB1: 'muss B1 sein' },
  family: {
    telc: { tag: 'telc Deutsch', desc: 'Für Visum, Familiennachzug, Niederlassungserlaubnis und Einbürgerung.' },
    dtz: { tag: 'Deutsch-Test für Zuwanderer', desc: 'Die Abschlussprüfung des Integrationskurses. Ein Test, das Ergebnis ist A2 oder B1.' },
    goethe: { tag: 'Goethe-Zertifikat', desc: 'Weltweit bekannt. Die B1-Module lassen sich einzeln ablegen.' },
  },
  levels: { B2: 'Mittelstufe', C1: 'Fortgeschritten', integration: 'Integrationskurs' },

  nav: { how: 'So funktioniert’s', exams: 'Prüfungen', pricing: 'Preise', download: 'App laden', language: 'Sprache', home: 'Start', skip: 'Zum Inhalt springen' },
  store: { play: 'Google Play', apple: 'App Store', playLong: 'Jetzt bei Google Play', appleLong: 'Laden im App Store' },

  hero: {
    eyebrow: 'telc · Goethe · DTZ | A1 – B1',
    h1a: 'Die ganze Prüfung,',
    h1em: 'bevor sie zählt.',
    lede: 'Komplette Übungsprüfungen nach telc-, Goethe- und DTZ-Standard. Lesen, Hören, Schreiben und eine mündliche Prüfung mit KI-Partner, mit Zeitlimit und bewertet wie beim echten Zertifikat.',
    rating: '5,0 im App Store und bei Google Play',
    free: 'Prüfung 1 ist kostenlos',
  },
  story: {
    eyebrow: 'Eine Prüfung, von Anfang bis Ende',
    h2: 'Jedes Modul. Jeder Teil. Mit Zeitlimit.',
    p: 'Wählen Sie Ihre Prüfung und scrollen Sie. Teile, Zeiten und Bewertung passen sich an.',
    note: 'Das Handy zeigt Beispielaufgaben aus der App. Teile, Zeiten und Bewertung folgen dem offiziellen Format der gewählten Prüfung.',
    heads: {
      lesen: 'Lesen gegen die Uhr.',
      hoeren: 'Hören im Prüfungstempo.',
      schreiben: 'Den Brief schreiben, der verlangt wird.',
      sprechen: 'Sprechen mit einem Partner, der antwortet.',
      result: 'Bewertet wie das Zertifikat.',
    },
    sprechenLead: 'Die meisten Apps lassen die mündliche Prüfung weg. Hier übernimmt ein KI-Partner die Rolle des zweiten Prüflings.',
  },
  picker: { exam: 'Prüfung', level: 'Niveau', soon: 'bald' },
  formats: {
    eyebrow: 'Prüfung wählen',
    h2: 'Drei Prüfungsformate. Ein Simulator.',
    p: 'Wählen Sie die Prüfung, für die Sie angemeldet sind. Jedes Niveau enthält komplette Übungsprüfungen, und Prüfung 1 jedes Formats ist kostenlos.',
    guide: 'Ratgeber',
    soon: 'BALD',
    dtzScale: 'Hören + Lesen, 45 Punkte',
    below: 'unter A2',
    dtzFoot: 'Das Sprechen entscheidet: Ohne B1 in der mündlichen Prüfung steht A2 auf dem Zertifikat.',
  },
  scoring: {
    eyebrow: 'Ehrliche Bewertung',
    h2: 'Wissen, wo die Punkte geblieben sind.',
    colModule: 'Modul · Teil',
    colMax: 'Max. Punkte',
    colPass: 'Bestanden ab',
    source: 'Auf Grundlage der veröffentlichten Prüfungsordnungen von telc, Goethe-Institut und g.a.s.t., geprüft im September 2026.',
  },
  pricing: {
    eyebrow: 'Preise',
    h2: 'Kostenlos starten. Für den Prüfungsmonat upgraden.',
    free: 'Kostenlos', freePer: 'ohne Konto', freeList: ['Prüfung 1 jedes Formats', 'Ohne Zeitlimit', 'Sprechen einmal pro Tag'], freeBtn: 'App laden',
    week: 'Wochenpass', weekPer: '7 Tage voller Zugriff', weekList: ['Alle Prüfungen freigeschaltet', 'Sprechen 2× pro Tag', 'Keine lange Bindung'], weekBtn: 'Woche freischalten',
    month: 'Monatsabo Premium', monthPer: 'pro Monat · jederzeit kündbar', monthList: ['Alle Prüfungen freigeschaltet', 'Sprechen 3× pro Tag', 'Verlängert sich monatlich'], monthBtn: 'Monat freischalten',
    best: 'BESTER WERT',
    fine: 'Die Preise variieren je nach Region und werden in der App in Ihrer Währung angezeigt.',
  },
  final: { h2a: 'In die Prüfung gehen, als wäre es', h2em: 'nicht das erste Mal.', p: 'Laden Sie die App und machen Sie noch heute Ihre erste komplette Übungsprüfung. Prüfung 1 ist kostenlos, ohne Konto.' },
  footer: {
    privacy: 'Datenschutz',
    contact: 'Kontakt',
    disclaimer: 'German Exam Simulator ist ein unabhängiges Vorbereitungstool. Es steht in keiner Verbindung zu telc gGmbH, g.a.s.t. e.V. oder dem Goethe-Institut und wird von diesen weder genehmigt noch unterstützt.',
    languages: 'Sprachen',
    exams: 'Prüfungsratgeber',
  },

  exam: {
    crumbExams: 'Prüfungen',
    written: 'Schriftliche Prüfung',
    oral: 'Mündliche Prüfung',
    passMark: 'Bestehensgrenze',
    glanceTitle: 'Der Prüfungstag auf einen Blick',
    glanceNote: 'Je nach Prüfungszentrum findet die mündliche Prüfung am selben Tag wie die schriftliche statt oder an einem anderen Tag.',
    prepLabel: 'Vorbereitung',
    whoTitle: 'Für wen ist diese Prüfung?',
    modulesTitle: 'Teil für Teil',
    modulesLead: 'Was jedes Modul von Ihnen verlangt, in der Reihenfolge der Prüfung.',
    scoringTitle: 'So wird bewertet',
    tipsTitle: 'So bereiten Sie sich vor',
    faqTitle: 'Fragen und Antworten',
    ctaTitle: (e) => (e.id === 'dtz' ? 'Den kompletten DTZ üben' : `Die komplette ${e.short} Prüfung üben`),
    ctaText: 'Übungsprüfungen mit Zeitlimit und allen Teilen, auch dem Sprechen mit KI-Partner, bewertet wie das Zertifikat. Prüfung 1 ist kostenlos, ohne Konto.',
    relatedTitle: 'Weitere Prüfungen',
    checked: 'Abgeglichen mit dem offiziellen Prüfungsformat im September 2026.',
    faqDuration: (e, d) => {
      const t = timeline(e);
      const parts = t.written.map((b) => `${b.mods.map((m) => m.de).join(' + ')} ${d.fx.min(b.minutes, b.approx)}`);
      const prep = t.oral.find((b) => b.prep);
      return {
        q: e.id === 'dtz' ? 'Wie lange dauert der DTZ?' : `Wie lange dauert die ${e.short} Prüfung?`,
        a: `Die schriftliche Prüfung dauert ${e.written} Minuten: ${d.fx.list(parts)}. Die mündliche Prüfung dauert etwa ${e.oral} Minuten${prep ? `, nach ${prep.minutes} Minuten Vorbereitung` : ''}.`,
      };
    },
    faqPass: (e, copy) => ({
      q: e.id === 'dtz' ? 'Welches Ergebnis brauche ich im DTZ?' : `Wie viele Punkte brauche ich für ${e.short}?`,
      a: copy.scoring,
    }),
    faqApp: (e) => ({
      q: e.id === 'dtz' ? 'Wie kann ich mich zu Hause auf den DTZ vorbereiten?' : `Wie kann ich mich zu Hause auf ${e.short} vorbereiten?`,
      a: `German Exam Simulator enthält komplette ${e.short}-Übungsprüfungen mit denselben Teilen und Zeiten wie die echte Prüfung, einschließlich Sprechen mit KI-Partner, und bewertet sie wie das Zertifikat. Prüfung 1 ist kostenlos und ohne Konto nutzbar.`,
    }),
  },

  exams: {
    'telc-a1': {
      title: 'telc A1 Prüfung (Start Deutsch 1): Aufbau, Bewertung & Tipps 2026',
      description: 'Die telc A1 Prüfung erklärt: 65 Minuten schriftlich, 15 Minuten Sprechen in der Kleingruppe, bestanden ab 36 von 60 Punkten. Mit Tipps und Übungsprüfungen.',
      h1: 'telc A1 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Start Deutsch 1 / telc Deutsch A1 prüft, ob Sie einfache Alltagssituationen auf Deutsch bewältigen: sich vorstellen, kurze Durchsagen verstehen und ein Formular ausfüllen.',
      purpose: 'Die meisten legen A1 für den Ehegatten- oder Familiennachzug ab, denn die deutschen Botschaften verlangen dafür in der Regel einfache Deutschkenntnisse. telc und das Goethe-Institut nutzen für Start Deutsch 1 dieselben Aufgaben und dieselbe Bewertung, die Vorbereitung ist also identisch.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben und Sprechen bringen je 15 Punkte. Es zählt nur die Gesamtpunktzahl: Mit 36 von 60 Punkten haben Sie bestanden, ein starkes Sprechen kann also ein schwächeres Lesen ausgleichen.',
      tips: SD1_TIPS,
      faq: [
        { q: 'Ist telc A1 dasselbe wie Goethe A1?', a: 'Beide sind Start Deutsch 1 mit denselben Aufgaben und derselben Bewertung. telc gibt das Ergebnis in 60 Punkten an, das Goethe-Institut rechnet es auf 100 um. Die Bestehensgrenze liegt in beiden Fällen bei 60 %.' },
        { q: 'Brauche ich A1 für den Ehegattennachzug?', a: 'In den meisten Fällen ja. Für den Ehegatten- oder Familiennachzug verlangen die deutschen Botschaften in der Regel ein A1-Zertifikat wie Start Deutsch 1. Die genauen Regeln für Ihr Land erfahren Sie bei der Botschaft.' },
      ],
    },
    'telc-a2': {
      title: 'telc A2 Prüfung (Start Deutsch 2): Aufbau, Bewertung & Tipps 2026',
      description: 'Die telc A2 Prüfung erklärt: 70 Minuten Hören, Lesen und Schreiben, 15 Minuten Sprechen mit Partner, bestanden ab 36 von 60 Punkten.',
      h1: 'telc A2 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Start Deutsch 2 / telc Deutsch A2 zeigt, dass Sie Routinesituationen auf Deutsch meistern: Termine, Einkäufe und kurze Nachrichten von der Arbeit, der Schule oder der Arztpraxis.',
      purpose: 'Viele legen A2 als Etappe zwischen A1 und B1 ab. Manche Arbeitgeber und Ausbildungsprogramme verlangen es, und es ist ein guter Test, bevor Sie sich für B1 anmelden.',
      modules: {
        hoeren: {
          summary: 'Telefonansagen, Radiodurchsagen und ein längeres Gespräch.',
          teile: [
            'Telefonansagen. Sie ergänzen kurze Notizen mit den wichtigsten Informationen, etwa einer Uhrzeit oder einer Nummer.',
            'Kurze Radiodurchsagen, zum Beispiel Nachrichten, Wetter oder Verkehr.',
            'Ein Alltagsgespräch mit fünf Aufgaben.',
          ],
        },
        lesen: { summary: 'Drei Teile mit je fünf Aufgaben. Sie lesen kurze Briefe, Aushänge und Anzeigen.' },
        schreiben: {
          summary: 'Ein Formular ausfüllen, dann eine kurze persönliche Nachricht schreiben.',
          teile: [
            'Ein Formular mit persönlichen Angaben ausfüllen.',
            'Eine kurze persönliche Nachricht schreiben, zum Beispiel eine E-Mail an Freunde oder Kollegen, zu den vorgegebenen Punkten.',
          ],
        },
        sprechen: {
          summary: 'Ein Gespräch mit Partner und Prüfer, meist direkt nach der schriftlichen Prüfung und ohne Vorbereitungszeit.',
          teile: [
            'Fragen zur Person stellen und beantworten.',
            'Über sich und Ihren Alltag sprechen.',
            'Mit dem Partner etwas aushandeln, zum Beispiel einen Termin.',
          ],
        },
      },
      scoring: 'Hören, Lesen, Schreiben und Sprechen bringen je 15 Punkte. Es zählt nur die Gesamtpunktzahl: Mit 36 von 60 Punkten haben Sie bestanden.',
      tips: [
        { t: 'Telefonnotizen üben', d: 'Telefonansagen sind ein großer Teil des Hörens. Trainieren Sie, Namen, Uhrzeiten und Nummern schon beim ersten Hören zu erfassen.' },
        { t: 'Die 50 Minuten einteilen', d: 'Lesen und Schreiben teilen sich einen Zeitblock. Viele lesen zu lange, planen Sie deshalb mindestens 15 Minuten für Formular und Nachricht ein.' },
        { t: 'Jeden Punkt der Nachricht beantworten', d: 'Die Nachricht wird vor allem nach Inhalt bewertet. Geben Sie jedem Punkt einen eigenen, klaren Satz und denken Sie an Anrede und Gruß.' },
        { t: 'Verabreden üben', d: 'In Sprechen Teil 3 verhandeln Sie mit Ihrem Partner. Üben Sie Wendungen zum Vorschlagen, Zusagen und Absagen: Wie wäre es mit …? Das passt mir gut. Leider kann ich da nicht.' },
      ],
      faq: [
        { q: 'Gibt es vor dem Sprechen Vorbereitungszeit?', a: 'In der Regel nicht. Die mündliche Prüfung folgt meist direkt auf die schriftliche, üben Sie also, ohne Notizen zu antworten.' },
        { q: 'Was ist der Unterschied zwischen telc A2 und Goethe A2?', a: 'Beide prüfen das Niveau A2, aber mit unterschiedlichen Aufgaben und Bewertungen. telc A2 wird mit 60 Punkten und einer Bestehensgrenze für die Gesamtpunktzahl bewertet. Goethe A2 vergibt 25 Punkte pro Fertigkeit und verlangt Mindestpunktzahlen im schriftlichen und im mündlichen Teil.' },
      ],
    },
    'telc-b1': {
      title: 'telc B1 Prüfung (Zertifikat Deutsch): Aufbau, Bewertung & Tipps 2026',
      description: 'Die telc B1 Prüfung erklärt: 150 Minuten schriftlich, 15 Minuten mündlich nach 20 Minuten Vorbereitung. Bestanden ab 135 von 225 und 45 von 75 Punkten.',
      h1: 'telc B1 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Das Zertifikat Deutsch / telc Deutsch B1 zeigt, dass Sie die meisten Alltagssituationen selbstständig auf Deutsch bewältigen: im Beruf, bei Behörden und im Gespräch.',
      purpose: 'B1 ist das Sprachniveau für die Einbürgerung und in den meisten Fällen für die Niederlassungserlaubnis. Auch viele Arbeitgeber verlangen es.',
      modules: {
        lesen: {
          summary: 'Drei Leseaufgaben zu Global-, Detail- und selektivem Verstehen.',
          teile: [
            'Globalverstehen: fünf kurze Texte der passenden Überschrift zuordnen, zehn stehen zur Auswahl.',
            'Detailverstehen: einen längeren Text lesen und fünf Fragen beantworten (a, b oder c).',
            'Selektives Verstehen: zu zehn Situationen die passende Anzeige finden, zwölf stehen zur Auswahl.',
          ],
        },
        sprachbausteine: {
          summary: 'Grammatik und Wortschatz im Kontext: zwei Briefe mit Lücken.',
          teile: [
            'Ein Brief mit zehn Lücken. Für jede Lücke wählen Sie a, b oder c.',
            'Ein zweiter Brief mit zehn Lücken, die Sie aus einer Wortliste füllen.',
          ],
        },
        hoeren: {
          summary: 'Radio, Durchsagen und Gespräche, geprüft auf Global-, Detail- und selektives Verstehen.',
          teile: [
            'Globalverstehen: fünf kurze Texte mit je einer Aussage, richtig oder falsch.',
            'Detailverstehen: ein längeres Gespräch oder Interview mit zehn Aussagen, richtig oder falsch.',
            'Selektives Verstehen: fünf kurze Durchsagen oder Ansagen, richtig oder falsch.',
          ],
        },
        schreiben: {
          summary: 'Ein persönlicher oder halbformeller Brief, der auf eine Situation antwortet und vier Leitpunkte behandelt.',
        },
        sprechen: {
          summary: 'Eine Paarprüfung mit zwei Prüfenden, nach 20 Minuten Vorbereitung mit allen Aufgabenblättern.',
          teile: [
            'Kontaktaufnahme: Ihren Partner durch Fragen und Antworten kennenlernen.',
            'Gespräch über ein Thema: Jeder hat einen anderen kurzen Text gelesen. Sie stellen ihn vor und diskutieren das Thema.',
            'Gemeinsam etwas planen: eine Aktivität zusammen planen und sich auf die Details einigen.',
          ],
        },
      },
      scoring: 'Schriftlich und mündlich werden getrennt bewertet: Sie brauchen 135 von 225 Punkten in der schriftlichen und 45 von 75 Punkten in der mündlichen Prüfung. In der mündlichen Prüfung bringt Teil 1 nur 15 Punkte, Teil 2 und Teil 3 je 30.',
      tips: [
        { t: 'Zeit für die Sprachbausteine begrenzen', d: 'Leseverstehen und Sprachbausteine teilen sich 90 Minuten. Setzen Sie sich pro Teil ein Zeitlimit, damit die Anzeigenaufgabe am Ende nicht zu kurz kommt.' },
        { t: 'Die 20 Minuten Vorbereitung nutzen', d: 'Vor der mündlichen Prüfung sehen Sie alle Aufgabenblätter. Notieren Sie Stichwörter zu Ihrem Text in Teil 2 und Ideen für die Planung in Teil 3, keine ganzen Sätze.' },
        { t: 'Alle vier Leitpunkte behandeln', d: 'Der Brief wird danach bewertet, ob Sie jeden Leitpunkt aufgreifen. Planen Sie einen kurzen Absatz pro Punkt und ergänzen Sie eine passende Anrede und einen Gruß.' },
        { t: 'Teil 2 und Teil 3 am meisten üben', d: 'Sie bringen 60 der 75 mündlichen Punkte. Üben Sie, einen kurzen Text in eigenen Worten vorzustellen und auf die Vorschläge Ihres Partners einzugehen.' },
      ],
      faq: [
        { q: 'Kann ich nur den nicht bestandenen Teil wiederholen?', a: 'Ja. Wenn Sie den schriftlichen oder den mündlichen Teil bestanden haben, können Sie den anderen einzeln wiederholen, in der Regel einmal und innerhalb einer Frist. Die genauen Bedingungen nennt Ihnen Ihr Prüfungszentrum.' },
        { q: 'Wird telc B1 für die Einbürgerung anerkannt?', a: 'Ja. Das telc-B1-Zertifikat wird als Sprachnachweis für die Einbürgerung anerkannt, ebenso das Goethe-Zertifikat B1 (alle vier Module) und ein DTZ-Ergebnis auf B1.' },
      ],
    },
    dtz: {
      title: 'DTZ Prüfung (Deutsch-Test für Zuwanderer): Aufbau & Bewertung 2026',
      description: 'Der DTZ erklärt: 100 Minuten schriftlich, etwa 16 Minuten Sprechen. Ein Test, Ergebnis A2 oder B1. So funktioniert die Bewertung und das brauchen Sie für B1.',
      h1: 'DTZ Prüfung: Aufbau, Bewertung und der Weg zu B1',
      lede: 'Der Deutsch-Test für Zuwanderer ist die Abschlussprüfung des Integrationskurses. Sie legen eine Prüfung ab, und das Ergebnis zeigt, ob Sie A2 oder B1 erreicht haben.',
      purpose: 'Ein DTZ-Ergebnis auf B1 gilt als Sprachnachweis für die Einbürgerung und die Niederlassungserlaubnis. Der Test wurde im Auftrag des Bundesamts für Migration und Flüchtlinge (BAMF) entwickelt.',
      modules: {
        hoeren: {
          summary: 'Vier Teile mit 20 Aufgaben. Jeder Hörtext wird nur einmal abgespielt.',
          teile: [
            'Kurze Ansagen, zum Beispiel am Telefon.',
            'Kurze Radiotexte wie Nachrichten, Wetter oder Verkehrsmeldungen.',
            'Vier Alltagsgespräche.',
            'Mehrere Personen äußern ihre Meinung zu einem Thema, und Sie ordnen die Aussagen zu.',
          ],
        },
        lesen: {
          summary: 'Fünf Teile mit 25 Aufgaben, vom Verzeichnis bis zum formellen Brief.',
          teile: [
            'Verzeichnisse und Register, etwa eine Hinweistafel im Haus oder ein Katalog.',
            'Anzeigen: für jede Situation die passende Anzeige finden.',
            'Pressetexte und amtliche Mitteilungen.',
            'Informationsbroschüren.',
            'Ein formeller Brief mit Lücken.',
          ],
        },
        schreiben: {
          summary: 'Ein Brief oder eine E-Mail. Sie wählen Aufgabe A oder B und behandeln alle vier Punkte, zum Beispiel in einem Schreiben an Vermieter, Behörde oder Firma.',
        },
        sprechen: {
          summary: 'Eine Paarprüfung von etwa 16 Minuten. Das Sprechen entscheidet, ob Sie B1 erreichen können.',
          teile: [
            'Sich vorstellen; der Prüfer stellt anschließend Nachfragen.',
            'Ein Bild beschreiben und über eigene Erfahrungen zum Thema sprechen.',
            'Gemeinsam mit dem Partner etwas planen.',
          ],
        },
      },
      scoring: 'Ein Test, zwei Niveaus. B1 bekommen Sie, wenn Sie im Sprechen B1 erreichen und zusätzlich in Hören + Lesen oder im Schreiben. In Hören + Lesen beginnt B1 bei 33 von 45 Punkten, A2 bei 20.',
      tips: [
        { t: 'Das Sprechen zuerst', d: 'Ohne B1 in der mündlichen Prüfung steht nicht B1 auf dem Zertifikat, egal wie gut Sie schreiben. Üben Sie alle drei Teile laut, am besten mit einem Partner.' },
        { t: 'Einmal hören, wie in der Prüfung', d: 'Jeder Hörtext wird nur einmal abgespielt. Lesen Sie vor jedem Text die Aufgaben und üben Sie mit Aufnahmen, die Sie sich nur einmal anhören.' },
        { t: 'Die vier Punkte als Gliederung nutzen', d: 'Im Schreiben braucht jeder Punkt der Aufgabe eine Antwort. Schreiben Sie ein bis zwei Sätze pro Punkt und verwenden Sie eine formelle Anrede und einen Gruß.' },
        { t: 'Die Grenzen kennen', d: 'In Hören + Lesen brauchen Sie 33 von 45 Punkten für B1 und 20 für A2. Zählen Sie Ihre Punkte in jeder Übungsprüfung, damit Sie wissen, wie viel noch fehlt.' },
      ],
      faq: [
        { q: 'Welches DTZ-Ergebnis brauche ich für die Einbürgerung?', a: 'Für die Einbürgerung brauchen Sie B1. Im DTZ heißt das: B1 im Sprechen und B1 in Hören + Lesen oder im Schreiben.' },
        { q: 'Ist der DTZ leichter als telc B1?', a: 'Nicht leichter, sondern anders. Der DTZ prüft A2 und B1 in einem Test und stuft Sie ein, während telc B1 eine reine B1-Prüfung ist, die man besteht oder nicht.' },
      ],
    },
    'goethe-a1': {
      title: 'Goethe A1 Prüfung (Start Deutsch 1): Aufbau, Bewertung & Tipps 2026',
      description: 'Goethe-Zertifikat A1: Start Deutsch 1 erklärt. Hören, Lesen und Schreiben dauern etwa 65 Minuten, Sprechen etwa 15. Bestanden ab 60 von 100 Punkten.',
      h1: 'Goethe A1 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Das Goethe-Zertifikat A1: Start Deutsch 1 prüft, ob Sie einfache Alltagssituationen auf Deutsch bewältigen, von der Vorstellung bis zum Verstehen kurzer Durchsagen.',
      purpose: 'Es gehört zu den Zertifikaten, die deutsche Botschaften als Nachweis einfacher Deutschkenntnisse für den Ehegatten- oder Familiennachzug anerkennen. Die Aufgaben sind dieselben wie bei Start Deutsch 1 von telc.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben und Sprechen bringen je 25 Punkte. Es zählt nur die Gesamtpunktzahl: Mit 60 von 100 Punkten haben Sie bestanden.',
      tips: SD1_TIPS,
      faq: [
        { q: 'Kann ich die Goethe-A1-Module einzeln ablegen?', a: 'Nein. Anders als Goethe B1 wird Start Deutsch 1 als Ganzes abgelegt: Sie machen immer alle vier Teile.' },
        { q: 'Ist Goethe A1 dasselbe wie telc A1?', a: 'Beide sind Start Deutsch 1 mit denselben Aufgaben und derselben Bewertung. Das Goethe-Institut gibt das Ergebnis in 100 Punkten an, telc in 60. Die Bestehensgrenze liegt in beiden Fällen bei 60 %.' },
      ],
    },
    'goethe-a2': {
      title: 'Goethe A2 Prüfung: Aufbau, Bewertung & Tipps 2026',
      description: 'Goethe-Zertifikat A2 erklärt: Lesen, Hören und Schreiben in etwa 90 Minuten, Sprechen in etwa 15. Bestanden ab 60 von 100 Punkten, davon 45 schriftlich und 15 mündlich.',
      h1: 'Goethe A2 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Das Goethe-Zertifikat A2 prüft, ob Sie vertraute Routinesituationen auf Deutsch bewältigen, vom Lesen einer Informationstafel bis zur Terminabsprache.',
      purpose: 'A2 ist eine häufige Etappe zwischen A1 und B1. Manche Arbeitgeber und Ausbildungsprogramme verlangen es, und Goethe-Zertifikate sind weltweit bekannt.',
      modules: {
        lesen: {
          summary: 'Vier Teile: ein Zeitungsartikel, eine Informationstafel, eine E-Mail und Anzeigen.',
          teile: [
            'Ein kurzer Zeitungsartikel mit fünf Fragen (a, b oder c).',
            'Eine Informationstafel, zum Beispiel ein Kaufhauswegweiser, mit fünf Fragen.',
            'Eine E-Mail mit fünf Fragen (a, b oder c).',
            'Anzeigen: fünf Situationen der passenden Anzeige zuordnen.',
          ],
        },
        hoeren: { summary: 'Vier Teile mit je fünf Aufgaben: Radiosendungen, Gespräche, Nachrichten auf dem Anrufbeantworter und Durchsagen.' },
        schreiben: {
          summary: 'Zwei kurze Texte: einer an Freunde, einer halbformell.',
          teile: [
            'Eine SMS mit 20–30 Wörtern.',
            'Eine E-Mail mit 30–40 Wörtern, zum Beispiel an eine Lehrerin oder einen Kollegen.',
          ],
        },
        sprechen: {
          summary: 'Eine Paarprüfung von etwa 15 Minuten.',
          teile: [
            'Mit Wortkarten Ihrem Partner Fragen zur Person stellen und seine Fragen beantworten.',
            'Über Ihr Leben sprechen: eine Frage auf einer Karte beantworten, zum Beispiel wie Sie Ihr Wochenende verbringen.',
            'Gemeinsam etwas planen, zum Beispiel mit Ihren Terminkalendern eine Zeit für ein Treffen finden.',
          ],
        },
      },
      scoring: 'Jede Fertigkeit bringt 25 Punkte. Sie brauchen insgesamt 60 von 100 Punkten, davon mindestens 45 von 75 im schriftlichen Teil und 15 von 25 im Sprechen. Ein starker schriftlicher Teil kann ein schwaches Sprechen also nicht retten.',
      tips: [
        { t: 'Wörter zählen', d: 'Die SMS braucht 20–30 Wörter, die E-Mail 30–40. Üben Sie, diese Längen zu treffen, damit Sie jeden Punkt behandeln, ohne dass die Zeit knapp wird.' },
        { t: 'Die Informationstafel überfliegen', d: 'In Lesen Teil 2 geht es darum, Informationen schnell zu finden, etwa welche Etage was verkauft. Suchen Sie nach Schlüsselwörtern, statt jede Zeile zu lesen.' },
        { t: 'Ihr Leben in A2-Sätzen vorbereiten', d: 'In Sprechen Teil 2 erzählen Sie von sich. Legen Sie sich einfache Sätze zu Arbeit, Familie, Freizeit und Wohnort zurecht.' },
        { t: 'Termine vereinbaren üben', d: 'Teil 3 ist eine Terminaufgabe. Lernen Sie Wendungen wie Hast du am Montag Zeit? und Um 10 Uhr kann ich leider nicht.' },
      ],
      faq: [
        { q: 'Kann ein gutes schriftliches Ergebnis ein schwaches Sprechen ausgleichen?', a: 'Nur teilweise. Sie brauchen mindestens 15 von 25 Punkten im Sprechen, egal wie gut Ihr schriftlicher Teil ist.' },
        { q: 'Ist die Goethe-A2-Prüfung modular?', a: 'Nein. Anders als Goethe B1 wird die A2-Prüfung als Ganzes abgelegt.' },
      ],
    },
    'goethe-b1': {
      title: 'Goethe B1 Prüfung: Aufbau, Bewertung & Tipps 2026',
      description: 'Goethe-Zertifikat B1 erklärt: vier Module, getrennt bewertet, jeweils bestanden ab 60 von 100 Punkten. Lesen 65 Min., Hören 40, Schreiben 60, Sprechen 15.',
      h1: 'Goethe B1 Prüfung: Aufbau, Bewertung und Vorbereitung',
      lede: 'Das Goethe-Zertifikat B1 zeigt, dass Sie Deutsch selbstständig verwenden: den Hauptpunkten einer Diskussion folgen, eine E-Mail mit Ihrer Meinung schreiben und eine kurze Präsentation halten.',
      purpose: 'B1 ist das Sprachniveau für die Einbürgerung und in den meisten Fällen für die Niederlassungserlaubnis. Das Goethe-Zertifikat B1 ist modular: Sie können die vier Module zusammen oder einzeln ablegen.',
      modules: {
        lesen: {
          summary: 'Fünf Teile mit 30 Aufgaben: ein Blogeintrag, Presseartikel, Anzeigen, Leserbeiträge und eine Hausordnung.',
          teile: [
            'Ein Blogeintrag oder eine E-Mail: sechs Aussagen, richtig oder falsch.',
            'Zwei Presseartikel mit je drei Fragen (a, b oder c).',
            'Anzeigen: für sieben Situationen die passende Anzeige finden, zehn stehen zur Auswahl.',
            'Sieben Leserbeiträge zu einem Thema: Ist die Person dafür oder nicht (ja oder nein)?',
            'Regeln oder Anleitungen, etwa eine Hausordnung, mit vier Fragen (a, b oder c).',
          ],
        },
        hoeren: {
          summary: 'Vier Teile mit 30 Aufgaben: kurze Durchsagen, ein Vortrag, ein Gespräch und eine Radiodiskussion.',
          teile: [
            'Fünf kurze Texte wie Durchsagen oder Nachrichten mit je zwei Aufgaben. Sie hören sie zweimal.',
            'Ein Vortrag, zum Beispiel eine Führung, mit fünf Fragen. Sie hören ihn einmal.',
            'Ein Gespräch mit sieben Aussagen, richtig oder falsch. Sie hören es einmal.',
            'Eine Radiodiskussion: acht Aussagen den Sprechenden zuordnen. Sie hören sie zweimal.',
          ],
        },
        schreiben: {
          summary: 'Zwei E-Mails und ein Forumsbeitrag in 60 Minuten.',
          teile: [
            'Eine persönliche E-Mail an Freunde, etwa 80 Wörter.',
            'Ein Forumsbeitrag mit Ihrer Meinung zu einem Thema, etwa 80 Wörter.',
            'Eine kurze formelle E-Mail, zum Beispiel eine Entschuldigung oder eine Bitte, etwa 40 Wörter.',
          ],
        },
        sprechen: {
          summary: 'Eine Paarprüfung nach 15 Minuten Vorbereitung.',
          teile: [
            'Gemeinsam mit Ihrem Partner etwas planen.',
            'Eine kurze Präsentation zu einem Thema halten, gegliedert in fünf Folien.',
            'Auf die Präsentation Ihres Partners mit einer Rückmeldung und einer Frage reagieren und Fragen zu Ihrer eigenen beantworten.',
          ],
        },
      },
      scoring: 'Jedes Modul wird einzeln mit 100 Punkten bewertet und ist ab 60 Punkten bestanden. Im Sprechen bringt die Präsentation in Teil 2 allein 40 der 100 Punkte.',
      tips: [
        { t: 'Im Lesen auf die Zeit achten', d: '65 Minuten für 30 Aufgaben sind knapp. Lösen Sie die Anzeigenaufgabe (Teil 3) durch Überfliegen und behalten Sie genug Zeit für die Presseartikel.' },
        { t: 'Die Wortzahl treffen', d: 'Aufgabe 1 und 2 brauchen etwa 80 Wörter, Aufgabe 3 etwa 40. Beantworten Sie jeden Punkt: Ein fehlender Punkt kostet mehr als ein paar Grammatikfehler.' },
        { t: 'Die Präsentation gliedern', d: 'Teil 2 bringt 40 Punkte. Folgen Sie den fünf Folien: Thema, eigene Erfahrung, Situation im Heimatland, Vor- und Nachteile mit Ihrer Meinung, Abschluss.' },
        { t: 'Eine Frage für den Partner parat haben', d: 'In Teil 3 reagieren Sie auf die Präsentation Ihres Partners. Notieren Sie sich während des Vortrags ein Detail, zu dem Sie fragen können.' },
      ],
      faq: [
        { q: 'Kann ich die Goethe-B1-Module einzeln ablegen?', a: 'Ja. Die Prüfung ist modular: Sie können alle vier Module an einem Tag oder einzeln ablegen, und jedes bestandene Modul wird für sich bescheinigt.' },
        { q: 'Brauche ich für die Einbürgerung alle vier Module?', a: 'Ja. Für Einbürgerung und Niederlassungserlaubnis erwarten die Behörden B1 in allen vier Fertigkeiten, Sie brauchen also jedes Modul bestanden.' },
      ],
    },
  },
};

import type { Dict, ExamCopy } from './types';
import { timeline } from '../data/exams';

const min = (n: number, approx?: boolean) => `${approx ? 'about ' : ''}${n} min`;
const pl = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const SD1_MODULES: ExamCopy['modules'] = {
  hoeren: {
    summary: 'Short everyday conversations, announcements and phone messages.',
    teile: [
      'Short everyday conversations. For each one you choose a, b or c.',
      'Announcements in public places, such as a station or a department store. You decide richtig or falsch.',
      'Phone messages and short announcements. You choose a, b or c.',
    ],
  },
  lesen: {
    summary: 'Short emails and letters, ads and signs.',
    teile: [
      'Two short texts, such as an email or a letter. You decide whether statements are richtig or falsch.',
      'Ads and short web pages. For each situation you pick the right text, a or b.',
      'Signs and notices, for example at a doctor’s office or in a shop. You decide richtig or falsch.',
    ],
  },
  schreiben: {
    summary: 'Fill in a form, then write a short personal message.',
    teile: [
      'Complete a form with five missing details, for example a course registration.',
      'Write a short message of about 30 words, such as an email or a note, that covers three points.',
    ],
  },
  sprechen: {
    summary: 'A speaking test in a small group: introduce yourself, ask and answer questions, make requests.',
    teile: [
      'Introduce yourself using word prompts: name, age, country, home, languages, job and hobbies. You may be asked to spell a word or say a number.',
      'Ask and answer questions about an everyday topic using word cards.',
      'Make requests and react to them using picture cards.',
    ],
  },
};

const SD1_TIPS: ExamCopy['tips'] = [
  { t: 'Learn your introduction by heart', d: 'Sprechen Teil 1 always asks for the same details: name, age, country, home, languages, job and hobbies. Prepare one clear sentence for each and practise spelling your name.' },
  { t: 'Read the questions before you listen', d: 'You get time to read the tasks before each recording. Underline days, times and prices, because those are what the recordings test.' },
  { t: 'Cover every point in the message', d: 'In Schreiben Teil 2 each of the three points counts. One simple sentence per point scores better than a long text that forgets one.' },
  { t: 'Get fast at numbers', d: 'Prices, phone numbers, dates and times come up in every part. Say them out loud until you understand them at normal speed.' },
];

export const en: Dict = {
  lang: 'en',
  meta: {
    homeTitle: 'German Exam Simulator | telc, Goethe & DTZ Mock Exams with AI Speaking',
    homeDescription: 'Full mock exams for telc A1, A2, B1, Goethe-Zertifikat A1, A2, B1 and the DTZ. Timed like the real exam, scored like the certificate, with an AI speaking partner. Exam 1 is free.',
  },

  fx: {
    min,
    parts: (n) => pl(n, 'part', 'parts'),
    tasks: (n) => pl(n, 'task', 'tasks'),
    items: (n) => pl(n, 'question', 'questions'),
    points: (n) => pl(n, 'point', 'points'),
    unit: (m) => m.unit === 'parts' ? pl(m.count, 'part', 'parts') : m.unit === 'tasks' ? pl(m.count, 'task', 'tasks') : m.unit === 'letter' ? '1 letter' : '1 task, A or B',
    prep: (n) => `+ ${n} min preparation`,
    shared: (n, other) => `${n} min, shared with ${other}`,
    group: 'small group',
    pair: 'with a partner',
    playedOnce: 'played once',
    chip: (c) => {
      switch (c.t) {
        case 'total': return `${c.n} points in total`;
        case 'passFrom': return `pass from ${c.n}`;
        case 'writtenOral': return `${c.w} written + ${c.o} oral`;
        case 'sixtyEach': return '60 % in each part';
        case 'perSkill': return `4 × ${c.n} points`;
        case 'minWrittenOral': return `at least ${c.w} written + ${c.o} oral`;
        case 'modules': return `${c.n} modules × ${c.max}`;
        case 'passEach': return `pass from ${c.n} each`;
        case 'dtzResult': return 'result A2 or B1';
        case 'dtzSprechen': return 'Sprechen must be B1';
      }
    },
    passShort: (e) => {
      switch (e.id) {
        case 'telc-b1': return '135/225 written · 45/75 oral';
        case 'goethe-a2': return '60/100, with 45 written + 15 oral';
        case 'goethe-b1': return '60/100 in each module';
        case 'dtz': return 'B1 in Sprechen + one more part';
        default: { const r = e.scoring.rows[0]; return `${r.pass} of ${r.max} points`; }
      }
    },
    list: (items) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`,
  },

  moduleName: { hoeren: 'Listening', lesen: 'Reading', sprachbausteine: 'Grammar & vocabulary', schreiben: 'Writing', sprechen: 'Speaking' },
  rowLabel: { total: 'Total', written: 'Written part', oral: 'Oral part', hl: 'Hören + Lesen', mustB1: 'must be B1' },
  family: {
    telc: { tag: 'telc Deutsch', desc: 'For visas, family reunion, permanent residence and citizenship.' },
    dtz: { tag: 'Deutsch-Test für Zuwanderer', desc: 'The final exam of the integration course. One test, and the result is A2 or B1.' },
    goethe: { tag: 'Goethe-Zertifikat', desc: 'Known worldwide. The B1 modules can be passed one at a time.' },
  },
  levels: { B2: 'Upper intermediate', C1: 'Advanced', integration: 'Integration course' },

  nav: { how: 'How it works', exams: 'Exams', pricing: 'Pricing', download: 'Download', language: 'Language', home: 'Home', skip: 'Skip to content' },
  store: { play: 'Google Play', apple: 'App Store', playLong: 'Get it on Google Play', appleLong: 'Download on the App Store' },

  hero: {
    eyebrow: 'telc · Goethe · DTZ | A1 – B1',
    h1a: 'Sit the exam before the',
    h1em: 'real exam.',
    lede: 'Full mock exams compatible with telc, Goethe and DTZ standards. Lesen, Hören, Schreiben and a spoken exam with an AI partner, timed and scored the way the real certificate is.',
    rating: '5.0 on the App Store and Google Play',
    free: 'Exam 1 is free',
  },
  story: {
    eyebrow: 'One exam, start to finish',
    h2: 'Every module. Every Teil. On the clock.',
    p: 'Pick your exam, then scroll. Parts, timings and scoring change with the exam you choose.',
    note: 'The phone shows sample tasks from the app. Parts, timings and scoring follow the published format of the exam you pick.',
    heads: {
      lesen: 'Read against the clock.',
      hoeren: 'Hear it at exam speed.',
      schreiben: 'Write the letter they will ask for.',
      sprechen: 'Speak with a partner who answers back.',
      result: 'Scored like the certificate.',
    },
    sprechenLead: 'Most apps skip the oral exam. Here an AI partner takes the other candidate’s seat.',
  },
  picker: { exam: 'Exam', level: 'Level', soon: 'soon' },
  formats: {
    eyebrow: 'Choose your format',
    h2: 'Three exam formats. One simulator.',
    p: 'Pick the exam you are registered for. Every level includes complete mock exams, and Exam 1 of each format is free.',
    guide: 'Guide',
    soon: 'SOON',
    dtzScale: 'Hören + Lesen, 45 points',
    below: 'below A2',
    dtzFoot: 'Sprechen decides: without B1 in the oral exam, the certificate says A2.',
  },
  scoring: {
    eyebrow: 'Honest scoring',
    h2: 'Know where the points went.',
    colModule: 'Module · Teil',
    colMax: 'Max. points',
    colPass: 'Pass from',
    source: 'Based on the published exam regulations of telc, the Goethe-Institut and g.a.s.t., checked in September 2026.',
  },
  pricing: {
    eyebrow: 'Pricing',
    h2: 'Start free. Upgrade for exam month.',
    free: 'Free', freePer: 'no account needed', freeList: ['Exam 1 of every format', 'No time limit', 'Speaking once per day'], freeBtn: 'Download',
    week: 'Weekly Pass', weekPer: '7 days full access', weekList: ['All exams unlocked', 'Speaking 2× per day', 'No long-term commitment'], weekBtn: 'Get the week',
    month: 'Monthly Premium', monthPer: 'per month · cancel anytime', monthList: ['All exams unlocked', 'Speaking 3× per day', 'Auto-renews monthly'], monthBtn: 'Go monthly',
    best: 'BEST VALUE',
    fine: 'Prices vary by region and are shown in your local currency in the app.',
  },
  final: { h2a: 'Walk in having done it', h2em: 'before.', p: 'Download the app and take your first full mock exam today. Exam 1 is free, no account required.' },
  footer: {
    privacy: 'Privacy Policy',
    contact: 'Contact',
    disclaimer: 'German Exam Simulator is an independent preparation tool and is not affiliated with, approved by, or endorsed by telc gGmbH, g.a.s.t. e.V. or Goethe-Institut.',
    languages: 'Languages',
    exams: 'Exam guides',
  },

  exam: {
    crumbExams: 'Exams',
    written: 'Written exam',
    oral: 'Oral exam',
    passMark: 'Pass mark',
    glanceTitle: 'Exam day at a glance',
    glanceNote: 'Depending on the test centre, the oral exam takes place on the same day as the written exam or on a different day.',
    prepLabel: 'Preparation',
    whoTitle: 'Who takes this exam?',
    modulesTitle: 'Part by part',
    modulesLead: 'What each module asks you to do, in the order you take them.',
    scoringTitle: 'How it is scored',
    tipsTitle: 'How to prepare',
    faqTitle: 'Questions and answers',
    ctaTitle: (e) => `Practise the full ${e.short} exam`,
    ctaText: 'Timed mock exams with every part, including Sprechen with an AI partner, scored like the certificate. Exam 1 is free, no account needed.',
    relatedTitle: 'Other exams',
    checked: 'Checked against the official exam format in September 2026.',
    faqDuration: (e, d) => {
      const t = timeline(e);
      const parts = t.written.map((b) => `${b.mods.map((m) => m.de).join(' + ')} ${d.fx.min(b.minutes, b.approx)}`);
      const prep = t.oral.find((b) => b.prep);
      return {
        q: `How long does the ${e.short} exam take?`,
        a: `The written exam takes ${e.written} minutes: ${d.fx.list(parts)}. The oral exam takes about ${e.oral} minutes${prep ? `, after ${prep.minutes} minutes of preparation` : ''}.`,
      };
    },
    faqPass: (e, copy) => ({
      q: e.id === 'dtz' ? 'What result do I need in the DTZ?' : `How many points do I need to pass ${e.short}?`,
      a: copy.scoring,
    }),
    faqApp: (e) => ({
      q: `How can I practise for ${e.short} at home?`,
      a: `German Exam Simulator has complete ${e.short} mock exams with the same parts and timings as the real exam, including Sprechen with an AI partner, and scores them the way the certificate does. Exam 1 is free and needs no account.`,
    }),
  },

  exams: {
    'telc-a1': {
      title: 'telc A1 Exam (Start Deutsch 1): Structure, Scoring & Tips 2026',
      description: 'The telc A1 exam explained: a 65-minute written part, a 15-minute speaking test in a small group, and a pass mark of 36 out of 60 points.',
      h1: 'telc A1 exam: structure, scoring and preparation',
      lede: 'Start Deutsch 1 / telc Deutsch A1 checks that you can handle simple everyday situations in German: introducing yourself, understanding short announcements and filling in a form.',
      purpose: 'Most people take A1 for a spouse or family reunion visa, where German embassies usually ask for proof of basic German. telc and the Goethe-Institut use the same Start Deutsch 1 tasks and marking, so the preparation is identical.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben and Sprechen are worth 15 points each. Only the total counts: 36 of 60 points passes, so a strong Sprechen can make up for a weaker Lesen.',
      tips: SD1_TIPS,
      faq: [
        { q: 'Is telc A1 the same as Goethe A1?', a: 'Both are Start Deutsch 1 and use the same tasks and marking. telc reports your result out of 60 points and the Goethe-Institut converts it to 100, but the pass mark is 60 % in both.' },
        { q: 'Do I need A1 for a spouse visa?', a: 'In most cases, yes. For a spouse or family reunion visa, German embassies usually ask for an A1 certificate such as Start Deutsch 1. Check the exact rules for your country with the embassy.' },
      ],
    },
    'telc-a2': {
      title: 'telc A2 Exam (Start Deutsch 2): Structure, Scoring & Tips 2026',
      description: 'The telc A2 exam explained: 70 minutes of Hören, Lesen and Schreiben, a 15-minute speaking test with a partner, and a pass mark of 36 out of 60 points.',
      h1: 'telc A2 exam: structure, scoring and preparation',
      lede: 'Start Deutsch 2 / telc Deutsch A2 shows that you can manage routine situations in German: appointments, shopping, and short messages from work, school or the doctor’s office.',
      purpose: 'Many learners take A2 as a milestone between A1 and B1. Some employers and training programmes ask for it, and it is a good check before you register for B1.',
      modules: {
        hoeren: {
          summary: 'Phone messages, radio announcements and one longer conversation.',
          teile: [
            'Phone messages. You complete short notes with the key information, such as a time or a number.',
            'Short radio announcements, for example news, weather or traffic.',
            'One everyday conversation with five tasks.',
          ],
        },
        lesen: { summary: 'Three parts with five tasks each. You read short letters, notices and ads.' },
        schreiben: {
          summary: 'Fill in a form, then write a short personal message.',
          teile: [
            'Complete a form with personal details.',
            'Write a short personal message, for example an email to a friend or colleague, that covers the given points.',
          ],
        },
        sprechen: {
          summary: 'A conversation with a partner and the examiner, usually straight after the written exam and without preparation time.',
          teile: [
            'Ask and answer questions about yourself.',
            'Talk about yourself and your everyday life.',
            'Agree on something with your partner, for example a time to meet.',
          ],
        },
      },
      scoring: 'Hören, Lesen, Schreiben and Sprechen are worth 15 points each. Only the total counts: 36 of 60 points passes.',
      tips: [
        { t: 'Practise phone notes', d: 'Phone messages are a big part of Hören. Train yourself to catch names, times and numbers the first time you hear them.' },
        { t: 'Plan your 50 minutes', d: 'Lesen and Schreiben share one time block. Many candidates spend too long reading, so keep at least 15 minutes for the form and the message.' },
        { t: 'Answer every point in the message', d: 'The message is marked on content first. Give each point its own clear sentence, and open and close the message properly.' },
        { t: 'Rehearse agreeing on a plan', d: 'In Sprechen Teil 3 you negotiate with your partner. Practise phrases for suggesting, accepting and declining: Wie wäre es mit …? Das passt mir gut. Leider kann ich da nicht.' },
      ],
      faq: [
        { q: 'Is there preparation time before the speaking test?', a: 'Usually not. The speaking test normally follows the written exam directly, so practise answering without notes.' },
        { q: 'What is the difference between telc A2 and Goethe A2?', a: 'Both test level A2 but use different tasks and scoring. telc A2 is scored out of 60 with one pass mark for the total. Goethe A2 gives 25 points per skill and asks for minimum scores in both the written and the oral part.' },
      ],
    },
    'telc-b1': {
      title: 'telc B1 Exam (Zertifikat Deutsch): Structure, Scoring & Tips 2026',
      description: 'The telc B1 exam explained: a 150-minute written exam and a 15-minute oral exam after 20 minutes of preparation. Pass with 135 of 225 written and 45 of 75 oral points.',
      h1: 'telc B1 exam: structure, scoring and preparation',
      lede: 'Zertifikat Deutsch / telc Deutsch B1 shows that you can deal with most everyday situations in German on your own: at work, at the authorities and in conversation.',
      purpose: 'B1 is the level required for German citizenship and, in most cases, for a permanent residence permit (Niederlassungserlaubnis). Many employers ask for it too.',
      modules: {
        lesen: {
          summary: 'Three reading tasks that test gist, detail and scanning.',
          teile: [
            'Globalverstehen: match five short texts to the right headline, out of ten.',
            'Detailverstehen: read a longer text and answer five questions (a, b or c).',
            'Selektives Verstehen: find the right ad for each of ten situations, out of twelve ads.',
          ],
        },
        sprachbausteine: {
          summary: 'Grammar and vocabulary in context: two letters with gaps.',
          teile: [
            'A letter with ten gaps. For each gap you choose a, b or c.',
            'A second letter with ten gaps, filled from a list of words.',
          ],
        },
        hoeren: {
          summary: 'Radio, announcements and conversations, tested for gist, detail and specific information.',
          teile: [
            'Globalverstehen: five short texts, each with a richtig/falsch statement.',
            'Detailverstehen: a longer conversation or interview with ten richtig/falsch statements.',
            'Selektives Verstehen: five short announcements or messages, richtig or falsch.',
          ],
        },
        schreiben: {
          summary: 'One letter, personal or semi-formal, that replies to a situation and covers four guiding points (Leitpunkte).',
        },
        sprechen: {
          summary: 'A pair exam with two examiners, after 20 minutes of preparation with all task sheets.',
          teile: [
            'Kontaktaufnahme: get to know your partner by asking and answering questions.',
            'Gespräch über ein Thema: each of you has read a different short text; you present it and discuss the topic.',
            'Gemeinsam etwas planen: plan an activity together and agree on the details.',
          ],
        },
      },
      scoring: 'Written and oral are scored separately: you need 135 of 225 written points and 45 of 75 oral points. In the oral exam, Teil 1 is worth 15 points while Teil 2 and Teil 3 are worth 30 each.',
      tips: [
        { t: 'Don’t let Sprachbausteine eat your reading time', d: 'Leseverstehen and Sprachbausteine share 90 minutes. Give each part a time limit so the ads task at the end doesn’t get rushed.' },
        { t: 'Use the 20 minutes of preparation', d: 'Before the oral exam you see all task sheets. Note key words for your text in Teil 2 and ideas for the plan in Teil 3, not full sentences.' },
        { t: 'Cover all four Leitpunkte', d: 'The letter is marked on whether you address every guiding point. Plan one short paragraph per point, then add a fitting greeting and closing.' },
        { t: 'Train Teil 2 and Teil 3 hardest', d: 'They are worth 60 of the 75 oral points. Practise presenting a short text in your own words and reacting to your partner’s suggestions.' },
      ],
      faq: [
        { q: 'Can I retake only the part I failed?', a: 'Yes. If you pass the written or the oral part, you can retake the other one on its own, usually once and within a deadline. Your test centre can tell you the exact conditions.' },
        { q: 'Is telc B1 accepted for German citizenship?', a: 'Yes. The telc B1 certificate is accepted as proof of German for naturalisation, as are the Goethe-Zertifikat B1 (all four modules) and a DTZ result at B1.' },
      ],
    },
    dtz: {
      title: 'DTZ Exam (Deutsch-Test für Zuwanderer): Structure & Scoring 2026',
      description: 'The DTZ explained: a 100-minute written exam and about 16 minutes of speaking. One test, result A2 or B1. How the scoring works and what you need for B1.',
      h1: 'DTZ exam: structure, scoring and how to reach B1',
      lede: 'The Deutsch-Test für Zuwanderer is the final German test of the integration course. You take one exam, and the result shows whether you reached A2 or B1.',
      purpose: 'A DTZ result at B1 counts as proof of German for naturalisation and for a permanent residence permit. The test was developed on behalf of the Federal Office for Migration and Refugees (BAMF).',
      modules: {
        hoeren: {
          summary: 'Four parts with 20 tasks. Every recording is played only once.',
          teile: [
            'Short announcements, for example on the phone.',
            'Short radio texts such as news, weather or traffic reports.',
            'Four everyday conversations.',
            'Several people give their opinion on a topic, and you match what they say.',
          ],
        },
        lesen: {
          summary: 'Five parts with 25 tasks, from directories to a formal letter.',
          teile: [
            'Directories and registers, such as a building sign or a catalogue.',
            'Ads: find the right one for each situation.',
            'Press texts and official notices.',
            'Information leaflets.',
            'A formal letter with gaps to fill.',
          ],
        },
        schreiben: {
          summary: 'One letter or email. You choose task A or B and cover all four points, for example writing to a landlord, an office or a company.',
        },
        sprechen: {
          summary: 'A pair exam of about 16 minutes. Sprechen decides whether you can reach B1.',
          teile: [
            'Introduce yourself; the examiner then asks follow-up questions.',
            'Describe a picture and talk about your own experience with the topic.',
            'Plan something together with your partner.',
          ],
        },
      },
      scoring: 'One test, two levels. You get B1 when Sprechen reaches B1 and either Hören + Lesen or Schreiben reaches B1 too. In Hören + Lesen, B1 starts at 33 of 45 points and A2 at 20.',
      tips: [
        { t: 'Put Sprechen first', d: 'Without B1 in the oral exam the certificate cannot say B1, however well you write. Practise all three parts out loud, ideally with a partner.' },
        { t: 'Listen once, like in the exam', d: 'Every recording is played only once. Read the tasks before each text and practise with audio you let yourself hear one time only.' },
        { t: 'Use the four points as your outline', d: 'In Schreiben every point in the task needs an answer. Write one or two sentences per point and use a formal greeting and closing.' },
        { t: 'Know the cut-offs', d: 'In Hören + Lesen you need 33 of 45 points for B1 and 20 for A2. Count your score in every mock exam so you know how far away you are.' },
      ],
      faq: [
        { q: 'Which DTZ result do I need for citizenship?', a: 'For naturalisation you need B1. In the DTZ that means B1 in Sprechen plus B1 in Hören + Lesen or in Schreiben.' },
        { q: 'Is the DTZ easier than telc B1?', a: 'Not easier, just different. The DTZ covers A2 and B1 in one test and places you at a level, while telc B1 is a pass-or-fail exam at B1 only.' },
      ],
    },
    'goethe-a1': {
      title: 'Goethe A1 Exam (Start Deutsch 1): Structure, Scoring & Tips 2026',
      description: 'Goethe-Zertifikat A1: Start Deutsch 1 explained. Hören, Lesen and Schreiben take about 65 minutes, Sprechen about 15. You pass with 60 of 100 points.',
      h1: 'Goethe A1 exam: structure, scoring and preparation',
      lede: 'The Goethe-Zertifikat A1: Start Deutsch 1 checks that you can handle simple everyday situations in German, from introducing yourself to understanding short announcements.',
      purpose: 'It is one of the certificates German embassies accept as proof of basic German for a spouse or family reunion visa. The tasks are the same as in telc’s Start Deutsch 1.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben and Sprechen are worth 25 points each. Only the total counts: 60 of 100 points passes.',
      tips: SD1_TIPS,
      faq: [
        { q: 'Can I take the Goethe A1 modules separately?', a: 'No. Unlike Goethe B1, Start Deutsch 1 is taken as a whole: you always sit all four parts.' },
        { q: 'Is Goethe A1 the same as telc A1?', a: 'Both are Start Deutsch 1 with the same tasks and marking. The Goethe-Institut reports the result out of 100 points and telc out of 60; the pass mark is 60 % in both.' },
      ],
    },
    'goethe-a2': {
      title: 'Goethe A2 Exam: Structure, Scoring & Tips 2026',
      description: 'Goethe-Zertifikat A2 explained: Lesen, Hören and Schreiben in about 90 minutes, Sprechen in about 15. Pass with 60 of 100 points, including 45 written and 15 oral.',
      h1: 'Goethe A2 exam: structure, scoring and preparation',
      lede: 'The Goethe-Zertifikat A2 tests whether you can handle familiar, routine situations in German, from reading a notice board to arranging an appointment.',
      purpose: 'A2 is a common milestone between A1 and B1. Some employers and training programmes ask for it, and Goethe certificates are known worldwide.',
      modules: {
        lesen: {
          summary: 'Four parts: a newspaper article, an information board, an email and ads.',
          teile: [
            'A short newspaper article with five questions (a, b or c).',
            'An information board, for example a department store directory, with five questions.',
            'An email with five questions (a, b or c).',
            'Ads: match five situations to the right ad.',
          ],
        },
        hoeren: { summary: 'Four parts with five tasks each: radio programmes, conversations, answering-machine messages and announcements.' },
        schreiben: {
          summary: 'Two short texts: one to a friend, one semi-formal.',
          teile: [
            'A text message (SMS) of 20–30 words.',
            'An email of 30–40 words, for example to a teacher or a colleague.',
          ],
        },
        sprechen: {
          summary: 'A pair exam of about 15 minutes.',
          teile: [
            'Ask your partner questions about their life and answer theirs, using word cards.',
            'Talk about your own life: answer a question on a card, such as how you spend your weekends.',
            'Plan something together, for example find a time to meet using your calendars.',
          ],
        },
      },
      scoring: 'Each skill is worth 25 points. You need 60 of 100 in total, with at least 45 of 75 in the written part and 15 of 25 in Sprechen, so a strong written part cannot rescue a weak oral exam.',
      tips: [
        { t: 'Count your words', d: 'The SMS needs 20–30 words and the email 30–40. Practise hitting those ranges so you cover every point without running out of time.' },
        { t: 'Scan the information board', d: 'Lesen Teil 2 is about finding facts fast, like which floor sells what. Look for key words instead of reading every line.' },
        { t: 'Prepare your life in A2 sentences', d: 'In Sprechen Teil 2 you talk about yourself. Have simple sentences ready about work, family, free time and where you live.' },
        { t: 'Practise making appointments', d: 'Teil 3 is a scheduling task. Learn phrases like Hast du am Montag Zeit? and Um 10 Uhr kann ich leider nicht.' },
      ],
      faq: [
        { q: 'Can a good written result make up for a weak Sprechen?', a: 'Only partly. You need at least 15 of 25 points in Sprechen, however well you do in the written part.' },
        { q: 'Is the Goethe A2 exam modular?', a: 'No. Unlike Goethe B1, the A2 exam is taken as a whole.' },
      ],
    },
    'goethe-b1': {
      title: 'Goethe B1 Exam: Structure, Scoring & Tips 2026',
      description: 'Goethe-Zertifikat B1 explained: four modules scored separately, each passed from 60 of 100 points. Lesen 65 min, Hören 40, Schreiben 60, Sprechen 15.',
      h1: 'Goethe B1 exam: structure, scoring and preparation',
      lede: 'The Goethe-Zertifikat B1 shows that you can use German independently: follow the main points of a discussion, write an email with your opinion and give a short presentation.',
      purpose: 'B1 is the level required for German citizenship and, in most cases, for permanent residence. The Goethe B1 is modular, so you can take the four modules together or one at a time.',
      modules: {
        lesen: {
          summary: 'Five parts with 30 tasks: a blog post, press articles, ads, readers’ opinions and house rules.',
          teile: [
            'A blog post or email: six statements, richtig or falsch.',
            'Two press articles, with three questions each (a, b or c).',
            'Ads: find the right ad for seven situations, from a choice of ten.',
            'Seven readers’ opinions on a topic: is each person for it or not (ja or nein)?',
            'Rules or instructions, such as house rules, with four questions (a, b or c).',
          ],
        },
        hoeren: {
          summary: 'Four parts with 30 tasks: short announcements, a talk, a conversation and a radio discussion.',
          teile: [
            'Five short texts such as announcements or messages, with two tasks each. Played twice.',
            'A talk, for example a guided tour, with five questions. Played once.',
            'A conversation with seven richtig/falsch statements. Played once.',
            'A radio discussion: match eight statements to the speakers. Played twice.',
          ],
        },
        schreiben: {
          summary: 'Two emails and a forum post in 60 minutes.',
          teile: [
            'An informal email to a friend, about 80 words.',
            'A forum post giving your opinion on a topic, about 80 words.',
            'A short formal email, for example to apologise or ask for something, about 40 words.',
          ],
        },
        sprechen: {
          summary: 'A pair exam after 15 minutes of preparation.',
          teile: [
            'Plan something together with your partner.',
            'Give a short presentation on a topic, guided by five slides.',
            'React to your partner’s presentation with feedback and a question, and answer questions about yours.',
          ],
        },
      },
      scoring: 'Each module is scored on its own, out of 100, and you pass it from 60 points. In Sprechen, the presentation in Teil 2 is worth 40 of the 100 points.',
      tips: [
        { t: 'Watch the clock in Lesen', d: '65 minutes for 30 tasks is tight. Do the ads task (Teil 3) by scanning, and keep enough time for the press articles.' },
        { t: 'Hit the word counts', d: 'Aufgabe 1 and 2 need about 80 words, Aufgabe 3 about 40. Answer every point: a missing point costs more than a few grammar mistakes.' },
        { t: 'Structure your presentation', d: 'Teil 2 is worth 40 points. Follow the five slides: the topic, your experience, the situation in your home country, pros and cons with your opinion, and a closing.' },
        { t: 'Have a question ready for your partner', d: 'In Teil 3 you react to your partner’s presentation. While they speak, note one detail you can ask about.' },
      ],
      faq: [
        { q: 'Can I take the Goethe B1 modules separately?', a: 'Yes. The exam is modular: you can take all four modules on one day or one at a time, and each module you pass is certified on its own.' },
        { q: 'Do I need all four modules for citizenship?', a: 'Yes. For naturalisation or permanent residence the authorities expect B1 in all four skills, so you need a pass in every module.' },
      ],
    },
  },
};

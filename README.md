# germanexamprep.org

Website for the German Exam Simulator app, built with [Astro](https://astro.build) and deployed to GitHub Pages.

Every page is generated from two kinds of files:

| What | Where |
| --- | --- |
| Exam facts: parts, minutes, points, pass rules | `src/data/exams.ts` |
| URLs, languages, store links | `src/data/site.ts` |
| All text, one file per language | `src/i18n/en.ts`, `de.ts`, `tr.ts`, `ar.ts`, `uk.ts`, `ru.ts` |
| Page layouts | `src/components/HomePage.astro`, `src/components/ExamPage.astro` |
| Design (colours, fonts, spacing) | `src/styles/global.css` |

The site has 6 languages × 8 pages (home + 7 exams) = 48 pages. English and German keep the URLs the old site already ranked with (`/telc-b1-exam-guide/`, `/telc-b1-pruefung/`); Turkish, Arabic, Ukrainian and Russian live under `/tr/`, `/ar/`, `/uk/` and `/ru/`. The old Russian page `/podgotovka-dtz-telc/` redirects to `/ru/dtz/`.

## Common edits

- **Change a sentence**: edit it in the language file, for example `src/i18n/tr.ts`. TypeScript checks that every language has every text, so a missing translation fails the build instead of showing an empty spot.
- **An exam changes its format**: update the numbers once in `src/data/exams.ts`; the timeline, module cards, scoring tables, FAQ answers and the home page picker all follow.
- **Add B2 or C1 later**: add the exam to `EXAM_IDS` in `src/data/site.ts`, its facts to `src/data/exams.ts`, its level to `FAMILIES`, and its text to each language file.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the static site to dist/
npm run check    # type check
```

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.
One-time setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The custom domain comes from `public/CNAME`.

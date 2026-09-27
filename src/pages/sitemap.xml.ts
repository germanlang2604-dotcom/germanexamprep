import type { APIRoute } from 'astro';
import { SITE, EXAM_IDS, type PageRef } from '../data/site';
import { ACTIVE_LANGS, alternates } from '../i18n';

const pages: PageRef[] = [{ kind: 'home' }, ...EXAM_IDS.map((id) => ({ kind: 'exam' as const, id }))];
const lastmod = '2026-09-27';

export const GET: APIRoute = () => {
  const urls = pages.flatMap((page) => {
    const alt = alternates(page);
    const links = [
      ...ACTIVE_LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${alt[l]}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${alt.en}"/>`,
    ].join('\n');
    return ACTIVE_LANGS.map((l) => `  <url>\n    <loc>${SITE}${alt[l]}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n  </url>`);
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

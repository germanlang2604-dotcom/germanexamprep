// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://germanexamprep.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // The old Russian overview page now lives at /ru/dtz/.
  redirects: {
    '/podgotovka-dtz-telc/': '/ru/dtz/',
  },
});

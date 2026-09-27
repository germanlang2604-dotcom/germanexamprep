// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://germanexamprep.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Short hashed asset names instead of names derived from the [...slug] route.
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: '_astro/[hash].js',
          chunkFileNames: '_astro/[hash].js',
          assetFileNames: '_astro/[hash][extname]',
        },
      },
    },
  },
  // The old Russian overview page now lives at /ru/dtz/.
  redirects: {
    '/podgotovka-dtz-telc/': '/ru/dtz/',
  },
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gusdv16.github.io',
  base: '/entrada-eventos',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://geckoroo.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  output: 'static',
  adapter: undefined,
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser'
    }
  }
});
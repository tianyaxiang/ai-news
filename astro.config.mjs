import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://ai-news.pages.dev',
  output: 'static',
  adapter: cloudflare(),
});

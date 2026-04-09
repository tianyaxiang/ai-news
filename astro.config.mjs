import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://d.newkit.site',
  output: 'static',
  adapter: cloudflare(),
});

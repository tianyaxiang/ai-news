import RSSParser from 'rss-parser';
import * as cheerio from 'cheerio';
import type { SourcePlugin, SourceConfig, Article } from '../types.js';
import { proxyFetch } from '../../proxy.js';

const rssPlugin: SourcePlugin = {
  name: 'rss',
  type: 'rss',

  async fetch(config: SourceConfig): Promise<Article[]> {
    if (!config.url) {
      throw new Error(`RSS plugin requires a "url" in source config for "${config.name}"`);
    }

    // Fetch XML via proxyFetch, then parse the string
    const res = await proxyFetch(config.url);
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${config.url}`);
    const xml = await res.text();

    const parser = new RSSParser();
    const feed = await parser.parseString(xml);
    const maxItems = config.maxItems ?? 10;

    const articles: Article[] = feed.items
      .slice(0, maxItems)
      .map(item => {
        let textContent = item.contentSnippet ?? '';
        // rss-parser's contentSnippet often drops the first paragraph in some feeds (like Product Hunt).
        // Try parsing the HTML content directly using cheerio.
        const htmlContent = item.content || item.summary || '';
        if (htmlContent) {
          const $ = cheerio.load(htmlContent);
          $('script, style').remove();
          textContent = $('body').text().replace(/\s+/g, ' ').trim();
        }
        
        return {
          title: item.title ?? 'Untitled',
          url: item.link ?? '',
          content: textContent,
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: config.name,
          author: item.creator ?? item.author,
          tags: item.categories ?? [],
        };
      });

    return articles;
  },
};

export default rssPlugin;

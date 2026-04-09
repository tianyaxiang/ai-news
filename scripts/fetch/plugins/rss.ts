import RSSParser from 'rss-parser';
import type { SourcePlugin, SourceConfig, Article } from '../types.js';

const parser = new RSSParser();

const rssPlugin: SourcePlugin = {
  name: 'rss',
  type: 'rss',

  async fetch(config: SourceConfig): Promise<Article[]> {
    if (!config.url) {
      throw new Error(`RSS plugin requires a "url" in source config for "${config.name}"`);
    }

    const feed = await parser.parseURL(config.url);
    const maxItems = config.maxItems ?? 10;

    const articles: Article[] = feed.items
      .slice(0, maxItems)
      .map(item => ({
        title: item.title ?? 'Untitled',
        url: item.link ?? '',
        content: item.contentSnippet ?? item.content ?? item.summary ?? '',
        date: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: config.name,
        author: item.creator ?? item.author,
        tags: item.categories ?? [],
      }));

    return articles;
  },
};

export default rssPlugin;

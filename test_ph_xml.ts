import { proxyFetch } from './scripts/proxy.js';
import RSSParser from 'rss-parser';

async function test() {
  const url = 'https://www.producthunt.com/feed';
  const res = await proxyFetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const xml = await res.text();
  
  const parser = new RSSParser({
    customFields: {
      item: ['description', 'content:encoded', 'summary']
    }
  });
  const feed = await parser.parseString(xml);
  console.log("Keys:", Object.keys(feed.items[0]));
  console.log("Item:", feed.items[0]);
}

test().catch(console.error);

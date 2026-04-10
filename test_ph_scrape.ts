import { proxyFetch } from './scripts/proxy.js';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://www.producthunt.com/products/outtalent';
  const res = await proxyFetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  console.log("Title:", $('title').text());
  console.log("Meta Desc:", $('meta[name="description"]').attr('content'));
  console.log("OG Desc:", $('meta[property="og:description"]').attr('content'));
}

test().catch(console.error);

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { normalizeUrl } from './articles.js';

export async function loadHistory(contentDir: string, beforeDate: string) {
  const translations = new Map<string, string>();
  const byPath = new Map<string, string>();
  const published = new Set<string>();
  async function files(dir: string): Promise<string[]> {
    try { return await readdir(dir, { recursive: true }); }
    catch (err) { if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []; throw err; }
  }
  // Build the index once per run, including legacy hashes and URL spellings.
  for (const file of await files(join(contentDir, 'news'))) {
    if (!file.endsWith('.md')) continue;
    const markdown = await readFile(join(contentDir, 'news', file), 'utf8');
    const match = markdown.match(/^originalUrl:\s*(.+)$/m);
    if (!match) continue;
    let raw = match[1].trim();
    try { raw = JSON.parse(raw); } catch { raw = raw.replace(/^'|'$/g, ''); }
    const key = normalizeUrl(raw);
    if (!key) continue;
    const path = `/news/${file.replace(/\.md$/, '')}`;
    translations.set(key, path);
    byPath.set(path, key);
  }
  for (const file of await files(join(contentDir, 'daily'))) {
    if (!file.endsWith('.md') || file.slice(0, 10) >= beforeDate) continue;
    const markdown = await readFile(join(contentDir, 'daily', file), 'utf8');
    const urls = markdown.match(/^publishedUrls:\s*(\[.*\])$/m);
    if (urls) {
      for (const url of JSON.parse(urls[1]) as string[]) published.add(normalizeUrl(url));
    }
    for (const match of markdown.matchAll(/\]\((https?:\/\/[^\s)]+|\/news\/[^\s)]+)\)/g)) {
      const key = byPath.get(match[1]) || normalizeUrl(match[1]);
      if (key) published.add(key);
    }
  }
  return { translations, published };
}

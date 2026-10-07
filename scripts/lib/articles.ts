import type { Article, FetchResult } from '../fetch/types.js';

export function normalizeUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (!['https:', 'http:'].includes(url.protocol)) return '';
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) {
      if (/^utm_/i.test(key) || /^(fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
    }
    url.searchParams.sort();
    url.pathname = url.pathname.replace(/\/$/, '') || '/';
    return url.toString();
  } catch { return ''; }
}

export function evidence(article: Article): 'body' | 'summary' | 'title' {
  if (article.body) return 'body';
  if (!article.content.trim() || article.content.trim() === article.title.trim() || /^Score:\s*\d+\s*\|\s*Comments:/i.test(article.content.trim())) return 'title';
  return 'summary';
}

export function selectArticles(results: FetchResult[], published: Set<string>, date: string, lookbackHours: number, allowRepeats = false) {
  const end = new Date(`${date}T00:00:00+08:00`).getTime() + 86400000;
  const start = end - lookbackHours * 3600000;
  const seen = new Set<string>();
  const articles: Article[] = [];
  const skipped = { stale: 0, duplicate: 0, invalid: 0 };
  for (const result of results) for (const article of result.articles) {
    const key = normalizeUrl(article.url);
    if (!key || !article.title.trim()) { skipped.invalid++; continue; }
    // Undated crawler entries are allowed once; history prevents daily repetition.
    if (article.dateKnown !== false && (!Number.isFinite(article.date.getTime()) || article.date.getTime() < start || article.date.getTime() >= end)) {
      skipped.stale++; continue;
    }
    if (seen.has(key) || (!allowRepeats && published.has(key))) { skipped.duplicate++; continue; }
    seen.add(key);
    articles.push({ ...article });
  }
  return { articles, skipped };
}

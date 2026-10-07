import { existsSync } from 'node:fs';
import { mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { FetchResult } from './fetch/types.js';
import { aiJson } from './ai/provider.js';
import { buildSummaryPrompt, buildHighlightsPrompt, validateSummaries, validateHighlights, type Summary } from './ai/prompts.js';
import { crawlAndTranslateArticle } from './fetch/crawler.js';
import { evidence, selectArticles } from './lib/articles.js';
import { loadHistory } from './lib/history.js';
import { mapLimit, reportDate, setting } from './lib/runtime.js';

export interface GenerationResult {
  status: 'success' | 'partial' | 'no-content' | 'skipped';
  date: string;
  file?: string;
  articleCount: number;
  failedSources: string[];
  skipped?: { stale: number; duplicate: number; invalid: number };
}

function plainMarkdown(text: string): string {
  return text.replace(/\s+/g, ' ').replace(/[\\`*_{}\[\]<>#|]/g, '\\$&');
}

export async function generateDaily(results: FetchResult[], outputDir: string, date = reportDate(), services = { aiJson, crawlAndTranslateArticle, loadHistory }): Promise<GenerationResult> {
  const outputPath = join(outputDir, `${date}.md`);
  const failedSources = results.filter(result => result.error).map(result => result.source);
  const base = { date, articleCount: 0, failedSources };
  if (existsSync(outputPath) && !process.env.FORCE_REGEN) return { ...base, status: 'skipped', file: outputPath };
  if (!results.length || results.every(result => result.error)) throw new Error('All news sources failed or no sources enabled');
  const history = await services.loadHistory(dirname(outputDir), date);
  const { articles, skipped } = selectArticles(results, history.published, date, setting('LOOKBACK_HOURS', 48, 8760), process.env.ALLOW_REPEATS === '1');
  if (!articles.length) return { ...base, skipped, status: 'no-content' };
  console.log(`[generate] Selected ${articles.length} articles; skipped ${JSON.stringify(skipped)}`);
  const localUrls = await mapLimit(articles, setting('AI_CONCURRENCY', 3, 10), article => services.crawlAndTranslateArticle(article, date, join(dirname(outputDir), 'news'), history.translations));
  const supported = articles.map((article, id) => ({ article, id })).filter(({ article }) => evidence(article) !== 'title');
  const batchSize = setting('SUMMARY_BATCH_SIZE', 8, 20);
  const batches = Array.from({ length: Math.ceil(supported.length / batchSize) }, (_, i) => supported.slice(i * batchSize, (i + 1) * batchSize));
  const summaries = (await mapLimit(batches, setting('AI_CONCURRENCY', 3, 10), batch => services.aiJson(buildSummaryPrompt(batch), value => validateSummaries(value, batch.map(row => row.id))))).flat();
  const summaryById = new Map(summaries.map(summary => [summary.id, summary]));
  const highlights = summaries.length ? await services.aiJson(buildHighlightsPrompt(summaries), value => validateHighlights(value, summaries.map(row => row.id))) : [];
  const entries = articles.map((article, id) => {
    const summary: Summary | undefined = summaryById.get(id);
    return {
      id, title: article.title, titleZh: summary?.titleZh || article.title,
      summary: summary?.summary || '仅获取到标题，暂无足够正文生成摘要，请查看原文。',
      topic: summary?.topic || '其他', source: article.source,
      url: localUrls[id] || article.url, originalUrl: article.url,
      evidence: evidence(article),
    };
  });
  const status = failedSources.length || localUrls.some(url => !url) || entries.some(entry => entry.evidence === 'title') ? 'partial' : 'success';
  const metadata = {
    title: `AI News Daily - ${date}`, date, status,
    highlights: highlights.map(row => row.text), highlightSources: highlights.map(row => row.articleIds),
    publishedUrls: articles.map(article => article.url), articles: entries,
  };
  let markdown = '---\n' + Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n') + '\n---\n\n';
  markdown += `> ${date}\n\n## 今日要点\n\n${highlights.length ? highlights.map(row => `- ${plainMarkdown(row.text)}`).join('\n') : '暂无足够正文提炼今日要点，请查看下方原文链接。'}\n\n---\n`;
  for (const source of new Set(entries.map(entry => entry.source))) {
    markdown += `\n## ${plainMarkdown(source)}\n`;
    for (const entry of entries.filter(entry => entry.source === source)) {
      markdown += `\n### ${plainMarkdown(entry.title)}\n\n${plainMarkdown(entry.titleZh)}\n\n${plainMarkdown(entry.summary)}\n\n[Read more →](<${entry.url.replace(/>/g, '%3E')}>)\n\n---\n`;
    }
  }
  await mkdir(outputDir, { recursive: true });
  await writeFile(`${outputPath}.tmp`, markdown, 'utf8');
  await rename(`${outputPath}.tmp`, outputPath);
  return { date, status, file: outputPath, articleCount: entries.length, failedSources, skipped };
}

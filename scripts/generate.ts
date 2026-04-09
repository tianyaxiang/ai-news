import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { FetchResult } from './fetch/types.js';
import { aiGenerate, buildDailyPrompt } from './ai/index.js';
import type { Article } from './fetch/types.js';

function getDateString(date?: Date): string {
  const d = date ?? new Date();
  return d.toISOString().split('T')[0];
}

function groupBySource(results: FetchResult[]): Record<string, Article[]> {
  const grouped: Record<string, Article[]> = {};
  for (const result of results) {
    if (result.articles.length > 0) {
      grouped[result.source] = result.articles;
    }
  }
  return grouped;
}

function buildFrontmatter(date: string): string {
  return `---
title: "AI News Daily - ${date}"
date: "${date}"
---

`;
}

export async function generateDaily(
  results: FetchResult[],
  outputDir: string,
  date?: Date,
): Promise<string> {
  const dateStr = getDateString(date);
  const outputPath = join(outputDir, `${dateStr}.md`);

  if (existsSync(outputPath)) {
    console.log(`[generate] ${outputPath} already exists, skipping.`);
    return outputPath;
  }

  const grouped = groupBySource(results);
  const sourceCount = Object.keys(grouped).length;
  const articleCount = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  if (articleCount === 0) {
    console.warn('[generate] No articles fetched, skipping generation.');
    return '';
  }

  console.log(`[generate] ${articleCount} articles from ${sourceCount} sources`);
  console.log('[generate] Calling AI to generate daily digest...');

  const prompt = buildDailyPrompt(grouped, dateStr);
  const content = await aiGenerate(prompt);

  const markdown = buildFrontmatter(dateStr) + `# AI News Daily / AI 新闻日报\n> ${dateStr}\n\n` + content;

  writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`[generate] Written to ${outputPath}`);

  return outputPath;
}

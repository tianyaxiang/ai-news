import 'dotenv/config';
import './proxy.js';
import { readFileSync, appendFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fetchAll } from './fetch/index.js';
import { generateDaily } from './generate.js';
import type { SourcesConfig } from './fetch/types.js';
import { reportDate } from './lib/runtime.js';
import { aiMetrics } from './ai/provider.js';
import { crawlMetrics } from './fetch/crawler.js';

const ROOT = resolve(import.meta.dirname, '..');
const started = Date.now();
let date = '';

function record(result: Record<string, unknown>) {
  const metrics = { ...result, elapsedMs: Date.now() - started, ai: aiMetrics, crawler: crawlMetrics };
  mkdirSync(resolve(ROOT, '.cache'), { recursive: true });
  writeFileSync(resolve(ROOT, '.cache/run-summary.json'), JSON.stringify(metrics, null, 2));
  console.log('[main] Run summary:', JSON.stringify(metrics));
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `status=${result.status}\ndate=${date}\narticle_count=${result.articleCount || 0}\n`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## 日报生成结果\n\n\`\`\`json\n${JSON.stringify(metrics, null, 2)}\n\`\`\`\n`);
  }
}

async function main() {
  date = reportDate();
  process.env.REPORT_DATE = date;
  const outputDir = resolve(ROOT, 'src/content/daily');
  if (existsSync(resolve(outputDir, `${date}.md`)) && !process.env.FORCE_REGEN) {
    record({ status: 'skipped', date, articleCount: 0 });
    return;
  }
  const config: SourcesConfig = JSON.parse(readFileSync(resolve(ROOT, 'config/sources.json'), 'utf8'));
  const results = await fetchAll(config.sources);
  record({ ...await generateDaily(results, outputDir, date) });
}

main().catch(err => {
  console.error('[main] Fatal error:', err);
  record({ status: 'failure', date, error: err instanceof Error ? err.message : String(err) });
  process.exitCode = 1;
});

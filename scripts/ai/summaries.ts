import type { Article } from '../fetch/types.js';
import { aiJson, AiOutputError } from './provider.js';
import { buildSummaryPrompt, validateSummaries, type Summary } from './prompts.js';

type Input = { id: number; article: Article };

/** Keep unambiguous, valid results only. Duplicate IDs cannot be safely attributed. */
export function collectSummaries(value: unknown, ids: number[]): Summary[] {
  const rows = (value as { articles?: unknown[] })?.articles;
  if (!Array.isArray(rows)) throw new Error('Expected an articles array');
  const counts = new Map<number, number>();
  for (const row of rows) {
    const id = (row as Summary | null)?.id;
    if (typeof id === 'number') counts.set(id, (counts.get(id) || 0) + 1);
  }
  const valid: Summary[] = [];
  for (const row of rows) {
    const id = (row as Summary | null)?.id;
    if (id === undefined || !ids.includes(id) || counts.get(id) !== 1) continue;
    try { valid.push(...validateSummaries({ articles: [row] }, [id])); }
    catch { /* Repair this ID without discarding its valid peers. */ }
  }
  return valid;
}

export async function summarizeBatch(batch: Input[], generate = aiJson) {
  const summaries = new Map<number, Summary>();
  let missing = batch;
  // One initial request, then at most two repair rounds with smaller groups.
  for (let round = 0; round < 3 && missing.length; round++) {
    const size = round === 0 ? missing.length : round === 1 ? Math.max(1, Math.ceil(missing.length / 2)) : 1;
    for (let offset = 0; offset < missing.length; offset += size) {
      const group = missing.slice(offset, offset + size);
      const ids = group.map(item => item.id);
      try {
        const valid = await generate(buildSummaryPrompt(group), value => collectSummaries(value, ids));
        for (const summary of valid) summaries.set(summary.id, summary);
      } catch (err) {
        if (!(err instanceof AiOutputError)) throw err;
        console.warn(`[summary] Invalid output for ids ${ids.join(',')}: ${err.message}`);
      }
    }
    missing = batch.filter(item => !summaries.has(item.id));
    if (missing.length) console.warn(`[summary] Round ${round + 1}: missing ids ${missing.map(item => item.id).join(',')}; ${round < 2 ? 'repairing only these articles' : 'keeping source links without a generated summary'}`);
  }
  return { summaries: batch.flatMap(item => summaries.has(item.id) ? [summaries.get(item.id)!] : []), missingIds: missing.map(item => item.id) };
}

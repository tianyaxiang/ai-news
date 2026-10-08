import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { normalizeUrl, selectArticles, evidence } from '../scripts/lib/articles.js';
import { mapLimit } from '../scripts/lib/runtime.js';
import { loadHistory } from '../scripts/lib/history.js';
import { validateSummaries, validateHighlights } from '../scripts/ai/prompts.js';
import { generateDaily } from '../scripts/generate.js';
import type { Article } from '../scripts/fetch/types.js';

const article = (overrides: Partial<Article> = {}): Article => ({ title: 'Example', url: 'https://example.com/story?id=1', content: 'A source-provided summary.', date: new Date('2026-10-07T00:00:00Z'), source: 'Test', ...overrides });
const result = (articles: Article[]) => [{ source: 'Test', articles, fetchedAt: new Date() }];

test('URL identity retains content parameters and path case, removes tracking', () => {
  assert.notEqual(normalizeUrl('https://example.com/?id=1'), normalizeUrl('https://example.com/?id=2'));
  assert.equal(normalizeUrl('https://EXAMPLE.com/Story?utm_source=feed&b=2&a=1#top'), 'https://example.com/Story?a=1&b=2');
  assert.notEqual(normalizeUrl('https://example.com/A'), normalizeUrl('https://example.com/a'));
  assert.equal(normalizeUrl('javascript:alert(1)'), '');
});

test('selection filters stale, future, invalid and repeated stories while retaining undated new items', () => {
  const published = new Set([normalizeUrl(article().url)]);
  const selected = selectArticles(result([
    article(), article({ url: 'https://example.com/new' }),
    article({ url: 'https://example.com/old', date: new Date('2025-01-01') }),
    article({ url: 'https://example.com/future', date: new Date('2026-10-08') }),
    article({ url: 'https://example.com/undated', dateKnown: false }),
    article({ url: 'javascript:x' }),
  ]), published, '2026-10-07', 48);
  assert.equal(selected.articles.length, 2);
  assert.deepEqual(selected.skipped, { stale: 2, duplicate: 1, invalid: 1 });
  assert.equal(selectArticles(result([article()]), published, '2026-10-07', 48, true).articles.length, 1);
});

test('title-only content is not evidence for a factual summary', () => {
  assert.equal(evidence(article({ content: 'Score: 10 | Comments: 5' })), 'title');
  assert.equal(evidence(article({ content: 'Example' })), 'title');
  assert.equal(evidence(article({ body: 'Fetched body' })), 'body');
});

test('bounded concurrency preserves input order', async () => {
  let running = 0, peak = 0;
  const values = await mapLimit([1, 2, 3, 4, 5], 2, async n => {
    peak = Math.max(peak, ++running);
    await new Promise(resolve => setTimeout(resolve, 5));
    running--;
    return n * 2;
  });
  assert.equal(peak, 2);
  assert.deepEqual(values, [2, 4, 6, 8, 10]);
});

test('summary coverage and highlight citations reject missing, duplicate or invented ids', () => {
  const row = { id: 1, titleZh: '标题', summary: '正文摘要', topic: '工程与开源' };
  assert.throws(() => validateSummaries({ articles: [row] }, [1, 2]));
  assert.throws(() => validateSummaries({ articles: [row, row] }, [1, 2]));
  assert.throws(() => validateHighlights({ highlights: [{ text: '要点', articleIds: [999] }] }, [1]));
  assert.equal(validateSummaries({ articles: [row] }, [1])[0].id, 1);
});

test('history distinguishes translated-only cache from articles actually published', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'news-history-'));
  try {
    await mkdir(join(dir, 'news/2026-10-05'), { recursive: true });
    await mkdir(join(dir, 'daily'));
    await writeFile(join(dir, 'news/2026-10-05/a.md'), '---\noriginalUrl: "https://example.com/a?utm_source=feed"\n---');
    await writeFile(join(dir, 'news/2026-10-05/b.md'), '---\noriginalUrl: "https://example.com/b"\n---');
    await writeFile(join(dir, 'daily/2026-10-05.md'), '[Read more](/news/2026-10-05/a)\n[External](https://example.com/c)');
    await writeFile(join(dir, 'daily/2026-10-07.md'), 'publishedUrls: ["https://example.com/today"]');
    const history = await loadHistory(dir, '2026-10-07');
    assert.equal(history.translations.size, 2);
    assert.deepEqual([...history.published].sort(), ['https://example.com/a', 'https://example.com/c']);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('generation preserves every selected article and writes structured data with safe title-only fallback', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'news-generate-'));
  try {
    let calls = 0;
    const generated = await generateDaily(result([article(), article({ url: 'https://example.com/title', content: '' })]), join(dir, 'daily'), '2026-10-07', {
      loadHistory: async () => ({ translations: new Map(), published: new Set() }),
      crawlAndTranslateArticle: async () => null,
      aiJson: async (_prompt, validate) => {
        calls++;
        return validate(calls === 1 ? { articles: [{ id: 0, titleZh: '中文标题', summary: '已有来源支持的摘要。', topic: '其他' }] } : { highlights: [{ text: '已有来源支持的要点。', articleIds: [0] }] });
      },
    });
    assert.equal(generated.status, 'partial');
    assert.equal(generated.articleCount, 2);
    assert.equal(calls, 2);
    const markdown = await readFile(generated.file!, 'utf8');
    assert.match(markdown, /^highlights: \["已有来源支持的要点。"\]/m);
    assert.match(markdown, /仅获取到标题/);
    assert.match(markdown, /https:\/\/example.com\/title/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('all-source failure is fatal but malformed summaries preserve source links in a partial report', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'news-failure-'));
  try {
    await assert.rejects(generateDaily([{ ...result([])[0], error: 'offline' }], dir, '2026-10-07'), /All news sources/);
    const partial = await generateDaily(result([article()]), dir, '2026-10-07', {
      loadHistory: async () => ({ translations: new Map(), published: new Set() }),
      crawlAndTranslateArticle: async () => null,
      aiJson: async (_prompt, validate) => validate({ articles: [] }),
    });
    assert.equal(partial.status, 'partial');
    assert.deepEqual(partial.missingSummaryIds, [0]);
    assert.match(await readFile(partial.file!, 'utf8'), /摘要暂不可用/);
    const empty = await generateDaily(result([]), dir, '2026-10-08');
    assert.equal(empty.status, 'no-content');
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('an incomplete batch repairs missing articles instead of aborting the daily report', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'news-incomplete-'));
  try {
    let attempts = 0;
    const row = (id: number) => ({ id, titleZh: `标题 ${id}`, summary: `来源支持的摘要 ${id}`, topic: '其他' });
    const generated = await generateDaily(result([article(), article({ url: 'https://example.com/second' })]), dir, '2026-10-07', {
      loadHistory: async () => ({ translations: new Map(), published: new Set() }),
      crawlAndTranslateArticle: async () => null,
      aiJson: async (prompt, validate) => {
        if (prompt.includes('"highlights"')) return validate({ highlights: [{ text: '要点一', articleIds: [0] }, { text: '要点二', articleIds: [1] }] });
        attempts++;
        if (attempts === 1) return validate({ articles: [row(0)] });
        const inputs = JSON.parse(prompt.split('\n').at(-1)!);
        return validate({ articles: inputs.map((input: { id: number }) => row(input.id)) });
      },
    });
    assert.equal(generated.articleCount, 2);
    assert.match(await readFile(generated.file!, 'utf8'), /来源支持的摘要 1/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('duplicate, unknown and invalid summary IDs do not overwrite valid results', async () => {
  const { collectSummaries } = await import('../scripts/ai/summaries.js');
  const row = (id: number) => ({ id, titleZh: '标题', summary: '来源摘要', topic: '其他' });
  assert.deepEqual(collectSummaries({ articles: [row(0), row(1), row(1), row(99), { ...row(2), summary: '' }] }, [0, 1, 2]).map(row => row.id), [0]);
});

test('malformed highlights fall back to validated summaries without inventing content', async () => {
  const { AiOutputError } = await import('../scripts/ai/provider.js');
  const dir = await mkdtemp(join(tmpdir(), 'news-highlights-'));
  try {
    const generated = await generateDaily(result([article()]), dir, '2026-10-07', {
      loadHistory: async () => ({ translations: new Map(), published: new Set() }),
      crawlAndTranslateArticle: async () => null,
      aiJson: async (prompt, validate) => {
        if (prompt.includes('"highlights"')) throw new AiOutputError('Invalid highlight count');
        return validate({ articles: [{ id: 0, titleZh: '标题', summary: '经过验证的来源摘要。', topic: '其他' }] });
      },
    });
    assert.equal(generated.highlightsFallback, true);
    assert.equal(generated.status, 'partial');
    assert.match(await readFile(generated.file!, 'utf8'), /^highlights: \["经过验证的来源摘要。"\]/m);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('121-article replay recovers omitted rows without re-requesting valid IDs', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'news-replay-'));
  const completed = new Set<number>();
  try {
    const input = Array.from({ length: 121 }, (_, id) => article({ title: `Story ${id}`, url: `https://example.com/story?id=${id}` }));
    const generated = await generateDaily(result(input), dir, '2026-10-07', {
      loadHistory: async () => ({ translations: new Map(), published: new Set() }),
      crawlAndTranslateArticle: async () => null,
      aiJson: async (prompt, validate) => {
        if (prompt.includes('"highlights"')) return validate({ highlights: [0, 1, 2].map(id => ({ text: `要点 ${id}`, articleIds: [id] })) });
        const inputs = JSON.parse(prompt.split('\n').at(-1)!) as { id: number }[];
        for (const { id } of inputs) assert.equal(completed.has(id), false, `valid ID ${id} was requested again`);
        const returned = inputs.length > 1 ? inputs.slice(0, -1) : inputs;
        returned.forEach(({ id }) => completed.add(id));
        return validate({ articles: returned.map(({ id }) => ({ id, titleZh: `标题 ${id}`, summary: `摘要 ${id}`, topic: '其他' })) });
      },
    });
    assert.equal(generated.articleCount, 121);
    assert.equal(completed.size, 121);
    assert.deepEqual(generated.missingSummaryIds, []);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

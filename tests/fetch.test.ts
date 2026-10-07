import test from 'node:test';
import assert from 'node:assert/strict';

// Use deterministic in-memory HTTP responses; never contact source sites.
for (const key of ['HTTPS_PROXY', 'HTTP_PROXY', 'https_proxy', 'http_proxy', 'ALL_PROXY', 'all_proxy']) delete process.env[key];
const { proxyFetch, retryDelay } = await import('../scripts/proxy.js');
const { default: rss } = await import('../scripts/fetch/plugins/rss.js');

test('Retry-After seconds and HTTP dates are respected and bounded', () => {
  assert.equal(retryDelay('2', 0), 2000);
  assert.equal(retryDelay('Wed, 07 Oct 2026 00:00:02 GMT', 0, Date.parse('2026-10-07T00:00:00Z')), 2000);
  assert.equal(retryDelay('9999', 0), 30000);
});

test('429 retries with a fresh signal; permanent 404 does not retry', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  const signals: AbortSignal[] = [];
  try {
    globalThis.fetch = async (_url, init) => {
      signals.push(init!.signal!);
      return ++calls === 1 ? new Response('slow down', { status: 429, headers: { 'retry-after': '0' } }) : new Response('ok');
    };
    assert.equal(await (await proxyFetch('https://example.invalid')).text(), 'ok');
    assert.equal(calls, 2);
    assert.notEqual(signals[0], signals[1]);
    calls = 0;
    globalThis.fetch = async () => { calls++; return new Response('', { status: 404 }); };
    assert.equal((await proxyFetch('https://example.invalid')).status, 404);
    assert.equal(calls, 1);
  } finally { globalThis.fetch = original; }
});

test('fetch timeout aborts a stalled attempt and caller cancellation is preserved', async () => {
  const original = globalThis.fetch;
  const keepAlive = setInterval(() => {}, 100);
  try {
    globalThis.fetch = async (_url, init) => new Promise((_resolve, reject) => {
      init!.signal!.addEventListener('abort', () => reject(init!.signal!.reason), { once: true });
    });
    await assert.rejects(proxyFetch('https://example.invalid', { retries: 0, timeoutMs: 5 }), { name: 'TimeoutError' });
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(proxyFetch('https://example.invalid', { signal: controller.signal }), { name: 'AbortError' });
  } finally { clearInterval(keepAlive); globalThis.fetch = original; }
});

test('RSS freshness is applied before maxItems and missing dates remain explicit', async () => {
  const original = globalThis.fetch;
  const previousDate = process.env.REPORT_DATE;
  process.env.REPORT_DATE = '2026-10-07';
  try {
    globalThis.fetch = async () => new Response(`<rss version="2.0"><channel><title>Test</title>
      <item><title>Old</title><link>https://example.com/old</link><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate></item>
      <item><title>New</title><link>https://example.com/new</link><pubDate>Wed, 07 Oct 2026 00:00:00 GMT</pubDate></item>
      <item><title>Undated</title><link>https://example.com/undated</link></item>
    </channel></rss>`);
    const articles = await rss.fetch({ name: 'Test', type: 'rss', plugin: 'rss', url: 'https://example.invalid/rss', maxItems: 2 });
    assert.deepEqual(articles.map(article => article.title), ['New', 'Undated']);
    assert.equal(articles[1].dateKnown, false);
  } finally {
    globalThis.fetch = original;
    if (previousDate === undefined) delete process.env.REPORT_DATE; else process.env.REPORT_DATE = previousDate;
  }
});

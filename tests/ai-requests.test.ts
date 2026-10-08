import test from 'node:test';
import assert from 'node:assert/strict';
import { createAiRunner, failureInfo } from '../scripts/ai/requests.js';

function clock() {
  let time = 0;
  return { now: () => time, sleep: async (ms: number) => { await new Promise<void>(resolve => setImmediate(resolve)); time += ms; } };
}
const limited = () => ({ statusCode: 429, responseBody: JSON.stringify({ error: { message: 'Quota exceeded, Please retry in 59.501138367s.', details: [{ '@type': 'type.googleapis.com/google.rpc.RetryInfo', retryDelay: '59.501138367s' }] } }) });

test('Gemini quota retry delay survives SDK wrappers and fractional seconds', () => {
  assert.equal(failureInfo({ lastError: limited() }).retryAfterMs, 59502);
  assert.equal(failureInfo({ statusCode: 429, responseHeaders: { 'retry-after': '60' } }).retryAfterMs, 60000);
  assert.equal(failureInfo({ statusCode: 429, message: 'quota exceeded', responseHeaders: { 'retry-after': 'Thu, 08 Oct 2026 00:01:00 GMT' } }, Date.parse('2026-10-08T00:00:00Z')).retryAfterMs, 60000);
});

test('concurrent AI callers share request spacing', async () => {
  const time = clock();
  const starts: number[] = [];
  const run = createAiRunner({ requestsPerMinute: 12, ...time });
  await Promise.all(Array.from({ length: 20 }, () => run(async () => { starts.push(time.now()); return 'ok'; })));
  for (let i = 1; i < starts.length; i++) assert.ok(starts[i] - starts[i - 1] >= 5000);
});

test('retry waits for the server cooldown instead of exhausting retries immediately', async () => {
  const time = clock();
  const starts: number[] = [];
  const run = createAiRunner({ requestsPerMinute: 12, ...time });
  assert.equal(await run(async () => { starts.push(time.now()); if (starts.length === 1) throw limited(); return 'ok'; }), 'ok');
  assert.ok(starts[1] - starts[0] >= 60502);
});

test('daily quota stops later callers without repeating doomed requests', async () => {
  const time = clock();
  const run = createAiRunner({ requestsPerMinute: 12, ...time });
  let calls = 0;
  await assert.rejects(run(async () => { calls++; throw { statusCode: 429, message: 'quota exceeded: GenerateRequestsPerDayPerProject' }; }), /quota unavailable/);
  await assert.rejects(run(async () => { calls++; return 'unexpected'; }), /quota unavailable/);
  assert.equal(calls, 1);
});

test('a cooldown from one caller also holds queued callers', async () => {
  const time = clock();
  const run = createAiRunner({ requestsPerMinute: 12, ...time });
  let attempts = 0;
  const otherStarts: number[] = [];
  await Promise.all([
    run(async () => { if (++attempts === 1) throw limited(); return 'recovered'; }),
    run(async () => { otherStarts.push(time.now()); return 'other'; }),
  ]);
  assert.ok(otherStarts[0] >= 60502);
});

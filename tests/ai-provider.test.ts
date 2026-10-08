import test from 'node:test';
import assert from 'node:assert/strict';

process.env.AI_PROVIDER = 'google';
process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-only';
process.env.AI_REQUESTS_PER_MINUTE = '600';
const { aiGenerate, aiJson, aiMetrics } = await import('../scripts/ai/provider.js');

test('real provider path spaces concurrent translation/JSON requests through the shared gate', async () => {
  const original = globalThis.fetch;
  const starts: number[] = [];
  try {
    globalThis.fetch = async () => {
      starts.push(Date.now());
      return new Response(JSON.stringify({ candidates: [{ content: { role: 'model', parts: [{ text: '{"ok":true}' }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1, totalTokenCount: 2 } }), { headers: { 'Content-Type': 'application/json' } });
    };
    await Promise.all([aiGenerate('translation'), aiJson('summary', value => value), aiJson('highlights', value => value)]);
    assert.equal(starts.length, 3);
    for (let i = 1; i < starts.length; i++) assert.ok(starts[i] - starts[i - 1] >= 80, `requests started only ${starts[i] - starts[i - 1]}ms apart`);
  } finally { globalThis.fetch = original; }
});

test('aiJson does not retry an authentication failure as malformed output', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  const before = aiMetrics.requests;
  try {
    globalThis.fetch = async () => {
      calls++;
      return new Response(JSON.stringify({ error: { code: 403, status: 'PERMISSION_DENIED', message: 'Test permission failure' } }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    };
    await assert.rejects(aiJson('summary', value => value), /authentication\/permission/);
    assert.equal(calls, 1);
    assert.equal(aiMetrics.requests - before, 1);
  } finally { globalThis.fetch = original; }
});

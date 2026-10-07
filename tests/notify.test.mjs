import test from 'node:test';
import assert from 'node:assert/strict';
import { extractHighlights } from '../src/lib/digest.mjs';
import { buildPayload, validateResponse } from '../scripts/notify.mjs';

test('structured and legacy highlights remain readable', () => {
  assert.deepEqual(extractHighlights('---\nhighlights: ["一", "二"]\n---\n## 今日要点\n- 旧'), ['一', '二']);
  assert.deepEqual(extractHighlights('## 今日要点\r\n\r\n- **一**\r\n- 二\r\n\r\n---\r\n## News\n- 不要包含'), ['**一**', '二']);
  assert.deepEqual(extractHighlights('## 今日要点\n- 最后一项'), ['最后一项']);
  assert.deepEqual(extractHighlights('## 其他内容'), []);
});

test('only completion messages include highlights across all providers', () => {
  for (const type of ['wecom', 'wechat', 'qywx', 'dingtalk', 'ding', 'feishu', 'lark', 'slack', 'generic']) {
    for (const status of ['success', 'partial', 'start', 'failure', 'no-content']) {
      assert.equal(JSON.stringify(buildPayload(type, status, '', ['测试要点'])).includes('测试要点'), ['success', 'partial'].includes(status));
    }
  }
});

test('Chinese highlights respect WeCom byte budget without splitting a takeaway', () => {
  const items = Array.from({ length: 10 }, (_, i) => `${i}：${'中文要点'.repeat(60)}`);
  const payload = buildPayload('wecom', 'partial', '', items);
  assert.ok(Buffer.byteLength(payload.text.content, 'utf8') <= 2048);
  assert.ok(payload.text.content.includes(items[0]));
  assert.ok(payload.text.content.includes('其余要点请查看日报'));
  const slack = buildPayload('slack', 'success', '', items);
  assert.ok(slack.blocks[0].text.text.length <= 3000);
});

test('HTTP success with provider business failure is rejected', () => {
  for (const type of ['wecom', 'dingtalk']) {
    assert.doesNotThrow(() => validateResponse(type, '{"errcode":0}'));
    assert.throws(() => validateResponse(type, '{"errcode":40001}'));
  }
  assert.doesNotThrow(() => validateResponse('feishu', '{"code":0}'));
  assert.doesNotThrow(() => validateResponse('lark', '{"StatusCode":0}'));
  assert.throws(() => validateResponse('feishu', '{"code":999}'));
  assert.doesNotThrow(() => validateResponse('slack', 'ok'));
  assert.throws(() => validateResponse('slack', 'invalid_payload'));
});

#!/usr/bin/env node
/**
 * Webhook notification script.
 *
 * Usage: node scripts/notify.mjs <start|success|partial|no-content|failure>
 *
 * Env vars:
 *   WEBHOOK_URL   - Required. The webhook endpoint URL.
 *   WEBHOOK_TYPE  - Optional. One of: wecom (default) | dingtalk | feishu | slack | generic
 *   SITE_URL      - Optional. The site URL to include in the notification.
 *   REPORT_DATE   - Optional. The report date (YYYY-MM-DD).
 *   RUN_URL       - Optional. The GitHub Actions run URL (used on failure).
 */

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { extractHighlights, plainText as stripMarkdown } from '../src/lib/digest.mjs';

const [, , status = 'success'] = process.argv;

const webhookUrl = process.env.WEBHOOK_URL;
const webhookType = (process.env.WEBHOOK_TYPE || 'wecom').toLowerCase();
const siteUrl = process.env.SITE_URL || '';
const reportDate = process.env.REPORT_DATE || new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
const runUrl = process.env.RUN_URL || '';


/** Build request body based on webhook type */
export function buildPayload(type, status, weather = '', highlights = []) {
  const isSuccess = status === 'success' || status === 'partial';
  const isStart = status === 'start';
  let title = '';
  if (isStart) {
    title = `AI News Daily · ${reportDate} 开始生成`;
  } else if (isSuccess) {
    title = `AI News Daily · ${reportDate} 已生成${status === 'partial' ? '（部分内容降级）' : ''}`;
  } else if (status === 'no-content') {
    title = `AI News Daily · ${reportDate} 暂无新内容`;
  } else {
    title = `AI News Daily · ${reportDate} 生成失败`;
  }

  const dailyUrl = siteUrl ? `${siteUrl.replace(/\/$/, '')}/daily/${reportDate}` : '';

  const budget = ['wecom', 'wechat', 'qywx'].includes(type) ? 1900 : type === 'slack' ? 2800 : 16000;
  const measure = type === 'slack' ? value => value.length : value => Buffer.byteLength(value, 'utf8');
  const selected = [];
  const footer = '其余要点请查看日报。';
  for (const item of highlights) {
    const next = [...selected, item];
    if (measure([title, reportDate, dailyUrl, runUrl, '今日要点', footer, ...next].join('\n')) + 160 > budget) break;
    selected.push(item);
  }
  const truncated = selected.length < highlights.length;
  const plainHighlights = selected.map(item => `- ${stripMarkdown(item)}`).join('\n');
  const markdownHighlights = selected.map(item => `- ${item}`).join('\n');

  let textLines = [];
  let markdownLines = [];

  if (isStart) {
    textLines = [
      `▶️ ${title}`,
      ``,
      `日期: ${reportDate}`,
      weather ? `北京天气: ${weather}` : '',
      runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**▶️ ${title}**`,
      ``,
      `日期: ${reportDate}`,
      weather ? `北京天气: ${weather}` : '',
      runUrl ? `查看日志: [GitHub Actions](${runUrl})` : '',
    ].filter(Boolean);
  } else if (isSuccess) {
    textLines = [
      title,
      ``,
      `日期: ${reportDate}`,
      dailyUrl ? `今日日报: ${dailyUrl}` : '',
      highlights.length ? `\n今日要点\n${plainHighlights}${truncated ? `\n${footer}` : ''}` : '',
      status === 'partial' ? '部分来源或文章未能完整处理。' : '',
      status === 'partial' && runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**${title}**`,
      ``,
      `日期: ${reportDate}`,
      dailyUrl ? `今日日报: [查看日报](${dailyUrl})` : '',
      highlights.length ? `\n**今日要点**\n${markdownHighlights}${truncated ? `\n${footer}` : ''}` : '',
      status === 'partial' ? '部分来源或文章未能完整处理。' : '',
      status === 'partial' && runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);
  } else {
    textLines = [
      `${status === 'no-content' ? 'ℹ️' : '❌'} ${title}`,
      ``,
      `日期: ${reportDate}`,
      runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**${status === 'no-content' ? 'ℹ️' : '❌'} ${title}**`,
      ``,
      `日期: ${reportDate}`,
      runUrl ? `查看日志: [GitHub Actions](${runUrl})` : '',
    ].filter(Boolean);
  }

  const plainText = textLines.join('\n');
  const markdown = markdownLines.join('\n');

  switch (type) {
    case 'wecom':
    case 'wechat':
    case 'qywx':
      // Enterprise WeChat (企业微信) webhook - text type
      return {
        msgtype: 'text',
        text: { content: plainText },
      };

    case 'dingtalk':
    case 'ding':
      // DingTalk (钉钉) webhook
      return {
        msgtype: 'markdown',
        markdown: { title, text: markdown },
      };

    case 'feishu':
    case 'lark':
      // Feishu / Lark (飞书) webhook
      return {
        msg_type: 'interactive',
        card: {
          header: {
            title: { tag: 'plain_text', content: title },
            template: isSuccess ? 'green' : 'red',
          },
          elements: [
            { tag: 'markdown', content: markdown },
          ],
        },
      };

    case 'slack':
      return {
        text: title,
        blocks: [
          {
            type: 'section',
            text: { type: 'mrkdwn', text: markdown },
          },
        ],
      };

    case 'generic':
    default:
      // Generic JSON payload
      return {
        status,
        title,
        date: reportDate,
        siteUrl,
        runUrl,
        text: plainText,
        markdown,
      };
  }
}
async function getHighlights() {
  try {
    const report = await readFile(
      new URL(`../src/content/daily/${reportDate}.md`, import.meta.url),
      'utf8',
    );
    return extractHighlights(report);
  } catch (err) {
    console.warn(`[notify] Could not read today's highlights: ${err instanceof Error ? err.message : err}`);
    return [];
  }
}

async function getWeather() {
  try {
    const res = await fetch('https://wttr.in/Beijing?format=%c+%t&m', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      return (await res.text()).trim();
    }
  } catch (err) {
    console.error('[notify] Failed to fetch weather:', err);
  }
  return '';
}

export async function main() {
  if (!webhookUrl) {
    console.log('[notify] WEBHOOK_URL not set, skipping notification.');
    return;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reportDate)) throw new Error('Invalid REPORT_DATE');
  let weather = '';
  if (status === 'start') {
    weather = await getWeather();
  }

  const highlights = ['success', 'partial'].includes(status) ? await getHighlights() : [];
  const payload = buildPayload(webhookType, status, weather, highlights);

  console.log(`[notify] Sending ${status} notification via ${webhookType} webhook...`);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error(`[notify] Webhook returned HTTP ${res.status}: ${text}`);
      throw new Error(`Webhook HTTP ${res.status}`);
    }

    validateResponse(webhookType, text);
    console.log(`[notify] Sent successfully. Response: ${text.slice(0, 200)}`);
  } catch (err) {
    console.error(`[notify] Failed to send webhook: ${err instanceof Error ? err.message : err}`);
    throw err;
  }
}

export function validateResponse(type, text) {
  if (type === 'slack') {
    if (text.trim() !== 'ok') throw new Error(`Slack rejected notification: ${text}`);
    return;
  }
  if (!['wecom', 'wechat', 'qywx', 'dingtalk', 'ding', 'feishu', 'lark'].includes(type)) return;
  const body = JSON.parse(text);
  const code = ['feishu', 'lark'].includes(type) ? (body.code ?? body.StatusCode) : body.errcode;
  if (code !== 0) throw new Error(`Webhook rejected notification: ${text}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => { process.exitCode = 1; });
}

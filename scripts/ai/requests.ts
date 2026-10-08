export class AiRequestError extends Error {
  constructor(message: string, readonly kind: 'quota' | 'auth' | 'transient', readonly permanent = false) {
    super(message);
    this.name = 'AiRequestError';
  }
}

/** Inspect provider error data, including SDK retry wrappers and Gemini RetryInfo. */
export function failureInfo(error: unknown, now = Date.now()) {
  const queue: unknown[] = [error];
  const visited = new Set<unknown>();
  let status = 0, text = '', retryAfterMs = 0;
  for (let i = 0; i < queue.length && i < 12; i++) {
    const item = queue[i];
    if (!item || typeof item !== 'object' || visited.has(item)) continue;
    visited.add(item);
    const value = item as Record<string, any>;
    status ||= Number(value.statusCode || value.status || 0);
    text += ` ${typeof value.message === 'string' ? value.message : ''}`;
    const headers = value.responseHeaders;
    const header = headers?.['retry-after'] ?? headers?.['Retry-After'];
    if (header != null) {
      const number = Number(header);
      const delay = Number.isFinite(number) ? number * 1000 : Date.parse(header) - now;
      if (Number.isFinite(delay)) retryAfterMs = Math.max(retryAfterMs, delay);
    }
    if (typeof value.responseBody === 'string') {
      text += ` ${value.responseBody}`;
      try { queue.push(JSON.parse(value.responseBody)); } catch { /* Non-JSON provider response. */ }
    }
    if (value.error) queue.push(value.error);
    if (value.cause) queue.push(value.cause);
    if (value.lastError) queue.push(value.lastError);
    if (Array.isArray(value.details)) {
      for (const detail of value.details) {
        if (typeof detail.retryDelay === 'string' && /^\d+(\.\d+)?s$/.test(detail.retryDelay)) {
          retryAfterMs = Math.max(retryAfterMs, parseFloat(detail.retryDelay) * 1000);
        }
        text += ` ${JSON.stringify(detail)}`;
      }
    }
  }
  for (const match of text.matchAll(/(?:retry in|retryDelay"\s*:\s*")(\s*\d+(?:\.\d+)?)s/gi)) {
    retryAfterMs = Math.max(retryAfterMs, Number(match[1]) * 1000);
  }
  const quota = status === 429 || /quota exceeded|RESOURCE_EXHAUSTED|insufficient_quota/i.test(text);
  const permanent = quota && /PerDay|per.day|daily|insufficient_quota|limit:\s*0\b|quotaValue"\s*:\s*"?0\b/i.test(text);
  const auth = status === 401 || status === 403;
  return { status, quota, permanent, auth, retryAfterMs: Math.ceil(retryAfterMs), retryable: quota || status >= 500 || /ECONNRESET|ETIMEDOUT|fetch failed|TimeoutError/.test(text) };
}

interface RunnerOptions {
  requestsPerMinute: number;
  maxRetries?: number;
  maxCooldownMs?: number;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  onRetry?: (ms: number) => void;
}

/** One shared gate for all translation, summary, highlight and retry requests. */
export function createAiRunner({ requestsPerMinute, maxRetries = 2, maxCooldownMs = 120000, now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), onRetry = () => {} }: RunnerOptions) {
  const interval = Math.ceil(60000 / requestsPerMinute);
  let nextStart = 0;
  let gate = Promise.resolve();
  let blocked: AiRequestError | undefined;
  async function acquire() {
    const previous = gate;
    let release!: () => void;
    gate = new Promise<void>(resolve => { release = resolve; });
    await previous;
    try {
      if (blocked) throw blocked;
      while (now() < nextStart) {
        await sleep(nextStart - now());
        if (blocked) throw blocked;
      }
      nextStart = now() + interval;
    } finally { release(); }
  }
  return async function run<T>(request: () => Promise<T>): Promise<T> {
    for (let attempt = 0; ; attempt++) {
      await acquire();
      try { return await request(); }
      catch (err) {
        const info = failureInfo(err, now());
        if (info.auth || info.permanent || info.retryAfterMs > maxCooldownMs) {
          blocked = new AiRequestError(info.auth ? 'AI authentication/permission rejected' : 'AI quota unavailable for this run; remaining requests stopped', info.auth ? 'auth' : 'quota', true);
          throw blocked;
        }
        if (!info.retryable) throw err;
        const delay = Math.max(info.retryAfterMs + (info.retryAfterMs ? 1000 : 0), 2000 * 2 ** attempt);
        // Publish the cooldown before queued callers acquire their next slot.
        nextStart = Math.max(nextStart, now() + delay);
        if (attempt >= maxRetries) throw new AiRequestError(`AI ${info.quota ? 'rate limit' : 'request failure'} persisted after ${attempt + 1} attempts`, info.quota ? 'quota' : 'transient');
        onRetry(delay);
      }
    }
  };
}

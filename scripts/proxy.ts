import { HttpsProxyAgent } from 'https-proxy-agent';
import { setting } from './lib/runtime.js';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.https_proxy || process.env.http_proxy || process.env.ALL_PROXY || process.env.all_proxy;
const proxyAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;
if (proxyAgent) console.log('[proxy] Proxy enabled');

async function fetchOnce(url: string | URL | Request, init: RequestInit): Promise<Response> {
  if (!proxyAgent) return fetch(url, init);
  const nodeFetch = (await import('node-fetch')).default;
  return await nodeFetch(url.toString(), { ...(init as any), agent: proxyAgent }) as unknown as Response;
}

export function retryDelay(header: string | null, attempt: number, now = Date.now()): number {
  if (header) {
    const seconds = Number(header);
    const ms = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(header) - now;
    if (Number.isFinite(ms)) return Math.min(30000, Math.max(0, ms));
  }
  return Math.min(10000, 1000 * 2 ** attempt) + Math.floor(Math.random() * 250);
}

/** Each attempt has a fresh timeout. The signal also bounds response body reads. */
export async function proxyFetch(url: string | URL | Request, init: RequestInit & { retries?: number; timeoutMs?: number } = {}): Promise<Response> {
  const { retries = 2, timeoutMs = setting('FETCH_TIMEOUT_MS', 15000, 120000), ...options } = init;
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    options.signal?.throwIfAborted();
    let delay = retryDelay(null, attempt);
    try {
      const timeout = AbortSignal.timeout(timeoutMs);
      const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
      const res = await fetchOnce(url, { ...options, signal });
      if ((res.status !== 429 && res.status < 500) || attempt === retries) return res;
      delay = retryDelay(res.headers.get('retry-after'), attempt);
      // Drain the response while its timeout is active before retrying.
      await res.arrayBuffer().catch(() => {});
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
      options.signal?.throwIfAborted();
    }
    if (attempt < retries) {
      console.warn(`[fetch] Retry ${attempt + 1}/${retries} in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError ?? new Error('Request failed');
}

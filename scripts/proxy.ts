import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl =
  process.env.HTTPS_PROXY ||
  process.env.HTTP_PROXY ||
  process.env.https_proxy ||
  process.env.http_proxy ||
  process.env.ALL_PROXY ||
  process.env.all_proxy;

let proxyAgent: HttpsProxyAgent<string> | undefined;

if (proxyUrl) {
  console.log(`[proxy] Using proxy: ${proxyUrl}`);
  proxyAgent = new HttpsProxyAgent(proxyUrl);
}

/**
 * Fetch wrapper with automatic proxy support.
 * - No proxy configured → uses native fetch directly.
 * - Proxy configured → tries node-fetch with proxy agent,
 *   falls back to native fetch if that fails (for TLS-incompatible sites).
 */
export async function proxyFetch(
  url: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  if (!proxyAgent) {
    return fetch(url, init);
  }

  try {
    const nodeFetch = (await import('node-fetch')).default;
    const res = await nodeFetch(url.toString(), {
      ...(init as any),
      agent: proxyAgent,
    });
    return res as unknown as Response;
  } catch (err) {
    // Fallback to native fetch (without proxy) for sites where node-fetch + proxy fails
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[proxy] node-fetch failed for ${url.toString().slice(0, 60)}..., fallback to native fetch: ${msg}`);
    return fetch(url, init);
  }
}

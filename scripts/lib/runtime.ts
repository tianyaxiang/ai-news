export function setting(name: string, fallback: number, max = 1000): number {
  const value = process.env[name];
  if (!value) return fallback;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > max) {
    throw new Error(`${name} must be an integer between 1 and ${max}`);
  }
  return number;
}

export function reportDate(now = new Date()): string {
  const date = process.env.REPORT_DATE || now.toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error(`Invalid REPORT_DATE: ${date}`);
  }
  return date;
}

export async function mapLimit<T, R>(items: T[], concurrency: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error('Invalid concurrency');
  const results = new Array<R>(items.length);
  let next = 0;
  let failed = false;
  let error: unknown;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (!failed && next < items.length) {
      const index = next++;
      try { results[index] = await fn(items[index], index); }
      catch (err) { failed = true; error = err; }
    }
  }));
  if (failed) throw error;
  return results;
}

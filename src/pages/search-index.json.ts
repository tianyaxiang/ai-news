import { getCollection } from 'astro:content';
import { extractHighlights, plainText } from '../lib/digest.mjs';
export async function GET() {
  const posts = (await getCollection('daily')).sort((a, b) => b.data.date.localeCompare(a.data.date));
  return new Response(JSON.stringify(posts.map(post => ({
    url: `/daily/${post.id}`, date: post.data.date, title: post.data.title,
    text: plainText([
      post.data.title, post.data.date, ...(post.data.highlights || extractHighlights(post.body)),
      ...(post.body || '').match(/^#{2,3}\s+.+$/gm) || [],
      ...(post.data.articles || []).map(article => `${article.title} ${article.titleZh} ${article.source} ${article.topic}`),
    ].join(' ')).toLocaleLowerCase(),
  }))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

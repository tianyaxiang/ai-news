import type { SourcePlugin, SourceConfig, Article } from '../../types.js';

interface PHNode {
  id: string;
  name: string;
  tagline: string;
  url: string;
  votesCount: number;
  createdAt: string;
  topics?: { edges: { node: { name: string } }[] };
}

const producthuntPlugin: SourcePlugin = {
  name: 'producthunt',
  type: 'api',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 10;
    const apiToken = config.options?.apiToken as string | undefined;

    // Product Hunt requires API token — if not provided, fall back to RSS
    if (!apiToken) {
      console.warn('Product Hunt: No API token provided, using RSS feed fallback.');
      const { default: rssPlugin } = await import('../rss.js');
      return rssPlugin.fetch({
        ...config,
        url: 'https://www.producthunt.com/feed',
        plugin: 'rss',
      });
    }

    const query = `
      query {
        posts(first: ${maxItems}, order: VOTES) {
          edges {
            node {
              id
              name
              tagline
              url
              votesCount
              createdAt
              topics(first: 3) {
                edges { node { name } }
              }
            }
          }
        }
      }
    `;

    const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`Product Hunt API error: ${res.status}`);

    const data = await res.json() as { data: { posts: { edges: { node: PHNode }[] } } };
    const posts = data.data.posts.edges.map(e => e.node);

    return posts.map(post => ({
      title: post.name,
      url: post.url,
      content: post.tagline,
      date: new Date(post.createdAt),
      source: config.name,
      tags: post.topics?.edges.map(e => e.node.name) ?? [],
    }));
  },
};

export default producthuntPlugin;

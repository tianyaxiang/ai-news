import type { SourcePlugin, SourceConfig, Article } from '../../types.js';

interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
  text?: string;
}

const HN_API = 'https://hacker-news.firebaseio.com/v0';

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

const hackernewsPlugin: SourcePlugin = {
  name: 'hackernews',
  type: 'api',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 15;
    const storyType = (config.options?.storyType as string) ?? 'top';

    const storyIds = await fetchJSON<number[]>(`${HN_API}/${storyType}stories.json`);
    const topIds = storyIds.slice(0, maxItems);

    const stories = await Promise.all(
      topIds.map(id => fetchJSON<HNStory>(`${HN_API}/item/${id}.json`))
    );

    return stories
      .filter(story => story && story.title)
      .map(story => ({
        title: story.title,
        url: story.url ?? `https://news.ycombinator.com/item?id=${story.id}`,
        content: story.text ?? `Score: ${story.score} | Comments: ${story.descendants ?? 0}`,
        date: new Date(story.time * 1000),
        source: config.name,
        author: story.by,
        tags: ['hackernews'],
      }));
  },
};

export default hackernewsPlugin;

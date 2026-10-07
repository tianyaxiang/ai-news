import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const daily = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/daily' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    highlights: z.array(z.string()).optional(),
    status: z.enum(['success', 'partial']).optional(),
    articles: z.array(z.object({
      id: z.number(), title: z.string(), titleZh: z.string(), summary: z.string(),
      topic: z.string(), source: z.string(), url: z.string(), originalUrl: z.string(),
      evidence: z.enum(['body', 'summary', 'title']),
    })).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    originalUrl: z.string(),
    date: z.coerce.string(),
  }),
});

export const collections = { daily, news };

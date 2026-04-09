import type { Article } from '../fetch/types.js';

export function buildDailyPrompt(groupedArticles: Record<string, Article[]>, date: string): string {
  let articleList = '';

  for (const [source, articles] of Object.entries(groupedArticles)) {
    articleList += `\n## Source: ${source}\n`;
    for (const article of articles) {
      articleList += `- Title: ${article.title}\n`;
      articleList += `  URL: ${article.url}\n`;
      articleList += `  Content: ${article.content.slice(0, 500)}\n`;
      if (article.author) articleList += `  Author: ${article.author}\n`;
      articleList += '\n';
    }
  }

  return `You are a professional tech news editor. Generate a bilingual (English and Chinese) daily news digest for ${date}.

Here are today's articles from various sources:

${articleList}

Please generate a well-structured Markdown news digest following these rules:

1. Group articles by source
2. For each article, provide:
   - The original English title
   - A Chinese translation of the title
   - A 2-3 sentence English summary
   - A 2-3 sentence Chinese summary (not a literal translation — adapt for Chinese readers)
   - The original article link
3. Select the most important/interesting articles (skip duplicates or low-quality items)
4. Add a brief "Today's Highlights / 今日要点" section at the top with 3-5 key takeaways in both languages

Output format (Markdown only, no code fences):

## Today's Highlights / 今日要点

- English highlight 1 / 中文要点 1
- English highlight 2 / 中文要点 2
- English highlight 3 / 中文要点 3

---

## Source Name

### Article Title
### 中文标题

English summary paragraph.

中文摘要段落。

[Read more →](url)

---

(repeat for each article)`;
}

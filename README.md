# AI News Daily

> Zero-cost AI-powered daily news aggregator. Fetches from multiple sources, generates bilingual (EN/CN) summaries, and publishes automatically.

## Architecture

```
GitHub Actions (cron daily)
  → Fetch from sources (RSS / API / Crawler)
  → AI summarize & translate (bilingual)
  → Generate Markdown
  → Git push
  → Cloudflare Pages auto-deploy
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Website | Astro (static site generation) |
| Hosting | Cloudflare Pages (free) |
| Scheduler | GitHub Actions cron |
| Fetching | Plugin-based (RSS, API, Crawler) |
| AI | Vercel AI SDK (OpenAI / Claude / Gemini / DeepSeek) |
| Language | TypeScript |

## Quick Start

### Prerequisites

- Node.js >= 20
- npm >= 10

### Install

```bash
npm install
```

### Configure AI Provider

Set environment variables for your preferred AI provider:

```bash
# Choose provider: openai | anthropic | google | deepseek
export AI_PROVIDER=openai
export AI_MODEL=gpt-4o

# Set the API key for your chosen provider
export OPENAI_API_KEY=sk-xxx
# or
export ANTHROPIC_API_KEY=sk-ant-xxx
# or
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
# or
export DEEPSEEK_API_KEY=xxx
```

### Run Locally

```bash
# Fetch news and generate daily report
npx tsx scripts/main.ts

# Preview website
npm run dev

# Build for production
npm run build
```

## Source Configuration

Edit `config/sources.json` to add/remove news sources:

```json
{
  "sources": [
    {
      "name": "Hacker News",
      "type": "api",
      "plugin": "hackernews",
      "maxItems": 15
    },
    {
      "name": "TechCrunch",
      "type": "rss",
      "plugin": "rss",
      "url": "https://techcrunch.com/feed/",
      "maxItems": 10
    },
    {
      "name": "Custom Site",
      "type": "crawler",
      "plugin": "web-generic",
      "url": "https://example.com",
      "selector": "article h2 a",
      "maxItems": 10
    }
  ]
}
```

### Plugin Types

| Type | Plugin | Description |
|------|--------|-------------|
| RSS | `rss` | Universal RSS/Atom feed parser |
| API | `hackernews` | Hacker News top stories API |
| API | `producthunt` | Product Hunt daily products |
| Crawler | `web-generic` | Generic web scraper with CSS selectors |

### Writing Custom Plugins

Create a new file in `scripts/fetch/plugins/` implementing the `SourcePlugin` interface:

```typescript
import { SourcePlugin, SourceConfig, Article } from '../types';

const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // Your fetching logic here
    return articles;
  }
};

export default myPlugin;
```

Then register it in `scripts/fetch/registry.ts`.

## GitHub Actions

The daily workflow runs at **08:00 UTC** every day:

1. Checks out the repo
2. Installs dependencies
3. Runs the fetch + AI generate pipeline
4. Commits and pushes the new daily markdown
5. Cloudflare Pages auto-deploys on push

### Required Secrets

Set these in your GitHub repo **Settings → Secrets**:

- `AI_PROVIDER` — AI provider name
- `AI_MODEL` — Model identifier
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `DEEPSEEK_API_KEY` — API key for your chosen provider

## Cloudflare Pages Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. Create a project → Connect to your GitHub repo
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Done! Every push triggers a new deployment.

## Project Structure

```
ai-news/
├── .github/workflows/daily.yml  # Scheduled pipeline
├── config/
│   └── sources.json             # News source configuration
├── scripts/
│   ├── fetch/
│   │   ├── types.ts             # Core type definitions
│   │   ├── registry.ts          # Plugin registry
│   │   ├── plugins/
│   │   │   ├── rss.ts           # RSS/Atom plugin
│   │   │   ├── api/
│   │   │   │   ├── hackernews.ts
│   │   │   │   └── producthunt.ts
│   │   │   └── crawler/
│   │   │       └── web-generic.ts
│   │   └── index.ts             # Fetch orchestrator
│   ├── ai/
│   │   ├── provider.ts          # Multi-provider AI adapter
│   │   ├── prompts.ts           # Prompt templates
│   │   └── index.ts
│   ├── generate.ts              # Markdown generator
│   └── main.ts                  # Entry point
├── src/                         # Astro website
│   ├── content/daily/           # Generated daily reports
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
└── package.json
```

## Cost

- **GitHub Actions**: Free tier — 2,000 min/month (daily run uses ~5 min)
- **Cloudflare Pages**: Free tier — 500 builds/month
- **AI API**: Pay-per-use — typically $1-5/month for daily summaries

## License

MIT

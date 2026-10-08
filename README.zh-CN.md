# AI News Daily - AI 新闻日报

> 零成本 AI 驱动的每日新闻聚合器。从 24+ 个源采集，生成中英双语摘要，自动发布。

[English](./README.md)

## 架构

```
GitHub Actions (每日定时)
  → 从 24 个源采集 (RSS / API / 爬虫)
  → 跨源 URL 去重
  → AI 摘要 & 翻译 (中英双语)
  → 生成 Markdown
  → Git 推送
  → Cloudflare Pages 自动部署
```

## 技术栈

| 组件 | 技术 |
|------|------|
| 网站 | Astro (静态站点生成) |
| 托管 | Cloudflare Pages (免费) |
| 调度 | GitHub Actions 定时任务 |
| 采集 | 插件化架构 (RSS、API、爬虫) + 自动重试 |
| AI | Vercel AI SDK (OpenAI / Claude / Gemini / DeepSeek) |
| 语言 | TypeScript |

## 特性

- **24 个新闻源** — Hacker News、TechCrunch、The Verge、Ars Technica、Product Hunt、MIT 科技评论、GitHub Trending、OpenAI 博客、Anthropic 博客、Google AI 博客、DeepMind 博客、Meta 官方博客、Microsoft AI、Hugging Face、The Gradient、arXiv (AI/CL/LG/CV)、WIRED、Lobsters、DEV Community、VentureBeat、Towards Data Science
- **明暗主题** — 跟随系统偏好，支持手动切换（自动 / 明亮 / 暗色）
- **阅读体验** — 进度条、回到顶部、源目录导航、前一天/后一天切换
- **移动端优先** — 响应式字体、吸顶横滑目录、触控友好
- **智能采集** — 代理支持 + 自动重试、跨源 URL 去重、全局 Token 预算控制
- **双语输出** — AI 生成中文摘要，保留英文原标题

## 快速开始

### 前置条件

- Node.js >= 24
- pnpm >= 9

### 安装

```bash
pnpm install
```

### 配置环境变量

设置您偏好的 AI 服务商及其他可选功能的配置。您也可以复制 `.env.example` 为 `.env` 来在本地配置：

```bash
# 选择服务商: openai | anthropic | google | deepseek
export AI_PROVIDER=openai
export AI_MODEL=gpt-4o

# 设置对应的 API Key
export OPENAI_API_KEY=sk-xxx
# 或
export ANTHROPIC_API_KEY=sk-ant-xxx
# 或
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
# 或
export DEEPSEEK_API_KEY=xxx

# （可选）配置 Google Analytics 衡量 ID
export PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 本地运行

```bash
# 采集新闻并生成日报
pnpm run generate

# 强制重新生成（覆盖已有日报）
FORCE_REGEN=1 pnpm run generate

# 预览网站
pnpm run dev

# 构建生产版本
pnpm run build
```

## 数据源配置

编辑 `config/sources.json` 添加或移除新闻源：

```json
{
  "sources": [
    {
      "name": "Hacker News",
      "type": "api",
      "plugin": "hackernews",
      "maxItems": 15,
      "enabled": true
    },
    {
      "name": "TechCrunch",
      "type": "rss",
      "plugin": "rss",
      "url": "https://techcrunch.com/feed/",
      "maxItems": 10,
      "enabled": true
    }
  ]
}
```

### 内置数据源 (24 个)

| 数据源 | 类型 | 插件 | 说明 |
|--------|------|------|------|
| Hacker News | API | `hackernews` | 技术社区热门 |
| Product Hunt | API | `producthunt` | 每日新产品 |
| GitHub Trending | 爬虫 | `github-trending` | 热门开源项目 |
| TechCrunch | RSS | `rss` | 科技创业新闻 |
| The Verge | RSS | `rss` | 消费科技 |
| Ars Technica | RSS | `rss` | 深度技术报道 |
| MIT Technology Review | RSS | `rss` | MIT 科技评论 |
| OpenAI Blog | RSS | `rss` | OpenAI 官方博客 |
| Anthropic Blog | 爬虫 | `anthropic` | Anthropic 官方博客 |
| Google AI Blog | RSS | `rss` | Google AI 研究 |
| DeepMind Blog | RSS | `rss` | DeepMind 研究 |
| Meta Engineering | RSS | `rss` | Meta 工程博客 |
| Microsoft AI Blog | RSS | `rss` | 微软 AI 博客 |
| Hugging Face Blog | RSS | `rss` | 开源 AI 社区 |
| The Gradient | RSS | `rss` | AI 深度分析 |
| arXiv CS.AI | RSS | `rss` | AI 最新论文 |
| arXiv CS.CL | RSS | `rss` | NLP 最新论文 |
| arXiv CS.LG | RSS | `rss` | 机器学习论文 |
| arXiv CS.CV | RSS | `rss` | 计算机视觉论文 |
| WIRED | RSS | `rss` | 科技文化 |
| Lobsters | RSS | `rss` | 高质量技术讨论 |
| DEV Community | RSS | `rss` | 开发者社区 |
| VentureBeat AI | RSS | `rss` | 创投 AI 资讯 |
| Towards Data Science | RSS | `rss` | 数据科学前沿 |

### 自定义插件

在 `scripts/fetch/plugins/` 下创建新文件，实现 `SourcePlugin` 接口：

```typescript
import type { SourcePlugin, SourceConfig, Article } from '../types.js';

const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // 你的采集逻辑
    return articles;
  }
};

export default myPlugin;
```

然后在 `scripts/fetch/index.ts` 中注册。

## 生产环境部署

本项目设计为完全托管在免服务器架构上，您需要完成 GitHub Secrets 配置以运行自动采集流水线，并配置 Cloudflare Pages 来托管前端网页。

### 1. 配置 GitHub Secrets

每日的新闻采集与生成由 GitHub Actions 自动运行。前往您的 GitHub 仓库 **Settings > Secrets and variables > Actions**，配置以下变量：

#### 必需的 Secrets
- `AI_PROVIDER` — AI 服务商名称（如 `openai`, `anthropic`, `google`, `deepseek`）
- `AI_MODEL` — 模型标识（如 `gpt-4o`）
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `DEEPSEEK_API_KEY` — 对应服务商的 API Key

#### 可选 Secrets
- `PRODUCTHUNT_CLIENT_ID` / `PRODUCTHUNT_CLIENT_SECRET` / `PRODUCTHUNT_API_TOKEN` — Product Hunt API（无配置时回退到 RSS）
- `WEBHOOK_URL` — 通知 Webhook 地址
- `WEBHOOK_TYPE` — 类型：`wecom`(企业微信) | `dingtalk`(钉钉) | `feishu`(飞书) | `slack` | `generic`
- `SITE_URL` — 你的网站访问地址（如 `https://your-site.com`），用于在通知消息中拼接日报的直达链接

### 2. 配置 Cloudflare Pages 

前端网站通过 Cloudflare Pages 自动部署：

1. 前往 [Cloudflare 控制台](https://dash.cloudflare.com/) > Pages
2. 创建项目 > 连接你的 GitHub 仓库
3. 构建设置：
   - **框架预设**: Astro (或保留 None)
   - **构建命令**: `pnpm run build`
   - **输出目录**: `dist`
4. **环境变量（可选）**：如果需要统计网站流量，请添加环境变量 `PUBLIC_GA_ID`，值为你的 Google Analytics 衡量 ID（如 `G-XXXXXXXXXX`）。
5. 完成！每次 GitHub Actions 推送新的新闻数据时，Cloudflare 都会自动触发前端站点的重新构建与发布。

## 项目结构

```
ai-news/
├── .github/workflows/daily.yml  # 定时流水线
├── config/
│   └── sources.json             # 数据源配置 (24 个源)
├── scripts/
│   ├── fetch/
│   │   ├── types.ts             # 核心类型定义
│   │   ├── registry.ts          # 插件注册表
│   │   ├── plugins/
│   │   │   ├── rss.ts           # RSS/Atom 插件
│   │   │   ├── api/
│   │   │   │   ├── hackernews.ts
│   │   │   │   └── producthunt.ts
│   │   │   └── crawler/
│   │   │       ├── web-generic.ts
│   │   │       ├── github-trending.ts
│   │   │       └── anthropic.ts
│   │   └── index.ts             # 采集调度器
│   ├── ai/
│   │   ├── provider.ts          # 多服务商 AI 适配器
│   │   ├── prompts.ts           # 提示词模板 (全局 Token 预算)
│   │   └── index.ts
│   ├── generate.ts              # Markdown 生成器 (去重 + FORCE_REGEN)
│   ├── proxy.ts                 # 代理 + 自动重试
│   ├── notify.mjs               # Webhook 通知
│   └── main.ts                  # 入口
├── src/                         # Astro 网站
│   ├── content/
│   │   ├── daily/               # 生成的日报
│   │   └── news/                # 翻译后的新闻详情 (按日期归档)
│   ├── layouts/
│   │   └── Layout.astro         # 明暗主题、进度条、回到顶部
│   └── pages/
│       ├── index.astro          # 首页
│       └── daily/[...slug].astro # 详情页 (目录导航、前后切换)
├── astro.config.mjs
└── package.json
```

## 费用

- **GitHub Actions**: 免费额度 — 2,000 分钟/月（每日运行约 5 分钟）
- **Cloudflare Pages**: 免费额度 — 500 次构建/月
- **AI API**: 按量付费 — 每月约 $1-5

## 许可证

MIT

### 生成质量与运行控制

日报按上海时区固定日期生成。默认筛选截至日报日期结束的 48 小时内新闻，并跳过历史日报已经发布的 URL。去重保留文章 ID 等查询参数，仅去除常见跟踪参数；没有发布日期的来源可首次入选。`ALLOW_REPEATS=1` 可用于明确需要再次报道的更新，`FORCE_REGEN=1` 用于重新生成已经存在的当日日报。重复执行且日报已存在时，不会再次抓取和调用 AI。

正文抓取结果会复用；抓取和 AI 处理采用有限并发。文章摘要分批生成，逐批校验文章 ID 与数量，保留合法结果并最多进行两轮漏项修复，再从摘要提炼带文章引用的要点。修复后仍不合格的文章保留原文入口，日报标记为部分完成；要点格式不合格时使用已校验摘要的原文节选。仅获取到标题时展示原文入口，不生成事实摘要。长文详情超过 6,000 字符时明确标记为节选翻译。新日报将要点和文章信息保存在 frontmatter，供网页、搜索和通知复用；已有 Markdown 日报仍可正常浏览。

| 环境变量 | 默认值 | 用途 |
| --- | --- | --- |
| `REPORT_DATE` | 上海时区当天 | 固定本次日报日期，格式 YYYY-MM-DD |
| `LOOKBACK_HOURS` | 48 | 截至日报日期结束的新闻时间窗口 |
| `SOURCE_CONCURRENCY` | 6 | 新闻来源抓取并发数 |
| `FETCH_CONCURRENCY` | 3 | Hacker News 正文抓取并发数 |
| `AI_CONCURRENCY` | 3 | 全文处理和摘要批次并发数 |
| `AI_REQUESTS_PER_MINUTE` | Google 为 12，其他为 60 | 所有 AI 请求与重试共享的启动频率限制；Actions 可设置同名仓库变量 |
| `SUMMARY_BATCH_SIZE` | 8 | 每批摘要文章数 |
| `FETCH_TIMEOUT_MS` | 15000 | 每次抓取超时 |
| `AI_TIMEOUT_MS` | 180000 | 单次 AI 生成超时 |

生成状态分为 `success`（完整生成）、`partial`（部分来源失败、翻译失败或仅标题）、`no-content`（筛选后没有新文章）、`skipped`（日报已存在）和 `failure`（生成失败）。全部来源失败、AI 认证失败或摘要阶段的服务请求持续失败时不会发布新日报；单条摘要格式错误不会终止整份日报。通知区分这些结果；推送成功前会先运行检查、测试和网站构建。通知检查机器人平台业务错误码，并按消息长度限制保留完整要点。

每次运行的统计保存在 `.cache/run-summary.json`，包含来源失败列表、筛选数量、耗时、翻译缓存命中和 AI token 用量。GitHub Actions 同时显示运行摘要，并保存统计文件 30 天。统计不估算费用，因为不同服务商与模型的计价不同。

```bash
pnpm check  # Astro 与 TypeScript 检查
pnpm test   # 筛选、去重、生成完整性与通知回归测试，不调用真实 AI 或 webhook
pnpm build  # 验证全部历史内容与静态页面
```

首页显示最新要点和最近七份日报；历史内容按月归档。搜索按需加载静态索引，支持新闻标题、要点、来源和新日报主题。新日报支持主题筛选与摘要折叠，历史日报保留原有 Markdown 阅读方式。

AI 请求重试读取 `Retry-After` 和 Gemini `RetryInfo`，冷却时间作用于整个任务内的 AI 队列。SDK 内部重试已关闭，避免重试绕过共享限速；JSON 格式修复不会再次重试认证或网络错误。明确的日配额耗尽或超过两分钟的冷却会停止本次运行后续 AI 请求。限速不能增加账户配额，也无法限制同一 API key 在其他任务中的用量。运行统计中的 `ai.requests` 为实际请求尝试数，`ai.calls` 为上层生成调用数。

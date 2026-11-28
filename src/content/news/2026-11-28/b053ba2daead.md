---
title: "How to Get Your Competitors' Google Ads with Python (2026)"
originalUrl: "https://dev.to/neronbaez/how-to-get-your-competitors-google-ads-with-python-2026-3lpf"
date: "2026-11-28T03:15:59.000Z"
excerpt: false
---

# How to Get Your Competitors' Google Ads with Python (2026)

你的竞争对手已经花钱测试出了哪些广告是有效的。谷歌在“谷歌广告透明度中心”（Google Ads Transparency Center）发布了这些广告，通过大约 20 行 Python 代码，你就可以将它们抓取到电子表格中。在本教程中，你将获得任何品牌或域名的以下信息：广告文本（标题、描述、行动号召）、视频广告的 YouTube 链接和展示广告的图片 URL、落地页、投放国家/地区、每条广告的首次和最后投放日期，以及广告的付费方（通常是背后的代理商）。免责声明：本文使用的爬虫由我开发。该代码适用于任何具有类似输入的 Apify Actor。

### The problem
The Transparency Center is built for people, not for code. You search one advertiser, scroll, and open each ad one by one to read its text. That is fine for one brand. It breaks when you need 10 competitors, several countries, or a weekly check for new ads. There is no simple REST endpoint for it, and many text ads are stored as images, so a plain HTML request gets you almost nothing.

### 问题所在
“透明度中心”是为人类设计的，而不是为代码设计的。你需要搜索一个广告主，滚动页面，然后逐个打开广告来阅读文本。这对于单个品牌来说还可以，但当你需要监控 10 个竞争对手、多个国家/地区，或者每周检查新广告时，这种方法就行不通了。它没有简单的 REST 端点，而且许多文字广告是以图片形式存储的，因此普通的 HTML 请求几乎无法获取任何内容。

### Setup (2 minutes)
Create a free account at apify.com. The free plan includes monthly credits, enough to test this. Copy your API token from Settings → API & Integrations in the Apify Console. Install the client and save the token as an environment variable, so it never ends up in your code:
`pip install "apify-client>=3"`
`export APIFY_TOKEN="your_token_here"`

### 设置（2 分钟）
在 apify.com 创建一个免费账户。免费套餐包含每月额度，足以进行测试。从 Apify 控制台的“设置”→“API & 集成”中复制你的 API 令牌。安装客户端并将令牌保存为环境变量，这样它就不会出现在你的代码中：
`pip install "apify-client>=3"`
`export APIFY_TOKEN="your_token_here"`

### The code
This script gets the latest ads for two domains in the US, with full ad details, and stops at 50 ads so the cost stays tiny. It prints only the ads that come with readable text (more on that below).

### 代码
此脚本获取美国两个域名的最新广告，包含完整的广告详情，并在抓取 50 条广告后停止，以保持极低的成本。它仅打印带有可读文本的广告（下文将详细说明）。

```python
import os
from apify_client import ApifyClient
client = ApifyClient(os.environ["APIFY_TOKEN"])
run_input = {
    "queries": ["nike.com", "adidas.com"], # domains, brand names or advertiser IDs
    "region": "US", # or "anywhere", "GB", "DE", "MX"...
    "adFormat": "all", # all / text / image / video
    "maxAdsPerQuery": 25,
    "includeAdDetails": True, # ad text, videos, landing pages, countries
    "maxTotalItems": 50, # hard cap on spend
}
run = client.actor("neronbaez/google-ads-transparency-scraper").call(run_input=run_input)
for ad in client.dataset(run.default_dataset_id).iterate_items():
    text = " / ".join(ad.get("adTexts", [])[:4])
    if not text: continue # archived as a screenshot: see "Two things to know" below
    print(ad["advertiserName"], "|", ad["format"], "|", ad.get("daysShown"), "days")
    print(" ", text)
```

### Real output from a run on November 25, 2026 (two of the ads):
Nike Retail BV | TEXT | 432 days
  Sponsored / nike.com / Nike Black Friday Days Are On / <Rating (Reviews)> · <Distance> · Cannock
Adidas America, Inc | TEXT | 1810 days
  Sponsored / adidas.com / adidas Official Site / <Rating (Reviews)> · <Distance> · Pottstown

### 2026 年 11 月 25 日运行的真实输出（其中两条广告）：
Nike Retail BV | TEXT | 432 天
  Sponsored / nike.com / Nike Black Friday Days Are On / <Rating (Reviews)> · <Distance> · Cannock
Adidas America, Inc | TEXT | 1810 天
  Sponsored / adidas.com / adidas Official Site / <Rating (Reviews)> · <Distance> · Pottstown

Search by domain (nike.com) when you want everything: big brands run one advertiser account per country, and the domain search finds all of them.

当你想要获取所有内容时，请按域名（nike.com）搜索：大品牌通常每个国家运营一个广告主账户，而域名搜索可以找到所有这些账户。

### What you get back
Each ad comes back as one JSON object. A real one from Nike, trimmed:
`{ "advertiserName": "Nike Retail BV", "format": "TEXT", "firstShown": "2021-10-25T07:00:00+00:00", "lastShown": "2026-10-16T07:56:41+00:00", "daysShown": 1777, "domain": "nike.com", "paidBy": "Nike Retail BV", "adTexts": ["Nike - Online Store", "Any Place. Any Time. Any Condition. Be Your Best Every Time With Nike Shoes And Clothing."], "regions": [{"country": "DK", "lastShownDate": "2026-10-14"}], "adUrl": "https://adstransparency.google.com/advertiser/AR18378488041124659201/creative/CR02364365752552652801" }`

### 你将获得什么
每条广告都会以一个 JSON 对象的形式返回。以下是来自 Nike 的真实数据（已精简）：
`{ "advertiserName": "Nike Retail BV", "format": "TEXT", "firstShown": "2021-10-25T07:00:00+00:00", "lastShown": "2026-10-16T07:56:41+00:00", "daysShown": 1777, "domain": "nike.com", "paidBy": "Nike Retail BV", "adTexts": ["Nike - Online Store", "Any Place. Any Time. Any Condition. Be Your Best Every Time With Nike Shoes And Clothing."], "regions": [{"country": "DK", "lastShownDate": "2026-10-14"}], "adUrl": "https://adstransparency.google.com/advertiser/AR18378488041124659201/creative/CR02364365752552652801" }`

The field that matters most is daysShown. Advertisers stop paying for ads that lose money, so an ad that has run for months is almost always a winner. Sort by it and you have your competitor's best-performing copy.

最重要的字段是 `daysShown`。广告主会停止为亏损的广告付费，因此投放了数月的广告几乎总是赢家。按此字段排序，你就能得到竞争对手表现最好的文案。

### Two things to know
Many text ads are screenshots. Google archives a large share of text ads as images. In my test, 34 of 50 ads came with adTexts empty. For those, the ad is in imageUrls: open the image to read it, or run your own OCR on it.
"US" means "shown in the US", not "from a US account". With "region": "US" you also get global campaigns that ran in the US, so accounts like Nike Japan can appear. To keep only ads shown exclusively in one country, add "onlyAdsForThisCountry": True (fewer results, slower runs).

### 需要了解的两件事
许多文字广告实际上是截图。谷歌将很大一部分文字广告归档为图片。在我的测试中，50 条广告中有 34 条的 `adTexts` 为空。对于这些广告，内容在 `imageUrls` 中：你可以打开图片阅读，或者运行自己的 OCR（光学字符识别）来提取文字。
“US”指的是“在美国展示”，而不是“来自美国账户”。使用 `"region": "US"` 时，你也会获取到在美国投放的全球性广告，因此可能会出现像 Nike Japan 这样的账户。如果只想保留仅在一个国家展示的广告，请添加 `"onlyAdsForThisCountry": True`（结果会更少，运行速度也会更慢）。

### Going further
Save the winners to CSV. Add this after the run to get a sheet sorted by longest-running ad:
`import csv`
`ads = list(client.dataset(run.default_dataset_id).iterate_items())`
`ads.sort(key=lambda a: a.get("daysShown") or 0, reverse=True)`
`with open("competitor_ads.csv", "w", newline="", encoding="utf-8") as f:`
`    w = csv.writer(f)`
`    w.writerow(["advertiser", "format", "days_shown", "text", "image", "link"])`
`    for a in ads:`
`        w.writerow([a["advertiserName"], a["format"], a.get("daysShown"), " / ".join(a.get("adTexts", [])), (a.get("imageUrls") or [""])[0], a["adUrl"]])`
Monitor new ads every week. Create a schedule for the Actor in the Apify Console and compare each run's creativeId values with the previous run. New IDs are new ads.
Cost. You pay per ad: $0.003 for an ad with full details, so 1,000 competitor ads cost about $3. Use maxTotalItems to cap every run.

### 进阶操作
将获胜的广告保存为 CSV 文件。在运行结束后添加以下代码，即可获得按投放时间最长排序的表格：
`import csv`
`ads = list(client.dataset(run.default_dataset_id).iterate_items())`
`ads.sort(key=lambda a: a.get("daysShown") or 0, reverse=True)`
`with open("competitor_ads.csv", "w", newline="", encoding="utf-8") as f:`
`    w = csv.writer(f)`
`    w.writerow(["advertiser", "format", "days_shown", "text", "image", "link"])`
`    for a in ads:`
`        w.writerow([a["advertiserName"], a["format"], a.get("daysShown"), " / ".join(a.get("adTexts", [])), (a.get("imageUrls") or [""])[0], a["adUrl"]])`
每周监控新广告。在 Apify 控制台中为该 Actor 创建一个定时任务，并将每次运行的 `creativeId` 值与上一次进行比较。新的 ID 即代表新的广告。
成本方面：按广告付费，每条包含完整详情的广告费用为 0.003 美元，因此抓取 1,000 条竞争对手广告的成本约为 3 美元。使用 `maxTotalItems` 来限制每次运行的上限。

### Wrap-up
In a few minutes you went from clicking through the Transparency Center to a CSV of every ad your competitors run, sorted by what works. You can try the Google Ads Transparency Scraper on Apify without writing any code, or call it from Python as shown above. If you need a field or filter it doesn't have yet, open an issue on the Actor page and I'll add it. What would you build with this data? Tell me in the comments.

### 总结
在短短几分钟内，你就从手动点击“透明度中心”转变为获得一份竞争对手所有广告的 CSV 表格，并按效果进行了排序。你可以在 Apify 上直接尝试“谷歌广告透明度爬虫”而无需编写任何代码，或者像上面展示的那样通过 Python 调用它。如果你需要目前尚未提供的字段或过滤器，请在 Actor 页面提交 Issue，我会将其添加进去。你会用这些数据构建什么呢？在评论区告诉我吧。
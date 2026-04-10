import RSSParser from 'rss-parser';

async function test() {
  const parser = new RSSParser();
  const feed = await parser.parseURL('https://www.producthunt.com/feed');
  const item = feed.items[0];
  console.log("title:", item.title);
  console.log("contentSnippet:", item.contentSnippet);
  console.log("content:", item.content);
}

test().catch(console.error);

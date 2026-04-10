import hackernewsPlugin from './scripts/fetch/plugins/api/hackernews.js';

async function test() {
  try {
    console.log("Fetching...");
    const articles = await hackernewsPlugin.fetch({
      name: 'Hacker News',
      type: 'api',
      plugin: 'hackernews',
      maxItems: 15
    });
    console.log(`Fetched ${articles.length} articles.`);
    console.log("First article:", articles[0]);
  } catch (err) {
    console.error(err);
  }
}

test();

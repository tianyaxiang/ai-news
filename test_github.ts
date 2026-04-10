import webGenericPlugin from './scripts/fetch/plugins/crawler/web-generic.js';

async function test() {
  try {
    const config = {
      name: 'GitHub Trending',
      type: 'crawler',
      plugin: 'web-generic',
      url: 'https://github.com/trending',
      maxItems: 5,
      options: {
        selector: 'article.Box-row h2 a',
        contentSelector: 'p',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    // @ts-ignore
    const articles = await webGenericPlugin.fetch(config);
    console.log(`Fetched ${articles.length} articles`);
    console.log(articles[0]);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();

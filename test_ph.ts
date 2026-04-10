import phPlugin from './scripts/fetch/plugins/api/producthunt.js';

async function test() {
  try {
    const config = {
      name: "Product Hunt",
      type: "api",
      plugin: "producthunt",
      maxItems: 10,
      enabled: true
    };
    const articles = await phPlugin.fetch(config);
    console.log(`Fetched ${articles.length} articles`);
    console.log(articles[0]);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();

import githubplugin from './scripts/fetch/plugins/crawler/github-trending.js';

async function test() {
  const articles = await githubplugin.fetch({
    name: 'GitHub Trending Test',
    type: 'crawler',
    plugin: 'github-trending',
    maxItems: 2
  });
  console.log('Result:', articles);
}

test().catch(console.error);

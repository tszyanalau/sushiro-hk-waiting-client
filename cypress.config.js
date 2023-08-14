const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://sushirowaiting-map.tszyanalau.com',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
  env: {
    apiUrl: 'https://sushirowaiting.tszyanalau.com/api',
  },
});

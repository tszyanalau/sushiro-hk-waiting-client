const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://sushirowaiting-map.tszyanalau.com.s3-website-ap-northeast-1.amazonaws.com',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
  env: {
    apiUrl: 'https://sushirowaiting.tszyanalau.com/api',
  },
});

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://sushiro-hk-waiting-client.s3-website-ap-northeast-1.amazonaws.com',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
  env: {
    apiUrl: 'https://sushirowaiting.tszyanalau.com/api',
  },
});

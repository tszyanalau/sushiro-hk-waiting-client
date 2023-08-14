const data = require('../src/mockData/store.json');

export const onBeforeLoad = (window) => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'zh-HK', // Set the default language code
  });
};

export const mockResponseBody = { body: { ...data, timestamp: 1691312155034 } };

export default {
  onBeforeLoad,
  mockResponseBody,
};

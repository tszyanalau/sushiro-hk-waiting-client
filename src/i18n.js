import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import ja from './translations/ja.json';
import zhHK from './translations/zh-HK.json';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-HK': {
        translation: zhHK,
      },
      ja: {
        translation: ja,
      },
    },
    fallbackLng: 'zh-HK',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

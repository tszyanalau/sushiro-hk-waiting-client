import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import _ from 'lodash';
import config from './config.json';

const resources = {};

_.reduce(config.languages, (result, lang) => {
  let translation;
  try {
    translation = require(`./translations/${lang}.json`);
  } catch (e) {
    console.log(e);
    throw new Error(`unable to retrieve translation: ${lang}`);
  }
  _.set(result, `${lang}.translation`, translation);
  return result;
}, resources);

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: config.languages[0],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

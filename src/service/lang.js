import i18n from '../i18n';

export const i18nLangToLangAttr = {
  ja: 'ja',
  'zh-HK': 'zh',
};

export const handleDOMChange = (lang) => {
  document.querySelector('html').setAttribute('lang', i18nLangToLangAttr[lang]);
  document.querySelector('title').innerHTML = i18n.t('appName');
};

export default {
  i18nLangToLangAttr,
  handleDOMChange,
};

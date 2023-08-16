import moment from 'moment';
import 'moment/locale/ja';
import 'moment/locale/zh-tw';
import _ from 'lodash';

import i18n from '../i18n';
import config from '../config.json';

require('moment-timezone');

const i18nLangToLocale = {
  ja: 'ja',
  'zh-HK': 'zh-tw',
};

export const getCenter = (stores) => ({
  lat: _.meanBy(stores, 'latitude'),
  lng: _.meanBy(stores, 'longitude'),
});

export const getBounds = (stores) => {
  const { boundPadding } = config.map;
  return {
    north: _.maxBy(stores, 'latitude').latitude + boundPadding,
    south: _.minBy(stores, 'latitude').latitude - boundPadding,
    west: _.minBy(stores, 'longitude').longitude - boundPadding,
    east: _.maxBy(stores, 'longitude').longitude + boundPadding,
  };
};

export const getTier = (waitingGroup) => {
  const { tier } = config;
  let variant = 0;
  for (let i = tier.length - 1; i > 0; i--) {
    if (waitingGroup >= tier[i]) {
      variant = i;
      break;
    }
  }
  return variant;
};

export const getTierVariant = (waitingGroup) => {
  const variant = getTier(waitingGroup);
  return `tier-${variant}`;
};

export const getFlagVariant = (flag) => (flag ? 'on' : 'off');

export const getDisplayTime = (timestamp) => {
  const currentDT = moment(timestamp);
  currentDT.locale(i18nLangToLocale[i18n.language]);
  return currentDT.tz(config.momentTImezone).format(i18n.t('dateFormat'));
};

export default {
  getTier,
  getTierVariant,
  getFlagVariant,
  getDisplayTime,
  getCenter,
  getBounds,
};

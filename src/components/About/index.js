import React from 'react';
import { withTranslation } from 'react-i18next';
import Stack from 'react-bootstrap/Stack';
import Heading from '../Heading';

const About = ({ t }) => (
  <div className="page-container">
    <Stack className="text-center">
      <Heading>{t('about.title', { appName: t('appName') })}</Heading>
      <div>{t('about.description')}</div>
    </Stack>
    <ul className="text-secondary">
      {
        t('about.disclaimer', { returnObjects: true }).map((disclaimer, i) => <li key={i}>{disclaimer}</li>)
      }
    </ul>
  </div>
);

export default withTranslation()(About);

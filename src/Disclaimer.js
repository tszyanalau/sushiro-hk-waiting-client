import React from 'react';
import { withTranslation } from 'react-i18next';
import Stack from 'react-bootstrap/Stack';
import config from './config.json';
import Heading from './components/Heading';
import Footer from './components/Footer';

const Disclaimer = ({ t }) => (
  <div>
    <div className="page-container">
      <Stack>
        <Heading className="text-center">{t('disclaimer.title')}</Heading>
        <div dangerouslySetInnerHTML={{ __html: t('disclaimer.content', { appName: t('appName'), ...config.disclaimer }) }} />
      </Stack>
    </div>
    <Footer />
  </div>
);

export default withTranslation()(Disclaimer);

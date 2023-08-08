import React from 'react';
import { withTranslation } from 'react-i18next';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Heading from './components/Heading';
import Footer from './components/Footer';
import Icon from './components/Icon';

const ErrorBoundary = ({ t }) => (
  <div>
    <div className="page-container">
      <Stack className="text-center" gap={5}>
        <Icon type="exclamation-triangle-fill" className="display-1 text-secondary text-opacity-50" />
        <div>
          <Heading gutter={false}>{t('errorBoundary.title')}</Heading>
          <div>{t('errorBoundary.content')}</div>
        </div>
        <div>
          <Button href="/">{t('errorBoundary.topPage')}</Button>
        </div>
      </Stack>
    </div>
    <Footer />
  </div>
);

export default withTranslation()(ErrorBoundary);

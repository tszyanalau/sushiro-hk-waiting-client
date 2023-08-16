import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import CountdownTimer from '../CountdownTimer';
import LanguageSwitcher from './LanguageSwitcher';
import RefreshButton from './RefreshButton';
import config from '../../config.json';

const NavigationBar = () => {
  const { t } = useTranslation();
  return (
    <Navbar>
      <Container fluid>
        <div>
          <Navbar.Brand href="/">{t('appName')}</Navbar.Brand>
        </div>
        <Nav className="mr-auto">
          <CountdownTimer duration={config.refetchDuration} />
          <RefreshButton />
          <LanguageSwitcher />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

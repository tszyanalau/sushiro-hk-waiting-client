import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import config from '../../config.json';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      {
        config.languages.map((lang) => {
          return (
            <Nav.Link key={lang} className="text-uppercase" onClick={() => handleChangeLanguage(lang)} disabled={lang === i18n.language}>
              {lang.slice(0, 2)}
            </Nav.Link>
          );
        })
      }
    </>
  );
};

export default LanguageSwitcher;

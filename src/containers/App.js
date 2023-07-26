import React from 'react';
import { lifecycle, compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import logo from '../img/logo.svg';
import '../App.css';

const App = ({ t }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>
          src/App.js
        </code>
        and save to reload.
      </p>
      <p>{t('home')}</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      {process.env.REACT_APP_GOOGLE_API_KEY}
    </header>
  </div>
);

const enhance = compose(
  withTranslation(),
  lifecycle({
    async componentDidMount() {
      const options = process.env.NODE_ENV === 'development' ? { headers: { 'x-api-key': process.env.REACT_APP_API_KEY } } : {};
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/healthCheck`,
        options,
      );
    },
  }),
);

export default enhance(App);

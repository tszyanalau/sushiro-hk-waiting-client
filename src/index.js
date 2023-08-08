import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import App from './App';
import Disclaimer from './Disclaimer';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import store from './store';
import i18n from './i18n';
import './scss/index.scss';

const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/*" element={<Navigate to="/" replace />} />
  </Routes>
);

const router = createBrowserRouter([
  {
    path: '*',
    element: <Root />,
    errorElement: <ErrorBoundary />,
  },
]);

const i18nLangToLangAttr = {
  ja: 'ja',
  'zh-HK': 'zh',
};

// handle index.html translation
document.querySelector('html').setAttribute('lang', i18nLangToLangAttr[i18n.language]);
document.querySelector('title').innerHTML = i18n.t('appName');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

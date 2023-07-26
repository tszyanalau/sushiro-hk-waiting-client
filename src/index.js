import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/*" element={<Navigate to="/" replace />} />
  </Routes>
);

const router = createBrowserRouter([
  {
    path: '*',
    element: <Root />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

document.body.classList.remove('preload');//Включение анимации после загрузки попапов

reportWebVitals();
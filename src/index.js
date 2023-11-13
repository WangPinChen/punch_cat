import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import axios from 'axios';

import './stylesheets/all.scss'

import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);


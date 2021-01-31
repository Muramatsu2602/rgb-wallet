import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Auth from './services/AuthService';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3003';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      Auth.logOut(true);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // renders the whole app through the element 'root'
);

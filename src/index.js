import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBkDQ7fU4CuXWDHkKX4GTh_bKUxF7xIhbQ",
  authDomain: "cloud-service-react.firebaseapp.com",
  databaseURL: "https://cloud-service-react-default-rtdb.firebaseio.com",
  projectId: "cloud-service-react",
  storageBucket: "cloud-service-react.appspot.com",
  messagingSenderId: "729523848794",
  appId: "1:729523848794:web:c77a5b352c3c75d0e43a63"
};

firebase.initializeApp(firebaseConfig);

React.icons = icons

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './layouts/App';
import * as serviceWorker from './serviceWorker';
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-polyfill');
ReactDOM.render(
    <App />, document.getElementById('root'));
serviceWorker.unregister();

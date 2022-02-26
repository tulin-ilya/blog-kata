/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './containers/app';

import 'antd/dist/antd.css';
import './index.scss';

// import KataBlogService from './serivces/kata-blog-api';

// const kataBlogService = new KataBlogService();

// const articles = kataBlogService.getArticles();
// const article = kataBlogService.getArticle('dsfa-jcrzns');
// // const user = kataBlogService.createUser('Ilya', 'ilya@tulin.ru', '123');
// const login = kataBlogService.login('ilya@tulin.ru', '123');
// // const favorite = kataBlogService.favoriteArticle('dsfa-jcrzns');

// // console.log(articles);
// console.log(login);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(() => {},
composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

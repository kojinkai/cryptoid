// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import tabs from './components/tabs/reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const reducer = combineReducers({ tabs });

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import tabs from './components/tabs/reducer';
import account from './components/App/reducer';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const reducer = combineReducers({ tabs, account });
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

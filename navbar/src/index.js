import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { storeInstance } from './store';

ReactDom.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

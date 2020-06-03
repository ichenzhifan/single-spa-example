import React from 'react';
import ReactDom from 'react-dom';

import singleSpaReact from 'single-spa-react'
import { property } from 'lodash'
import setPublicPath from './set-public-path.js'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM: ReactDom,
  loadRootComponent: () => import(/* webpackChunkName: "people-app" */'./components/App/spa').then(property('default')),
  domElementGetter,
})

export const bootstrap = [
  () => {
    return setPublicPath()
  },
  reactLifecycles.bootstrap,
]

export const mount = [
  reactLifecycles.mount,
]

export const unmount = [
  reactLifecycles.unmount,
]

export const unload = [
  reactLifecycles.unload,
]

function domElementGetter() {
  let el = document.getElementById("navbar");
  if (!el) {
    el = document.createElement('div');
    el.id = 'navbar';
    document.body.appendChild(el);
  }

  return el;
}



// ReactDom.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.querySelector('#app')
// );

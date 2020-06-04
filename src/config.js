import * as isActive from './activityFns.js'
import * as singleSpa from 'single-spa'

import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
  const globalEventDistributor = new GlobalEventDistributor(singleSpa);
  const loadingPromises = [];

  loadingPromises.push(loadApp({
    name: 'navbar',
    actived: isActive.navbar,
    appURL: '@portal/navbar',
    storeURL: '@portal/navbar-store',
    globalEventDistributor
  }));

  loadingPromises.push(loadApp({
    name: 'cat',
    actived: isActive.cat,
    appURL: '@portal/cat',
    storeURL: '@portal/cat-store',
    globalEventDistributor
  }));

  loadingPromises.push(loadApp({
    name: 'dog',
    actived: isActive.dog,
    appURL: '@portal/dog',
    storeURL: '@portal/dog-store',
    globalEventDistributor
  }));

  await Promise.all(loadingPromises);

  singleSpa.start()
}

init();
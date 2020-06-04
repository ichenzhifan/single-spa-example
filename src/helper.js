import * as singleSpa from 'single-spa';

export async function loadApp(opt) {
  const { name, actived, appURL, storeURL, globalEventDistributor, isCommon } = opt;

  let storeModule = {};
  const customProps = { 
    $global: globalEventDistributor 
  };

  // try to import the store module
  try {
    storeModule = storeURL ? await SystemJS.import(storeURL) : { storeInstance: null };
  } catch (e) {
    console.log(`Could not load store of app ${name}.`, e);
  }

  if (storeModule.storeInstance && globalEventDistributor) {
    // add a reference of the store to the customProps
    customProps.store = storeModule.storeInstance;

    // register the store with the globalEventDistributor
    globalEventDistributor.registerStore(name, storeModule.storeInstance);
  }

  // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
  singleSpa.registerApplication(name, () => SystemJS.import(appURL), actived, customProps);
}
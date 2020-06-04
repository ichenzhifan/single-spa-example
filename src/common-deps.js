window.SystemJS = window.System

function insertNewImportMap(newMapJSON) {
  const newScript = document.createElement('script')
  newScript.type = 'systemjs-importmap'
  newScript.text = JSON.stringify(newMapJSON)
  const allMaps = document.querySelectorAll('script[type="systemjs-importmap"]')

  allMaps[allMaps.length - 1].insertAdjacentElement(
    'afterEnd',
    newScript
  )
}

const dependencies = {
  imports: {
    react: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js',
    'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js',
    'react-dom/server': 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom-server.browser.development.js',
    'single-spa': 'https://unpkg.com/single-spa@4.3.2/lib/umd/single-spa.min.js',
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js',
    redux: 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js',
    'react-redux': 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js',
    'reselect': 'https://cdnjs.cloudflare.com/ajax/libs/reselect/4.0.0/reselect.min.js',
    'immutable': 'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.2/immutable.min.js'
  }
}


insertNewImportMap(dependencies)

import * as isActive from './activityFns.js'
import * as singleSpa from 'single-spa'

singleSpa.registerApplication('navbar', () => SystemJS.import('@portal/navbar'), isActive.navbar)
singleSpa.registerApplication('cat', () => SystemJS.import('@portal/cat'), isActive.cat)
singleSpa.registerApplication('dog', () => SystemJS.import('@portal/dog'), isActive.dog)

singleSpa.start()

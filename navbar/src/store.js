import rootReducer from './redux/reducer';
import createStore from './redux/store';

export const storeInstance = createStore(rootReducer);
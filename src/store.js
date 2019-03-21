import { createStore } from 'redux';

import sayluaReducer from './reducers/sayluaReducer';

const store = createStore(
  sayluaReducer, {},
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

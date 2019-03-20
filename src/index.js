import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { createStore } from 'redux';

import sayluaReducer from './reducers/sayluaReducer';

export const store = createStore(
  sayluaReducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(<App />, document.getElementById('root'));

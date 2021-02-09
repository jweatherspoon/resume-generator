import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import componentReducer from './data-model/reducers/ComponentReducer';
import activeConfigurationReducer from './data-model/reducers/ActiveConfigurationReducer';

const IS_DEBUG = true;

const rootReducer = combineReducers({
  components: componentReducer,
  activeConfiguration: activeConfigurationReducer
});

const enhancer = IS_DEBUG ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;
const store = createStore(rootReducer, {}, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

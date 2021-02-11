import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from "./store";
import { createUpdateActiveTemplateAction } from './data-model/actions/ActiveConfigurationActions';
import RESUME_SHELL_TYPES from './data-model/ResumeShellTypes';
import { flashyResumeRegionInfo } from './view-components/resume-shells/FlashyResumeShell';

store.dispatch(createUpdateActiveTemplateAction(RESUME_SHELL_TYPES.Flashy, Object.keys(flashyResumeRegionInfo)))

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

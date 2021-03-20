import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from "./store";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faMobile, faEnvelope)

// TODO: Remove this when I figure out how I want to handle themes from metadata
import customMetadata from "./data-model/custom-metadata.json";
const theme = createMuiTheme(customMetadata.themes.flashy);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

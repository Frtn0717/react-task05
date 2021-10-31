import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import { store } from './store/store.js';
import './index.scss';
import ErrorBoundary from './error-boundary/Error-baundary.jsx';

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

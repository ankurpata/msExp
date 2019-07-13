import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
const store = configureStore(preloadedState); // You can also pass in an initialState here

render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
        );
registerServiceWorker();

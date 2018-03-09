import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore, history } from './store';
import registerServiceWorker from './registerServiceWorker';

import App from './views/App';

const { store, persistor } = configureStore();

const PersistApp = () => (
    <PersistGate loading={<div />} persistor={persistor}>
        <App />
    </PersistGate>
);

const render = () => {

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <PersistApp />
            </ConnectedRouter>            
        </Provider>,
        document.getElementById('app'),
    );
};

render();

if (process.env.NODE_ENV !== 'production' && module.hot) {

    module.hot.accept('./views/App', () => render());
}

registerServiceWorker();

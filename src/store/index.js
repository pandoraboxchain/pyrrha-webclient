import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { createPersistStorageFilter } from '../utils';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage/session';
import packageConfig from '../../package.json';

import rootReducer from './reducers';
import rootSaga from './sagas';

// Filter persitent state for connect reducer
// these states will not been rehydrated after app reloading
const accountsBacklist = createPersistStorageFilter(
    'accounts',
    [
        'isFetching',
        'errorMessage'
    ]
);
const kernelConstructorBlacklist = createPersistStorageFilter(
    'kernelconstructor',
    [
        'isSubmitting',
        'formValues.model', 
        'formValues.weights',
        'formErrors.model',
        'formErrors.weights',
        'lists',
        'messages',
        'progress',
        'errorMessages'
    ]
);
const datasetConstructorBlacklist = createPersistStorageFilter(
    'datasetconstructor',
    [
        'isSubmitting',
        'formValues.model', 
        'formValues.weights',
        'formErrors.model',
        'formErrors.weights',
        'lists',
        'messages',
        'progress',
        'errorMessages'
    ]
);
const jobConstructorBlacklist = createPersistStorageFilter(
    'jobconstructor',
    [
        'isSubmitting',
        'formValues.model', 
        'formValues.weights',
        'formErrors.model',
        'formErrors.weights',
        'lists',
        'messages',
        'progress',
        'errorMessages'
    ]
);
const kernelsTableBlacklist = createPersistStorageFilter(
    'kernels',
    [
        'isFetching',
        'errorMessage'
    ]
);
const datsetsTableBlacklist = createPersistStorageFilter(
    'datasets',
    [
        'isFetching',
        'errorMessage'
    ]
);
const jobsTableBlacklist = createPersistStorageFilter(
    'jobs',
    [
        'isFetching',
        'errorMessage'
    ]
);

const persistConfig = {
    debug: process.env.NODE_ENV !== 'production',
    key: packageConfig.name,
    storage,
    stateReconciler: autoMergeLevel2,
    transforms: [
        accountsBacklist,
        kernelConstructorBlacklist,
        datasetConstructorBlacklist,
        jobConstructorBlacklist,
        kernelsTableBlacklist,
        datsetsTableBlacklist,
        jobsTableBlacklist
    ],
    blacklist: ['router', 'pjs'] // exclude some states
};

export const history = createHistory();

export function configureStore(initialState, rehydrated = () => {}) {    
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : 
        compose;
    const combinedReducers = combineReducers({
        router: routerReducer,
        ...rootReducer
    });
    const persistedReducer = persistReducer(persistConfig, combinedReducers);

    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
    );

    const persistor = persistStore(store, null, rehydrated);

    sagaMiddleware.run(rootSaga);

    return { store, persistor };
}

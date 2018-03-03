import { fork, call, takeLatest } from 'redux-saga/effects';
// import * as mainActions from '../actions';

function logPathnames(from, to) {
    console.log(`Route from: ${from} to: ${to}`);
}

function* onLocationChange(e) {

    //console.log(e.payload)

    // Do something on location change
    // current route pathname in e.payload.pathname
    // previous pathname in e.payload.state.prevPath
    yield call(logPathnames, 
        e.payload.state ? e.payload.state.prevPath : '/',
        e.payload.pathname ? e.payload.pathname : '/'
    );
}

function* watchRouter() {
    yield takeLatest('@@router/LOCATION_CHANGE', onLocationChange);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

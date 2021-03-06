import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';

import config from '../../config';

function* initPjs() {

    try {
        const pjs = yield call(services.initPjs);        
        window.pjs = pjs;
        yield put(actions.pjsInitialized(pjs));
        const netId = yield call(services.getNetworkId, pjs.api.web3);

        if (config.ethId && netId !== config.ethId) {
            yield put(actions.pjsWrongNetwork());
        }
    } catch (error) {
        yield put(actions.pjsInitFailure(error));
    }
}

function* start() {
    yield put(actions.pjsInit());
}

// Invalidate error, wait and try to reconnect
function* autoInvalidateError() {
    const errorMessage = yield select(selectors.pjsErrorMessage);

    if (errorMessage) {
        
        yield call(delay, config.reconnect);
        yield put(actions.pjsInvalidateError());
        yield put(actions.pjsInit());
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest('persist/REHYDRATE', start);// Start if REHYDRATE process done only
    yield takeLatest(actions.PJS_INIT_REQUEST, initPjs);
    yield takeLatest(actions.PJS_INIT_FAILURE, autoInvalidateError);
}

// Default set of sagas
export default [
    fork(watchActions)
]

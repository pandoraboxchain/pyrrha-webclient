import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';
import config from '../../config';

function* connectWeb3() {
    try {
        const web3 = yield call(services.connectWeb3Provider);
        window.web4 = web3;//@todo Remove web4 from global scope
        yield put(actions.web3Connected(web3));
    } catch (error) {
        yield put(actions.web3ConnectFailure(error));
    }
}

// Connect web3
function* start() {
    yield put(actions.web3ConnectProvider());
}

// Invalidate error, wait and try to connect again
function* autoInvalidateError() {
    const errorMessage = yield select(selectors.web3ErrorMessage);

    if (errorMessage) {        
        yield call(delay, config.reconnect);
        yield put(actions.web3InvalidateError());
        yield put(actions.web3ConnectProvider());
    }
}

function* refreshAccounts() {
    try {
        const web3 = yield select(selectors.web3);
        const accounts = yield call(services.getAccounts, web3);
        yield put(actions.web3AccountsReceived(accounts));
    } catch(err) {
        // @todo Handle accounts refresh errors
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest('persist/REHYDRATE', start);// Start if REHYDRATE process done only
    yield takeLatest(actions.WEB3_CONNECT_REQUEST, connectWeb3);
    yield takeLatest(actions.WEB3_CONNECT_FAILURE, autoInvalidateError);
    yield takeLatest(actions.WEB3_ACCOUNTS_UPDATE, refreshAccounts);
}

// Default set of sagas
export default [
    fork(watchActions)
]

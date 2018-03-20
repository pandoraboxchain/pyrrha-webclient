import { put, fork, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';

function* refreshAccounts() {
    try {
        const web3 = yield select(selectors.web3);
        const accounts = yield web3.eth.getAccounts();
        yield put(actions.web3AccountsReceived(accounts));
    } catch(err) {
        yield put(actions.web3AccountsError(err));
    }
}

function* start() {
    yield put(actions.web3AccountsFetch());
}

// Sagas listeners
function* watchActions() {
    yield takeLatest('persist/REHYDRATE', start);// Start if REHYDRATE process done only
    yield takeLatest(actions.WEB3_ACCOUNTS_FETCH, refreshAccounts);
}

// Default set of sagas
export default [
    fork(watchActions)
]

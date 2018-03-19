import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';

function* refreshAccounts() {
    try {
        const web3 = yield select(selectors.web3);
        const accounts = yield call(web3.eth.getAccounts);
        yield put(actions.web3AccountsReceived(accounts));
    } catch(err) {
        yield put(actions.web3AccountsError(err));
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest('persist/REHYDRATE', refreshAccounts);// Start if REHYDRATE process done only
    yield takeLatest(actions.WEB3_ACCOUNTS_FETCH, refreshAccounts);
}

// Default set of sagas
export default [
    fork(watchActions)
]

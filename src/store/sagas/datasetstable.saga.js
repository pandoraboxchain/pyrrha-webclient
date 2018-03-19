import { fork, put, call, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';

function* startDatasetsFetch() {

    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.pjsInitFailure(error));
            return;
        }

        const pjs = yield select(selectors.pjs);
        const datsets = yield call(pjs.datasets.fetchAll);
        yield put(actions.datasetsTableReceived(datsets));
    } catch(err) {
        yield put(actions.datasetsTableFailure(err));
    }
}


function* watchRouter() {
    yield takeLatest('DATASET_TABLE_FETCH', startDatasetsFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

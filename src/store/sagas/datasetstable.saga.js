import { fork, put, call, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startDatasetsFetch() {

    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.web3ConnectFailure(error));
            return;
        }

        const web3 = yield select(selectors.web3);
        const datsets = yield call(services.fetchDatasets, web3);
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

import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';

function* startJobsFetch() {

    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.pjsInitFailure(error));
            return;
        }

        const pjs = yield select(selectors.pjs);
        const jobs = yield pjs.jobs.fetchAll();
        yield put(actions.jobsTableReceived(jobs));
    } catch(err) {
        yield put(actions.jobsTableFailure(err));
    }
}


function* watchRouter() {
    yield takeLatest('JOBS_TABLE_FETCH', startJobsFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

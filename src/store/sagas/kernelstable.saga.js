import { fork, put, call, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startKernelsFetch() {

    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.web3ConnectFailure(error));
            return;
        }

        const isMetaMask = yield select(selectors.isMetaMaskConnected);

        if (!isMetaMask) {

            const error = new Error('MetaMask is required but not detected!');
            yield put(actions.kernelsTableFailure(error));
            return;
        }

        const web3 = yield select(selectors.web3);
        const kernels = yield call(services.fetchKernels, web3);
        yield put(actions.kernelsTableReceived(kernels));
    } catch(err) {
        yield put(actions.kernelsTableFailure(err));
    }
}


function* watchRouter() {
    yield takeLatest('KERNEL_TABLE_FETCH', startKernelsFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

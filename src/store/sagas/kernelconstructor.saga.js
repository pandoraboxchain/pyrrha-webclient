import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';

function* constructKernel() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.kernelConstructorFailure(error));
            yield put(actions.web3ConnectFailure(error));
            return;
        }

        const formValues = yield select(selectors.getKernelConFormValues);
        const validatedFormData = yield call(services.validateKernelConstructorForm, formValues);

        const kernelIpfsHash = yield call(services.uploadModelAndWeightsToIpfs, 
            validatedFormData, 
            progress => actions.kernelConstructorIpfsProgress(progress));

        const web3 = yield select(selectors.web3);
        yield call(services.deployKernelContract, web3, kernelIpfsHash, validatedFormData);
        
        yield put(actions.kernelConstructorSuccess('Kernel successfully constructed and deployed'));
    } catch(error) {
        yield put(actions.kernelConstructorFailure(error));
    }
}

function* watchActions() {
    yield takeLatest(actions.KERNEL_CONSTRUCTOR_START, constructKernel);
}

// Default set of sagas
export default [
    fork(watchActions)
]

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

        // form validation
        const formValues = yield select(selectors.getKernelConFormValues);
        const validatedFormData = yield call(services.validateKernelConstructorForm, formValues);
        yield put(actions.addKernelConstructorMessage('Constructor form validated successfully'));

        // upload files to the IPFS
        const kernelIpfsHash = yield call(services.uploadModelAndWeightsToIpfs, 
            validatedFormData, 
            progress => actions.kernelConstructorIpfsProgress(progress));
        yield put(actions.addKernelConstructorMessage('Model and weights files successfully uploaded to IPFS'));
        
        // deploy kernel contract
        const web3 = yield select(selectors.web3);
        const kernelContractAddress = yield call(services.deployKernelContract, web3, kernelIpfsHash, validatedFormData);
        yield put(actions.addKernelConstructorMessage(`Kernel successfully constructed and deployed. Сontract address: ${kernelContractAddress}`));
        
        // add contract to market
        yield call(services.addKernelToMarket, web3, kernelContractAddress, validatedFormData.publisher);
        yield put(actions.kernelConstructorSuccess(`Kernel successfully added to Market`));
    } catch(error) {
        yield put(actions.kernelConstructorFailure(error));
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest(actions.KERNEL_CONSTRUCTOR_START, constructKernel);
}

// Default set of sagas
export default [
    fork(watchActions)
]

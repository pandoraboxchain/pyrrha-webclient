import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as utils from '../../utils';
import * as models from '../models';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';

function* constructKernel() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.pjsInitFailure(error));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getKernelConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.KernelConstructorFormModel, formValues);
        yield put(actions.addKernelConstructorMessage('Constructor form validated successfully'));

        
        const pjs = yield select(selectors.pjs);

        const { model, weights } = validatedFormData;
        
        // upload kernel json to the IPFS
        yield put(actions.addKernelConstructorStatusMessage('Uploading of kernel`s configuration to IPFS'));
        const kernelIpfsHash = yield call(services.uploadKernelJsonToIpfs, 
            model, 
            weights,
            progress => actions.kernelConstructorIpfsProgress(progress), pjs);
        yield put(actions.addKernelConstructorMessage('Kernel JSON file has been successfully uploaded to IPFS'));
        
        const { dimension, complexity, price, metadata, description } = validatedFormData;

        // deploy kernel contract
        yield put(actions.kernelConstructorStatusMessageDismiss());
        yield put(actions.addKernelConstructorStatusMessage('Deploying of the kernel smart-contract. You should confirm this transaction with Metamask'));
        const kernelContractAddress = yield pjs.kernels.deploy(kernelIpfsHash, 
            { dimension, complexity, price, metadata, description }, 
            validatedFormData.publisher);
        yield put(actions.kernelsTableFetch());
        yield put(actions.addKernelConstructorMessage(`Kernel successfully constructed and deployed. Сontract address: ${kernelContractAddress}`));
        
        // add contract to market
        yield put(actions.kernelConstructorStatusMessageDismiss());
        yield put(actions.addKernelConstructorStatusMessage('Publishing of the kernel on PandoraMarket. You should confirm this transaction with Metamask'));
        yield pjs.kernels.addToMarket(kernelContractAddress, validatedFormData.publisher);
        yield put(actions.kernelConstructorSuccess(`Kernel successfully added to Market`));
        yield put(actions.kernelConstructorStatusMessageDismiss());

    } catch(error) {
        console.error(error)
        yield put(actions.kernelConstructorFailure(error));
        yield put(actions.kernelConstructorStatusMessageDismiss());
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

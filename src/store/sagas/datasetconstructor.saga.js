import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as utils from '../../utils';
import * as models from '../models';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';

function* constructDataset() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.datasetConstructorFailure(error));
            yield put(actions.web3ConnectFailure(error));
            return;
        }

        const isMetaMask = yield select(selectors.isMetaMaskConnected);

        if (!isMetaMask) {

            const error = new Error('MetaMask is required but not detected!');
            yield put(actions.datasetConstructorFailure(error));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getDatasetConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.DatasetConstructorFormModel, formValues);
        yield put(actions.addDatasetConstructorMessage('Constructor form validated successfully'));

        // upload files to the IPFS
        const { ipfsHash, batchesCount } = yield call(services.uploadDatasetBatchesToIpfs, 
            Object.keys(validatedFormData.batch).map(item => validatedFormData.batch[item]), 
            progress => actions.datasetConstructorIpfsProgress(progress));
        yield put(actions.addDatasetConstructorMessage(`Dataset in count of ${batchesCount} batches has been successfully uploaded to IPFS`));
        
        // deploy dataset contract
        const web3 = yield select(selectors.web3);
        const datasetContractAddress = yield call(services.deployDatasetContract, web3, ipfsHash, batchesCount, validatedFormData);
        yield put(actions.addDatasetConstructorMessage(`Dataset successfully constructed and has been deployed. Сontract address: ${datasetContractAddress}`));
        
        // add contract to market
        yield call(services.addDatasetToMarket, web3, datasetContractAddress, validatedFormData.publisher);
        yield put(actions.datasetConstructorSuccess(`Dataset has been successfully added to Market`));
    } catch(error) {
        yield put(actions.datasetConstructorFailure(error));
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest(actions.DATASET_CONSTRUCTOR_START, constructDataset);
}

// Default set of sagas
export default [
    fork(watchActions)
]

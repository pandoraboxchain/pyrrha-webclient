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
            yield put(actions.pjsInitFailure(error));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getDatasetConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.DatasetConstructorFormModel, formValues);
        yield put(actions.addDatasetConstructorMessage('Constructor form validated successfully'));

        const pjs = yield select(selectors.pjs);

        // upload files to the IPFS
        const { ipfsHash, batchesCount } = yield call(services.uploadDatasetBatchesToIpfs, 
            Object.keys(validatedFormData.batch).map(item => validatedFormData.batch[item]), 
            progress => actions.datasetConstructorIpfsProgress(progress), pjs);
        yield put(actions.addDatasetConstructorMessage(`Dataset in count of ${batchesCount} batches has been successfully uploaded to IPFS`));
        
        // deploy dataset contract
        const datasetContractAddress = yield call(pjs.datasets.deploy, ipfsHash, batchesCount, validatedFormData);
        yield put(actions.addDatasetConstructorMessage(`Dataset successfully constructed and has been deployed. Сontract address: ${datasetContractAddress}`));
        
        // add contract to market
        yield call(pjs.datasets.addToMarket, datasetContractAddress, validatedFormData.publisher);
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

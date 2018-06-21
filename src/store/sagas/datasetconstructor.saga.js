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
        console.log(formValues)
        const validatedFormData = yield call(utils.validateConstructorForm, models.DatasetConstructorFormModel, formValues);
        const datasetOptions = utils.parseOptionsStr(validatedFormData.options || '{}');
        yield put(actions.addDatasetConstructorMessage('Constructor form validated successfully'));

        const pjs = yield select(selectors.pjs);

        let datasetConfig = {};
        let batchesCount = 0;

        switch (validatedFormData['jobType']) {
            case '0':
                datasetConfig = {
                    train: {
                        'train_x': validatedFormData['train_x'],
                        'train_y': validatedFormData['train_y'], 
                    }
                };
                batchesCount = 1;
                break;
            case '1':
                datasetConfig = {
                    batches: Object.keys(validatedFormData.batch).map(item => validatedFormData.batch[item])
                };
                batchesCount = datasetConfig.batches.length;
                break;
            default:
        }

        datasetConfig.options = datasetOptions;

        console.log('Dataset config:', datasetConfig);

        const uploadedConfigHash = yield call(services.uploadDatasetConfig, 
            datasetConfig,
            progress => actions.datasetConstructorIpfsProgress(progress),
            pjs);
        yield put(actions.addDatasetConstructorMessage(`Dataset configuration file has been successfully uploaded to IPFS: "${uploadedConfigHash}"`));
        
        const { dimension, price, metadata, description, publisher } = validatedFormData;

        // deploy dataset contract
        const datasetContractAddress = yield pjs.datasets.deploy(uploadedConfigHash, 
            batchesCount, 
            { dimension, price, metadata, description }, 
            publisher);
        yield put(actions.addDatasetConstructorMessage(`Dataset successfully constructed and has been deployed. Сontract address: ${datasetContractAddress}`));
        
        // add contract to market
        yield pjs.datasets.addToMarket(datasetContractAddress, validatedFormData.publisher);
        yield put(actions.datasetConstructorSuccess(`Dataset has been successfully added to Market`));
    } catch(error) {
        console.error(error)
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

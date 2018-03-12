import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as utils from '../../utils';
import * as models from '../models';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as services from '../../services';

function* constructJob() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.jobConstructorFailure(error));
            yield put(actions.web3ConnectFailure(error));
            return;
        }

        const isMetaMask = yield select(selectors.isMetaMaskConnected);

        if (!isMetaMask) {

            const error = new Error('MetaMask is required but not detected!');
            yield put(actions.jobConstructorFailure(error));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getJobConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.JobConstructorFormModel, formValues);
        yield put(actions.addJobConstructorMessage('Constructor form validated successfully'));

        // create job
        const web3 = yield select(selectors.web3);
        const jobAddress = yield call(services.createCognitiveJob, web3, validatedFormData);

        if (jobAddress) {

            yield put(actions.jobConstructorSuccess(`Cognitive Job successfully created. Сontract address: ${jobAddress}`));
        } else {

            yield put(actions.jobConstructorFailure(new Error(`Cognitive job has not been created. 
            Pandora contract createCognitiveJob method return "${jobAddress}"`)));
        }        
    } catch(error) {
        yield put(actions.jobConstructorFailure(error));
    }
}

// Sagas listeners
function* watchActions() {
    yield takeLatest(actions.JOB_CONSTRUCTOR_START, constructJob);
}

// Default set of sagas
export default [
    fork(watchActions)
]

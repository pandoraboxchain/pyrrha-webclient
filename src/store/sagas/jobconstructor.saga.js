import { call, put, fork, select, takeLatest } from 'redux-saga/effects';

import * as utils from '../../utils';
import * as models from '../models';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* constructJob() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            const error = new Error('Web3 not connected!');
            yield put(actions.pjsInitFailure(error));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getJobConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.JobConstructorFormModel, formValues);
        yield put(actions.addJobConstructorMessage('Constructor form validated successfully'));

        const pjs = yield select(selectors.pjs);

        // create job
        const { jobType, kernel, dataset, publisher, complexity, description } = validatedFormData;
        const jobAddress = yield pjs.jobs.create({ jobType, kernel, dataset, complexity, description }, publisher);

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

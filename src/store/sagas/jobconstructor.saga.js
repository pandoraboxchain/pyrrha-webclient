import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { maxBatchesCount, maxJobsCount } from '../../config/constants'

import * as utils from '../../utils';
import * as models from '../models';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* constructJob() {
    
    try {
        const isConnected = yield select(selectors.isWeb3Connected);

        if (!isConnected) {

            yield put(actions.pjsInitFailure(new Error('Web3 not connected!')));
            return;
        }

        // form validation
        const formValues = yield select(selectors.getJobConFormValues);
        const validatedFormData = yield call(utils.validateConstructorForm, models.JobConstructorFormModel, formValues);
        yield put(actions.addJobConstructorMessage('Constructor form validated successfully'));

        const pjs = yield select(selectors.pjs);

        // create job
        const { jobType, kernel, dataset, publisher, complexity, description } = validatedFormData;
        
        const datasetObj = yield pjs.datasets.fetchDataset(dataset);        
        
        // Maximum batches count should not be more then 10
        if (datasetObj.batchesCount > maxBatchesCount) {

            yield put(actions.jobConstructorFailure(`Dataset "${datasetObj.description}" 
                consists of ${datasetObj.batchesCount} data batches. Maximum alowed count of butches is ${maxBatchesCount}`));
            return;
        }

        const kernelObj = yield pjs.kernels.fetchKernel(kernel);

        // Data dimension of dataset and kernel should be equal
        if (datasetObj.dataDim !== kernelObj.dataDim) {

            yield put(actions.jobConstructorFailure(`Data dimension of dataset and kernel are not equal`));
            return;
        }

        const idleCount = yield pjs.workers.fetchIdleCount();

        // Job can be created if dataset batchesCount not more then "count" of worker nodes in idle state
        if (datasetObj.batchesCount > idleCount) {

            yield put(actions.jobConstructorFailure(`Insuficient of currently available worker nodes to start the job. 
                Dataset consists of ${datasetObj.batchesCount} batches. Available worker nodes count: ${idleCount}`));
            return;
        }

        const jobsCount = yield pjs.jobs.fetchCognitiveJobsCount();

        // Current count of jobs should not be more then 2^16-1
        if (jobsCount >= maxJobsCount) {

            yield put(actions.jobConstructorFailure(`Maximum limit of cognitive jobs is exceeded`));
            return;
        }

        const jobAddress = yield pjs.jobs.create({ jobType, kernel, dataset, complexity, description }, publisher);

        if (jobAddress) {

            yield put(actions.jobsTableFetch());
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

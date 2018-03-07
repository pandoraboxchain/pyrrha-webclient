import { reduxAction as action } from '../../utils';
import { DatasetConstructorFormModel } from '../models';

export const DATASET_RESET_STATE = 'DATASET_RESET_STATE';
export const DATASET_CONSTRUCTOR_START = 'DATASET_CONSTRUCTOR_START';
export const DATASET_CONSTRUCTOR_DONE = 'DATASET_CONSTRUCTOR_DONE';
export const DATASET_CONSTRUCTOR_FAILURE = 'DATASET_CONSTRUCTOR_FAILURE';
export const DATASET_CONSTRUCTOR_FIELD_UPDATED = 'DATASET_CONSTRUCTOR_FIELD_UPDATED';
export const DATASET_CONSTRUCTOR_ERROR_INVALIDATE = 'DATASET_CONSTRUCTOR_ERROR_INVALIDATE';
export const DATASET_CONSTRUCTOR_MESSAGE_DISMISS = 'DATASET_CONSTRUCTOR_MESSAGE_INVALIDATE';
export const DATASET_CONSTRUCTOR_IPFS_PROGRESS = 'DATASET_CONSTRUCTOR_IPFS_PROGRESS';
export const DATASET_CONSTRUCTOR_MESSAGE = 'DATASET_CONSTRUCTOR_MESSAGE';
export const DATASET_ADD_NEW_BATCH = 'DATASET_ADD_NEW_BATCH';
export const DATASET_REMOVE_BATCH = 'DATASET_REMOVE_BATCH';

const isFieldValid = (field, value) => {

    if (DatasetConstructorFormModel[field]) {

        return DatasetConstructorFormModel[field].validator(value);
    }

    throw new Error(`Field "${field}" not found in the model`);
};

export const setDatasetConstructorField = (field, value, item) => action(DATASET_CONSTRUCTOR_FIELD_UPDATED, {
    field,
    value,
    item,
    error: !isFieldValid(field, value)    
});

export const resetDatasetConstructorState = () => action(DATASET_RESET_STATE);
export const dismissDatasetConstructorMessage = index => action(DATASET_CONSTRUCTOR_MESSAGE_DISMISS, { index });
export const invalidateDatasetConstructorError = () => action(DATASET_CONSTRUCTOR_ERROR_INVALIDATE);
export const submitDatasetConstructorForm = () => action(DATASET_CONSTRUCTOR_START);
export const datasetConstructorFailure = error => action(DATASET_CONSTRUCTOR_FAILURE, { error });
export const datasetConstructorSuccess = (message = undefined) => action(DATASET_CONSTRUCTOR_DONE, { message });
export const datasetConstructorIpfsProgress = progress => action(DATASET_CONSTRUCTOR_IPFS_PROGRESS, { progress });
export const addDatasetConstructorMessage = (message = undefined) => action(DATASET_CONSTRUCTOR_MESSAGE, { message });
export const addDatasetBatch = name => action(DATASET_ADD_NEW_BATCH, { name });
export const removeDatasetBatch = (name, item) => action(DATASET_REMOVE_BATCH, { name, item });

import { reduxAction as action, isFormFieldValid } from '../../utils';
import { JobConstructorFormModel } from '../models';

export const JOB_RESET_STATE = 'JOB_RESET_STATE';
export const JOB_CONSTRUCTOR_START = 'JOB_CONSTRUCTOR_START';
export const JOB_CONSTRUCTOR_DONE = 'JOB_CONSTRUCTOR_DONE';
export const JOB_CONSTRUCTOR_FAILURE = 'JOB_CONSTRUCTOR_FAILURE';
export const JOB_CONSTRUCTOR_FIELD_UPDATED = 'JOB_CONSTRUCTOR_FIELD_UPDATED';
export const JOB_CONSTRUCTOR_ERROR_INVALIDATE = 'JOB_CONSTRUCTOR_ERROR_INVALIDATE';
export const JOB_CONSTRUCTOR_MESSAGE_DISMISS = 'JOB_CONSTRUCTOR_MESSAGE_INVALIDATE';
export const JOB_CONSTRUCTOR_IPFS_PROGRESS = 'JOB_CONSTRUCTOR_IPFS_PROGRESS';
export const JOB_CONSTRUCTOR_MESSAGE = 'JOB_CONSTRUCTOR_MESSAGE';

export const setJobConstructorField = (field, value) => action(JOB_CONSTRUCTOR_FIELD_UPDATED, {
    field,
    error: !isFormFieldValid(JobConstructorFormModel, field, value),
    value
});
export const resetJobConstructorState = () => action(JOB_RESET_STATE);
export const dismissJobConstructorMessage = index => action(JOB_CONSTRUCTOR_MESSAGE_DISMISS, { index });
export const invalidateJobConstructorError = () => action(JOB_CONSTRUCTOR_ERROR_INVALIDATE);
export const submitJobConstructorForm = () => action(JOB_CONSTRUCTOR_START);
export const jobConstructorFailure = error => action(JOB_CONSTRUCTOR_FAILURE, { error });
export const jobConstructorSuccess = (message = undefined) => action(JOB_CONSTRUCTOR_DONE, { message });
export const jobConstructorIpfsProgress = progress => action(JOB_CONSTRUCTOR_IPFS_PROGRESS, { progress });
export const addJobConstructorMessage = (message = undefined) => action(JOB_CONSTRUCTOR_MESSAGE, { message });

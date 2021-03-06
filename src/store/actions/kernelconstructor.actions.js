import { reduxAction as action, isFormFieldValid } from '../../utils';
import { KernelConstructorFormModel } from '../models';

export const KERNEL_RESET_STATE = 'KERNEL_RESET_STATE';
export const KERNEL_CONSTRUCTOR_START = 'KERNEL_CONSTRUCTOR_START';
export const KERNEL_CONSTRUCTOR_DONE = 'KERNEL_CONSTRUCTOR_DONE';
export const KERNEL_CONSTRUCTOR_FAILURE = 'KERNEL_CONSTRUCTOR_FAILURE';
export const KERNEL_CONSTRUCTOR_FIELD_UPDATED = 'KERNEL_CONSTRUCTOR_FIELD_UPDATED';
export const KERNEL_CONSTRUCTOR_ERROR_INVALIDATE = 'KERNEL_CONSTRUCTOR_ERROR_INVALIDATE';
export const KERNEL_CONSTRUCTOR_MESSAGE_DISMISS = 'KERNEL_CONSTRUCTOR_MESSAGE_INVALIDATE';
export const KERNEL_CONSTRUCTOR_IPFS_PROGRESS = 'KERNEL_CONSTRUCTOR_IPFS_PROGRESS';
export const KERNEL_CONSTRUCTOR_MESSAGE = 'KERNEL_CONSTRUCTOR_MESSAGE';
export const KERNEL_CONSTRUCTOR_STATUS_MESSAGE = 'KERNEL_CONSTRUCTOR_STATUS_MESSAGE';
export const KERNEL_CONSTRUCTOR_STATUS_MESSAGE_DISMISS = 'KERNEL_CONSTRUCTOR_STATUS_MESSAGE_DISMISS';

export const setKernelConstructorField = (field, value) => action(KERNEL_CONSTRUCTOR_FIELD_UPDATED, {
    field,
    error: !isFormFieldValid(KernelConstructorFormModel, field, value),
    value
});
export const resetKernelConstructorState = () => action(KERNEL_RESET_STATE);
export const dismissKernelConstructorMessage = index => action(KERNEL_CONSTRUCTOR_MESSAGE_DISMISS, { index });
export const invalidateKernelConstructorError = () => action(KERNEL_CONSTRUCTOR_ERROR_INVALIDATE);
export const submitKernelConstructorForm = () => action(KERNEL_CONSTRUCTOR_START);
export const kernelConstructorFailure = error => action(KERNEL_CONSTRUCTOR_FAILURE, { error });
export const kernelConstructorSuccess = (message = undefined) => action(KERNEL_CONSTRUCTOR_DONE, { message });
export const kernelConstructorIpfsProgress = progress => action(KERNEL_CONSTRUCTOR_IPFS_PROGRESS, { progress });
export const addKernelConstructorMessage = (message = undefined) => action(KERNEL_CONSTRUCTOR_MESSAGE, { message });
export const addKernelConstructorStatusMessage = message => action(KERNEL_CONSTRUCTOR_STATUS_MESSAGE, { message });
export const kernelConstructorStatusMessageDismiss = () => action(KERNEL_CONSTRUCTOR_STATUS_MESSAGE_DISMISS);

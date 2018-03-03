import { KernelConstructorFormModel } from '../models';

export const KERNEL_CONSTRUCTOR_START = 'KERNEL_CONSTRUCTOR_START';
export const KERNEL_CONSTRUCTOR_DONE = 'KERNEL_CONSTRUCTOR_DONE';
export const KERNEL_CONSTRUCTOR_FAILURE = 'KERNEL_CONSTRUCTOR_FAILURE';
export const KERNEL_CONSTRUCTOR_FIELD_UPDATED = 'KERNEL_CONSTRUCTOR_FIELD_UPDATED';
export const KERNEL_CONSTRUCTOR_ERROR_INVALIDATE = 'KERNEL_CONSTRUCTOR_ERROR_INVALIDATE';
export const KERNEL_CONSTRUCTOR_MESSAGE_DISMISS = 'KERNEL_CONSTRUCTOR_MESSAGE_INVALIDATE';
export const KERNEL_CONSTRUCTOR_IPFS_PROGRESS = 'KERNEL_CONSTRUCTOR_IPFS_PROGRESS';

function action(type, payload = {}) {
    return { type, ...payload }
}

const isFieldValid = (name, value) => {

    if (KernelConstructorFormModel[name]) {

        return KernelConstructorFormModel[name].validator(value);
    }

    throw new Error('Field name not found in the model');
};

export const setKernelConstructorField = (field, value) => action(KERNEL_CONSTRUCTOR_FIELD_UPDATED, {
    field,
    error: !isFieldValid(field, value),
    value
});

export const dismissKernelConstructorMessage = (index) => action(KERNEL_CONSTRUCTOR_MESSAGE_DISMISS, { index });
export const invalidateKernelConstructorError = () => action(KERNEL_CONSTRUCTOR_ERROR_INVALIDATE);
export const submitKernelConstructorForm = () => action(KERNEL_CONSTRUCTOR_START);
export const kernelConstructorFailure = (error) => action(KERNEL_CONSTRUCTOR_FAILURE, { error });
export const kernelConstructorSuccess = (message = undefined) => action(KERNEL_CONSTRUCTOR_DONE, { message });
export const kernelConstructorIpfsProgress = (progress) => action(KERNEL_CONSTRUCTOR_IPFS_PROGRESS, { progress });

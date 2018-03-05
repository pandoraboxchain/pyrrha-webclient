// import { createSelector } from 'reselect';

export const isKernelConSubmitting = state => state.kernelconstructor.isSubmitting;
export const getKernelConLists = state => state.kernelconstructor.lists;
export const getKernelConFormValues = state => state.kernelconstructor.formValues;
export const getKernelConMessages = state => state.kernelconstructor.messages;
export const getKernelConErrorMessages = state => state.kernelconstructor.errorMessages;
export const getKernelConFormErrors = state => state.kernelconstructor.formErrors;
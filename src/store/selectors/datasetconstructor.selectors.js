// import { createSelector } from 'reselect';

export const isDatasetConSubmitting = state => state.datasetconstructor.isSubmitting;
export const getDatasetConLists = state => state.datasetconstructor.lists;
export const getDatasetConFormValues = state => state.datasetconstructor.formValues;
export const getDatasetConMessages = state => state.datasetconstructor.messages;
export const getDatasetConErrorMessages = state => state.datasetconstructor.errorMessages;
export const getDatasetConFormErrors = state => state.datasetconstructor.formErrors;
export const getDatasetConFormProgress = state => state.datasetconstructor.progress;
export const getDatasetConFormStatus = state => state.datasetconstructor.statusMessage;

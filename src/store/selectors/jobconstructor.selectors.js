// import { createSelector } from 'reselect';

export const isJobConSubmitting = state => state.jobconstructor.isSubmitting;
export const getJobConLists = state => state.jobconstructor.lists;
export const getJobConFormValues = state => state.jobconstructor.formValues;
export const getJobConMessages = state => state.jobconstructor.messages;
export const getJobConErrorMessages = state => state.jobconstructor.errorMessages;
export const getJobConFormErrors = state => state.jobconstructor.formErrors;
export const getJobConFormProgress = state => state.jobconstructor.progress;
export const getJobConFormStatus = state => state.jobconstructor.statusMessage;

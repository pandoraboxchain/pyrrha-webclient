// import { createSelector } from 'reselect';

export const isJobsFetching = state => !!state.jobs.isFetching;
export const jobsError = state => !!state.jobs.errorMessage;
export const getJobs = state => state.jobs.jobs;

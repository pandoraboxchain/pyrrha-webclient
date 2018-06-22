import { reduxAction as action } from '../../utils';

export const JOBS_TABLE_FETCH = 'JOBS_TABLE_FETCH';
export const JOBS_TABLE_RECEIVED = 'JOBS_TABLE_RECEIVED';
export const JOBS_TABLE_ERROR = 'JOBS_TABLE_ERROR';

export const jobsTableFetch = () => action(JOBS_TABLE_FETCH);
export const jobsTableReceived = jobs => action(JOBS_TABLE_RECEIVED, { jobs });
export const jobsTableFailure = error => action(JOBS_TABLE_ERROR, { error });

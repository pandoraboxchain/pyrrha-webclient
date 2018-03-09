import { reduxAction as action } from '../../utils';

export const DATASET_TABLE_FETCH = 'DATASET_TABLE_FETCH';
export const DATASET_TABLE_RECEIVED = 'DATASET_TABLE_RECEIVED';
export const DATASET_TABLE_ERROR = 'DATASET_TABLE_ERROR';

export const datasetsTableFetch = () => action(DATASET_TABLE_FETCH);
export const datasetsTableReceived = datasets => action(DATASET_TABLE_RECEIVED, { datasets });
export const datasetsTableFailure = error => action(DATASET_TABLE_ERROR, { error });

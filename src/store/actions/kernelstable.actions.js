import { reduxAction as action } from '../../utils';

export const KERNEL_TABLE_FETCH = 'KERNEL_TABLE_FETCH';
export const KERNEL_TABLE_RECEIVED = 'KERNEL_TABLE_RECEIVED';
export const KERNEL_TABLE_ERROR = 'KERNEL_TABLE_ERROR';

export const kernelsTableFetch = () => action(KERNEL_TABLE_FETCH);
export const kernelsTableReceived = kernels => action(KERNEL_TABLE_RECEIVED, { kernels });
export const kernelsTableFailure = error => action(KERNEL_TABLE_ERROR, { error });

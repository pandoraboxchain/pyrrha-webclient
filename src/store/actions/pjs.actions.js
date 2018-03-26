import { reduxAction as action } from '../../utils';

export const PJS_INIT_REQUEST = 'PJS_INIT_REQUEST';
export const PJS_INIT_DONE = 'PJS_INIT_DONE';
export const PJS_INIT_FAILURE = 'PJS_INIT_FAILURE';
export const PJS_INVALIDATE_ERROR = 'PJS_INVALIDATE_ERROR';
export const PJS_WEB3_WRONG_NETWORK = 'PJS_WEB3_WRONG_NETWORK';

export const pjsInit = () => action(PJS_INIT_REQUEST);
export const pjsInitialized = pjs => action(PJS_INIT_DONE, { pjs, connectedAt: Date.now() });
export const pjsInitFailure = error => action(PJS_INIT_FAILURE, { error });
export const pjsInvalidateError = () => action(PJS_INVALIDATE_ERROR);
export const pjsWrongNetwork = () => action(PJS_WEB3_WRONG_NETWORK);

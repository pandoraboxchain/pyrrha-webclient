import { reduxAction as action } from '../../utils';

export const WEB3_ACCOUNTS_FETCH = 'WEB3_ACCOUNTS_FETCH';
export const WEB3_ACCOUNTS_RECEIVED = 'WEB3_ACCOUNTS_RECEIVED';
export const WEB3_ACCOUNTS_ERROR = 'WEB3_ACCOUNTS_ERROR';
export const WEB3_ACCOUNTS_INVALIDATE_ERROR = 'WEB3_ACCOUNTS_INVALIDATE_ERROR';

export const web3AccountsFetch = () => action(WEB3_ACCOUNTS_FETCH);
export const web3AccountsReceived = accounts => action(WEB3_ACCOUNTS_RECEIVED, { accounts });
export const web3AccountsError = error => action(WEB3_ACCOUNTS_ERROR, { error });
export const web3AccountsInvalidateError = () => action(WEB3_ACCOUNTS_INVALIDATE_ERROR);

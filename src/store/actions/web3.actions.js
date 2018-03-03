export const WEB3_CONNECT_REQUEST = 'WEB3_CONNECT_REQUEST';
export const WEB3_CONNECT_DONE = 'WEB3_CONNECT_DONE';
export const WEB3_CONNECT_FAILURE = 'WEB3_CONNECT_FAILURE';
export const WEB3_INVALIDATE_ERROR = 'WEB3_INVALIDATE_ERROR';

function action(type, payload = {}) {
    return { type, ...payload }
}

export const web3ConnectProvider = () => action(WEB3_CONNECT_REQUEST);
export const web3Connected = (web3) => action(WEB3_CONNECT_DONE, { web3, connectedAt: Date.now() });
export const web3ConnectFailure = (error) => action(WEB3_CONNECT_FAILURE, { error });
export const web3InvalidateError = () => action(WEB3_INVALIDATE_ERROR);

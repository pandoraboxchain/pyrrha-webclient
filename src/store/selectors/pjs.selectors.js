import { createSelector } from 'reselect';

export const isPjsInitializing = state => !!state.pjs.isInitializing;
export const pjsConnectedAt = state => state.pjs.connectedAt;
export const pjsErrorMessage = state => state.pjs.errorMessage;

export const pjs = state => state.pjs;
export const web3 = state => state.pjs.web3;
export const isWeb3Connected = state => !!state.pjs.web3;
export const web3Version = createSelector(
    web3,
    web3 => web3 ? web3.version : ''
);
export const isMetaMaskConnected = createSelector(
    web3,
    web3 => web3.currentProvider.isMetaMask
);
export const pjsWeb3ConnectedTo = createSelector(
    web3,
    isMetaMaskConnected,
    (web3, isMetaMask) => isMetaMask ? 'MetaMask' : web3.currentProvider.host
);

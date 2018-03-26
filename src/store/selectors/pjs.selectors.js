import { createSelector } from 'reselect';

export const isPjsInitializing = state => !!state.pjs.isInitializing;
export const pjsConnectedAt = state => state.pjs.connectedAt;
export const pjsErrorMessage = state => state.pjs.errorMessage;

export const pjs = state => state.pjs.pjs;
export const web3 = state => state.pjs.pjs.api.web3;
export const ipfs = state => state.pjs.pjs.api.ipfs;
export const isWrongNetwork = state => state.pjs.isWrongNetwork;
export const web3Version = createSelector(
    web3,
    web3 => web3 ? web3.version : ''
);
export const isWeb3Connected = createSelector(
    web3Version,
    version => !!version
);
export const isMetaMaskConnected = createSelector(
    web3,
    web3 => web3 ? web3.currentProvider.isMetaMask : false
);
export const pjsWeb3ConnectedTo = createSelector(
    web3,
    isMetaMaskConnected,
    (web3, isMetaMask) => {
        
        if (!web3) {
            return 'Not connected';
        }

        return isMetaMask ? 'MetaMask' : web3.currentProvider.host;
    }
);

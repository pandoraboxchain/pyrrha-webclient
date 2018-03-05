import { createSelector } from 'reselect';

// Web3 connection
export const isWeb3Connecting = state => !!state.connect.isConnecting;
export const isWeb3Connected = state => !!state.connect.isConnected;
export const web3ConnectedTo = state => state.connect.connectedTo;
export const web3ConnectedAt = state => state.connect.connectedAt;
export const web3ErrorMessage = state => state.connect.errorMessage;
export const web3IsError = state => !!state.connect.errorMessage;
export const web3 = state => state.connect.web3;
export const web3Version = createSelector(
    web3,
    web3 => web3 ? web3.version : ''
);
export const isWeb3AccountsRefreshing = state => state.connect.isAccountsRefreshing;

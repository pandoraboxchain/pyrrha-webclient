import {
    WEB3_CONNECT_REQUEST,
    WEB3_CONNECT_DONE,
    WEB3_CONNECT_FAILURE,
    WEB3_INVALIDATE_ERROR,
    WEB3_ACCOUNTS_UPDATE,
    WEB3_ACCOUNTS_RECEIVED
} from '../actions';

const initialState = {
    web3: null,
    isMetaMask: false,
    isConnecting: false,
    isConnected: false,
    connectedTo: '',
    connectedAt: null,
    isAccountsRefreshing: false,
    accounts: [],
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    console.log('Action:', action.type, action);

    switch (action.type) {
        
        case WEB3_CONNECT_REQUEST:
            return { 
                ...state,
                web3: null, 
                isMetaMask: false,
                isConnecting: true, 
                isConnected: false,
                connectedTo: '',
                connectedAt: null,
                isAccountsRefreshing: false,
                accounts: [] ,
                errorMessage: null 
            };

        case WEB3_CONNECT_DONE:
            return {
                ...state,
                web3: action.web3, 
                isMetaMask: action.web3.currentProvider.isMetaMask,
                isConnecting: false,
                isConnected: true,
                connectedTo: action.web3.currentProvider.isMetaMask ? 'MetaMask' : action.web3.currentProvider.host,
                connectedAt: action.connectedAt, 
                errorMessage: null
            };

        case WEB3_CONNECT_FAILURE:
            return { 
                ...state, 
                web3: null,
                isMetaMask: false,
                isConnecting: false, 
                isConnected: false,
                connectedTo: '',
                connectedAt: null, 
                isAccountsRefreshing: false,
                accounts: [] ,
                errorMessage: action.error.message 
            };

        case WEB3_INVALIDATE_ERROR:
            return { ...state, errorMessage: null };
        
        case WEB3_ACCOUNTS_UPDATE:
            return {
                ...state,
                isAccountsRefreshing: true
            };

        case WEB3_ACCOUNTS_RECEIVED:
            return {
                ...state,
                isAccountsRefreshing: false,
                accounts: action.accounts
            };

        default:
            return state;
    }
};

import {
    WEB3_CONNECT_REQUEST,
    WEB3_CONNECT_DONE,
    WEB3_CONNECT_FAILURE,
    WEB3_INVALIDATE_ERROR
} from '../actions';

const initialState = {
    web3: null,
    isMetaMask: false,
    isConnecting: false,
    isConnected: false,
    connectedTo: '',
    connectedAt: null,
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

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
                errorMessage: action.error.message 
            };

        case WEB3_INVALIDATE_ERROR:
            return { ...state, errorMessage: null };
        
        default:
            return state;
    }
};

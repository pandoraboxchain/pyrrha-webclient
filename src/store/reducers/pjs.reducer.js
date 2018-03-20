import {
    PJS_INIT_REQUEST,
    PJS_INIT_DONE,
    PJS_INIT_FAILURE,
    PJS_INVALIDATE_ERROR
} from '../actions';

const initialState = {
    pjs: {},
    isInitializing: false,
    connectedTo: null,
    connectedAt: null,    
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    console.log(action);

    switch (action.type) {
        
        case PJS_INIT_REQUEST:
            return { 
                ...state,
                pjs: {}, 
                isMetaMask: false,
                isInitializing: true,
                connectedTo: null,
                connectedAt: null,
                errorMessage: null 
            };

        case PJS_INIT_DONE:
            let isMetaMask = action.pjs.api.web3.currentProvider.isMetaMask;

            return {
                ...state,
                pjs: action.pjs,
                isInitializing: false,
                connectedTo: isMetaMask ? 'MetaMask' : action.pjs.api.web3.currentProvider.host,
                connectedAt: action.connectedAt, 
                errorMessage: null
            };

        case PJS_INIT_FAILURE:
            return { 
                ...state, 
                pjs: {}, 
                isMetaMask: false,
                isInitializing: true,
                connectedTo: null,
                connectedAt: null,
                errorMessage: action.error.message 
            };

        case PJS_INVALIDATE_ERROR:
            return { 
                ...state, 
                errorMessage: null 
            };
        
        default:
            return state;
    }
};

import {
    WEB3_ACCOUNTS_FETCH,
    WEB3_ACCOUNTS_RECEIVED,
    WEB3_ACCOUNTS_ERROR,
    WEB3_ACCOUNTS_INVALIDATE_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    accounts: [],
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case WEB3_ACCOUNTS_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessage: null 
            };

        case WEB3_ACCOUNTS_RECEIVED:
            return {
                ...state,
                isFetching: false, 
                accounts: action.accounts, 
                errorMessage: null
            };

        case WEB3_ACCOUNTS_ERROR:
            return { 
                ...state, 
                errorMessage: action.error.message 
            };

        case WEB3_ACCOUNTS_INVALIDATE_ERROR:
            return { 
                ...state, 
                errorMessage: null 
            };
        
        default:
            return state;
    }
};

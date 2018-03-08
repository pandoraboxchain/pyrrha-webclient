import {
    KERNEL_TABLE_FETCH,
    KERNEL_TABLE_RECEIVED,
    KERNEL_TABLE_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    kernels: [],
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case KERNEL_TABLE_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessage: null
            };
        
        case KERNEL_TABLE_RECEIVED:
            return {
                ...state,
                isFetching: false,
                kernels: action.kernels
            };
        
        case KERNEL_TABLE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error.message
            };

        default:
            return state;
    }
}
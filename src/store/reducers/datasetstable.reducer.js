import {
    DATASET_TABLE_FETCH,
    DATASET_TABLE_RECEIVED,
    DATASET_TABLE_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    datasets: [],
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case DATASET_TABLE_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessage: null
            };
        
        case DATASET_TABLE_RECEIVED:
            return {
                ...state,
                isFetching: false,
                datasets: action.datasets.records
            };
        
        case DATASET_TABLE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error.message
            };

        default:
            return state;
    }
}

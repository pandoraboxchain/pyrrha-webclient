import {
    JOBS_TABLE_FETCH,
    JOBS_TABLE_RECEIVED,
    JOBS_TABLE_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    jobs: [],
    errorMessage: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case JOBS_TABLE_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessage: null
            };
        
        case JOBS_TABLE_RECEIVED:
            return {
                ...state,
                isFetching: false,
                jobs: action.jobs.records
            };
        
        case JOBS_TABLE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error.message
            };

        default:
            return state;
    }
}

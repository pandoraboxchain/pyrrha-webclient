import {
    JOB_RESET_STATE,
    JOB_CONSTRUCTOR_START,
    JOB_CONSTRUCTOR_DONE,
    JOB_CONSTRUCTOR_FAILURE,
    JOB_CONSTRUCTOR_FIELD_UPDATED,
    JOB_CONSTRUCTOR_ERROR_INVALIDATE,
    JOB_CONSTRUCTOR_MESSAGE_DISMISS,
    JOB_CONSTRUCTOR_IPFS_PROGRESS,
    JOB_CONSTRUCTOR_MESSAGE,
    WEB3_ACCOUNTS_UPDATE,
    WEB3_ACCOUNTS_RECEIVED
} from '../actions';

const initialState = {
    isSubmitting: false,
    formValues: {},
    formErrors: {},
    progress: {},
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case JOB_RESET_STATE:
            return { 
                ...initialState 
            };
        
        case JOB_CONSTRUCTOR_START:
            return { 
                ...state, 
                isSubmitting: true,
                messages: [],
                formErrors: {},
                errorMessages: [] 
            };
        
        case JOB_CONSTRUCTOR_MESSAGE:

            if (action.message && !Array.isArray(action.message)) {
                action.message = [action.message];
            }

            return {
                ...state, 
                messages: [
                    ...state.messages,
                    action.message
                ]
            };
            
        case JOB_CONSTRUCTOR_DONE:
            
            if (action.message && !Array.isArray(action.message)) {
                action.message = [action.message];
            }

            return {
                ...state, 
                isSubmitting: false,
                formValues: {
                    publisher: state.formValues.publisher
                },
                formErrors: {},
                progress: {},
                messages: [
                    ...state.messages,
                    action.message
                ], 
                errorMessages: []
            };

        case JOB_CONSTRUCTOR_FAILURE:
            
            if (!Array.isArray(action.error)) {
                action.error = [action.error];
            }
            
            return { 
                ...state, 
                isSubmitting: false,
                errorMessages: action.error.map(err => err.message || err) 
            };
        
        case JOB_CONSTRUCTOR_FIELD_UPDATED:            
            return { 
                ...state,
                formValues: {
                    ...state.formValues,
                    [action.field]: action.value
                },
                formErrors: {
                    ...state.formErrors,
                    [action.field]: action.error || false
                }
            };

        case JOB_CONSTRUCTOR_ERROR_INVALIDATE:
            return { 
                ...state,
                errorMessages: []
            };

        case JOB_CONSTRUCTOR_MESSAGE_DISMISS:                        
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };
        
        case JOB_CONSTRUCTOR_IPFS_PROGRESS:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    [action.progress.file]: {
                        size: action.progress.size,
                        type: action.progress.type,
                        progress: action.progress.progress,
                        percent: Number.parseInt(action.progress.progress * 100 / action.progress.size, 10)
                    }
                }
            };

        case WEB3_ACCOUNTS_UPDATE:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    accounts: {
                        items: [],
                        isRefreshing: true
                    }
                }
            };
        
        case WEB3_ACCOUNTS_RECEIVED:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    accounts: {
                        items: action.accounts,
                        isRefreshing: false
                    }
                }
            };
        
        default:
            return state;
    }
};

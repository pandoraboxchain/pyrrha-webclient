import {
    KERNEL_RESET_STATE,
    KERNEL_CONSTRUCTOR_START,
    KERNEL_CONSTRUCTOR_DONE,
    KERNEL_CONSTRUCTOR_FAILURE,
    KERNEL_CONSTRUCTOR_FIELD_UPDATED,
    KERNEL_CONSTRUCTOR_ERROR_INVALIDATE,
    KERNEL_CONSTRUCTOR_MESSAGE_DISMISS,
    KERNEL_CONSTRUCTOR_IPFS_PROGRESS,
    KERNEL_CONSTRUCTOR_MESSAGE
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

        case KERNEL_RESET_STATE:
            return { 
                ...initialState 
            };
        
        case KERNEL_CONSTRUCTOR_START:
            return { 
                ...state, 
                isSubmitting: true,
                messages: [],
                formErrors: {},
                errorMessages: [] 
            };
        
        case KERNEL_CONSTRUCTOR_MESSAGE:

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
            
        case KERNEL_CONSTRUCTOR_DONE:
            
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

        case KERNEL_CONSTRUCTOR_FAILURE:
            
            if (!Array.isArray(action.error)) {
                action.error = [action.error];
            }
            
            return { 
                ...state, 
                isSubmitting: false,
                errorMessages: action.error.map(err => err.message || err) 
            };
        
        case KERNEL_CONSTRUCTOR_FIELD_UPDATED:
            
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

        case KERNEL_CONSTRUCTOR_ERROR_INVALIDATE:
            return { 
                ...state,
                errorMessages: []
            };

        case KERNEL_CONSTRUCTOR_MESSAGE_DISMISS:                        
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };
        
        case KERNEL_CONSTRUCTOR_IPFS_PROGRESS:
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

        default:
            return state;
    }
};

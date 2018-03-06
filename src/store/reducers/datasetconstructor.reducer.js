import * as utils from '../../utils';

import {
    DATASET_CONSTRUCTOR_START,
    DATASET_CONSTRUCTOR_DONE,
    DATASET_CONSTRUCTOR_FAILURE,
    DATASET_CONSTRUCTOR_FIELD_UPDATED,
    DATASET_CONSTRUCTOR_ERROR_INVALIDATE,
    DATASET_CONSTRUCTOR_MESSAGE_DISMISS,
    DATASET_CONSTRUCTOR_IPFS_PROGRESS,
    DATASET_CONSTRUCTOR_MESSAGE,
    DATASET_ADD_NEW_BATCH,
    DATASET_REMOVE_BATCH,
    WEB3_ACCOUNTS_UPDATE,
    WEB3_ACCOUNTS_RECEIVED
} from '../actions';

const initialState = {
    isSubmitting: false,
    formValues: {},
    lists: {
        accounts: {
            items: [],
            isRefreshing: false
        }
    },
    formErrors: {},
    progress: {},
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case DATASET_CONSTRUCTOR_START:
            return { 
                ...state, 
                isSubmitting: true,
                messages: [],
                formErrors: {},
                errorMessages: [] 
            };
        
        case DATASET_CONSTRUCTOR_MESSAGE:

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
            
        case DATASET_CONSTRUCTOR_DONE:
            
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

        case DATASET_CONSTRUCTOR_FAILURE:
            
            if (!Array.isArray(action.error)) {
                action.error = [action.error];
            }
            
            return { 
                ...state, 
                isSubmitting: false,
                errorMessages: action.error.map(err => err.message || err) 
            };
        
        case DATASET_CONSTRUCTOR_FIELD_UPDATED:             
            return { 
                ...state,
                formValues: {
                    ...state.formValues,
                    [action.field]: !action.item ?
                        action.value :
                        {
                            ...state.formValues[action.field],
                            [action.item]: action.value
                        }
                },
                formErrors: {
                    ...state.formErrors,
                    [action.field]: !action.item ?
                        action.error :
                        {
                            ...state.formErrors[action.field],
                            [action.item]: action.error || false
                        }
                }
            };
        
        case DATASET_ADD_NEW_BATCH:

            let numBatches = Object.keys(state.formValues[action.name] || {}).length;
            let item = `${action.name}-${numBatches}`;

            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    [action.name]: {
                        ...state.formValues[action.name],
                        [item]: null
                    }
                },
                formErrors: {
                    ...state.formErrors,
                    [action.name]: {
                        ...state.formErrors[action.name],
                        [item]: false
                    }
                }
            };
        
        case DATASET_REMOVE_BATCH:
            
            if (action.index === 0 || 
                !state.formValues[action.name] || 
                !state.formValues[action.name][action.item]) {

                return {
                    ...state
                };
            }

            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    [action.name]: utils.removeObjectKey(state.formValues[action.name], action.item)
                }
            };

        case DATASET_CONSTRUCTOR_ERROR_INVALIDATE:
            return { 
                ...state,
                errorMessages: []
            };

        case DATASET_CONSTRUCTOR_MESSAGE_DISMISS:                        
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };
        
        case DATASET_CONSTRUCTOR_IPFS_PROGRESS:
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

/**
 * Redux action creator helper
 * 
 * @param {String} type Action type
 * @param {Object} [payload={}] Action payload
 * @returns {Object} Actio object
 */
export const reduxAction = (type, payload = {}) => {
    return { type, ...payload }
};

/**
 * Remove key from the state object
 * 
 * @param {Object} state 
 * @param {String} deleteKey 
 * @returns {Object} New state
 */
export const removeObjectKey = (state, deleteKey) => {
    return Object.assign(
        {},
        ...Object.entries(state)
            .filter(([k]) => k !== deleteKey)
            .map(([k, v]) => ({ [k]: v })));
}

/**
 * Extract props selectors from the form model
 * 
 * @param {Object} model Form model
 * @param {Object} selectors
 * @param {Object} state 
 * @returns 
 */
export const extractListsPropsFromModel = (model, selectors, state) => {
    let props = {};

    Object.keys(model).forEach(key => {

        if (model[key].list) {

            if (model[key].list.stateSelector) {
                
                props[`lists-${model[key].list.name}-isRefreshing`] = selectors[model[key].list.stateSelector](state)
            } else {
                throw new Error(`stateSelector not defined for the model field "${key}"`);
            }

            if (model[key].list.recordsSelector) {

                props[`lists-${model[key].list.name}-records`] = selectors[model[key].list.recordsSelector](state)
            } else {
                throw new Error(`recordsSelector not defined for the model field "${key}"`);
            }
        }
    });

    return props;
};
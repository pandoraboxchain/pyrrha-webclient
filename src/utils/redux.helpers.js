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

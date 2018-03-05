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

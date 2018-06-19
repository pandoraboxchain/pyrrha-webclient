/**
 * Parse options string into object
 * 
 * @param {String} options
 * @returns {Object} 
 */
export const parseOptionsStr = optionsStr => {

    try {
        return JSON.parse(/^\{.*\}$/gi.test(optionsStr) ? optionsStr : `{${optionsStr}}`);
    } catch(e) {
        throw new Error('Options string can not be parsed as JSON string');
    }
};

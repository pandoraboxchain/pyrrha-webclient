/**
 * Parse options string into object
 * 
 * @param {String} options
 * @returns {Object} 
 */
export const parseOptionsStr = optionsStr => JSON.parse(/^\{.*\}$/gi.test(optionsStr) ? optionsStr : `{${optionsStr}}`);

/**
 * Upload model and weights files to IPFS
 * 
 * @param {Object} data Object with model and weights File instances
 * @param {Function} progressCb Loading progress callback
 * @param {Object} pjs pyrrha-js instance
 * @returns {Promise} Promise object resolved to hash of the kernel config file 
 */
export const uploadModelAndWeightsToIpfs = async (data, progressCb, pjs) => {
    
    try {
        const model = await pjs.ipfs.submitFile(data.model, progressCb);
        const weights = await pjs.ipfs.submitFile(data.weights, progressCb);
        const kernel = await pjs.ipfs.submitJson(JSON.stringify({
            model,
            weights
        }), {
            name: 'KernelJson',
            type: 'application/json'
        }, progressCb);
        return kernel;    
    } catch(err) {
        return Promise.reject(err);
    }
};

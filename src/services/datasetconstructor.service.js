/**
 * Upload batches to IPFS
 * 
 * @param {Object} batches Array of File instances
 * @param {Function} progressCb Loading progress callback
 * @param {Object} pjs pyrrha-js instance
 * @returns {Promise} Promise object resolved to object with hash of the dataset json file and count of batches
 */
export const uploadDatasetBatchesToIpfs = async (batches, options, progressCb, pjs) => {
    
    try {
        const uploadedBatches = await Promise.all(batches.map(batch => pjs.ipfs.submitFile(batch, progressCb)));
        const batchesIpfs = await pjs.ipfs.submitJson(JSON.stringify({
            batches: uploadedBatches,
            options
        }), {
            name: 'DatasetBatchesJson',
            type: 'application/json'
        }, progressCb);
        
        return {
            ipfsHash: batchesIpfs,
            batchesCount: uploadedBatches.length
        };    
    } catch(err) {
        return Promise.reject(err);
    }
};

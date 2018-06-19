// /**
//  * Upload batches to IPFS
//  * 
//  * @param {Object} batches Array of File instances
//  * @param {Function} progressCb Loading progress callback
//  * @param {Object} pjs pyrrha-js instance
//  * @returns {Promise} Promise object resolved to object with hash of the dataset json file and count of batches
//  */
// export const uploadDatasetBatchesToIpfs = async (batches, options, progressCb, pjs) => {
    
//     try {
//         const uploadedBatches = await Promise.all(batches.map(batch => pjs.ipfs.submitFile(batch, progressCb)));
//         const batchesIpfs = await pjs.ipfs.submitJson(JSON.stringify({
//             batches: uploadedBatches,
//             options
//         }), {
//             name: 'DatasetBatchesJson',
//             type: 'application/json'
//         }, progressCb);
        
//         return {
//             ipfsHash: batchesIpfs,
//             batchesCount: uploadedBatches.length
//         };    
//     } catch(err) {
//         return Promise.reject(err);
//     }
// };

/**
 * Upload dataset banches dedicated to prediction kind of cognitive jobs
 *
 * @param {Object[]} batches Array of File objects
 * @param {Function} progressCb
 * @param {Object} pjs
 * @returns {Promise}
 */
export const uploadPredictionBatches = async (batches, progressCb, pjs) => {
    const uploadedBatches = await Promise.all(batches.map(batch => pjs.ipfs.submitFile(batch, progressCb)));
    return {
        batches: uploadedBatches
    };
};

/**
 * Upload dataset batches dedicated to training kind of cognitive jobs
 *
 * @param {Object} trainX File object
 * @param {Object} trainY File object
 * @param {Function} progressCb
 * @param {Object} pjs
 * @returns {Promise}
 */
export const uploadTrainingBatches = async (trainX, trainY, progressCb, pjs) => {
    const [uploadedTrainX, uploadedTrainY] = await Promise.all([trainX, trainY].map(batch => pjs.ipfs.submitFile(batch, progressCb)))
    return {
        train: {
            'train_x': uploadedTrainX,
            'train_y': uploadedTrainY
        }
    };
};

/**
 * Upload datase config file to IPFS
 *
 * @param {Object} configJson
 * @param {Function} progressCb
 * @param {Object} pjs
 * @returns {Promise}
 */
export const uploadDatasetConfig = async (configJson, progressCb, pjs) => {
    return await pjs.ipfs.submitJson(JSON.stringify(configJson), {
        name: 'DatasetBatchesJson',
        type: 'application/json'
    }, progressCb);
};

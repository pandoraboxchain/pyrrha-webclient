import * as utils from '../utils';
import * as services from '../services';

// Contracts ABIs
import Dataset from '../pyrrha-abi/Dataset.json';

/**
 * Upload batches to IPFS
 * 
 * @param {Object} batches Array of File instances
 * @param {Function} progressCb Loading progress callback
 * @returns {Promise} Promise object resolved to object with hash of the dataset json file and count of batches
 */
export const uploadDatasetBatchesToIpfs = async (batches, progressCb) => {
    
    try {
        const uploadedBatches = await Promise.all(batches.map(batch => services.submitFileToIpfs(batch, progressCb)));
        const batchesIpfs = await services.submitJsonToIpfs(JSON.stringify({
            batches: uploadedBatches
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

/**
 * Add dataset to market
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} datasetContractAddress 
 * @param {String} publisherAddress 
 */
export const addDatasetToMarket = (web3, datasetContractAddress, publisherAddress) => 
    utils.addDatasetToMarket(web3, datasetContractAddress, publisherAddress);

/**
 * Deploy Dataset contract to the netowork
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} datasetHash 
 * @param {Number} batchesCount
 * @param {Object} { publisher, dimension, complexity, price } 
 * @returns {Promise} Promise object resolved dataset contract address
 */
export const deployDatasetContract = async (web3, datasetHash, batchesCount, { publisher, dimension, samples, price }) => {
    
    try {
        const args = [web3.utils.toHex(datasetHash), dimension, samples, batchesCount, price];
        
        // Estimate required amount of gas
        const gas = await utils.estimateGas(web3, Dataset.bytecode, args);

        // Create and deploy dataset contract
        const datasetContractAddress = await utils.deployContract(web3, Dataset, {
            args,
            from: publisher,
            gas: Number.parseInt(gas * 1.5, 10)
        });

        return datasetContractAddress;
    } catch(err) {
        return Promise.reject(err);
    }
};

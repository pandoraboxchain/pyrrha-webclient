// import config from '../config';
import * as utils from '../utils';
import * as services from '../services';

// Contracts APIs
// import Pandora from '../pyrrha-abi/Pandora.json';
// import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
// import WorkerNodeABI from '../pyrrha-abi/WorkerNode.json';
// import CognitiveJobABI from '../pyrrha-abi/CognitiveJob.json';
import Kernel from '../pyrrha-abi/Kernel.json';
// import DatasetABI from '../pyrrha-abi/Dataset.json';

/**
 * Upload model and weights files to IPFS
 * 
 * @param {Object} data Object with model and weights File instances
 * @param {Function} progressCb Loading progress callback
 * @returns {Promise} Promise object resolved to hash of the kernel config file 
 */
export const uploadModelAndWeightsToIpfs = async (data, progressCb) => {
    
    try {
        const model = await services.submitFileToIpfs(data.model, progressCb);
        const weight = await services.submitFileToIpfs(data.weights, progressCb);
        const kernel = await services.submitJsonToIpfs(JSON.stringify({
            model,
            weight
        }), {
            name: 'KernelJson',
            type: 'application/json'
        }, progressCb);
        return kernel;    
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Add kernel to market
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} kernelContractAddress 
 * @param {String} publisherAddress 
 */
export const addKernelToMarket = (web3, kernelContractAddress, publisherAddress) => 
    utils.addKernelToMarket(web3, kernelContractAddress, publisherAddress);

/**
 * Deploy Kernel contract to the netowork
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} kernelHash 
 * @param {Object} { publisher, dimension, complexity, price } 
 * @returns {Promise} Promise object resolved kernel contract address
 */
export const deployKernelContract = async (web3, kernelHash, { publisher, dimension, complexity, price }) => {
    
    try {
        const args = [web3.utils.toHex(kernelHash), dimension, complexity, price];
        
        // Estimate required amount of gas
        const gas = await utils.estimateGas(web3, Kernel.bytecode, args);

        // Create and deploy kernel contract
        const kernelContractAddress = await utils.deployContract(web3, Kernel, {
            args,
            from: publisher,
            gas: Number.parseInt(gas * 1.3, 10)
        });

        return kernelContractAddress;
    } catch(err) {
        return Promise.reject(err);
    }
};

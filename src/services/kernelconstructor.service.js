// import config from '../config';
import * as utils from '../utils';
import * as services from '../services';
import { KernelConstructorFormModel as formModel } from '../store/models';

// Contracts APIs
// import Pandora from '../pyrrha-abi/Pandora.json';
// import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
// import WorkerNodeABI from '../pyrrha-abi/WorkerNode.json';
// import CognitiveJobABI from '../pyrrha-abi/CognitiveJob.json';
import Kernel from '../pyrrha-abi/Kernel.json';
// import DatasetABI from '../pyrrha-abi/Dataset.json';

/**
 * Validate kernel constructor form
 * 
 * @param {Object} values Form values
 * @returns {Promise} Promise object resolved to values object
 */
export const validateKernelConstructorForm = async values => {
    const errors = [];

    Object.keys(formModel).forEach(field => {
        
        if (formModel[field].required && !values[field]) {

            errors.push(new Error(`Field "${formModel[field].label}" is required`));
        } else if (formModel[field].validator && 
            !formModel[field].validator(values[field])) {

            errors.push(new Error(`Field "${formModel[field].label}" has wrong value`));
        }
    });

    if (errors.length > 0) {

        return Promise.reject(errors);
    }

    return Promise.resolve(values);
};

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
export const addKernelToMarket = (web3, kernelContractAddress, publisherAddress) => utils.addKernelToMarket(web3, kernelContractAddress, publisherAddress);

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

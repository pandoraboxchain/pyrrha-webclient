// import config from '../config';
import * as utils from '../utils';
import * as services from '../services';
import { KernelConstructorFormModel } from '../store/models';

// Contracts APIs
// import Pandora from '../pyrrha-abi/Pandora.json';
// import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
// import WorkerNodeABI from '../pyrrha-abi/WorkerNode.json';
// import CognitiveJobABI from '../pyrrha-abi/CognitiveJob.json';
import Kernel from '../pyrrha-abi/Kernel.json';
// import DatasetABI from '../pyrrha-abi/Dataset.json';

export const validateKernelConstructorForm = async values => {
    const errors = [];

    Object.keys(KernelConstructorFormModel).forEach(field => {
        
        if (KernelConstructorFormModel[field].required && !values[field]) {

            errors.push(new Error(`Field "${KernelConstructorFormModel[field].label}" is required`));
        } else if (KernelConstructorFormModel[field].validator && 
            !KernelConstructorFormModel[field].validator(values[field])) {

            errors.push(new Error(`Field "${KernelConstructorFormModel[field].label}" has wrong value`));
        }
    });

    if (errors.length > 0) {

        return Promise.reject(errors);
    }

    return Promise.resolve(values);
};

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

export const deployKernelContract = async (web3, kernelHash, { publisher, dimension, complexity, price }) => {
    
    try {
        const args = [web3.utils.toHex(kernelHash), dimension, complexity, price];
        
        // Estimate required amount of gas
        const gas = await utils.estimateGas(web3, Kernel.bytecode, args);

        // Create and deploy kernel contract
        const kernelContract = await new web3.eth.Contract(Kernel.abi)
            .deploy({
                data: Kernel.bytecode,
                arguments: args
            })
            .send({
                from: publisher,
                gas
            });
        
        const receipt = await web3.eth.getTransactionReceipt(kernelContract.options.address);
        console.log('Kernel address:', receipt.contractAddress);

        // Add deployed kernel address to the market
        const deployedAddress = await utils.addKernelToMarket(web3, receipt.contractAddress);
        return deployedAddress;
    } catch(err) {
        return Promise.reject(err);
    }
};

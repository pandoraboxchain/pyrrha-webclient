import config from '../config';

// Contracts APIs
// import Pandora from '../pyrrha-abi/Pandora.json';
import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
import Kernel from '../pyrrha-abi/Kernel.json';
// import Dataset from '../pyrrha-abi/Dataset.json';
// import WorkerNode from '../pyrrha-abi/WorkerNode.json';
// import CognitiveJob from '../pyrrha-abi/CognitiveJob.json';

/**
 * Estimate required gas amount
 * 
 * @param {Web3} web3 Web3 instance
 * @param {string} bytecode Contract bytecode
 * @param {Array} args Contract arguments
 * @returns {Number} hex
 */
export const estimateGas = async (web3, bytecode, args) => {
    return await web3.eth.estimateGas({
        data: bytecode,
        arguments: args
    });
};

/**
 * Add new Kernel contract to Market
 * 
 * @param {Web3} web3 Web3 instance 
 * @param {string} address 
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const addKernelToMarket = async (web3, address) => {
    const market = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress);
    const result = await market.methods
        .addKernel(address)
        .call();
    
        if (!result) {

            return Promise.reject(new Error(`Kernel contract with address "${address}" was not added to Market`));
        }

    return result;
};

/**
 * Deploy contract
 * 
 * @param {any} web3 Web3 instance
 * @param {object} contract Contract json
 * @param {object} options { args, from, gas } 
 * @returns {Promise} Promise object resolved to contract address
 */
export const deployContract = (web3, contract, { args, from, gas }) => new Promise((resolve, reject) => {    
    new web3.eth.Contract(Kernel.abi)
    .deploy({
        data: Kernel.bytecode,
        arguments: args
    })
    .send({
        from,
        gas
    })
    .on('error', reject)
    .on('receipt', receipt => resolve(receipt.contractAddress));
});

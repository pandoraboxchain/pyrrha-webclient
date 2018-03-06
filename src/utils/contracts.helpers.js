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
 * @param {String} bytecode Contract bytecode
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
 * @param {String} address 
 * @param {String} from
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const addKernelToMarket = (web3, address, from) => new Promise((resolve, reject) => {
    const market = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress);
    market.methods
        .addKernel(address)
        .send({
            from
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));;
});

/**
 * Add new Dataset contract to Market
 * 
 * @param {Web3} web3 Web3 instance 
 * @param {String} address 
 * @param {String} from
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const addDatasetToMarket = (web3, address, from) => new Promise((resolve, reject) => {
    const market = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress);
    market.methods
        .addDataset(address)
        .send({
            from
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));;
});

/**
 * Deploy contract
 * 
 * @param {Object} web3 Web3 instance
 * @param {Object} contract Contract json
 * @param {Object} options { args, from, gas } 
 * @returns {Promise} Promise object resolved to contract address
 */
export const deployContract = (web3, contract, { args, from, gas }) => new Promise((resolve, reject) => {    
    new web3.eth.Contract(contract.abi)
    .deploy({
        data: contract.bytecode,
        arguments: args
    })
    .send({
        from,
        gas
    })
    .on('error', reject)
    .on('receipt', receipt => resolve(receipt.contractAddress));
});

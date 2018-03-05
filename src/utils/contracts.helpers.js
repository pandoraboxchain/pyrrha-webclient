import config from '../config';

// Contracts APIs
// import Pandora from '../pyrrha-abi/Pandora.json';
import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
// import Kernel from '../pyrrha-abi/Kernel.json';
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
 * @returns {string}
 */
export const addKernelToMarket = async (web3, address) => {
    const market = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress);
    return await market.methods
        .addKernel(address)
        .call();
};

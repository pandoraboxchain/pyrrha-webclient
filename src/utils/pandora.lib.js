import config from '../config';
import Kernel from '../pyrrha-abi/Kernel.json';
import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';

/**
 * Get IPFS address from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @returns {string}
 */
const getIpfsAddressByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const ipfsAddress = await ker.methods
        .ipfsAddress()
        .call();
    return String(ipfsAddress);
};

/**
 * Get data dim from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @returns {integer}
 */
const getDataDimByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const dataDim = await ker.methods
        .dataDim()
        .call();
    return Number.parseInt(dataDim);
};

/**
 * Get current price from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @returns {integer}
 */
const getCurrentPriceByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const currentPrice = await ker.methods
        .currentPrice()
        .call();
    return Number.parseInt(currentPrice);
};

/**
 * Get complexity from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @returns {integer}
 */
const getComplexityByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const complexity = await ker.methods
        .complexity()
        .call();
    return Number.parseInt(complexity);
};

/**
 * Get Kernel address by kernel id
 * 
 * @param {integer} id
 * @returns {string}
 */
const getKernelAddressById = async (web3, id) => {
    const mar = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress)
    const kernelContract = await mar.methods
        .kernels(id)
        .call();
    return kernelContract;
};

/**
 * Get Kernel by the kernel address
 * 
 * @param {string} address
 * @returns {Object}
 */
const getKernelByKernelAddress = async (web3, address) => {
    const ipfsAddress = await getIpfsAddressByKernelAddress(web3, address);
    const dataDim = await getDataDimByKernelAddress(web3, address);
    const currentPrice = await getCurrentPriceByKernelAddress(web3, address);
    const complexity = await getComplexityByKernelAddress(web3, address);

    return {
        address: address,
        ipfs: ipfsAddress,
        dim: dataDim,
        price: currentPrice,
        complexity: complexity
    };
};

/**
 * Get all kernels
 * 
 * @returns {Object[]} 
 */
export const getKernels = async (web3) => {

    let id = 0;
    let kernels = [];

    while (true) {
        
        let kernel = '0x0';

        try {
            kernel = await getKernelAddressById(web3, id++);// can be 0x0
        } catch(err) {
            // @todo Add method getKernelsCount to the PandoraMarket contract for avoid iterating with "try catch"
        }
        
        if (+kernel === 0) {
            break;
        }

        const kernelAddress = kernel;
        const kernelObj = await getKernelByKernelAddress(web3, kernelAddress);

        kernels.push({
            id: id,
            ...kernelObj
        });
    }

    return kernels;
};


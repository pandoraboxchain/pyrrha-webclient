import config from '../config';
import Kernel from '../pyrrha-abi/Kernel.json';
import PandoraMarket from '../pyrrha-abi/PandoraMarket.json';
import Dataset from '../pyrrha-abi/Dataset.json';

/**
 * Get IPFS address from Kernel contract by the kernel address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {String}
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
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getDataDimByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const dataDim = await ker.methods
        .dataDim()
        .call();
    return Number.parseInt(dataDim, 10);
};

/**
 * Get current price from Kernel contract by the kernel address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getCurrentPriceByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const currentPrice = await ker.methods
        .currentPrice()
        .call();
    return Number.parseInt(currentPrice, 10);
};

/**
 * Get complexity from Kernel contract by the kernel address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getComplexityByKernelAddress = async (web3, address) => {
    const ker = new web3.eth.Contract(Kernel.abi, address);
    const complexity = await ker.methods
        .complexity()
        .call();
    return Number.parseInt(complexity, 10);
};

/**
 * Get Kernel address by kernel id
 * 
 * @param {Object} web3 Web3 instance
 * @param {Integer} id
 * @returns {String}
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
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Object}
 */
const getKernelByKernelAddress = async (web3, address) => {
    const ipfsAddress = await getIpfsAddressByKernelAddress(web3, address);
    const dataDim = await getDataDimByKernelAddress(web3, address);
    const currentPrice = await getCurrentPriceByKernelAddress(web3, address);
    const complexity = await getComplexityByKernelAddress(web3, address);

    return {
        address: address,
        ipfsAddress: ipfsAddress,
        dataDim: dataDim,
        currentPrice: currentPrice,
        complexity: complexity
    };
};

/**
 * Get all kernels
 * 
 * @param {Object} web3 Web3 instance
 * @returns {Object[]} 
 */
export const getKernels = async (web3) => {

    let id = 0;
    let records = [];
    let errors = [];

    try {

        // @todo Add method getKernelsCount to the PandoraMarket contract for avoid iterating with "try catch"
        while (true) {
            
            const kernelAddress = await getKernelAddressById(web3, id++);// can be 0x0
            
            if (+kernelAddress === 0) {
                break;
            }

            try {

                const kernelObj = await getKernelByKernelAddress(web3, kernelAddress);

                records.push({
                    id: id,
                    ...kernelObj
                });
            } catch(err) {
                
                errors.push({
                    address: kernelAddress,
                    error: err.message
                });
            }
        }
    } catch(err) {}

    return {
        records,
        errors
    };
};

/**
 * Get Dataset address by kernel id
 * 
 * @param {Object} web3 Web3 instance
 * @param {Integer} id
 * @returns {String}
 */
const getDatasetAddressById = async (web3, id) => {
    const mar = new web3.eth.Contract(PandoraMarket.abi, config.marketAddress)
    const datasetContract = await mar.methods
        .datasets(id)
        .call();
    return datasetContract;
};

/**
 * Get IPFS address from Dataset contract by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {String}
 */
const getIpfsAddressByDatasetAddress = async (web3, address) => {
    const dat = new web3.eth.Contract(Dataset.abi, address);
    const ipfsAddress = await dat.methods
        .ipfsAddress()
        .call();
    return String(ipfsAddress);
};

/**
 * Get data dim from Dataset contract by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getDataDimByDatasetAddress = async (web3, address) => {
    const dat = new web3.eth.Contract(Dataset.abi, address);
    const dataDim = await dat.methods
        .dataDim()
        .call();
    return Number.parseInt(dataDim);
};

/**
 * Get current price from Dataset contract by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getCurrentPriceByDatasetAddress = async (web3, address) => {
    const dat = new web3.eth.Contract(Dataset.abi, address);
    const currentPrice = await dat.methods
        .currentPrice()
        .call();
    return Number.parseInt(currentPrice);
};

/**
 * Get data samples count from Dataset contract by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getSamplesCountByDatasetAddress = async (web3, address) => {
    const dat = new web3.eth.Contract(Dataset.abi, address);
    const samplesCount = await dat.methods
        .samplesCount()
        .call();
    return Number.parseInt(samplesCount);
};

/**
 * Get data batches count from Dataset contract by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {String} address
 * @returns {Integer}
 */
const getBatchesCountByDatasetAddress = async (web3, address) => {
    const dat = new web3.eth.Contract(Dataset.abi, address);
    const batchesCount = await dat.methods
        .batchesCount()
        .call();
    return Number.parseInt(batchesCount);
};

/**
 * Get dataset by the dataset address
 * 
 * @param {Object} web3 Web3 instance
 * @param {string} address
 * @returns {Object}
 */
const getDatasetByDatasetAddress = async (web3, address) => {

    try {

        const ipfsAddress = await getIpfsAddressByDatasetAddress(web3, address);
        const dataDim = await getDataDimByDatasetAddress(web3, address);
        const currentPrice = await getCurrentPriceByDatasetAddress(web3, address);
        const samplesCount = await getSamplesCountByDatasetAddress(web3, address);
        const batchesCount = await getBatchesCountByDatasetAddress(web3, address);

        return {
            address: address,
            ipfsAddress: ipfsAddress,
            dataDim: dataDim,
            currentPrice: currentPrice,
            samplesCount: samplesCount,
            batchesCount: batchesCount
        };
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Get all datasets
 * 
 * @param {Object} web3 Web3 instance
 * @returns {[Object]}
 */
export const getDatasets = async (web3) => {

    let id = 0;
    let records = [];
    let errors = [];

    try {

        // @todo Add method getDatasetsCount to the PandoraMarket contract for avoid iterating with "while"
        while (true) {

            const datasetAddress = await getDatasetAddressById(web3, id++);// can be 0x0

            if (+datasetAddress === 0) {
                break;
            }
            
            try {

                const datasetObj = await getDatasetByDatasetAddress(web3, datasetAddress);
                records.push({
                    id: id,
                    ...datasetObj
                });
            } catch(err) {
                
                errors.push({
                    address: datasetAddress,
                    error: err.message
                });
            }        
        }        
    } catch(err) {}

    return {
        records,
        errors
    };
};
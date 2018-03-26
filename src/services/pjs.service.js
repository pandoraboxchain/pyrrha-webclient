import config from '../config';
import Pjs from 'pyrrha-js';

// Contracts APIs
const Pandora = require('../pyrrha-abi/Pandora.json');
const PandoraMarket = require('../pyrrha-abi/PandoraMarket.json');
const WorkerNode = require('../pyrrha-abi/WorkerNode.json');
const CognitiveJob = require('../pyrrha-abi/CognitiveJob.json');
const Kernel = require('../pyrrha-abi/Kernel.json');
const Dataset = require('../pyrrha-abi/Dataset.json');

// Create Pjs instance
export const initPjs = () => {
    return new Pjs({
        eth: {
            protocol: config.ethProtocol,
            host: config.ethHost,
            port: config.ethPort
        },
        ipfs: {
            protocol: config.ipfsProtocol,
            host: config.ipfsHost,
            port: config.ipfsPort
        },
        contracts: {
            Pandora,
            PandoraMarket,
            WorkerNode,
            CognitiveJob,
            Kernel,
            Dataset
        },
        addresses: {
            pandora: config.pandoraAddress,
            market: config.marketAddress
        }
    });
};

// Get network ID
export const getNetworkId = async web3 => await web3.eth.net.getId();

// Get current accounts connected to MetaMask
export const getAccounts = async web3 => await web3.eth.getAccounts();

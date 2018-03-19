import config from '../config';
import Pjs from 'pyrrha-js';

// Contracts APIs
const Pandora = require('../pandora-abi/Pandora.json');
const PandoraMarket = require('../pandora-abi/PandoraMarket.json');
const WorkerNode = require('../pandora-abi/WorkerNode.json');
const CognitiveJob = require('../pandora-abi/CognitiveJob.json');
const Kernel = require('../pandora-abi/Kernel.json');
const Dataset = require('../pandora-abi/Dataset.json');

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

// Get current accounts connected to MetaMask
export const getAccounts = async web3 => await web3.eth.getAccounts();

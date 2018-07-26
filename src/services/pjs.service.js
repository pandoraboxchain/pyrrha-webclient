import config from '../config';
import Pjs from 'pyrrha-js';

// Contracts APIs
const Pandora = require('../pyrrha-consensus/Pandora.json');
const PandoraMarket = require('../pyrrha-consensus/PandoraMarket.json');
const WorkerNode = require('../pyrrha-consensus/WorkerNode.json');
const CognitiveJobController = require('../pyrrha-consensus/CognitiveJobController.json');
const Kernel = require('../pyrrha-consensus/Kernel.json');
const Dataset = require('../pyrrha-consensus/Dataset.json');

const url = `${config.ethProtocol}://${config.ethHost}${config.ethPort ? ':'+config.ethPort : ''}`;
let provider = new Pjs.Web3.providers.WebsocketProvider(url);

if (typeof window !== 'undefined' && window.web3) {

    provider = window.web3.currentProvider;
}

// Create Pjs instance
export const initPjs = () => {
    return new Pjs({
        eth: {
            provider
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
            CognitiveJobController,
            Kernel,
            Dataset
        },
        addresses: {
            Pandora: config.pandoraAddress,
            PandoraMarket: config.marketAddress
        }
    });
};

// Get network ID
export const getNetworkId = async web3 => await web3.eth.net.getId();

// Get current accounts connected to MetaMask
export const getAccounts = async web3 => await web3.eth.getAccounts();

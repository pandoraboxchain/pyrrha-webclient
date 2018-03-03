import config from '../config';
import Web3 from 'web3';

// @todo Create web3 connection watcher
export const connectWeb3Provider = () => {

    if (window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {

        console.log('Used MetaMask provider');
        return new Web3(window.web3.currentProvider);
    }
    
    console.log('Used host:', config.nodeHost);
    return new Web3(`${config.protocol || 'http'}://${config.nodeHost || 'localhost'}:${config.nodePort || ''}`);        
};

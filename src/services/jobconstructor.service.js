import * as utils from '../utils';

/**
 * Create cognitive job
 * 
 * @param {Object} web3 Web3 instance
 * @param {Object} values Validated form values
 */
export const createCognitiveJob = (web3, { kernel, dataset, publisher }) => 
    utils.createCognitiveJob(web3, kernel, dataset, publisher);

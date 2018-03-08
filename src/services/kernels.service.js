import * as utils from '../utils';

export const fetchKernels = async (web3) => {
    return await utils.getKernels(web3);
};

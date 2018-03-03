import { reduce as web3Reducer } from './web3.reducer';
import { reduce as kernConReducer } from './kernelconstructor.reducer';

export default {
    connect: web3Reducer,
    kernelconstructor: kernConReducer
};

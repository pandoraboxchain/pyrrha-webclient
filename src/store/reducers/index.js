import { reduce as web3Reducer } from './web3.reducer';
import { reduce as kernConReducer } from './kernelconstructor.reducer';
import { reduce as datasetConReducer } from './datasetconstructor.reducer';
import { reduce as jobConReducer } from './cognitivejobconstructor.reducer';

export default {
    connect: web3Reducer,
    kernelconstructor: kernConReducer,
    datasetconstructor: datasetConReducer,
    jobconstructor: jobConReducer
};

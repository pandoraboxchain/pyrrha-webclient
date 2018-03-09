import { reduce as web3Reducer } from './web3.reducer';
import { reduce as kernConReducer } from './kernelconstructor.reducer';
import { reduce as datasetConReducer } from './datasetconstructor.reducer';
import { reduce as jobConReducer } from './cognitivejobconstructor.reducer';
import { reduce as kernelsTableReducer } from './kernelstable.reducer';
import { reduce as datasetsTableReducer } from './datasetstable.reducer';

export default {
    connect: web3Reducer,
    kernelconstructor: kernConReducer,
    datasetconstructor: datasetConReducer,
    jobconstructor: jobConReducer,
    kernels: kernelsTableReducer,
    datasets: datasetsTableReducer
};

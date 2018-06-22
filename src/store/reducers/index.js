import { reduce as pjsReducer } from './pjs.reducer';
import { reduce as accountsReducer } from './accounts.reducer';
import { reduce as kernConReducer } from './kernelconstructor.reducer';
import { reduce as datasetConReducer } from './datasetconstructor.reducer';
import { reduce as jobConReducer } from './cognitivejobconstructor.reducer';
import { reduce as kernelsTableReducer } from './kernelstable.reducer';
import { reduce as datasetsTableReducer } from './datasetstable.reducer';
import { reduce as jobsTableReducer } from './jobstable.reducer';

export default {
    pjs: pjsReducer,
    accounts: accountsReducer,
    kernelconstructor: kernConReducer,
    datasetconstructor: datasetConReducer,
    jobconstructor: jobConReducer,
    kernels: kernelsTableReducer,
    datasets: datasetsTableReducer,
    jobs: jobsTableReducer
};

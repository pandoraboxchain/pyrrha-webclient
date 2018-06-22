import { all } from 'redux-saga/effects'
import routerSagas from './router.saga';
import pjsSagas from './pjs.saga';
import accountsSagas from './accounts.saga';
import kernelConstructorSagas from './kernelconstructor.saga';
import datasetConstructorSagas from './datasetconstructor.saga';
import jobConstructorSagas from './jobconstructor.saga';

import kernelsTableSagas from './kernelstable.saga';
import datasetsTableSagas from './datasetstable.saga';
import jobsTableSagas from './jobstable.saga';

export default function* rootSaga() {
    yield all([
        ...routerSagas,
        ...pjsSagas,
        ...accountsSagas,
        ...kernelConstructorSagas,
        ...datasetConstructorSagas,
        ...jobConstructorSagas,
        ...kernelsTableSagas,
        ...datasetsTableSagas,
        ...jobsTableSagas
    ]);
}

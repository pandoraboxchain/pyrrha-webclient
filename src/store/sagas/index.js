import { all } from 'redux-saga/effects'
import rootWeb3Sagas from './web3.saga';
import kernelConstructorSagas from './kernelconstructor.saga';
import datasetConstructorSagas from './datasetconstructor.saga';
import jobConstructorSagas from './jobconstructor.saga';
import rootRouterSagas from './router.saga';

export default function* rootSaga() {
    yield all([
        ...rootRouterSagas,
        ...rootWeb3Sagas,
        ...kernelConstructorSagas,
        ...datasetConstructorSagas,
        ...jobConstructorSagas
    ]);
}

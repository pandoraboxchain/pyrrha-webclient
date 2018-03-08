import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableJobConstructor = Loadable({
    loader: () => import('./JobConstructor'),
    loading: Loading,
});

export const route = {
    path: '/job',
    exact: true,
    label: 'Job',
    component: LoadableJobConstructor
};

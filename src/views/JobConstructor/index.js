import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableContract = Loadable({
    loader: () => import('./JobConstructor'),
    loading: Loading,
});

export const route = {
    path: '/job',
    exact: true,
    label: 'Job Constructor',
    component: LoadableContract
};

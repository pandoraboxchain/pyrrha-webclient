import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableContract = Loadable({
    loader: () => import('./DatasetConstructor'),
    loading: Loading,
});

export const route = {
    path: '/dataset',
    exact: true,
    label: 'Dataset Constructor',
    component: LoadableContract
};

import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableContract = Loadable({
    loader: () => import('./KernelConstructor'),
    loading: Loading,
});

export const route = {
    path: '/kernel',
    exact: true,
    label: 'Kernel',
    component: LoadableContract
};

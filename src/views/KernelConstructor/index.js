import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableContract = Loadable({
    loader: () => import('./KernelConstructor'),
    loading: Loading,
});

export const route = {
    path: '/kernels',
    exact: true,
    label: 'Kernel Constructor',
    component: LoadableContract
};

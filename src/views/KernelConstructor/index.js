import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableKernelConstructor = Loadable({
    loader: () => import('./KernelConstructor'),
    loading: Loading,
});

export const route = {
    path: '/kernel',
    exact: true,
    label: 'Kernel',
    component: LoadableKernelConstructor
};

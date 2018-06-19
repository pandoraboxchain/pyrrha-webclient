import { jobType } from '../../config/constants';

export const JobConstructorFormModel = {
    publisher: {
        label: 'Publisher address',
        placeholder: 'Refresh accounts and click to add',
        type: 'text',
        list: {
            name: 'accounts',
            action: 'web3AccountsFetch',
            stateSelector: 'isWeb3AccountsRefreshing',
            recordsSelector: 'web3Accounts'            
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    jobType: {
        label: 'Job type',
        placeholder: 'Select a job type',
        type: 'text',
        required: true,
        dropdown: jobType.map((t, i) => ({
            key: i,
            text: t.name,
            value: t.value
        }))
    },
    kernel: {
        label: 'Kernel',
        placeholder: 'Refresh kernels and click to add',
        type: 'text',
        list: {
            name: 'kernels',
            action: 'kernelsTableFetch',
            stateSelector: 'isKernelsFetching',
            recordsSelector: 'getKernels',
            valueKey: 'address'
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    dataset: {
        label: 'Dataset',
        placeholder: 'Refresh datasets and click to add',
        type: 'text',
        list: {
            name: 'datasets',
            action: 'datasetsTableFetch',
            stateSelector: 'isDatasetsFetching',
            recordsSelector: 'getDatasets',
            valueKey: 'address'
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    complexity: {
        label: 'Complexity',
        placeholder: 'Job complexity',
        type: 'number',
        required: true
    },
    description: {
        label: 'Description',
        placeholder: 'Job description',
        type: 'text',
        required: true
    }
};

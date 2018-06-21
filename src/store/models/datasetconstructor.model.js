import { jobType } from '../../config/constants';

export const DatasetConstructorFormModel = {
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
        label: 'Dataset target type',
        placeholder: 'Select a dataset target type',
        type: 'text',
        required: true,
        dropdown: jobType.map((t, i) => ({
            key: i,
            text: t.name,
            value: t.value
        }))
    },
    'train_x': {
        relatedTo: {
            field: 'jobType',
            value: '0'
        },
        label: 'train_x data batch',
        placeholder: 'IPFS hash of the batch file',
        type: 'text',
        required: true,
        validator: value => true
    },
    'train_y': {
        relatedTo: {
            field: 'jobType',
            value: '0'
        },
        label: 'train_y data batch',
        placeholder: 'IPFS hash of the batch file',
        type: 'text',
        required: true,
        validator: value => true
    },
    batch: {
        relatedTo: {
            field: 'jobType',
            value: '1'
        },
        multiple: true,
        addLabel: 'Add batch',
        placeholder: 'IPFS hash of the batch file',
        label: 'Data batch',
        type: 'text',
        required: true,
        styles: ['pb-20'],
        validator: value => true
    },
    options: {
        label: 'Dataset options',
        placeholder: 'Options in JSON format',
        type: 'text',
        required: false,
        validator: value => true
    },
    dimension: {
        label: 'Dimension',
        placeholder: 'Dataset dimension',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    price: {
        label: 'Price',
        placeholder: 'Dataset price',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    description: {
        label: 'Description',
        placeholder: 'Dataset description',
        type: 'text',
        required: true,
        validator: value => true
    },
    metadata: {
        label: 'Meta tags',
        placeholder: 'Meta tags separated by coma',
        type: 'text',
        required: false,
        transform: value => {
            const delim = /,/gi.test(value) ? ',': ' ';
            return String(value || '').split(delim).filter(v => v !== '').join(',');
        },
        validator: value => true
    }
};

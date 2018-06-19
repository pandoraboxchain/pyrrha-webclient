export const KernelConstructorFormModel = {
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
    model: {
        label: 'Model',
        type: 'file',
        required: true,
        validator: value => true
    },
    weights: {
        label: 'Weights',
        type: 'file',
        required: true,
        validator: value => true
    },
    dimension: {
        label: 'Dimension',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    complexity: {
        label: 'Complexity',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    price: {
        label: 'Price',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    description: {
        label: 'Description',
        type: 'text',
        required: true,
        validator: value => true
    },
    metadata: {
        label: 'Meta tags',
        type: 'text',
        required: false,
        styles: [
            'lowercase'
        ],
        transform: value => {
            const delim = /,/gi.test(value) ? ',': ' ';
            return String(value).split(delim).filter(v => v !== '').join(',');
        },
        validator: value => true
    }
};

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
        placeholder: 'Kernel model IPFS hash',
        type: 'text',
        required: true,
        validator: value => RegExp(/^Qm[a-zA-Z0-9]{44}$/i).test(value)
    },
    weights: {
        label: 'Weights',
        placeholder: 'Kernel weights IPFS hash',
        type: 'text',
        required: true,
        validator: value => RegExp(/^Qm[a-zA-Z0-9]{44}$/i).test(value)
    },
    dimension: {
        label: 'Dimension',
        placeholder: 'Kernel data dimension',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    complexity: {
        label: 'Complexity',
        placeholder: 'Kernel complexity',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    price: {
        label: 'Price',
        placeholder: 'Kernel price',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    description: {
        label: 'Description',
        placeholder: 'Kernel short description',
        type: 'text',
        required: true,
        validator: value => true
    },
    metadata: {
        label: 'Meta tags',
        placeholder: 'Kernel meta tags separated by coma',
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

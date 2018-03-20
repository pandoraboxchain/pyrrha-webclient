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
    }
};

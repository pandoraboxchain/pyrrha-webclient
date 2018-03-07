export const DatasetConstructorFormModel = {
    publisher: {
        label: 'Publisher address',
        placeholder: 'Refresh accounts and click to add',
        type: 'text',
        list: {
            name: 'accounts',
            action: 'web3AccountsUpdate'
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    batch: {
        multiple: true,
        addLabel: 'Add batch',
        label: 'Data batch',
        type: 'file',
        required: true,
        validator: value => true
    },
    price: {
        label: 'Price',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    samples: {
        label: 'Samples Count',
        type: 'number',
        required: true,
        validator: value => value > 0
    },
    dimension: {
        label: 'Dimension',
        type: 'number',
        required: true,
        validator: value => value > 0
    }
};

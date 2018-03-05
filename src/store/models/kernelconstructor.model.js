export const KernelConstructorFormModel = {
    publisher: {
        label: 'Publisher address',
        type: 'text',
        list: {
            name: 'accounts',
            action: 'web3AccountsUpdate'
        },
        required: true,
        validator: value => {
            return true
        }
    },
    model: {
        label: 'Model',
        type: 'file',
        required: true,
        validator: value => {
            return true
        }
    },
    weights: {
        label: 'Weights',
        type: 'file',
        required: true,
        validator: value => {
            return true
        }
    },
    dimension: {
        label: 'Dimension',
        type: 'number',
        required: true,
        validator: value => {
            return value > 0
        }
    },
    complexity: {
        label: 'Complexity',
        type: 'number',
        required: true,
        validator: value => {
            return value > 0
        }
    },
    price: {
        label: 'Price',
        type: 'number',
        required: true,
        validator: value => {
            return value > 0
        }
    }
};

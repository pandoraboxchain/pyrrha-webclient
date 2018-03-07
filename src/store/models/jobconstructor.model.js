export const JobConstructorFormModel = {
    publisher: {
        label: 'Publisher address',
        type: 'text',
        list: {
            name: 'accounts',
            action: 'web3AccountsUpdate'
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    kernel: {
        label: 'Kernel',
        type: 'text',
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    },
    dataset: {
        label: 'Dataset',
        type: 'text',
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    }
};

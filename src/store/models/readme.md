# Form model example

```javascript
export const JobConstructorFormModel = {
    kernel: {
        label: 'Kernel',// Field label
        placeholder: 'Refresh kernels and click to add', // Placeholder
        type: 'text', // Type of field
        list: { // Refreshable list attached to field
            name: 'kernels', // name of list
            action: 'kernelsTableFetch', // Redux reducer action name (to start refresh)
            stateSelector: 'isKernelsFetching', // Redux state selector name
            recordsSelector: 'getKernels', // Redux records selector
            valueKey: 'address' // Name of the value key (in case object-records set)
        },
        required: true,
        validator: value => RegExp(/^0x[a-fA-F0-9]{40}$/i).test(value)
    }
};
```

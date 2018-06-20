export const jobType = [
    {
        name: 'Training',
        value: '0'
    },
    {
        name: 'Prediction',
        value: '1'
    }
];

export const maxBatchesCount = 10;

export const maxJobsCount = Math.pow(2, 16) - 1;// fit to uint16 size

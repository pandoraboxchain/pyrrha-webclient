export const convertJobTypeCode = code => {

    switch (Number(code)) {
        case 0: return 'Training';
        case 1: return 'Prediction';
        default: return 'Unknown';
    }
};

export const convertJobStatusCode = code => {

    switch (Number(code)) {
        case 1: return 'Gathering workers';
        case 2: return 'Insufficient workers';
        case 3: return 'Data validation';
        case 4: return 'Invalid data';
        case 5: return 'Cognition';
        case 6: return 'Partial result';
        case 7: return 'Completed';
        default: return 'Unknown';
    }
};

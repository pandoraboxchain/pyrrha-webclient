/**
 * Validate constructor form
 * 
 * @param {Object} values Form values
 * @returns {Promise} Promise object resolved to values object
 */
export const validateConstructorForm = (formModel, values) => new Promise((resolve, reject) => {
    const errors = [];

    Object.keys(formModel).forEach(field => {

        if (formModel[field].multiple) {
            
            Object.keys(values[field]).forEach((item, index) => {

                if (formModel[field].required && !values[field][item]) {

                    errors.push(new Error(`Field "${formModel[field].label}" #${index} is required`));
                } else if (formModel[field].validator && 
                    !formModel[field].validator(values[field])) {
        
                    errors.push(new Error(`Field "${formModel[field].label}" #${index} has wrong value`));
                }
            });
        } else if (formModel[field].required && !values[field]) {

            errors.push(new Error(`Field "${formModel[field].label}" is required`));
        } else if (formModel[field].validator && 
            !formModel[field].validator(values[field])) {

            errors.push(new Error(`Field "${formModel[field].label}" has wrong value`));
        }
    });

    if (errors.length > 0) {

        return reject(errors);
    }

    return resolve(values);
});
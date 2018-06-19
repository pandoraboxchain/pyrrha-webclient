/**
 * Validate constructor form
 * 
 * @param {Object} values Form values
 * @returns {Promise} Promise object resolved to values object
 */
export const validateConstructorForm = (formModel, values) => new Promise((resolve, reject) => {
    const errors = [];

    Object.keys(formModel).forEach(field => {

        if (formModel[field].relatedTo && values[formModel[field].relatedTo.field] !== formModel[field].relatedTo.value) {

            values[field] = undefined;
            return;// Do not validate fields with non-conformed "relatedTo" condition
        }

        if (formModel[field].multiple) {

            if (!values[field] || (typeof values[field] === 'object' && Object.keys(values[field]).length === 0)) {

                errors.push(new Error(`You have to add at least one "${field}"`));
                return;
            }
            
            Object.keys(values[field]).forEach((item, index) => {

                if (formModel[field].transform) {

                    values[field][item] = formModel[field].transform(values[field][item]);
                }

                if (values[field][item] !== undefined && formModel[field].type === 'text') {

                    values[field][item] = sanitizeString(values[field][item]);
                }

                if (formModel[field].required && (values[field][item] === undefined || values[field][item] === '' || values[field][item] === null)) {

                    errors.push(new Error(`Field "${formModel[field].label}" #${index} is required`));
                } else if (formModel[field].validator && 
                    !formModel[field].validator(values[field])) {
        
                    errors.push(new Error(`Field "${formModel[field].label}" #${index} has wrong value`));
                }
            });
        } else {

            if (formModel[field].transform) {

                values[field] = formModel[field].transform(values[field]);
            }

            if (values[field] !== undefined && formModel[field].type === 'text') {

                values[field] = sanitizeString(values[field]);
            }

            if (formModel[field].required && (values[field] === undefined || 
                                            values[field] === '' || 
                                            (formModel[field].type === 'file' && typeof values[field] === 'object' && !values[field].name))) {

                errors.push(new Error(`Field "${formModel[field].label}" is required`));
            } else if (formModel[field].validator && 
                !formModel[field].validator(values[field])) {
    
                errors.push(new Error(`Field "${formModel[field].label}" has wrong value`));
            }
        }
    });

    if (errors.length > 0) {

        return reject(errors);
    }

    return resolve(values);
});

/**
 * Validate form field value using validators defined in the model
 * 
 * @param {Object} model
 * @param {String} name 
 * @param {any} value 
 * @returns {Boolean} Validation result
 */
export const isFormFieldValid = (model, name, value) => {

    if (model[name]) {

        if (model[name].type === 'number' && typeof value !== model[name].type) {

            return false;
        }

        return model[name].validator ? model[name].validator(value) : true;
    }

    throw new Error(`Field "${name}" not found in the model`);
};

/**
 * Strip html and scripts from text
 *
 * @param {String} text
 * @returns {String} Sanitized text
 */
export const sanitizeString = text => String(text).replace(/(<([^>]+)>)/ig, '');

import { createTransform } from 'redux-persist';

/**
 * Delete object property by string path
 * 
 * @param {String} path Object path like a.b.c
 * @param {Object} obj Target object to mutate
 */
const deleteOnPath = (path, obj) => {
    path.split('.')
        .reduce((acc, part, i, a) => {
            
            if (i === a.length-1) { 

                try {
                    return delete acc[part]; 
                } catch(err) {}                
            }

            return acc[part]
        }, obj);
};

/**
 * Delete unwanted properties from the object
 * 
 * @param {Array} paths Array of paths
 * @param {Object} obj Target object to mutate
 */
const deletePaths = (paths , obj) => paths.map(path => deleteOnPath(path, obj));

/**
 * Transformation filter that allow to exclude 
 * some values from the rehydrated state
 * 
 * @param {String} reducer 
 * @param {array} paths Array of paths like ['a.b', 'c.d.e']
 * @returns {function} 
 */
export const createPersistStorageFilter = (reducer, paths) => {

    return createTransform(
        null,
        (outboundState, key) => {
            deletePaths(paths, outboundState);
            return { ...outboundState };
        },
        { 
            whitelist: [reducer] 
        }
    );
};

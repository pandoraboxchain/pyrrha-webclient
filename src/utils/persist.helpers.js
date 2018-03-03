import { createTransform } from 'redux-persist';

const deleteOnPath = (path, obj) => {
    return path.split('.')
        .reduce((acc, part, i, a) => {
            
            if (i === a.length-1) { 

                try {
                    return delete acc[part]; 
                } catch(err) {}                
            }

            return acc[part]
        }, obj);
};

const deletePaths = (paths , obj) => {
    return paths.map(path => deleteOnPath(path, obj));
};

/**
 * Transformation filter that allow to exclude 
 * some values from the rehydrated state
 * 
 * @param {string} reducer 
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

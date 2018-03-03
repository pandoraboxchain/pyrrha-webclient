import ipfsAPI from 'ipfs-api';
import config from '../config';

// Create connection to IPFS server
const ipfs = ipfsAPI(
    config.ipfsHost, 
    config.ipfsPort, 
    { 
        protocol: config.ipfsProtocol
    }
);

/**
 * Load file from fs
 * 
 * @param {File} file 
 * @returns {Promise}
 */
export const loadFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = (error) => {
            reader.abort();
            reject(error);
        };

        reader.onloadend = () => resolve({
            result: reader.result,
            name: file.name,
            type: file.type
        });
        reader.readAsArrayBuffer(file);
    });    
};

/**
 * Add file to IPFS
 * 
 * @param {Buffer} buffer 
 * @param {ArrayBuffer} loadedFile 
 * @param {Function} [progressCb=() => {}] 
 * @returns {string}
 */
export const addIpfs = async (buffer, loadedFile, progressCb = () => {}) => {

    try {
        const response = await ipfs.add(buffer, {
            progress: progress => progressCb({
                file: loadedFile.name,
                size: buffer.length,
                type: loadedFile.type,
                progress
            })
        });
        return response[0].hash;
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Submit binary file to IPFS
 * 
 * @param {File} file 
 * @param {Function} [progressCb=() => {}] 
 * @returns {string}
 */
export const submitFileToIpfs = async (file, progressCb = () => {}) => {
    
    try {
        const loadedFile = await loadFile(file);
        const buffer = Buffer.from(loadedFile.result);
        const hash = await addIpfs(buffer, loadedFile, progressCb);
        return hash;
    } catch(err) {
        return Promise.reject(err);
    }    
};

/**
 * Submit json file to IPFS
 * 
 * @param {any} jsonString 
 * @param {any} fileInfo 
 * @param {any} [progressCb=() => {}] 
 * @returns 
 */
export const submitJsonToIpfs = async (jsonString, fileInfo, progressCb = () => {}) => {

    try {
        const buffer = Buffer.from(jsonString);
        fileInfo.size = buffer.length;
        const hash = await addIpfs(buffer, fileInfo, progressCb);
        return hash;
    } catch(err) {
        return Promise.reject(err);
    } 
};

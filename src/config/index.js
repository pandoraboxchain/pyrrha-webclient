const hosts = {
    default: {
        protocol: 'ws',
        host: 'localhost',
        port: 4445,
        reconnect: 5000,
        contracts: {
            pandora: '0x5c86aa41d803b60cca6c114645d341c23b0cbac5',
            market: '0xbb7b9caf771015279e04197c09e08703a9353b6f'
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
            port: 5001
        }
    },
    rinkeby: {
        protocol: 'ws',
        host: 'rinkeby.pandora.network',
        port: 8546,
        net: 4,
        contracts: {
            pandora: '0xf23f45caa5c697c54d2e92ecbee48855233040e1',
            market: '0xd1feab2687c6beea17d8c1f728aaf54aed5c0ea9'
        },
        ipfs: {
            protocol: 'http',
            host: 'ipfs.pandora.network',
            port: 5001
        }
    },
    rikebyinfura: {
        protocol: 'https',
        host: 'rinkeby.infura.io/Llc2pOEtpgzvopBH8dst',
        port: '',
        contracts: {
            pandora: '0xf23f45caa5c697c54d2e92ecbee48855233040e1',
            market: '0xd1feab2687c6beea17d8c1f728aaf54aed5c0ea9'
        },
        ipfs: {
            protocol: 'http',
            host: 'ipfs.pandora.network',
            port: 5001
        }
    }
};

let defaultHost = process.env.REACT_APP_USE_HOST || 'rinkeby';

const config = {
    ...hosts.default,
    ...hosts[defaultHost]
};

export default {
    ethProtocol: process.env.REACT_APP_WEB3_PROTOCOL || config.protocol,
    ethPort: process.env.REACT_APP_WEB3_PORT || config.port,
    ethHost: process.env.REACT_APP_WEB3_HOSTNAME || config.host,
    ethId: process.env.REACT_APP_WEB3_NET_ID ? parseInt(process.env.REACT_APP_WEB3_NET_ID, 10) : config.net,
    ipfsProtocol: process.env.REACT_APP_IPFS_PROTOCOL || config.ipfs.protocol,
    ipfsHost: process.env.REACT_APP_IPFS_HOST || config.ipfs.host,
    ipfsPort: process.env.REACT_APP_IPFS_PORT || config.ipfs.port,
    pandoraAddress: process.env.REACT_APP_PAN_ADDRESS || config.contracts.pandora,
    marketAddress: process.env.REACT_APP_MARKET_ADDRESS || config.contracts.market,
    reconnect: process.env.REACT_APP_WEB3_RECONNECT_TIMEOUT || config.reconnect    
};

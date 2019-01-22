const hosts = {
    default: {
        protocol: 'ws',
        host: 'localhost',
        port: 8545,
        reconnect: 5000,
        contracts: {
            pan: '0xa40600efcb9b69003757fb196304858f989888a1',
            economic: '0x3c2f60a3c1dba316c1031925712339f694f0da99',
            pandora: '0x2ac8d321cdfdc1fa5591a38ee2c2bcbe094b64d7',
            market: '0xfd4158c461df6295229e23c7686f8684a0d26531'
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
        reconnect: 5000,
        contracts: {
            pan: '0xa40600efcb9b69003757fb196304858f989888a1',
            economic: '0x3c2f60a3c1dba316c1031925712339f694f0da99',
            pandora: '0x2ac8d321cdfdc1fa5591a38ee2c2bcbe094b64d7',
            market: '0xfd4158c461df6295229e23c7686f8684a0d26531'
        },
        ipfs: {
            protocol: 'http',
            host: 'ipfs.pandora.network',
            port: 5001
        }
    },
    rikebyinfura: {
        protocol: 'wss',
        host: 'rinkeby.infura.io/ws',
        port: '',
        reconnect: 5000,
        contracts: {
            pan: '0xa40600efcb9b69003757fb196304858f989888a1',
            economic: '0x3c2f60a3c1dba316c1031925712339f694f0da99',
            pandora: '0x2ac8d321cdfdc1fa5591a38ee2c2bcbe094b64d7',
            market: '0xfd4158c461df6295229e23c7686f8684a0d26531'
        },
        ipfs: {
            protocol: 'http',
            host: 'ipfs.pandora.network',
            port: 5001
        }
    }
};

let defaultHost = process.env.REACT_APP_USE_HOST || 'rikebyinfura';

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
    panAddress: process.env.REACT_APP_PAN_ADDRESS || config.contracts.pan,
    economicAddress: process.env.REACT_APP_ECO_ADDRESS || config.contracts.economic,
    pandoraAddress: process.env.REACT_APP_PANDORA_ADDRESS || config.contracts.pandora,
    marketAddress: process.env.REACT_APP_MARKET_ADDRESS || config.contracts.market,
    reconnect: process.env.REACT_APP_WEB3_RECONNECT_TIMEOUT || config.reconnect    
};

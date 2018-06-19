const hosts = {
    default: {
        protocol: 'ws',
        host: 'localhost',
        port: 8545,
        reconnect: 5000,
        contracts: {
            pandora: '0xafc83389be9d7e423e77bcd9cb5fc54eb6b7efcc',
            market: '0xab44cc7d8f3a147de5a39c2d42b1bc638b7a195c'
        },
        ipfs: {
            protocol: 'http',
            host: 'ipfs.pandora.network',
            port: 5001
        }
    },
    rinkeby: {
        protocol: 'ws',
        host: 'rinkeby.pandora.network',
        port: 8546,
        net: 4,
        contracts: {
            pandora: '0x40211d2982951a0bfdfde20a0a0000f3ee5299ac',
            market: '0xf3037d5b0a6077a1098f99d2c5b74cbed0ddef1a'
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
            pandora: '0x40211d2982951a0bfdfde20a0a0000f3ee5299ac',
            market: '0xf3037d5b0a6077a1098f99d2c5b74cbed0ddef1a'
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
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

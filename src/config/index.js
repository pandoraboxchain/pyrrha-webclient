const hosts = {
    default: {
        protocol: 'http',
        host: 'localhost',
        port: 8545,
        reconnect: 5000,
        contracts: {
            pandora: '',
            market: ''
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
            port: 5001
        }
    },
    rsk: {
        protocol: 'http',
        host: 'bitcoin.pandora.network',
        port: 4444,
        contracts: {
            pandora: '0xfeb13c11b476601dcba42e6eb502aa6047fe4b78',
            market: ''
        },
        ipfs: {
            protocol: 'http',
            host: '52.232.79.62',
            port: 5001
        }
    },
    ropsten: {
        protocol: 'https',
        host: 'ropsten.infura.io/Llc2pOEtpgzvopBH8dst',
        port: '',
        contracts: {
            pandora: '0xb1746daa5260ba5d94c6b407b226b1cb190190ab',
            market: '0xb452c5abf6a0ddc5f6afe8598e1e3e6ebeaf558c'
        },
        ipfs: {
            protocol: 'http',
            host: '52.232.79.62',
            port: 5001
        }
    },
    rinkeby: {
        protocol: 'http',
        host: 'dockstation.pandora.network',
        port: 8545,
        contracts: {
            pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
            market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
            port: 5001
        }
    },
    rikebyinfura: {
        protocol: 'https',
        host: 'rinkeby.infura.io/Llc2pOEtpgzvopBH8dst',
        port: '',
        contracts: {
            pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
            market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
            port: 5001
        }
    }
};

let defaultHost = process.env.USE_HOST || 'rinkeby';

const config = {
    ...hosts.default,
    ...hosts[defaultHost]
};

export default {
    protocol: process.env.REACT_APP_WEB3_PROTOCOL || config.protocol,
    nodePort: process.env.REACT_APP_WEB3_PORT || config.port,
    nodeHost: process.env.REACT_APP_WEB3_HOSTNAME || config.host,
    pandoraAddress: process.env.REACT_APP_PAN_ADDRESS || config.contracts.pandora,
    marketAddress: process.env.REACT_APP_MARKET_ADDRESS || config.contracts.market,
    ipfsProtocol: process.env.REACT_APP_IPFS_PROTOCOL || config.ipfs.protocol,
    ipfsHost: process.env.REACT_APP_IPFS_HOST || config.ipfs.host,
    ipfsPort: process.env.REACT_APP_IPFS_PORT || config.ipfs.port,
    reconnect: process.env.REACT_APP_WEB3_RECONNECT_TIMEOUT || config.reconnect
};

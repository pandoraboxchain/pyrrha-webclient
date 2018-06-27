const hosts = {
    default: {
        protocol: 'ws',
        host: 'localhost',
        port: 8545,
        reconnect: 5000,
        contracts: {
            pandora: '0x9561c133dd8580860b6b7e504bc5aa500f0f06a7',
            market: '0x2612af3a521c2df9eaf28422ca335b04adf3ac66'
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
            pandora: '0x41ceb4bd1b8abeb1b036f7448a8a3a525fb5de56',
            market: '0x019ccc2e2789eb3ddeed50caab32b408ac18969b'
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
            pandora: '0x41ceb4bd1b8abeb1b036f7448a8a3a525fb5de56',
            market: '0x019ccc2e2789eb3ddeed50caab32b408ac18969b'
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

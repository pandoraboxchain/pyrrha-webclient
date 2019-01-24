const hosts = {
    default: {
        protocol: 'ws',
        host: 'localhost',
        port: 8545,
        reconnect: 5000,
        contracts: {
            pan: '0x49e429ec1199d077b1f2ae8b6100b220f56401ef',
            economic: '0xf70a24b04e6b59eb6af9bd176e1ee24a97fa1961',
            pandora: '0x044662dfbfa067dd603f54b900cc157b9d6618d4',
            market: '0xc20e1435e654fbac8d7ed557ee424ab876d4f463'
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
            pan: '0x49e429ec1199d077b1f2ae8b6100b220f56401ef',
            economic: '0xf70a24b04e6b59eb6af9bd176e1ee24a97fa1961',
            pandora: '0x044662dfbfa067dd603f54b900cc157b9d6618d4',
            market: '0xc20e1435e654fbac8d7ed557ee424ab876d4f463'
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
            pan: '0x49e429ec1199d077b1f2ae8b6100b220f56401ef',
            economic: '0xf70a24b04e6b59eb6af9bd176e1ee24a97fa1961',
            pandora: '0x044662dfbfa067dd603f54b900cc157b9d6618d4',
            market: '0xc20e1435e654fbac8d7ed557ee424ab876d4f463'
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

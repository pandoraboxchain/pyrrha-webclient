<<<<<<< HEAD
# Pandora Pyrrha Webclient
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e195be0b5234b6c98870c504036bff0)](https://www.codacy.com/app/kostysh/pyrrha-webclient?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pandoraboxchain/pyrrha-webclient&amp;utm_campaign=Badge_Grade)  
=======
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e195be0b5234b6c98870c504036bff0)](https://www.codacy.com/app/kostysh/pyrrha-webclient?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pandoraboxchain/pyrrha-webclient&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/pandoraboxchain/pyrrha-webclient.svg?branch=master)](https://travis-ci.org/pandoraboxchain/pyrrha-webclient)  

# Pandora Pyrrha Webclient
>>>>>>> master
Web application for working with kernels and datasets

## Initial setup 
```sh
npm i
git submodule update --init --recursive
```
MetaMask (https://metamask.io/) browser extension is required:
- Install extension
- Connect to apropriate netowork where Pandora contracts are deployed (rinkeby, currently)
- Create a wallet
- Get some ETH to your account via Rinkeby faucet (https://faucet.rinkeby.io/)

## Start 
```sh
npm start
```

## Local configuration (for development)
All kinds of development configurations are located in the file `./src/config/index.js`  
To enable one of the hosts from config you can use environment variable `USE_HOST`.
This way you can start your local development app instance with, for example:
```sh
USE_HOST=rinkeby npm start
```

## Docker
Server's port and other configurations can be changed in the file `./docker-compose.yml`   
Default build arguments:
```
args:
    - REACT_APP_WEB3_PROTOCOL=http
    - REACT_APP_WEB3_PORT=8545
    - REACT_APP_WEB3_HOSTNAME=dockstation.pandora.network
    - REACT_APP_PAN_ADDRESS=0x58e66b79928cfb362b53c185a6a1fded882bb07d
    - REACT_APP_MARKET_ADDRESS=0x6142029abb21ef2e0bffde8d43f15c64f3750fe6
    - REACT_APP_IPFS_PROTOCOL=http
    - REACT_APP_IPFS_HOST=ipfs.pandora.network
    - REACT_APP_IPFS_PORT=5001
    - REACT_APP_WEB3_RECONNECT_TIMEOUT=5000
ports:
    - "8080:8080"
```
Build container:
```sh
npm run build:docker
```
Start container in daemon mode:
```sh
npm run start:docker
```
Stop the container:  
```sh
npm run stop:docker
```
By default, Pandora Webclient will be available on port `8080`  
Server's logs are placed in folder `./.logs`

## Known issue
- Google Chrome crashes on large files uploading (https://github.com/ipfs/js-ipfs-api/issues/654)

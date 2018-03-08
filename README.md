# Pandora Pyrrha Webclient
Web application for working with kernels and datasets

## Initial setup 
```sh
npm i
git submodule update --init --recursive
```

## Start 
```sh
npm start
```

## Creating of build for production
```sh
npm run build
```
or without sourcemaps:
```sh
GENERATE_SOURCEMAP=false npm run build
```

## Docker
Server's port and other configurations can be changed in the file `./docker-compose.yml`   
Default environment:
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

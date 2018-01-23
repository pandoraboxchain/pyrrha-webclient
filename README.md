## Installation

1. Install browserify using `npm install -g browserify`

2. launch `npm run bundle` at least once.
This will create bundle.js file inside browserified folder.
You have to run this every time you change any js file.

3. Use `npm start` to start the server

#### Note
You may need to install and launch ipfs daemon https://ipfs.io/docs/install/

Refer to https://github.com/ipfs/js-ipfs-api#cors if you got CORS error when uploading to IPFS

## Run with Docker

1. launch `npm run bundle`
2. launch `git submodule update --init --recursive`
3. launch `docker-compose up --build` (it also starts ipfs server)

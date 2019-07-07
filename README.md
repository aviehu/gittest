# PubU(i)

### Prerequisites
*Requires `yarn` and `NodeJS version 12`*

### Installation 
`NODE_ENV` - defaults to `development`, change value to `production` to open the server for connection other than `localhost`
`WEBSOCKET_SERVER_URL` - defaults to `ws://localhost:9001`, the websocket url the client will attempt to conenct to.

### Installation 
Run `yarn`

This step install's both the api and client side dependencies. And lerna at the root which manages the monorepo. 

### Run servers in development mode
Run `yarn start:dev`

### Build and Run in production mode
Run `yarn start`

### Run the simulation tool
Run `yarn sim`

### packing project
Run `yarn package`

it will create a packed file in `pubui/dist/pubui.<version>.tar.gz`
make sure you have pack/packed folder and no pack/temp folder
also make sure you rename / remove earlier pubui.tar.gz

### unpacking project
Run `tar -xzvf path/to/pubui.<version>.tar.gz -C path/to/unpacked/folders`

### starting servers after unpacking
in the diractory containing both the api and client folder run:
`node api/src/index.js & node client/dist/app/app-server/index.js`


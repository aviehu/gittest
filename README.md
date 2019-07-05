# PubU(i)

### Prerequisites
*Requires `yarn` and `NodeJS version 12`*

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

it will create a packed file in `pubui/pack/packed/packed.tar.gz`
make sure you have pack/packed folder and no pack/temp folder
also make sure you rename / remove earlier packed.tar.gz

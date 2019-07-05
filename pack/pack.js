const fs = require('fs');
const del = require('del');
const util = require('util');
const targz = require('targz');
const ncp = require('ncp').ncp;
const { exec } = require('child_process');

const mkdir = util.promisify(fs.mkdir);
const asyncNcp = util.promisify(ncp);
const asyncExec = util.promisify(exec);
const asyncTargz = util.promisify(targz.compress)


async function makeFolder() {
    try {
        await mkdir('./pack/temp');
         console.log('temp folder created');
        await mkdir('./pack/temp/api');
         console.log('api folder created');
        await mkdir('./pack/temp/client');
         console.log('client folder created');
        await mkdir('./pack/temp/node_modules');
         console.log('node_modules folder created');
    } catch (err) {
        throw err;
    } 
}

async function copyFolders(){
    try {
        console.log('copying api to temp folder...')
        await asyncNcp('./api', './pack/temp/api')
        console.log('api folder copied!')
        console.log('copying api to temp folder...')
        await asyncNcp('./client', './pack/temp/client')
        console.log('client folder copied!')
    } catch (err) {
        throw err;
    }
}


async function removeNM() {
    try {
        console.log('removing api node_modules...');
        await del(['./pack/temp/api/node_modules/**']);
        console.log('api node_modules deleted!');
    } catch (err) {
        throw err;
    }
}


async function install() {
    try {
       console.log('installing api...')
       await asyncExec('cd ./pack/temp/api && npm install --only=prod')
       console.log('api has been installed!')
       console.log('building client...')
       await asyncExec('cd ./pack/temp/client && webpack && babel src --out-dir dist/app')
       console.log('client has been built!')
       console.log('removing client node_modules...');
       await del(['./pack/temp/client/node_modules/**']);
       console.log('client node_modules deleted!');
       console.log('installing client...')
       await asyncExec('cd ./pack/temp/client &&  npm install --only=prod')
       console.log('client has been installed!')
    } catch (err) {
        throw err;
    }
}

    async function zip() {
        try {
            console.log('packing project...')
            await asyncTargz({
                src: './pack/temp',
                dest: './pack/packed/packed.tar.gz'
            })
            console.log('finished packing project!')
        } catch (err) {
            throw err;
        }
    }

async function deleteTemp(){
    try {
        console.log('cleaning up...');
        await del(['./pack/temp/**']);
        console.log('packing complete!');
        } catch (err) {
            throw err;
    }
}


async function pack() {
    try {
        await makeFolder();
        await copyFolders();
        await removeNM();
        await install();
        await zip();
        await deleteTemp();
    } catch (err) {
        throw err;
    }
}

pack();
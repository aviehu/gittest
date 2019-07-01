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
    } catch (err) {
        throw err;
    } 
}

async function copyFolders(){
    try {
        await asyncNcp('./api', './pack/temp/api')
        console.log('api folder copied')
        await asyncNcp('./client', './pack/temp/client')
        console.log('client folder copied')
    } catch (err) {
        throw err;
    }
}


async function removeNM() {
    try {
        await del(['./pack/temp/api/node_modules/**']);
        console.log('api NM deleted');
        await del(['./pack/temp/client/node_modules/**']);
        console.log('client NM deleted');
    } catch (err) {
        throw err;
    }
}


async function install() {
    try {
       await asyncExec('cd ./pack/temp/api && yarn')
       console.log('api has been installed')
       await asyncExec('cd ./pack/temp/client && yarn')
       console.log('client has been installed')
    } catch (err) {
        throw err;
    }
}

    async function zip() {
        try {
            await asyncTargz({
                src: './pack/temp',
                dest: './pack/packed/packed'
            })
            console.log('finished packing project')
        } catch (err) {
            throw err;
        }
    }

async function deleteTemp(){
    try {
    await del(['./pack/temp/**']);
    console.log('temp folder deleted');
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
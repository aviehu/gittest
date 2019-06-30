const fs = require('fs');
const del = require('del');
const ncp = require('ncp').ncp;
const { exec } = require('child_process');


function makeFolder() { 
 fs.mkdir('./pack/temp',(err)=> {
        if(err) return (err);
    }),
 fs.mkdir('./pack/temp/api', (err) => {
        if (err) return (err);
    })
 fs.mkdir('./pack/temp/client', (err) => {
        if (err) return (err);
    })
    return console.log('folders have been created');
}

function removeFolder() {
    fs.rmdir('./pack/temp', (err) => {
        if(err) return (err);
    })
    return console.log('folder has been removed')
}
function copyFolders(){
    ncp('./api', './pack/temp/api', (err) => {
        if (err) {
          return console.error(err);
        }
        return console.log('api folder has been copied');
       });
    ncp('./client', './pack/temp/client', (err) => {
        if (err) {
          return console.error(err);
        }
        return console.log('client folder has been copied');
       });
}

function removeNM(){
    del(['./pack/temp/api/node_modules/**']);
    console.log('api NM deleted');
    del(['./pack/temp/client/node_modules/**']);
    console.log('client NM deleted');
}

function install() {
    exec('cd ./pack/temp/api && yarn', () => {
         return console.log('installed api');
        
}),
    exec('cd ./pack/temp/client && yarn', () => {
        return console.log('installed client');
})}

 function zip(){
    exec('gzipper --verbose ./pack/temp ./pack/packed', (err) => {
        if (err) return (err);
    })
}

async function pack() {
    await makeFolder();
    await copyFolders();
    //await removeNM();
    //await install();
}

pack();

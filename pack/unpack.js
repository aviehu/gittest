const util = require('util');
const targz = require('targz');
const asyncTargz = util.promisify(targz.decompress)

async function unpack() {
    try {
        await asyncTargz({
            src: './pack/packed/packed',
            dest: './pack/unpacked'
        })
        console.log('finished unpacking project')
    } catch (err) {
        throw err;
    }
}

unpack();
import fs from 'fs';
import stream, { Transform } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readStream = fs.createReadStream(path.join(__dirname, 'file.txt'));

const writeStream = fs.createWriteStream(path.join(__dirname, 'dest.txt'));

readStream.on('data', (chunk) => {
    console.log('Received chunk: ', chunk);
});

writeStream.on('finish', () => {
    console.log('data written');
});

readStream.on('error', (err) => {
    console.log('Error of read stream', err);
});

//console.log('Start to pipe')
//readStream.pipe(writeStream);

//const writeStreamKeyboard = fs.createWriteStream('./keyboard.txt');
//process.stdin.pipe(writeStreamKeyboard);

//process.stdin.pipe(process.stderr);

const uppercaseStream = new Transform({
    transform(chunk, encoding, callback){
        const upperCased = chunk.toString().toUpperCase();
        callback(null, upperCased);
    }
});


process.stdin.pipe(uppercaseStream).pipe(process.stderr);





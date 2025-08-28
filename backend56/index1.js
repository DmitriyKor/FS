import path from 'path';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';

const filePath = './data/data.txt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname: ', __dirname);

const absolutePath = path.resolve(__dirname, filePath);
console.log(absolutePath);
console.log(path.normalize('c:\\Program Files\\/'));
console.log('relative:', path.relative(filePath, 'C:\\Program Files'));
console.log(path.parse(absolutePath));

const fileName = path.basename(absolutePath);
console.log(fileName);

const fileExt = path.extname(absolutePath);
console.log(fileExt);

console.log(path.isAbsolute('/data/data.txt'))

const timeEmitter = new EventEmitter();
timeEmitter.setMaxListeners(1);

timeEmitter.on('event', (param1, param2)=>{
    console.log('Event handler. Params are ', param1, param2);
})

timeEmitter.on('event', (param1, param2)=>{
    console.log('Event handler 2. Params are ', param1, param2);
})

timeEmitter.on('event', (param1, param2)=>{
    console.log('Event handler 3. Params are ', param1, param2);
})

timeEmitter.once('init', ()=>{
    console.log('Once');
})

setTimeout(()=>{timeEmitter.emit('event', 5, 10)}, 500)
setTimeout(()=>{timeEmitter.emit('init')}, 200);
setTimeout(()=>{timeEmitter.emit('init')}, 500);

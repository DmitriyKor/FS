const process = require("node:process");
const { Worker, isMainThread, parentPort, workerData } = require("node:worker_threads");
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const EventEmitter = require('node:events');

const port = process.env.PORT || 8080;

const fileName = path.join(__dirname, 'file.txt');

// process.on('beforeExit', (code)=>{
//     console.log('Before exit with code ', code);
// });

// process.on('exit', (code)=>{
//    console.log('Exit with code ', code);
// }); 

// const eventEmitter = new EventEmitter();
// eventEmitter.on('start', () => {
//     console.log('Calculation started');
// });
// eventEmitter.on('finish', () => {
//     console.log('Calculation finished');
// });

console.log(process.env.port);

const majorNodeVersion = +process.versions.node.split('.')[0];
console.log('Major node version is ', majorNodeVersion);

// setTimeout(() => {
//     process.exit(1);
// }, 3000);

if (isMainThread) {
  // Main thread code
  fs.readFile(fileName, (err, data) => {
    if (err) {
      return console.error('Error of reading the file');
    }
    console.log('Binary data ', data);
    console.log('String representation ', data.toString());
  })
  

  const worker = new Worker(__filename); // Spawns a worker running this same file
  worker.on('message', (result) => {
    console.log('Received result from worker: length is', result.length, 'results are: ', result[0], result[1], '...');
  });
  worker.postMessage({ data: 999.444222 }); // Send data to the worker
} else {
  // Worker thread code
  parentPort.on('message', (message) => {
    // Perform CPU-intensive calculation on message.data   
    const calculatedResult = Array.from({ length: 5000000 }, (_, index) => Math.atan2(index, message.data));
    parentPort.postMessage(calculatedResult); // Send result back to main thread
  });
}
import { promises as fsPromises } from "fs";
import fs from 'fs';

const filePath = './file.txt';

async function handleFiles() {
    try {
        await fsPromises.access(filePath)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error: ', error.message);
            if ('code' in error) {console.log('Code is ', error.code)}
        } else {
            console.error('Unknown error: ', error)
        } 
        return error;
    }

    try {
        const st = await fsPromises.stat(filePath);
        console.log(st);

    } catch (error) {

    }

    try {  
        const data = await fsPromises.readFile(filePath, 'utf8');
        console.log('Promise reading. Content of the file: ', data);
        console.log(typeof data); 
        const data1 = await fsPromises.readFile('./file.txt');
        console.log(data1);
        const content = 'ea ea oh';
        await fsPromises.writeFile('./file1.txt', content);
    } catch (error){
        if (error instanceof Error) {
            console.error('Error: ', error.message);
            if ('code' in error) {console.log('Code is ', error.code)}
        } else {
            console.error('Unknown error: ', error)
        }
    }
}
handleFiles();

//callback methods
fs.readFile('./file.txt', (err, data)=>{
    if (err) throw err;
    console.log('Callback reading: ', data);
    const content = 'cow says moo';
    fs.writeFile('./output.txt', content, (err)=>{
        if (err) throw err;
    })
})


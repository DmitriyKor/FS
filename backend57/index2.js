import http from 'node:http';
import fs from 'fs';

const httpServer = http.createServer((req, res)=>{
    if ((req.url=='/' || req.url=='/index.html') && req.method=='GET'){
        const readStream = fs.createReadStream('./index.html');
        res.statusCode= 200;
        res.setHeader('Content-Type', 'text/html');
        readStream.pipe(res);        
    }
});

httpServer.listen(3000, ()=>{
    console.log('Server started')
})
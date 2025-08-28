import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from 'node:http';

const app = express();

app.use(
    cors(
        {
            origin: '*'
        }
    )
)

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: '*',
    methods: ['GET', 'POST'],
    serveClient: false
});

io.on('connection', (socket) => {
    socket.on('myEvent1', (data) => {
        const data1 = data;//process and pepare output data
        io.emit('respondToMyEvent1', data1);
    });

    socket.on('disconnect', () => {
    });
})

httpServer.listen(3000, () => console.log('Started'));



import registerSocketEvents from './registerSocketEvents.js';
import { policy } from '../../configs/cors.js';
import { Server } from 'socket.io';
import http from 'http';

let io;

const websocket = (app) => {
    const server = http.createServer(app);
    io = new Server(server, {
        cors: policy,
    });

    io.on('connection', (socket) => {
        registerSocketEvents(socket);
    });

    return { server, io };
}

const getSocketInstance = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
}

export { websocket, getSocketInstance };

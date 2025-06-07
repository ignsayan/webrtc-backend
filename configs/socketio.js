import { Server } from 'socket.io';
import http from 'http';
import { policy } from './cors.js';

let io;

const websocket = (app) => {
    const server = http.createServer(app);
    io = new Server(server, {
        cors: policy,
    });
    return { server, io };
}

const getIoInstance = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
}

export { websocket, getIoInstance };

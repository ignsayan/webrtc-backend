import express from 'express';
import dotenv from 'dotenv';
import { websocket } from './app/utilities/socketInstance.js';
import dbconnect from './configs/database.js';
import corspolicy from './configs/cors.js';
import isAuthenticated from './app/middlewares/isAuthenticated.js';
import hasRole from './app/middlewares/hasRole.js';
import authRoute from './routes/authRoute.js';
import chatRoute from './routes/chatRoute.js';
import webRoute from './routes/webRoute.js';


dotenv.config();
await dbconnect();

const app = express();
const { server } = websocket(app);

app.use(corspolicy);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// guest routes
app.use('/', webRoute);
app.use('/api/auth', authRoute);
app.use('/api/chat', chatRoute);

// authenticated routes
app.use(isAuthenticated);

// start the server
server.listen(process.env.APP_PORT, () => {
    console.log('✅ Server started');
});
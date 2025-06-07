import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

export const policy = {
    origin: [
        process.env.APP_HOST,
        process.env.FRONTEND_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

const corspolicy = cors(policy);

export default corspolicy;
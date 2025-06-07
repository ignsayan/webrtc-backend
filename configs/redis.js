import dotenv from 'dotenv';
import { Redis } from '@upstash/redis';

dotenv.config();

const redis = new Redis({
    url: process.env.REDIS_HOST,
    token: process.env.REDIS_TOKEN,
});

export default redis;

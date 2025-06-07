import jwt from 'jsonwebtoken';
import redis from '../../../configs/redis.js';
import cache from '../../../configs/cache.js';

const action = async (data) => {

    const token = data.authorization.split(' ')[1];
    const decoded = jwt.decode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = decoded.exp;

    const timeToLive = expiryTime - currentTime;

    if (timeToLive > 0) {
        process.env.APP_ENVIRONMENT === 'local'
            ? cache.set(`bl_${token}`, 'blacklisted', timeToLive)
            : await redis.setex(`bl_${token}`, timeToLive, 'blacklisted');
    };
};

export default action;
import jwt from 'jsonwebtoken';
import redis from '../../configs/redis.js';
import cache from '../../configs/cache.js';

const isAuthenticated = async (req, res, next) => {

    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not found' });
    }
    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const blacklisted = (process.env.APP_ENVIRONMENT === 'local')
            ? cache.get(`bl_${token}`) : await redis.get(`bl_${token}`);

        if (blacklisted) {
            return res.status(401).json({ error: 'Token blacklisted' });
        }
        req.user = decoded;
        return next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(401).json({ error: 'Authorization failed' });
    }
};

export default isAuthenticated;

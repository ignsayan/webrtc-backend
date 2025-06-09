import express from 'express';
import rateLimit from 'express-rate-limit';

const throttle = (request, delay) => {

    return rateLimit({
        windowMs: delay * 1000,
        max: request,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            const error = new Error('Too many requests');
            res.status(429).json({ error: error.message });
        },
    });
};

const router = () => express.Router();

export { router, throttle };
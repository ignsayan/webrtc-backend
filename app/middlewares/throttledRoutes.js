import express from 'express';
import rateLimit from 'express-rate-limit';

const throttle = (request, delay) => {

    return rateLimit({
        windowMs: delay * 1000,
        max: request,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            const error = new Error('Too many requests, please try again later');
            res.status(429).json({ errors: error.message });
        },
    });
};

const router = () => express.Router();

export { router, throttle };
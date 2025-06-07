import { body } from 'express-validator';
import User from '../../models/User.js';

const rule = [

    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Valid email is required').bail()
        .custom(async (value, { req }) => {
            const existing = await User.findOne({ email: value });
            if (!existing) throw new Error('Email does not exist');
            req.body.user = existing;
            return true;
        }),
];

export default rule;
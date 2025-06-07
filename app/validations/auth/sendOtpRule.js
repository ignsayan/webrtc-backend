import { body } from 'express-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

const rule = [

    body('attribute')
        .trim()
        .notEmpty().withMessage('Email or phone is required').bail()
        .custom((value, { req }) => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const number = parsePhoneNumberFromString(value);
            const isPhone = number && number.isValid();
            if (!isEmail && !isPhone) {
                throw new Error('Must be a valid email or phone number format');
            }
            req.body.channel = isEmail ? 'email' : 'phone';
            return true;
        }),
];

export default rule;
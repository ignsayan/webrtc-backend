import { body } from 'express-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';
import User from '../../models/User.js';

const rule = [

    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required').bail()
        .isAlpha().withMessage('First name must contain only letters').bail(),

    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required').bail()
        .isAlpha().withMessage('Last name must contain only letters').bail(),

    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Valid email is required').bail()
        .custom(async (value) => {
            const existing = await User.findOne({ email: value });
            if (existing) throw new Error('Email already exists');
            return true;
        }),

    body('phone')
        .trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Phone must be a number').bail()
        .custom(async (value) => {
            const number = parsePhoneNumberFromString(value);
            if (!number || !number.isValid()) {
                throw new Error('Phone must be a valid number with country code');
            }
            const existing = await User.findOne({ phone: value });
            if (existing) throw new Error('Phone number already exists');
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters').bail(),

    body('password_confirmation')
        .notEmpty().withMessage('Confirm password is required').bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must match').bail(),
];

export default rule;
import { body } from 'express-validator';

const rule = [

    body('code')
        .trim()
        .notEmpty().withMessage('OTP is required').bail()
        .isNumeric().withMessage('OTP must be number').bail(),

    body('channel')
        .trim()
        .notEmpty().withMessage('Channel is required').bail()
        .isIn(['email', 'phone']).withMessage('Channel must be email or phone').bail(),
];

export default rule;
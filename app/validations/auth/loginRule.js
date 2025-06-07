import { body } from 'express-validator';

const rule = [

    body('general').custom(async (value, { req }) => {
        if (!req.body.email && !req.body.username) {
            throw new Error('Email or username is required');
        }
        if (req.body.username && req.body.email) {
            throw new Error('Email and username cannot be present at the same time')
        }
        return true;
    }),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail().withMessage('Invalid email format').bail()
        .normalizeEmail(),

    body('username')
        .optional({ checkFalsy: true })
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Username can only be alphanumeric').bail(),

    body('password')
        .notEmpty().withMessage('Password is required').bail(),
];

export default rule;
import { body } from 'express-validator';

const rule = [

    body('token')
        .trim()
        .notEmpty().withMessage('Token is required').bail(),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters').bail(),

    body('password_confirmation')
        .notEmpty().withMessage('Confirm password is required').bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must match').bail(),
];

export default rule;
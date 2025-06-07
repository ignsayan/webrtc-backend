import multer from 'multer';
import { validationResult } from 'express-validator';

const validateRules = (rules, controller) => {

    const storage = multer.memoryStorage();
    const files = multer({ storage });

    return [
        (req, res, next) => {
            files.any()(req, res, (error) => {
                if (error) req.multerError = error;
                if (req.files && req.files.length > 0) {
                    req.body.files = req.files;
                }
                return next();
            });
        },

        ...rules,

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = {};
                errors.array().forEach(error => {
                    if (!formattedErrors[error.path]) {
                        formattedErrors[error.path] = [];
                    }
                    formattedErrors[error.path].push(error.msg);
                });
                return res.status(422).json({ errors: formattedErrors });
            }
            return next();
        },

        controller,
    ];
};

export default validateRules;

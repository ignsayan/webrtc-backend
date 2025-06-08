import multer from 'multer';
import Validator from 'validatorjs';

const validateRule = (method, controller) => {

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

        async (req, res, next) => {
            const { data, rules, messages, customValidators } = method(req);
            const validation = new Validator(data, rules, messages);
            if (customValidators) {
                for (const [ruleName, handler] of Object.entries(customValidators)) {
                    Validator.registerAsync(ruleName, handler, `${ruleName} validation failed`);
                }
            }
            validation.checkAsync(
                () => next(), // passes
                () => res.status(422).json({ errors: validation.errors.all() }) // fails
            );
        },

        controller,
    ];
};

export default validateRule;

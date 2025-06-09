import multer from 'multer';
import Validator from 'validatorjs';

const parseFiles = (req) => {
    return new Promise((resolve, reject) => {

        const storage = multer.memoryStorage();
        const files = multer({ storage });

        files.any()(req, {}, (error) => {
            if (error) return reject({
                status: 422,
                message: { files: [error.message] }
            });
            if (req.files?.length > 0) {
                req.body.files = req.files;
            }
            resolve();
        });
    });
};

const validateRequest = async (method, req) => {

    await parseFiles(req);
    const {
        data,
        rules,
        messages,
        customValidators
    } = method(req);

    const validation = new Validator(data, rules);

    if (customValidators) {
        for (const [name, fn] of Object.entries(customValidators)) {
            Validator.registerAsync(name, fn, `${name} validation failed`);
        }
    }
    return new Promise((resolve, reject) => {
        validation.checkAsync(
            () => resolve(),
            () => {
                const errors = validation.errors.all();
                const finalErrors = {};
                for (const field in errors) {
                    const customKey = Object.keys(messages || {}).find(key => key.startsWith(field + '.'));
                    finalErrors[field] = customKey ? [messages[customKey]] : errors[field];
                }
                reject({
                    status: 422,
                    message: finalErrors
                });
            }
        );
    });
};

export default validateRequest;
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
            if (req.files?.length > 0) req.body.files = req.files;
            resolve();
        });
    });
};

const validateRule = async (method, req) => {

    await parseFiles(req);
    const {
        data,
        rules,
        messages,
        customValidators
    } = method(req);

    const validation = new Validator(data, rules, messages);
    if (customValidators) {
        for (const [name, fn] of Object.entries(customValidators)) {
            Validator.registerAsync(name, fn, `${name} validation failed`);
        }
    }
    return new Promise((resolve, reject) => {
        validation.checkAsync(
            () => resolve(),
            () => reject({ status: 422, message: validation.errors.all() })
        );
    });
};

export default validateRule;
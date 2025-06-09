const responseHandler = (fn) => {

    return async (req, res) => {
        try {
            const proxy = new Proxy(res, {
                get(target, prop) {
                    if (['send', 'json', 'status'].includes(prop)) {
                        throw new Error('Response format not allowed by the handler');
                    }
                    return target[prop];
                }
            });

            const result = await fn(req, proxy);
            const isValid = result &&
                typeof result === 'object';

            if (!isValid) {
                throw {
                    status: 500,
                    message: 'Controller did not return a valid response object (message, data)'
                };
            }

            const response = {};
            if (typeof result.message === 'string') {
                response.message = result.message;
            }
            response.data = result?.data;
            return res.status(200).json(response);

        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'Something went wrong';
            return res.status(status).json({ error: message });
        }
    };
};

export default responseHandler;

import User from '../../models/User.js';

const forgotPasswordRule = (req) => ({
    data: req.body,
    rules: {
        email: ['required', 'email', 'email_exists'],
    },
    customValidators: {
        email_exists: async (email, attribute, req, passes) => {
            const user = await User.findOne({ email });
            if (!user) {
                return passes(false, 'Email does not exist');
            }
            req.body.user = user;
            return passes();
        },
    },
});

export default forgotPasswordRule;

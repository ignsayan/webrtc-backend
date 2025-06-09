import User from '../../models/User.js';

const forgotPasswordRule = (req) => ({
    data: req.body,
    rules: {
        email: ['required', 'email', 'email_exists'],
    },
    customValidators: {
        email_exists: async (email, attribute, req, passes) => {
            const existing = await User.findOne({ email });
            if (!existing) {
                return passes(false, 'Email does not exist');
            }
            req.body.user = existing;
            return passes();
        },
    },
});

export default forgotPasswordRule;

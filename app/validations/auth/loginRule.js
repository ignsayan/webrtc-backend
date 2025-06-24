const rule = (req) => ({

    data: req.body,
    rules: {
        email: ['required', 'email'],
        username: ['nullable', 'regex:/^[a-zA-Z0-9]+$/'],
        password: ['required'],
        general: ['email_or_username_exclusive'],
    },
    customValidators: {
        email_or_username_exclusive: async (_value, _attribute, req, passes) => {
            const { email, username } = req.body;
            if (!email && !username) {
                return passes(false, 'Email or username is required');
            }
            if (email && username) {
                return passes(false, 'Email and username cannot be present at the same time');
            }
            return passes();
        }
    }
});

export default rule;